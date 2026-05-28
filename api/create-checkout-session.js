// api/create-checkout-session.js — Create Stripe Checkout session
const Stripe = require('stripe');

const BASE_URL = 'https://harmonia-woad.vercel.app';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', BASE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { priceId, email, firstName, lastName } = req.body || {};
    if (!priceId || !email) return res.status(400).json({ error: 'priceId and email are required' });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        first_name: firstName || '',
        last_name: lastName || '',
        email: email
      },
      success_url: BASE_URL + '/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: BASE_URL + '/cancel.html',
      locale: 'fr',
      allow_promotion_codes: true
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
};
