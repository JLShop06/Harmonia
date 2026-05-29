# Harmonia — Documentation Technique Complète
> Application bien-être premium — Dernière mise à jour : 28/05/2026

---

## 🌐 URLs importantes

| Ressource | URL |
|---|---|
| **Site live** | https://harmonia-woad.vercel.app |
| **GitHub repo** | https://github.com/JLShop06/Harmonia |
| **Vercel project** | https://vercel.com/greentherapy06s-projects/harmonia |
| **Supabase project** | https://supabase.com/dashboard/project/arewzgemzqmokinlylhu |
| **Supabase URL** | https://arewzgemzqmokinlylhu.supabase.co |
| **Stripe Dashboard** | https://dashboard.stripe.com |

---

## 🏗️ Architecture

```
Harmonia/
├── index.html           # Landing page (marketing)
├── login.html           # Connexion magic link
├── signup.html          # Inscription → Stripe Checkout
├── auth-callback.html   # Callback auth + upsert users + redirect Stripe
├── dashboard.html       # App principale (séances, timers, stats)
├── journal.html         # Journal de bien-être avec humeur
├── progress.html        # Analytics: graphiques, historique
├── account.html         # Profil, abonnement, objectifs, RGPD
├── success.html         # Post-paiement succès
├── cancel.html          # Paiement annulé
├── 404.html             # Page d'erreur custom
├── legal.html           # Mentions légales + RGPD
├── auth.js              # Supabase init + signup form handler
├── styles.css           # Design système global
├── service-worker.js    # PWA v4 — cache 12 pages, Network First
├── manifest.json        # PWA manifest avec shortcuts
├── package.json         # Dependencies: stripe, @supabase/supabase-js
├── vercel.json          # Routing + CORS headers
└── api/
    ├── create-checkout-session.js  # POST — Stripe Checkout
    ├── save-session.js             # POST — Sauvegarder séance
    ├── user-stats.js               # GET  — Stats semaine + streak
    ├── goals.js                    # GET/POST — Objectifs hebdo
    ├── check-subscription.js       # GET  — Statut abonnement
    ├── billing-portal.js           # POST — Stripe portal
    ├── delete-account.js           # DELETE — RGPD suppression
    └── webhook.js                  # POST — Stripe webhooks
```

---

## 🗄️ Base de données Supabase

### Table: `users` (existante)
```sql
id           uuid  PRIMARY KEY (auth.users.id)
email        text
first_name   text
last_name    text
subscribed   boolean DEFAULT false
subscribed_at timestamp
stripe_customer_id text
```
RLS: activé, policies par user_id = auth.uid()

### Table: `journal_entries`
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id     uuid REFERENCES users(id) ON DELETE CASCADE
entry_date  date NOT NULL
content     text
mood        smallint (1-5: 😔😐🙂😊😄)
created_at  timestamp DEFAULT now()
updated_at  timestamp DEFAULT now()
UNIQUE(user_id, entry_date)
```
RLS: SELECT/INSERT/UPDATE/DELETE par user_id = auth.uid()

### Table: `wellness_sessions`
```sql
id               uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id          uuid REFERENCES users(id) ON DELETE CASCADE
session_type     text CHECK (session_type IN ('med','resp','mob'))
duration_minutes integer NOT NULL CHECK (duration_minutes > 0)
session_date     date DEFAULT CURRENT_DATE
created_at       timestamp DEFAULT now()
```
Indexes: (user_id, session_date), (user_id, session_type)
RLS: SELECT/INSERT par user_id = auth.uid()

### Table: `user_goals`
```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id      uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE
goal_med     integer DEFAULT 60   -- minutes méditation/semaine
goal_resp    integer DEFAULT 30   -- minutes respiration/semaine
goal_mob     integer DEFAULT 60   -- minutes mobilité/semaine
goal_journal integer DEFAULT 3    -- entrées journal/semaine
updated_at   timestamp DEFAULT now()
```
RLS: SELECT/INSERT/UPDATE/DELETE par user_id = auth.uid()

---

## 🔑 Variables d'environnement (Vercel)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | https://arewzgemzqmokinlylhu.supabase.co |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (Supabase → Settings → API) |
| `STRIPE_SECRET_KEY` | sk_live_... (Stripe Dashboard → Developers → API keys) |
| `STRIPE_WEBHOOK_SECRET` | whsec_... (Stripe → Webhooks → signing secret) |

---

## 🔄 Flux utilisateur

### Inscription (nouveau compte)
1. Utilisateur entre email sur `signup.html`
2. Supabase envoie un magic link (signInWithOtp)
3. Clic sur le lien → redirect vers `auth-callback.html`
4. auth-callback.html:
   - Vérifie la session
   - Upsert dans `users` (email, first_name, last_name)
   - Redirect vers Stripe Checkout (`/api/create-checkout-session`)
5. Stripe Checkout → paiement
6. Succès → `success.html`
7. Webhook `checkout.session.completed` → `subscribed = true` dans `users`

### Connexion (compte existant)
1. Utilisateur entre email sur `login.html`
2. Magic link envoyé
3. auth-callback.html:
   - Vérifie la session
   - Upsert users (au cas où)
   - Si déjà abonné → dashboard.html
   - Si pas abonné → signup.html

### Séance bien-être
1. Dashboard affiche 3 séances (méditation, respiration, mobilité)
2. Timer countdown avec animation de respiration pour cohérence cardiaque
3. À la fin du timer → saveSession() :
   - localStorage (streak, done days)
   - API `/api/save-session` (Supabase wellness_sessions)
4. Stats rechargées depuis `/api/user-stats` (basé sur objectifs `/api/goals`)

---

## 📱 PWA

- **Service Worker v4** : Network First pour HTML, cache 12 pages
- **Manifest** : shortcut Dashboard, shortcut Journal, start_url = /dashboard.html
- **Offline** : fallback vers 404.html si ressource non cachée
- **Install prompt** : natif navigateur via manifest

---

## 🔐 Sécurité

- **Auth** : Magic link uniquement, 0 mot de passe
- **JWT** : Bearer token dans Authorization header pour tous les appels API
- **Service role key** : uniquement côté serveur (API Vercel), jamais client-side
- **RLS Supabase** : activé sur toutes les tables, policies user-scoped
- **Stripe signature** : webhook validé via `stripe.webhooks.constructEvent`
- **CORS** : origin strictement `https://harmonia-woad.vercel.app`
- **RGPD** : suppression complète via `/api/delete-account` (données + compte auth)

---

## 💳 Stripe

- **Prix** : `price_1TUn0AF9c1lWA0HyP8ZwVeBN` (14,90€/mois)
- **Mode** : Subscription, locale fr
- **Promo codes** : activés
- **Webhooks** gérés :
  - `checkout.session.completed` → subscribed = true
  - `customer.subscription.updated` → sync statut
  - `customer.subscription.deleted` → subscribed = false
  - `invoice.payment_failed` → subscribed = false après 3 échecs
- **Billing Portal** : configurer dans Stripe Dashboard → Settings → Customer portal

---

## ⚙️ À configurer manuellement (actions requises)

### 1. Stripe Webhook
1. Aller sur https://dashboard.stripe.com/webhooks
2. Cliquer "Ajouter un point de terminaison"
3. URL : `https://harmonia-woad.vercel.app/api/webhook`
4. Sélectionner les événements :
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copier le "Webhook signing secret" (whsec_...)
6. Ajouter dans Vercel : Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET`

### 2. Stripe Billing Portal
1. Aller sur https://dashboard.stripe.com/settings/billing/portal
2. Activer le portail client
3. Configurer : annulation autorisée, mise à jour de paiement autorisée
4. Enregistrer

---

## 📊 Pages de l'application

| Page | Accès | Description |
|---|---|---|
| `index.html` | Public | Landing page marketing |
| `login.html` | Public | Connexion magic link |
| `signup.html` | Public | Inscription + Stripe Checkout |
| `auth-callback.html` | Auth | Callback Supabase → redirect |
| `dashboard.html` | Abonné | Séances, timers, stats semaine |
| `journal.html` | Abonné | Journal quotidien avec humeur |
| `progress.html` | Abonné | Analytics: graphiques, historique |
| `account.html` | Abonné | Profil, objectifs, abonnement |
| `success.html` | Post-paiement | Confirmation d'abonnement |
| `cancel.html` | Post-paiement | Paiement annulé |
| `legal.html` | Public | Mentions légales + RGPD |
| `404.html` | Erreur | Page 404 custom |

---

## 🚀 Déploiement

- **Hébergeur** : Vercel (Hobby plan)
- **CI/CD** : Auto-deploy sur push vers branche main
- **Délai moyen** : ~7 secondes par déploiement
- **Rollback** : via Vercel Dashboard → Deployments → Promote to Production

---

## 🐛 Historique des problèmes résolus

1. **Site 404** : vercel.json avec `"handle":"filesystem"` incompatible avec builds → fixé en ajoutant `@vercel/static` builds explicites
2. **ES modules vs CommonJS** : Toutes les API converties de `import/export` vers `require/module.exports`
3. **Stats dashboard** : Conflit localStorage vs API → API-first, localStorage uniquement pour streak local
4. **Goals par défaut** : Valeurs trop basses (10min) → corrigées (60/30/60/3)
5. **Billing portal** : URL hardcodée Stripe → remplacée par appel `/api/billing-portal`

---



---

## 📋 Changelog des dernières améliorations (Session 3 - 28/05/2026)

### Nouveautés
- ✅ **progress.html** — Nouvelle page analytics avec graphiques bar charts interactifs
- ✅ **package.json** — Déclaration des dépendances npm (stripe, @supabase/supabase-js)
- ✅ **robots.txt** — Configuration SEO
- ✅ **sitemap.xml** — Sitemap pour indexation Google
- ✅ **OpenGraph tags** — Meta tags pour partage sur réseaux sociaux
- ✅ **Hamburger menu mobile** — Toutes les pages app (dashboard, journal, progress, account)
- ✅ **PWA Service Worker v5** — Cache 15 pages dont progress.html
- ✅ **Manifest v2** — Shortcut progress.html ajouté
- ✅ **Toast notifications** — Confirmation visuelle après chaque séance terminée

### Corrections de bugs
- ✅ **ES modules → CommonJS** — Toutes les 8 APIs converties (import/export → require/module.exports)
- ✅ **Goals defaults** — Corrigé (60/30/60 min au lieu de 10/5/20 min)
- ✅ **Stats dashboard** — API-first (plus de conflit avec localStorage)
- ✅ **Billing portal** — URL hardcodée remplacée par appel API
- ✅ **auth-callback** — Vérification abonnement avant redirect Stripe (évite double facturation)
- ✅ **user-stats API** — Ajoute streak + thisMonth au retour API
- ✅ **Journal** — Chargement entrée existante quand la date change
- ✅ **Journal** — Bouton "Modifier" pour charger une ancienne entrée dans l'éditeur
- ✅ **Journal** — Brouillon localStorage par date (plus global)


- ✅ **CSV Export** — Bouton "Exporter en CSV" sur progress.html (RGPD droit à la portabilité)
- ✅ **API validation confirmée** — Toutes les APIs retournent 401 (JSON) sans token, 200 avec token valide
- ✅ **vercel.json minimal** — Suppression des builds manuels, auto-détection Vercel (résout le 404 API)
- ✅ **Success.html** — Vérification de l'abonnement via check-subscription API avec 5 tentatives
- ✅ **Texte guidé** — Instructions de méditation et de mobilité rotatives pendant les timers


- ✅ **Welcome modal** — Popup d'accueil pour les nouveaux utilisateurs avec 4 conseils de démarrage
- ✅ **Trend comparison** — Section "Tendance vs période précédente" sur progress.html avec flèches ↑↓→
- ✅ **Weekly progress bars** — Barres de progression hebdo (vs objectifs) sur account.html

### État final vérifié (28/05/2026 22:52)
- ✅ Site live: https://harmonia-woad.vercel.app/ → landing page complète
- ✅ APIs: user-stats, goals, check-subscription, save-session, billing-portal → 401 sans auth, 200 avec token
- ✅ 404 custom: https://harmonia-woad.vercel.app/nonexistent → "Page introuvable — Harmonia"
- ✅ robots.txt: https://harmonia-woad.vercel.app/robots.txt → correctement configuré
- ✅ sitemap.xml: https://harmonia-woad.vercel.app/sitemap.xml → valide
- ✅ progress.html: https://harmonia-woad.vercel.app/progress.html → "Mes Progrès – Harmonia"
- ✅ journal.html: redirige vers login (auth required) ✅


- ✅ **Dark mode** — Support automatique via prefers-color-scheme (CSS)
- ✅ **Journal search** — Recherche avec surlignage des résultats dans les entrées
- ✅ **Journal fix** — Correction SyntaxError, réécriture complète et propre
- ✅ **Streak milestones** — Célébrations aux paliers 3, 7, 14, 21, 30, 60, 90 jours
- ✅ **Legal.html** — Réécriture complète RGPD (sous-traitants, tableau données, droits)
- ✅ **PWA install banner** — Bouton d'installation natif sur la landing page
- ✅ **auth-callback** — Gestion des paramètres d'erreur URL (lien expiré)
- ✅ **login.html** — Suppression CDN dupliqué, waitForSupabase async
- ✅ **signup.html / success.html** — Suppression CDN dupliqué

*Document mis à jour — Harmonia v3.3 — 28/05/2026*

---

## 📋 Changelog (Session 4 - 29/05/2026)

### Améliorations
- ✅ **auth.js — `window.waitForSupabase()`** : utilitaire global centralisé qui retourne une Promise résolue dès que `window._supabase` est prêt (timeout 8s par défaut). Toutes les pages peuvent l'utiliser via `await window.waitForSupabase()` au lieu de réimplémenter leur propre boucle `setInterval`.
- ✅ **Déploiement vérifié** : auth.js en production (5520 octets) sert bien la nouvelle version avec `waitForSupabase` (test cache-buster confirmé).

### État vérifié (29/05/2026)
- ✅ Site live opérationnel : https://harmonia-woad.vercel.app/
- ✅ APIs sécurisées : 401 JSON sans token (user-stats, check-subscription, etc.)
- ✅ Déploiement Vercel : "Ready" en Production
- ✅ Auth magic link uniquement, 0 mot de passe (signInWithOtp)

*Document mis à jour — Harmonia v3.4 — 29/05/2026*

---

## ✅ Configuration Stripe terminée (29/05/2026)

**Portail client Stripe : ACTIVÉ**

La configuration du portail client a été finalisée dans le Dashboard Stripe :
- ✅ Factures : historique de facturation activé
- ✅ Informations client : consultation et mise à jour du nom, email, adresse
- ✅ Moyens de paiement : modification et ajout de méthodes de paiement
- ✅ Annulations : clients peuvent annuler (avec effet à fin de période)
- ✅ Politiques légales : lien vers https://harmonia-woad.vercel.app/legal.html configuré
- ✅ Lien de redirection : https://harmonia-woad.vercel.app/account.html

**Vérifications technique :**
- ✅ API `/api/create-checkout-session` : mode subscription, prix `price_1TUn0AF9c1lWA0HyP8ZwVeBN`, success/cancel URLs
- ✅ API `/api/billing-portal` : crée une session Stripe avec return_url, sécurisée (service role key côté serveur)
- ✅ `account.html` : bouton "Gérer mon abonnement" appelle `/api/billing-portal` au clic
- ✅ Déploiement : toutes les pages et APIs en Production (live)
- ✅ Sécurité : APIs retournent 401 sans token (RLS actif)

**Flux client final :**
1. Client clique "Inscrivez-vous" sur landing page → `signup.html`
2. Envoie email → magic link de Supabase
3. Clic lien → `auth-callback.html` → croque la session
4. Auto-redirect vers Stripe Checkout (paramétrisé avec `price_1TUn0AF9c1lWA0HyP8ZwVeBN`)
5. Paiement → redirection vers `success.html` (vérification abonnement)
6. Accès `dashboard.html` accordé
7. Page `account.html` : client clique "Gérer mon abonnement" → portail Stripe → accès au portail client, puis retour à `account.html`

**Application prête pour la production.**
