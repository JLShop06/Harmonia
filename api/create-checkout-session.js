import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1TUn0AF9c1lWA0HyP8ZwVeBN",
          quantity: 1
        }
      ],
      success_url: "https://harmonia-woad.vercel.app/dashboard.html",
      cancel_url: "https://harmonia-woad.vercel.app/index.html"
    });

    // ✅ IMPORTANT : on renvoie l'URL Stripe
    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
