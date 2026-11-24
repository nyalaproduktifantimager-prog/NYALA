// nyala-verses-en.js — swaps Qur'an verse translation to Pickthall (en.pickthall.json)
// for BOTH the mushaf (#ayahList) and "Verses for your heart" (#recoResult), plus any
// future .ayah inserted anywhere. Arabic text untouched. Reversible to Indonesian.
(function(){
'use strict';
var LANG='nyala_lang';
var FILES=['en.pickthall.json','en.pickthal.json','en.saheeh.json','en.yusufali.json'];
var ATTR={
 'en.pickthall.json':'English translation: Marmaduke Pickthall (1930) — public domain.',
 'en.pickthal.json':'English translation: Marmaduke Pickthall (1930) — public domain.',
 'en.saheeh.json':'English translation: Saheeh International — used with attribution; not public domain.',
 'en.yusufali.json':'English translation: Abdullah Yusuf Ali — used with attribution.'
};
var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
function hasAr(s){return typeof s==='string'&&AR.test(s);}
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
var MAP=null,SRC=null,loading=false,tried=0,orig=new WeakMap();
var CNT=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,5,6];
var BASE=[];(function(){var acc=1;for(var i=0;i<114;i++){BASE[i]=acc;acc+=CNT[i];}})();
function b2g(s,a){if(s<1||s>114)return null;return BASE[s-1]+(a-1);}
function norm(j){
  var m={},valid=0;
  try{
    var surahs=j&&(j.data&&j.data.surahs)||j.surahs;
    if(surahs&&surahs.length&&surahs[0]&&surahs[0].ayahs){
      surahs.forEach(function(s){var sn=s.number;(s.ayahs||[]).forEach(function(a){
        var an=(a.numberInSurah!=null)?a.numberInSurah:a.n,tx=a.text;
        if(sn!=null&&an!=null&&typeof tx==='string'&&!hasAr(tx)){m[sn+':'+an]=tx;valid++;}
      });});
      return valid?m:null;
    }
    if(Array.isArray(j)&&j.length&&j[0]&&('number'in j[0])&&('text'in j[0])){
      var seen={},dup=false,max=0,min=Infinity;
      j.forEach(function(o){
        var g=o.number,tx=o.text;
        if(typeof g!=='number'||g<1||g>6236)return;
        if(seen[g])dup=true;seen[g]=1;
        if(g>max)max=g;if(g<min)min=g;
        if(typeof tx==='string'&&!hasAr(tx)){m[String(g)]=tx;valid++;}
      });
      if(dup||max!==6236||min!==1||valid!==6236)return null;
      return m;
    }
    if(j&&typeof j==='object'){Object.keys(j).forEach(function(k){var v=j[k];if(typeof v==='string'&&!hasAr(v)){m[k]=v;valid++;}});}
  }catch(e){}
  return valid?m:null;
}
function tryNext(){
  if(tried>=FILES.length){loading=false;return;}
  var f=FILES[tried];tried++;
  fetch(f).then(function(r){if(!r.ok)throw 0;return r.json();})
    .then(function(j){var m=norm(j);if(m){MAP=m;SRC=f;loading=false;protectAndSwap();}else{tryNext();}})
    .catch(function(){tryNext();});
}
function load(){if(MAP||loading)return;loading=true;tried=0;tryNext();}
function keyOf(el){var b=el.querySelector('.ayah-badge');if(!b)return null;var t=(b.textContent||'').trim();var mm=t.match(/(\d+)\s*:\s*(\d+)/);return mm?(mm[1]+':'+mm[2]):null;}
function lookup(k){
  if(!MAP)return null;
  if(MAP[k]!=null)return MAP[k];
  var mm=k.match(/(\d+):(\d+)/);
  if(mm){var g=b2g(+mm[1],+mm[2]);if(g!=null&&MAP[String(g)]!=null)return MAP[String(g)];}
  return null;
}
function protectAndSwap(){
  var L=lang();
  var els=document.querySelectorAll('.ayah');
  for(var i=0;i<els.length;i++){
    var el=els[i];
    var tr=el.querySelector('.ayah-tr');if(!tr)continue;
    var k=keyOf(el);if(!k)continue;
    tr.setAttribute('data-no-i18n','1');
    if(!orig.has(tr))orig.set(tr,tr.textContent);
    if(L==='en'&&MAP){var en=lookup(k);if(en!=null&&!hasAr(en)&&tr.textContent!==en)tr.textContent=en;}
    else{var id=orig.get(tr);if(id!=null&&tr.textContent!==id)tr.textContent=id;}
  }
  paintAttr();
}
function paintAttr(){
  var row=document.querySelector('.sync-row');if(!row)return;
  var el=document.getElementById('nyalaEnAttr');
  var show=(lang()==='en'&&SRC&&ATTR[SRC]);
  if(!el){el=document.createElement('span');el.id='nyalaEnAttr';el.className='chip';el.setAttribute('data-no-i18n','1');el.style.cssText='font-size:.66rem;white-space:normal;text-align:left;';row.appendChild(el);}
  if(show){el.style.display='';el.textContent='📜 '+ATTR[SRC];}else{el.style.display='none';el.textContent='';}
}
var pend=false;
function schedule(){if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;protectAndSwap();});}
function boot(){
  protectAndSwap();
  if('MutationObserver' in window){
    var mo=new MutationObserver(schedule);
    mo.observe(document.body,{childList:true,subtree:true});
  }
  if(lang()==='en')load();
}
window.addEventListener('nyala:lang',function(){if(lang()==='en')load();protectAndSwap();});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
