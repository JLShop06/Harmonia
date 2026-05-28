// api/save-session.js — Save a wellness session to Supabase
const { createClient } = require('@supabase/supabase-js');

const VALID_TYPES = ['med', 'resp', 'mob'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://harmonia-woad.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing authorization' });
  const jwt = authHeader.slice(7);

  const { sessionType, durationMinutes } = req.body || {};
  if (!VALID_TYPES.includes(sessionType)) {
    return res.status(400).json({ error: 'Invalid session_type. Must be med, resp, or mob.' });
  }
  const dur = parseInt(durationMinutes);
  if (isNaN(dur) || dur <= 0 || dur > 180) {
    return res.status(400).json({ error: 'Invalid duration_minutes (must be 1-180).' });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  if (authError || !user) return res.status(401).json({ error: 'Invalid or expired token' });

  const { data, error } = await supabase
    .from('wellness_sessions')
    .insert({
      user_id: user.id,
      session_type: sessionType,
      duration_minutes: dur,
      session_date: new Date().toISOString().split('T')[0]
    })
    .select('id, session_type, duration_minutes, created_at')
    .single();

  if (error) {
    console.error('Error saving session:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ success: true, session: data });
};
