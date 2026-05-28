# 🌿 Harmonia — Application de Bien-être & Développement Personnel

Application premium de bien-être : méditation, cohérence cardiaque, yoga, journal quotidien et suivi de progression.

**Live :** https://harmonia-woad.vercel.app

---

## 🏗️ Architecture

```
Harmonia/
├── api/
│   ├── create-checkout-session.js   → Crée une session Stripe Checkout
│   ├── save-session.js              → Sauvegarde une séance bien-être (auth requise)
│   └── webhook.js                   → Gère les webhooks Stripe (paiements)
├── index.html                       → Landing page avec hero, features, pricing, FAQ
├── signup.html                      → Inscription (magic link + Stripe)
├── login.html                       → Connexion (magic link sans mot de passe)
├── auth-callback.html               → Callback magic link Supabase
├── dashboard.html                   → Tableau de bord utilisateur
├── journal.html                     → Journal de bien-être quotidien
├── account.html                     → Gestion du compte utilisateur
├── auth.js                          → Config Supabase + logique signup centralisée
├── styles.css                       → Styles globaux
├── manifest.json                    → Config PWA
├── service-worker.js                → Cache PWA (Network First HTML)
└── vercel.json                      → Config Vercel (routes, CORS)
```

---

## 🔑 Variables d'environnement requises (Vercel)

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret du webhook Stripe (whsec_...) |
| `SUPABASE_URL` | URL Supabase (https://xxx.supabase.co) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase (accès complet) |

---

## 🗄️ Base de données Supabase

### Tables

**`users`** — Profils utilisateurs
- `id` uuid (FK → auth.users)
- `email` text
- `first_name` text
- `last_name` text
- `subscribed` boolean (default false)
- `subscribed_at` timestamptz
- `stripe_customer_id` text
- `created_at` timestamptz

**`journal_entries`** — Journal de bien-être
- `id` uuid
- `user_id` uuid (FK → auth.users)
- `entry_date` date
- `content` text
- `mood` smallint (1-5)
- `created_at` / `updated_at` timestamptz

**`wellness_sessions`** — Séances effectuées
- `id` uuid
- `user_id` uuid (FK → auth.users)
- `session_type` text (med|resp|mob)
- `duration_minutes` integer
- `completed_at` timestamptz
- `session_date` date

---

## 🔐 Authentification

- **Magic Link uniquement** (sans mot de passe)
- Flux : email → magic link → auth-callback.html → Stripe (si inscription) ou dashboard
- Supabase RLS activé sur toutes les tables

---

## 💳 Paiements

- **Stripe Checkout** en mode abonnement
- Prix : 14,90€/mois (price_1TUn0AF9c1lWA0HyP8ZwVeBN)
- Le webhook `checkout.session.completed` met à jour `users.subscribed = true`
- `customer.subscription.deleted` met `subscribed = false`

---

## 📱 PWA

Progressive Web App installable sur mobile.
- Service worker avec cache Network First pour HTML et Cache First pour assets
- Manifest avec raccourcis (Dashboard, Journal)
- Enregistrement automatique du SW sur la landing page

---

## 🚀 Déploiement

1. Push sur `main` → déploiement automatique sur Vercel
2. Ajouter les 4 variables d'environnement dans Vercel
3. Créer le webhook Stripe sur `https://harmonia-woad.vercel.app/api/webhook`

---

*© 2026 Harmonia — Corps • Esprit • Équilibre*
