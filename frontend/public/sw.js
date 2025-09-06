// public/sw.js
const VERSION = "v1.0.0";
const CACHE_NAME = `aix-aleph-${VERSION}`;
const CORE_ASSETS = [
  "/",           // navigation requests get handled below too
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/favicon-192.png",
  "/favicon-512.png",
  "/apple-touch-icon.png",
];

// Take over asap on update
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Strategy:
// - Navigations: network-first, fallback to cache (so app works offline)
// - Other requests: stale-while-revalidate from cache
self.addEventListener("fetch", (evt) => {
  const req = evt.request;

  // Handle navigations (document)
  if (req.mode === "navigate") {
    evt.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put("/", fresh.clone());
          return fresh;
        } catch (err) {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match("/") || await cache.match("/index.html");
          return cached || new Response("Offline", { status: 503 });
        }
      })()
    );
    return;
  }

  // Assets: stale-while-revalidate
  evt.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((res) => {
          // Only cache successful GETs
          if (res && res.status === 200 && req.method === "GET" && (req.url.startsWith(self.origin) || new URL(req.url).origin === self.location.origin)) {
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(() => cached); // if network fails, use cache

      return cached || fetchPromise;
    })()
  );
});
