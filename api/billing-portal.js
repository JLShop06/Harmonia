// api/billing-portal.js
// Crée une session Stripe Customer Portal pour gérer l'abonnement
// POST /api/billing-portal (Authorization: Bearer <jwt>)

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BASE_URL = "https://harmonia-woad.vercel.app";

const CORS = {
  "Access-Control-Allow-Origin": BASE_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.slice(7));
  if (authError || !user) return res.status(401).json({ error: "Invalid token" });

  // Récupérer le stripe_customer_id
  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    return res.status(400).json({ error: "No Stripe customer found. Please subscribe first." });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: BASE_URL + "/account.html",
      locale: "fr"
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return res.status(500).json({ error: error.message });
  }
}
