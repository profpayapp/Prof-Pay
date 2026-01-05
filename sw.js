const CACHE_NAME = "prof-pay-v1";

const FILES_TO_CACHE = [
  "/Prof-Pay/",
  "/Prof-Pay/index.html",
  "/Prof-Pay/utility.html",
  "/Prof-Pay/dashboard.html",
  "/Prof-Pay/admin.html",
  "/Prof-Pay/manifest.json",
  "/Prof-Pay/icons/icon-192.png",
  "/Prof-Pay/icons/icon-512.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch (offline-first navigation)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/Prof-Pay/index.html")
        )
      );
    })
  );
});
