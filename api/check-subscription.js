// api/check-subscription.js — Check user subscription status
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://harmonia-woad.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing authorization' });

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error } = await supabase.auth.getUser(authHeader.slice(7));
  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile } = await supabase
    .from('users')
    .select('subscribed, subscribed_at, stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle();

  return res.status(200).json({
    subscribed: profile ? profile.subscribed || false : false,
    subscribed_at: profile ? profile.subscribed_at || null : null,
    has_stripe: !!(profile && profile.stripe_customer_id)
  });
};
