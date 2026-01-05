const cacheName = 'prof-pay-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/utility.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Add CSS/JS files if you have any
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
