/* nyala-i18n.js — NYALA ID⇄EN. ES5-friendly. Self-contained: UI + tagline + Dzikir + Doa
   + worldwide cities + native dialogs (prompt/confirm/alert) + welcome card enforcement. */
(function(){
"use strict";

var KEY="nyala_lang";
function lang(){try{return localStorage.getItem(KEY)==="en"?"en":"id";}catch(e){return "id";}}
function put(v){try{localStorage.setItem(KEY,v==="en"?"en":"id");}catch(e){}}
function el(id){return document.getElementById(id);}
var SAW="\u0635\u064E\u0644\u0651\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u0648\u064E\u0633\u064E\u0644\u0651\u064E\u0645\u064E";

/* flat pairs: [id, en, id, en, ...] */
var P=[
"Produktif Anti-Mager","Productive Anti-Lazy",
"DZIKIR PAGI & PETANG","MORNING & EVENING DHIKR",
"TAMAN QUR'AN","QUR'AN GARDEN",
"Hari Ini","Today",
"Tugas","Tasks",
"Fokus","Focus",
"Spiritual","Spiritual",
"Kebiasaan","Habits",
"Kebun","Garden",
"Roda","Wheel",
"Laporan","Report",
"\uD83D\uDCFF Dzikir","\uD83D\uDCFF Dhikr",
"\uD83D\uDD4C Qur'an","\uD83D\uDD4C Qur'an",
"\u2190 NYALA","\u2190 NYALA",
"Hei,","Hey,",
"SELAMAT PAGI \u2600\uFE0F","GOOD MORNING \u2600\uFE0F",
"SELAMAT SIANG \uD83C\uDF24\uFE0F","GOOD AFTERNOON \uD83C\uDF24\uFE0F",
"SELAMAT SORE \uD83C\uDF07","GOOD EVENING \uD83C\uDF07",
"SELAMAT MALAM \uD83C\uDF19","GOOD NIGHT \uD83C\uDF19",
"Matahari udah start duluan. Yuk mulai pelan-pelan \uD83C\uDF05","The sun already started. Let's begin slowly \uD83C\uDF05",
"Energi masih ada \u2014 gas tipis-tipis aja \u2600\uFE0F","Energy is still there \u2014 just go gently \u2600\uFE0F",
"Sore gini enak buat beresin satu hal kecil \uD83C\uDF75","Evenings like this are perfect for finishing one small thing \uD83C\uDF75",
"Malam bukan alasan mager. Satu langkah kecil cukup \uD83C\uDF19","Night is no excuse to laze. One small step is enough \uD83C\uDF19",
"Satu langkah kecil hari ini.","One small step today.",
"Cek dulu: gimana energimu sekarang?","First, how's your energy right now?",
"\uD83D\uDD0B Baterai semangat","\uD83D\uDD0B Motivation battery",
"Mode mager terdeteksi","Lazy mode detected",
"Mode hemat energi","Energy-saver mode",
"Mode stabil","Stable mode",
"Mode cerah","Sunny mode",
"Mode turbo!","Turbo mode!",
"Mode hemat energi: pilih satu hal yang paling ringan \uD83E\uDEAB","Energy-saver mode: pick the lightest task \uD83E\uDEAB",
"Nggak apa-apa, kita curi start 2 menit aja \u2014 sisanya bonus \uD83D\uDC22","It's okay, let's steal a 2-minute start \u2014 the rest is bonus \uD83D\uDC22",
"Rebahan boleh, tapi sambil nunggu timer kilat ya \uD83D\uDE09","Lounging is fine, but while the blitz timer runs \uD83D\uDE09",
"Gerak dikiiit aja dulu. Mood biasanya nyusul belakangan \uD83D\uDC0C","Move just a tiny bit first. Mood usually follows \uD83D\uDC0C",
"Kamu tetap keren walau pelan. Istirahat juga bagian dari progres \uD83E\uDD0D","You're still awesome even slowly. Rest is part of progress \uD83E\uDD0D",
"Rehat 5 menit dulu, lanjut kalau sudah siap \uD83C\uDF3F","Take a 5-minute break, continue when ready \uD83C\uDF3F",
"Mulai dari yang 2 menit aja. Pelan tapi jalan \uD83D\uDC4C","Start with just 2 minutes. Slow but moving \uD83D\uDC4C",
"Satu langkah kecil > seribu niat. Yuk mulai?","One small step > a thousand intentions. Shall we?",
"Pemanasan dulu: pilih satu tugas termudah \u2615","Warm up first: pick the easiest task \u2615",
"Mood bagus = waktu emas. Gas satu prioritas! \u2728","Good mood = golden time. Hit one priority! \u2728",
"Senyum dulu, lalu hajar satu tugas kecil \uD83D\uDE04","Smile first, then tackle one small task \uD83D\uDE04",
"Energi positifmu pas banget buat fokus sebentar \uD83C\uDF08","Your positive energy is perfect for a short focus \uD83C\uDF08",
"Wah, energi penuh! Sikat tugas paling susah dulu \uD83D\uDD25","Wow, full energy! Tackle the hardest task first \uD83D\uDD25",
"Gas sekarang mumpung lagi on fire! \u26A1","Go now while you're on fire! \u26A1",
"Kamu lagi mode turbo \u2014 jangan lupa minum air ya \uD83D\uDE04","You're in turbo mode \u2014 don't forget to drink water \uD83D\uDE04",
"\u26A1 Gas 2 Menit","\u26A1 2-Min Blitz",
"\uD83C\uDFB2 Bingung mulai?","\uD83C\uDFB2 Not sure where to start?",
"\uD83C\uDF31 Intip Kebunku","\uD83C\uDF31 Peek my Garden",
"\uD83D\uDCCB Skor Hari Ini","\uD83D\uDCCB Today's Score",
"beres hari ini","done today",
"Kaum Rebahan \uD83D\uDECB\uFE0F","Couch Crew \uD83D\uDECB\uFE0F",
"Mulai Geliat \uD83E\uDD71","Starting to Stir \uD83E\uDD71",
"Pemanasan \u2615","Warming Up \u2615",
"Mode Gas \u26A1","Gas Mode \u26A1",
"Pejuang Fokus \uD83D\uDD25","Focus Fighter \uD83D\uDD25",
"Pendekar Produktif \u2694\uFE0F","Productivity Warrior \u2694\uFE0F",
"Master Anti-Mager \uD83D\uDC51","Anti-Lazy Master \uD83D\uDC51",
"LEVEL MAKSIMAL! \uD83D\uDC51","MAX LEVEL! \uD83D\uDC51",
"\uD83D\uDDD3\uFE0F Jejak 14 hari terakhir","\uD83D\uDDD3\uFE0F Last 14 days trail",
"(tap tanggal untuk rincian)","(tap a date for details)",
"Angka besar = tanggal \u00B7 lencana emas = jumlah tugas beres hari itu.","Big number = date \u00B7 gold badge = tasks done that day.",
"\uD83C\uDF38 3 Hal yang Disyukuri Hari Ini","\uD83C\uDF38 3 Things to Be Grateful for Today",
"1. Contoh: hujan reda tepat sebelum berangkat\u2026","1. Example: the rain stopped right before leaving\u2026",
"2. Contoh: ada teman yang menyapa dulu\u2026","2. Example: a friend greeted me first\u2026",
"3. Contoh: tubuhku kuat puasa hari ini\u2026","3. Example: my body stayed strong fasting today\u2026",
"Tulis 3 hal kecil yang kamu syukuri hari ini \u2014 tersimpan otomatis di HP-mu. \uD83E\uDD0D","Write 3 small things you're grateful for today \u2014 saved automatically on your phone. \uD83E\uDD0D",
"\uD83C\uDF38 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!","\uD83C\uDF38 MashaAllah, today's gratitude is complete. May it become a beautiful habit!",
"01 \u00B7 MISI HARIAN","01 \u00B7 DAILY MISSION",
"Papan Tugas Anti-Mager","Anti-Lazy Task Board",
"Rahasianya: mulai dari yang ","The trick: start with the ",
"paling kecil","smallest",
". Centang satu, dapat XP + konfeti. Serius. ",". Tick one, earn XP + confetti. Seriously. ",
"\u2B50 = prioritas selalu di atas \u00B7 \u25B2\u25BC atau tahan \u283F lalu seret = atur urutan \u00B7 tap teks tugas = edit typo \u270F\uFE0F.","\u2B50 = priority always on top \u00B7 \u25B2\u25BC or hold \u283F and drag = reorder \u00B7 tap task text = edit typo \u270F\uFE0F.",
"Tulis satu hal kecil\u2026 (misal: balas 1 email)","Write one small thing\u2026 (e.g. reply to 1 email)",
"+ Tambah","+ Add",
"\u2B50 Prioritas","\u2B50 Priority",
"Papan masih kosong nih\u2026","The board is still empty\u2026",
"Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!","Tap a suggestion above, or write your own. Start small!",
"\uD83D\uDCA7 Minum segelas air","\uD83D\uDCA7 Drink a glass of water",
"\uD83E\uDDF9 Rapikan meja 2 menit","\uD83E\uDDF9 Tidy desk for 2 min",
"\uD83D\uDCD6 Baca 1 halaman buku","\uD83D\uDCD6 Read 1 page",
"\uD83D\uDCAC Balas 1 chat tertunda","\uD83D\uDCAC Reply to 1 pending chat",
"\uD83D\uDE46 Stretching ringan","\uD83D\uDE46 Light stretching",
"Minum segelas air","Drink a glass of water",
"Rapikan meja 2 menit","Tidy desk for 2 min",
"Baca 1 halaman buku","Read 1 page",
"Balas 1 chat tertunda","Reply to 1 pending chat",
"Stretching ringan","Light stretching",
"Push-up / squat 5 kali","Push-up / squat 5 times",
"Tulis 3 hal yang kamu syukuri","Write 3 things you're grateful for",
"Stretching leher & bahu 1 menit","Neck & shoulder stretch 1 min",
"Kirim pesan semangat ke 1 teman","Send an encouraging message to 1 friend",
"Napas 4-7-8 tiga putaran","4-7-8 breathing, three rounds",
"02 \u00B7 MODE FOKUS","02 \u00B7 FOCUS MODE",
"Timer Nyalakan Fokus","Light-Up Focus Timer",
"Nggak mood?","Not in the mood?",
"Kilat 2 menit","2-min blitz",
". Lagi ambis?",". Feeling ambitious?",
"Deep Focus 50/90 menit","Deep Focus 50/90 min",
" \u2014 atau atur sendiri menitnya (tap angka \u23F1\uFE0F untuk ketik bebas, mis. 23). XP sampai +100! \uD83D\uDE80 Timer tetap jalan walau aplikasi diminimkan."," \u2014 or set your own minutes (tap the \u23F1\uFE0F number to type freely, e.g. 23). Up to +100 XP! \uD83D\uDE80 Timer keeps running even when the app is minimized.",
"Pilih ritmemu \uD83C\uDFA7","Pick your rhythm \uD83C\uDFA7",
"Selesai satu sesi = ","Finish one session = ",
" (Deep Focus sampai "," (Deep Focus up to ",
") dan tomat \uD83C\uDF45 masuk koleksi.",") and a tomato \uD83C\uDF45 joins your collection.",
"\uD83C\uDF45 Fokus 25","\uD83C\uDF45 Focus 25",
"\u26A1 Kilat 2","\u26A1 Blitz 2",
"\uD83C\uDF3F Rehat 5","\uD83C\uDF3F Break 5",
"\uD83D\uDD25 Deep 50","\uD83D\uDD25 Deep 50",
"\uD83D\uDE80 Deep 90","\uD83D\uDE80 Deep 90",
"\u23F1\uFE0F Atur:","\u23F1\uFE0F Set:",
"Pakai","Use",
"\u25B6 Mulai","\u25B6 Start",
"\u25B6 Lanjut","\u25B6 Resume",
"\u23F8 Jeda","\u23F8 Pause",
"\u21BA Ulang","\u21BA Reset",
"Koleksi hari ini:","Today's collection:",
"belum ada \u2014 ayo mulai!","none yet \u2014 let's go!",
"Kilat","Blitz",
"Rehat","Break",
"03 \u00B7 SPIRITUAL CORNER","03 \u00B7 SPIRITUAL CORNER",
"Produktif Dunia, Tenang Ibadah","Productive in Life, Calm in Worship",
"Kerjaan jalan, sholat tetap nomor satu. Murottal tetap mengalun walau kamu pindah menu. \uD83D\uDD4C","Work goes on, prayer stays number one. Murottal keeps flowing even when you switch menus. \uD83D\uDD4C",
"\uD83C\uDF10 Auto (dari lokasiku)","\uD83C\uDF10 Auto (from my location)",
"\uD83D\uDCCD Otomatis (GPS saya)","\uD83D\uDCCD Automatic (my GPS)",
"\uD83D\uDCCD Lokasimu (GPS)","\uD83D\uDCCD Your location (GPS)",
"Jumhur (Syafi\u2018i/Maliki/Hanbali)","Majority (Shafi'i/Maliki/Hanbali)",
"Jumhur (Syafi'i/Maliki/Hanbali)","Majority (Shafi'i/Maliki/Hanbali)",
"Jumhur","Majority",
"Muslim World League (Eropa/Afrika/Asia umum)","Muslim World League (Europe/Africa/General Asia)",
"ISNA (Amerika Utara)","ISNA (North America)",
"Egyptian GA (Mesir/Sudan/Levant)","Egyptian GA (Egypt/Sudan/Levant)",
"Umm al-Qura (Arab Saudi)","Umm al-Qura (Saudi Arabia)",
"Diyanet (Turki/Balkan/Rusia/Asia Tengah)","Diyanet (Turkey/Balkans/Russia/Central Asia)",
"Kemenag RI / MUIS SG / JAKIM MY","Kemenag ID / MUIS SG / JAKIM MY",
"\uD83D\uDD4C Fokus Sampai Adzan","\uD83D\uDD4C Focus Until Adhan",
"Dihitung otomatis di perangkat (metode Kemenag: Subuh 20\u00B0, Isya 18\u00B0).","Calculated automatically on-device (Kemenag method: Fajr 20\u00B0, Isha 18\u00B0).",
"\uD83D\uDCFF Tasbih Digital","\uD83D\uDCFF Digital Tasbih",
"Target dzikir harianmu \u2014 tap lingkaran untuk berdzikir.","Your daily dhikr target \u2014 tap the circle to count.",
"Subuh","Fajr",
"Dzuhur","Dhuhr",
"Ashr","Asr",
"Isya","Isha",
"Menghitung\u2026","Calculating\u2026",
"04 \u00B7 RITUAL HARIAN","04 \u00B7 DAILY RITUAL",
"Pelacak Kebiasaan","Habit Tracker",
"Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!","Small habits repeated = big change. Check today off, +10 XP per habit!",
"\u2795 Kebiasaan baru:","\u2795 New habit:",
"misal: Tilawah 1 halaman","e.g. Read 1 page",
"Tambah Kebiasaan","Add Habit",
"Tandai Beres Hari Ini","Mark Done Today",
"\u2714 Hari ini beres!","\u2714 Done today!",
"05 \u00B7 BUKTI PROGRES","05 \u00B7 PROOF OF PROGRESS",
"Kebun Nyalamu","Your Light-Up Garden",
"Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun \uD83C\uDF38","Every finished task grows a new plant. The more you do, the lusher it gets \uD83C\uDF38",
"Masih benih nih \u2014 siram dengan satu tugas kecil \uD83C\uDF30","Still a seed \u2014 water it with one small task \uD83C\uDF30",
"Kecambah pertama muncul! Jangan berhenti \uD83C\uDF31","First sprout! Don't stop \uD83C\uDF31",
"Akarmu menguat, lanjutkan ritmenya \uD83C\uDF3F","Your roots strengthen, keep the rhythm \uD83C\uDF3F",
"Daunnya rimbun \u2014 fokusmu juga \uD83C\uDF43","Leaves are lush \u2014 so is your focus \uD83C\uDF43",
"Mulai berbunga. Kamu keren! \uD83C\uDF37","Blooming now. You're awesome! \uD83C\uDF37",
"Kebunmu hampir jadi hutan! \uD83C\uDF33","Your garden is almost a forest! \uD83C\uDF33",
"Legendaris. Kebunmu subur maksimal \uD83C\uDFC6","Legendary. Your garden is fully thriving \uD83C\uDFC6",
"TUGAS SELESAI SEPANJANG MASA","TASKS DONE ALL-TIME",
"MENIT FOKUS TERKUMPUL","FOCUS MINUTES COLLECTED",
"HARI BERUNTUN CHECK-IN","CONSECUTIVE CHECK-IN DAYS",
"06 \u00B7 ANTI BINGUNG","06 \u00B7 ANTI-OVERWHELM",
"Roda Semangat","Motivation Wheel",
"Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!","Mind blank? Let the wheel choose. Spin, then go without thinking!",
"Putar rodanya \uD83C\uDFB0","Spin the wheel \uD83C\uDFB0",
"Apa pun hasilnya, kerjakan ","Whatever it lands on, do ",
"sekarang","now",
" \u2014 maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti."," \u2014 max 2 minutes. No overthinking, no later.",
"Kerjakan sekarang, maksimal 2 menit \u23F1\uFE0F","Do it now, max 2 minutes \u23F1\uFE0F",
"\uD83C\uDFA1 PUTAR SEKARANG","\uD83C\uDFA1 SPIN NOW",
"GAS!","GO!",
"\u2705 Jadikan tugas","\u2705 Make it a task",
"07 \u00B7 LAPORAN MINGGUAN","07 \u00B7 WEEKLY REPORT",
"Sepekan Barakahku","My Barakah Week",
"Rekap otomatis 7 hari terakhir \u2014 unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular!","Auto recap of the last 7 days \u2014 download as a 9:16 image, post to IG Story / WA Status, and spread the motivation!",
"\u2705 TUGAS BERES","\u2705 TASKS DONE",
"\u23F1\uFE0F MENIT FOKUS","\u23F1\uFE0F FOCUS MINUTES",
"\uD83C\uDF3F HABIT TERCEKLIS","\uD83C\uDF3F HABITS CHECKED",
"\uD83D\uDCFF DZIKIR","\uD83D\uDCFF DHIKR",
"TUGAS BERES","TASKS DONE",
"MENIT FOKUS","FOCUS MINUTES",
"HABIT TERCEKLIS","HABITS CHECKED",
"DZIKIR","DHIKR",
"PROGRESS HARIAN (%)","DAILY PROGRESS (%)",
"\uD83D\uDCF8 Unduh Gambar","\uD83D\uDCF8 Download Image",
"\uD83D\uDCE4 Share ke Story","\uD83D\uDCE4 Share to Story",
"Gambar 9:16 dengan branding NYALA \u2014 siap tempel ke IG Story / Status WA.","9:16 image with NYALA branding \u2014 ready to post to IG Story / WA Status.",
"\uD83D\uDD00 Kocok semangat lagi","\uD83D\uDD00 Shuffle motivation",
"MANTRA NYALA","NYALA MANTRA",
"PERIBAHASA INDONESIA","INDONESIAN PROVERB",
"TIM NYALA","NYALA TEAM",
"\"Mulai aja dulu. Sempurnanya sambil jalan.\"","\"Just start. Perfect it along the way.\"",
"\"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat.\"","\"You don't have to be great to start, but you have to start to be great.\"",
"\"Sedikit demi sedikit, lama-lama jadi bukit.\"","\"Little by little, eventually it becomes a mountain.\"",
"\"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak.\"","\"Discipline is choosing between what you want now and what you want most.\"",
"\"Rahasia untuk maju adalah memulai.\"","\"The secret of getting ahead is getting started.\"",
"\"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.\"","\"Life is like riding a bicycle. To keep balance, you must keep moving.\"",
"\"Perjalanan seribu mil dimulai dari satu langkah.\"","\"A journey of a thousand miles begins with a single step.\"",
"\"Fokus pada progres, bukan kesempurnaan.\"","\"Focus on progress, not perfection.\"",
"\"Mager itu wajar. Menyerah itu pilihan \u2014 dan kamu nggak harus milih itu.\"","\"Feeling lazy is normal. Giving up is a choice \u2014 and you don't have to make it.\"",
"\"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood.\"","\"Productive people aren't always motivated; they keep going even when they're not.\"",
"\"Yang berat itu bukan pekerjaannya, tapi memulainya.\"","\"The hard part isn't the work \u2014 it's starting.\"",
"Dibuat dengan ","Made with ",
" biar kamu nggak mager lagi."," so you never laze again.",
"Semua datamu tersimpan aman di perangkat ini \u2014 tanpa akun, tanpa ribet.","All your data is stored safely on this device \u2014 no account, no hassle.",
"Kolaborasi:","Collaboration:",
"\uD83D\uDCBE Cadangkan data","\uD83D\uDCBE Back up data",
"\uD83D\uDCC2 Pulihkan data","\uD83D\uDCC2 Restore data",
"Mulai ulang dari nol (hapus semua data)","Start from zero (delete all data)",
"Selamat datang di NYALA","Welcome to NYALA",
"Sebelum mulai, siapa nama panggilanmu?","Before we start, what should we call you?",
"Siapa nama panggilanmu? \uD83D\uDE0A","What should we call you? \uD83D\uDE0A",
"Ketik namamu di sini\u2026","Type your name here\u2026",
"Mulai Nyala \uD83D\uDD25","Start Lighting Up \uD83D\uDD25",
"Lewati dulu","Skip for now",
"Edit tugas:","Edit task:",
"Berapa menit? (1\u2013180, bebas \u2014 mis. 23)","How many minutes? (1\u2013180, free \u2014 e.g. 23)",
"Koreksi jadwal adzan (menit). Contoh: -2 atau 3","Adjust adhan schedule (minutes). E.g. -2 or 3",
"Hapus kebiasaan \"","Delete habit \"",
"Pulihkan data dari cadangan ","Restore data from backup ",
"\uD83D\uDCE5 Bawa tugas belum selesai ke hari ini","\uD83D\uDCE5 Carry unfinished tasks to today",
"Tidak ada tugas tercatat hari itu.","No tasks recorded that day.",
"\uD83C\uDF38 Syukur hari itu:","\uD83C\uDF38 Gratitude that day:",
"Klik untuk ganti nama","Click to rename",
"Suara nyala \u2014 tap untuk matikan","Sound on \u2014 tap to mute",
"Suara mati \u2014 tap untuk nyalakan","Sound off \u2014 tap to unmute",
"Streak check-in harianmu","Your daily check-in streak",
"Tahan & seret untuk menggeser urutan","Hold & drag to reorder",
"Geser urutan tugas","Reorder task",
"Batalkan selesai","Undo done",
"Tandai selesai","Mark done",
"Hapus status prioritas","Remove priority",
"Tandai sebagai prioritas","Mark as priority",
"Geser naik","Move up",
"Geser turun","Move down",
"Hapus tugas","Delete task",
"Hapus kebiasaan","Delete habit",
"Tap untuk memperbaiki typo / mengedit tugas \u270F\uFE0F","Tap to fix a typo / edit task \u270F\uFE0F",
"Kurangi 1 menit","Minus 1 minute",
"Tambah 1 menit","Plus 1 minute",
"Tap untuk ketik angka persis, mis. 23","Tap to type exact minutes, e.g. 23",
"Pilih kota atau GPS","Choose city or GPS",
"Hitung ulang jadwal","Recalculate schedule",
"Koreksi menit jadwal adzan","Adjust adhan minutes",
"Mager banget","So lazy",
"Capek","Tired",
"Biasa aja","Meh",
"Senang","Happy",
"Semangat membara","On fire",
"A \u00B7 BACA & DENGAR","A \u00B7 READ & LISTEN",
"Mushaf Digital 114 Surah / 30 Juz","Digital Mushaf \u00B7 114 Surahs / 30 Juz",
"Baca sendiri atau baca bareng murottal. \uD83D\uDCD6","Read alone or recite along with murottal. \uD83D\uDCD6",
"Per Surah","Per Surah",
"Per Juz","Per Juz",
"\uD83D\uDCD6 Baca Sendiri","\uD83D\uDCD6 Read Alone",
"\uD83C\uDFA7 Baca Bareng","\uD83C\uDFA7 Recite Along",
"\u25B6 Murottal Surah","\u25B6 Surah Murottal",
"\u25B6 Mulai Baca Bareng","\u25B6 Start Reciting Along",
"\u23F9 Berhenti","\u23F9 Stop",
"\u25B6 dengar","\u25B6 listen",
"B \u00B7 AYAT UNTUK HATIMU","B \u00B7 VERSES FOR YOUR HEART",
"Sedang Merasa Apa?","How Are You Feeling?",
"Pilih keadaanmu \u2014 Allah sudah menyiapkan ayatnya untukmu. \uD83E\uDD0D","Pick your state \u2014 Allah has prepared verses for you. \uD83E\uDD0D",
"\uD83D\uDE22 Sedih","\uD83D\uDE22 Sad",
"\uD83D\uDE30 Cemas","\uD83D\uDE30 Anxious",
"\uD83E\uDD70 Bersyukur","\uD83E\uDD70 Grateful",
"\uD83C\uDF3E Butuh Sabar","\uD83C\uDF3E Need Patience",
"\uD83D\uDCBC Memohon Rezeki","\uD83D\uDCBC Seeking Provision",
"\uD83C\uDF19 Merasa Sendiri","\uD83C\uDF19 Feeling Alone",
"\uD83E\uDD0D Meminta Ampun","\uD83E\uDD0D Seeking Forgiveness",
"\uD83D\uDEE1\uFE0F Ingin Terlindungi","\uD83D\uDEE1\uFE0F Wanting Protection",
"C \u00B7 TRACKER HAFALAN","C \u00B7 MEMORIZATION TRACKER",
"Perjalanan Huffaz-mu \uD83C\uDFC6","Your Huffaz Journey \uD83C\uDFC6",
"Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = ","Tap a surah: grey = not yet, pink = in progress, gold = memorized. Marking memorized = ",
"Belum","Not yet",
"Proses","In progress",
"Hafal","Memorized",
"D \u00B7 DOA-DOA","D \u00B7 SUPPLICATIONS",
"Doa Sehari-hari, Nabi & Masa Kini","Everyday, Prophetic & Modern Duas",
"Lengkap dengan teks Arab, latin, arti, ","Complete with Arabic text, transliteration, meaning, ",
"manfaat","benefits",
"sumber","sources",
"nya. \uD83E\uDD32","s. \uD83E\uDD32",
"\uD83C\uDF24\uFE0F Sehari-hari","\uD83C\uDF24\uFE0F Everyday",
"\uD83D\uDD4C Doa Para Nabi","\uD83D\uDD4C Prophetic Duas",
"\uD83D\uDD70\uFE0F Masa Kini","\uD83D\uDD70\uFE0F Modern",
"\uD83C\uDF05 Pagi","\uD83C\uDF05 Morning",
"\uD83C\uDF07 Petang","\uD83C\uDF07 Evening",
"Waktu utama:","Prime time:",
"Dzikir pagi setelah Subuh hingga terbit matahari; dzikir petang setelah Ashar hingga terbenam (boleh selepas Maghrib). Tap lingkaran hitungan sesuai jumlah anjuran. \uD83E\uDD0D","Morning dhikr after Fajr until sunrise; evening dhikr after Asr until sunset (allowed after Maghrib). Tap the counter circle the recommended number of times. \uD83E\uDD0D",
"Lisensi:","License:",
"Teks Arab (Al-Qur'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.","Arabic text (Qur'an & Hadith) = public domain. Transliteration & Indonesian translation = original work of this app, released CC0 / public domain for unrestricted use by the ummah.",
"\uD83D\uDCDA HR. ","\uD83D\uDCDA Narrated by: ",
"\uD83D\uDCDA Sumber: ","\uD83D\uDCDA Source: ",
"\u2728 Manfaat: ","\u2728 Benefit: ",
" (sahih)"," (authentic)",
" (hasan)"," (good)",
"(hasan, Al-Albani)","(good, Al-Albani)",
"\uD83D\uDD04 Memuat\u2026","\uD83D\uDD04 Loading\u2026",
"\uD83D\uDCE6 Memuat data\u2026","\uD83D\uDCE6 Loading data\u2026",
"\uD83D\uDCE5 Mengunduh data\u2026","\uD83D\uDCE5 Downloading data\u2026",
"\uD83D\uDCE6 114 surah siap \u2705 (dari cache HP)","\uD83D\uDCE6 114 surahs ready \u2705 (from phone cache)",
"\uD83D\uDCE6 114 surah siap \u2705 (tersimpan di HP)","\uD83D\uDCE6 114 surahs ready \u2705 (saved on phone)",
"\u2705 Data Qur'an termuat!","\u2705 Qur'an data loaded!",
"\u26A0\uFE0F Gagal memuat. Pastikan terhubung internet.","\u26A0\uFE0F Failed to load. Make sure you're online.",
"\u26A0\uFE0F Gagal memuat data. Pastikan terhubung internet.","\u26A0\uFE0F Failed to load data. Make sure you're online.",
"Madaniyah","Medinan",
"Makkiyah","Meccan",
"Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.","In the name of Allah, the Most Gracious, the Most Merciful.",
"\uD83C\uDFA7 Mode baca bareng aktif","\uD83C\uDFA7 Recite-along mode on",
"Sesi berhenti \uD83C\uDF3F","Session stopped \uD83C\uDF3F",
"Muat dulu ayatnya ya \uD83D\uDE0A","Load the verses first \uD83D\uDE0A",
"\uD83C\uDFA7 Baca bareng dimulai\u2026","\uD83C\uDFA7 Reciting along started\u2026",
"Muroja'ah selesai! \uD83C\uDF39","Revision complete! \uD83C\uDF39",
"Data Qur'an belum termuat \uD83D\uDE14","Qur'an data not loaded yet \uD83D\uDE14",
"Data surah belum ada \uD83D\uDE14","Surah data not available \uD83D\uDE14",
"\uD83C\uDFA7 Memutar murottal\u2026","\uD83C\uDFA7 Playing murottal\u2026",
"\u2705 Murottal surah selesai \uD83C\uDF39","\u2705 Surah murottal finished \uD83C\uDF39",
"Audio tidak tersedia \uD83D\uDE14","Audio unavailable \uD83D\uDE14",
"Data belum termuat. Buka saat terhubung internet dulu ya \uD83D\uDE4F","Data not loaded. Open while connected to the internet first \uD83D\uDE4F",
"Dzikir selesai \uD83D\uDCFF","Dhikr complete \uD83D\uDCFF",
"Dzikir pagi lengkap! \uD83C\uDF39","Morning dhikr complete! \uD83C\uDF39",
"Dzikir petang lengkap! \uD83C\uDF39","Evening dhikr complete! \uD83C\uDF39",
" \u2014 Masya Allah, lengkap! \uD83C\uDF39"," \u2014 MashaAllah, complete! \uD83C\uDF39",
" \u2014 Masya Allah, Khatam Hafizh! \uD83C\uDFC6"," \u2014 MashaAllah, Khatam Hafizh! \uD83C\uDFC6",
"Hitung dzikir ","Count dhikr ",
"\uD83D\uDD15 Suara efek dimatikan.","\uD83D\uDD15 Sound effects muted.",
"\uD83D\uDD14 Suara efek dinyalakan.","\uD83D\uDD14 Sound effects unmuted.",
"\uD83C\uDFA7 Murottal tetap mengalun di latar belakang.","\uD83C\uDFA7 Murottal keeps playing in the background.",
"\u23F9 Murottal dihentikan.","\u23F9 Murottal stopped.",
"\u2B50 Ditandai prioritas \u2014 naik ke atas!","\u2B50 Marked priority \u2014 moved to top!",
"Prioritas dilepas","Priority removed",
"\u2B50 Tugas prioritas selalu di kelompok atas","\u2B50 Priority tasks always stay in the top group",
"\uD83D\uDD00 Urutan tugas diperbarui","\uD83D\uDD00 Task order updated",
"\u270F\uFE0F Tugas diperbarui","\u270F\uFE0F Task updated",
"Tugas tidak boleh kosong \uD83D\uDE05","Task can't be empty \uD83D\uDE05",
"Tulis dulu tugasnya ya \u270D\uFE0F","Write the task first \u270D\uFE0F",
"Tulis tugasnya dulu, lalu tandai \u2B50","Write the task first, then mark \u2B50",
"Misi roda masuk ke papan! Gas! \uD83D\uDE80","Wheel mission added to board! Go! \uD83D\uDE80",
"Ditambahkan! Sekarang gas kerjakan \uD83D\uDE80","Added! Now go do it \uD83D\uDE80",
"\u26A1 Mode kilat nyala! 2 menit aja, janji.","\u26A1 Blitz mode on! Just 2 minutes, promise.",
"Rehat selesai. Segar? Lanjut gas!","Break over. Refreshed? Keep going!",
"Jeda dulu, tarik napas \uD83C\uDF2C\uFE0F","Pause first, take a breath \uD83C\uDF2C\uFE0F",
"Timer diulang \u21BA","Timer reset \u21BA",
"\u23F1\uFE0F Timer-mu masih jalan dari tadi \u2014 semangat!","\u23F1\uFE0F Your timer is still running from earlier \u2014 keep going!",
"Fokus sampai adzan tuntas! Waktunya sholat \uD83D\uDD4C","Focus until adhan complete! Time to pray \uD83D\uDD4C",
"Mode kilat 2 menit beres! \u26A1","2-minute blitz complete! \u26A1",
"Deep Focus 50 menit tuntas! Ambis! \uD83D\uDE80","Deep Focus 50 min complete! Ambitious! \uD83D\uDE80",
"Deep Focus 90 menit tuntas! LEGENDARIS! \uD83D\uDE80","Deep Focus 90 min complete! LEGENDARY! \uD83D\uDE80",
"Satu sesi fokus tuntas! \uD83C\uDF45","One focus session complete! \uD83C\uDF45",
"Kebiasaan baru ditanam! \uD83C\uDF31","New habit planted! \uD83C\uDF31",
"Isi dulu nama kebiasaannya \u270D\uFE0F","Fill the habit name first \u270D\uFE0F",
"Prioritas beres! \uD83C\uDF1F","Priority done! \uD83C\uDF1F",
"Satu tugas tumbang!","One task down!",
"Check-in mood dulu \u263A\uFE0F","Mood check-in first \u263A\uFE0F",
"Syukur hari ini lengkap \uD83C\uDF38","Today's gratitude complete \uD83C\uDF38",
"Mantap! \u2728","Awesome! \u2728",
"Hari konsisten: \u226570% tugas beres! \uD83D\uDD25","Consistent day: \u226570% tasks done! \uD83D\uDD25",
"Lokasi terdeteksi! Jadwal & metode disesuaikan \uD83D\uDCCD","Location detected! Schedule & method adjusted \uD83D\uDCCD",
"GPS ditolak \u2014 pilih kota manual ya \uD83D\uDE4F","GPS denied \u2014 pick a city manually \uD83D\uDE4F",
"Jadwal & metode dihitung ulang \u2705","Schedule & method recalculated \u2705",
"Jadwal dihitung ulang \u2705","Schedule recalculated \u2705",
"Data dipulihkan! Memuat ulang\u2026 \uD83D\uDCC2","Data restored! Reloading\u2026 \uD83D\uDCC2",
"File cadangan tidak valid \uD83D\uDE14","Invalid backup file \uD83D\uDE14",
"Gagal membaca file cadangan \uD83D\uDE14","Failed to read backup file \uD83D\uDE14",
"Gagal membuat cadangan \uD83D\uDE14","Failed to create backup \uD83D\uDE14",
"Cadangan terunduh! Simpan file-nya di tempat aman \uD83D\uDCBE","Backup downloaded! Store the file somewhere safe \uD83D\uDCBE",
"Tips: cadangkan datamu lewat tombol di bawah halaman ya.","Tip: back up your data via the button at the bottom of the page.",
"Gambar tersimpan! Tinggal upload ke IG Story \uD83D\uDCF8","Image saved! Just upload to IG Story \uD83D\uDCF8",
"Gagal membuat gambar \uD83D\uDE14","Failed to create image \uD83D\uDE14",
"Yakin mau menghapus SEMUA data NYALA di perangkat ini?","Sure you want to delete ALL NYALA data on this device?",
"Beneran yakin? Streak dan XP-mu akan hilang \uD83D\uDE22","Really sure? Your streak and XP will be gone \uD83D\uDE22",
"? Data saat ini akan ditimpa.","? Current data will be overwritten.",
"Dibuat dengan NYALA \u2014 produktif pelan-pelan","Made with NYALA \u2014 productive, slowly but surely",
"Laporan produktivitas pekan ini","This week's productivity report",
"NYALA \u2014 Sepekan Barakahku","NYALA \u2014 My Barakah Week",
"Kemarin belum ada catatan \u2014 hari ini kita mulai!","No record yesterday \u2014 let's start today!",
"Hari baru, lembaran baru. Satu tugas kecil pun berarti!","New day, fresh page. Even one small task counts!",
"Rb","Wed","Km","Thu","Jm","Fri","Sb","Sat","Mg","Sun","Sn","Mon","Sl","Tue",
"Indonesia","Indonesia","English","English"
];

var EX={},PH=[],i;
for(i=0;i+1<P.length;i+=2){
  EX[P[i]]=P[i+1];
  if(P[i].length>=12&&P[i].indexOf(" ")>-1)PH.push([P[i],P[i+1]]);
}
PH.sort(function(a,b){return b[0].length-a[0].length;});

var DAYS={"Senin":"Monday","Selasa":"Tuesday","Rabu":"Wednesday","Kamis":"Thursday","Jumat":"Friday","Sabtu":"Saturday","Minggu":"Sunday"};
var MON={"Jan":"Jan","Feb":"Feb","Mar":"Mar","Apr":"Apr","Mei":"May","Jun":"Jun","Jul":"Jul","Agu":"Aug","Sep":"Sep","Okt":"Oct","Nov":"Nov","Des":"Dec"};
var LVL={"Kaum Rebahan":"Couch Crew","Mulai Geliat":"Starting to Stir","Pemanasan":"Warming Up","Mode Gas":"Gas Mode","Pejuang Fokus":"Focus Fighter","Pendekar Produktif":"Productivity Warrior","Master Anti-Mager":"Anti-Lazy Master"};
var MOOD={"Mode mager terdeteksi":"Lazy mode detected","Mode hemat energi":"Energy-saver mode","Mode stabil":"Stable mode","Mode cerah":"Sunny mode","Mode turbo!":"Turbo mode!"};

var WORLD=[
["Kyiv, Ukraine",50.4501,30.5234],
["London, United Kingdom",51.5074,-0.1278],
["Paris, France",48.8566,2.3522],
["Berlin, Germany",52.5200,13.4050],
["Madrid, Spain",40.4168,-3.7038],
["Rome, Italy",41.9028,12.4964],
["Amsterdam, Netherlands",52.3676,4.9041],
["Brussels, Belgium",50.8503,4.3517],
["Vienna, Austria",48.2082,16.3738],
["Warsaw, Poland",52.2297,21.0122],
["Moscow, Russia",55.7558,37.6173],
["Istanbul, Turkey",41.0082,28.9784],
["Ankara, Turkey",39.9334,32.8597],
["Cairo, Egypt",30.0444,31.2357],
["Riyadh, Saudi Arabia",24.7136,46.6753],
["Jeddah, Saudi Arabia",21.4858,39.1925],
["Makkah, Saudi Arabia",21.3891,39.8579],
["Madinah, Saudi Arabia",24.5247,39.5692],
["Dubai, United Arab Emirates",25.2048,55.2708],
["Abu Dhabi, United Arab Emirates",24.4539,54.3773],
["Doha, Qatar",25.2854,51.5310],
["Kuwait City, Kuwait",29.3759,47.9774],
["Muscat, Oman",23.5880,58.3829],
["Manama, Bahrain",26.2285,50.5860],
["Amman, Jordan",31.9539,35.9106],
["Jerusalem, Palestine",31.7683,35.2137],
["Beirut, Lebanon",33.8938,35.5018],
["Baghdad, Iraq",33.3152,44.3661],
["Tehran, Iran",35.6892,51.3890],
["Karachi, Pakistan",24.8607,67.0011],
["Lahore, Pakistan",31.5204,74.3587],
["Islamabad, Pakistan",33.6844,73.0479],
["Delhi, India",28.6139,77.2090],
["Mumbai, India",19.0760,72.8777],
["Dhaka, Bangladesh",23.8103,90.4125],
["Kuala Lumpur, Malaysia",3.1390,101.6869],
["Singapore, Singapore",1.3521,103.8198],
["Bangkok, Thailand",13.7563,100.5018],
["Tokyo, Japan",35.6762,139.6503],
["Seoul, South Korea",37.5665,126.9780],
["Beijing, China",39.9042,116.4074],
["Sydney, Australia",-33.8688,151.2093],
["Melbourne, Australia",-37.8136,144.9631],
["Auckland, New Zealand",-36.8485,174.7633],
["New York, United States",40.7128,-74.0060],
["Los Angeles, United States",34.0522,-118.2437],
["Chicago, United States",41.8781,-87.6298],
["Toronto, Canada",43.6532,-79.3832],
["Vancouver, Canada",49.2827,-123.1207],
["Mexico City, Mexico",19.4326,-99.1332],
["Sao Paulo, Brazil",-23.5505,-46.6333],
["Buenos Aires, Argentina",-34.6037,-58.3816],
["Cape Town, South Africa",-33.9249,18.4241],
["Johannesburg, South Africa",-26.2041,28.0473],
["Nairobi, Kenya",-1.2921,36.8219],
["Lagos, Nigeria",6.5244,3.3792],
["Accra, Ghana",5.6037,-0.1870],
["Casablanca, Morocco",33.5731,-7.5898],
["Algiers, Algeria",36.7538,3.0588],
["Tunis, Tunisia",36.8065,10.1815],
["Khartoum, Sudan",15.5007,32.5599],
["Addis Ababa, Ethiopia",9.0320,38.7469],
["Dar es Salaam, Tanzania",-6.7924,39.2083],
["Kampala, Uganda",0.3476,32.5825],
["Mogadishu, Somalia",2.0469,45.3182],
["Baku, Azerbaijan",40.4093,49.8671],
["Tashkent, Uzbekistan",41.2995,69.2401],
["Almaty, Kazakhstan",43.2220,76.8512],
["Kabul, Afghanistan",34.5553,69.2075],
["Kathmandu, Nepal",27.7172,85.3240],
["Colombo, Sri Lanka",6.9271,79.8612],
["Male, Maldives",4.1755,73.5093],
["Hanoi, Vietnam",21.0285,105.8542],
["Ho Chi Minh City, Vietnam",10.8231,106.6297],
["Manila, Philippines",14.5995,120.9842],
["Phnom Penh, Cambodia",11.5564,104.9282],
["Yangon, Myanmar",16.8661,96.1951]
];

function patterns(o){
  var m;
  m=o.match(/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu), (\d+) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)$/);
  if(m)return DAYS[m[1]]+", "+m[2]+" "+MON[m[3]];
  m=o.match(/^Lv\.(\d+) \u00B7 (.+)$/);
  if(m){var t=m[2],k;for(k in LVL){if(t.indexOf(k)===0)t=LVL[k]+t.slice(k.length);}return "Lv."+m[1]+" \u00B7 "+t;}
  m=o.match(/^(\d+)% \u00B7 (.+)$/);
  if(m)return m[1]+"% \u00B7 "+(MOOD[m[2]]||m[2]);
  m=o.match(/^\uD83D\uDD25 (\d+) hari$/);
  if(m)return "\uD83D\uDD25 "+m[1]+" days";
  m=o.match(/^(\d+) tugas total$/);
  if(m)return m[1]+" tasks total";
  m=o.match(/^(\d+) habit aktif$/);
  if(m)return m[1]+" active habits";
  m=o.match(/^(\d+) hari konsisten$/);
  if(m)return m[1]+" consistent days";
  m=o.match(/^(\d+) XP lagi ke Lv\.(\d+)$/);
  if(m)return m[1]+" XP to reach Lv."+m[2];
  m=o.match(/^(\d+) \/ (\d+) tugas \u00B7 (\d+)%$/);
  if(m)return m[1]+" / "+m[2]+" tasks \u00B7 "+m[3]+"%";
  m=o.match(/^\uD83C\uDF45 (\d+) sesi fokus \u00B7 \u23F1 (\d+) menit$/);
  if(m)return "\uD83C\uDF45 "+m[1]+" focus sessions \u00B7 \u23F1 "+m[2]+" min";
  m=o.match(/^(\d+) \/ (\d+) selesai$/);
  if(m)return m[1]+" / "+m[2]+" done";
  m=o.match(/^(\d+) \/ 114 surah dihafal$/);
  if(m)return m[1]+" / 114 surahs memorized";
  m=o.match(/^Total dzikir hari ini: (\d+)$/);
  if(m)return "Today's dhikr total: "+m[1];
  m=o.match(/^\uD83D\uDC4F Kemarin kamu beresin (\d+) tugas\. Keren!$/);
  if(m)return "\uD83D\uDC4F Yesterday you finished "+m[1]+(m[1]==="1"?" task":" tasks")+". Nice!";
  m=o.match(/^ADZAN (.+)$/);
  if(m)return "ADHAN "+m[1];
  m=o.match(/^Adzan (.+)$/);
  if(m)return "Adhan "+m[1];
  o=o.replace(/(\d+) jam /g,"$1 h ").replace(/(\d+) mnt /g,"$1 min ").replace(/(\d+) dtk lagi/g,"$1 s left");
  o=o.replace(/\(besok\)/g,"(tomorrow)");
  o=o.replace(/koreksi (\d+) mnt via/g,"correction $1 min via");
  o=o.replace(/\u00B7 metode Kemenag \u00B7 koreksi /g,"\u00B7 Kemenag method \u00B7 correction ");
  o=o.replace(/metode Kemenag: Subuh 20\u00B0, Isya 18\u00B0\./g,"Kemenag method: Fajr 20\u00B0, Isha 18\u00B0.");
  o=o.replace(/Menuju Adzan /g,"Until Adhan ");
  o=o.replace(/Custom \u00B7 (\d+) mnt/g,"Custom \u00B7 $1 min");
  o=o.replace(/(\d+) ayat/g,"$1 verses");
  o=o.replace(/(\d+) menit/g,"$1 min");
  o=o.replace(/\((\d+) sesi\)/g,"($1 sessions)");
  o=o.replace(/\u2728 Manfaat: /g,"\u2728 Benefit: ");
  o=o.replace(/\uD83D\uDCDA Sumber: /g,"\uD83D\uDCDA Source: ");
  o=o.replace(/\uD83D\uDCDA HR\. /g,"\uD83D\uDCDA Narrated by: ");
  o=o.replace(/ \(sahih\)/g," (authentic)");
  o=o.replace(/tugas\s+total/g,"tasks total");
  o=o.replace(/habit\s+aktif/g,"active habits");
  o=o.replace(/hari\s+konsisten/g,"consistent days");
  o=o.replace(/Ashr: Jumhur/g,"Asr: Majority");
  o=o.replace(/Ashr: Hanafi/g,"Asr: Hanafi");
  o=o.replace(/koreksi (\d+) (?:mnt|min) via/g,"correction $1 min via");
  o=o.replace(/Otomatis\s*\(GPS saya\)/g,"Automatic (my GPS)");
  o=o.replace(/Auto\s*\(dari lokasiku\)/g,"Auto (from my location)");
  return o;
}

var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
var SKIP=".arabic,.doa-ar,.latin,.doa-la,.surah-info .ar,.arti,.doa-id,.doa-m,.doa-t,.dz-title,.haf-cell,#hafTxt,[data-no-i18n],.nyalaHafDate,.nyala-saw,#nyalaLangSel";

function toEN(t){
  if(!t||AR.test(t))return t;
  var s=t.replace(/\u00a0/g," ").replace(/^\s+|\s+$/g,"");
  if(!s)return t;
  if(EX[s]!==undefined)return t.replace(s,EX[s]);
  var o=t,j;
  for(j=0;j<PH.length;j++){if(o.indexOf(PH[j][0])>-1)o=o.split(PH[j][0]).join(PH[j][1]);}
  return patterns(o);
}

/* Native dialogs are not DOM. Translate their message with tolerant word-anchors so
   emoji / spacing variants in app.js still match. Falls back to the general engine. */
function dlgEN(m){
  var s=String(m==null?"":m);
  if(/Siapa nama panggilanmu/i.test(s))return "What should we call you?"+(/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s)?" \uD83D\uDE0A":"");
  if(/^\s*Edit tugas/i.test(s))return "Edit task:"+s.slice(s.indexOf(":")+1);
  if(/Berapa menit/i.test(s))return "How many minutes? (1\u2013180, free \u2014 e.g. 23)";
  if(/Koreksi jadwal adzan/i.test(s))return "Adjust adhan schedule (minutes). E.g. -2 or 3";
  var h=s.match(/Hapus kebiasaan\s*"(.*)"\s*\?/);
  if(h)return 'Delete habit "'+h[1]+'"?';
  var r=s.match(/Pulihkan data dari cadangan\s*([\s\S]*?)\s*\?/);
  if(r)return "Restore data from backup "+r[1]+"? Current data will be overwritten.";
  if(/Yakin mau menghapus SEMUA data/i.test(s))return "Sure you want to delete ALL NYALA data on this device?";
  if(/Beneran yakin/i.test(s))return "Really sure? Your streak and XP will be gone \uD83D\uDE22";
  if(/Hapus tugas/i.test(s))return "Delete this task?";
  return toEN(s);
}
function installNative(){
  if(window.__nyNative)return;
  window.__nyNative=true;
  var p=window.prompt,c=window.confirm,a=window.alert;
  function tr(m){return lang()==="en"?dlgEN(m):m;}
  window.prompt=function(m,d){return p.call(window,tr(m),d);};
  window.confirm=function(m){return c.call(window,tr(m));};
  window.alert=function(m){return a.call(window,tr(m));};
}

/* ---- Dzikir & Doa English (index keyed) ---- */
var DZ=[
["Ayat al-Kursi","Allah \u2014 there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth\u2026 His Kursi extends over the heavens and the earth, and He is the Most High, the Most Great.","",""],
["Al-Ikhlas, Al-Falaq & An-Nas","The three surahs of protection (Al-Ikhlas, Al-Falaq, An-Nas). Reciting them three times in the morning and evening suffices you against everything.","",""],
["Opening: All Sovereignty Belongs to Allah","","We enter the morning and all sovereignty belongs to Allah\u2026 My Lord, I ask You for the good of this day and the good that follows it, and I seek refuge in You from its evil.","We enter the evening and all sovereignty belongs to Allah\u2026 My Lord, I ask You for the good of this night and the good that follows it, and I seek refuge in You from its evil."],
["Sayyidul Istighfar (The Master of Seeking Forgiveness)","O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant\u2026 I acknowledge Your favour upon me and I acknowledge my sin, so forgive me \u2014 for none forgives sins but You.","",""],
["Surrendering Oneself to Allah","","O Allah, by You we enter the morning and the evening; by You we live and by You we die, and to You is the resurrection.","O Allah, by You we enter the evening and the morning; by You we live and by You we die, and to You is the final destination."],
["Testimony of Tawhid","","O Allah, this morning I call You to witness \u2014 and the bearers of Your Throne, Your angels, and all of Your creation \u2014 that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger.","O Allah, this evening I call You to witness \u2014 and the bearers of Your Throne, Your angels, and all of Your creation \u2014 that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger."],
["Seeking Wellbeing","O Allah, grant wellbeing to my body; O Allah, grant wellbeing to my hearing; O Allah, grant wellbeing to my sight. There is no deity but You.","",""],
["Allah Is Sufficient","Allah is sufficient for me; there is no deity but Him. Upon Him I place my trust, and He is the Lord of the Mighty Throne.","",""],
["Protection from Harm","In the name of Allah, with whose name nothing on earth or in heaven can cause harm; and He is the All-Hearing, the All-Knowing.","",""],
["Contentment with Allah","I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad {S} as my Prophet.","",""],
["Seeking Allah's Help","O Ever-Living, O Sustainer of all, by Your mercy I seek help. Set all my affairs right, and do not leave me to myself even for the blink of an eye.","",""],
["Salawat upon the Prophet {S}","O Allah, send blessings and peace upon our Prophet Muhammad {S}. (10 times morning and evening = attaining his intercession)","",""],
["Tasbih 100 Times","Glory be to Allah and praise be to Him. (100 times erases faults and brings good)","",""],
["Tawhid 10 Times","There is no deity except Allah alone, without partner. His is the dominion and His is the praise, and He is over all things competent.","",""],
["Tasbih by the Weight of the Throne (morning only)","Glory be to Allah and praise be to Him \u2014 as many as His creation, as pleases Him, as heavy as His Throne, and as endless as the ink of His words.","",""],
["Seeking Knowledge & Provision (morning only)","O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.","",""],
["Istighfar 100 Times (daily)","I seek Allah's forgiveness and turn to Him in repentance. (100 times a day wipes away sins even as numerous as the foam of the sea)","",""]
];
var DZE=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,16];

var HARIAN=[
["\uD83C\uDF7D\uFE0F Before Eating","In the name of Allah. O Allah, bless our provision and protect us from the fire of Hell.","Brings blessing to the food and keeps shaytan away from our provision."],
["\uD83C\uDF7D\uFE0F After Eating","All praise is due to Allah who fed us and gave us drink and made us Muslims.","A means for sins to be forgiven and for gratitude to grow."],
["\uD83C\uDF19 Before Sleep","In Your name, O Allah, I live and in Your name I die.","Protection during sleep; if one passes away, it is upon the fitrah."],
["\uD83C\uDF05 Waking Up","All praise is due to Allah who gave us life after taking it from us, and to Him is the resurrection.","Opens the day with gratitude and remembrance of the resurrection."],
["\uD83D\uDEAA Entering the Bathroom","O Allah, I seek refuge in You from the male and female devils.","A barrier between the gaze of the jinn and our awrah."],
["\uD83D\uDEAA Leaving the Bathroom","O Allah, I seek Your forgiveness. All praise is due to Allah who has removed discomfort from me and restored my health.","Teaches istighfar alongside gratitude for health after relieving oneself."],
["\uD83D\uDCA7 After Wudu","I bear witness that there is no deity but Allah alone, without partner, and that Muhammad {S} is His servant and messenger.","Eight gates of Paradise are opened for him to choose from."],
["\uD83C\uDFE0 Entering the Home","In the name of Allah we enter and in the name of Allah we leave, and upon Allah we place our trust.","The home is blessed and the heart is anchored in reliance."],
["\uD83D\uDEB6 Leaving the Home","In the name of Allah, I place my trust in Allah; there is no might and no power except with Allah.","Guaranteed guidance, protection, and sufficiency from Allah."],
["\uD83D\uDD4C Entering the Mosque","O Allah, open for me the gates of Your mercy.","Asking that the gates of mercy be opened upon entering Allah's house."],
["\uD83D\uDD4C Leaving the Mosque","O Allah, I ask You of Your bounty.","Seeking Allah's bounty when returning to worldly affairs."],
["\uD83D\uDCE2 Hearing the Adhan","O Allah, Lord of this perfect call and the prayer to be established, grant Muhammad {S} al-Wasilah and excellence, and raise him to the praiseworthy station You have promised him.","Whoever says this after the adhan earns the right to the Prophet's {S} intercession on the Day of Judgment."],
["\uD83D\uDC68 For Both Parents","My Lord, forgive me and my parents, and have mercy upon them as they raised me when I was small.","A form of honoring parents; the prayer of a righteous child whose reward never ceases."],
["\uD83C\uDF27\uFE0F When It Rains","O Allah, send beneficial rain.","Turns the rain into a beneficial mercy."],
["\uD83D\uDE24 When Angry","I seek refuge in Allah from the accursed shaytan.","Quells anger and drives away the whispers of shaytan."],
["\uD83D\uDE97 While Traveling","Glory to Him who has subjected this to us, for we could never have done it ourselves; and to our Lord we shall surely return.","Protection in travel and a reminder of the return to Allah."],
["\uD83D\uDCDA Before Studying","My Lord, increase me in knowledge and grant me understanding.","Opens the heart and mind to receive knowledge; a form of reliance on Allah before studying."]
];
var NABI=[
["\uD83C\uDF3F Prophet Adam (QS 7:23)","Our Lord, we have wronged ourselves; and if You do not forgive us and have mercy upon us, we will surely be among the losers.","The most complete opener of the gate of repentance; acknowledging sin while seeking forgiveness and mercy."],
["\uD83D\uDC0B Prophet Yunus (QS 21:87)","There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.","A way out of distress."],
["\uD83C\uDFD4\uFE0F Prophet Musa (QS 20:25-28)","My Lord, expand for me my chest, ease for me my task, and untie the knot from my tongue so that they may understand my speech.","Expansion of the chest, ease of affairs, and fluency in speech \u2014 ideal before a presentation, interview, or da'wah."],
["\uD83D\uDD4B Prophet Ibrahim (QS 14:40)","My Lord, make me an establisher of prayer, and from my descendants as well. Our Lord, and accept my supplication.","Steadfastness in prayer for oneself and one's lineage."],
["\uD83D\uDC51 Prophet Sulaiman (QS 27:19)","My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteous deeds that please You.","Trains gratitude for personal and family blessings while seeking enablement for righteous deeds."],
["\uD83E\uDD32 Prophet Zakariya (QS 21:89)","My Lord, do not leave me alone, while You are the best of inheritors.","A plea for righteous offspring."],
["\uD83D\uDCA7 Prophet Musa (QS 28:24)","My Lord, indeed I am in need of whatever good You would send down to me.","An opener of the gate of provision."],
["\uD83C\uDF39 The Messenger (QS 2:201)","Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.","Encompasses the good of this world and the Hereafter."],
["\uD83C\uDF0A Prophet Nuh (QS 71:28)","My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and women.","Expansive forgiveness."],
["\uD83E\uDD12 Prophet Ayyub (QS 21:83)","Indeed, adversity has touched me, and You are the Most Merciful of the merciful.","The etiquette of complaining to Allah."],
["\uD83D\uDC9E The Messenger (QS 3:8)","Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself.","A steadier of the heart."],
["\uD83D\uDD4A\uFE0F The Messenger (QS 2:286)","Our Lord, do not take us to task if we forget or err. Our Lord, do not place upon us a burden like that placed upon those before us. Our Lord, do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy upon us. You are our Protector, so grant us victory over the disbelieving people.","Whoever recites the last two verses of Al-Baqarah at night, they will suffice him."]
];
var KINI=[
["\uD83C\uDF05 Opener of the Day","O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.","Beginning the day with total surrender to Allah."],
["\uD83E\uDDE0 Overthinking / Anxiety","Allah is sufficient for us, and He is the best Disposer of affairs.","Calms the heart and entrusts the outcome to Allah."],
["\uD83D\uDC68 Family in the Digital Age","Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.","Family becomes a delight to the eyes and an example of piety."],
["\uD83D\uDCF1 Tempted to Compare Yourself","O Allah, Turner of hearts, keep my heart firm upon Your religion.","Guarding the heart from envy and unrest."],
["\uD83C\uDF0A Knowledge of No Benefit","O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that is not humble, and from a soul that is never satisfied.","An inner filter: beneficial knowledge, a humble heart, a content soul."],
["\uD83E\uDD79 Gratitude in Joy","All praise is due to Allah by whose favour good deeds are completed.","Perfecting the blessing with gratitude."],
["\uD83D\uDCB3 Tight Finances","O Allah, suffice me with what is lawful so I need not the unlawful, and enrich me by Your bounty so I need none besides You.","Sufficiency through the halal."],
["\uD83C\uDFAF Provision, Knowledge & Deeds","O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.","Encompasses the needs of this world and the Hereafter: knowledge, lawful provision, and accepted worship."]
];

function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function mk(t){
  return esc(t).replace(/\{S\}/g,'<span class="nyala-saw">'+SAW+"</span>").replace(/\uFDFA/g,'<span class="nyala-saw">'+SAW+"</span>");
}
function setH(node,txt){var h=mk(txt);if(node.innerHTML!==h)node.innerHTML=h;}

var oT=new WeakMap(),oA=new WeakMap(),oH=new WeakMap(),oW=new WeakMap();
function guarded(n){
  var e=n.parentElement;
  while(e&&e!==document.body){
    if(e.matches&&e.matches(SKIP))return true;
    e=e.parentElement;
  }
  return false;
}
function content(){
  var en=lang()==="en",k,box=el("list"),cards,d,ti,ar,per,idx;
  if(box){
    per=(el("btnPetang")&&el("btnPetang").className.indexOf("on")>-1)?"e":"p";
    cards=box.querySelectorAll(".dz");
    for(k=0;k<cards.length;k++){
      idx=per==="e"?DZE[k]:k;
      d=DZ[idx];
      if(!d)continue;
      ti=cards[k].querySelector(".dz-title");
      ar=cards[k].querySelector(".arti");
      if(ti){if(!oH.has(ti))oH.set(ti,ti.textContent);setH(ti,en?d[0]:oH.get(ti));}
      if(ar){
        if(!oH.has(ar))oH.set(ar,ar.textContent);
        if(en)setH(ar,per==="e"?(d[3]||d[1]):(d[2]||d[1]));
        else setH(ar,oH.get(ar));
      }
    }
  }
  box=el("doaList");
  if(box){
    var arr=HARIAN;
    if(el("tabNabi")&&el("tabNabi").className.indexOf("on")>-1)arr=NABI;
    else if(el("tabKini")&&el("tabKini").className.indexOf("on")>-1)arr=KINI;
    cards=box.querySelectorAll(".doa-card");
    for(k=0;k<cards.length;k++){
      d=arr[k];
      if(!d)continue;
      var t=cards[k].querySelector(".doa-t"),m=cards[k].querySelector(".doa-id"),b=cards[k].querySelector(".doa-m");
      if(t){if(!oH.has(t))oH.set(t,t.textContent);setH(t,en?d[0]:oH.get(t));}
      if(m){if(!oH.has(m))oH.set(m,m.textContent);setH(m,en?d[1]:oH.get(m));}
      if(b){if(!oH.has(b))oH.set(b,b.textContent);setH(b,en?("\u2728 Benefit: "+d[2]):oH.get(b));}
    }
  }
}
/* Welcome card: enforce language directly on its known nodes so it is always correct
   regardless of how/when app.js renders it. Restores Indonesian when switched back. */
function welcome(){
  var ov=el("welcomeOverlay");
  if(!ov)return;
  var en=lang()==="en";
  var nodes=[
    [ov.querySelector("h2"),"Selamat datang di NYALA","Welcome to NYALA"],
    [ov.querySelector("p"),"Sebelum mulai, siapa nama panggilanmu?","Before we start, what should we call you?"],
    [el("welcomeSave"),"Mulai Nyala \uD83D\uDD25","Start Lighting Up \uD83D\uDD25"],
    [el("welcomeSkip"),"Lewati dulu","Skip for now"]
  ];
  for(var k=0;k<nodes.length;k++){
    var nd=nodes[k][0];
    if(!nd)continue;
    if(!oW.has(nd))oW.set(nd,nd.textContent);
    var want=en?nodes[k][2]:oW.get(nd);
    if(nd.textContent!==want)nd.textContent=want;
  }
  var inp=el("welcomeName");
  if(inp){
    if(!oA.has(inp))oA.set(inp,{placeholder:inp.getAttribute("placeholder")||""});
    var st=oA.get(inp);
    var wp=en?"Type your name here\u2026":st.placeholder;
    if(inp.getAttribute("placeholder")!==wp)inp.setAttribute("placeholder",wp);
  }
}
function worldCities(){
  var s=el("citySelect");
  if(!s)return;
  var en=lang()==="en";
  var g=s.querySelector('optgroup[data-ny-world]');
  if(g){g.label=en?"\uD83C\uDF0D World":"\uD83C\uDF0D Dunia";return;}
  var ok=true,n=0,i,v;
  for(i=0;i<s.options.length;i++){
    v=s.options[i].value;
    if(v==="gps"||v==="auto"||v==="")continue;
    n++;
    if(!/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(v)){ok=false;break;}
  }
  if(!ok||n===0)return;
  g=document.createElement("optgroup");
  g.setAttribute("data-ny-world","1");
  g.label=en?"\uD83C\uDF0D World":"\uD83C\uDF0D Dunia";
  for(i=0;i<WORLD.length;i++){
    var o=document.createElement("option");
    o.value=WORLD[i][1]+","+WORLD[i][2];
    o.textContent=WORLD[i][0];
    g.appendChild(o);
  }
  s.appendChild(g);
}
function texts(){
  if(!document.body)return;
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    if(guarded(n))return NodeFilter.FILTER_REJECT;
    var p=n.parentElement;
    if(p&&/^(SCRIPT|STYLE|TEXTAREA|INPUT|CANVAS)$/.test(p.tagName))return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }});
  var list=[],n;
  while((n=w.nextNode()))list.push(n);
  var en=lang()==="en",k,nd,cur,base,want;
  for(k=0;k<list.length;k++){
    nd=list[k];cur=nd.nodeValue;
    if(!cur||!cur.replace(/\s/g,""))continue;
    if(!oT.has(nd))oT.set(nd,cur);
    base=oT.get(nd);
    want=en?toEN(base):base;
    if(cur!==want)nd.nodeValue=want;
  }
}
function attrs(){
  var en=lang()==="en",list=document.querySelectorAll("[placeholder],[title],[aria-label]"),k,e,st,ks,j,key,v,want;
  for(k=0;k<list.length;k++){
    e=list[k];
    if(e.id==="nyalaLangSel"||e.id==="welcomeName")continue;
    if(e.matches&&e.matches(SKIP))continue;
    st=oA.get(e);
    if(!st){st={};oA.set(e,st);}
    ks=["placeholder","title","aria-label"];
    for(j=0;j<ks.length;j++){
      key=ks[j];v=e.getAttribute(key);
      if(v===null||AR.test(v))continue;
      if(!(key in st))st[key]=v;
      want=en?toEN(st[key]):st[key];
      if(v!==want)e.setAttribute(key,want);
    }
  }
}
function docTitle(){
  var t=document.title;
  if(!t)return;
  if(!window.__nyTitle)window.__nyTitle=t;
  var w=lang()==="en"?toEN(window.__nyTitle):window.__nyTitle;
  if(t!==w)document.title=w;
}
function picker(){
  var s=el("nyalaLangSel"),host,st;
  if(!s){
    s=document.createElement("select");
    s.id="nyalaLangSel";
    s.className="chip";
    host=document.querySelector(".chips")||document.querySelector("header .top-in")||document.querySelector("header")||document.body;
    if(host===document.body)s.style.cssText="position:fixed;top:8px;right:8px;z-index:9999;";
    host.appendChild(s);
  }
  s.setAttribute("data-no-i18n","1");
  if(!s.options.length){
    var a=document.createElement("option");a.value="id";a.textContent="\uD83C\uDDEE\uD83C\uDDE9 Indonesia";
    var b=document.createElement("option");b.value="en";b.textContent="\uD83C\uDDEC\uD83C\uDDE7 English";
    s.appendChild(a);s.appendChild(b);
  }
  if(s.value!==lang())s.value=lang();
  if(!s.__nyBound){
    s.__nyBound=true;
    s.addEventListener("change",function(){choose(s.value);});
  }
  if(!el("nyI18NStyle")){
    st=document.createElement("style");
    st.id="nyI18NStyle";
    st.textContent="#nyalaLangSel{cursor:pointer;font-weight:700;max-width:170px}"+
      ".nyala-saw{font-family:Amiri,'Noto Naskh Arabic',serif;font-size:1.02em;line-height:2;color:#e5c786}"+
      "html{scrollbar-color:#b76e79 #171314;scrollbar-width:thin}"+
      "::-webkit-scrollbar{width:10px;height:10px}"+
      "::-webkit-scrollbar-track{background:#171314}"+
      "::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#b76e79,#8f4f5b);border-radius:99px;border:2px solid #171314}"+
      "::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#d4a5a5,#b76e79)}";
    document.head.appendChild(st);
  }
}
var busy=false;
function run(){
  if(busy)return;
  busy=true;
  try{
    document.documentElement.lang=lang()==="en"?"en":"id";
    picker();
    welcome();
    worldCities();
    content();
    texts();
    attrs();
    docTitle();
  }catch(e){}
  busy=false;
}
function choose(v){
  put(v);
  run();
  try{window.dispatchEvent(new CustomEvent("nyala:lang",{detail:lang()}));}catch(e){}
}
window.NYALA_I18N={lang:lang,set:choose,refresh:run};

function start(){
  installNative();
  run();
  if(!window.__nyDeleg){
    window.__nyDeleg=true;
    document.addEventListener("change",function(e){
      var t=e.target;
      if(t&&t.id==="nyalaLangSel")choose(t.value);
    },true);
  }
  if(window.__nyObs)window.__nyObs.disconnect();
  if(window.MutationObserver){
    window.__nyObs=new MutationObserver(function(){
      if(window.__nyTick)return;
      window.__nyTick=true;
      requestAnimationFrame(function(){window.__nyTick=false;run();});
    });
    window.__nyObs.observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  if(window.__nyPoll)clearInterval(window.__nyPoll);
  window.__nyPoll=setInterval(run,500);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);
else start();
})();
