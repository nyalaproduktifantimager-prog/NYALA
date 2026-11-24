// nyala-verses-en.js — Poin 5 (ayat): tukar terjemahan ayat ke Saheeh International saat EN. Fallback ID bila file belum ada. Drop-in, gagal-aman.
(function(){
'use strict';
var LANG='nyala_lang', FILE='en.saheeh.json';
// jumlah ayat per surah (1..114) -> offset global
var CNT=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,5,6];
var OFF=[];(function(){var acc=0;for(var i=0;i<114;i++){OFF[i]=acc;acc+=CNT[i];}})();
function globalNo(s,a){if(s<1||s>114)return null;return OFF[s-1]+a;}
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
var MAP=null,loading=false;
function norm(j){ // terima array global | {data:{surahs}} | peta {global:text}
  var m={};
  try{
    if(Array.isArray(j)){j.forEach(function(v,i){if(v&&v.text!=null)m[i+1]=v.text;});return m;}
    var surahs=j&&(j.data&&j.data.surahs)||j.surahs;
    if(surahs){surahs.forEach(function(s){var sn=+s.number;var ay=s.ayahs||[];ay.forEach(function(a){var g=globalNo(sn,+(a.numberInSurah||a.n||1));var tx=a.text!=null?a.text:(a.en!=null?a.en:null);if(g&&tx!=null)m[g]=tx;});});return m;}
    Object.keys(j).forEach(function(k){var n=+k;if(m[n]==null&&typeof j[k]==='string')m[n]=j[k];});
  }catch(e){}
  return m;
}
function load(){if(MAP||loading)return;loading=true;fetch(FILE).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(j){MAP=norm(j);loading=false;applyAll();}).catch(function(){MAP=null;loading=false;});}
function swapOne(ayahEl){
  if(lang()!=='en'||!MAP)return;
  var badge=ayahEl.querySelector('.ayah-badge');var tr=ayahEl.querySelector('.ayah-tr');
  if(!badge||!tr)return;var mm=(badge.textContent||'').match(/(\d+)\s*:\s*(\d+)/);if(!mm)return;
  var g=globalNo(+mm[1],+mm[2]);var en=MAP[g];if(en!=null&&tr.textContent!==en){tr.textContent=en;tr.setAttribute('data-no-i18n','1');}
}
function applyAll(){document.querySelectorAll('.ayah').forEach(swapOne);}
function obs(){if(!('MutationObserver' in window))return;var mo=new MutationObserver(function(){applyAll();});[ 'ayahList','recoResult' ].forEach(function(id){var el=document.getElementById(id);if(el)mo.observe(el,{childList:true,subtree:true});});}
function boot(){load();obs();window.addEventListener('nyala:lang',function(){if(lang()==='en')load();applyAll();});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
