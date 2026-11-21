/* NYALA service worker v3 — network-first, offline fallback, update langsung sampai. */
var SHELL_CACHE = 'nyala-v3';
var CDN_CACHE = 'nyala-cdn-v3';
var SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './i18n.js',
  './dzikir.html',
  './quran.html',
  './manifest.webmanifest',
  './icon.svg'
];
var CDN_HOSTS = ['api.alquran.cloud', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];
var AUDIO_HOST = 'cdn.islamic.network';
var CDN_MAX = 80;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return Promise.all(SHELL.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL_CACHE && k !== CDN_CACHE) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

function trim(cacheName, max) {
  caches.open(cacheName).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > max) {
        var excess = keys.length - max;
        for (var i = 0; i < excess; i++) cache.delete(keys[i]);
      }
    });
  }).catch(function () {});
}

function putSafe(cacheName, request, response) {
  if (!response || !response.ok) return;
  if (response.type !== 'basic' && response.type !== 'cors') return;
  var copy = response.clone();
  caches.open(cacheName).then(function (cache) {
    cache.put(request, copy);
    if (cacheName === CDN_CACHE) trim(CDN_CACHE, CDN_MAX);
  }).catch(function () {});
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  /* Audio murottal: streaming langsung, tidak disimpan agar penyimpanan tidak bengkak. */
  if (url.hostname === AUDIO_HOST) {
    e.respondWith(fetch(req).catch(function () {
      return new Response('', { status: 504, statusText: 'offline' });
    }));
    return;
  }

  /* Navigasi halaman: network-first, fallback ke shell offline. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        putSafe(SHELL_CACHE, req, res);
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('./index.html').then(function (shell) {
            return shell || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
          });
        });
      })
    );
    return;
  }

  var sameOrigin = url.origin === self.location.origin;

  /* Aset CDN (font & data Qur'an/terjemahan): cache-first, jaringan sebagai fallback. */
  if (!sameOrigin && CDN_HOSTS.indexOf(url.hostname) > -1) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) {
          fetch(req).then(function (res) { putSafe(CDN_CACHE, req, res); }).catch(function () {});
          return hit;
        }
        return fetch(req).then(function (res) {
          putSafe(CDN_CACHE, req, res);
          return res;
        }).catch(function () {
          return new Response('', { status: 504, statusText: 'offline' });
        });
      })
    );
    return;
  }

  /* Same-origin & lainnya: network-first agar update langsung sampai, cache saat offline. */
  e.respondWith(
    fetch(req).then(function (res) {
      putSafe(SHELL_CACHE, req, res);
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || new Response('', { status: 504, statusText: 'offline' });
      });
    })
  );
});
