// api/user-stats.js — User statistics: weekly sessions, journal count, streak
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://harmonia-woad.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'No token' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { global: { headers: { Authorization: 'Bearer ' + token } } }
  );

  // Get user from token
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  const userId = user.id;
  const now = new Date();
  
  // Week boundaries (Monday to Sunday)
  const dayOfWeek = (now.getDay() + 6) % 7; // 0=Mon
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  
  // Month start
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Streak: consecutive days with at least one session
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const [sessionsRes, journalRes, recentRes] = await Promise.all([
    // This week sessions grouped by type
    supabase.from('wellness_sessions')
      .select('session_type, duration_minutes')
      .eq('user_id', userId)
      .gte('created_at', weekStart.toISOString())
      .lt('created_at', weekEnd.toISOString()),
    // Journal count total
    supabase.from('journal_entries')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
    // Month sessions for total minutes
    supabase.from('wellness_sessions')
      .select('session_type, duration_minutes, created_at')
      .eq('user_id', userId)
      .gte('created_at', monthStart.toISOString())
  ]);

  // Aggregate this week by type
  const thisWeek = { med: 0, resp: 0, mob: 0 };
  if (sessionsRes.data) {
    sessionsRes.data.forEach(s => {
      if (thisWeek[s.session_type] !== undefined) {
        thisWeek[s.session_type] += (s.duration_minutes || 0);
      }
    });
  }

  // This month total minutes
  let thisMonth = 0;
  if (recentRes.data) {
    recentRes.data.forEach(s => { thisMonth += (s.duration_minutes || 0); });
  }

  // Compute streak: count consecutive days from today backwards
  let streak = 0;
  if (recentRes.data && recentRes.data.length > 0) {
    // Get unique dates with sessions (last 30 days)
    const thirtyRes = await supabase.from('wellness_sessions')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });
    
    if (thirtyRes.data && thirtyRes.data.length > 0) {
      const sessionDates = new Set(thirtyRes.data.map(s => s.created_at.split('T')[0]));
      const today = now.toISOString().split('T')[0];
      let checkDate = new Date(now);
      
      // If no session today, start from yesterday
      if (!sessionDates.has(today)) {
        checkDate.setDate(checkDate.getDate() - 1);
      }
      
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (!sessionDates.has(dateStr)) break;
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
        if (streak >= 30) break;
      }
    }
  }

  return res.status(200).json({
    sessions: {
      thisWeek,
      thisMonth
    },
    journal: {
      count: journalRes.count || 0
    },
    streak
  });
};
