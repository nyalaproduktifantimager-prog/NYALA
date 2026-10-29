var CACHE='nyala-v8';
var CORE=['./','./index.html','./quran.html','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(CORE.map(function(u){
        return c.add(u).catch(function(){});
      }));
    }).then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

function isCacheable(url){
  try{
    var u=new URL(url);
    return u.origin===self.location.origin ||
      u.hostname.indexOf('fonts.googleapis.com')>-1 ||
      u.hostname.indexOf('fonts.gstatic.com')>-1 ||
      u.hostname.indexOf('api.alquran.cloud')>-1 ||
      u.hostname.indexOf('everyayah.com')>-1 ||
      u.hostname.indexOf('cdn.equran.id')>-1 ||
      u.hostname.indexOf('cdn.islamic.network')>-1;
  }catch(e){return false;}
}

self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit)return hit;
      return fetch(e.request).then(function(res){
        if(res&&(res.ok||res.type==='opaque')&&isCacheable(e.request.url)){
          var copy=res.clone();
          caches.open(CACHE).then(function(c){c.put(e.request,copy).catch(function(){});});
        }
        return res;
      }).catch(function(){
        if(e.request.mode==='navigate')return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});