// api/create-checkout-session.js — Create Stripe Checkout session (subscription)
const Stripe = require('stripe');
const BASE_URL = 'https://harmonia-woad.vercel.app';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', BASE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { priceId } = req.body || {};
    if (!priceId) return res.status(400).json({ error: 'priceId is required' });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      // — Collecte des coordonnees completes du client —
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_fields: [
        { key: 'prenom', label: { type: 'custom', custom: 'Prenom' }, type: 'text', optional: false },
        { key: 'nom', label: { type: 'custom', custom: 'Nom de famille' }, type: 'text', optional: false }
      ],
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
