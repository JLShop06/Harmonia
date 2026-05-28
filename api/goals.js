// api/goals.js — GET/POST user weekly goals
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://harmonia-woad.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing authorization' });

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.slice(7));
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || { goal_med: 60, goal_resp: 30, goal_mob: 60, goal_journal: 3 });
  }

  if (req.method === 'POST') {
    const { goal_med, goal_resp, goal_mob, goal_journal } = req.body || {};
    const payload = {
      user_id: user.id,
      goal_med: Math.max(0, parseInt(goal_med) || 60),
      goal_resp: Math.max(0, parseInt(goal_resp) || 30),
      goal_mob: Math.max(0, parseInt(goal_mob) || 60),
      goal_journal: Math.max(0, parseInt(goal_journal) || 3),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('user_goals')
      .upsert(payload, { onConflict: 'user_id' })
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, goals: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
