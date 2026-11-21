/* NYALA i18n v9 — mesin ringan: hasil terjemahan di-cache (memo), observer di-debounce
   + circuit breaker, tidak pernah menimpa teks hasil terjemahan sendiri.
   Tombol ID/EN + mute dipasang lebih dulu, tidak bergantung pada kamus.
   Teks Arab & transliterasi latin tidak pernah diterjemahkan.
   Tulisan buatan pengguna tidak pernah diterjemahkan. */
(function(){
'use strict';
var LS="nyala_lang", LM="nyala_muted", lang="id", muted=false;
try{ if(localStorage.getItem(LS)==="en") lang="en"; }catch(e){}
try{ muted=localStorage.getItem(LM)==="1"; }catch(e){}
document.documentElement.lang = lang==="en" ? "en" : "id";
window.__nyalaLang=lang;
try{
  if(navigator.serviceWorker){
    navigator.serviceWorker.addEventListener("message",function(ev){
      if(ev.data==="NYALA_RELOAD"){
        var k="nyala_sw_reload_v9";
        try{ if(!sessionStorage.getItem(k)){ sessionStorage.setItem(k,"1"); setTimeout(function(){location.reload();},350); } }catch(e2){}
      }
    });
  }
}catch(e){}

var WD_ID=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
var WD_EN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var MO_ID=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
var MO_EN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var HIJRI={"Muharam":"Muharram","Safar":"Safar","Rabiulawal":"Rabi al-Awwal","Rabiulakhir":"Rabi al-Thani","Jumadilawal":"Jumada al-Ula","Jumadilakhir":"Jumada al-Akhirah","Rajab":"Rajab","Sya'ban":"Sha'ban","Ramadan":"Ramadan","Syawal":"Shawwal","Zulkaidah":"Dhu al-Qadah","Zulhijah":"Dhu al-Hijjah"};
var PRAY={"Subuh":"Fajr","Dzuhur":"Dhuhr","Ashr":"Asr","Maghrib":"Maghrib","Isya":"Isha"};
function idx(a,v){for(var i=0;i<a.length;i++){if(a[i]===v)return i;}return -1;}

var PAT=[
{re:/^(\+\d+ XP · )([\s\S]+)$/,f:function(m){return m[1]+tr(m[2]);}},
{re:/^🎉 NAIK LEVEL! Sekarang: (.+)$/,f:function(m){return "🎉 LEVEL UP! Now: "+tr(m[1]);}},
{re:/^🔥 (\d+) hari$/,f:function(m){return "🔥 "+m[1]+(m[1]==="1"?" day":" days");}},
{re:/^(\d+) hari$/,f:function(m){return m[1]+(m[1]==="1"?" day":" days");}},
{re:/^(\d+% · )(.+)$/,f:function(m){return m[1]+tr(m[2]);}},
{re:/^💬 (.+)$/,f:function(m){return "💬 "+tr(m[1]);}},
{re:/^(\d+) \/ (\d+) tugas · (\d+)%$/,f:function(m){return m[1]+" / "+m[2]+" tasks · "+m[3]+"%";}},
{re:/^🍅 (\d+) sesi fokus · ⏱ (\d+) menit$/,f:function(m){return "🍅 "+m[1]+" focus sessions · ⏱ "+m[2]+" min";}},
{re:/^Lv\.(\d+) · (.+)$/,f:function(m){return "Lv."+m[1]+" · "+tr(m[2]);}},
{re:/^(\d+) XP lagi ke Lv\.(\d+)$/,f:function(m){return m[1]+" XP to Lv."+m[2];}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu), (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+", "+m[2]+" "+MO_EN[idx(MO_ID,m[3])];}},
{re:/^🗓️ (Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu), (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})$/,f:function(m){return "🗓️ "+WD_EN[idx(WD_ID,m[1])]+", "+m[2]+" "+MO_EN[idx(MO_ID,m[3])]+" "+m[4];}},
{re:/^(\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) – (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})$/,f:function(m){return m[1]+" "+MO_EN[idx(MO_ID,m[2])]+" – "+m[3]+" "+MO_EN[idx(MO_ID,m[4])]+" "+m[5];}},
{re:/^👏 Kemarin kamu beresin (\d+) tugas\. Keren!$/,f:function(m){return "👏 Yesterday you finished "+m[1]+" tasks. Nice!";}},
{re:/^🌤️ Kemarin belum ada catatan — hari ini kita mulai!$/,f:function(){return "🌤️ No record yesterday — today we start!";}},
{re:/^🌤️ Hari baru, lembaran baru\. Satu tugas kecil pun berarti!$/,f:function(){return "🌤️ New day, new page. Even one small task matters!";}},
{re:/^(.+) 🤍 \((\d)\/3\)$/,f:function(m){return tr(m[1])+" 🤍 ("+m[2]+"/3)";}},
{re:/^(🍅+)(?: ×(\d+))? \((\d+) sesi\)$/,f:function(m){return m[1]+(m[2]?" ×"+m[2]:"")+" ("+m[3]+" sessions)";}},
{re:/^Total dzikir hari ini: (\d+)$/,f:function(m){return "Total dhikr today: "+m[1];}},
{re:/^Adzan (.+?)( \(besok\))?$/,f:function(m){return "Adhan "+(PRAY[m[1]]||m[1])+(m[2]?" (tomorrow)":"");}},
{re:/^(?:(\d+) jam )?(\d+) mnt (\d+) dtk lagi$/,f:function(m){return "in "+(m[1]?m[1]+"h ":"")+m[2]+"m "+m[3]+"s";}},
{re:/^(.+) · metode Kemenag · koreksi (-?\d+) mnt via ⚙️$/,f:function(m){return tr(m[1])+" · Kemenag method · offset "+m[2]+" min via ⚙️";}},
{re:/^🌙 (\d+) (.+) (\d+) H$/,f:function(m){return "🌙 "+m[1]+" "+(HIJRI[m[2]]||m[2])+" "+m[3]+" AH";}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu) (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) · (\d+) tugas beres · tap untuk rincian$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+" "+m[2]+" "+MO_EN[idx(MO_ID,m[3])]+" · "+m[4]+" tasks done · tap for details";}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu) (\d+)( · beres ✓)?$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+" "+m[2]+(m[3]?" · done ✓":"");}},
{re:/^📥 (\d+) tugas dibawa ke hari ini\. Semangat!$/,f:function(m){return "📥 "+m[1]+" tasks carried to today. Keep going!";}},
{re:/^🕌 Timer diset sampai adzan (.+)\. Gas!$/,f:function(m){return "🕌 Timer set until adhan "+(PRAY[m[1]]||m[1])+". Go!";}},
{re:/^Adzan (.+) sebentar lagi — siap-siap sholat 🕌$/,f:function(m){return "Adhan "+(PRAY[m[1]]||m[1])+" is soon — get ready to pray 🕌";}},
{re:/^⏱️ Timer custom (\d+) menit siap\. Gas!$/,f:function(m){return "⏱️ Custom "+m[1]+"-minute timer ready. Go!";}},
{re:/^Angka diset: (\d+) menit — tap "Pakai" untuk mulai ⏱️$/,f:function(m){return "Set to "+m[1]+" minutes — tap \"Use\" to start ⏱️";}},
{re:/^Fokus custom (\d+) menit beres! 💪$/,f:function(m){return "Custom "+m[1]+"-minute focus done! 💪";}},
{re:/^Halo, (.+)! Ayo nyalakan harimu ✨$/,f:function(m){return "Hello, "+m[1]+"! Let us light up your day ✨";}},
{re:/^Siap, (.+)! Kita nyala bareng 🔥$/,f:function(m){return "Ready, "+m[1]+"! We ignite together 🔥";}},
{re:/^Habit "(.+)" beres! 💪$/,f:function(m){return "Habit \""+m[1]+"\" done! 💪";}},
{re:/^Target (.+) tercapai! 📿$/,f:function(m){return "Target "+m[1]+" reached! 📿";}},
{re:/^Hapus kebiasaan "(.+)"\?$/,f:function(m){return "Delete habit \""+m[1]+"\"?";}},
{re:/^Pulihkan data dari cadangan (.+)\? Data saat ini akan ditimpa\.$/,f:function(m){return "Restore data from backup "+m[1]+"? Current data will be overwritten.";}},
{re:/^(\d+) \/ (\d+) selesai$/,f:function(m){return m[1]+" / "+m[2]+" done";}},
{re:/^Memuat data Qur'an… (\d+)s$/,f:function(m){return "Loading Qur'an data… "+m[1]+"s";}},
{re:/^\((\d+:\d+)\) (.+) — NYALA$/,f:function(m){return "("+m[1]+") "+tr(m[2])+" — NYALA";}}
];

var ARABIC=/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
function core(s){return String(s).replace(/\u00a0/g," ").replace(/^\s+/,"").replace(/\s+$/,"");}
var memo=new Map();
function D(){return window.__nyalaDict||{};}
function tr(s){
  if(typeof s!=="string")return s;
  var c=core(s);
  if(!c)return s;
  if(ARABIC.test(c))return s;
  if(memo.has(c))return memo.get(c);
  var out=c;
  var d=D();
  if(Object.prototype.hasOwnProperty.call(d,c))out=d[c];
  else{
    for(var i=0;i<PAT.length;i++){var m=c.match(PAT[i].re);if(m){out=PAT[i].f(m);break;}}
  }
  memo.set(c,out);
  return out;
}
window.__nyalaT=function(s,dir){return dir==="en"?tr(s):s;};

var origT=new WeakMap(),origA=new WeakMap(),origB=new WeakMap(),ours=new WeakSet(),applying=false;
var SKIP=".d-chip,[lang=\"ar\"],[dir=\"rtl\"],.arab,.arabic,.latin,.translit,.transliteration,[data-en],.t-text,.h-name,#nameChip,#dayOvList,#dayOvSyukur,.nyala-tools";
function protectedEl(el){return !!(el&&el.closest&&el.closest(SKIP));}
function trText(node,refresh){
  if(applying||protectedEl(node.parentElement))return;
  var cur=node.nodeValue;if(cur==null)return;
  if(!origT.has(node)||!ours.has(node))origT.set(node,cur);
  var orig=origT.get(node);
  var want=lang==="en"?tr(orig):core(orig);
  var lead=/^\s*/.exec(cur)[0],trail=/\s*$/.exec(cur)[0];
  var out=(lang==="en")?(lead+want+trail):orig;
  if(out!==cur){applying=true;node.nodeValue=out;applying=false;ours.add(node);}
}
var ATTRS=["placeholder","title","aria-label"];
function trAttr(el,name){
  if(applying||protectedEl(el))return;
  var cur=el.getAttribute(name);if(cur==null)return;
  var store=origA.get(el);if(!store){store={};origA.set(el,store);}
  if(!(name in store))store[name]=cur;
  var out=lang==="en"?tr(store[name]):store[name];
  if(out!==cur){applying=true;el.setAttribute(name,out);applying=false;}
}
function bilingualEl(el){
  if(!el||!el.hasAttribute||!el.hasAttribute("data-en"))return;
  if(!origB.has(el))origB.set(el,el.textContent);
  var want=lang==="en"?el.getAttribute("data-en"):(el.getAttribute("data-id")||origB.get(el));
  if(want!=null&&el.textContent!==want){applying=true;el.textContent=want;applying=false;ours.add(el);}
}
function walk(root){
  if(!root)return;
  if(root.nodeType===3){trText(root,false);return;}
  if(root.nodeType!==1&&root.nodeType!==9)return;
  if(root.nodeType===1){
    bilingualEl(root);
    for(var a=0;a<ATTRS.length;a++)trAttr(root,ATTRS[a]);
    if(protectedEl(root))return;
  }
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,null,false);
  var n=w.currentNode;
  while(n){
    if(n.nodeType===3)trText(n,false);
    else if(n.nodeType===1){
      if(n.hasAttribute&&n.hasAttribute("data-en")){bilingualEl(n);}
      else if(!protectedEl(n)){for(var b=0;b<ATTRS.length;b++)trAttr(n,ATTRS[b]);}
    }
    n=w.nextNode();
  }
}
function applyAll(){try{walk(document.documentElement);}catch(e){}}

var style=document.createElement("style");
style.textContent="[hidden]{display:none!important}.nyala-tools{display:inline-flex;align-items:center;gap:6px;vertical-align:middle}.nyala-lang{display:inline-flex;gap:4px;padding:3px;border:1px solid rgba(212,165,165,.34);border-radius:999px;background:rgba(212,165,165,.10)}.nyala-lang button,.nyala-mute{border:none;background:transparent;color:#c9aeb2;font:800 .72rem/1 \"Plus Jakarta Sans\",system-ui,sans-serif;padding:6px 11px;border-radius:999px;cursor:pointer;letter-spacing:.6px}.nyala-lang button.on{background:linear-gradient(120deg,#b76e79,#9c5a66);color:#fff;box-shadow:0 0 14px rgba(212,165,165,.35)}.nyala-mute{border:1px solid rgba(212,165,165,.34);background:rgba(212,165,165,.10);font-size:.85rem;padding:6px 10px}.nyala-mute.off{color:#8a6f74}.nyala-tools.floating{position:fixed;top:10px;right:10px;z-index:120;background:rgba(14,12,13,.88);backdrop-filter:blur(8px);padding:6px;border-radius:999px;border:1px solid rgba(212,165,165,.34)}";
document.head.appendChild(style);

var tools=document.createElement("div");tools.className="nyala-tools";
var box=document.createElement("div");
box.className="nyala-lang";box.setAttribute("role","group");box.setAttribute("aria-label","Language / Bahasa");
box.innerHTML="<button type=\"button\" data-l=\"id\">ID</button><button type=\"button\" data-l=\"en\">EN</button>";
var mute=document.createElement("button");
mute.type="button";mute.className="nyala-mute";mute.setAttribute("aria-label","Mute / unmute sound");
function paint(){
  var bs=box.querySelectorAll("button");
  for(var i=0;i<bs.length;i++){bs[i].classList.toggle("on",bs[i].getAttribute("data-l")===lang);bs[i].setAttribute("aria-pressed",bs[i].getAttribute("data-l")===lang?"true":"false");}
  mute.textContent=muted?"🔕":"🔔";
  mute.classList.toggle("off",muted);
  mute.setAttribute("aria-pressed",muted?"true":"false");
}
function setLang(l){
  lang=l;window.__nyalaLang=l;
  try{localStorage.setItem(LS,l);}catch(e){}
  document.documentElement.lang=l==="en"?"en":"id";
  applyAll();paint();
}
box.addEventListener("click",function(e){var b=e.target.closest("button");if(b&&b.getAttribute("data-l")!==lang)setLang(b.getAttribute("data-l"));});
mute.addEventListener("click",function(){muted=!muted;try{localStorage.setItem(LM,muted?"1":"0");}catch(e){}paint();});
tools.appendChild(box);tools.appendChild(mute);
function mount(){
  var host=document.querySelector(".top-in");
  if(host){host.appendChild(tools);}else{tools.classList.add("floating");document.body.appendChild(tools);}
  paint();
}
try{ if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){mount();applyAll();});} else {mount();applyAll();} }catch(e){ try{mount();}catch(e2){} }

var _c=window.confirm,_p=window.prompt;
window.confirm=function(msg){return _c.call(window,lang==="en"?tr(String(msg)):msg);};
window.prompt=function(msg,def){return _p.call(window,lang==="en"?tr(String(msg)):msg,def);};
try{
  var _ft=CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText=function(t,x,y,mw){
    if(lang==="en"&&typeof t==="string"&&/[A-Za-zÀ-ÿ]/.test(t)){t=tr(t);}
    return _ft.call(this,t,x,y,mw);
  };
}catch(e){}
try{
  var AC=window.AudioContext||window.webkitAudioContext;
  if(AC&&window.GainNode){
    var _gc=GainNode.prototype.connect;
    GainNode.prototype.connect=function(dest){
      if(muted&&dest===this.context.destination){
        var c=this.context;
        if(!c.__nyalaSilent){var g=c.createGain();g.gain.value=0;_gc.call(g,c.destination);c.__nyalaSilent=g;}
        return _gc.call(this,c.__nyalaSilent);
      }
      return _gc.apply(this,arguments);
    };
  }
}catch(e){}

/* Observer ringan: ditunda per frame, hanya body, dengan pemutus arus. */
try{
  var pending=new Set(),raf=0,storm=0,stormT=0,paused=false;
  function flush(){
    raf=0;
    if(paused||pending.size===0)return;
    var arr=[];pending.forEach(function(n){arr.push(n);});pending.clear();
    storm+=arr.length;
    if(!stormT){stormT=setTimeout(function(){stormT=0;storm=0;},1000);}
    if(storm>2500){paused=true;setTimeout(function(){paused=false;storm=0;},1500);return;}
    for(var i=0;i<arr.length;i++){
      var n=arr[i];
      if(!n||!n.isConnected&&n.nodeType===3)continue;
      if(n.nodeType===3)trText(n,true);
      else if(n.nodeType===1)walk(n);
    }
  }
  function enqueue(n){
    if(paused||applying)return;
    pending.add(n);
    if(!raf)raf=requestAnimationFrame(flush);
  }
  var mo=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var mu=muts[i];
      if(mu.type==="characterData"){enqueue(mu.target);}
      else if(mu.type==="childList"){
        for(var j=0;j<mu.addedNodes.length;j++){enqueue(mu.addedNodes[j]);}
      }
    }
  });
  mo.observe(document.body,{childList:true,subtree:true,characterData:true});
}catch(e){}

/* Muat kamus; setelah tiba, cache dibersihkan lalu terjemahan ulang sekali. */
try{
  fetch("i18n-dict.json?nv=9",{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("http");return r.json();}).then(function(d){
    window.__nyalaDict=d||{};
    memo.clear();
    applyAll();
  }).catch(function(){ window.__nyalaDict=window.__nyalaDict||{}; });
}catch(e){ window.__nyalaDict=window.__nyalaDict||{}; }
})();
