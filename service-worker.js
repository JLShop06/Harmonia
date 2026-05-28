// service-worker.js — Harmonia PWA v5
const CACHE_NAME = 'harmonia-v5';
const CACHE_PAGES = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html',
  '/dashboard.html',
  '/journal.html',
  '/progress.html',
  '/account.html',
  '/success.html',
  '/cancel.html',
  '/404.html',
  '/legal.html',
  '/auth-callback.html',
  '/styles.css',
  '/auth.js',
  '/manifest.json'
];

// Install: pre-cache all pages
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_PAGES))
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network First for HTML/API, Cache First for static assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API calls (always network)
  if (url.pathname.startsWith('/api/')) return;

  // Skip external resources (CDN, fonts, etc.)
  if (url.origin !== location.origin) return;

  // HTML pages: Network First
  if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('/404.html')))
    );
    return;
  }

  // Static assets: Cache First, fallback network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => new Response('Not found', { status: 404 }));
    })
  );
});

// Handle messages (e.g. force update)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
