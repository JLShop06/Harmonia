# 🌿 Harmonia — Application de Bien-être & Développement Personnel

Application premium de bien-être : méditation, cohérence cardiaque, yoga, journal quotidien et suivi de progression.

**Live :** https://harmonia-woad.vercel.app

---

## 🏗️ Architecture

```
Harmonia/
├── api/
│   ├── billing-portal.js          → Portail client Stripe (gérer abonnement)
│   ├── check-subscription.js      → Vérifie l'état d'abonnement
│   ├── create-checkout-session.js → Crée une session Stripe Checkout
│   ├── delete-account.js          → Suppression compte (RGPD)
│   ├── goals.js                   → Objectifs hebdomadaires (GET/POST)
│   ├── save-session.js            → Sauvegarde une séance bien-être
│   ├── user-stats.js              → Statistiques utilisateur
│   └── webhook.js                 → Webhooks Stripe (paiements)
├── 404.html                       → Page d'erreur personnalisée
├── account.html                   → Mon compte (profil, abonnement, objectifs, RGPD)
├── auth-callback.html             → Callback magic link Supabase
├── auth.js                        → Config Supabase centralisée + logique signup
├── cancel.html                    → Page annulation paiement Stripe
├── dashboard.html                 → Tableau de bord avec timers et stats
├── index.html                     → Landing page (hero, features, pricing, FAQ)
├── journal.html                   → Journal de bien-être quotidien (auto-save)
├── legal.html                     → Mentions légales + RGPD
├── login.html                     → Connexion (magic link sans mot de passe)
├── logo-harmonia.png
├── manifest.json                  → Config PWA (shortcuts, icônes)
├── README.md
├── service-worker.js              → Cache PWA v4 (Network First HTML)
├── signup.html                    → Inscription + Stripe (magic link + CGU)
├── styles.css                     → Styles globaux (navbar, auth, testimonials, FAQ)
├── success.html                   → Page succès paiement Stripe
└── vercel.json                    → Config Vercel (routes, CORS)
```

---

## 🔑 Variables d'environnement (Vercel) — 4 requises

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe (whsec_...) |
| `SUPABASE_URL` | URL Supabase (https://xxx.supabase.co) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase ✅ Ajoutée |

---

## 🗄️ Base de données Supabase

### Tables avec RLS

| Table | Description |
|---|---|
| `users` | Profils (email, prénom, nom, subscribed, stripe_customer_id) |
| `journal_entries` | Journal bien-être (date, contenu, humeur 1-5) |
| `wellness_sessions` | Séances effectuées (type, durée, date) |
| `user_goals` | Objectifs hebdomadaires personnalisés |

Toutes les tables ont RLS activé avec 4 policies (SELECT, INSERT, UPDATE, DELETE own).

---

## 🔐 Authentification

- **Magic Link uniquement** (sans mot de passe)
- Flux : email → magic link → auth-callback.html → Stripe (inscription) ou dashboard
- Auto-redirect si déjà connecté sur login.html
- Rate limit géré avec message utilisateur

---

## 💳 Paiements Stripe

- Checkout en mode abonnement (14,90€/mois)
- Portail client pour gérer/résilier
- Webhooks : `checkout.session.completed`, `subscription.updated`, `subscription.deleted`, `invoice.payment_failed`
- Pages : success.html (auto-redirect 5s) et cancel.html

---

## 📓 Journal de Bien-être

- Auto-save toutes les 3 secondes
- Brouillon localStorage
- Indicateur d'humeur 5 emojis (😔😐🙂😊😄)
- Historique 14 dernières entrées
- Suppression par entrée

---

## 🎯 Objectifs Personnalisés

- Objectifs hebdomadaires en minutes pour chaque pratique
- Barres de progression sur le dashboard (stats vs objectifs)
- Modifiables depuis Mon compte

---

## 📱 PWA

- Service Worker v4 (cache Network First HTML + Cache First assets)
- Manifest avec raccourcis (Dashboard, Journal)
- Enregistrement automatique sur landing page
- Cache : index, dashboard, login, signup, journal, account, auth-callback, success, cancel, legal, 404

---

## ⚖️ RGPD

- Mentions légales (legal.html)
- Droit à l'oubli : API delete-account supprime toutes les données
- Case CGU sur inscription
- Email: support@harmonia.app

---

## 🚀 Déploiement

Push sur `main` → déploiement automatique Vercel en ~6 secondes.

**Pour configurer un nouveau Stripe Webhook :**
1. Aller sur Stripe Dashboard → Webhooks
2. Endpoint URL : `https://harmonia-woad.vercel.app/api/webhook`
3. Événements : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Copier le signing secret → Ajouter dans Vercel comme `STRIPE_WEBHOOK_SECRET`

---

*© 2026 Harmonia — Corps • Esprit • Équilibre*
