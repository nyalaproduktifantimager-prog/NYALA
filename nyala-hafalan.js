/* nyala-hafalan.js — single owner of the Memorization Tracker.
   grey → pink (in progress) → gold (memorized, PERMANENT + date). Never cycles back. */
(function(){
'use strict';
var SKEY='nyala_hafalan_v1',MAIN='nyala_v1',LANG='nyala_lang';
function $(i){return document.getElementById(i);}
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
function load(){try{var r=localStorage.getItem(SKEY);if(r){var o=JSON.parse(r);if(o&&typeof o==='object')return o;}}catch(e){}return {};}
function save(){try{localStorage.setItem(SKEY,JSON.stringify(store));}catch(e){}}
var store=load();
var MON={id:['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
function fmt(iso){var l=lang();try{var d=new Date(iso);return d.getDate()+' '+MON[l][d.getMonth()]+' '+d.getFullYear();}catch(e){return '';}}
function migrate(){
  try{var r=localStorage.getItem(MAIN);if(!r)return;var m=JSON.parse(r);var h=m&&m.quran&&m.quran.hafal;if(!h)return;
    Object.keys(h).forEach(function(k){var n=parseInt(k,10);if(isNaN(n))return;
      if(h[k]===2&&(!store[n]||store[n].s!=='hafal'))store[n]={s:'hafal',d:(store[n]&&store[n].d)||new Date().toISOString()};
      else if(h[k]===1&&!store[n])store[n]={s:'proses',d:null};});
    save();}catch(e){}
}
function toast(m,gold){var b=$('toasts');if(!b)return;var t=document.createElement('div');
  t.className='toast'+(gold?' gold':'');t.textContent=m;b.appendChild(t);
  while(b.children.length>3)b.removeChild(b.firstChild);
  setTimeout(function(){t.classList.add('go');setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},320);},3000);}
function addXP(n){try{var r=localStorage.getItem(MAIN),o=r?JSON.parse(r):{};o.xp=(o.xp||0)+n;
  localStorage.setItem(MAIN,JSON.stringify(o));var c=$('qXP');if(c)c.textContent=o.xp+' XP';}catch(e){}}
function st(n){var r=store[n];return r?r.s:'belum';}
function cls(s){return 'haf-cell '+(s==='hafal'?'st2':s==='proses'?'st1':'st0');}
function paint(){
  var g=$('hafGrid');if(!g)return;
  var cells=g.children;
  for(var i=0;i<cells.length;i++){
    var c=cells[i],n=parseInt(c.getAttribute('data-n'),10);
    if(isNaN(n))n=parseInt((c.textContent||'').replace(/\D/g,''),10);
    if(isNaN(n))continue;
    c.setAttribute('data-n',n);
    var s=st(n),want=cls(s);
    if(c.className!==want)c.className=want;
    var badge=c.querySelector('.nyalaHafDate');
    if(s==='hafal'&&store[n].d){
      if(!badge){badge=document.createElement('span');badge.className='nyalaHafDate';badge.setAttribute('data-no-i18n','1');c.appendChild(badge);}
      var txt='✓ '+fmt(store[n].d);
      if(badge.textContent!==txt)badge.textContent=txt;
      c.title=(lang()==='en'?'Memorized':'Hafal')+' · '+fmt(store[n].d);
    }else if(badge){badge.parentNode.removeChild(badge);}
  }
  var h=0;Object.keys(store).forEach(function(k){if(store[k]&&store[k].s==='hafal')h++;});
  var f=$('hafFill');if(f)f.style.width=Math.round(h/114*100)+'%';
  var t=$('hafTxt');
  if(t){var en=lang()==='en';
    t.textContent=h+' / 114 '+(en?'surahs memorized':'surah dihafal')+(h>=30?(en?' — MashaAllah, Khatam Hafizh! 🏆':' — Masya Allah, Khatam Hafizh! 🏆'):'');}
}
function takeOver(){
  var g=$('hafGrid');if(!g)return false;
  var kids=Array.prototype.slice.call(g.children);
  if(!kids.length)return false;
  kids.forEach(function(c,i){
    var n=parseInt((c.textContent||'').replace(/\D/g,''),10)||i+1;
    var fresh=c.cloneNode(true);            /* strips quran.html's own click listeners */
    fresh.setAttribute('data-n',n);
    fresh.textContent=n;
    if(c.parentNode)c.parentNode.replaceChild(fresh,c);
  });
  g.__owned=true;
  return true;
}
function onClick(e){
  var g=$('hafGrid');if(!g)return;
  var c=e.target&&e.target.closest?e.target.closest('.haf-cell'):null;
  if(!c||!g.contains(c))return;
  e.stopPropagation();e.preventDefault();
  var n=parseInt(c.getAttribute('data-n'),10);if(isNaN(n))return;
  var s=st(n),en=lang()==='en';
  if(s==='hafal'){toast('✓ '+(en?'Already memorized':'Sudah hafal')+' · '+fmt(store[n].d),true);return;}
  if(s==='belum'){store[n]={s:'proses',d:null};save();paint();
    toast((en?'Surah ':'Surah ')+n+(en?': in progress 🌱':': proses 🌱'));return;}
  store[n]={s:'hafal',d:new Date().toISOString()};save();addXP(25);paint();
  toast('+25 XP · '+(en?'Surah ':'Surah ')+n+(en?' MEMORIZED! 🏆':' HAFAL! 🏆'),true);
}
var healing=false;
function boot(){
  migrate();
  var tries=0;
  function init(){
    var g=$('hafGrid');
    if(!g||!g.children.length){if(tries++<80)setTimeout(init,100);return;}
    takeOver();paint();
    g.addEventListener('click',onClick,true);
    if('MutationObserver' in window){
      new MutationObserver(function(){
        if(healing)return;healing=true;
        var g2=$('hafGrid');
        if(g2){
          var need=false,k=Array.prototype.slice.call(g2.children);
          for(var i=0;i<k.length;i++){if(!k[i].getAttribute('data-n')){need=true;break;}}
          if(need){takeOver();g2.removeEventListener('click',onClick,true);g2.addEventListener('click',onClick,true);}
          paint();
        }
        healing=false;
      }).observe(g,{childList:true});
    }
    window.addEventListener('nyala:lang',paint);
    if(!document.getElementById('nyalaHafStyle')){
      var s=document.createElement('style');s.id='nyalaHafStyle';
      s.textContent='.haf-cell{position:relative}.haf-cell.st0{background:rgba(0,0,0,.25);color:var(--ink-soft);border-color:var(--line)}'+
      '.haf-cell.st1{background:rgba(212,165,165,.16);color:var(--rose-soft);border-color:var(--rose)}'+
      '.haf-cell.st2{background:linear-gradient(120deg,var(--gold),var(--gold-deep));color:#241a0c;border-color:var(--gold)}'+
      '.nyalaHafDate{display:block;font-size:.46rem;line-height:1.15;font-weight:800;margin-top:2px;color:#3a2a10}';
      document.head.appendChild(s);
    }
  }
  init();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
