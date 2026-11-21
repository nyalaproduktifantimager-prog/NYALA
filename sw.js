/* NYALA service worker v5 — shell selalu segar, data Qur'an cache-first, auto-reload sekali setelah aktivasi. */
var SHELL_CACHE = 'nyala-v5';
var CDN_CACHE = 'nyala-cdn-v5';
var DATA_CACHE = 'nyala-data-v5';
var SHELL = ['./','./index.html','./styles.css','./app.js','./i18n.js','./dzikir.html','./quran.html','./manifest.webmanifest','./icon.svg'];
var DATA_NAMES = ['quran-uthmani.json','id.indonesian.json','en.sahih.json','i18n-dict.json'];
var CDN_HOSTS = ['api.alquran.cloud','cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'];
var AUDIO_HOST = 'cdn.islamic.network';
var CDN_MAX = 80;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return Promise.all(SHELL.map(function (url) { return cache.add(url).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL_CACHE && k !== CDN_CACHE && k !== DATA_CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); }).then(function () {
      return self.clients.matchAll().then(function (cs) {
        cs.forEach(function (c) { try { c.postMessage('NYALA_RELOAD'); } catch (e2) {} });
      });
    })
  );
});

self.addEventListener('message', function (e) { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

function trimCache(name, max) {
  caches.open(name).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > max) { for (var i = 0; i < keys.length - max; i++) cache.delete(keys[i]); }
    });
  }).catch(function () {});
}
function putSafe(cacheName, request, response) {
  if (!response || !response.ok) return;
  if (response.type !== 'basic' && response.type !== 'cors') return;
  var copy = response.clone();
  caches.open(cacheName).then(function (cache) {
    cache.put(request, copy);
    if (cacheName === CDN_CACHE) trimCache(CDN_CACHE, CDN_MAX);
  }).catch(function () {});
}
function isData(url) {
  for (var i = 0; i < DATA_NAMES.length; i++) { if (url.pathname.indexOf(DATA_NAMES[i]) > -1) return true; }
  return false;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url; try { url = new URL(req.url); } catch (err) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (url.hostname === AUDIO_HOST) {
    e.respondWith(fetch(req).catch(function () { return new Response('', { status: 504 }); }));
    return;
  }

  if (isData(url)) {
    e.respondWith(
      caches.open(DATA_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req, { cache: 'no-store' }).then(function (res) { putSafe(DATA_CACHE, req, res); return res; });
        });
      })
    );
    return;
  }

  if (req.mode === 'navigate' || url.origin === self.location.origin) {
    e.respondWith(
      fetch(req, { cache: 'no-store' }).then(function (res) { putSafe(SHELL_CACHE, req, res); return res; })
        .catch(function () {
          return caches.match(req).then(function (hit) {
            return hit || caches.match('./index.html').then(function (shell) {
              return shell || new Response('Offline', { status: 503 });
            });
          });
        })
    );
    return;
  }

  if (CDN_HOSTS.indexOf(url.hostname) > -1) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) { fetch(req, { cache: 'no-store' }).then(function (res) { putSafe(CDN_CACHE, req, res); }).catch(function () {}); return hit; }
        return fetch(req, { cache: 'no-store' }).then(function (res) { putSafe(CDN_CACHE, req, res); return res; })
          .catch(function () { return new Response('', { status: 504 }); });
      })
    );
    return;
  }

  e.respondWith(
    fetch(req, { cache: 'no-store' }).then(function (res) { putSafe(SHELL_CACHE, req, res); return res; })
      .catch(function () { return caches.match(req).then(function (hit) { return hit || new Response('', { status: 504 }); }); })
  );
});
