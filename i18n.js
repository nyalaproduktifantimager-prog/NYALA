/* NYALA i18n v4 — sakelar ID/EN + mute global + sinkronisasi reload service worker.
   Teks Arab & transliterasi TIDAK PERNAH diterjemahkan. Tulisan pengguna TIDAK PERNAH diterjemahkan. */
(function(){
'use strict';
var LS='nyala_lang', LM='nyala_muted', lang='id', muted=false;
try{ if(localStorage.getItem(LS)==='en') lang='en'; }catch(e){}
try{ muted=localStorage.getItem(LM)==='1'; }catch(e){}
document.documentElement.lang = lang==='en' ? 'en' : 'id';
try{
  if(navigator.serviceWorker){
    navigator.serviceWorker.addEventListener('message',function(e){
      if(e.data==='NYALA_RELOAD'){
        var k='nyala_sw_reload_v5';
        try{ if(!sessionStorage.getItem(k)){ sessionStorage.setItem(k,'1'); setTimeout(function(){location.reload();},350); } }catch(e2){}
      }
    });
  }
}catch(e){}
var WD_ID=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
var WD_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MO_ID=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
var MO_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var HIJRI={'Muharam':'Muharram','Safar':'Safar','Rabiulawal':'Rabi al-Awwal','Rabiulakhir':'Rabi al-Thani','Jumadilawal':'Jumada al-Ula','Jumadilakhir':'Jumada al-Akhirah','Rajab':'Rajab',"Sya'ban":"Sha'ban",'Ramadan':'Ramadan','Syawal':'Shawwal','Zulkaidah':'Dhu al-Qadah','Zulhijah':'Dhu al-Hijjah'};
var PRAY={'Subuh':'Fajr','Dzuhur':'Dhuhr','Ashr':'Asr','Maghrib':'Maghrib','Isya':'Isha'};
var MAP={
'Hari Ini':'Today','Tugas':'Tasks','Fokus':'Focus','Spiritual':'Spiritual','Kebiasaan':'Habits','Kebun':'Garden','Roda':'Wheel','Laporan':'Report','📿 Dzikir':'📿 Dhikr',
'SELAMAT PAGI ☀️':'GOOD MORNING ☀️','SELAMAT SIANG 🌤️':'GOOD AFTERNOON 🌤️','SELAMAT SORE 🌇':'GOOD EVENING 🌇','SELAMAT MALAM 🌙':'GOOD NIGHT 🌙',
'Hei,':'Hey,','Kawan':'Friend',
'Matahari udah start duluan. Yuk mulai pelan-pelan 🌅':'The sun already started. Let us begin gently 🌅',
'Energi masih ada — gas tipis-tipis aja ☀️':'Still got energy — just a little push ☀️',
'Sore gini enak buat beresin satu hal kecil 🍵':'Evenings are perfect for finishing one small thing 🍵',
'Malam bukan alasan mager. Satu langkah kecil cukup 🌙':'Night is no excuse to stall. One small step is enough 🌙',
'Cek dulu: gimana energimu sekarang?':'Check in: how is your energy right now?',
'Mager banget':'Fully sluggish','Capek':'Tired','Biasa aja':'Okay','Senang':'Happy','Semangat membara':'On fire',
'🔋 Baterai semangat':'🔋 Motivation battery',
'Mode mager terdeteksi':'Sluggish mode detected','Mode hemat energi':'Energy-saving mode','Mode stabil':'Steady mode','Mode cerah':'Bright mode','Mode turbo!':'Turbo mode!',
'Nggak apa-apa, kita curi start 2 menit aja — sisanya bonus 🐢':'It is okay, let us steal a 2-minute start — the rest is bonus 🐢',
'Rebahan boleh, tapi sambil nunggu timer kilat ya 😉':'Lounging is fine, but while the quick timer runs 😉',
'Gerak dikiiit aja dulu. Mood biasanya nyusul belakangan 🐌':'Move just a tiny bit first. Mood usually follows 🐌',
'Mode hemat energi: pilih satu hal yang paling ringan 🪫':'Energy-saving mode: pick the lightest thing 🪫',
'Kamu tetap keren walau pelan. Istirahat juga bagian dari progres 🤍':'You are still great even slow. Rest is part of progress 🤍',
'Rehat 5 menit dulu, lanjut kalau sudah siap 🌿':'Take a 5-minute break, continue when ready 🌿',
'Mulai dari yang 2 menit aja. Pelan tapi jalan 👌':'Start with the 2-minute one. Slow but moving 👌',
'Satu langkah kecil > seribu niat. Yuk mulai?':'One small step > a thousand intentions. Shall we?',
'Pemanasan dulu: pilih satu tugas termudah ☕':'Warm up first: pick the easiest task ☕',
'Mood bagus = waktu emas. Gas satu prioritas! ✨':'Good mood = golden time. Hit one priority! ✨',
'Senyum dulu, lalu hajar satu tugas kecil 😄':'Smile first, then crush one small task 😄',
'Energi positifmu pas banget buat fokus sebentar 🌈':'Your positive energy is perfect for a short focus 🌈',
'Wah, energi penuh! Sikat tugas paling susah dulu 🔥':'Wow, full energy! Tackle the hardest task first 🔥',
'Gas sekarang mumpung lagi on fire! ⚡':'Go now while you are on fire! ⚡',
'Kamu lagi mode turbo — jangan lupa minum air ya 😄':'You are in turbo mode — remember to drink water 😄',
'⚡ Gas 2 Menit':'⚡ Go 2 Minutes','🎲 Bingung mulai?':'🎲 Not sure where to start?','🌱 Intip Kebunku':'🌱 Peek at my garden',
'📋 Skor Hari Ini':'📋 Today’s Score','beres hari ini':'done today',
'tugas total':'tasks total','habit aktif':'active habits','hari konsisten':'consistent days',
'🗓️ Jejak 14 hari terakhir':'🗓️ Last 14 days trail','(tap tanggal untuk rincian)':'(tap a date for details)',
'🌸 3 Hal yang Disyukuri Hari Ini':'🌸 3 Things I’m Grateful for Today',
'1. Contoh: hujan reda tepat sebelum berangkat…':'1. e.g. the rain stopped right before I left…',
'2. Contoh: ada teman yang menyapa dulu…':'2. e.g. a friend said hi first…',
'3. Contoh: tubuhku kuat puasa hari ini…':'3. e.g. my body was strong enough to fast today…',
'Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu. 🤍':'Write 3 small things you are grateful for today — saved automatically on your phone. 🤍',
'Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu.':'Write 3 small things you are grateful for today — saved automatically on your phone.',
'🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!':'🌸 MasyaAllah, today’s gratitude is complete. May it become a beautiful habit!',
'01 · MISI HARIAN':'01 · DAILY MISSIONS','02 · MODE FOKUS':'02 · FOCUS MODE','03 · SPIRITUAL CORNER':'03 · SPIRITUAL CORNER','04 · RITUAL HARIAN':'04 · DAILY RITUALS','05 · BUKTI PROGRES':'05 · PROOF OF PROGRESS','06 · ANTI BINGUNG':'06 · ANTI-CONFUSION','07 · LAPORAN MINGGUAN':'07 · WEEKLY REPORT',
'Papan Tugas Anti-Mager':'Anti-Sluggish Task Board','Timer Nyalakan Fokus':'Ignite-Your-Focus Timer','Produktif Dunia, Tenang Ibadah':'Productive in Life, Calm in Worship','Pelacak Kebiasaan':'Habit Tracker','Kebun Nyalamu':'Your Garden of Light','Roda Semangat':'Wheel of Momentum','Sepekan Barakahku':'My Blessed Week',
'Rahasianya: mulai dari yang':'The secret: start with the','paling kecil':'smallest one',
'. Centang satu, dapat XP + konfeti. Serius. ⭐ = prioritas selalu di atas · ▲▼ atau tahan ⠿ lalu seret = atur urutan.':'. Check one off, earn XP + confetti. Seriously. ⭐ = priorities always on top · ▲▼ or hold ⠿ then drag = reorder.',
'Nggak mood?':'Not in the mood?','Kilat 2 menit':'Quick 2 minutes','. Lagi ambis?':'. Feeling ambitious?','Deep Focus 50/90 menit':'Deep Focus 50/90 minutes',
'— atau atur sendiri menitnya. XP sampai +100! 🚀 Timer tetap jalan walau aplikasi diminimkan.':'— or set your own minutes. Up to +100 XP! 🚀 The timer keeps running even when the app is minimized.',
'Kerjaan jalan, sholat tetap nomor satu. 🕌':'Work goes on, prayer stays number one. 🕌',
'Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!':'Small repeated habits = big change. Check in today, +10 XP per habit!',
'Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun 🌸':'Every finished task grows a new plant. The more consistent, the lusher 🌸',
'Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!':'Brain blank? Let the wheel choose. Spin, then go without overthinking!',
'Rekap otomatis 7 hari terakhir — unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular! 🌹':'Automatic recap of the last 7 days — download as a 9:16 image, post to IG Story / WA Status, and let your momentum spread! 🌹',
'Tulis satu hal kecil… (misal: balas 1 email)':'Write one small thing… (e.g. reply to 1 email)','Tugas baru':'New task',
'+ Tambah':'+ Add','⭐ Prioritas':'⭐ Priority','Tandai sebagai prioritas':'Mark as priority',
'💧 Minum segelas air':'💧 Drink a glass of water','🧹 Rapikan meja 2 menit':'🧹 Tidy your desk for 2 minutes','📖 Baca 1 halaman buku':'📖 Read 1 page of a book','💬 Balas 1 chat tertunda':'💬 Reply to 1 pending chat','🙆 Stretching ringan':'🙆 Light stretching',
'Papan masih kosong nih…':'The board is still empty…','Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!':'Tap a suggestion above, or write your own task. Start small!',
'Pilih ritmemu 🎧':'Pick your rhythm 🎧','Selesai satu sesi =':'Finish one session =','(Deep Focus sampai':'(Deep Focus up to',') dan tomat 🍅 masuk koleksi.':') and tomatoes 🍅 join your collection.','masuk koleksi.':'join your collection.',
'🍅 Fokus 25':'🍅 Focus 25','⚡ Kilat 2':'⚡ Quick 2','🌿 Rehat 5':'🌿 Break 5','⏱️ Atur sendiri:':'⏱️ Custom:','Pakai':'Use','▶ Mulai':'▶ Start','↺ Ulang':'↺ Reset','Kurangi 5 menit':'Minus 5 minutes','Tambah 5 menit':'Plus 5 minutes','Tap untuk ketik angka persis':'Tap to type an exact number',
'Koleksi hari ini:':'Today’s collection:','belum ada — ayo mulai!':'none yet — let’s start!',
'Menghitung…':'Calculating…','Pilih kota atau GPS':'Choose city or GPS','📍 Otomatis (GPS saya)':'📍 Automatic (my GPS)','Hitung ulang jadwal':'Recalculate schedule','Koreksi menit jadwal adzan':'Adjust adhan minutes',
'🕌 Fokus Sampai Adzan':'🕌 Focus Until Adhan','Dihitung otomatis di perangkat (metode Kemenag: Subuh 20°, Isya 18°).':'Computed on-device (Kemenag method: Fajr 20°, Isha 18°).','📍 Lokasimu (GPS)':'📍 Your location (GPS)',
'Subuh':'Fajr','Dzuhur':'Dhuhr','Ashr':'Asr','Maghrib':'Maghrib','Isya':'Isha',
'📿 Tasbih Digital':'📿 Digital Tasbih','Target dzikir harianmu — tap lingkaran untuk berdzikir.':'Your daily dhikr target — tap the circle to count.','Hitung dzikir':'Count dhikr',
'➕ Kebiasaan baru:':'➕ New habit:','misal: Tilawah 1 halaman':'e.g. Read 1 page of Qur’an','Tambah Kebiasaan':'Add habit','✔ Hari ini beres!':'✔ Done today!','Tandai Beres Hari Ini':'Mark done today','Hapus kebiasaan':'Delete habit',
'TUGAS SELESAI SEPANJANG MASA':'TASKS COMPLETED ALL-TIME','MENIT FOKUS TERKUMPUL':'FOCUS MINUTES COLLECTED','HARI BERUNTUN CHECK-IN':'CONSECUTIVE CHECK-IN DAYS','Kebun progres':'Progress garden',
'Masih benih nih — siram dengan satu tugas kecil 🌰':'Still a seed — water it with one small task 🌰','Kecambah pertama muncul! Jangan berhenti 🌱':'First sprout appeared! Do not stop 🌱','Akarmu menguat, lanjutkan ritmenya 🌿':'Your roots strengthen, keep the rhythm 🌿','Daunnya rimbun — fokusmu juga 🍃':'The leaves are lush — so is your focus 🍃','Mulai berbunga. Kamu keren! 🌷':'Starting to bloom. You are amazing! 🌷','Kebunmu hampir jadi hutan! 🌳':'Your garden is almost a forest! 🌳','Legendaris. Kebunmu subur maksimal 🏆':'Legendary. Your garden is maximally lush 🏆',
'Kaum Rebahan 🛋️':'The Loungers 🛋️','Mulai Geliat 🥱':'Starting to Stir 🥱','Pemanasan ☕':'Warming Up ☕','Mode Gas ⚡':'Go Mode ⚡','Pejuang Fokus 🔥':'Focus Warrior 🔥','Pendekar Produktif ⚔️':'Productivity Knight ⚔️','Master Anti-Mager 👑':'Anti-Sluggish Master 👑',
'Putar rodanya 🎰':'Spin the wheel 🎰','Apa pun hasilnya, kerjakan':'Whatever it lands on, do it','sekarang':'now','— maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti.':'— max 2 minutes. No overthinking, no later.','🎡 PUTAR SEKARANG':'🎡 SPIN NOW','GAS!':'GO!',
'💧 Minum segelas air!':'💧 Drink a glass of water!','💪 Push-up / squat 5 kali!':'💪 5 push-ups / squats!','🧹 Rapikan meja 2 menit!':'🧹 Tidy your desk for 2 minutes!','✍️ Tulis 3 hal yang kamu syukuri!':'✍️ Write 3 things you are grateful for!','🧘 Stretching leher & bahu 1 menit!':'🧘 Neck & shoulder stretch for 1 minute!','📖 Baca 1 halaman buku!':'📖 Read 1 page of a book!','💌 Kirim pesan semangat ke 1 teman!':'💌 Send an encouraging message to 1 friend!','🌬️ Napas 4-7-8 tiga putaran!':'🌬️ 4-7-8 breathing, three rounds!',
'Kerjakan sekarang, maksimal 2 menit ⏱️':'Do it now, max 2 minutes ⏱️','✅ Jadikan tugas':'✅ Make it a task',
'🌹 Sepekan Barakahku':'🌹 My Blessed Week','✅ TUGAS BERES':'✅ TASKS DONE','⏱️ MENIT FOKUS':'⏱️ FOCUS MINUTES','🌿 HABIT TERCEKLIS':'🌿 HABITS CHECKED','📿 DZIKIR':'📿 DHIKR','📸 Unduh Gambar':'📸 Download image','📤 Share ke Story':'📤 Share to Story','Gambar 9:16 dengan branding NYALA — siap tempel ke IG Story / Status WA.':'9:16 image with NYALA branding — ready for IG Story / WA Status.',
'Sepekan':'My Blessed','Barakahku 🌹':'Week 🌹','AKTIVITAS PER HARI':'DAILY ACTIVITY','Mg':'Su','Sn':'Mo','Sl':'Tu','Rb':'We','Km':'Th','Jm':'Fr','Sb':'Sa',
'— MANTRA NYALA':'— NYALA MANTRA','— TIM NYALA':'— NYALA TEAM','— PERIBAHASA INDONESIA':'— INDONESIAN PROVERB',
'"Mulai aja dulu. Sempurnanya sambil jalan."':'"Just start. Perfection comes along the way."',
'"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat."':'"You do not need to be great to start, but you need to start to be great."',
'"Sedikit demi sedikit, lama-lama jadi bukit."':'"Little by little, eventually it becomes a hill."',
'"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak."':'"Discipline is choosing between what you want now and what you want most."',
'"Rahasia untuk maju adalah memulai."':'"The secret of getting ahead is getting started."',
'"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak."':'"Life is like riding a bicycle. To keep your balance, you must keep moving."',
'"Perjalanan seribu mil dimulai dari satu langkah."':'"A journey of a thousand miles begins with a single step."',
'"Fokus pada progres, bukan kesempurnaan."':'"Focus on progress, not perfection."',
'"Mager itu wajar. Menyerah itu pilihan — dan kamu nggak harus milih itu."':'"Feeling sluggish is normal. Giving up is a choice — and you do not have to make it."',
'"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood."':'"Productive people are not always motivated; they keep going even when not in the mood."',
'"Yang berat itu bukan pekerjaannya, tapi memulainya."':'"The hard part is not the work, it is starting."',
'🔀 Kocok semangat lagi':'🔀 Shuffle more spirit',
'Dibuat dengan':'Made with','biar kamu nggak mager lagi.':'so you never stall again.','Semua datamu tersimpan aman di perangkat ini — tanpa akun, tanpa ribet.':'All your data stays safely on this device — no account, no fuss.','Kolaborasi:':'Collaboration:','💾 Cadangkan data':'💾 Back up data','📂 Pulihkan data':'📂 Restore data','Mulai ulang dari nol (hapus semua data)':'Start over from zero (erase all data)',
'Selamat datang di NYALA':'Welcome to NYALA','Sebelum mulai, siapa nama panggilanmu?':'Before we start, what should we call you?','Ketik namamu di sini…':'Type your name here…','Mulai Nyala 🔥':'Ignite 🔥','Lewati dulu':'Skip for now',
'Tidak ada tugas tercatat hari itu.':'No tasks recorded that day.','🌸 Syukur hari itu:':'🌸 Gratitude that day:','📥 Bawa tugas belum selesai ke hari ini':'📥 Carry unfinished tasks to today',
'⏱️ Timer-mu masih jalan dari tadi — semangat!':'⏱️ Your timer has been running all along — keep going!','🔀 Urutan tugas diperbarui':'🔀 Task order updated','⭐ Ditandai prioritas — naik ke atas!':'⭐ Marked priority — moved to the top!','Prioritas dilepas':'Priority removed','⭐ Tugas prioritas selalu di kelompok atas':'⭐ Priority tasks always stay in the top group',
'⚡ Mode kilat nyala! 2 menit aja, janji.':'⚡ Quick mode on! Just 2 minutes, promise.','Jeda dulu, tarik napas 🌬️':'Paused — take a breath 🌬️','Timer diulang ↺':'Timer reset ↺','🌿 Rehat selesai. Segar? Lanjut gas!':'🌿 Break finished. Refreshed? Keep going!',
'Mode kilat 2 menit beres! ⚡':'Quick 2-minute session done! ⚡','Fokus sampai adzan tuntas! Waktunya sholat 🕌':'Focus until adhan complete! Time to pray 🕌','Deep Focus 50 menit tuntas! Ambis! 🚀':'Deep Focus 50 minutes done! Ambitious! 🚀','Deep Focus 90 menit tuntas! LEGENDARIS! 🚀':'Deep Focus 90 minutes done! LEGENDARY! 🚀','Satu sesi fokus tuntas! 🍅':'One focus session done! 🍅',
'Kebiasaan baru ditanam! 🌱':'New habit planted! 🌱','Syukur hari ini lengkap 🌸':'Today’s gratitude complete 🌸','Hari konsisten: ≥70% tugas beres! 🔥':'Consistent day: ≥70% tasks done! 🔥','Check-in mood dulu ☺️':'Mood check-in first ☺️','Prioritas beres! 🌟':'Priority done! 🌟','Satu tugas tumbang!':'One task down!','Ditambahkan! Sekarang gas kerjakan 🚀':'Added! Now go do it 🚀','Misi roda masuk ke papan! Gas! 🚀':'Wheel mission added to the board! Go! 🚀',
'Tulis dulu tugasnya ya ✍️':'Write the task first ✍️','Tulis tugasnya dulu, lalu tandai ⭐':'Write the task first, then mark ⭐','Isi dulu nama kebiasaannya ✍️':'Fill in the habit name first ✍️',
'Cadangan terunduh! Simpan file-nya di tempat aman 💾':'Backup downloaded! Keep the file somewhere safe 💾','Gagal membuat cadangan 😔':'Failed to create backup 😔','File cadangan tidak valid 😔':'Invalid backup file 😔','Data dipulihkan! Memuat ulang… 📂':'Data restored! Reloading… 📂','Gagal membaca file cadangan 😔':'Failed to read backup file 😔','💾 Tips: cadangkan datamu lewat tombol di bawah halaman ya.':'💾 Tip: back up your data with the button at the bottom of the page.',
'Jadwal dihitung ulang ✅':'Schedule recalculated ✅','Mendeteksi lokasimu… 📍':'Detecting your location… 📍','Lokasi terdeteksi! Jadwal disesuaikan 📍':'Location detected! Schedule adjusted 📍','GPS ditolak — pilih kota manual ya 🙏':'GPS denied — please pick a city manually 🙏','GPS tidak didukung browser ini 😔':'GPS not supported by this browser 😔',
'Gagal membuat gambar 😔':'Failed to create image 😔','Gambar tersimpan! Tinggal upload ke IG Story 📸':'Image saved! Just upload to IG Story 📸',
'Yakin mau menghapus SEMUA data NYALA di perangkat ini?':'Are you sure you want to erase ALL NYALA data on this device?','Beneran yakin? Streak dan XP-mu akan hilang 😢':'Really sure? Your streak and XP will be lost 😢',
'Berapa menit? (1–180)':'How many minutes? (1–180)','Koreksi jadwal adzan (menit). Contoh: -2 atau 3':'Adhan schedule offset (minutes). e.g. -2 or 3','Siapa nama panggilanmu? 😊':'What should we call you? 😊',
'← NYALA':'← NYALA','DZIKIR PAGI & PETANG':'MORNING & EVENING DHIKR','Pagi':'Morning','Petang':'Evening','Ayat Kursi':'Ayat al-Kursi (The Throne Verse)','Cari dzikir…':'Search dhikr…','Cari surah…':'Search surah…',
'Waktu utama:':'Prime time:','📜 Lisensi:':'📜 License:',
'Dzikir pagi setelah Subuh hingga terbit matahari; dzikir petang setelah Ashar hingga terbenam (boleh selepas Maghrib). Tap lingkaran hitungan sesuai jumlah anjuran. 🤍':'morning dhikr after Fajr until sunrise; evening dhikr after Asr until sunset (allowed after Maghrib). Tap the counter circle according to the recommended count. 🤍',
'Teks Arab (Al-Qur\'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.':'Arabic text (Qur\'an & hadith) = public domain. Transliteration & Indonesian translation = original writing of this app, released CC0 / public domain for the ummah without restriction.',
'NYALA ✦ Anti Mager — Produktif dengan Elegan':'NYALA ✦ Anti Mager — Productive with Grace'
};
function idx(a,v){for(var i=0;i<a.length;i++){if(a[i]===v)return i;}return -1;}
var PAT=[
{re:/^(\+\d+ XP · )([\s\S]+)$/,f:function(m){return m[1]+tr(m[2]);}},
{re:/^🎉 NAIK LEVEL! Sekarang: (.+)$/,f:function(m){return '🎉 LEVEL UP! Now: '+tr(m[1]);}},
{re:/^🔥 (\d+) hari$/,f:function(m){return '🔥 '+m[1]+(m[1]==='1'?' day':' days');}},
{re:/^(\d+) hari$/,f:function(m){return m[1]+(m[1]==='1'?' day':' days');}},
{re:/^(\d+% · )(.+)$/,f:function(m){return m[1]+tr(m[2]);}},
{re:/^💬 (.+)$/,f:function(m){return '💬 '+tr(m[1]);}},
{re:/^(\d+) \/ (\d+) tugas · (\d+)%$/,f:function(m){return m[1]+' / '+m[2]+' tasks · '+m[3]+'%';}},
{re:/^🍅 (\d+) sesi fokus · ⏱ (\d+) menit$/,f:function(m){return '🍅 '+m[1]+' focus sessions · ⏱ '+m[2]+' min';}},
{re:/^Lv\.(\d+) · (.+)$/,f:function(m){return 'Lv.'+m[1]+' · '+tr(m[2]);}},
{re:/^(\d+) XP lagi ke Lv\.(\d+)$/,f:function(m){return m[1]+' XP to Lv.'+m[2];}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu), (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+', '+m[2]+' '+MO_EN[idx(MO_ID,m[3])];}},
{re:/^🗓️ (Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu), (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})$/,f:function(m){return '🗓️ '+WD_EN[idx(WD_ID,m[1])]+', '+m[2]+' '+MO_EN[idx(MO_ID,m[3])]+' '+m[4];}},
{re:/^(\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) – (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})$/,f:function(m){return m[1]+' '+MO_EN[idx(MO_ID,m[2])]+' – '+m[3]+' '+MO_EN[idx(MO_ID,m[4])]+' '+m[5];}},
{re:/^👏 Kemarin kamu beresin (\d+) tugas\. Keren!$/,f:function(m){return '👏 Yesterday you finished '+m[1]+' tasks. Nice!';}},
{re:/^🌤️ Kemarin belum ada catatan — hari ini kita mulai!$/,f:function(){return '🌤️ No record yesterday — today we start!';}},
{re:/^🌤️ Hari baru, lembaran baru\. Satu tugas kecil pun berarti!$/,f:function(){return '🌤️ New day, new page. Even one small task matters!';}},
{re:/^(.+) 🤍 \((\d)\/3\)$/,f:function(m){return tr(m[1])+' 🤍 ('+m[2]+'/3)';}},
{re:/^(🍅+)(?: ×(\d+))? \((\d+) sesi\)$/,f:function(m){return m[1]+(m[2]?' ×'+m[2]:'')+' ('+m[3]+' sessions)';}},
{re:/^Total dzikir hari ini: (\d+)$/,f:function(m){return 'Total dhikr today: '+m[1];}},
{re:/^Adzan (.+?)( \(besok\))?$/,f:function(m){return 'Adhan '+(PRAY[m[1]]||m[1])+(m[2]?' (tomorrow)':'');}},
{re:/^(?:(\d+) jam )?(\d+) mnt (\d+) dtk lagi$/,f:function(m){return 'in '+(m[1]?m[1]+'h ':'')+m[2]+'m '+m[3]+'s';}},
{re:/^(.+) · metode Kemenag · koreksi (-?\d+) mnt via ⚙️$/,f:function(m){return tr(m[1])+' · Kemenag method · offset '+m[2]+' min via ⚙️';}},
{re:/^🌙 (\d+) (.+) (\d+) H$/,f:function(m){return '🌙 '+m[1]+' '+(HIJRI[m[2]]||m[2])+' '+m[3]+' AH';}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu) (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) · (\d+) tugas beres · tap untuk rincian$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+' '+m[2]+' '+MO_EN[idx(MO_ID,m[3])]+' · '+m[4]+' tasks done · tap for details';}},
{re:/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu) (\d+)( · beres ✓)?$/,f:function(m){return WD_EN[idx(WD_ID,m[1])]+' '+m[2]+(m[3]?' · done ✓':'');}},
{re:/^📥 (\d+) tugas dibawa ke hari ini\. Semangat!$/,f:function(m){return '📥 '+m[1]+' tasks carried to today. Keep going!';}},
{re:/^🕌 Timer diset sampai adzan (.+)\. Gas!$/,f:function(m){return '🕌 Timer set until adhan '+(PRAY[m[1]]||m[1])+'. Go!';}},
{re:/^Adzan (.+) sebentar lagi — siap-siap sholat 🕌$/,f:function(m){return 'Adhan '+(PRAY[m[1]]||m[1])+' is soon — get ready to pray 🕌';}},
{re:/^⏱️ Timer custom (\d+) menit siap\. Gas!$/,f:function(m){return '⏱️ Custom '+m[1]+'-minute timer ready. Go!';}},
{re:/^Angka diset: (\d+) menit — tap "Pakai" untuk mulai ⏱️$/,f:function(m){return 'Set to '+m[1]+' minutes — tap "Use" to start ⏱️';}},
{re:/^Fokus custom (\d+) menit beres! 💪$/,f:function(m){return 'Custom '+m[1]+'-minute focus done! 💪';}},
{re:/^Halo, (.+)! Ayo nyalakan harimu ✨$/,f:function(m){return 'Hello, '+m[1]+'! Let us light up your day ✨';}},
{re:/^Siap, (.+)! Kita nyala bareng 🔥$/,f:function(m){return 'Ready, '+m[1]+'! We ignite together 🔥';}},
{re:/^Habit "(.+)" beres! 💪$/,f:function(m){return 'Habit "'+m[1]+'" done! 💪';}},
{re:/^Target (.+) tercapai! 📿$/,f:function(m){return 'Target '+m[1]+' reached! 📿';}},
{re:/^Hapus kebiasaan "(.+)"\?$/,f:function(m){return 'Delete habit "'+m[1]+'"?';}},
{re:/^Pulihkan data dari cadangan (.+)\? Data saat ini akan ditimpa\.$/,f:function(m){return 'Restore data from backup '+m[1]+'? Current data will be overwritten.';}},
{re:/^(\d+) \/ (\d+) selesai$/,f:function(m){return m[1]+' / '+m[2]+' done';}},
{re:/^\((\d+:\d+)\) (.+) — NYALA$/,f:function(m){return '('+m[1]+') '+tr(m[2])+' — NYALA';}}
];
var ARABIC=/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
function core(s){return String(s).replace(/\u00a0/g,' ').replace(/^\s+/,'').replace(/\s+$/,'');}
function tr(s){
  if(typeof s!=='string')return s;
  var c=core(s);
  if(!c)return s;
  if(ARABIC.test(c))return s;
  if(Object.prototype.hasOwnProperty.call(MAP,c))return MAP[c];
  for(var i=0;i<PAT.length;i++){var m=c.match(PAT[i].re);if(m)return PAT[i].f(m);}
  return s;
}
window.__nyalaT=function(s,dir){return dir==='en'?tr(s):s;};
window.__nyalaLang=lang;
var origT=new WeakMap(),origA=new WeakMap(),origB=new WeakMap(),applying=false;
var SKIP='.d-chip,[lang="ar"],[dir="rtl"],.arab,.arabic,.latin,.translit,.transliteration,[data-en],.t-text,.h-name,#nameChip,#dayOvList,#dayOvSyukur,.nyala-tools';
function protectedEl(el){return !!(el&&el.closest&&el.closest(SKIP));}
function trText(node,refresh){
  if(applying||protectedEl(node.parentElement))return;
  var cur=node.nodeValue;if(cur==null)return;
  if(refresh||!origT.has(node))origT.set(node,cur);
  var orig=origT.get(node);
  var want=lang==='en'?tr(orig):core(orig);
  var lead=/^\s*/.exec(cur)[0],trail=/\s*$/.exec(cur)[0];
  var out=(lang==='en')?(lead+want+trail):orig;
  if(out!==cur){applying=true;node.nodeValue=out;applying=false;}
}
var ATTRS=['placeholder','title','aria-label'];
function trAttr(el,name,refresh){
  if(applying||protectedEl(el))return;
  var cur=el.getAttribute(name);if(cur==null)return;
  var store=origA.get(el);if(!store){store={};origA.set(el,store);}
  if(refresh||!(name in store))store[name]=cur;
  var out=lang==='en'?tr(store[name]):store[name];
  if(out!==cur){applying=true;el.setAttribute(name,out);applying=false;}
}
function bilingualEl(el){
  if(!el||!el.hasAttribute||!el.hasAttribute('data-en'))return;
  if(!origB.has(el))origB.set(el,el.textContent);
  var want=lang==='en'?el.getAttribute('data-en'):(el.getAttribute('data-id')||origB.get(el));
  if(want!=null&&el.textContent!==want){applying=true;el.textContent=want;applying=false;}
}
function bilingual(root){
  if(!root||!root.querySelectorAll)return;
  bilingualEl(root);
  var list=root.querySelectorAll('[data-en]');
  for(var i=0;i<list.length;i++)bilingualEl(list[i]);
}
function walk(root){
  if(!root)return;
  if(root.nodeType===3){trText(root,false);return;}
  if(root.nodeType!==1&&root.nodeType!==9)return;
  if(root.nodeType===1){
    bilingual(root);
    ATTRS.forEach(function(a){trAttr(root,a,false);});
    if(protectedEl(root))return;
  }
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,null,false);
  var n=w.currentNode;
  while(n){
    if(n.nodeType===3)trText(n,false);
    else if(n.nodeType===1){
      if(n.hasAttribute&&n.hasAttribute('data-en')){bilingual(n);}
      else if(!protectedEl(n))ATTRS.forEach(function(a){trAttr(n,a,false);});
    }
    n=w.nextNode();
  }
}
function applyAll(){walk(document.documentElement);}
var _c=window.confirm,_p=window.prompt;
window.confirm=function(msg){return _c.call(window,lang==='en'?tr(String(msg)):msg);};
window.prompt=function(msg,def){return _p.call(window,lang==='en'?tr(String(msg)):msg,def);};
try{
  var _ft=CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText=function(t,x,y,mw){return _ft.call(this,lang==='en'?tr(String(t)):t,x,y,mw);};
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
var style=document.createElement('style');
style.textContent='[hidden]{display:none!important}.nyala-tools{display:inline-flex;align-items:center;gap:6px;vertical-align:middle}.nyala-lang{display:inline-flex;gap:4px;padding:3px;border:1px solid rgba(212,165,165,.34);border-radius:999px;background:rgba(212,165,165,.10)}.nyala-lang button,.nyala-mute{border:none;background:transparent;color:#c9aeb2;font:800 .72rem/1 "Plus Jakarta Sans",system-ui,sans-serif;padding:6px 11px;border-radius:999px;cursor:pointer;letter-spacing:.6px}.nyala-lang button.on{background:linear-gradient(120deg,#b76e79,#9c5a66);color:#fff;box-shadow:0 0 14px rgba(212,165,165,.35)}.nyala-mute{border:1px solid rgba(212,165,165,.34);background:rgba(212,165,165,.10);font-size:.85rem;padding:6px 10px}.nyala-mute.off{color:#8a6f74}.nyala-tools.floating{position:fixed;top:10px;right:10px;z-index:120;background:rgba(14,12,13,.88);backdrop-filter:blur(8px);padding:6px;border-radius:999px;border:1px solid rgba(212,165,165,.34)}html{scrollbar-color:#b76e79 #171314;scrollbar-width:thin}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:#171314}::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#b76e79,#8f4f5b);border-radius:999px;border:2px solid #171314}::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#d4a5a5,#b76e79)}';
document.head.appendChild(style);
var tools=document.createElement('div');
tools.className='nyala-tools';
var box=document.createElement('div');
box.className='nyala-lang';box.setAttribute('role','group');box.setAttribute('aria-label','Language / Bahasa');
box.innerHTML='<button type="button" data-l="id">ID</button><button type="button" data-l="en">EN</button>';
var mute=document.createElement('button');
mute.type='button';mute.className='nyala-mute';mute.setAttribute('aria-label','Mute / unmute sound');
function paint(){
  box.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.l===lang);b.setAttribute('aria-pressed',b.dataset.l===lang?'true':'false');});
  mute.textContent=muted?'🔕':'🔔';
  mute.classList.toggle('off',muted);
  mute.setAttribute('aria-pressed',muted?'true':'false');
  mute.title=muted?'Sound off — tap to unmute':'Sound on — tap to mute';
}
function setLang(l){
  lang=l;window.__nyalaLang=l;
  try{localStorage.setItem(LS,l);}catch(e){}
  document.documentElement.lang=l==='en'?'en':'id';
  applyAll();paint();
}
box.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&b.dataset.l!==lang)setLang(b.dataset.l);});
mute.addEventListener('click',function(){
  muted=!muted;
  try{localStorage.setItem(LM,muted?'1':'0');}catch(e){}
  paint();
});
tools.appendChild(box);tools.appendChild(mute);
function mount(){
  var host=document.querySelector('.top-in');
  if(host){host.appendChild(tools);}else{tools.classList.add('floating');document.body.appendChild(tools);}
  paint();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){mount();applyAll();});}
else{mount();applyAll();}
var mo=new MutationObserver(function(muts){
  if(applying)return;
  muts.forEach(function(mu){
    if(mu.type==='characterData'){trText(mu.target,true);}
    else if(mu.type==='attributes'){trAttr(mu.target,mu.attributeName,true);}
    else if(mu.type==='childList'){mu.addedNodes.forEach(function(nd){if(nd.nodeType===3)trText(nd,true);else if(nd.nodeType===1)walk(nd);});}
  });
});
mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
})();
