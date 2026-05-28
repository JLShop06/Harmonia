// api/delete-account.js — RGPD: delete user account and all data
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://harmonia-woad.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing authorization' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.slice(7));
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  const userId = user.id;

  try {
    // Delete all user data in order (respecting FK constraints)
    await supabase.from('journal_entries').delete().eq('user_id', userId);
    await supabase.from('wellness_sessions').delete().eq('user_id', userId);
    await supabase.from('user_goals').delete().eq('user_id', userId);
    await supabase.from('users').delete().eq('id', userId);

    // Delete the auth account
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error('Error deleting auth user:', deleteError);
      return res.status(500).json({ error: 'Failed to delete auth account: ' + deleteError.message });
    }

    console.log('Account deleted:', userId);
    return res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return res.status(500).json({ error: error.message });
  }
};
