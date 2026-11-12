/* NYALA service worker v2 — network-first + auto-clean */
var CACHE = 'nyala-v2';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    fetch(req).then(function (res) {
      try {
        if (res && res.ok && new URL(req.url).origin === location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
      } catch (err) {}
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || Response.error();
      });
    })
  );
});
