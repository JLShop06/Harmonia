import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "PRICE_ID",
        quantity: 1
      }
    ],
    success_url: "https://tonsite.vercel.app/dashboard.html",
    cancel_url: "https://tonsite.vercel.app/index.html"
  });

  res.json({ id: session.id });
}
