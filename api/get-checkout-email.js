// api/get-checkout-email.js — Recupere l'email du client depuis une session Stripe
const Stripe = require('stripe');
const BASE_URL = 'https://harmonia-woad.vercel.app';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', BASE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const sessionId = req.query.session_id;
    if (!sessionId) return res.status(400).json({ error: 'session_id required' });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_email
      || (session.customer_details && session.customer_details.email);

    return res.status(200).json({ email: email || null, paid: session.payment_status === 'paid' });
  } catch (error) {
    console.error('get-checkout-email error:', error);
    return res.status(500).json({ error: error.message });
  }
};
