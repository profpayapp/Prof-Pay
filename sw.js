// sw.js - Prof-Pay Service Worker

const CACHE_NAME = "prof-pay-cache-v1";
const urlsToCache = [
  "/",                     // index.html
  "/index.html",
  "/utility.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap"
];

// Install event - cache all assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache:", CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache if available, else fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // return cached asset
        }
        return fetch(event.request) // fetch from network if not cached
          .catch(() => {
            // Optional: fallback for offline page or image
            if (event.request.destination === "document") {
              return caches.match("/index.html");
            }
          });
      })
  );
});
