// api/check-subscription.js
// Vérifie l'état d'abonnement d'un utilisateur
// GET /api/check-subscription (Authorization: Bearer <jwt>)

import { createClient } from "@supabase/supabase-js";

const CORS = {
  "Access-Control-Allow-Origin": "https://harmonia-woad.vercel.app",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: { user }, error } = await supabase.auth.getUser(authHeader.slice(7));
  if (error || !user) return res.status(401).json({ error: "Invalid token" });

  const { data: profile } = await supabase
    .from("users")
    .select("subscribed, subscribed_at, stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  return res.status(200).json({
    subscribed: profile?.subscribed ?? false,
    subscribed_at: profile?.subscribed_at ?? null,
    has_stripe: !!profile?.stripe_customer_id
  });
}
