/* nyala-i18n.js — NYALA ID⇄EN (self-contained: UI + Dzikir + Doa + Prophet's salutation) */
(function(){
'use strict';
if(window.__nyalaI18nLoaded)return;
window.__nyalaI18nLoaded=true;

var LANG='nyala_lang';
var SAW='صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ';
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
function $(i){return document.getElementById(i);}

var EXACT={
"Produktif Anti-Mager":"Productive Anti-Lazy",
"DZIKIR PAGI & PETANG":"MORNING & EVENING DHIKR",
"TAMAN QUR'AN":"QUR'AN GARDEN",
"Hari Ini":"Today","Tugas":"Tasks","Fokus":"Focus","Spiritual":"Spiritual","Kebiasaan":"Habits",
"Kebun":"Garden","Roda":"Wheel","Laporan":"Report","📿 Dzikir":"📿 Dhikr","🕌 Qur'an":"🕌 Qur'an","← NYALA":"← NYALA",
"SELAMAT PAGI ☀️":"GOOD MORNING ☀️","SELAMAT SIANG 🌤️":"GOOD AFTERNOON 🌤️","SELAMAT SORE 🌇":"GOOD EVENING 🌇","SELAMAT MALAM 🌙":"GOOD NIGHT 🌙",
"paling kecil":"smallest","sekarang":"now","Nggak mood?":"Not in the mood?",". Lagi ambis?":". Feeling ambitious?",
"Kilat 2 menit":"2-min blitz","Deep Focus 50/90 menit":"Deep Focus 50/90 min",
"🔋 Baterai semangat":"🔋 Motivation battery","⚡ Gas 2 Menit":"⚡ 2-Min Blitz","🎲 Bingung mulai?":"🎲 Not sure where to start?","🌱 Intip Kebunku":"🌱 Peek my Garden",
"📋 Skor Hari Ini":"📋 Today's Score","beres hari ini":"done today",
"🌸 3 Hal yang Disyukuri Hari Ini":"🌸 3 Things to Be Grateful for Today",
"🗓️ Jejak 14 hari terakhir":"🗓️ Last 14 days trail","(tap tanggal untuk rincian)":"(tap a date for details)",
"01 · MISI HARIAN":"01 · DAILY MISSION","Papan Tugas Anti-Mager":"Anti-Lazy Task Board",
"02 · MODE FOKUS":"02 · FOCUS MODE","Timer Nyalakan Fokus":"Light-Up Focus Timer","Pilih ritmemu 🎧":"Pick your rhythm 🎧",
"03 · SPIRITUAL CORNER":"03 · SPIRITUAL CORNER","Produktif Dunia, Tenang Ibadah":"Productive in Life, Calm in Worship",
"04 · RITUAL HARIAN":"04 · DAILY RITUAL","Pelacak Kebiasaan":"Habit Tracker",
"05 · BUKTI PROGRES":"05 · PROOF OF PROGRESS","Kebun Nyalamu":"Your Light-Up Garden",
"06 · ANTI BINGUNG":"06 · ANTI-OVERWHELM","Roda Semangat":"Motivation Wheel","Putar rodanya 🎰":"Spin the wheel 🎰",
"07 · LAPORAN MINGGUAN":"07 · WEEKLY REPORT","Sepekan Barakahku":"My Barakah Week",
"+ Tambah":"+ Add","⭐ Prioritas":"⭐ Priority","Papan masih kosong nih…":"The board is still empty…",
"🍅 Fokus 25":"🍅 Focus 25","⚡ Kilat 2":"⚡ Blitz 2","🌿 Rehat 5":"🌿 Break 5","🔥 Deep 50":"🔥 Deep 50","🚀 Deep 90":"🚀 Deep 90",
"⏱️ Atur:":"⏱️ Set:","Pakai":"Use","▶ Mulai":"▶ Start","▶ Lanjut":"▶ Resume","⏸ Jeda":"⏸ Pause","↺ Ulang":"↺ Reset",
"Koleksi hari ini:":"Today's collection:","belum ada — ayo mulai!":"none yet — let's go!",
"Fokus":"Focus","Kilat":"Blitz","Rehat":"Break",
"🕌 Fokus Sampai Adzan":"🕌 Focus Until Adhan","📿 Tasbih Digital":"📿 Digital Tasbih",
"➕ Kebiasaan baru:":"➕ New habit:","Tambah Kebiasaan":"Add Habit","Tandai Beres Hari Ini":"Mark Done Today","✔ Hari ini beres!":"✔ Done today!",
"🎡 PUTAR SEKARANG":"🎡 SPIN NOW","GAS!":"GO!","✅ Jadikan tugas":"✅ Make it a task",
"📸 Unduh Gambar":"📸 Download Image","📤 Share ke Story":"📤 Share to Story","🔀 Kocok semangat lagi":"🔀 Shuffle motivation",
"💾 Cadangkan data":"💾 Back up data","📂 Pulihkan data":"📂 Restore data","Mulai ulang dari nol (hapus semua data)":"Start from zero (delete all data)",
"TUGAS SELESAI SEPANJANG MASA":"TASKS DONE ALL-TIME","MENIT FOKUS TERKUMPUL":"FOCUS MINUTES COLLECTED","HARI BERUNTUN CHECK-IN":"CONSECUTIVE CHECK-IN DAYS",
"✅ TUGAS BERES":"✅ TASKS DONE","⏱️ MENIT FOKUS":"⏱️ FOCUS MINUTES","🌿 HABIT TERCEKLIS":"🌿 HABITS CHECKED","📿 DZIKIR":"📿 DHIKR",
"TUGAS BERES":"TASKS DONE","MENIT FOKUS":"FOCUS MINUTES","HABIT TERCEKLIS":"HABITS CHECKED","DZIKIR":"DHIKR","PROGRESS HARIAN (%)":"DAILY PROGRESS (%)",
"A · BACA & DENGAR":"A · READ & LISTEN","Mushaf Digital 114 Surah / 30 Juz":"Digital Mushaf · 114 Surahs / 30 Juz",
"Per Surah":"Per Surah","Per Juz":"Per Juz","📖 Baca Sendiri":"📖 Read Alone","🎧 Baca Bareng":"🎧 Recite Along",
"▶ Murottal Surah":"▶ Surah Murottal","▶ Mulai Baca Bareng":"▶ Start Reciting Along","⏹ Berhenti":"⏹ Stop","▶ dengar":"▶ listen",
"B · AYAT UNTUK HATIMU":"B · VERSES FOR YOUR HEART","Sedang Merasa Apa?":"How Are You Feeling?",
"😢 Sedih":"😢 Sad","😰 Cemas":"😰 Anxious","🥰 Bersyukur":"🥰 Grateful","🌾 Butuh Sabar":"🌾 Need Patience",
"💼 Memohon Rezeki":"💼 Seeking Provision","🌙 Merasa Sendiri":"🌙 Feeling Alone","🤍 Meminta Ampun":"🤍 Seeking Forgiveness","🛡️ Ingin Terlindungi":"🛡️ Wanting Protection",
"C · TRACKER HAFALAN":"C · MEMORIZATION TRACKER","Perjalanan Huffaz-mu 🏆":"Your Huffaz Journey 🏆",
"Belum":"Not yet","Proses":"In progress","Hafal":"Memorized",
"D · DOA-DOA":"D · SUPPLICATIONS","Doa Sehari-hari, Nabi & Masa Kini":"Everyday, Prophetic & Modern Duas",
"🌤️ Sehari-hari":"🌤️ Everyday","🕌 Doa Para Nabi":"🕌 Prophetic Duas","🕰️ Masa Kini":"🕰️ Modern",
"🌅 Pagi":"🌅 Morning","🌇 Petang":"🌇 Evening",
"🔄 Memuat…":"🔄 Loading…","📦 Memuat data…":"📦 Loading data…","📥 Mengunduh data…":"📥 Downloading data…","Menghitung…":"Calculating…",
"Subuh":"Fajr","Dzuhur":"Dhuhr","Ashr":"Asr","Maghrib":"Maghrib","Isya":"Isha","Madaniyah":"Medinan","Makkiyah":"Meccan",
"🌐 Auto (dari lokasiku)":"🌐 Auto (from my location)","📍 Otomatis (GPS saya)":"📍 Automatic (my GPS)","📍 Lokasimu (GPS)":"📍 Your location (GPS)",
"Jumhur (Syafi‘i/Maliki/Hanbali)":"Majority (Shafi'i/Maliki/Hanbali)","Jumhur":"Majority","Hanafi":"Hanafi",
"Muslim World League (Eropa/Afrika/Asia umum)":"Muslim World League (Europe/Africa/General Asia)",
"ISNA (Amerika Utara)":"ISNA (North America)","Egyptian GA (Mesir/Sudan/Levant)":"Egyptian GA (Egypt/Sudan/Levant)",
"Umm al-Qura (Arab Saudi)":"Umm al-Qura (Saudi Arabia)","Diyanet (Turki/Balkan/Rusia/Asia Tengah)":"Diyanet (Turkey/Balkans/Russia/Central Asia)",
"Kemenag RI / MUIS SG / JAKIM MY":"Kemenag ID / MUIS SG / JAKIM MY",
"Kaum Rebahan 🛋️":"Couch Crew 🛋️","Mulai Geliat 🥱":"Starting to Stir 🥱","Pemanasan ☕":"Warming Up ☕","Mode Gas ⚡":"Gas Mode ⚡",
"Pejuang Fokus 🔥":"Focus Fighter 🔥","Pendekar Produktif ⚔️":"Productivity Warrior ⚔️","Master Anti-Mager 👑":"Anti-Lazy Master 👑",
"Mode mager terdeteksi":"Lazy mode detected","Mode hemat energi":"Energy-saver mode","Mode stabil":"Stable mode","Mode cerah":"Sunny mode","Mode turbo!":"Turbo mode!",
"MANTRA NYALA":"NYALA MANTRA","PERIBAHASA INDONESIA":"INDONESIAN PROVERB","TIM NYALA":"NYALA TEAM","LEVEL MAKSIMAL! 👑":"MAX LEVEL! 👑",
"Selamat datang di NYALA":"Welcome to NYALA","Mulai Nyala 🔥":"Start Lighting Up 🔥","Lewati dulu":"Skip for now",
"📥 Bawa tugas belum selesai ke hari ini":"📥 Carry unfinished tasks to today",
"Kolaborasi:":"Collaboration:","Waktu utama:":"Prime time:","Lisensi:":"License:","Indonesia":"Indonesia","English":"English",
"💧 Minum segelas air":"💧 Drink a glass of water","🧹 Rapikan meja 2 menit":"🧹 Tidy desk for 2 min","📖 Baca 1 halaman buku":"📖 Read 1 page",
"💬 Balas 1 chat tertunda":"💬 Reply to 1 pending chat","🙆 Stretching ringan":"🙆 Light stretching",
"Minum segelas air":"Drink a glass of water","Rapikan meja 2 menit":"Tidy desk for 2 min","Baca 1 halaman buku":"Read 1 page",
"Balas 1 chat tertunda":"Reply to 1 pending chat","Stretching ringan":"Light stretching",
"Push-up / squat 5 kali":"Push-up / squat 5 times","Tulis 3 hal yang kamu syukuri":"Write 3 things you're grateful for",
"Stretching leher & bahu 1 menit":"Neck & shoulder stretch 1 min","Kirim pesan semangat ke 1 teman":"Send an encouraging message to 1 friend",
"Napas 4-7-8 tiga putaran":"4-7-8 breathing, three rounds",
"Rb":"Wed","Km":"Thu","Jm":"Fri","Sb":"Sat","Mg":"Sun","Sn":"Mon","Sl":"Tue",
"Senin":"Monday","Selasa":"Tuesday","Rabu":"Wednesday","Kamis":"Thursday","Jumat":"Friday","Sabtu":"Saturday","Minggu":"Sunday",
"Jan":"Jan","Feb":"Feb","Mar":"Mar","Apr":"Apr","Mei":"May","Jun":"Jun","Jul":"Jul","Agu":"Aug","Sep":"Sep","Okt":"Oct","Nov":"Nov","Des":"Dec"
};

var PHRASES=[
["Matahari udah start duluan. Yuk mulai pelan-pelan 🌅","The sun already started. Let's begin slowly 🌅"],
["Energi masih ada — gas tipis-tipis aja ☀️","Energy is still there — just go gently ☀️"],
["Sore gini enak buat beresin satu hal kecil 🍵","Evenings like this are perfect for finishing one small thing 🍵"],
["Malam bukan alasan mager. Satu langkah kecil cukup 🌙","Night is no excuse to laze. One small step is enough 🌙"],
["Cek dulu: gimana energimu sekarang?","First, how's your energy right now?"],
["Satu langkah kecil hari ini.","One small step today."],
["Mode hemat energi: pilih satu hal yang paling ringan 🪫","Energy-saver mode: pick the lightest task 🪫"],
["Nggak apa-apa, kita curi start 2 menit aja — sisanya bonus 🐢","It's okay, let's steal a 2-minute start — the rest is bonus 🐢"],
["Rebahan boleh, tapi sambil nunggu timer kilat ya 😉","Lounging is fine, but while the blitz timer runs 😉"],
["Gerak dikiiit aja dulu. Mood biasanya nyusul belakangan 🐌","Move just a tiny bit first. Mood usually follows 🐌"],
["Kamu tetap keren walau pelan. Istirahat juga bagian dari progres 🤍","You're still awesome even slowly. Rest is part of progress 🤍"],
["Rehat 5 menit dulu, lanjut kalau sudah siap 🌿","Take a 5-minute break, continue when ready 🌿"],
["Mulai dari yang 2 menit aja. Pelan tapi jalan 👌","Start with just 2 minutes. Slow but moving 👌"],
["Satu langkah kecil > seribu niat. Yuk mulai?","One small step > a thousand intentions. Shall we?"],
["Pemanasan dulu: pilih satu tugas termudah ☕","Warm up first: pick the easiest task ☕"],
["Mood bagus = waktu emas. Gas satu prioritas! ✨","Good mood = golden time. Hit one priority! ✨"],
["Senyum dulu, lalu hajar satu tugas kecil 😄","Smile first, then tackle one small task 😄"],
["Energi positifmu pas banget buat fokus sebentar 🌈","Your positive energy is perfect for a short focus 🌈"],
["Wah, energi penuh! Sikat tugas paling susah dulu 🔥","Wow, full energy! Tackle the hardest task first 🔥"],
["Gas sekarang mumpung lagi on fire! ⚡","Go now while you're on fire! ⚡"],
["Kamu lagi mode turbo — jangan lupa minum air ya 😄","You're in turbo mode — don't forget to drink water 😄"],
["Rahasianya: mulai dari yang ","The trick: start with the "],
[". Centang satu, dapat XP + konfeti. Serius. ",". Tick one, earn XP + confetti. Seriously. "],
["⭐ = prioritas selalu di atas · ▲▼ atau tahan ⠿ lalu seret = atur urutan · tap teks tugas = edit typo ✏️.","⭐ = priority always on top · ▲▼ or hold ⠿ and drag = reorder · tap task text = edit typo ✏️."],
["Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!","Tap a suggestion above, or write your own. Start small!"],
[" — atau atur sendiri menitnya (tap angka ⏱️ untuk ketik bebas, mis. 23). XP sampai +100! 🚀 Timer tetap jalan walau aplikasi diminimkan."," — or set your own minutes (tap the ⏱️ number to type freely, e.g. 23). Up to +100 XP! 🚀 Timer keeps running even when the app is minimized."],
["Selesai satu sesi = ","Finish one session = "],
[" (Deep Focus sampai "," (Deep Focus up to "],
[") dan tomat 🍅 masuk koleksi.",") and a tomato 🍅 joins your collection."],
["Kerjaan jalan, sholat tetap nomor satu. Murottal tetap mengalun walau kamu pindah menu. 🕌","Work goes on, prayer stays number one. Murottal keeps flowing even when you switch menus. 🕌"],
["Target dzikir harianmu — tap lingkaran untuk berdzikir.","Your daily dhikr target — tap the circle to count."],
["Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!","Small habits repeated = big change. Check today off, +10 XP per habit!"],
["Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun 🌸","Every finished task grows a new plant. The more you do, the lusher it gets 🌸"],
["Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!","Mind blank? Let the wheel choose. Spin, then go without thinking!"],
["Apa pun hasilnya, kerjakan ","Whatever it lands on, do "],
[" — maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti."," — max 2 minutes. No overthinking, no later."],
["Kerjakan sekarang, maksimal 2 menit ⏱️","Do it now, max 2 minutes ⏱️"],
["Rekap otomatis 7 hari terakhir — unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular!","Auto recap of the last 7 days — download as a 9:16 image, post to IG Story / WA Status, and spread the motivation!"],
["Gambar 9:16 dengan branding NYALA — siap tempel ke IG Story / Status WA.","9:16 image with NYALA branding — ready to post to IG Story / WA Status."],
["Dibuat dengan ","Made with "],
[" biar kamu nggak mager lagi."," so you never laze again."],
["Semua datamu tersimpan aman di perangkat ini — tanpa akun, tanpa ribet.","All your data is stored safely on this device — no account, no hassle."],
["Angka besar = tanggal · lencana emas = jumlah tugas beres hari itu.","Big number = date · gold badge = tasks done that day."],
["Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu. 🤍","Write 3 small things you're grateful for today — saved automatically on your phone. 🤍"],
["🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!","🌸 MashaAllah, today's gratitude is complete. May it become a beautiful habit!"],
["Kemarin belum ada catatan — hari ini kita mulai!","No record yesterday — let's start today!"],
["Hari baru, lembaran baru. Satu tugas kecil pun berarti!","New day, fresh page. Even one small task counts!"],
["Tidak ada tugas tercatat hari itu.","No tasks recorded that day."],
["🌸 Syukur hari itu:","🌸 Gratitude that day:"],
["Sebelum mulai, siapa nama panggilanmu?","Before we start, what should we call you?"],
["Baca sendiri atau baca bareng murottal. 📖","Read alone or recite along with murottal. 📖"],
["Pilih keadaanmu — Allah sudah menyiapkan ayatnya untukmu. 🤍","Pick your state — Allah has prepared verses for you. 🤍"],
["Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = ","Tap a surah: grey = not yet, pink = in progress, gold = memorized. Marking memorized = "],
["Lengkap dengan teks Arab, latin, arti, ","Complete with Arabic text, transliteration, meaning, "],
["nya. 🤲","s. 🤲"],
["Dzikir pagi setelah Subuh hingga terbit matahari; dzikir petang setelah Ashar hingga terbenam (boleh selepas Maghrib). Tap lingkaran hitungan sesuai jumlah anjuran. 🤍","Morning dhikr after Fajr until sunrise; evening dhikr after Asr until sunset (allowed after Maghrib). Tap the counter circle the recommended number of times. 🤍"],
["Teks Arab (Al-Qur'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.","Arabic text (Qur'an & Hadith) = public domain. Transliteration & Indonesian translation = original work of this app, released CC0 / public domain for unrestricted use by the ummah."],
["Dihitung otomatis di perangkat (metode Kemenag: Subuh 20°, Isya 18°).","Calculated automatically on-device (Kemenag method: Fajr 20°, Isha 18°)."],
["📦 114 surah siap ✅ (dari cache HP)","📦 114 surahs ready ✅ (from phone cache)"],
["📦 114 surah siap ✅ (tersimpan di HP)","📦 114 surahs ready ✅ (saved on phone)"],
["⚠️ Gagal memuat. Pastikan terhubung internet.","⚠️ Failed to load. Make sure you're online."],
["✅ Data Qur'an termuat!","✅ Qur'an data loaded!"],
["⚠️ Gagal memuat data. Pastikan terhubung internet.","⚠️ Failed to load data. Make sure you're online."],
["🎧 Mode baca bareng aktif","🎧 Recite-along mode on"],
["Sesi berhenti 🌿","Session stopped 🌿"],
["Muat dulu ayatnya ya 😊","Load the verses first 😊"],
["🎧 Baca bareng dimulai…","🎧 Reciting along started…"],
["Muroja'ah selesai! 🌹","Revision complete! 🌹"],
["Data Qur'an belum termuat 😔","Qur'an data not loaded yet 😔"],
["Data surah belum ada 😔","Surah data not available 😔"],
["🎧 Memutar murottal…","🎧 Playing murottal…"],
["✅ Murottal surah selesai 🌹","✅ Surah murottal finished 🌹"],
["Audio tidak tersedia 😔","Audio unavailable 😔"],
["Data belum termuat. Buka saat terhubung internet dulu ya 🙏","Data not loaded. Open while connected to the internet first 🙏"],
["Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.","In the name of Allah, the Most Gracious, the Most Merciful."],
["✨ Manfaat: ","✨ Benefit: "],
["📚 Sumber: ","📚 Source: "],
["📚 HR. ","📚 Narrated by: "],
[" (sahih)"," (authentic)"],
[" (hasan)"," (good)"],
["(hasan, Al-Albani)","(good, Al-Albani)"],
["🔕 Suara efek dimatikan.","🔕 Sound effects muted."],
["🔔 Suara efek dinyalakan.","🔔 Sound effects unmuted."],
["🎧 Murottal tetap mengalun di latar belakang.","🎧 Murottal keeps playing in the background."],
["⏹ Murottal dihentikan.","⏹ Murottal stopped."],
["⭐ Ditandai prioritas — naik ke atas!","⭐ Marked priority — moved to top!"],
["Prioritas dilepas","Priority removed"],
["⭐ Tugas prioritas selalu di kelompok atas","⭐ Priority tasks always stay in the top group"],
["🔀 Urutan tugas diperbarui","🔀 Task order updated"],
["✏️ Tugas diperbarui","✏️ Task updated"],
["Tugas tidak boleh kosong 😅","Task can't be empty 😅"],
["Tulis dulu tugasnya ya ✍️","Write the task first ✍️"],
["Tulis tugasnya dulu, lalu tandai ⭐","Write the task first, then mark ⭐"],
["Misi roda masuk ke papan! Gas! 🚀","Wheel mission added to board! Go! 🚀"],
["Ditambahkan! Sekarang gas kerjakan 🚀","Added! Now go do it 🚀"],
["⚡ Mode kilat nyala! 2 menit aja, janji.","⚡ Blitz mode on! Just 2 minutes, promise."],
["Rehat selesai. Segar? Lanjut gas!","Break over. Refreshed? Keep going!"],
["Jeda dulu, tarik napas 🌬️","Pause first, take a breath 🌬️"],
["Timer diulang ↺","Timer reset ↺"],
["⏱️ Timer-mu masih jalan dari tadi — semangat!","⏱️ Your timer is still running from earlier — keep going!"],
["Fokus sampai adzan tuntas! Waktunya sholat 🕌","Focus until adhan complete! Time to pray 🕌"],
["Mode kilat 2 menit beres! ⚡","2-minute blitz complete! ⚡"],
["Deep Focus 50 menit tuntas! Ambis! 🚀","Deep Focus 50 min complete! Ambitious! 🚀"],
["Deep Focus 90 menit tuntas! LEGENDARIS! 🚀","Deep Focus 90 min complete! LEGENDARY! 🚀"],
["Satu sesi fokus tuntas! 🍅","One focus session complete! 🍅"],
["Kebiasaan baru ditanam! 🌱","New habit planted! 🌱"],
["Isi dulu nama kebiasaannya ✍️","Fill the habit name first ✍️"],
["Prioritas beres! 🌟","Priority done! 🌟"],
["Satu tugas tumbang!","One task down!"],
["Check-in mood dulu ☺️","Mood check-in first ☺️"],
["Syukur hari ini lengkap 🌸","Today's gratitude complete 🌸"],
["Mantap! ✨","Awesome! ✨"],
["Hari konsisten: ≥70% tugas beres! 🔥","Consistent day: ≥70% tasks done! 🔥"],
["Lokasi terdeteksi! Jadwal & metode disesuaikan 📍","Location detected! Schedule & method adjusted 📍"],
["GPS ditolak — pilih kota manual ya 🙏","GPS denied — pick a city manually 🙏"],
["Jadwal & metode dihitung ulang ✅","Schedule & method recalculated ✅"],
["Jadwal dihitung ulang ✅","Schedule recalculated ✅"],
["Data dipulihkan! Memuat ulang… 📂","Data restored! Reloading… 📂"],
["File cadangan tidak valid 😔","Invalid backup file 😔"],
["Gagal membaca file cadangan 😔","Failed to read backup file 😔"],
["Gagal membuat cadangan 😔","Failed to create backup 😔"],
["Cadangan terunduh! Simpan file-nya di tempat aman 💾","Backup downloaded! Store the file somewhere safe 💾"],
["Tips: cadangkan datamu lewat tombol di bawah halaman ya.","Tip: back up your data via the button at the bottom of the page."],
["Gambar tersimpan! Tinggal upload ke IG Story 📸","Image saved! Just upload to IG Story 📸"],
["Gagal membuat gambar 😔","Failed to create image 😔"],
["Yakin mau menghapus SEMUA data NYALA di perangkat ini?","Sure you want to delete ALL NYALA data on this device?"],
["Beneran yakin? Streak dan XP-mu akan hilang 😢","Really sure? Your streak and XP will be gone 😢"],
["? Data saat ini akan ditimpa.","? Current data will be overwritten."],
["Dibuat dengan NYALA — produktif pelan-pelan","Made with NYALA — productive, slowly but surely"],
["Laporan produktivitas pekan ini","This week's productivity report"],
["NYALA — Sepekan Barakahku","NYALA — My Barakah Week"],
["1. Contoh: hujan reda tepat sebelum berangkat…","1. Example: the rain stopped right before leaving…"],
["2. Contoh: ada teman yang menyapa dulu…","2. Example: a friend greeted me first…"],
["3. Contoh: tubuhku kuat puasa hari ini…","3. Example: my body stayed strong fasting today…"],
["Tulis satu hal kecil… (misal: balas 1 email)","Write one small thing… (e.g. reply to 1 email)"],
["misal: Tilawah 1 halaman","e.g. Read 1 page"],
["Ketik namamu di sini…","Type your name here…"],
["Klik untuk ganti nama","Click to rename"],
["Suara nyala — tap untuk matikan","Sound on — tap to mute"],
["Suara mati — tap untuk nyalakan","Sound off — tap to unmute"],
["Streak check-in harianmu","Your daily check-in streak"],
["Tahan & seret untuk menggeser urutan","Hold & drag to reorder"],
["Tap untuk memperbaiki typo / mengedit tugas ✏️","Tap to fix a typo / edit task ✏️"],
["Tap untuk ketik angka persis, mis. 23","Tap to type exact minutes, e.g. 23"],
["Kurangi 1 menit","Minus 1 minute"],
["Tambah 1 menit","Plus 1 minute"],
["Pilih kota atau GPS","Choose city or GPS"],
["Hitung ulang jadwal","Recalculate schedule"],
["Koreksi menit jadwal adzan","Adjust adhan minutes"],
['"Mulai aja dulu. Sempurnanya sambil jalan."','"Just start. Perfect it along the way."'],
['"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat."','"You don\'t have to be great to start, but you have to start to be great."'],
['"Sedikit demi sedikit, lama-lama jadi bukit."','"Little by little, eventually it becomes a mountain."'],
['"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak."','"Discipline is choosing between what you want now and what you want most."'],
['"Rahasia untuk maju adalah memulai."','"The secret of getting ahead is getting started."'],
['"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak."','"Life is like riding a bicycle. To keep balance, you must keep moving."'],
['"Perjalanan seribu mil dimulai dari satu langkah."','"A journey of a thousand miles begins with a single step."'],
['"Fokus pada progres, bukan kesempurnaan."','"Focus on progress, not perfection."'],
['"Mager itu wajar. Menyerah itu pilihan — dan kamu nggak harus milih itu."','"Feeling lazy is normal. Giving up is a choice — and you don\'t have to make it."'],
['"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood."','"Productive people aren\'t always motivated; they keep going even when they\'re not."'],
['"Yang berat itu bukan pekerjaannya, tapi memulainya."','"The hard part isn\'t the work — it\'s starting."']
];
PHRASES.sort(function(a,b){return b[0].length-a[0].length;});

var DZ=[
{t:"Ayat al-Kursi",m:"Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth… His Kursi extends over the heavens and the earth, and He is the Most High, the Most Great."},
{t:"Al-Ikhlas, Al-Falaq & An-Nas",m:"The three surahs of protection (Al-Ikhlas, Al-Falaq, An-Nas). Reciting them three times in the morning and evening suffices you against everything."},
{t:"Opening: All Sovereignty Belongs to Allah",mp:"We enter the morning and all sovereignty belongs to Allah… My Lord, I ask You for the good of this day and the good that follows it, and I seek refuge in You from its evil.",me:"We enter the evening and all sovereignty belongs to Allah… My Lord, I ask You for the good of this night and the good that follows it, and I seek refuge in You from its evil."},
{t:"Sayyidul Istighfar (The Master of Seeking Forgiveness)",m:"O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant… I acknowledge Your favour upon me and I acknowledge my sin, so forgive me — for none forgives sins but You."},
{t:"Surrendering Oneself to Allah",mp:"O Allah, by You we enter the morning and the evening; by You we live and by You we die, and to You is the resurrection.",me:"O Allah, by You we enter the evening and the morning; by You we live and by You we die, and to You is the final destination."},
{t:"Testimony of Tawhid",mp:"O Allah, this morning I call You to witness — and the bearers of Your Throne, Your angels, and all of Your creation — that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger.",me:"O Allah, this evening I call You to witness — and the bearers of Your Throne, Your angels, and all of Your creation — that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger."},
{t:"Seeking Wellbeing",m:"O Allah, grant wellbeing to my body; O Allah, grant wellbeing to my hearing; O Allah, grant wellbeing to my sight. There is no deity but You."},
{t:"Allah Is Sufficient",m:"Allah is sufficient for me; there is no deity but Him. Upon Him I place my trust, and He is the Lord of the Mighty Throne."},
{t:"Protection from Harm",m:"In the name of Allah, with whose name nothing on earth or in heaven can cause harm; and He is the All-Hearing, the All-Knowing."},
{t:"Contentment with Allah",m:"I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad {S} as my Prophet."},
{t:"Seeking Allah's Help",m:"O Ever-Living, O Sustainer of all, by Your mercy I seek help. Set all my affairs right, and do not leave me to myself even for the blink of an eye."},
{t:"Salawat upon the Prophet {S}",m:"O Allah, send blessings and peace upon our Prophet Muhammad {S}. (10 times morning and evening = attaining his intercession)"},
{t:"Tasbih 100 Times",m:"Glory be to Allah and praise be to Him. (100 times erases faults and brings good)"},
{t:"Tawhid 10 Times",m:"There is no deity except Allah alone, without partner. His is the dominion and His is the praise, and He is over all things competent."},
{t:"Tasbih by the Weight of the Throne (morning only)",m:"Glory be to Allah and praise be to Him — as many as His creation, as pleases Him, as heavy as His Throne, and as endless as the ink of His words."},
{t:"Seeking Knowledge & Provision (morning only)",m:"O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted."},
{t:"Istighfar 100 Times (daily)",m:"I seek Allah's forgiveness and turn to Him in repentance. (100 times a day wipes away sins even as numerous as the foam of the sea)"}
];
var DZE=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,16];

var HARIAN=[
{t:"🍽️ Before Eating",m:"In the name of Allah. O Allah, bless our provision and protect us from the fire of Hell.",b:"Brings blessing to the food and keeps shaytan away from our provision."},
{t:"🍽️ After Eating",m:"All praise is due to Allah who fed us and gave us drink and made us Muslims.",b:"A means for sins to be forgiven and for gratitude to grow."},
{t:"🌙 Before Sleep",m:"In Your name, O Allah, I live and in Your name I die.",b:"Protection during sleep; if one passes away, it is upon the fitrah."},
{t:"🌅 Waking Up",m:"All praise is due to Allah who gave us life after taking it from us, and to Him is the resurrection.",b:"Opens the day with gratitude and remembrance of the resurrection."},
{t:"🚪 Entering the Bathroom",m:"O Allah, I seek refuge in You from the male and female devils.",b:"A barrier between the gaze of the jinn and our awrah."},
{t:"🚪 Leaving the Bathroom",m:"O Allah, I seek Your forgiveness. All praise is due to Allah who has removed discomfort from me and restored my health.",b:"Teaches istighfar alongside gratitude for health after relieving oneself."},
{t:"💧 After Wudu",m:"I bear witness that there is no deity but Allah alone, without partner, and that Muhammad {S} is His servant and messenger.",b:"Eight gates of Paradise are opened for him to choose from."},
{t:"🏠 Entering the Home",m:"In the name of Allah we enter and in the name of Allah we leave, and upon Allah we place our trust.",b:"The home is blessed and the heart is anchored in reliance."},
{t:"🚶 Leaving the Home",m:"In the name of Allah, I place my trust in Allah; there is no might and no power except with Allah.",b:"Guaranteed guidance, protection, and sufficiency from Allah."},
{t:"🕌 Entering the Mosque",m:"O Allah, open for me the gates of Your mercy.",b:"Asking that the gates of mercy be opened upon entering Allah's house."},
{t:"🕌 Leaving the Mosque",m:"O Allah, I ask You of Your bounty.",b:"Seeking Allah's bounty when returning to worldly affairs."},
{t:"📢 Hearing the Adhan",m:"O Allah, Lord of this perfect call and the prayer to be established, grant Muhammad {S} al-Wasilah and excellence, and raise him to the praiseworthy station You have promised him.",b:"Whoever says this after the adhan earns the right to the Prophet's {S} intercession on the Day of Judgment."},
{t:"👨 For Both Parents",m:"My Lord, forgive me and my parents, and have mercy upon them as they raised me when I was small.",b:"A form of honoring parents; the prayer of a righteous child whose reward never ceases."},
{t:"🌧️ When It Rains",m:"O Allah, send beneficial rain.",b:"Turns the rain into a beneficial mercy."},
{t:"😤 When Angry",m:"I seek refuge in Allah from the accursed shaytan.",b:"Quells anger and drives away the whispers of shaytan."},
{t:"🚗 While Traveling",m:"Glory to Him who has subjected this to us, for we could never have done it ourselves; and to our Lord we shall surely return.",b:"Protection in travel and a reminder of the return to Allah."},
{t:"📚 Before Studying",m:"My Lord, increase me in knowledge and grant me understanding.",b:"Opens the heart and mind to receive knowledge; a form of reliance on Allah before studying."}
];
var NABI=[
{t:"🌿 Prophet Adam (QS 7:23)",m:"Our Lord, we have wronged ourselves; and if You do not forgive us and have mercy upon us, we will surely be among the losers.",b:"The most complete opener of the gate of repentance; acknowledging sin while seeking forgiveness and mercy."},
{t:"🐋 Prophet Yunus (QS 21:87)",m:"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",b:"A way out of distress."},
{t:"🏔️ Prophet Musa (QS 20:25–28)",m:"My Lord, expand for me my chest, ease for me my task, and untie the knot from my tongue so that they may understand my speech.",b:"Expansion of the chest, ease of affairs, and fluency in speech — ideal before a presentation, interview, or da'wah."},
{t:"🕋 Prophet Ibrahim (QS 14:40)",m:"My Lord, make me an establisher of prayer, and from my descendants as well. Our Lord, and accept my supplication.",b:"Steadfastness in prayer for oneself and one's lineage."},
{t:"👑 Prophet Sulaiman (QS 27:19)",m:"My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteous deeds that please You.",b:"Trains gratitude for personal and family blessings while seeking enablement for righteous deeds."},
{t:"🤲 Prophet Zakariya (QS 21:89)",m:"My Lord, do not leave me alone, while You are the best of inheritors.",b:"A plea for righteous offspring."},
{t:"💧 Prophet Musa (QS 28:24)",m:"My Lord, indeed I am in need of whatever good You would send down to me.",b:"An opener of the gate of provision."},
{t:"🌹 The Messenger (QS 2:201)",m:"Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",b:"Encompasses the good of this world and the Hereafter."},
{t:"🌊 Prophet Nuh (QS 71:28)",m:"My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and women.",b:"Expansive forgiveness."},
{t:"🤒 Prophet Ayyub (QS 21:83)",m:"Indeed, adversity has touched me, and You are the Most Merciful of the merciful.",b:"The etiquette of complaining to Allah."},
{t:"💞 The Messenger (QS 3:8)",m:"Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself.",b:"A steadier of the heart."},
{t:"🕊️ The Messenger (QS 2:286)",m:"Our Lord, do not take us to task if we forget or err. Our Lord, do not place upon us a burden like that placed upon those before us. Our Lord, do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy upon us. You are our Protector, so grant us victory over the disbelieving people.",b:"Whoever recites the last two verses of Al-Baqarah at night, they will suffice him."}
];
var KINI=[
{t:"🌅 Opener of the Day",m:"O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.",b:"Beginning the day with total surrender to Allah."},
{t:"🧠 Overthinking / Anxiety",m:"Allah is sufficient for us, and He is the best Disposer of affairs.",b:"Calms the heart and entrusts the outcome to Allah."},
{t:"👨‍👩‍👧 Family in the Digital Age",m:"Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.",b:"Family becomes a delight to the eyes and an example of piety."},
{t:"📱 Tempted to Compare Yourself",m:"O Allah, Turner of hearts, keep my heart firm upon Your religion.",b:"Guarding the heart from envy and unrest."},
{t:"🌊 Knowledge of No Benefit",m:"O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that is not humble, and from a soul that is never satisfied.",b:"An inner filter: beneficial knowledge, a humble heart, a content soul."},
{t:"🥹 Gratitude in Joy",m:"All praise is due to Allah by whose favour good deeds are completed.",b:"Perfecting the blessing with gratitude."},
{t:"💳 Tight Finances",m:"O Allah, suffice me with what is lawful so I need not the unlawful, and enrich me by Your bounty so I need none besides You.",b:"Sufficiency through the halal."},
{t:"🎯 Provision, Knowledge & Deeds",m:"O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.",b:"Encompasses the needs of this world and the Hereafter: knowledge, lawful provision, and accepted worship."}
];

function dyn(o){
o=o.replace(/(\d+)\s*\/\s*(\d+)\s+selesai/g,'$1 / $2 done');
o=o.replace(/— Masya Allah, lengkap! 🌹/g,'— MashaAllah, complete! 🌹');
o=o.replace(/— Masya Allah, Khatam Hafizh! 🏆/g,'— MashaAllah, Khatam Hafizh! 🏆');
o=o.replace(/🔥\s*(\d+)\s+hari/g,'🔥 $1 days');
o=o.replace(/(\d+)\s+tugas total/g,'$1 tasks total');
o=o.replace(/(\d+)\s+habit aktif/g,'$1 active habits');
o=o.replace(/(\d+)\s+hari konsisten/g,'$1 consistent days');
o=o.replace(/(\d+)\s+XP lagi ke Lv\.(\d+)/g,'$1 XP to reach Lv.$2');
o=o.replace(/(\d+)\s*\/\s*(\d+)\s+tugas\s*·\s*(\d+)%/g,'$1 / $2 tasks · $3%');
o=o.replace(/🍅\s*(\d+)\s+sesi fokus\s*·\s*⏱\s*(\d+)\s+menit/g,'🍅 $1 focus sessions · ⏱ $2 min');
o=o.replace(/Total dzikir hari ini:\s*(\d+)/g,"Today's dhikr total: $1");
o=o.replace(/Kemarin kamu beresin (\d+) tugas\. Keren!/g,function(m,n){return 'Yesterday you finished '+n+(n==='1'?' task':' tasks')+'. Nice!';});
o=o.replace(/Adzan /g,'Adhan ').replace(/\(besok\)/g,'(tomorrow)');
o=o.replace(/(\d+)\s+jam /g,'$1 h ').replace(/(\d+)\s+mnt /g,'$1 min ').replace(/(\d+)\s+dtk lagi/g,'$1 s left');
o=o.replace(/koreksi (\d+) mnt via/g,'correction $1 min via').replace(/koreksi (\d+) menit/g,'correction $1 min');
o=o.replace(/· metode Kemenag · koreksi /g,'· Kemenag method · correction ');
o=o.replace(/metode Kemenag: Subuh 20°, Isya 18°\./g,'Kemenag method: Fajr 20°, Isha 18°.');
o=o.replace(/Angka diset: (\d+) menit — tap "Pakai" untuk mulai ⏱️/g,'Minutes set: $1 min — tap "Use" to start ⏱️');
o=o.replace(/⏱️ Timer custom (\d+) menit siap\. Gas!/g,'⏱️ Custom timer $1 min ready. Go!');
o=o.replace(/Fokus custom (\d+) menit beres! 💪/g,'Custom focus $1 min done! 💪');
o=o.replace(/Menuju Adzan /g,'Until Adhan ').replace(/Custom · (\d+) mnt/g,'Custom · $1 min');
o=o.replace(/(\d+) \/ 114 surah dihafal/g,'$1 / 114 surahs memorized');
o=o.replace(/(\d+)\s+ayat/g,'$1 verses');
o=o.replace(/📥 (\d+) tugas dibawa ke hari ini\. Semangat!/g,'📥 $1 tasks carried to today. Keep going!');
o=o.replace(/Target (\S+) tercapai! 📿/g,'Target $1 reached! 📿');
o=o.replace(/Habit "(.+)" beres! 💪/g,'Habit "$1" done! 💪');
o=o.replace(/🎉 NAIK LEVEL! Sekarang: /g,'🎉 LEVEL UP! Now: ');
o=o.replace(/XP lagi ke Lv\./g,'XP to reach Lv.');
o=o.replace(/\((\d+) sesi\)/g,'($1 sessions)');
o=o.replace(/Koleksi hari ini:/g,"Today's collection:");
o=o.replace(/belum ada — ayo mulai!/g,"none yet — let's go!");
o=o.replace(/(\d+) menit/g,'$1 min');
return o;
}

var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
var SKIP='.arabic,.doa-ar,.latin,.doa-la,.surah-info .ar,.arti,.doa-id,.doa-m,.doa-t,.dz-title,.haf-cell,#hafTxt,[data-no-i18n],.nyalaHafDate,.nyala-saw,#nyalaLangSel';

function toEN(t){
  if(!t||AR.test(t))return t;
  var s=t.trim();if(!s)return t;
  if(EXACT[s]!=null)return t.replace(s,EXACT[s]);
  var out=t,i;
  for(i=0;i<PHRASES.length;i++){if(out.indexOf(PHRASES[i][0])>-1)out=out.split(PHRASES[i][0]).join(PHRASES[i][1]);}
  return dyn(out);
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function markup(txt){
  return esc(txt).replace(/\{S\}/g,'<span class="nyala-saw">'+SAW+'</span>').replace(/\uFDFA/g,'<span class="nyala-saw">'+SAW+'</span>');
}

var origText=new WeakMap(),origAttr=new WeakMap(),origHTML=new WeakMap();
function prot(n){var e=n.parentElement;while(e&&e!==document.body){if(e.matches&&e.matches(SKIP))return true;e=e.parentElement;}return false;}
function walkText(){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    if(prot(n))return NodeFilter.FILTER_REJECT;
    var p=n.parentElement;
    if(p&&/^(SCRIPT|STYLE|TEXTAREA|INPUT|CANVAS|OPTION)$/.test(p.tagName))return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;}});
  var L=[],n;while((n=w.nextNode()))L.push(n);
  var en=lang()==='en';
  for(var i=0;i<L.length;i++){
    var nd=L[i],cur=nd.nodeValue;if(!cur||!cur.trim())continue;
    if(!origText.has(nd))origText.set(nd,cur);
    var base=origText.get(nd);
    var want=en?toEN(base.replace(/\u00a0/g,' ')):base;
    if(cur!==want)nd.nodeValue=want;
  }
}
function walkAttrs(){
  var en=lang()==='en',els=document.querySelectorAll('[placeholder],[title],[aria-label]');
  for(var i=0;i<els.length;i++){
    var el=els[i];
    if(el.id==='nyalaLangSel'||(el.matches&&el.matches(SKIP)))continue;
    var st=origAttr.get(el);if(!st){st={};origAttr.set(el,st);}
    var keys=['placeholder','title','aria-label'];
    for(var k=0;k<keys.length;k++){
      var key=keys[k],v=el.getAttribute(key);
      if(v==null||AR.test(v))continue;
      if(!(key in st))st[key]=v;
      var want=en?toEN(st[key].replace(/\u00a0/g,' ')):st[key];
      if(v!==want)el.setAttribute(key,want);
    }
  }
}
function setHTML(el,txt){var h=markup(txt);if(el.innerHTML!==h)el.innerHTML=h;}
function paintContent(){
  var en=lang()==='en',i,el,base;
  var box=$('list');
  if(box){
    var per=($('btnPetang')&&$('btnPetang').classList.contains('on'))?'e':'p';
    var order=per==='e'?DZE:null;
    var cards=box.querySelectorAll('.dz');
    for(i=0;i<cards.length;i++){
      var idx=order?order[i]:i,d=DZ[idx];if(!d)continue;
      var ti=cards[i].querySelector('.dz-title'),ar=cards[i].querySelector('.arti');
      if(ti){if(!origHTML.has(ti))origHTML.set(ti,ti.textContent);setHTML(ti,en?d.t:origHTML.get(ti));}
      if(ar){if(!origHTML.has(ar))origHTML.set(ar,ar.textContent);
        base=origHTML.get(ar);
        setHTML(ar,en?(per==='e'?(d.me||d.m):(d.mp||d.m)):base);}
    }
  }
  var db=$('doaList');
  if(db){
    var arr=HARIAN;
    if($('tabNabi')&&$('tabNabi').classList.contains('on'))arr=NABI;
    else if($('tabKini')&&$('tabKini').classList.contains('on'))arr=KINI;
    var dc=db.querySelectorAll('.doa-card');
    for(i=0;i<dc.length;i++){
      var o=arr[i];if(!o)continue;
      var t=dc[i].querySelector('.doa-t'),m=dc[i].querySelector('.doa-id'),b=dc[i].querySelector('.doa-m');
      if(t){if(!origHTML.has(t))origHTML.set(t,t.textContent);setHTML(t,en?o.t:origHTML.get(t));}
      if(m){if(!origHTML.has(m))origHTML.set(m,m.textContent);setHTML(m,en?o.m:origHTML.get(m));}
      if(b){if(!origHTML.has(b))origHTML.set(b,b.textContent);setHTML(b,en?('✨ Benefit: '+o.b):origHTML.get(b));}
    }
  }
}
function fixTitle(){
  var t=document.title;if(!t)return;
  if(!window.__nyalaTitleOrig)window.__nyalaTitleOrig=t;
  var b=window.__nyalaTitleOrig,w=lang()==='en'?toEN(b):b;
  if(t!==w)document.title=w;
}
var pend=false,mo=null;
function run(){
  pend=false;
  document.documentElement.lang=lang()==='en'?'en':'id';
  paintContent();
  walkText();
  walkAttrs();
  fixTitle();
}
function schedule(){if(pend)return;pend=true;requestAnimationFrame(run);}
function apply(){
  run();
  if(mo)mo.disconnect();
  mo=new MutationObserver(function(ms){
    for(var i=0;i<ms.length;i++){
      if(ms[i].type==='characterData'&&origText.has(ms[i].target))continue;
      schedule();return;
    }
    schedule();
  });
  mo.observe(document.body,{childList:true,subtree:true,characterData:true});
  ['list','doaList'].forEach(function(id){
    var e=$(id);if(e&&!e.__nyalaWatched){e.__nyalaWatched=true;new MutationObserver(schedule).observe(e,{childList:true});}
  });
}
function setLang(l){
  try{localStorage.setItem(LANG,l==='en'?'en':'id');}catch(e){}
  var s=$('nyalaLangSel');if(s&&s.value!==lang())s.value=lang();
  apply();
  try{window.dispatchEvent(new CustomEvent('nyala:lang',{detail:lang()}));}catch(e){}
}
function ensureSwitch(){
  var s=$('nyalaLangSel');
  if(!s){
    s=document.createElement('select');s.id='nyalaLangSel';s.className='chip';
    var a=document.querySelector('.chips')||document.querySelector('header .top-in')||document.querySelector('header')||document.body;
    if(a===document.body)s.style.cssText='position:fixed;top:8px;right:8px;z-index:9999;';
    a.appendChild(s);
  }
  s.setAttribute('data-no-i18n','1');
  if(!s.options.length){
    var o1=document.createElement('option');o1.value='id';o1.textContent='🇮🇩 Indonesia';
    var o2=document.createElement('option');o2.value='en';o2.textContent='🇬🇧 English';
    s.appendChild(o1);s.appendChild(o2);
  }
  s.value=lang();
  if(!s.__nyalaBound){s.__nyalaBound=true;s.addEventListener('change',function(){setLang(s.value);});}
  if(!$('nyalaLangStyle')){
    var st=document.createElement('style');st.id='nyalaLangStyle';
    st.textContent='#nyalaLangSel{cursor:pointer;font-weight:700;max-width:160px}'+
      '.nyala-saw{font-family:Amiri,"Noto Naskh Arabic",serif;font-size:1.02em;line-height:2;color:var(--gold,#e5c786)}';
    document.head.appendChild(st);
  }
}
window.NYALA_I18N={lang:lang,set:setLang,refresh:schedule};
setInterval(function(){if(lang()==='en')fixTitle();},1500);
function boot(){ensureSwitch();apply();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
