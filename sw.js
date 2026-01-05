const CACHE_NAME = 'profpay-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/utility.html',
  '/manifest.json',
  '/sw.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap'
];

// Install event - cache all files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedRes => {
        if (cachedRes) {
          return cachedRes;
        }
        return fetch(event.request)
          .catch(() => {
            // fallback page if needed
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
