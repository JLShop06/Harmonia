// api/save-session.js
// Sauvegarde une séance bien-être dans Supabase wellness_sessions
// Appelé depuis le dashboard après qu'un timer se termine

const { createClient } = require('@supabase/supabase-js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Récupérer le JWT de l'utilisateur depuis le header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const jwt = authHeader.replace('Bearer ', '');

  // Valider les données
  const { sessionType, durationMinutes } = req.body || {};
  const validTypes = ['med', 'resp', 'mob'];

  if (!validTypes.includes(sessionType)) {
    return res.status(400).json({ error: 'Invalid session_type. Must be med, resp, or mob.' });
  }

  const dur = parseInt(durationMinutes);
  if (isNaN(dur) || dur <= 0 || dur > 180) {
    return res.status(400).json({ error: 'Invalid duration_minutes.' });
  }

  // Initialiser Supabase avec la clé service role pour bypass RLS
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Vérifier le JWT et récupérer l'utilisateur
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // Insérer la séance
  const { data, error } = await supabase
    .from('wellness_sessions')
    .insert({
      user_id: user.id,
      session_type: sessionType,
      duration_minutes: dur,
      session_date: new Date().toISOString().split('T')[0]
    })
    .select('id, session_type, duration_minutes, completed_at')
    .single();

  if (error) {
    console.error('Error saving session:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ success: true, session: data });
};
