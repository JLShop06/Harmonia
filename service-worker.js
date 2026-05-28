// service-worker.js — Harmonia PWA
// Stratégie : Network First pour HTML, Cache First pour assets statiques

const CACHE_NAME = "harmonia-v3";
const STATIC_CACHE = "harmonia-static-v3";

// Assets statiques à précacher
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/login.html",
  "/signup.html",
  "/journal.html",
  "/account.html",
  "/auth-callback.html",
  "/styles.css",
  "/auth.js",
  "/manifest.json",
  "/logo-harmonia.png"
];

// ─── INSTALL ────────────────────────────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(err => console.warn("Cache install error:", err))
  );
  self.skipWaiting();
});

// ─── ACTIVATE ───────────────────────────────────────────────
self.addEventListener("activate", event => {
  const validCaches = [CACHE_NAME, STATIC_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => !validCaches.includes(name))
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH ──────────────────────────────────────────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ne pas intercepter les requêtes API, Supabase, Stripe
  if (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("supabase.co") ||
    url.hostname.includes("stripe.com") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("jsdelivr.net") ||
    request.method !== "GET"
  ) {
    return;
  }

  // HTML pages : Network First (toujours à jour)
  if (request.headers.get("accept")?.includes("text/html") ||
      url.pathname.endsWith(".html") || url.pathname === "/") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match("/index.html")))
    );
    return;
  }

  // CSS/JS/Images : Cache First
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      });
    }).catch(() => caches.match("/index.html"))
  );
});
