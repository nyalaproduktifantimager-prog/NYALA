<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<title>Taman Qur'an — NYALA</title>
<link rel="icon" href="icon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#0e0c0d">
<style>
.tq-wrap{max-width:860px;margin:0 auto;padding:0 clamp(14px,3vw,22px) 90px}
.tq-head{display:flex;flex-direction:column;align-items:center;gap:12px;padding:22px 0 6px}
.tq-title{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(1.3rem,4.4vw,1.8rem);letter-spacing:1px;background:linear-gradient(120deg,var(--rose-soft),var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent}
.tq-chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.tq-card{padding:clamp(16px,3.4vw,24px);margin-top:16px}
.tq-status{display:inline-flex;align-items:center;gap:8px;border:1px dashed rgba(229,199,134,.45);background:rgba(229,199,134,.07);border-radius:999px;padding:9px 16px;font-size:.8rem;font-weight:800;color:var(--gold);margin-bottom:14px}
.tq-status button{border:none;background:rgba(229,199,134,.18);color:var(--gold);border-radius:999px;padding:5px 12px;font:800 .72rem 'Plus Jakarta Sans',sans-serif;cursor:pointer;margin-left:8px}
.tq-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.tq-row.one{grid-template-columns:1fr}
.tq-select{width:100%;background:rgba(0,0,0,.35);color:var(--ink);border:1px solid var(--line-strong);border-radius:14px;padding:13px 14px;font-weight:800;font-size:.9rem}
.tq-btns{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 14px}
.tq-surah{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border:1px solid rgba(229,199,134,.35);background:rgba(229,199,134,.06);border-radius:16px;padding:14px 18px;margin-bottom:14px}
.tq-surah:empty{display:none}
.tq-surah b{font-family:'Bricolage Grotesque';font-size:1.15rem;color:var(--gold)}
.tq-surah .ar{font-family:'Amiri',serif;font-size:1.4rem;color:var(--rose-soft)}
.tq-surah small{font-size:.76rem;font-weight:700;color:var(--ink-soft)}
.ayah{padding:16px clamp(14px,3vw,20px);margin-bottom:12px}
.ayah.playing{border-color:var(--gold);box-shadow:0 0 24px rgba(229,199,134,.25)}
.ayah .top{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.ayah .ref{font-size:.72rem;font-weight:800;color:var(--gold);border:1px solid rgba(229,199,134,.4);border-radius:999px;padding:5px 12px}
.ayah .dengar{margin-left:auto;border:1px solid var(--line-strong);background:rgba(212,165,165,.08);border-radius:999px;padding:8px 16px;font-size:.78rem;font-weight:800;color:var(--ink-soft);cursor:pointer}
.ayah .dengar:hover{border-color:var(--rose);color:var(--rose-soft)}
.ayah .ar{font-family:'Amiri',serif;font-size:clamp(1.4rem,4.8vw,1.9rem);line-height:2.05;text-align:right;direction:rtl;color:var(--ink);margin-bottom:10px}
.ayah .tr{font-size:.88rem;color:var(--ink-soft);font-weight:600;line-height:1.75}
.mood-chips{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}
.mood-chip{border:1px solid var(--line-strong);background:rgba(212,165,165,.06);border-radius:999px;padding:11px 18px;font-weight:800;font-size:.88rem;color:var(--ink-soft);cursor:pointer;transition:.2s}
.mood-chip:hover{transform:translateY(-3px);border-color:var(--rose)}
.mood-chip.on{background:linear-gradient(120deg,var(--rose-deep),#8f4f5b);color:#fff;border-color:var(--rose);box-shadow:var(--glow-rose)}
.haf-bar{height:12px;border-radius:999px;background:rgba(0,0,0,.4);border:1px solid var(--line);overflow:hidden;margin:6px 0 10px}
.haf-bar i{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--rose-deep),var(--gold));transition:width .4s}
.haf-legend{display:flex;gap:16px;flex-wrap:wrap;font-size:.76rem;font-weight:700;color:var(--ink-soft);margin-bottom:14px}
.haf-legend span::before{content:'';display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:6px;vertical-align:-1px}
.haf-legend .l0::before{background:#3a3236}
.haf-legend .l1::before{background:var(--rose-deep)}
.haf-legend .l2::before{background:var(--gold)}
.haf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px}
.haf-cell{border:1px solid var(--line);border-radius:12px;padding:12px 4px;text-align:center;font-weight:800;font-size:.86rem;background:rgba(0,0,0,.28);color:var(--ink-soft);cursor:pointer;transition:.18s}
.haf-cell:hover{transform:translateY(-3px);border-color:var(--rose)}
.haf-cell.s1{background:rgba(183,110,121,.35);border-color:var(--rose);color:var(--rose-soft)}
.haf-cell.s2{background:linear-gradient(135deg,var(--gold),var(--gold-deep));border-color:var(--gold);color:#241a0c;box-shadow:0 0 14px rgba(229,199,134,.35)}
.doa-tabs{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}
.doa-tab{border:1px solid var(--line-strong);background:rgba(212,165,165,.06);border-radius:16px;padding:12px 20px;font-weight:800;font-size:.9rem;color:var(--ink-soft);cursor:pointer;transition:.2s}
.doa-tab.on{background:linear-gradient(120deg,var(--rose-deep),#8f4f5b);color:#fff;border-color:var(--rose);box-shadow:var(--glow-rose)}
.doa{padding:18px clamp(14px,3vw,22px);margin-bottom:14px}
.doa h3{font-size:1rem;font-weight:800;color:var(--gold);margin-bottom:12px}
.doa .ar{font-family:'Amiri',serif;font-size:clamp(1.35rem,4.6vw,1.8rem);line-height:2.05;text-align:right;direction:rtl;color:var(--ink);margin-bottom:12px}
.doa .la{font-size:.82rem;font-style:italic;color:var(--rose-soft);font-weight:600;line-height:1.7;margin-bottom:8px}
.doa .arti{font-size:.88rem;color:var(--ink-soft);font-weight:600;line-height:1.75;padding-bottom:10px;border-bottom:1px dashed var(--line-strong);margin-bottom:10px}
.doa .man{font-size:.82rem;color:var(--gold);font-weight:700;line-height:1.6;margin-bottom:6px}
.doa .src{font-size:.74rem;color:var(--ink-mute);font-weight:600}
@media(max-width:560px){.tq-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="aurora" aria-hidden="true"></div>
<header class="top">
  <div class="top-in" style="justify-content:center">
    <a class="btn ghost small" href="index.html">← NYALA</a>
    <a class="btn ghost small" href="dzikir.html">📿 Dzikir</a>
  </div>
  <div class="tq-head">
    <div class="tq-title" id="tqTitle">🕌 TAMAN QUR'AN</div>
    <div class="tq-chips">
      <span class="chip" id="netChip">🌐 Online</span>
      <span class="chip" id="streakChip">🔥 0</span>
      <span class="chip lvl" id="xpChip">0 XP</span>
    </div>
  </div>
</header>
<main class="tq-wrap">
  <section>
    <div class="sec-head" style="margin-top:18px">
      <span class="sec-tag">A · BACA & DENGAR</span>
      <div><h2>Mushaf Digital 114 Surah / 30 Juz</h2></div>
      <p class="sec-sub">Baca sendiri atau baca bareng murottal. 📖</p>
    </div>
    <div class="card tq-card">
      <span class="tq-status" id="cacheStatus">📦 <span id="cacheTxt">Memuat data Qur'an…</span></span>
      <div class="tq-row">
        <select class="tq-select" id="modeSel" aria-label="Mode baca"></select>
        <select class="tq-select" id="targetSel" aria-label="Pilih surah atau juz"></select>
      </div>
      <div class="tq-row one">
        <select class="tq-select" id="qariSel" aria-label="Qori"></select>
      </div>
      <div class="tq-btns">
        <button class="btn leafy" id="btnSendiri">📖 <span id="lbSendiri">Baca Sendiri</span></button>
        <button class="btn ghost" id="btnBareng">🎧 <span id="lbBareng">Baca Bareng</span></button>
        <button class="btn sunny" id="btnMurottal">▶ <span id="lbMurottal">Murottal Surah</span></button>
      </div>
      <div class="tq-surah" id="surahInfo"></div>
      <div id="ayahBox"></div>
    </div>
  </section>
  <section>
    <div class="sec-head">
      <span class="sec-tag">B · AYAT UNTUK HATIMU</span>
      <div><h2>Sedang Merasa Apa?</h2></div>
      <p class="sec-sub">Pilih keadaanmu — Allah sudah menyiapkan ayat-ayatnya untukmu. 🤍</p>
    </div>
    <div class="mood-chips" id="moodChips"></div>
    <div id="moodResult"></div>
  </section>
  <section>
    <div class="sec-head">
      <span class="sec-tag">C · TRACKER HAFALAN</span>
      <div><h2>Perjalanan Huffaz-mu 🏆</h2></div>
      <p class="sec-sub">Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = +25 XP!</p>
    </div>
    <div class="card tq-card">
      <div class="haf-bar"><i id="hafFill"></i></div>
      <div style="font-weight:800;font-size:.9rem;margin-bottom:8px" id="hafCount">0 / 114 surah dihafal</div>
      <div class="haf-legend">
        <span class="l0">Belum</span>
        <span class="l1">Proses</span>
        <span class="l2">Hafal</span>
      </div>
      <div class="haf-grid" id="hafGrid"></div>
    </div>
  </section>
  <section>
    <div class="sec-head">
      <span class="sec-tag">D · DOA-DOA</span>
      <div><h2>Doa Sehari-hari, Para Nabi & Rasulullah ﷺ</h2></div>
      <p class="sec-sub">Lengkap dengan teks Arab, latin, arti, manfaat, dan sumber sahih. 🤲</p>
    </div>
    <div class="doa-tabs" id="doaTabs"></div>
    <div id="doaBox"></div>
  </section>
</main>
<div id="toasts" aria-live="polite"></div>
<script>
(function(){
'use strict';
function $(id){return document.getElementById(id);}
function toast(msg){var box=$('toasts');if(!box)return;var t=document.createElement('div');t.className='toast';t.textContent=msg;box.appendChild(t);setTimeout(function(){t.classList.add('go');setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},320);},3000);}

var NAMES=["Al-Faatihah","Al-Baqara","Aal-i-Imraan","An-Nisaa","Al-Maaida","Al-An'aam","Al-A'raaf","Al-Anfaal","At-Tauba","Yunus","Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr","An-Nahl","Al-Israa","Al-Kahf","Maryam","Thaa-Haa","Al-Anbiyaa","Al-Hajj","Al-Mu'minuun","An-Nuur","Al-Furqaan","Ash-Shu'araa","An-Naml","Al-Qasas","Al-Ankabuut","Ar-Ruum","Luqman","As-Sajda","Al-Ahzaab","Saba","Faatir","Yaa-Seen","As-Saaffaat","Shaad","Az-Zumar","Ghafir","Fusshilat","Ash-Shuura","Az-Zukhruf","Ad-Dukhaan","Al-Jaathiya","Al-Ahqaaf","Muhammad","Al-Fath","Al-Hujuraat","Qaaf","Adh-Dhaariyat","At-Tuur","An-Najm","Al-Qamar","Ar-Rahmaan","Al-Waaqia","Al-Hadid","Al-Mujaadila","Al-Hashr","Al-Mumtahana","As-Saff","Al-Jumu'ah","Al-Munaafiquun","At-Taghaabun","At-Talaaq","At-Tahriim","Al-Mulk","Al-Qalam","Al-Haaqqa","Al-Ma'aarij","Nooh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyaama","Al-Insaan","Al-Mursalaat","An-Naba","An-Naazi'aat","Abasa","At-Takwir","Al-Infitaar","Al-Mutaffifin","Al-Insyiqaaq","Al-Buruuj","At-Taariq","Al-A'laa","Al-Ghaashiya","Al-Fajr","Al-Balad","Ash-Shams","Al-Lail","Adh-Dhuhaa","Al-Insyirah","At-Tin","Al-Alaq","Al-Qadr","Al-Bayyina","Az-Zalzala","Al-Aadiyaat","Al-Qaari'ah","At-Takaatsur","Al-Asr","Al-Humaza","Al-Fiil","Quraisy","Al-Maa'uun","Al-Kautsar","Al-Kaafiruun","An-Nasr","Al-Masad","Al-Ikhlaas","Al-Falaq","An-Naas"];
var COUNTS=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
var OFFSET=[];(function(){var s=0;for(var i=0;i<COUNTS.length;i++){OFFSET.push(s);s+=COUNTS[i];}})();
var JUZ=[[1,1],[2,142],[2,253],[3,93],[4,148],[5,82],[6,111],[7,88],[8,41],[9,93],[11,6],[12,53],[15,1],[17,1],[18,75],[20,1],[21,112],[23,1],[25,21],[27,56],[29,46],[33,31],[36,28],[39,32],[41,47],[51,31],[57,1],[58,23],[67,1],[78,1]];
var QARIS=[{id:'ar.alafasy',n:'Misyari Al-Afasi'},{id:'ar.husary',n:'Mahmoud Khalil Al-Husary'},{id:'ar.abdurrahmaansudais',n:'Abdurrahman As-Sudais'},{id:'ar.abdulbasitmujawwad',n:'Abdul Basit (Mujawwad)'},{id:'ar.minshawi',n:'Mohamed Siddiq El-Minshawi'}];

var MOODS=[
{e:'😢',id:'Sedih',list:[{ref:'94:5',ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',tr:'Karena sesungguhnya bersama kesulitan ada kemudahan.'},{ref:'94:6',ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',tr:'Sesungguhnya bersama kesulitan ada kemudahan.'},{ref:'12:87',ar:'يَا بَنِيَّ اذْهَبُوا فَتَحَسَّسُوا مِن يُوسُفَ وَأَخِيهِ وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ',tr:'Jangan kamu berputus asa dari rahmat Allah.'}]},
{e:'😰',id:'Cemas',list:[{ref:'13:28',ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',tr:'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.'},{ref:'3:139',ar:'وَلَا تَهِنُوا وَلَا تَحْزَنُوا',tr:'Janganlah kamu lemah dan bersedih.'},{ref:'10:62',ar:'أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ',tr:'Wali-wali Allah tidak ada kekhawatiran.'}]},
{e:'🥰',id:'Bersyukur',list:[{ref:'14:7',ar:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',tr:'Jika kamu bersyukur, Aku akan menambah nikmat.'},{ref:'2:152',ar:'فَاذْكُرُونِي أَذْكُرْكُمْ',tr:'Ingatlah Aku, Aku akan ingat kamu.'},{ref:'16:53',ar:'وَمَا بِكُم مِّن نِّعْمَةٍ فَمِنَ اللَّهِ',tr:'Nikmat yang ada padamu dari Allah.'}]},
{e:'🌾',id:'Butuh Sabar',list:[{ref:'2:153',ar:'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',tr:'Allah beserta orang-orang yang sabar.'},{ref:'39:10',ar:'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',tr:'Orang sabar dicukupkan pahalanya tanpa batas.'},{ref:'3:200',ar:'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا',tr:'Hai orang beriman, bersabarlah.'}]},
{e:'💼',id:'Memohon Rezeki',list:[{ref:'65:3',ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',tr:'Barangsiapa bertawakal kepada Allah, Dia mencukupkan.'},{ref:'65:2',ar:'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',tr:'Barangsiapa bertakwa, Allah beri jalan keluar.'},{ref:'51:58',ar:'إِنَّ اللَّهَ هُوَ الرَّزَّاقُ',tr:'Allah Maha Pemberi rezeki.'}]},
{e:'🌙',id:'Merasa Sendiri',list:[{ref:'2:186',ar:'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',tr:'Aku dekat, mengabulkan doa.'},{ref:'50:16',ar:'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',tr:'Kami lebih dekat dari urat leher.'},{ref:'58:7',ar:'مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ',tr:'Allah bersama dalam pembicaraan.'}]},
{e:'🤍',id:'Meminta Ampun',list:[{ref:'39:53',ar:'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',tr:'Jangan berputus asa dari rahmat Allah.'},{ref:'4:110',ar:'وَمَن يَعْمَلْ سُوءًا ثُمَّ يَسْتَغْفِرِ اللَّهَ',tr:'Mohon ampun, Allah Pengampun.'},{ref:'110:3',ar:'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ',tr:'Bertasbih dan mohon ampun.'}]},
{e:'🛡',id:'Ingin Terlindungi',list:[{ref:'2:255',ar:'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',tr:'Allah, tidak ada tuhan selain Dia.'},{ref:'3:173',ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',tr:'Cukuplah Allah, sebaik-baik Pelindung.'},{ref:'113:1',ar:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',tr:'Aku berlindung kepada Tuhan subuh.'}]},
{e:'😠',id:'Marah',list:[{ref:'3:134',ar:'وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ',tr:'Menahan amarah dan memaafkan.'},{ref:'41:34',ar:'ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ',tr:'Tolak dengan cara lebih baik.'},{ref:'3:159',ar:'فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ',tr:'Berkat rahmat Allah, kamu lemah lembut.'}]},
{e:'🧭',id:'Bingung',list:[{ref:'1:6',ar:'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',tr:'Tunjukilah jalan lurus.'},{ref:'27:62',ar:'أَمَّن يُجِيبُ الْمُضْطَرَّ',tr:'Yang mengabulkan doa orang kesulitan.'},{ref:'42:10',ar:'فَحُكْمُهُ إِلَى اللَّهِ',tr:'Keputusan kembali kepada Allah.'}]}
];

var DOAS={
daily:[
{t:'🍽 Sebelum Makan',ar:'بِسْمِ اللَّهِ',la:'Bismillah',tr:'Dengan nama Allah.',m:'Membawa berkah.',s:'HR. Abu Dawud'},
{t:'🍽 Sesudah Makan',ar:'الْحَمْدُ لِلَّهِ',la:'Alhamdulillah',tr:'Segala puji bagi Allah.',m:'Menutup rezeki dengan syukur.',s:'HR. Tirmidzi'},
{t:'🌙 Sebelum Tidur',ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',la:'Bismika Allahumma amutu wa ahya',tr:'Dengan nama-Mu aku mati dan hidup.',m:'Lindungan Allah.',s:'HR. Bukhari'},
{t:'🌅 Bangun Tidur',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا',la:'Alhamdulillahil ladzi ahyaana',tr:'Segala puji bagi Allah yang menghidupkan kami.',m:'Membuka hari dengan syukur.',s:'HR. Bukhari'},
{t:'🚪 Keluar Rumah',ar:'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',la:'Bismillah tawakkaltu alallah',tr:'Dengan nama Allah, aku bertawakal.',m:'Penjagaan dari gangguan.',s:'HR. Abu Dawud'},
{t:'🏠 Masuk Rumah',ar:'بِسْمِ اللَّهِ وَلَجْنَا',la:'Bismillahi walajna',tr:'Dengan nama Allah kami masuk.',m:'Rumah diberkahi.',s:'HR. Abu Dawud'},
{t:'🕌 Masuk Masjid',ar:'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',la:'Allahummaftah li abwaba rahmatik',tr:'Ya Allah, bukakanlah pintu rahmat-Mu.',m:'Mendapat rahmat Allah.',s:'HR. Muslim'},
{t:'🚪 Keluar Masjid',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',la:'Allahumma inni as-aluka min fadlik',tr:'Ya Allah, aku memohon karunia-Mu.',m:'Mendapat karunia rezeki.',s:'HR. Muslim'},
{t:'🧼 Sebelum Wudhu',ar:'بِسْمِ اللَّهِ',la:'Bismillah',tr:'Dengan nama Allah.',m:'Menyucikan niat.',s:'HR. Abu Dawud'},
{t:'💧 Sesudah Wudhu',ar:'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ',la:'Asyhadu alla ilaha illallah',tr:'Aku bersaksi tiada tuhan selain Allah.',m:'Dibukakan 8 pintu surga.',s:'HR. Muslim'},
{t:'📣 Mendengar Adzan',ar:'اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ',la:'Allahumma rabba hadzihid da\'wah',tr:'Ya Allah, Tuhan pemilik seruan ini.',m:'Mendapat syafaat Nabi.',s:'HR. Bukhari'},
{t:'🚗 Naik Kendaraan',ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا',la:'Subhanalladzi sakhkhara lana hadza',tr:'Mahasuci Tuhan yang menundukkan ini.',m:'Perjalanan aman.',s:'QS. Az-Zukhruf: 13-14'},
{t:'🌙 Melihat Bulan Sabit',ar:'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ',la:'Allahumma ahillahu alaina bil yumni',tr:'Ya Allah, munculkanlah bulan dengan berkah.',m:'Bulan yang diberkahi.',s:'HR. Tirmidzi'},
{t:'🤧 Saat Bersin',ar:'الْحَمْدُ لِلَّهِ',la:'Alhamdulillah',tr:'Segala puji bagi Allah.',m:'Sunnah Rasulullah.',s:'HR. Bukhari'},
{t:'🛏 Sebelum Berhubungan',ar:'بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ',la:'Bismillah, Allahumma jannibnasy syaithan',tr:'Dengan nama Allah. Jauhkan kami dari setan.',m:'Anak terlindungi dari setan.',s:'HR. Bukhari, Muslim'},
{t:'🌊 Naik Kapal',ar:'بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا',la:'Bismillahi majraha wa mursaaha',tr:'Dengan nama Allah (yang menjalankan) kapal ini.',m:'Keselamatan di laut.',s:'QS. Hud: 41'},
{t:'⚔️ Saat Bertemu Musuh',ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',la:'Hasbunallahu wa ni\'mal wakil',tr:'Cukuplah Allah bagi kami.',m:'Pertolongan Allah.',s:'QS. Ali Imran: 173'},
{t:'🏪 Masuk Pasar',ar:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ',la:'La ilaha illallahu wahdahu',tr:'Tiada tuhan selain Allah.',m:'10.000 kebaikan dicatat.',s:'HR. Tirmidzi'},
{t:'🌧 Saat Hujan',ar:'اللَّهُمَّ صَيِّبًا نَافِعًا',la:'Allahumma shayyiban nafi\'an',tr:'Ya Allah, turunkan hujan yang bermanfaat.',m:'Hujan jadi rahmat.',s:'HR. Bukhari'},
{t:'🌬 Saat Angin Kencang',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا',la:'Allahumma inni as-aluka khairaha',tr:'Ya Allah, aku memohon kebaikan angin ini.',m:'Terlindungi dari bahaya.',s:'HR. Abu Dawud'}
],
prophets:[
{t:'🌿 Nabi Adam',ar:'رَبَّنَا ظَلَمْنَا أَنفُسَنَا',la:'Rabbana zhalamna anfusana',tr:'Ya Tuhan, kami zalimi diri kami.',m:'Pembuka taubat.',s:'QS. Al-A\'raf: 23'},
{t:'🚢 Nabi Nuh',ar:'رَبِّ إِنِّي أَعُوذُ بِكَ',la:'Rabbi inni a\'udzu bika',tr:'Ya Tuhanku, aku berlindung kepada-Mu.',m:'Memohon ampun dan petunjuk.',s:'QS. Hud: 47'},
{t:'🕊 Nabi Musa',ar:'رَبِّ اشْرَحْ لِي صَدْرِي',la:'Rabbisyrah li shadri',tr:'Ya Tuhanku, lapangkanlah dadaku.',m:'Kelapangan dada dan kemudahan.',s:'QS. Thaha: 25-28'},
{t:'🕌 Nabi Ibrahim',ar:'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ',la:'Rabbij\'alni muqimash shalah',tr:'Ya Tuhanku, jadikan aku pendiri sholat.',m:'Doa keluarga.',s:'QS. Ibrahim: 40'},
{t:'🕌 Nabi Ibrahim (2)',ar:'رَبَّنَا تَقَبَّلْ مِنَّا',la:'Rabbana taqabbal minna',tr:'Ya Tuhan, terimalah amalan kami.',m:'Diterimanya amal.',s:'QS. Al-Baqarah: 127'},
{t:'🕌 Nabi Ibrahim (3)',ar:'رَبِّ هَبْ لِي حُكْمًا',la:'Rabbi hab li hukman',tr:'Ya Tuhanku, berikanlah hikmah.',m:'Hikmah dan nama baik.',s:'QS. Asy-Syu\'ara: 83-84'},
{t:'👴 Nabi Zakariya',ar:'رَبِّ لَا تَذَرْنِي فَرْدًا',la:'Rabbi la tadzarni fardan',tr:'Ya Tuhanku, jangan biarkan aku sendiri.',m:'Harapan keturunan.',s:'QS. Al-Anbiya: 89'},
{t:'🐋 Nabi Yunus',ar:'لَّا إِلَٰهَ إِلَّا أَنتَ',la:'La ilaha illa anta',tr:'Tiada tuhan selain Engkau.',m:'Jalan keluar kesulitan.',s:'QS. Al-Anbiya: 87'},
{t:'🤕 Nabi Ayyub',ar:'أَنِّي مَسَّنِيَ الضُّرُّ',la:'Anni massaniyad durru',tr:'Sesungguhnya aku ditimpa penyakit.',m:'Kesembuhan dari penyakit.',s:'QS. Al-Anbiya: 83'},
{t:'👑 Nabi Sulaiman',ar:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ',la:'Rabbi awzi\'ni an asykura',tr:'Ya Tuhanku, berilah aku ilham bersyukur.',m:'Ilham untuk bersyukur.',s:'QS. An-Naml: 19'}
],
modern:[
{t:'🌅 Pembuka Hari',ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا',la:'Allahumma bika ashbahna',tr:'Ya Allah, dengan-Mu kami memasuki pagi.',m:'Penyerahan diri.',s:'HR. Tirmidzi'},
{t:'🌙 Penutup Hari',ar:'اللَّهُمَّ بِكَ أَمْسَيْنَا',la:'Allahumma bika amsaina',tr:'Ya Allah, dengan-Mu kami memasuki petang.',m:'Mengingat Allah.',s:'HR. Tirmidzi'},
{t:'🧠 Overthinking',ar:'حَسْبُنَا اللَّهُ',la:'Hasbunallah',tr:'Cukuplah Allah.',m:'Meredam cemas.',s:'QS. Ali Imran: 173'},
{t:'📚 Sebelum Belajar',ar:'رَبِّ زِدْنِي عِلْمًا',la:'Rabbi zidni ilma',tr:'Ya Tuhan, tambahkan ilmu.',m:'Membuka fokus.',s:'QS. Thaha: 114'},
{t:'💰 Memohon Rezeki',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا',la:'Allahumma inni as-aluka ilman nafi\'an',tr:'Ya Allah, aku mohon ilmu bermanfaat.',m:'Rezeki halal.',s:'HR. Ibnu Majah'},
{t:'😢 Memohon Kesabaran',ar:'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا',la:'Rabbana afrigh alaina sabran',tr:'Ya Tuhan, limpahkan kesabaran.',m:'Kesabaran dan keteguhan.',s:'QS. Al-Baqarah: 250'},
{t:'🤍 Memohon Ampunan',ar:'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي',la:'Allahummaghfir li dzanbi',tr:'Ya Allah, ampuni dosaku.',m:'Pengampunan menyeluruh.',s:'HR. Muslim'},
{t:'💳 Bebas dari Hutang',ar:'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ',la:'Allahumma ikfini bi halalika',tr:'Ya Allah, cukupkan aku dengan yang halal.',m:'Kecukupan rezeki.',s:'HR. Tirmidzi'},
{t:'😟 Bebas dari Kesedihan',ar:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ',la:'Allahumma inni a\'udzu bika minal hammi',tr:'Ya Allah, aku berlindung dari kegelisahan.',m:'Terbebas dari 8 perkara melemahkan.',s:'HR. Bukhari'},
{t:'💪 Memohon Kesehatan',ar:'اللَّهُمَّ عَافِنِي فِي بَدَنِي',la:'Allahumma \'afini fi badani',tr:'Ya Allah, sehatkanlah badanku.',m:'Kesehatan tubuh.',s:'HR. Abu Dawud'},
{t:'💍 Memohon Jodoh Shaleh',ar:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا',la:'Rabbana hab lana min azwajina',tr:'Ya Tuhan, anugerahkan pasangan shaleh.',m:'Pasangan menyejukkan hati.',s:'QS. Al-Furqan: 74'},
{t:'❤️ Memohon Ketenangan',ar:'يَا مُقَلِّبَ الْقُلُوبِ',la:'Ya muqallibal qulub',tr:'Wahai Dzat yang membolak-balikkan hati.',m:'Hati teguh di atas iman.',s:'HR. Tirmidzi'},
{t:'✨ Kebaikan Dunia Akhirat',ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً',la:'Rabbana atina fid dunya hasanatan',tr:'Ya Tuhan, beri kami kebaikan dunia akhirat.',m:'Kebaikan dunia dan akhirat.',s:'QS. Al-Baqarah: 201'},
{t:'🎯 Memohon Petunjuk',ar:'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ',la:'Allahumma inni astakhiruka',tr:'Ya Allah, aku memohon pilihan-Mu.',m:'Petunjuk Allah.',s:'HR. Bukhari'},
{t:'🏥 Saat Mendapat Musibah',ar:'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',la:'Inna lillahi wa inna ilaihi raji\'un',tr:'Sesungguhnya kami milik Allah.',m:'Pahala atas musibah.',s:'HR. Muslim'}
]};

var TABS=[['daily','🌅','Sehari-hari'],['prophets','🕌','Para Nabi'],['modern','💫','Rasulullah ﷺ']];
var HKEY='nyala_quran_hafalan_v1',QKEY='nyala_qari',VKEY='nyala_v1';
var haf={};try{haf=JSON.parse(localStorage.getItem(HKEY)||'{}')||{};}catch(e){haf={};}
function saveHaf(){try{localStorage.setItem(HKEY,JSON.stringify(haf));}catch(e){}}
var qari=QARIS[0].id;try{var q0=localStorage.getItem(QKEY);if(q0)qari=q0;}catch(e){}
var SURAH=null,IDMAP=null,ready=false,bareng=false,playingIdx=-1,curTab='daily',curMood=-1;
var audio=new Audio();audio.preload='none';

function st(){try{return JSON.parse(localStorage.getItem(VKEY))||{};}catch(e){return {};}}
function setXP(add){var s=st();s.xp=(s.xp||0)+add;try{localStorage.setItem(VKEY,JSON.stringify(s));}catch(e){}paintChips();}
function paintChips(){var s=st();$('xpChip').textContent=(s.xp||0)+' XP';$('streakChip').textContent='🔥 '+((s.streak&&s.streak.count)||0);$('netChip').textContent=navigator.onLine?'🌐 Online':'📴 Offline';}
window.addEventListener('online',paintChips);window.addEventListener('offline',paintChips);

function norm(obj){var out=[];function push(n,a){out.push({number:n,ayahs:a});}
 if(obj&&obj.data&&Array.isArray(obj.data.surahs)){obj.data.surahs.forEach(function(s){push(s.number,(s.ayahs||[]).map(function(a){return{n:a.numberInSurah,text:a.text};}));});}
 else if(obj&&Array.isArray(obj.surahs)){obj.surahs.forEach(function(s){push(s.number,(s.ayahs||[]).map(function(a){return{n:a.numberInSurah,text:a.text};}));});}
 out.sort(function(a,b){return a.number-b.number;});return out;}

function load(){
  $('cacheTxt').textContent='Memuat data Qur\'an…';
  fetch('quran-uthmani.json').then(function(r){if(!r.ok)throw new Error('HTTP');return r.json();}).then(function(ar){
    SURAH=norm(ar);
    return fetch('id.indonesian.json').then(function(r){if(!r.ok)throw new Error('HTTP');return r.json();});
  }).then(function(o){
    var m={};norm(o).forEach(function(s){m[s.number]={};s.ayahs.forEach(function(a){m[s.number][a.n]=a.text;});});IDMAP=m;
  }).catch(function(){IDMAP={};}).then(function(){
    ready=true;
    $('cacheTxt').textContent='114 surah siap ✅';
    buildSelects();
    renderAyahs();
  }).catch(function(){
    $('cacheTxt').textContent='Gagal memuat — cek koneksi';
  });
}

function buildSelects(){
  var ms=$('modeSel');if(!ms)return;ms.innerHTML='';
  [['surah','Per Surah'],['juz','Per Juz']].forEach(function(o){var e=document.createElement('option');e.value=o[0];e.textContent=o[1];ms.appendChild(e);});
  var t=$('targetSel');if(!t)return;t.innerHTML='';
  if(ms.value==='surah'){for(var i=0;i<114;i++){var o=document.createElement('option');o.value=i+1;o.textContent=(i+1)+'. '+NAMES[i];t.appendChild(o);}}
  else{for(var j=1;j<=30;j++){var o2=document.createElement('option');o2.value=j;o2.textContent='Juz '+j;t.appendChild(o2);}}
  var qs=$('qariSel');if(!qs)return;qs.innerHTML='';QARIS.forEach(function(q){var o3=document.createElement('option');o3.value=q.id;o3.textContent='🎙 '+q.n;qs.appendChild(o3);});qs.value=qari;
}

function curList(){
  if($('modeSel').value==='surah'){
    var sn=+$('targetSel').value||1;
    if(!ready||!SURAH)return[];
    var s=SURAH[sn-1];return s?s.ayahs.map(function(a){return{s:sn,n:a.n,ar:a.text};}):[];
  }
  var j=+$('targetSel').value||1,stt=JUZ[j-1],endS=j<30?JUZ[j][0]:114,endA=j<30?JUZ[j][1]:1;var out=[];
  for(var s2=stt[0];s2<=endS&&s2<=114;s2++){
    var a0=(s2===stt[0])?stt[1]:1;
    var a1=(s2===endS)?Math.max(a0,endA-1):COUNTS[s2-1];
    if(s2===114&&j===30)a1=COUNTS[113];
    for(var a=a0;a<=a1;a++){var sr=SURAH?s2-1>=0&&SURAH[s2-1]?SURAH[s2-1].ayahs.filter(function(x){return x.n===a;})[0]:null:null;if(sr)out.push({s:s2,n:a,ar:sr.text});}
  }
  return out;
}

function ayahText(s,n){if(!SURAH)return'';var sr=SURAH[s-1];if(!sr)return'';for(var i=0;i<sr.ayahs.length;i++){if(sr.ayahs[i].n===n)return sr.ayahs[i].text;}return'';}
function ayahTr(s,n){return (IDMAP&&IDMAP[s]&&IDMAP[s][n])||'';}

function renderAyahs(){
  var box=$('ayahBox');if(!box)return;
  var list=curList();box.innerHTML='';
  var info=$('surahInfo');info.innerHTML='';
  if($('modeSel').value==='surah'){
    var sn=+$('targetSel').value||1;
    var b=document.createElement('b');b.textContent=NAMES[sn-1];
    var sm=document.createElement('small');sm.textContent=COUNTS[sn-1]+' ayat';
    info.appendChild(b);info.appendChild(sm);
  }
  if(!ready){
    var p=document.createElement('div');p.className='card ayah';
    var pt=document.createElement('div');pt.className='tr';pt.textContent='Menunggu data ayat…';
    p.appendChild(pt);box.appendChild(p);return;
  }
  list.forEach(function(it,i){
    var card=document.createElement('div');card.className='card ayah';card.id='ayah-'+it.s+'-'+it.n;
    var top=document.createElement('div');top.className='top';
    var ref=document.createElement('span');ref.className='ref';ref.textContent=it.s+':'+it.n;
    var dn=document.createElement('button');dn.className='dengar';dn.textContent='▶ dengar';
    dn.addEventListener('click',function(){playSingle(it.s,it.n);});
    top.appendChild(ref);top.appendChild(dn);card.appendChild(top);
    var a=document.createElement('div');a.className='ar';a.setAttribute('lang','ar');a.setAttribute('dir','rtl');a.textContent=it.ar;card.appendChild(a);
    var tr=document.createElement('div');tr.className='tr';tr.textContent=ayahTr(it.s,it.n);card.appendChild(tr);
    box.appendChild(card);
  });
}

function playSingle(s,n){
  stopAudio();
  var num=OFFSET[s-1]+n;
  audio.src='https://cdn.islamic.network/quran/audio/128/'+qari+'/'+num+'.mp3';
  audio.play().catch(function(){toast('Audio gagal');});
  document.querySelectorAll('.ayah.playing').forEach(function(e){e.classList.remove('playing');});
  var el=$('ayah-'+s+'-'+n);if(el){el.classList.add('playing');el.scrollIntoView({behavior:'smooth',block:'center'});}
  audio.onended=function(){document.querySelectorAll('.ayah.playing').forEach(function(e){e.classList.remove('playing');});};
}

function stopAudio(){audio.pause();audio.onended=null;}

function moodCard(m){
  var card=document.createElement('div');card.className='card ayah';
  var top=document.createElement('div');top.className='top';
  var ref=document.createElement('span');ref.className='ref';ref.textContent=m.ref;
  var dn=document.createElement('button');dn.className='dengar';dn.textContent='▶ dengar';
  dn.addEventListener('click',function(){
    var p=m.ref.split(':');var s=+p[0],n=+p[1];
    playSingle(s,n);
  });
  top.appendChild(ref);top.appendChild(dn);card.appendChild(top);
  var a=document.createElement('div');a.className='ar';a.setAttribute('lang','ar');a.setAttribute('dir','rtl');a.textContent=m.ar;card.appendChild(a);
  var tr=document.createElement('div');tr.className='tr';tr.textContent=m.tr;card.appendChild(tr);
  return card;
}

function renderMoods(){
  var mc=$('moodChips');mc.innerHTML='';
  MOODS.forEach(function(m,i){
    var b=document.createElement('button');b.className='mood-chip'+(i===curMood?' on':'');
    b.textContent=m.e+' '+m.id;
    b.addEventListener('click',function(){curMood=i;renderMoods();});
    mc.appendChild(b);
  });
  renderMoodResult();
}

function renderMoodResult(){
  var box=$('moodResult');box.innerHTML='';
  if(curMood<0)return;
  var m=MOODS[curMood];
  (m.list||[]).forEach(function(a){box.appendChild(moodCard(a));});
}

function renderHaf(){
  var grid=$('hafGrid');grid.innerHTML='';
  var done=0;
  for(var s=1;s<=114;s++){
    var v=haf[s]||0;if(v===2)done++;
    var c=document.createElement('button');c.className='haf-cell'+(v===1?' s1':v===2?' s2':'');c.textContent=s;
    c.addEventListener('click',function(){
      var n=+this.textContent;var cur=haf[n]||0;var nx=(cur+1)%3;
      if(nx===2&&cur!==2){setXP(25);toast('🏆 Surah '+n+' ditandai hafal! +25 XP');}
      if(nx===0)delete haf[n];else haf[n]=nx;saveHaf();renderHaf();
    });
    grid.appendChild(c);
  }
  $('hafFill').style.width=Math.round(done/114*100)+'%';
  $('hafCount').textContent=done+' / 114 surah dihafal';
}

function renderTabs(){
  var tabs=$('doaTabs');tabs.innerHTML='';
  TABS.forEach(function(t){
    var b=document.createElement('button');b.className='doa-tab'+(t[0]===curTab?' on':'');
    b.textContent=t[1]+' '+t[2];
    b.addEventListener('click',function(){curTab=t[0];renderTabs();renderDoa();});
    tabs.appendChild(b);
  });
}

function renderDoa(){
  var box=$('doaBox');box.innerHTML='';
  (DOAS[curTab]||[]).forEach(function(d){
    var card=document.createElement('div');card.className='card doa';
    var h=document.createElement('h3');h.textContent=d.t;card.appendChild(h);
    var a=document.createElement('div');a.className='ar';a.setAttribute('lang','ar');a.setAttribute('dir','rtl');a.textContent=d.ar;card.appendChild(a);
    var la=document.createElement('div');la.className='la';la.textContent=d.la;card.appendChild(la);
    var ar2=document.createElement('div');ar2.className='arti';ar2.textContent=d.tr;card.appendChild(ar2);
    var m=document.createElement('div');m.className='man';m.textContent='✨ Manfaat: '+d.m;card.appendChild(m);
    var s2=document.createElement('div');s2.className='src';s2.textContent='📚 Sumber: '+d.s;card.appendChild(s2);
    box.appendChild(card);
  });
}

function bind(){
  buildSelects();
  $('modeSel').addEventListener('change',function(){buildSelects();renderAyahs();});
  $('targetSel').addEventListener('change',function(){stopAudio();renderAyahs();});
  $('btnSendiri').addEventListener('click',function(){bareng=false;stopAudio();});
  $('btnBareng').addEventListener('click',function(){
    if(!ready){toast('Data belum siap');return;}
    bareng=true;
    var list=curList();
    if(list.length){
      var it=list[0];
      playBareng(list,0);
    }
  });
  $('btnMurottal').addEventListener('click',function(){
    if($('modeSel').value!=='surah'){toast('Pilih mode Per Surah');return;}
    stopAudio();bareng=false;
    var sn=+$('targetSel').value||1;
    audio.src='https://cdn.islamic.network/quran/audio-surah/128/'+qari+'/'+sn+'.mp3';
    audio.play().catch(function(){toast('Murottal gagal');});
  });
}

function playBareng(list,idx){
  if(!bareng||idx>=list.length){bareng=false;stopAudio();return;}
  var it=list[idx];
  audio.src='https://cdn.islamic.network/quran/audio/128/'+qari+'/'+(OFFSET[it.s-1]+it.n)+'.mp3';
  audio.play().catch(function(){toast('Audio gagal');});
  document.querySelectorAll('.ayah.playing').forEach(function(e){e.classList.remove('playing');});
  var el=$('ayah-'+it.s+'-'+it.n);if(el){el.classList.add('playing');el.scrollIntoView({behavior:'smooth',block:'center'});}
  audio.onended=function(){playBareng(list,idx+1);};
}

function init(){
  try{bind();}catch(e){}
  try{renderMoods();}catch(e){}
  try{renderHaf();}catch(e){}
  try{renderTabs();renderDoa();}catch(e){}
  try{paintChips();}catch(e){}
  try{load();}catch(e){}
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
</script>
</body>
</html>
