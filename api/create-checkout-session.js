import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1TUn0AF9c1lWA0HyP8ZwVeBN",
        quantity: 1
      }
    ],
    success_url: "https://tonsite.vercel.app/dashboard.html",
    cancel_url: "https://tonsite.vercel.app/index.html"
  });

  res.json({ id: session.id });
}
