// api/user-stats.js
// Récupère les statistiques d'un utilisateur depuis Supabase
// GET /api/user-stats (Authorization: Bearer <jwt>)

import { createClient } from "@supabase/supabase-js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://harmonia-woad.vercel.app",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(req, res) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const jwt = authHeader.slice(7);

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Vérifier le JWT
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  if (authError || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const userId = user.id;

  // Récupérer les stats en parallèle
  const [journalRes, sessionsRes, profileRes] = await Promise.all([
    // Nombre d'entrées journal
    supabase.from("journal_entries")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),

    // Séances par type (cette semaine)
    supabase.from("wellness_sessions")
      .select("session_type, duration_minutes")
      .eq("user_id", userId)
      .gte("session_date", getWeekStart()),

    // Profil utilisateur
    supabase.from("users")
      .select("first_name, last_name, subscribed, created_at")
      .eq("id", userId)
      .maybeSingle()
  ]);

  // Agréger les séances par type
  const sessionsByType = { med: 0, resp: 0, mob: 0, total: 0 };
  if (sessionsRes.data) {
    sessionsRes.data.forEach(s => {
      if (s.session_type in sessionsByType) {
        sessionsByType[s.session_type] += s.duration_minutes;
      }
      sessionsByType.total += s.duration_minutes;
    });
  }

  return res.status(200).json({
    profile: profileRes.data || null,
    journal: { count: journalRes.count || 0 },
    sessions: {
      thisWeek: sessionsByType,
      totalEntries: sessionsRes.data?.length || 0
    }
  });
}

function getWeekStart() {
  const d = new Date();
  const day = d.getDay(); // 0 = Sunday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}
