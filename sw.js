/* sw.js — NYALA service worker v113 */
var VERSION="nyala-v113";
var SHELL=["./","./index.html","./quran.html","./dzikir.html","./app.js","./nyala-i18n.js","./nyala-hafalan.js","./nyala-verses-en.js","./nyala-en-content.js","./styles.css?v=19","./manifest.webmanifest?v=9","./icon.png","./quran-uthmani.json","./id.indonesian.json","./en.pickthall.json"];

self.addEventListener("install",function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    return Promise.all(SHELL.map(function(u){
      return c.add(new Request(u,{cache:"reload"})).catch(function(){return null;});
    }));
  }).then(function(){return self.skipWaiting();}));
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){if(k!==VERSION&&k.indexOf("nyala-")===0)return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener("message",function(e){if(e.data&&e.data.type==="SKIP_WAITING")self.skipWaiting();});

function isManifest(u){return u.pathname.endsWith("manifest.webmanifest");}
function isIcon(u){return /\.(png|jpg|jpeg|webp|ico|svg)$/i.test(u.pathname);}
function isMedia(u){return /\.(mp3|ogg|m4a|wav|opus)$/i.test(u.pathname);}
function isData(u){return /\.json$/i.test(u.pathname)&&!isManifest(u);}

self.addEventListener("fetch",function(e){
  var req=e.request;
  if(req.method!=="GET")return;
  var url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(isMedia(url))return;
  if(req.headers.has("range"))return;

  if(isManifest(url)||isIcon(url)){
    e.respondWith(fetch(req,{cache:"reload"}).then(function(r){
      if(r&&r.ok){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp);});}
      return r;
    }).catch(function(){
      return caches.match(req,{ignoreSearch:true}).then(function(h){
        return h||caches.match("icon.png").then(function(h2){return h2||Response.error();});
      });
    }));
    return;
  }
  if(isData(url)){
    e.respondWith(fetch(req,{cache:"no-store"}).then(function(r){
      if(r&&r.ok){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp);});}
      return r;
    }).catch(function(){return caches.match(req).then(function(h){return h||Response.error();});}));
    return;
  }
  if(req.mode==="navigate"){
    e.respondWith(fetch(req,{cache:"no-store"}).then(function(r){
      var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp);});
      return r;
    }).catch(function(){return caches.match(req).then(function(h){return h||caches.match("./index.html");});}));
    return;
  }
  e.respondWith(fetch(req,{cache:"no-store"}).then(function(r){
    if(r&&r.ok){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp);});}
    return r;
  }).catch(function(){return caches.match(req).then(function(h){return h||Response.error();});}));
});
