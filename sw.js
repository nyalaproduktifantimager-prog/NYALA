var VERSION = 'nyala-v103';
var SHELL=['./','./index.html','./styles.css?v=19','./app.js','./nyala-i18n.js','./nyala-hafalan.js','./nyala-verses-en.js','./nyala-en-content.js','./dzikir.html','./quran.html','./quran-uthmani.json','./id.indonesian.json','./en.pickthall.json'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){
      return Promise.all(SHELL.map(function(u){
        return c.add(new Request(u,{cache:'reload'})).catch(function(){return null;});
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

function isManifest(u){return u.pathname.endsWith('manifest.webmanifest');}
function isIcon(u){return /\.(png|jpg|jpeg|webp|ico)$/i.test(u.pathname);}
function isMedia(u){return /\.(mp3|ogg|m4a|wav|opus)$/i.test(u.pathname);}
function isData(u){return /\.json$/i.test(u.pathname)&&!isManifest(u);}

self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(isMedia(url))return;
  if(req.headers.has('range'))return;

  if(isManifest(url)||isIcon(url)){
    e.respondWith(
      fetch(req,{cache:'reload'}).then(function(res){
        if(res&&res.ok){var copy=res.clone();caches.open(VERSION).then(function(c){c.put(req,copy);});}
        return res;
      }).catch(function(){
        return caches.match(req,{ignoreSearch:true}).then(function(hit){
          return hit||caches.match('icon.png').then(function(h2){return h2||Response.error();});
        });
      })
    );
    return;
  }

  if(isData(url)){
    e.respondWith(
      caches.match(req).then(function(hit){
        var net=fetch(req,{cache:'no-store'}).then(function(res){
          if(res&&res.ok){var copy=res.clone();caches.open(VERSION).then(function(c){c.put(req,copy);});}
          return res;
        }).catch(function(){return hit||Response.error();});
        return hit||net;
      })
    );
    return;
  }

  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req,{cache:'no-store'}).then(function(res){
        var copy=res.clone();caches.open(VERSION).then(function(c){c.put(req,copy);});
        return res;
      }).catch(function(){
        return caches.match(req).then(function(hit){return hit||caches.match('./index.html');});
      })
    );
    return;
  }

  e.respondWith(
    fetch(req,{cache:'no-store'}).then(function(res){
      if(res&&res.ok){var copy=res.clone();caches.open(VERSION).then(function(c){c.put(req,copy);});}
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){return hit||Response.error();});
    })
  );
});
