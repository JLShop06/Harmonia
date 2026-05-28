# 🌿 Harmonia — Application de Bien-être & Développement Personnel

Application premium de bien-être : méditation, cohérence cardiaque, yoga, journal quotidien, suivi de progression et analytics.

**Live :** https://harmonia-woad.vercel.app

---

## 🏗️ Architecture

```
Harmonia/
├── api/
│   ├── billing-portal.js           → Portail client Stripe
│   ├── check-subscription.js       → Vérifie l'état d'abonnement
│   ├── create-checkout-session.js  → Crée une session Stripe Checkout
│   ├── delete-account.js           → Suppression compte (RGPD)
│   ├── goals.js                    → Objectifs hebdomadaires (GET/POST)
│   ├── save-session.js             → Sauvegarde une séance bien-être
│   ├── user-stats.js               → Stats + streak (GET)
│   └── webhook.js                  → Webhooks Stripe
├── 404.html              → Page d'erreur personnalisée
├── account.html          → Profil, abonnement, objectifs, RGPD
├── auth-callback.html    → Callback magic link Supabase
├── auth.js               → Config Supabase centralisée + logique signup
├── cancel.html           → Page annulation paiement Stripe
├── dashboard.html        → Tableau de bord (timers, animation respiration, stats)
├── Harmonia.md           → Documentation technique complète
├── index.html            → Landing page (hero, features, pricing, FAQ)
├── journal.html          → Journal de bien-être quotidien (auto-save, humeur)
├── legal.html            → Mentions légales + RGPD
├── login.html            → Connexion (magic link sans mot de passe)
├── logo-harmonia.png
├── manifest.json         → Config PWA (shortcuts, icônes)
├── package.json          → Dépendances Node.js (stripe, supabase-js)
├── progress.html         → Analytics: graphiques bar charts, humeur, historique
├── README.md
├── service-worker.js     → PWA v5 (Network First HTML, Cache First assets)
├── signup.html           → Inscription + Stripe (magic link + CGU)
├── styles.css            → Design système global + hamburger menu mobile
├── success.html          → Page succès paiement Stripe
└── vercel.json           → Config Vercel (routes, CORS, @vercel/static builds)
```

---

## 🔑 Variables d'environnement Vercel (4 requises)

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe (whsec_...) |
| `SUPABASE_URL` | URL Supabase (https://xxx.supabase.co) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase ✅ Ajoutée |

---

## 🗄️ Base de données Supabase

Tables avec RLS activé :

| Table | Description |
|---|---|
| `users` | Profils (email, prénom, nom, subscribed, stripe_customer_id) |
| `journal_entries` | Journal bien-être (date, contenu, humeur 1-5) |
| `wellness_sessions` | Séances effectuées (type, durée, date) |
| `user_goals` | Objectifs hebdomadaires personnalisés |

---

## 🔐 Authentification
- **Magic Link uniquement** (sans mot de passe)
- Flux : email → magic link → auth-callback.html → Stripe (inscription) ou dashboard
- Auto-redirect si déjà connecté sur login.html
- Rate limit géré avec message utilisateur

## 💳 Paiements Stripe
- Checkout en mode abonnement (14,90€/mois)
- Portail client pour gérer/résilier
- Webhooks : checkout.session.completed, subscription.updated, subscription.deleted, invoice.payment_failed
- Pages : success.html (auto-redirect 5s) et cancel.html

## 📓 Journal de Bien-être
- Auto-save toutes les 3 secondes
- Brouillon localStorage par date
- Indicateur d'humeur 5 emojis (😔😐🙂😊😄)
- Chargement automatique de l'entrée si la date change
- Historique 14 dernières entrées avec bouton "Modifier"

## 📈 Progrès & Analytics
- Page dédiée progress.html
- Filtres 7 / 14 / 30 jours
- Graphique en barres des séances par jour (méd/resp/mob)
- Graphique d'humeur avec emojis
- Tableau historique des entrées journal

## 🎯 Objectifs Personnalisés
- Objectifs hebdomadaires en minutes pour chaque pratique
- Barres de progression sur le dashboard (stats vs objectifs depuis API)
- Calcul de streak depuis la base de données

## 📱 PWA (Progressive Web App)
- Service Worker v5 (Network First HTML, Cache First assets)
- Manifest avec raccourcis (Dashboard, Journal)
- Cache 15 pages statiques
- Menu hamburger mobile sur toutes les pages app

## ⚖️ RGPD
- Mentions légales (legal.html)
- Droit à l'oubli : API delete-account supprime toutes les données + compte auth
- Confirmation double (confirm + saisie "SUPPRIMER")
- Case CGU sur inscription

---

## 🚀 Déploiement

Push sur main → déploiement automatique Vercel en ~7 secondes.

**Pour configurer Stripe Webhook :**
1. Stripe Dashboard → Webhooks
2. Endpoint URL : `https://harmonia-woad.vercel.app/api/webhook`
3. Événements : checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed
4. Copier le signing secret → Ajouter dans Vercel comme `STRIPE_WEBHOOK_SECRET`

**Pour configurer le portail Stripe Billing :**
1. Stripe Dashboard → Settings → Billing → Customer portal
2. Activer et configurer les options souhaitées
3. Enregistrer

---

© 2026 Harmonia — Corps • Esprit • Équilibre
