/* NYALA — service worker v11: murottal lintas halaman, ikon segar, data pengguna aman */
var VERSION='nyala-v11';
var SHELL=['./','./index.html','./styles.css?v=8','./app.js','./dzikir.html','./quran.html'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){
      return Promise.all(SHELL.map(function(u){
        return c.add(new Request(u,{cache:'reload'})).catch(function(){});
      }));
    }).then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k!==VERSION&&k.indexOf('nyala-')===0)return caches.delete(k);
      }));
    }).then(function(){return self.clients.claim();})
  );
});

self.addEventListener('message',function(e){
  if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();
});

function isManifest(url){return url.pathname.endsWith('manifest.webmanifest');}
function isIcon(url){return /\.(png|svg|jpg|jpeg|webp|ico)$/i.test(url.pathname);}
function isMedia(url){return /\.(mp3|ogg|m4a|wav|opus)$/i.test(url.pathname);}

self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);

  if(url.origin!==self.location.origin){
    if(isMedia(url))return;
    return;
  }
  if(isMedia(url))return;
  if(req.headers.has('range'))return;

  if(isManifest(url)||isIcon(url)){
    e.respondWith(
      fetch(req,{cache:'no-store'}).then(function(res){
        var copy=res.clone();
        caches.open(VERSION).then(function(c){c.put(req,copy);});
        return res;
      }).catch(function(){
        return caches.match(req).then(function(hit){return hit||Response.error();});
      })
    );
    return;
  }

  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req,{cache:'no-store'}).then(function(res){
        var copy=res.clone();
        caches.open(VERSION).then(function(c){c.put(req,copy);});
        return res;
      }).catch(function(){
        return caches.match(req).then(function(hit){return hit||caches.match('./index.html');});
      })
    );
    return;
  }

  e.respondWith(
    fetch(req,{cache:'no-store'}).then(function(res){
      var copy=res.clone();
      caches.open(VERSION).then(function(c){c.put(req,copy);});
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){return hit||Response.error();});
    })
  );
});
