// api/webhook.js — Stripe webhook handler
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

// Disable body parsing to get raw body for Stripe signature verification
module.exports.config = { api: { bodyParser: false } };

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: 'Webhook error: ' + err.message });
  }

  console.log('Stripe event:', event.type);

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_email || (session.metadata && session.metadata.email);
      const customerId = session.customer;
      const firstName = session.metadata && session.metadata.first_name;
      const lastName = session.metadata && session.metadata.last_name;

      if (email) {
        const updateData = {
          subscribed: true,
          subscribed_at: new Date().toISOString(),
          stripe_customer_id: customerId
        };
        if (firstName) updateData.first_name = firstName;
        if (lastName) updateData.last_name = lastName;

        const { error } = await supabase.from('users').update(updateData).eq('email', email);
        if (error) console.error('Supabase update error (checkout):', error);
        else console.log('User subscribed:', email);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const isActive = ['active', 'trialing'].includes(sub.status);
      const { error } = await supabase.from('users').update({ subscribed: isActive }).eq('stripe_customer_id', sub.customer);
      if (error) console.error('Supabase update error (sub update):', error);
      else console.log('Subscription updated:', sub.customer, 'active:', isActive);
      break;
    }

    case 'customer.subscription.deleted': {
      const { error } = await supabase.from('users').update({ subscribed: false }).eq('stripe_customer_id', event.data.object.customer);
      if (error) console.error('Supabase unsubscribe error:', error);
      else console.log('User unsubscribed:', event.data.object.customer);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      if (invoice.attempt_count >= 3) {
        const { error } = await supabase.from('users').update({ subscribed: false }).eq('stripe_customer_id', invoice.customer);
        if (error) console.error('Supabase payment failed error:', error);
        else console.log('Subscription deactivated after payment failure:', invoice.customer);
      } else {
        console.log('Payment failed (attempt ' + invoice.attempt_count + '):', invoice.customer);
      }
      break;
    }

    default:
      console.log('Unhandled event type:', event.type);
  }

  return res.status(200).json({ received: true });
};
