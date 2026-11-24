// nyala-hafalan.js — Memorization tracker: pink "in progress" persists until tapped to
// gold "memorized"; gold is PERMANENT (cannot be un-marked) and shows the memorized date.
// Source of truth = nyala_hafalan_v1 (survives app.js overwrites of nyala_v1).
(function(){
'use strict';
var SKEY='nyala_hafalan_v1',MAIN='nyala_v1',LANG='nyala_lang';
function $(id){return document.getElementById(id);}
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
function load(){try{var r=localStorage.getItem(SKEY);if(r){var o=JSON.parse(r);if(o&&typeof o==='object')return o;}}catch(e){}return {};}
function save(o){try{localStorage.setItem(SKEY,JSON.stringify(o));}catch(e){}}
var store=load();
var MON={id:['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
function fmtDate(iso,l){try{var d=new Date(iso);return d.getDate()+' '+MON[l][d.getMonth()]+' '+d.getFullYear();}catch(e){return '';}}
function migrate(){
  try{var r=localStorage.getItem(MAIN);if(!r)return;var m=JSON.parse(r);var h=m&&m.quran&&m.quran.hafal;if(!h)return;
    Object.keys(h).forEach(function(k){var n=parseInt(k,10);if(isNaN(n))return;var v=h[k];
      if(v===2){if(!store[n]||store[n].s!=='hafal')store[n]={s:'hafal',d:(store[n]&&store[n].d)||new Date().toISOString()};}
      else if(v===1){if(!store[n])store[n]={s:'proses',d:null};}
    });save(store);}catch(e){}
}
function grid(){return $('hafGrid');}
function cells(g){return Array.prototype.slice.call(g.children);}
function noOf(cell){var n=parseInt((cell.textContent||'').replace(/[^0-9]/g,''),10);return isNaN(n)?null:n;}
function stateOfClass(c){var s=c.className||'';if(s.indexOf('st2')>-1)return'hafal';if(s.indexOf('st1')>-1)return'proses';return'belum';}
function classOfState(s){return s==='hafal'?'haf-cell st2':(s==='proses'?'haf-cell st1':'haf-cell st0');}
function badge(cell,iso){
  var old=cell.querySelector('.nyalaHafDate');if(old)old.parentNode.removeChild(old);
  var l=lang(),sp=document.createElement('span');sp.className='nyalaHafDate';sp.setAttribute('data-no-i18n','1');
  sp.textContent='✓ '+fmtDate(iso,l);sp.title=(l==='en'?'Memorized':'Hafal')+' · '+fmtDate(iso,l);
  cell.appendChild(sp);
}
function heal(){
  var g=grid();if(!g)return;
  cells(g).forEach(function(cell){
    var n=noOf(cell);if(n==null)return;var rec=store[n];var s=rec?rec.s:'belum';
    var want=classOfState(s);if(cell.className!==want)cell.className=want;
    if(s==='hafal'&&rec&&rec.d)badge(cell,rec.d);
    else{var b=cell.querySelector('.nyalaHafDate');if(b)b.parentNode.removeChild(b);}
  });
  var h=0;Object.keys(store).forEach(function(k){if(store[k]&&store[k].s==='hafal')h++;});
  var f=$('hafFill');if(f)f.style.width=Math.round(h/114*100)+'%';
  var t=$('hafTxt');if(t)t.textContent=h+' / 114 '+(lang()==='en'?'surahs memorized':'surah dihafal')+(h>=30?(lang()==='en'?' — MashaAllah, Khatam Hafizh! 🏆':' — Masya Allah, Khatam Hafizh! 🏆'):'');
}
function toast(m,g){var b=$('toasts');if(!b)return;var t=document.createElement('div');t.className='toast'+(g?' gold':'');t.textContent=m;b.appendChild(t);while(b.children.length>3)b.removeChild(b.firstChild);setTimeout(function(){t.classList.add('go');setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},320);},3000);}
function onClickCapture(e){
  var g=grid();if(!g)return;var cell=e.target&&e.target.closest?e.target.closest('.haf-cell'):null;
  if(!cell||!g.contains(cell))return;var n=noOf(cell);if(n==null)return;
  if(store[n]&&store[n].s==='hafal'){
    e.stopPropagation();e.preventDefault();
    toast('✓ '+(lang()==='en'?'Already memorized':'Sudah hafal')+' · '+fmtDate(store[n].d,lang()),true);
  }
}
function onClickBubble(e){
  var g=grid();if(!g)return;var cell=e.target&&e.target.closest?e.target.closest('.haf-cell'):null;
  if(!cell||!g.contains(cell))return;var n=noOf(cell);if(n==null)return;
  setTimeout(function(){
    var s=stateOfClass(cell);var prev=store[n];
    if(s==='hafal'){store[n]={s:'hafal',d:(prev&&prev.d)||new Date().toISOString()};}
    else if(s==='proses'){store[n]={s:'proses',d:(prev&&prev.d)||null};}
    else{if(prev&&prev.s==='hafal'){/* keep permanent */}else{store[n]={s:'belum',d:null};}}
    save(store);heal();
  },0);
}
function boot(){
  migrate();
  var g=grid();if(!g)return;
  heal();
  g.addEventListener('click',onClickCapture,true);
  g.addEventListener('click',onClickBubble,false);
  if('MutationObserver' in window)new MutationObserver(function(){heal();}).observe(g,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('nyala:lang',heal);
  var st=document.createElement('style');st.textContent='.nyalaHafDate{display:block;font-size:.5rem;line-height:1.1;color:var(--gold,#e5c786);font-weight:800;margin-top:1px}';document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
