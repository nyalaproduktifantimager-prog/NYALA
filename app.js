/* NYALA app.js — VERSI FINAL STABIL (VALIDASI MANUAL) */
(function(){
'use strict';
var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;});
var KEY='nyala_v1';
function $(id){return document.getElementById(id);}
function todayKey(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function daysAgoKey(n){var d=new Date();d.setDate(d.getDate()-n);return todayKey(d);}
function pad2(n){return String(n).padStart(2,'0');}
function fmtTime(sec){return pad2(Math.floor(sec/60))+':'+pad2(sec%60);}
var DAY_NAMES=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
var DAY_SHORT=['Mg','Sn','Sl','Rb','Km','Jm','Sb'];
var MON_SHORT=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function loadState(){try{var raw=localStorage.getItem(KEY);if(raw){var s=JSON.parse(raw);if(s&&typeof s==='object')return s;}}catch(e){}return null;}
var saved=loadState();
var state={name:'',xp:0,streak:{count:0,last:''},tasks:{},habits:[],totals:{done:0,focusMin:0},today:{key:'',mood:-1,hype:''},settings:{city:'Jakarta',offset:0,mode:'city',lat:0,lon:0},tasbih:{key:'',counts:{},done:{},log:{}},gratitude:{},consistency:{days:0,rewarded:{}}};
if(saved){
state.name=typeof saved.name==='string'?saved.name:'';
state.xp=typeof saved.xp==='number'?saved.xp:0;
if(saved.streak && typeof saved.streak==='object')state.streak={count:saved.streak.count||0,last:saved.streak.last||''};
if(saved.tasks && typeof saved.tasks==='object')state.tasks=saved.tasks;
if(Array.isArray(saved.habits))state.habits=saved.habits;
if(saved.totals && typeof saved.totals==='object')state.totals={done:saved.totals.done||0,focusMin:saved.totals.focusMin||0};
if(saved.today && typeof saved.today==='object')state.today={key:saved.today.key||'',mood:saved.today.mood!=null?saved.today.mood:-1,hype:saved.today.hype||''};
if(saved.settings && typeof saved.settings==='object')state.settings={city:saved.settings.city||'Jakarta',offset:parseInt(saved.settings.offset,10)||0,mode:saved.settings.mode==='gps'?'gps':'city',lat:saved.settings.lat||0,lon:saved.settings.lon||0};
if(saved.tasbih && typeof saved.tasbih==='object')state.tasbih={key:saved.tasbih.key||'',counts:saved.tasbih.counts||{},done:saved.tasbih.done||{},log:saved.tasbih.log||{}};
if(saved.gratitude && typeof saved.gratitude==='object')state.gratitude=saved.gratitude;
if(saved.consistency && typeof saved.consistency==='object')state.consistency={days:saved.consistency.days||0,rewarded:saved.consistency.rewarded||{}};
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function ensureToday(){
var k=todayKey();
if(state.today.key!==k){state.today={key:k,mood:-1,hype:''};}
if(!state.tasks[k]||!Array.isArray(state.tasks[k].items)){state.tasks[k]={items:[]};}
if(!state.tasbih||state.tasbih.key!==k){state.tasbih={key:k,counts:{},done:{},log:state.tasbih&&state.tasbih.log?state.tasbih.log:{}};}
if(state.streak.last!==k&&state.streak.last!==daysAgoKey(1)){if(state.streak.last!=='')state.streak.count=0;}
save();
}
function touchStreak(){
var k=todayKey();
if(state.streak.last===k)return;
state.streak.count=(state.streak.last===daysAgoKey(1))?state.streak.count+1:1;
state.streak.last=k;save();
}
var LEVELS=[
{min:0,name:'Kaum Rebahan 🛋️'},{min:80,name:'Mulai Geliat 🥱'},{min:200,name:'Pemanasan ☕'},
{min:380,name:'Mode Gas ⚡'},{min:620,name:'Pejuang Fokus 🔥'},{min:950,name:'Pendekar Produktif ⚔️'},
{min:1400,name:'Master Anti-Mager 👑'}
];
var GARDEN_SUBS=[
'Masih benih nih — siram dengan satu tugas kecil 🌰','Kecambah pertama muncul! Jangan berhenti 🌱',
'Akarmu menguat, lanjutkan ritmenya 🌿','Daunnya rimbun — fokusmu juga 🍃',
'Mulai berbunga. Kamu keren! 🌷','Kebunmu hampir jadi hutan! 🌳','Legendaris. Kebunmu subur maksimal 🏆'
];
function levelOf(xp){var lv=0;for(var i=0;i<LEVELS.length;i++){if(xp>=LEVELS[i].min)lv=i;}return lv;}
var audioCtx=null;
function chime(){
try{
if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
if(audioCtx.state==='suspended')audioCtx.resume();
var notes=[523.25,659.25,783.99],t0=audioCtx.currentTime;
notes.forEach(function(f,i){
var o=audioCtx.createOscillator(),g=audioCtx.createGain();
o.type='sine';o.frequency.value=f;
// FIXED: Operator perkalian (*) ditambahkan
g.gain.setValueAtTime(0.0001,t0+i*0.11);
g.gain.exponentialRampToValueAtTime(0.16,t0+i*0.11+0.02);
g.gain.exponentialRampToValueAtTime(0.0001,t0+i*0.11+0.45);
o.connect(g);g.connect(audioCtx.destination);
o.start(t0+i*0.11);o.stop(t0+i*0.11+0.5);
});
}catch(e){}
}
function toast(msg,gold){
var box=$('toasts');if(!box)return;
var t=document.createElement('div');
t.className='toast'+(gold?' gold':'');
t.textContent=msg;
box.appendChild(t);
while(box.children.length>3)box.removeChild(box.firstChild);
setTimeout(function(){
t.classList.add('go');
setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},320);
},3000);
}
var cfx=$('cfx'),ctxC=null,parts=[],cfxRunning=false;
function sizeCanvas(){if(cfx){cfx.width=window.innerWidth;cfx.height=window.innerHeight;}}
window.addEventListener('resize',sizeCanvas);
var CONF_COLORS=['#d4a5a5','#e8c4c8','#e5c786','#b76e79','#f0dcdd','#c9a35c','#ffffff'];
function burst(n,x,y){
if(!cfx)return;
if(!ctxC)ctxC=cfx.getContext('2d');
for(var i=0;i<n;i++){
parts.push({
x:x!=null?x:Math.random()*cfx.width,
// FIXED: Operator perkalian (*) ditambahkan
y:y!=null?y:Math.random()*cfx.height*0.3,
vx:(Math.random()-0.5)*7,
vy:Math.random()-4-1,
g:0.14,
s:Math.random()*7+4,
r:Math.random()*Math.PI,
vr:(Math.random()-0.5)*0.25,
c:CONF_COLORS[Math.floor(Math.random()*CONF_COLORS.length)],
life:120+Math.random()*60
});
}
if(!cfxRunning){cfxRunning=true;requestAnimationFrame(cfxLoop);}
}
function cfxLoop(){
if(!ctxC){cfxRunning=false;return;}
ctxC.clearRect(0,0,cfx.width,cfx.height);
for(var i=parts.length-1;i>=0;i--){
var p=parts[i];
p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.life--;
if(p.life<=0||p.y>cfx.height+30){parts.splice(i,1);continue;}
ctxC.save();
ctxC.translate(p.x,p.y);
ctxC.rotate(p.r);
ctxC.globalAlpha=Math.min(1,p.life/40);
ctxC.fillStyle=p.c;
ctxC.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6);
ctxC.restore();
}
if(parts.length>0){requestAnimationFrame(cfxLoop);}
else{cfxRunning=false;ctxC.clearRect(0,0,cfx.width,cfx.height);}
}
function addXP(n,msg){
var before=levelOf(state.xp);
state.xp+=n;save();
var after=levelOf(state.xp);
toast('+'+n+' XP · '+(msg||'Mantap! ✨'));
if(after>before){
setTimeout(function(){
burst(120);chime();
toast('🎉 NAIK LEVEL! Sekarang: '+LEVELS[after].name,true);
},450);
}
renderScore();renderGarden();renderReport();
}
var CITIES=[
{n:'Banda Aceh',la:5.55,lo:95.32,tz:7},{n:'Medan',la:3.59,lo:98.67,tz:7},{n:'Padang',la:-0.95,lo:100.35,tz:7},
{n:'Pekanbaru',la:0.51,lo:101.45,tz:7},{n:'Tanjung Pinang',la:0.92,lo:104.46,tz:7},{n:'Jambi',la:-1.61,lo:103.61,tz:7},
{n:'Palembang',la:-2.99,lo:104.76,tz:7},{n:'Pangkal Pinang',la:-2.13,lo:106.12,tz:7},{n:'Bengkulu',la:-3.80,lo:102.27,tz:7},
{n:'Bandar Lampung',la:-5.43,lo:105.26,tz:7},{n:'Serang',la:-6.12,lo:106.15,tz:7},{n:'Jakarta',la:-6.20,lo:106.82,tz:7},
{n:'Bandung',la:-6.91,lo:107.61,tz:7},{n:'Semarang',la:-6.97,lo:110.42,tz:7},{n:'Yogyakarta',la:-7.80,lo:110.36,tz:7},
{n:'Surabaya',la:-7.25,lo:112.75,tz:7},{n:'Pontianak',la:-0.03,lo:109.33,tz:7},{n:'Palangkaraya',la:-2.21,lo:113.92,tz:7},
{n:'Denpasar',la:-8.65,lo:115.22,tz:8},{n:'Mataram',la:-8.65,lo:116.32,tz:8},{n:'Kupang',la:-10.18,lo:123.60,tz:8},
{n:'Banjarmasin',la:-3.32,lo:114.59,tz:8},{n:'Samarinda',la:-0.50,lo:117.15,tz:8},{n:'Tanjung Selor',la:2.84,lo:117.36,tz:8},
{n:'Manado',la:1.47,lo:124.84,tz:8},{n:'Gorontalo',la:0.54,lo:123.06,tz:8},{n:'Palu',la:-0.90,lo:119.85,tz:8},
{n:'Mamuju',la:-2.68,lo:118.88,tz:8},{n:'Makassar',la:-5.15,lo:119.43,tz:8},{n:'Kendari',la:-3.97,lo:122.60,tz:8},
{n:'Ambon',la:-3.70,lo:128.18,tz:9},{n:'Sofifi',la:0.73,lo:127.95,tz:9},{n:'Jayapura',la:-2.53,lo:140.72,tz:9},
{n:'Manokwari',la:-0.86,lo:134.06,tz:9},{n:'Merauke',la:-8.47,lo:140.33,tz:9},{n:'Nabire',la:-3.36,lo:135.55,tz:9},
{n:'Wamena',la:-4.10,lo:138.95,tz:9},{n:'Sorong',la:-0.88,lo:131.25,tz:9}
];
var PRAYER_KEYS=[['Fajr','Subuh'],['Dhuhr','Dzuhur'],['Asr','Ashr'],['Maghrib','Maghrib'],['Isha','Isya']];
var prayerTimes=null,prayerComputedKey='',customLabel='';
function rad(d){return d*Math.PI/180;}
function deg(r){return r*180/Math.PI;}
function fixA(a){a=a%360;return a<0?a+360:a;}
function fixH(h){h=h%24;return h<0?h+24:h;}
function julian(y,m,d){
if(m<=2){y-=1;m+=12;}
var A=Math.floor(y/100),B=2-A+Math.floor(A/4);
return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5;
}
function sunPos(jd){
var D=jd-2451545.0;
// FIXED: Operator perkalian (*) ditambahkan
var g=rad(fixA(357.529+0.98560028*D));
var q=fixA(280.459+0.98564736*D);
var L=rad(fixA(q+1.915*Math.sin(g)+0.020*Math.sin(2*g)));
var e=rad(23.439-0.00000036*D);
var decl=deg(Math.asin(Math.sin(e)*Math.sin(L)));
var RA=fixH(deg(Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L)))/15);
var eqt=q/15-RA;
return{decl:decl,eqt:eqt};
}
function hm(h){
var mins=Math.round(fixH(h)*60)%1440;
return pad2(Math.floor(mins/60))+':'+pad2(mins%60);
}
function calcTimes(date,la,lo,tz){
var jd=julian(date.getFullYear(),date.getMonth()+1,date.getDate())-lo/(15*24);
var sp=sunPos(jd+0.5);
var decl=sp.decl;
var dhuhr=fixH(12-sp.eqt-lo/15+tz);
function hourAngle(alt){
var c=(Math.sin(rad(alt))-Math.sin(rad(la))*Math.sin(rad(decl)))/(Math.cos(rad(la))*Math.cos(rad(decl)));
if(c<-1||c>1)return null;
return deg(Math.acos(c))/15;
}
var altAsr=deg(Math.atan(1/(1+Math.tan(rad(Math.abs(la-decl))))));
var fH=hourAngle(-20),sH=hourAngle(-0.833),aH=hourAngle(altAsr),iH=hourAngle(-18);
if(fH==null)fH=6;if(sH==null)sH=6;if(aH==null)aH=4;if(iH==null)iH=6;
return{fajr:hm(dhuhr-fH),dhuhr:hm(dhuhr),asr:hm(dhuhr+aH),maghrib:hm(dhuhr+sH),isha:hm(dhuhr+iH)};
}
function computePrayers(){
var la,lo,tz;
if(state.settings.mode==='gps'&&state.settings.lat){
la=+state.settings.lat;lo=+state.settings.lon;
tz=-(new Date().getTimezoneOffset())/60;
}else{
var c=null;
for(var i=0;i<CITIES.length;i++){if(CITIES[i].n===state.settings.city)c=CITIES[i];}
if(!c)c=CITIES[11];
la=c.la;lo=c.lo;tz=c.tz;
}
var t=calcTimes(new Date(),la,lo,tz);
prayerTimes={Fajr:t.fajr,Dhuhr:t.dhuhr,Asr:t.asr,Maghrib:t.maghrib,Isha:t.isha};
prayerComputedKey=todayKey();
renderPrayers();updatePrayerCountdown();
}
function updateClock(){
var el=$('clockChip');
if(el){var d=new Date();el.textContent=pad2(d.getHours())+':'+pad2(d.getMinutes())+':'+pad2(d.getSeconds());}
if(prayerComputedKey!==todayKey())computePrayers();
updatePrayerCountdown();
}
setInterval(updateClock,1000);
function renderHijri(){
var el=$('hijriDate');if(!el)return;
var NAMES=["Muharam","Safar","Rabiulawal","Rabiulakhir","Jumadilawal","Jumadilakhir","Rajab","Sya'ban","Ramadan","Syawal","Zulkaidah","Zulhijah"];
var locs=['id-u-ca-islamic-umalqura','id-u-ca-islamic'];
for(var i=0;i <locs.length;i++){
try{
var fmt=new Intl.DateTimeFormat(locs[i],{day:'numeric',month:'numeric',year:'numeric'});
var parts=fmt.formatToParts(new Date());
var dd='',mm='',yy='';
parts.forEach(function(p){if(p.type==='day')dd=p.value;else if(p.type==='month')mm=p.value;else if(p.type==='year')yy=p.value;});
var mi=parseInt(mm,10);
if(dd && mi && yy){el.textContent='🌙 '+dd+' '+NAMES[(mi-1+12)%12]+' '+yy+' H';return;}
}catch(e){}
}
el.textContent='';
}
function prayerDates(){
if(!prayerTimes)return[];
var now=new Date();
return PRAYER_KEYS.map(function(p){
var hm2=prayerTimes[p[0]];if(!hm2)return null;
var hh=parseInt(hm2.slice(0,2),10),mm=parseInt(hm2.slice(3,5),10);
var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),hh,mm,0);
d=new Date(d.getTime()+((state.settings.offset)||0)*60000);
return{label:p[1],date:d};
}).filter(Boolean);
}
function fmtHM(d){return pad2(d.getHours())+':'+pad2(d.getMinutes());}
function nextPrayer(){
var list=prayerDates();if(!list.length)return null;
var now=new Date();
for(var i=0;i<list.length;i++){if(list[i].date>now)return{label:list[i].label,date:list[i].date,tomorrow:false,fmt:fmtHM(list[i].date)};}
var f=list[0],d=new Date(f.date.getTime()+86400000);
return{label:f.label,date:d,tomorrow:true,fmt:fmtHM(d)};
}
function updatePrayerCountdown(){
var lab=$('nextLabel'),tm=$('nextTime'),ct=$('nextCount');
if(!prayerTimes){if(lab)lab.textContent='Menghitung…';if(tm)tm.textContent='--:--';if(ct)ct.textContent='';return;}
var np=nextPrayer();if(!np)return;
if(lab)lab.textContent='Adzan '+np.label+(np.tomorrow?' (besok)':'');
if(tm)tm.textContent=np.fmt;
var diff=Math.max(0,Math.floor((np.date-new Date())/1000));
var h=Math.floor(diff/3600),m=Math.floor((diff%3600)/60),s=diff%60;
if(ct)ct.textContent=(h>0?h+' jam ':'')+m+' mnt '+s+' dtk lagi';
}
function renderPrayers(){
var box=$('prayerList');if(!box)return;box.innerHTML='';
var np=nextPrayer();
var list=prayerTimes?prayerDates():PRAYER_KEYS.map(function(p){return{label:p[1],date:null};});
list.forEach(function(it){
var cell=document.createElement('div');
cell.className='pr-cell'+(np&&!np.tomorrow&&np.label===it.label?' next':'');
var b=document.createElement('b');b.textContent=it.label;
var s=document.createElement('span');s.textContent=it.date?fmtHM(it.date):'--:--';
cell.appendChild(b);cell.appendChild(s);box.appendChild(cell);
});
var note=$('prayerNote');
if(note){
var loc=state.settings.mode==='gps'?'📍 Lokasimu (GPS)':((state.settings&&state.settings.city)||'Jakarta');
note.textContent=loc+' · metode Kemenag · koreksi '+((state.settings&&state.settings.offset)||0)+' mnt via ⚙️';
}
}
var DHIKR=[
{id:'subhan',t:'Subhanallah',tg:33},
{id:'hamd',t:'Alhamdulillah',tg:33},
{id:'akbar',t:'Allahu Akbar',tg:34},
{id:'tahlil',t:'La ilaha illallah',tg:100},
{id:'istighfar',t:'Astaghfirullah',tg:100}
];
var curDhikr='subhan';
function renderTasbih(){
var chips=$('dhikrChips');
if(chips){
chips.innerHTML='';
DHIKR.forEach(function(d){
var b=document.createElement('button');
b.className='d-chip'+(d.id===curDhikr?' on':'');
b.textContent=d.t;
b.addEventListener('click',function(){curDhikr=d.id;renderTasbih();});
chips.appendChild(b);
});
}
var d=DHIKR.filter(function(x){return x.id===curDhikr;})[0];
var c=(state.tasbih.counts&&state.tasbih.counts[curDhikr])||0;
var tc=$('tasCount');if(tc)tc.textContent=c;
var tt=$('tasTarget');if(tt)tt.textContent='/ '+d.tg+((state.tasbih.done||{})[curDhikr]?' ✔':'');
var tf=$('tasFill');if(tf)tf.style.width=Math.min(100,(c/d.tg)*100)+'%';
var tot=0;Object.keys(state.tasbih.counts||{}).forEach(function(k){tot+=state.tasbih.counts[k];});
var tsum=$('tasTotal');if(tsum)tsum.textContent='Total dzikir hari ini: '+tot;
}
function tapTasbih(){
if(!state.tasbih.counts)state.tasbih.counts={};
state.tasbih.counts[curDhikr]=(state.tasbih.counts[curDhikr]||0)+1;
try{if(navigator.vibrate)navigator.vibrate(8);}catch(e){}
if(!state.tasbih.log)state.tasbih.log={};
var tot=0;Object.keys(state.tasbih.counts).forEach(function(k){tot+=state.tasbih.counts[k];});
state.tasbih.log[todayKey()]=tot;
var ks=Object.keys(state.tasbih.log);
while(ks.length>14){ks.sort();delete state.tasbih.log[ks.shift()];}
var btn=$('tasbihBtn');
if(btn){btn.classList.remove('tap');void btn.offsetWidth;btn.classList.add('tap');}
var d=DHIKR.filter(function(x){return x.id===curDhikr;})[0];
if(state.tasbih.counts[curDhikr]===d.tg&&!(state.tasbih.done||{})[curDhikr]){
if(!state.tasbih.done)state.tasbih.done={};
state.tasbih.done[curDhikr]=true;
chime();burst(60);touchStreak();save();
addXP(10,'Target '+d.t+' tercapai! ');
}
save();renderTasbih();
}
var MOOD_META=[
{e:'🫠',pct:25,label:'Mode mager terdeteksi'},
{e:'😪',pct:40,label:'Mode hemat energi'},
{e:'😌',pct:60,label:'Mode stabil'},
{e:'😊',pct:80,label:'Mode cerah'},
{e:'🤩',pct:95,label:'Mode turbo!'}
];
var MOOD_LINES=[
['Nggak apa-apa, kita curi start 2 menit aja — sisanya bonus 🐢','Rebahan boleh, tapi sambil nunggu timer kilat ya 😉','Gerak dikiiit aja dulu. Mood biasanya nyusul belakangan '],
['Mode hemat energi: pilih satu hal yang paling ringan ','Kamu tetap keren walau pelan. Istirahat juga bagian dari progres ','Rehat 5 menit dulu, lanjut kalau sudah siap '],
['Mulai dari yang 2 menit aja. Pelan tapi jalan 👌','Satu langkah kecil > seribu niat. Yuk mulai?','Pemanasan dulu: pilih tugas termudah ☕'],
['Mood bagus = waktu emas. Gas satu prioritas! ✨','Senyum dulu, lalu hajar satu tugas kecil 😄','Energi positifmu pas banget buat fokus sebentar 🌈'],
['Wah, energi penuh! Sikat tugas paling susah dulu 🔥','Gas sekarang mumpung lagi on fire! ⚡','Kamu lagi mode turbo — jangan lupa minum air ya 😄']
];
function pickMood(i){
var first=(state.today.mood===-1);
state.today.mood=i;
var lines=MOOD_LINES[i],line=lines[Math.floor(Math.random()*lines.length)];
state.today.hype=line;save();
var btns=document.querySelectorAll('#moodRow .mood');
btns.forEach(function(b,bi){b.classList.toggle('picked',bi===i);});
var m=MOOD_META[i];
var bf=$('batFill');if(bf)bf.style.width=m.pct+'%';
var bt=$('batTxt');if(bt)bt.textContent=m.pct+'% · '+m.label;
var hb=$('hypeBubble');if(hb){hb.textContent='💬 '+line;hb.classList.add('show');}
if(first){touchStreak();addXP(5,'Check-in mood dulu ☺️');}
}
var SUGGESTIONS=['💧 Minum segelas air','🧹 Rapikan meja 2 menit','📖 Baca 1 halaman buku','💬 Balas 1 chat tertunda',' Stretching ringan'];
function getTasks(){var k=todayKey();if(!state.tasks[k])state.tasks[k]={items:[]};return state.tasks[k].items;}
function addTask(text,pri){
text=(text||'').trim();if(!text){toast('Tulis dulu tugasnya ya ✍️');return false;}
getTasks().push({id:Date.now()+''+Math.floor(Math.random()*999),text:text,pri:!!pri,done:false});
save();renderTasks();renderScore();renderReport();return true;
}
function renderTasks(){
var list=$('taskList'),empty=$('emptyTasks');if(!list)return;
var items=getTasks().slice().sort(function(a,b){return(b.pri?1:0)-(a.pri?1:0);});
list.innerHTML='';
if(empty)empty.style.display=items.length?'none':'block';
items.forEach(function(t){
var li=document.createElement('li');
li.className='task-item'+(t.done?' done':'');
li.setAttribute('data-id',t.id);
var grip=document.createElement('button');
grip.className='t-grip';grip.textContent='⠿';
grip.title='Tahan & seret untuk menggeser urutan';
grip.setAttribute('aria-label','Geser urutan tugas');
li.appendChild(grip);
var cb=document.createElement('button');
cb.className='t-check';
cb.setAttribute('aria-label',t.done?'Batalkan selesai':'Tandai selesai');
cb.textContent=t.done?'✓':'';
cb.addEventListener('click',function(){toggleTask(t,cb);});
var sp=document.createElement('span');
sp.className='t-text';sp.textContent=t.text;
li.appendChild(cb);li.appendChild(sp);
var star=document.createElement('button');
star.className='t-star'+(t.pri?' on':'');
star.textContent=t.pri?'⭐':'☆';
star.title=t.pri?'Hapus status prioritas':'Tandai sebagai prioritas';
star.addEventListener('click',function(){
t.pri=!t.pri;save();renderTasks();renderScore();
toast(t.pri?'⭐ Ditandai prioritas — naik ke atas!':'Prioritas dilepas');
});
li.appendChild(star);
var up=document.createElement('button');up.className='t-mv';up.textContent='▲';up.title='Geser naik';
up.addEventListener('click',function(){moveTask(t,-1);});
var dn=document.createElement('button');dn.className='t-mv';dn.textContent='▼';dn.title='Geser turun';
dn.addEventListener('click',function(){moveTask(t,1);});
li.appendChild(up);li.appendChild(dn);
var del=document.createElement('button');
del.className='t-del';del.textContent='✕';
del.setAttribute('aria-label','Hapus tugas');
del.addEventListener('click',function(){
var arr=getTasks();
var ix=arr.findIndex(function(x){return x.id===t.id;});
if(ix>-1)arr.splice(ix,1);save();renderTasks();renderScore();
});
li.appendChild(del);list.appendChild(li);
attachGrip(li,t);
});
}
function moveTask(t,dir){
var arr=getTasks();
var display=arr.slice().sort(function(a,b){return(b.pri?1:0)-(a.pri?1:0);});
var di=display.indexOf(t),ni=di+dir;
if(ni<0||ni>=display.length)return;
var other=display[ni];
if((other.pri?1:0)!==(t.pri?1:0)){toast('⭐ Tugas prioritas selalu di kelompok atas');return;}
var ai=arr.indexOf(t),ao=arr.indexOf(other);
arr[ai]=other;arr[ao]=t;
save();renderTasks();
}
function findTaskById(id){
var arr=getTasks();
for(var i=0;i<arr.length;i++){if(arr[i].id===id)return arr[i];}
return null;
}
function commitDomOrder(){
var list=$('taskList');if(!list)return;
var ids=[];
list.querySelectorAll('.task-item').forEach(function(li){ids.push(li.getAttribute('data-id'));});
var arr=getTasks(),byId={},newArr=[];
arr.forEach(function(x){byId[x.id]=x;});
ids.forEach(function(id){if(byId[id]){newArr.push(byId[id]);delete byId[id];}});
Object.keys(byId).forEach(function(k){newArr.push(byId[k]);});
state.tasks[todayKey()].items=newArr;
save();renderTasks();renderScore();
toast(' Urutan tugas diperbarui');
}
function attachGrip(li,t){
var grip=li.querySelector('.t-grip');
if(!grip)return;
var pid=null,timer=null,startX=0,startY=0,dragging=false;
// FIXED: Typo 'func tion' diperbaiki menjadi 'function', '&&' diperbaiki
grip.addEventListener('pointerdown',function(e){
if(e.pointerType==='mouse' && e.button!==0)return;
pid=e.pointerId;startX=e.clientX;startY=e.clientY;dragging=false;
try{grip.setPointerCapture(pid);}catch(err){}
timer=setTimeout(function(){
dragging=true;
// FIXED: Typo 'li. classList' diperbaiki
li.classList.add('dragging');
try{if(navigator.vibrate)navigator.vibrate(10);}catch(err){}
},280);
});
grip.addEventListener('pointermove',function(e){
// FIXED: Typo 'pi d' diperbaiki menjadi 'pid'
if(pid===null||e.pointerId!==pid)return;
if(!dragging){
if(Math.abs(e.clientX-startX) >8||Math.abs(e.clientY-startY) >8){if(timer){clearTimeout(timer);timer=null;}}
return;
}
if(e.cancelable)e.preventDefault();
var el=document.elementFromPoint(e.clientX,e.clientY);
var target=(el && el.closest)?el.closest('.task-item'):null;
if(!target||target===li)return;
var tg=findTaskById(target.getAttribute('data-id'));
if(!tg||(tg.pri?1:0)!==(t.pri?1:0))return;
var r=target.getBoundingClientRect();
var before=(e.clientY <r.top+r.height/2);
target.parentNode.insertBefore(li,before?target:target.nextSibling);
});
function end(e){
if(timer){clearTimeout(timer);timer=null;}
// FIXED: Typo '&&' diperbaiki
if(pid!==null && e && e.pointerId===pid){try{grip.releasePointerCapture(pid);}catch(err){}}
pid=null;
if(dragging){dragging=false;li.classList.remove('dragging');commitDomOrder();}
}
// FIXED: Typo 'addEventListe ner' diperbaiki
grip.addEventListener('pointerup',end);
grip.addEventListener('pointercancel',end);
grip.addEventListener('contextmenu',function(e){e.preventDefault();});
}
function toggleTask(t,btn){
t.done=!t.done;save();
if(t.done){
chime();var r=btn.getBoundingClientRect();
burst(36,r.left+r.width/2,r.top);
touchStreak();state.totals.done++;save();
addXP(t.pri?25:15,t.pri?'Prioritas beres! ':'Satu tugas tumbang!');
}
renderTasks();renderScore();renderGarden();renderHistory();renderReport();
}
function dayCounts(){var items=getTasks(),done=0;items.forEach(function(t){if(t.done)done++;});return{done:done,total:items.length};}
function renderScore(){
var c=dayCounts(),pct=c.total?Math.round(c.done/c.total*100):0;
var ring=$('dayRing');if(ring)ring.style.strokeDashoffset=String(276.46*(1-pct/100));
var pp=$('dayPct');if(pp)pp.textContent=pct+'%';
var ts=$('taskSummary');if(ts)ts.textContent=c.done+' / '+c.total+' tugas · '+pct+'%';
var k=todayKey(),dayT=state.tasks[k]||{},sess=dayT.sessions||0;
var fs=$('focusSummary');if(fs)fs.textContent=' '+sess+' sesi fokus · ⏱ '+(dayT.focusMin||0)+' menit';
var lvl=levelOf(state.xp),cur=LEVELS[lvl],next=LEVELS[lvl+1];
var ln=$('lvlName');if(ln)ln.textContent='Lv.'+(lvl+1)+' · '+cur.name;
var xn=$('xpNum');if(xn)xn.textContent=state.xp+' XP';
var xf=$('xpFill'),xnext=$('xpNext');
if(next){
var span=next.min-cur.min,p=Math.max(0,Math.min(1,(state.xp-cur.min)/span));
if(xf)xf.style.width=(p*100)+'%';
if(xnext)xnext.textContent=(next.min-state.xp)+' XP lagi ke Lv.'+(lvl+2);
}else{if(xf)xf.style.width='100%';if(xnext)xnext.textContent='LEVEL MAKSIMAL! 👑';}
var lc=$('lvlChip');if(lc)lc.textContent='Lv.'+(lvl+1)+' · '+state.xp+' XP';
var sc=$('streakChip');if(sc)sc.textContent='🔥 '+state.streak.count+' hari';
var td=$('totalDoneChip');if(td)td.textContent=state.totals.done;
var ha=$('habitActiveChip');if(ha)ha.textContent=state.habits.length;
var cc=$('consistChip');if(cc)cc.textContent=(state.consistency&&state.consistency.days)||0;
var yn=$('yesterdayNote');
if(yn){
var yt=state.tasks[daysAgoKey(1)];
if(yt&&Array.isArray(yt.items)){
var yd=yt.items.filter(function(x){return x.done;}).length;
yn.textContent=yd>0?'👏 Kemarin kamu beresin '+yd+' tugas. Keren!':'🌤️ Kemarin belum ada catatan — hari ini kita mulai!';
}else{yn.textContent='🌤️ Hari baru, lembaran baru. Satu tugas kecil pun berarti!';}
yn.style.display='block';
}
}
function checkConsistency(){
if(!state.consistency)state.consistency={days:0,rewarded:{}};
var pk=daysAgoKey(1);
var t=state.tasks[pk];
if(!t||!Array.isArray(t.items)||t.items.length<3)return;
var done=t.items.filter(function(x){return x.done;}).length;
var pct=done/t.items.length;
if(pct>=0.7&&!state.consistency.rewarded[pk]){
state.consistency.rewarded[pk]=true;
state.consistency.days=(state.consistency.days||0)+1;
save();
setTimeout(function(){addXP(25,'Hari konsisten: ≥70% tugas beres! ');},1200);
}
}
function renderHistory(){
var strip=$('historyStrip');if(!strip)return;strip.innerHTML='';
for(var i=13;i>=0;i--){
var dk=daysAgoKey(i),d=new Date();d.setDate(d.getDate()-i);
var dayT=state.tasks[dk],done=0;
if(dayT&&Array.isArray(dayT.items))done=dayT.items.filter(function(x){return x.done;}).length;
var cell=document.createElement('div');
cell.className='h-cell'+(done>0?' done':'')+(i===0?' today':'');
if(done>0)cell.style.opacity=String(Math.min(1,0.55+done*0.12));
cell.title=DAY_NAMES[d.getDay()]+' '+d.getDate()+' '+MON_SHORT[d.getMonth()]+' · '+done+' tugas beres · tap untuk rincian';
cell.addEventListener('click',function(){showDay(dk);});
var s1=document.createElement('span');s1.textContent=DAY_SHORT[d.getDay()];
var s2=document.createElement('span');s2.className='n';s2.textContent=done>0?done:d.getDate();
cell.appendChild(s1);cell.appendChild(s2);strip.appendChild(cell);
}
}
var dayOvKey='';
function showDay(dk){
dayOvKey=dk;
var ov=$('dayOverlay');if(!ov)return;
var d=new Date(dk+'T00:00:00');
var t=$('dayOvTitle');if(t)t.textContent='🗓️ '+DAY_NAMES[d.getDay()]+', '+d.getDate()+' '+MON_SHORT[d.getMonth()]+' '+d.getFullYear();
var list=$('dayOvList');
if(list){
list.innerHTML='';
var items=(state.tasks[dk] && state.tasks[dk].items)||[];
if(!items.length){list.innerHTML='<p style="color:#8a6f74;font-size:.85rem;font-weight:600">Tidak ada tugas tercatat hari itu.</p>';}
items.forEach(function(it){
var row=document.createElement('div');
row.style.cssText='display:flex;gap:10px;align-items:center;padding:10px 12px;border:1px solid rgba(212,165,165,.2);border-radius:12px;background:rgba(0,0,0,.25);font-size:.88rem;font-weight:600;';
var ic=document.createElement('span');ic.textContent=it.done?'✅':'⬜';
var tx=document.createElement('span');tx.style.cssText='flex:1;'+(it.done?'text-decoration:line-through;color:#8a6f74;':'color:#f2e4e6;');tx.textContent=it.text;
row.appendChild(ic);row.appendChild(tx);list.appendChild(row);
});
}
var sy=$('dayOvSyukur');
if(sy){
var g=(state.gratitude && state.gratitude[dk])||null;
var filled=g?g.filter(function(s){return s && s.trim();}):[];
if(filled.length){sy.style.display='block';sy.innerHTML='🌸 Syukur hari itu:<br>• '+filled.map(function(s){return String(s).replace(/</g,'&lt;');}).join('<br>• ');}
else{sy.style.display='none';}
}
var carry=$('dayOvCarry');
if(carry){
var undone=((state.tasks[dk] && state.tasks[dk].items)||[]).filter(function(it){return !it.done;});
carry.style.display=(undone.length && dk!==todayKey())?'block':'none';
}
ov.style.display='flex';
}
function bindDayOverlay(){
var cl=$('dayOvClose');if(cl)cl.onclick=function(){var ov=$('dayOverlay');if(ov)ov.style.display='none';};
var cv=$('dayOvCarry');
if(cv)cv.onclick=function(){
var items=(state.tasks[dayOvKey]&&state.tasks[dayOvKey].items)||[];
var undone=items.filter(function(it){return !it.done;});
undone.forEach(function(it){
getTasks().push({id:Date.now()+''+Math.floor(Math.random()*999)+Math.random().toString(36).slice(2,5),text:it.text,pri:!!it.pri,done:false});
});
save();renderTasks();renderScore();renderReport();
var ov=$('dayOverlay');if(ov)ov.style.display='none';
toast(' '+undone.length+' tugas dibawa ke hari ini. Semangat!');
};
}
function renderSyukur(){
var k=todayKey();
if(!state.gratitude)state.gratitude={};
var arr=state.gratitude[k]||['','',''];
document.querySelectorAll('.syukur-in').forEach(function(inp){
inp.value=arr[parseInt(inp.dataset.i,10)]||'';
});
updateSyukurNote();
}
function updateSyukurNote(){
var k=todayKey();
var arr=(state.gratitude&&state.gratitude[k])||['','',''];
var filled=arr.filter(function(s){return s&&s.trim();}).length;
var n=$('syukurNote');
if(n)n.textContent=filled>=3?'🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!':('Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu.  ('+filled+'/3)');
}
function saveSyukur(inp){
var k=todayKey();
if(!state.gratitude)state.gratitude={};
if(!state.gratitude[k])state.gratitude[k]=['','',''];
state.gratitude[k][parseInt(inp.dataset.i,10)]=inp.value;
save();
var filled=state.gratitude[k].filter(function(s){return s&&s.trim();}).length;
if(filled===3&&!state.gratitude[k+'_done']){
state.gratitude[k+'_done']=true;save();
touchStreak();addXP(10,'Syukur hari ini lengkap 🌸');
}
updateSyukurNote();
}
function weekStats(){
var days=[];for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days.push(d);}
var s={days:[],tasks:0,focus:0,sessions:0,habits:0,dhikr:0};
days.forEach(function(d){
var dk=todayKey(d);
var t=state.tasks[dk],done=0,sess=0,fm=0;
if(t&&Array.isArray(t.items)){done=t.items.filter(function(x){return x.done;}).length;sess=t.sessions||0;fm=t.focusMin||0;}
var hb=0;state.habits.forEach(function(h){if(h.hist&&h.hist[dk])hb++;});
var dz=(state.tasbih.log&&state.tasbih.log[dk])||0;
s.days.push({d:d,done:done});
s.tasks+=done;s.focus+=fm;s.sessions+=sess;s.habits+=hb;s.dhikr+=dz;
});
return s;
}
function repRangeText(){
var a=new Date();a.setDate(a.getDate()-6);
var b=new Date();
return a.getDate()+' '+MON_SHORT[a.getMonth()]+' – '+b.getDate()+' '+MON_SHORT[b.getMonth()]+' '+b.getFullYear();
}
function renderReport(){
var s=weekStats();
var rg=$('repRange');if(rg)rg.textContent=repRangeText();
var e1=$('repTasks');if(e1)e1.textContent=s.tasks;
var e2=$('repFocus');if(e2)e2.textContent=s.focus;
var e3=$('repHabits');if(e3)e3.textContent=s.habits;
var e4=$('repDhikr');if(e4)e4.textContent=s.dhikr;
var ch=$('repChart');
if(ch){
ch.innerHTML='';
var max=1;s.days.forEach(function(d){max=Math.max(max,d.done);});
s.days.forEach(function(d){
var bar=document.createElement('div');bar.className='rep-bar';
var val=document.createElement('span');val.className='val';val.textContent=d.done||'';
var b=document.createElement('div');b.className='b';
b.style.height=Math.max(6,Math.round((d.done/max)*100))+'%';
if(!d.done)b.style.opacity='.3';
var n=document.createElement('span');n.className='n';n.textContent=DAY_SHORT[d.d.getDay()];
bar.appendChild(val);bar.appendChild(b);bar.appendChild(n);ch.appendChild(bar);
});
}
var rq=$('repQuote');
if(rq)rq.textContent=QUOTES[(lastQuote>=0?lastQuote:0)].q;
}
function rr(x,a,b,w,h,r){
x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);
x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();
}
function wrapText(x,text,cx,cy,maxW,lh){
var words=text.split(' '),line='',lines=[];
words.forEach(function(w){
var t=line?line+' '+w:w;
if(x.measureText(t).width>maxW&&line){lines.push(line);line=w;}else line=t;
});
if(line)lines.push(line);
lines.forEach(function(l,i){x.fillText(l,cx,cy+i*lh);});
return lines.length;
}
function drawReport(cb){
var W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;
var x=c.getContext('2d');
var g=x.createLinearGradient(0,0,0,H);
g.addColorStop(0,'#0e0c0d');g.addColorStop(.55,'#1e181a');g.addColorStop(1,'#120f10');
x.fillStyle=g;x.fillRect(0,0,W,H);
var r1=x.createRadialGradient(W*.85,H*.06,0,W*.85,H*.06,720);
r1.addColorStop(0,'rgba(183,110,121,.4)');r1.addColorStop(1,'rgba(183,110,121,0)');
x.fillStyle=r1;x.fillRect(0,0,W,H);
var r2=x.createRadialGradient(W*.12,H*.92,0,W*.12,H*.92,640);
r2.addColorStop(0,'rgba(229,199,134,.22)');r2.addColorStop(1,'rgba(229,199,134,0)');
x.fillStyle=r2;x.fillRect(0,0,W,H);
x.strokeStyle='rgba(212,165,165,.45)';x.lineWidth=3;
rr(x,44,44,W-88,H-88,40);x.stroke();
x.textAlign='left';
x.fillStyle='#e5c786';x.font='800 40px "Bricolage Grotesque", sans-serif';
x.fillText('NYALA ✦ ANTI MAGER',84,150);
x.fillStyle='#f2e4e6';x.font='800 96px "Bricolage Grotesque", sans-serif';
x.fillText('Sepekan',84,268);
x.fillText('Barakahku 🌹',84,372);
x.fillStyle='#c9aeb2';x.font='600 38px "Plus Jakarta Sans", sans-serif';
x.fillText(repRangeText(),84,442);
var s=weekStats();
var boxes=[['✅',s.tasks,'TUGAS BERES'],['⏱️',s.focus,'MENIT FOKUS'],['🌿',s.habits,'HABIT TERCEKLIS'],['📿',s.dhikr,'DZIKIR']];
boxes.forEach(function(bx,i){
var cx=84+(i%2)*468,cy=500+Math.floor(i/2)*250;
x.fillStyle='rgba(212,165,165,.08)';x.strokeStyle='rgba(212,165,165,.35)';x.lineWidth=2;
rr(x,cx,cy,444,220,28);x.fill();x.stroke();
x.font='64px sans-serif';x.fillStyle='#fff';x.fillText(bx[0],cx+30,cy+92);
x.fillStyle='#e5c786';x.font='800 84px "Bricolage Grotesque", sans-serif';
x.fillText(String(bx[1]),cx+130,cy+104);
x.fillStyle='#c9aeb2';x.font='700 30px "Plus Jakarta Sans", sans-serif';
x.fillText(bx[2],cx+30,cy+176);
});
x.fillStyle='#e8c4c8';x.font='800 34px "Bricolage Grotesque", sans-serif';
x.fillText('AKTIVITAS PER HARI',84,1080);
var max=1;s.days.forEach(function(d){max=Math.max(max,d.done);});
var bw=100,gap=28,x0=84,y0=1420,maxH=280;
s.days.forEach(function(d,i){
var h=Math.max(10,Math.round(d.done/max*maxH));
var bx=x0+i*(bw+gap);
var grad=x.createLinearGradient(0,y0-h,0,y0);
grad.addColorStop(0,'#e5c786');grad.addColorStop(1,'#b76e79');
x.fillStyle=d.done?grad:'rgba(212,165,165,.2)';
rr(x,bx,y0-h,bw,h,14);x.fill();
x.textAlign='center';
x.fillStyle='#f2e4e6';x.font='700 30px "Plus Jakarta Sans", sans-serif';
x.fillText(String(d.done),bx+bw/2,y0-h-16);
x.fillStyle='#c9aeb2';x.font='700 28px "Plus Jakarta Sans", sans-serif';
x.fillText(DAY_SHORT[d.d.getDay()],bx+bw/2,y0+44);
x.textAlign='left';
});
x.textAlign='center';
x.fillStyle='#f0dcdd';x.font='600 52px "Caveat", cursive';
var qi=(lastQuote>=0?lastQuote:0);
var qsrc=QUOTES[qi].q;
// FIXED: Menghapus referensi ke window.__nyalaT agar tidak error jika i18n.js belum dimuat/dihapus
var lines=wrapText(x,qsrc,W/2,1560,860,70);
x.fillStyle='#e5c786';x.font='700 30px "Plus Jakarta Sans", sans-serif';
x.fillText('— '+QUOTES[qi].b,W/2,1560+lines*70+30);
x.fillStyle='#8a6f74';x.font='700 32px "Plus Jakarta Sans", sans-serif';
x.fillText(location.hostname||'NYALA',W/2,1806);
x.fillText('Dibuat dengan 🌹 NYALA — produktif pelan-pelan',W/2,1852);
x.textAlign='left';
cb(c);
}
function reportCanvas(cb){
var done=function(){drawReport(cb);};
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(done).catch(done);}else done();
}
function downloadReport(){
reportCanvas(function(c){
c.toBlob(function(bl){
if(!bl){toast('Gagal membuat gambar 😔');return;}
var a=document.createElement('a');
a.href=URL.createObjectURL(bl);
a.download='nyala-sepekan-'+todayKey()+'.png';
document.body.appendChild(a);a.click();document.body.removeChild(a);
setTimeout(function(){URL.revokeObjectURL(a.href);},4000);
toast('Gambar tersimpan! Tinggal upload ke IG Story 📸');
},'image/png');
});
}
function shareReport(){
reportCanvas(function(c){
c.toBlob(function(bl){
if(!bl){downloadReport();return;}
try{
var f=new File([bl],'nyala-sepekan.png',{type:'image/png'});
if(navigator.canShare&&navigator.canShare({files:[f]})){
navigator.share({files:[f],title:'NYALA — Sepekan Barakahku',text:'Laporan produktivitas pekan ini 🌹'}).catch(function(){});
return;
}
}catch(e){}
downloadReport();
},'image/png');
});
}
var MODES={fokus:1500,kilat:120,rehat:300,deep50:3000,deep90:5400};
var MODE_LABEL={fokus:'Fokus',kilat:'Kilat',rehat:'Rehat',deep50:'Deep 50',deep90:'Deep 90',custom:'Custom',adhan:'Adzan'};
var tMode='fokus',tTotal=1500,tRemain=1500,tTimer=null,tRunning=false,RING_C=678.58,customMin=25;
var timerStartReal=0,timerPausedReal=0,timerPausedTotal=0;
function renderTimer(){
var tt=$('timeText');if(tt)tt.textContent=fmtTime(Math.max(0,tRemain));
var fg=$('ringFg');if(fg)fg.style.strokeDashoffset=String(RING_C*(1-tRemain/tTotal));
var ml=$('modeLabel');
if(ml){
var txt;
if(tMode==='adhan'&&customLabel)txt='Menuju Adzan '+customLabel;
else if(tMode==='custom')txt='Custom · '+Math.round(tTotal/60)+' mnt';
else txt=MODE_LABEL[tMode]||'';
ml.textContent=txt;
}
var lbl=MODE_LABEL[tMode]||'Fokus';
document.title=tRunning?'('+fmtTime(Math.max(0,tRemain))+') '+lbl+' — NYALA':'NYALA ✦ Anti Mager — Produktif dengan Elegan';
}
function setMode(m){
stopTimer();customLabel='';tMode=m;tTotal=MODES[m];tRemain=MODES[m];
document.querySelectorAll('.mode-chip').forEach(function(b){b.classList.toggle('on',b.dataset.mode===m);});
var cr=$('customRow');if(cr)cr.classList.remove('on');
var sb=$('startBtn');if(sb)sb.textContent='▶ Mulai';renderTimer();
}
function setCustomMode(mins){
stopTimer();customLabel='';tMode='custom';tTotal=mins*60;tRemain=mins*60;
document.querySelectorAll('.mode-chip').forEach(function(b){b.classList.remove('on');});
var cr=$('customRow');if(cr)cr.classList.add('on');
var sb=$('startBtn');if(sb)sb.textContent='▶ Mulai';renderTimer();
}
function stopTimer(){if(tTimer){clearInterval(tTimer);tTimer=null;}tRunning=false;timerStartReal=0;timerPausedReal=0;timerPausedTotal=0;try{localStorage.removeItem('nyala_timer_v1');}catch(e){}}
function persistTimer(){
try{
if(tRunning&&timerStartReal>0){
localStorage.setItem('nyala_timer_v1',JSON.stringify({start:timerStartReal,total:tTotal,mode:tMode,label:customLabel}));
}else{
localStorage.removeItem('nyala_timer_v1');
}
}catch(e){}
}
function restoreTimer(){
try{
var raw=localStorage.getItem('nyala_timer_v1');
if(!raw)return;
var o=JSON.parse(raw);
if(!o||!o.start||!o.total)return;
var remain=o.total-Math.floor((Date.now()-o.start)/1000);
tMode=o.mode||'fokus';customLabel=o.label||'';tTotal=o.total;
if(remain>0){
tRemain=remain;tRunning=true;timerStartReal=o.start;timerPausedTotal=0;
document.querySelectorAll('.mode-chip').forEach(function(b){b.classList.toggle('on',b.dataset.mode===tMode);});
var sb2=$('startBtn');if(sb2)sb2.textContent='⏸ Jeda';
tTimer=setInterval(tickTimer,1000);
renderTimer();
toast(' Timer-mu masih jalan dari tadi — semangat!');
}else{
localStorage.removeItem('nyala_timer_v1');
tRemain=o.total;timerStartReal=o.start;
finishTimer();
}
}catch(e){}
}
function tickTimer(){
if(timerStartReal>0){
var elapsed=Math.floor((Date.now()-timerStartReal-timerPausedTotal)/1000);
tRemain=Math.max(0,tTotal-elapsed);
if(tRemain<=0){finishTimer();return;}
}else{
tRemain--;
if(tRemain<=0){finishTimer();return;}
}
renderTimer();
}
function startTimer(){
if(tRunning){stopTimer();var sb=$('startBtn');if(sb)sb.textContent='▶ Lanjut';renderTimer();toast('Jeda dulu, tarik napas 🌬️');return;}
if(tRemain<=0)tRemain=tTotal;
tRunning=true;timerStartReal=Date.now();timerPausedReal=0;timerPausedTotal=0;
var sb=$('startBtn');if(sb)sb.textContent=' Jeda';chime();
tTimer=setInterval(tickTimer,1000);renderTimer();persistTimer();
}
function finishTimer(){
stopTimer();var finishedMode=tMode;var doneSecs=tTotal;tRemain=tTotal;
var sb=$('startBtn');if(sb)sb.textContent='▶ Mulai';renderTimer();
burst(90);chime();
if(finishedMode==='rehat'){toast(' Rehat selesai. Segar? Lanjut gas!');return;}
var k=todayKey();ensureToday();var dayT=state.tasks[k];
dayT.sessions=(dayT.sessions||0)+1;
var mins=Math.round(doneSecs/60);dayT.focusMin=(dayT.focusMin||0)+mins;
state.totals.focusMin+=mins;save();touchStreak();
var msg,xp;
if(finishedMode==='kilat'){msg='Mode kilat 2 menit beres! ';xp=30;}
else if(finishedMode==='adhan'){msg='Fokus sampai adzan tuntas! Waktunya sholat 🕌';xp=30;}
else if(finishedMode==='deep50'){msg='Deep Focus 50 menit tuntas! Ambis! ';xp=60;}
else if(finishedMode==='deep90'){msg='Deep Focus 90 menit tuntas! LEGENDARIS! ';xp=100;}
else if(finishedMode==='custom'){msg='Fokus custom '+mins+' menit beres! ';xp=Math.min(120,Math.max(20,mins));}
else{msg='Satu sesi fokus tuntas! ';xp=30;}
addXP(xp,msg);
renderTomatoes();
}
function renderTomatoes(){
var el=$('tomatoRow');if(!el)return;
var k=todayKey(),dayT=state.tasks[k]||{},s=dayT.sessions||0;
if(s===0){el.textContent='belum ada — ayo mulai!';return;}
var str='';for(var i=0;i<Math.min(s,12);i++)str+='';
el.textContent=str+(s>12?' ×'+s:'')+' ('+s+' sesi)';
}
var HABIT_EMOJIS=['','📖','🧘','🧹','🍎','💤'],HABIT_PICK='💧';
function renderHabits(){
var grid=$('habitGrid');if(!grid)return;grid.innerHTML='';
var days=[];for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days.push(d);}
var tk=todayKey();
state.habits.forEach(function(h){
var card=document.createElement('div');card.className='card habit-card';
var top=document.createElement('div');top.className='h-top';
var em=document.createElement('span');em.className='h-emoji';em.textContent=h.emoji||'';
var nm=document.createElement('span');nm.className='h-name';nm.textContent=h.name;
var del=document.createElement('button');del.className='h-del';del.textContent='️';del.setAttribute('aria-label','Hapus kebiasaan');
del.addEventListener('click',function(){
if(confirm('Hapus kebiasaan "'+h.name+'" ?')){state.habits=state.habits.filter(function(x){return x.id!==h.id;});save();renderHabits();renderScore();}
});
top.appendChild(em);top.appendChild(nm);top.appendChild(del);card.appendChild(top);
var dots=document.createElement('div');dots.className='h-dots';
days.forEach(function(d){
var dk=todayKey(d);
var dot=document.createElement('button');
dot.className='h-dot'+(h.hist[dk]?' on':'')+(dk===tk?' today':'');
dot.textContent=DAY_SHORT[d.getDay()].charAt(0);
dot.title=DAY_NAMES[d.getDay()]+' '+d.getDate()+(h.hist[dk]?' · beres ✓':'');
dot.addEventListener('click',function(){toggleHabitDay(h,dk,dk===tk);});
dots.appendChild(dot);
});
card.appendChild(dots);
var tb=document.createElement('button');
var doneToday=!!h.hist[tk];
tb.className='h-today-btn'+(doneToday?' is-done':'');
tb.textContent=doneToday?'✔ Hari ini beres!':'Tandai Beres Hari Ini';
tb.addEventListener('click',function(){toggleHabitDay(h,tk,true);});
card.appendChild(tb);grid.appendChild(card);
});
var adder=document.createElement('div');adder.className='card add-habit';
var lab=document.createElement('p');lab.style.fontWeight='800';lab.style.fontSize='.9rem';lab.textContent=' Kebiasaan baru:';
var inp=document.createElement('input');inp.type='text';inp.maxLength=30;inp.placeholder='misal: Tilawah 1 halaman';
var er=document.createElement('div');er.className='emoji-row';
HABIT_EMOJIS.forEach(function(e){
var b=document.createElement('button');b.textContent=e;b.className=(e===HABIT_PICK)?'sel':'';b.type='button';
b.addEventListener('click',function(){HABIT_PICK=e;er.querySelectorAll('button').forEach(function(x){x.classList.toggle('sel',x.textContent===e);});});
er.appendChild(b);
});
var ab=document.createElement('button');ab.className='btn leafy small';ab.textContent='Tambah Kebiasaan';
ab.addEventListener('click',function(){addHabit(inp.value);});
inp.addEventListener('keydown',function(ev){if(ev.key==='Enter')addHabit(inp.value);});
adder.appendChild(lab);adder.appendChild(inp);adder.appendChild(er);adder.appendChild(ab);
grid.appendChild(adder);
}
function addHabit(name){
name=(name||'').trim();
if(!name){toast('Isi dulu nama kebiasaannya ✍️');return;}
state.habits.push({id:Date.now()+''+Math.floor(Math.random()*999),name:name,emoji:HABIT_PICK,hist:{}});
save();renderHabits();renderScore();toast('Kebiasaan baru ditanam! 🌱');
}
function toggleHabitDay(h,dk,isToday){
if(h.hist[dk]){delete h.hist[dk];save();renderHabits();return;}
h.hist[dk]=true;save();
if(isToday){chime();burst(28);touchStreak();addXP(10,'Habit "'+h.name+'" beres! 💪');renderHistory();renderReport();}
else{renderHabits();}
}
var PLANTS=['','🌿','🌸','🌺','🌻','','🌹','🌳'];
function renderGarden(){
var row=$('plantsRow');if(!row)return;row.innerHTML='';
var count=Math.min(2+state.totals.done,10);
for(var i=0;i<count;i++){
var p=document.createElement('span');p.className='plant';p.textContent=PLANTS[i%PLANTS.length];
p.style.animationDelay=(i*0.08)+'s';p.style.fontSize=(1.7+((state.totals.done+i)%3)*0.35)+'rem';
row.appendChild(p);
}
var lvl=levelOf(state.xp);
var gt=$('gardenTitle');if(gt)gt.textContent='Lv.'+(lvl+1)+' · '+LEVELS[lvl].name;
var gs=$('gardenSub');if(gs)gs.textContent=GARDEN_SUBS[lvl];
var gd=$('gDone');if(gd)gd.textContent=state.totals.done;
var gf=$('gFocus');if(gf)gf.textContent=state.totals.focusMin;
var gst=$('gStreak');if(gst)gst.textContent=state.streak.count;
}
var WHEEL_OPTS=[
{e:'💧',t:'Minum segelas air',c:'#5a3a45'},
{e:'',t:'Push-up / squat 5 kali',c:'#b76e79'},
{e:'🧹',t:'Rapikan meja 2 menit',c:'#e5c786'},
{e:'✍️',t:'Tulis 3 hal yang kamu syukuri',c:'#8f4f5b'},
{e:'',t:'Stretching leher & bahu 1 menit',c:'#d4a5a5'},
{e:'',t:'Baca 1 halaman buku',c:'#c9a35c'},
{e:'💌',t:'Kirim pesan semangat ke 1 teman',c:'#a05c68'},
{e:'️',t:'Napas 4-7-8 tiga putaran',c:'#e8c4c8'}
];
var wheelAngle=0,spinning=false;
function buildWheel(){
var w=$('wheel');if(!w)return;
var grad=WHEEL_OPTS.map(function(o,i){return o.c+' '+(i*12.5)+'% '+((i+1)*12.5)+'%';}).join(',');
w.style.background='conic-gradient('+grad+')';
WHEEL_OPTS.forEach(function(o,i){
var l=document.createElement('span');l.className='wlabel';l.textContent=o.e;
var a=i*45+22.5;l.style.transform='rotate('+a+'deg) translateY(-88px) rotate(-'+a+'deg)';
w.appendChild(l);
});
}
function spinWheel(){
if(spinning)return;spinning=true;
var sb=$('spinBtn');if(sb)sb.disabled=true;
var res=$('wheelResult');if(res)res.classList.remove('show');
wheelAngle+=1800+Math.random()*720;
var w=$('wheel');if(w)w.style.transform='rotate('+wheelAngle+'deg)';
chime();
setTimeout(function(){
var norm=((wheelAngle%360)+360)%360;
var idx=Math.floor((((360-norm)%360))/45)%8;
var o=WHEEL_OPTS[idx];
if(res){
res.innerHTML='';
var big=document.createElement('div');big.style.fontSize='1.05rem';big.textContent=o.e+' '+o.t+'!';
var sm=document.createElement('small');sm.textContent='Kerjakan sekarang, maksimal 2 menit ⏱️';
var btn=document.createElement('button');btn.className='btn hot small';btn.style.marginTop='10px';btn.textContent='✅ Jadikan tugas';
btn.addEventListener('click',function(){
if(addTask(o.e+' '+o.t,false)){toast('Misi roda masuk ke papan! Gas! 🚀');
var el=document.getElementById('tugas');if(el)el.scrollIntoView({behavior:'smooth'});}
});
res.appendChild(big);res.appendChild(sm);res.appendChild(btn);res.classList.add('show');
}
burst(50);spinning=false;if(sb)sb.disabled=false;
},3950);
}
var QUOTES=[
{q:'"Mulai aja dulu. Sempurnanya sambil jalan."',b:'MANTRA NYALA'},
{q:'"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat."',b:'ZIG ZIGLAR'},
{q:'"Sedikit demi sedikit, lama-lama jadi bukit."',b:'PERIBAHASA INDONESIA'},
{q:'"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak."',b:'ABRAHAM LINCOLN'},
{q:'"Rahasia untuk maju adalah memulai."',b:'MARK TWAIN'},
{q:'"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak."',b:'ALBERT EINSTEIN'},
{q:'"Perjalanan seribu mil dimulai dari satu langkah."',b:'LAO TZU'},
{q:'"Fokus pada progres, bukan kesempurnaan."',b:'BILL PHILLIPS'},
{q:'"Mager itu wajar. Menyerah itu pilihan — dan kamu nggak harus milih itu."',b:'TIM NYALA'},
{q:'"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood."',b:'TIM NYALA'},
{q:'"Yang berat itu bukan pekerjaannya, tapi memulainya."',b:'TIM NYALA'}
];
var lastQuote=-1;
function shuffleQuote(){
var i;do{i=Math.floor(Math.random()*QUOTES.length);}while(i===lastQuote&&QUOTES.length>1);
lastQuote=i;
var qt=$('quoteText'),qb=$('quoteBy');
if(qt&&qb){
qt.classList.add('faded');qb.classList.add('faded');
setTimeout(function(){qt.textContent=QUOTES[i].q;qb.textContent='— '+QUOTES[i].b;
qt.classList.remove('faded');qb.classList.remove('faded');renderReport();},300);
}
}
function initReveal(){
var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
var obs=new IntersectionObserver(function(entries){
entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');obs.unobserve(en.target);}});
},{threshold:0.12});
els.forEach(function(e){obs.observe(e);});
}
function renderGreeting(){
var d=new Date(),h=d.getHours(),k='';
if(h>=4 && h<10)k='SELAMAT PAGI ☀️';else if(h>=10 && h<15)k='SELAMAT SIANG ️';
else if(h>=15 && h<18)k='SELAMAT SORE ';else k='SELAMAT MALAM 🌙';
var kick=$('kicker');if(kick)kick.textContent=k;
var msgs=['Matahari udah start duluan. Yuk mulai pelan-pelan 🌅','Energi masih ada — gas tipis-tipis aja ☀️',
'Sore gini enak buat beresin satu hal kecil 🍵','Malam bukan alasan mager. Satu langkah kecil cukup '];
var idx=h>=4 && h<10?0:(h>=10 && h<15?1:(h>=15 && h<18?2:3));
var dm=$('dayMsg');if(dm)dm.textContent=msgs[idx];
var dc=$('dateChip');if(dc)dc.textContent=DAY_NAMES[d.getDay()]+', '+d.getDate()+' '+MON_SHORT[d.getMonth()];
var nc=$('nameChip');if(nc)nc.textContent=state.name||'Kawan';
}
function doBackup(){
try{
var keys=['nyala_v1','nyala_quran_cache_v1','nyala_dzikir_pp_v1'];
var out={app:'NYALA',version:1,date:new Date().toISOString(),data:{}};
keys.forEach(function(k){var v=localStorage.getItem(k);if(v)out.data[k]=v;});
var blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});
var a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='nyala-backup-'+todayKey()+'.json';
document.body.appendChild(a);a.click();document.body.removeChild(a);
setTimeout(function(){URL.revokeObjectURL(a.href);},4000);
localStorage.setItem('nyala_last_backup',String(Date.now()));
toast('Cadangan terunduh! Simpan file-nya di tempat aman ');
}catch(e){toast('Gagal membuat cadangan 😔');}
}
function doRestore(file){
var r=new FileReader();
r.onload=function(){
try{
var o=JSON.parse(r.result);
if(!o||o.app!=='NYALA'||!o.data){toast('File cadangan tidak valid 😔');return;}
if(!confirm('Pulihkan data dari cadangan '+(o.date?new Date(o.date).toLocaleDateString('id-ID'):'')+'? Data saat ini akan ditimpa.'))return;
Object.keys(o.data).forEach(function(k){localStorage.setItem(k,o.data[k]);});
toast('Data dipulihkan! Memuat ulang… ');
setTimeout(function(){location.reload();},900);
}catch(e){toast('Gagal membaca file cadangan 😔');}
};
r.readAsText(file);
}
function maybeReminder(){
try{
var lb=parseInt(localStorage.getItem('nyala_last_backup')||'0',10);
var hasData=(state.xp>0||state.totals.done>0||state.habits.length>0);
if(hasData&&(Date.now()-lb)>7*86400000){
setTimeout(function(){toast('💾 Tips: cadangkan datamu lewat tombol di bawah halaman ya.');},2500);
}
}catch(e){}
}
function showWelcome(){
var ov=$('welcomeOverlay');if(!ov)return;
ov.style.display='flex';
var inp=$('welcomeName');
function done(skip){
try{localStorage.setItem('nyala_welcomed','1');}catch(e){}
ov.style.display='none';
if(!skip){
var n=((inp&&inp.value)||'').trim();
if(n){state.name=n.slice(0,20);save();renderGreeting();toast('Halo, '+state.name+'! Ayo nyalakan harimu ✨');}
}
}
var bs=$('welcomeSave');if(bs)bs.onclick=function(){done(false);};
var bk=$('welcomeSkip');if(bk)bk.onclick=function(){done(true);};
if(inp)inp.onkeydown=function(e){if(e.key==='Enter')done(false);};
}
function bind(){
document.querySelectorAll('#moodRow .mood').forEach(function(b){b.addEventListener('click',function(){pickMood(parseInt(b.dataset.i,10));});});
var ti=$('taskInput'),addBtn=$('addTaskBtn');
if(addBtn)addBtn.addEventListener('click',function(){if(addTask(ti?ti.value:'',false)&&ti){ti.value='';ti.focus();}});
if(ti)ti.addEventListener('keydown',function(e){if(e.key==='Enter'&&addTask(ti.value,false))ti.value='';});
var priBtn=$('priBtn');
if(priBtn)priBtn.addEventListener('click',function(){if(ti&&ti.value.trim()){if(addTask(ti.value,true))ti.value='';}else{toast('Tulis tugasnya dulu, lalu tandai ⭐');}});
var sugBox=$('suggests');
if(sugBox){SUGGESTIONS.forEach(function(s){
var b=document.createElement('button');b.className='sug';b.textContent=s;
b.addEventListener('click',function(){var plain=s.replace(/^[^\s]+\s/,'');if(addTask(plain,false))toast('Ditambahkan! Sekarang gas kerjakan 🚀');});
sugBox.appendChild(b);
});}
var st=$('startBtn');if(st)st.addEventListener('click',startTimer);
var rt=$('resetTimerBtn');if(rt)rt.addEventListener('click',function(){setMode(tMode==='custom'?'fokus':tMode);toast('Timer diulang ↺');});
document.querySelectorAll('.mode-chip').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.mode);});});
var cv=$('customVal');
function renderCustomVal(){if(cv)cv.textContent=customMin;}
var mm2=$('minMinus');
if(mm2)mm2.addEventListener('click',function(){customMin=Math.max(5,customMin-5);renderCustomVal();});
var pp3=$('minPlus');
if(pp3)pp3.addEventListener('click',function(){customMin=Math.min(180,customMin+5);renderCustomVal();});
if(cv)cv.addEventListener('click',function(){
var v=prompt('Berapa menit? (1–180)',String(customMin));
if(v===null)return;var n=parseInt(v,10);if(isNaN(n))return;
customMin=Math.min(180,Math.max(1,n));renderCustomVal();
toast('Angka diset: '+customMin+' menit — tap "Pakai" untuk mulai ⏱️');
});
var uc=$('useCustom');
if(uc)uc.addEventListener('click',function(){setCustomMode(customMin);toast('⏱️ Timer custom '+customMin+' menit siap. Gas!');});
renderCustomVal();
var sel=$('citySelect');
if(sel){
var g=document.createElement('option');g.value='__gps';g.textContent=' Otomatis (GPS saya)';sel.appendChild(g);
CITIES.forEach(function(c){var o=document.createElement('option');o.value=c.n;o.textContent=c.n;sel.appendChild(o);});
sel.value=(state.settings.mode==='gps')?'__gps':(state.settings.city||'Jakarta');
sel.addEventListener('change',function(){
if(sel.value==='__gps'){
if(!navigator.geolocation){toast('GPS tidak didukung browser ini 😔');return;}
toast('Mendeteksi lokasimu… 📍');
navigator.geolocation.getCurrentPosition(function(pos){
state.settings.mode='gps';
state.settings.lat=pos.coords.latitude.toFixed(4);
state.settings.lon=pos.coords.longitude.toFixed(4);
save();computePrayers();toast('Lokasi terdeteksi! Jadwal disesuaikan 📍');
},function(){
toast('GPS ditolak — pilih kota manual ya 🙏');
sel.value=(state.settings.mode==='gps')?'__gps':(state.settings.city||'Jakarta');
},{timeout:12000,maximumAge:300000});
}else{
state.settings.mode='city';state.settings.city=sel.value;save();computePrayers();
}
});
}
var rbt=$('retryBtn');
if(rbt)rbt.addEventListener('click',function(){computePrayers();toast('Jadwal dihitung ulang ✅');});
var ob=$('offsetBtn');
if(ob)ob.addEventListener('click',function(){
var v=prompt('Koreksi jadwal adzan (menit). Contoh: -2 atau 3',String((state.settings.offset)||0));
if(v===null)return;var n=parseInt(v,10);if(isNaN(n))n=0;
state.settings.offset=n;save();renderPrayers();updatePrayerCountdown();
});
var adb=$('adhanBtn');
if(adb)adb.addEventListener('click',function(){
if(!prayerTimes)computePrayers();
var np=nextPrayer();if(!np)return;
var secs=Math.floor((np.date-new Date())/1000);
if(secs<120){toast('Adzan '+np.label+' sebentar lagi — siap-siap sholat 🕌');return;}
setCustomTimerAdhan(secs,np.label);
var el=document.getElementById('fokus');if(el)el.scrollIntoView({behavior:'smooth'});
toast(' Timer diset sampai adzan '+np.label+'. Gas!');
});
function setCustomTimerAdhan(secs,label){
stopTimer();tMode='adhan';customLabel=label;tTotal=secs;tRemain=secs;
document.querySelectorAll('.mode-chip').forEach(function(b){b.classList.remove('on');});
var cr=$('customRow');if(cr)cr.classList.remove('on');
var sb=$('startBtn');if(sb)sb.textContent='▶ Mulai';renderTimer();
}
var tb=$('tasbihBtn');if(tb)tb.addEventListener('click',tapTasbih);
document.querySelectorAll('.syukur-in').forEach(function(inp){
inp.addEventListener('input',function(){saveSyukur(inp);});
});
var db=$('downloadBtn');if(db)db.addEventListener('click',downloadReport);
var shb=$('shareBtn');if(shb)shb.addEventListener('click',shareReport);
var sp1=$('spinBtn'),sp2=$('spinBtn2');
if(sp1)sp1.addEventListener('click',spinWheel);
if(sp2)sp2.addEventListener('click',spinWheel);
var sq=$('shuffleQuote');if(sq)sq.addEventListener('click',function(){shuffleQuote();chime();});
var qa1=$('qaGas');if(qa1)qa1.addEventListener('click',function(){
setMode('kilat');startTimer();
var el=document.getElementById('fokus');if(el)el.scrollIntoView({behavior:'smooth'});
toast('⚡ Mode kilat nyala! 2 menit aja, janji.');
});
var qa2=$('qaRoda');if(qa2)qa2.addEventListener('click',function(){var el=document.getElementById('roda');if(el)el.scrollIntoView({behavior:'smooth'});});
var qa3=$('qaKebun');if(qa3)qa3.addEventListener('click',function(){var el=document.getElementById('kebun');if(el)el.scrollIntoView({behavior:'smooth'});});
var nc=$('nameChip');
function editName(){
var n=prompt('Siapa nama panggilanmu? 😊',state.name||'');
if(n&&n.trim()){state.name=n.trim().slice(0,20);save();renderGreeting();toast('Siap, '+state.name+'! Kita nyala bareng 🔥');}
}
if(nc){nc.addEventListener('click',editName);nc.addEventListener('keydown',function(e){if(e.key==='Enter')editName();});}
var bk=$('backupBtn');if(bk)bk.addEventListener('click',doBackup);
var rs=$('restoreBtn');if(rs)rs.addEventListener('click',function(){var fi=$('restoreFile');if(fi)fi.click();});
var rf=$('restoreFile');if(rf)rf.addEventListener('change',function(){if(rf.files&&rf.files[0])doRestore(rf.files[0]);rf.value='';});
var rb=$('resetBtn');
if(rb)rb.addEventListener('click',function(){
if(confirm('Yakin mau menghapus SEMUA data NYALA di perangkat ini?')){
if(confirm('Beneran yakin? Streak dan XP-mu akan hilang 😢')){
try{localStorage.removeItem(KEY);}catch(e){}location.reload();
}
}
});
bindDayOverlay();
document.addEventListener('pointerdown',function(){try{if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}},{once:true});
}
function init(){
sizeCanvas();ensureToday();checkConsistency();
if(!state.name&&!localStorage.getItem('nyala_welcomed')){
setTimeout(function(){showWelcome();},600);
}
renderGreeting();renderHijri();computePrayers();renderTasbih();renderSyukur();
updateClock();
renderTasks();renderScore();renderHistory();renderTimer();renderTomatoes();restoreTimer();
renderHabits();renderGarden();buildWheel();renderReport();
lastQuote=Math.floor(Math.random()*QUOTES.length);
var qt=$('quoteText'),qb=$('quoteBy');
if(qt)qt.textContent=QUOTES[lastQuote].q;
if(qb)qb.textContent='— '+QUOTES[lastQuote].b;
if(state.today.mood>=0){
var btns=document.querySelectorAll('#moodRow .mood');
btns.forEach(function(b,bi){b.classList.toggle('picked',bi===state.today.mood);});
var m=MOOD_META[state.today.mood];
var bf=$('batFill');if(bf)bf.style.width=m.pct+'%';
var bt=$('batTxt');if(bt)bt.textContent=m.pct+'% · '+m.label;
if(state.today.hype){var hb=$('hypeBubble');if(hb){hb.textContent=' '+state.today.hype;hb.classList.add('show');}}
}
bind();initReveal();maybeReminder();
}
document.addEventListener('visibilitychange',function(){
if(!document.hidden&&tRunning){tickTimer();}
});
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
