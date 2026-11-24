// nyala-i18n.js — NYALA bilingual engine (ID ⇄ EN). Binds any existing #nyalaLangSel,
// snapshot-based reversible translation, live re-translation of dynamic renders,
// Arabic + transliteration permanently protected. Idempotent (safe if loaded twice).
(function(){
'use strict';
if(window.__nyalaI18nLoaded)return;
window.__nyalaI18nLoaded=true;

var LANG='nyala_lang';
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}

/* [Indonesian, English] — applied longest-first over the ORIGINAL node text */
var PAIRS=[
["Produktif Anti-Mager","Productive Anti-Lazy"],
["— atau atur sendiri menitnya (tap angka ⏱️ untuk ketik bebas, mis. 23). XP sampai +100! 🚀 Timer tetap jalan walau aplikasi diminimkan."," — or set your own minutes (tap the ⏱️ number to type freely, e.g. 23). Up to +100 XP! 🚀 Timer keeps running even when the app is minimized."],
["Dzikir pagi setelah Subuh hingga terbit matahari; dzikir petang setelah Ashar hingga terbenam (boleh selepas Maghrib). Tap lingkaran hitungan sesuai jumlah anjuran. 🤍","Morning dhikr after Fajr until sunrise; evening dhikr after Asr until sunset (allowed after Maghrib). Tap the counter circle the recommended number of times. 🤍"],
["Teks Arab (Al-Qur'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.","Arabic text (Qur'an & Hadith) = public domain. Transliteration & Indonesian translation = original work of this app, released CC0 / public domain for unrestricted use by the ummah."],
["Rekap otomatis 7 hari terakhir — unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular!","Auto recap of the last 7 days — download as a 9:16 image, post to IG Story / WA Status, and spread the motivation!"],
["Gambar 9:16 dengan branding NYALA — siap tempel ke IG Story / Status WA.","9:16 image with NYALA branding — ready to post to IG Story / WA Status."],
["Kerjaan jalan, sholat tetap nomor satu. Murottal tetap mengalun walau kamu pindah menu. 🕌","Work goes on, prayer stays number one. Murottal keeps flowing even when you switch menus. 🕌"],
["Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!","Small habits repeated = big change. Check today off, +10 XP per habit!"],
["Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun 🌸","Every finished task grows a new plant. The more you do, the lusher it gets 🌸"],
["Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!","Mind blank? Let the wheel choose. Spin, then go without thinking!"],
["Apa pun hasilnya, kerjakan sekarang — maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti.","Whatever it lands on, do it now — max 2 minutes. No overthinking, no later."],
["Rahasianya: mulai dari yang paling kecil. Centang satu, dapat XP + konfeti. Serius. ⭐ = prioritas selalu di atas · ▲▼ atau tahan ⠿ lalu seret = atur urutan · tap teks tugas = edit typo ✏️.","The trick: start with the smallest. Tick one, earn XP + confetti. Seriously. ⭐ = priority always on top · ▲▼ or hold ⠿ and drag = reorder · tap task text = edit typo ✏️."],
["Pilih keadaanmu — Allah sudah menyiapkan ayatnya untukmu. 🤍","Pick your state — Allah has prepared verses for you. 🤍"],
["Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = +25 XP!","Tap a surah: grey = not yet, rose = in progress, gold = memorized. Marking memorized = +25 XP!"],
["Lengkap dengan teks Arab, latin, arti, manfaat, dan sumbernya. 🤲","Complete with Arabic text, transliteration, meaning, benefits, and sources. 🤲"],
["Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu. 🤍","Write 3 small things you're grateful for today — saved automatically on your phone. 🤍"],
["🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!","🌸 MashaAllah, today's gratitude is complete. May it become a beautiful habit!"],
["Angka besar = tanggal · lencana emas = jumlah tugas beres hari itu.","Big number = date · gold badge = tasks done that day."],
["Selesai satu sesi = +30 XP (Deep Focus sampai +100 XP) dan tomat 🍅 masuk koleksi.","Finish one session = +30 XP (Deep Focus up to +100 XP) and a tomato 🍅 joins your collection."],
["Nggak mood? Kilat 2 menit. Lagi ambis? Deep Focus 50/90 menit","Not in the mood? 2-min blitz. Feeling ambitious? Deep Focus 50/90 min"],
["Sore gini enak buat beresin satu hal kecil 🍵","Evenings like this are perfect for finishing one small thing 🍵"],
["Matahari udah start duluan. Yuk mulai pelan-pelan 🌅","The sun already started. Let's begin slowly 🌅"],
["Energi masih ada — gas tipis-tipis aja ☀️","Energy is still there — just go gently ☀️"],
["Malam bukan alasan mager. Satu langkah kecil cukup 🌙","Night is no excuse to laze. One small step is enough 🌙"],
["Cek dulu: gimana energimu sekarang?","First, how's your energy right now?"],
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
["Masih benih nih — siram dengan satu tugas kecil 🌰","Still a seed — water it with one small task 🌰"],
["Kecambah pertama muncul! Jangan berhenti 🌱","First sprout! Don't stop 🌱"],
["Akarmu menguat, lanjutkan ritmenya 🌿","Your roots strengthen, keep the rhythm 🌿"],
["Daunnya rimbun — fokusmu juga 🍃","Leaves are lush — so is your focus 🍃"],
["Mulai berbunga. Kamu keren! 🌷","Blooming now. You're awesome! 🌷"],
["Kebunmu hampir jadi hutan! 🌳","Your garden is almost a forest! 🌳"],
["Legendaris. Kebunmu subur maksimal 🏆","Legendary. Your garden is fully thriving 🏆"],
["\"Mulai aja dulu. Sempurnanya sambil jalan.\"","\"Just start. Perfect it along the way.\""],
["\"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat.\"","\"You don't have to be great to start, but you have to start to be great.\""],
["\"Sedikit demi sedikit, lama-lama jadi bukit.\"","\"Little by little, eventually it becomes a mountain.\""],
["\"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak.\"","\"Discipline is choosing between what you want now and what you want most.\""],
["\"Rahasia untuk maju adalah memulai.\"","\"The secret of getting ahead is getting started.\""],
["\"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.\"","\"Life is like riding a bicycle. To keep balance, you must keep moving.\""],
["\"Perjalanan seribu mil dimulai dari satu langkah.\"","\"A journey of a thousand miles begins with a single step.\""],
["\"Fokus pada progres, bukan kesempurnaan.\"","\"Focus on progress, not perfection.\""],
["\"Mager itu wajar. Menyerah itu pilihan — dan kamu nggak harus milih itu.\"","\"Feeling lazy is normal. Giving up is a choice — and you don't have to make it.\""],
["\"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood.\"","\"Productive people aren't always motivated; they keep going even when they're not.\""],
["\"Yang berat itu bukan pekerjaannya, tapi memulainya.\"","\"The hard part isn't the work — it's starting.\""],
["Kemarin kamu beresin ","Yesterday you finished "],
[" tugas. Keren!"," tasks. Nice!"],
["Kemarin belum ada catatan — hari ini kita mulai!","No record yesterday — let's start today!"],
["Hari baru, lembaran baru. Satu tugas kecil pun berarti!","New day, fresh page. Even one small task counts!"],
["Tidak ada tugas tercatat hari itu.","No tasks recorded that day."],
["🌸 Syukur hari itu:","🌸 Gratitude that day:"],
["📥 Bawa tugas belum selesai ke hari ini","📥 Carry unfinished tasks to today"],
["Sebelum mulai, siapa nama panggilanmu?","Before we start, what should we call you?"],
["Selamat datang di NYALA","Welcome to NYALA"],
["Mulai ulang dari nol (hapus semua data)","Start from zero (delete all data)"],
["Yakin mau menghapus SEMUA data NYALA di perangkat ini?","Sure you want to delete ALL NYALA data on this device?"],
["Beneran yakin? Streak dan XP-mu akan hilang 😢","Really sure? Your streak and XP will be gone 😢"],
["Pulihkan data dari cadangan ","Restore data from backup "],
["? Data saat ini akan ditimpa.","? Current data will be overwritten."],
["Cadangan terunduh! Simpan file-nya di tempat aman 💾","Backup downloaded! Store the file somewhere safe 💾"],
["Tips: cadangkan datamu lewat tombol di bawah halaman ya.","Tip: back up your data via the button at the bottom of the page."],
["Gambar tersimpan! Tinggal upload ke IG Story 📸","Image saved! Just upload to IG Story 📸"],
["Dibuat dengan NYALA — produktif pelan-pelan","Made with NYALA — productive, slowly but surely"],
["Laporan produktivitas pekan ini","This week's productivity report"],
["NYALA — Sepekan Barakahku","NYALA — My Barakah Week"],
["Hari konsisten: ≥70% tugas beres! 🔥","Consistent day: ≥70% tasks done! 🔥"],
["Fokus sampai adzan tuntas! Waktunya sholat 🕌","Focus until adhan complete! Time to pray 🕌"],
["Mode kilat 2 menit beres! ⚡","2-minute blitz complete! ⚡"],
["Deep Focus 50 menit tuntas! Ambis! 🚀","Deep Focus 50 min complete! Ambitious! 🚀"],
["Deep Focus 90 menit tuntas! LEGENDARIS! 🚀","Deep Focus 90 min complete! LEGENDARY! 🚀"],
["Satu sesi fokus tuntas! 🍅","One focus session complete! 🍅"],
["Rehat selesai. Segar? Lanjut gas!","Break over. Refreshed? Keep going!"],
["Jeda dulu, tarik napas 🌬️","Pause first, take a breath 🌬️"],
["⏱️ Timer-mu masih jalan dari tadi — semangat!","⏱️ Your timer is still running from earlier — keep going!"],
["Timer diset sampai adzan ","Timer set until adhan "],
["Lokasi terdeteksi! Jadwal & metode disesuaikan 📍","Location detected! Schedule & method adjusted 📍"],
["Lokasi terdeteksi! Jadwal disesuaikan 📍","Location detected! Schedule adjusted 📍"],
["GPS ditolak — pilih kota manual ya 🙏","GPS denied — pick a city manually 🙏"],
["Jadwal & metode dihitung ulang ✅","Schedule & method recalculated ✅"],
["Jadwal dihitung ulang ✅","Schedule recalculated ✅"],
["Koreksi jadwal adzan (menit). Contoh: -2 atau 3","Adjust adhan schedule (minutes). E.g. -2 or 3"],
["Dihitung otomatis di perangkat (metode Kemenag: Subuh 20°, Isya 18°).","Calculated automatically on-device (Kemenag method: Fajr 20°, Isha 18°)."],
["metode Kemenag: Subuh 20°, Isya 18°.","Kemenag method: Fajr 20°, Isha 18°."],
["· metode Kemenag · koreksi ","· Kemenag method · correction "],
[" mnt via ⚙️"," min via ⚙️"],
["📍 Lokasimu (GPS)","📍 Your location (GPS)"],
["📍 Otomatis (GPS saya)","📍 Automatic (my GPS)"],
["🌐 Auto (dari lokasiku)","🌐 Auto (from my location)"],
["Jumhur (Syafi‘i/Maliki/Hanbali)","Majority (Shafi'i/Maliki/Hanbali)"],
["Muslim World League (Eropa/Afrika/Asia umum)","Muslim World League (Europe/Africa/General Asia)"],
["ISNA (Amerika Utara)","ISNA (North America)"],
["Egyptian GA (Mesir/Sudan/Levant)","Egyptian GA (Egypt/Sudan/Levant)"],
["Umm al-Qura (Arab Saudi)","Umm al-Qura (Saudi Arabia)"],
["Diyanet (Turki/Balkan/Rusia/Asia Tengah)","Diyanet (Turkey/Balkans/Russia/Central Asia)"],
["Kemenag RI / MUIS SG / JAKIM MY","Kemenag ID / MUIS SG / JAKIM MY"],
["Target dzikir harianmu — tap lingkaran untuk berdzikir.","Your daily dhikr target — tap the circle to count."],
["Total dzikir hari ini: ","Today's dhikr total: "],
["📿 Tasbih Digital","📿 Digital Tasbih"],
["🕌 Fokus Sampai Adzan","🕌 Focus Until Adhan"],
["📋 Skor Hari Ini","📋 Today's Score"],
["🔋 Baterai semangat","🔋 Motivation battery"],
["⚡ Gas 2 Menit","⚡ 2-Min Blitz"],
["🎲 Bingung mulai?","🎲 Not sure where to start?"],
["🌱 Intip Kebunku","🌱 Peek my Garden"],
["🌸 3 Hal yang Disyukuri Hari Ini","🌸 3 Things to Be Grateful for Today"],
["🗓️ Jejak 14 hari terakhir","🗓️ Last 14 days trail"],
["(tap tanggal untuk rincian)","(tap a date for details)"],
["01 · MISI HARIAN","01 · DAILY MISSION"],
["Papan Tugas Anti-Mager","Anti-Lazy Task Board"],
["02 · MODE FOKUS","02 · FOCUS MODE"],
["Timer Nyalakan Fokus","Light-Up Focus Timer"],
["Pilih ritmemu 🎧","Pick your rhythm 🎧"],
["03 · SPIRITUAL CORNER","03 · SPIRITUAL CORNER"],
["Produktif Dunia, Tenang Ibadah","Productive in Life, Calm in Worship"],
["04 · RITUAL HARIAN","04 · DAILY RITUAL"],
["Pelacak Kebiasaan","Habit Tracker"],
["05 · BUKTI PROGRES","05 · PROOF OF PROGRESS"],
["Kebun Nyalamu","Your Light-Up Garden"],
["06 · ANTI BINGUNG","06 · ANTI-OVERWHELM"],
["Roda Semangat","Motivation Wheel"],
["Putar rodanya 🎰","Spin the wheel 🎰"],
["07 · LAPORAN MINGGUAN","07 · WEEKLY REPORT"],
["Sepekan Barakahku","My Barakah Week"],
["🎡 PUTAR SEKARANG","🎡 SPIN NOW"],
["✅ Jadikan tugas","✅ Make it a task"],
["Kerjakan sekarang, maksimal 2 menit ⏱️","Do it now, max 2 minutes ⏱️"],
["📸 Unduh Gambar","📸 Download Image"],
["📤 Share ke Story","📤 Share to Story"],
["🔀 Kocok semangat lagi","🔀 Shuffle motivation"],
["💾 Cadangkan data","💾 Back up data"],
["📂 Pulihkan data","📂 Restore data"],
["➕ Kebiasaan baru:","➕ New habit:"],
["Tambah Kebiasaan","Add Habit"],
["Tandai Beres Hari Ini","Mark Done Today"],
["✔ Hari ini beres!","✔ Done today!"],
["misal: Tilawah 1 halaman","e.g. Read 1 page"],
["TUGAS SELESAI SEPANJANG MASA","TASKS DONE ALL-TIME"],
["MENIT FOKUS TERKUMPUL","FOCUS MINUTES COLLECTED"],
["HARI BERUNTUN CHECK-IN","CONSECUTIVE CHECK-IN DAYS"],
["✅ TUGAS BERES","✅ TASKS DONE"],
["⏱️ MENIT FOKUS","⏱️ FOCUS MINUTES"],
["🌿 HABIT TERCEKLIS","🌿 HABITS CHECKED"],
["📿 DZIKIR","📿 DHIKR"],
["PROGRESS HARIAN (%)","DAILY PROGRESS (%)"],
["AKTIVITAS PER HARI","DAILY ACTIVITY"],
["TUGAS BERES","TASKS DONE"],
["MENIT FOKUS","FOCUS MINUTES"],
["HABIT TERCEKLIS","HABITS CHECKED"],
["DZIKIR","DHIKR"],
["🍅 Fokus 25","🍅 Focus 25"],
["⚡ Kilat 2","⚡ Blitz 2"],
["🌿 Rehat 5","🌿 Break 5"],
["🔥 Deep 50","🔥 Deep 50"],
["🚀 Deep 90","🚀 Deep 90"],
["⏱️ Atur:","⏱️ Set:"],
["Pakai","Use"],
["▶ Mulai","▶ Start"],
["↺ Ulang","↺ Reset"],
["Koleksi hari ini: ","Today's collection: "],
["belum ada — ayo mulai!","none yet — let's go!"],
["+ Tambah","+ Add"],
["⭐ Prioritas","⭐ Priority"],
["Papan masih kosong nih…","The board is still empty…"],
["Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!","Tap a suggestion above, or write your own. Start small!"],
["Tulis satu hal kecil… (misal: balas 1 email)","Write one small thing… (e.g. reply to 1 email)"],
["💧 Minum segelas air","💧 Drink a glass of water"],
["🧹 Rapikan meja 2 menit","🧹 Tidy desk for 2 min"],
["📖 Baca 1 halaman buku","📖 Read 1 page"],
["💬 Balas 1 chat tertunda","💬 Reply to 1 pending chat"],
["🙆 Stretching ringan","🙆 Light stretching"],
["Minum segelas air","Drink a glass of water"],
["Rapikan meja 2 menit","Tidy desk for 2 min"],
["Baca 1 halaman buku","Read 1 page"],
["Balas 1 chat tertunda","Reply to 1 pending chat"],
["Stretching ringan","Light stretching"],
["Push-up / squat 5 kali","Push-up / squat 5 times"],
["Tulis 3 hal yang kamu syukuri","Write 3 things you're grateful for"],
["Stretching leher & bahu 1 menit","Neck & shoulder stretch 1 min"],
["Kirim pesan semangat ke 1 teman","Send an encouraging message to 1 friend"],
["Napas 4-7-8 tiga putaran","4-7-8 breathing, three rounds"],
["Misi roda masuk ke papan! Gas! 🚀","Wheel mission added to board! Go! 🚀"],
["Ditambahkan! Sekarang gas kerjakan 🚀","Added! Now go do it 🚀"],
["⚡ Mode kilat nyala! 2 menit aja, janji.","⚡ Blitz mode on! Just 2 minutes, promise."],
["⭐ Ditandai prioritas — naik ke atas!","⭐ Marked priority — moved to top!"],
["Prioritas dilepas","Priority removed"],
["⭐ Tugas prioritas selalu di kelompok atas","⭐ Priority tasks always stay in the top group"],
["🔀 Urutan tugas diperbarui","🔀 Task order updated"],
["✏️ Tugas diperbarui","✏️ Task updated"],
["Tugas tidak boleh kosong 😅","Task can't be empty 😅"],
["Tulis dulu tugasnya ya ✍️","Write the task first ✍️"],
["Tulis tugasnya dulu, lalu tandai ⭐","Write the task first, then mark ⭐"],
["Edit tugas:","Edit task:"],
["Berapa menit? (1–180, bebas — mis. 23)","How many minutes? (1–180, free — e.g. 23)"],
["Angka diset: ","Minutes set: "],
[" menit — tap \"Pakai\" untuk mulai ⏱️"," min — tap \"Use\" to start ⏱️"],
["⏱️ Timer custom ","⏱️ Custom timer "],
[" menit siap. Gas!"," min ready. Go!"],
["Timer diulang ↺","Timer reset ↺"],
["Siapa nama panggilanmu? 😊","What should we call you? 😊"],
["Siap, ","Ready, "],
["! Kita nyala bareng 🔥","! Let's light up together 🔥"],
["Halo, ","Hello, "],
["! Ayo nyalakan harimu ✨","! Let's light up your day ✨"],
["Kebiasaan baru ditanam! 🌱","New habit planted! 🌱"],
["Isi dulu nama kebiasaannya ✍️","Fill the habit name first ✍️"],
["Hapus kebiasaan \"","Delete habit \""],
["\"?","\"?"],
["Data dipulihkan! Memuat ulang… 📂","Data restored! Reloading… 📂"],
["File cadangan tidak valid 😔","Invalid backup file 😔"],
["Gagal membaca file cadangan 😔","Failed to read backup file 😔"],
["Gagal membuat cadangan 😔","Failed to create backup 😔"],
["Gagal membuat gambar 😔","Failed to create image 😔"],
["🎉 NAIK LEVEL! Sekarang: ","🎉 LEVEL UP! Now: "],
["XP lagi ke Lv.","XP to reach Lv."],
["LEVEL MAKSIMAL! 👑","MAX LEVEL! 👑"],
["Kaum Rebahan 🛋️","Couch Crew 🛋️"],
["Mulai Geliat 🥱","Starting to Stir 🥱"],
["Pemanasan ☕","Warming Up ☕"],
["Mode Gas ⚡","Gas Mode ⚡"],
["Pejuang Fokus 🔥","Focus Fighter 🔥"],
["Pendekar Produktif ⚔️","Productivity Warrior ⚔️"],
["Master Anti-Mager 👑","Anti-Lazy Master 👑"],
["Mode mager terdeteksi","Lazy mode detected"],
["Mode hemat energi","Energy-saver mode"],
["Mode stabil","Stable mode"],
["Mode cerah","Sunny mode"],
["Mode turbo!","Turbo mode!"],
["Mager banget","So lazy"],
["Capek","Tired"],
["Biasa aja","Meh"],
["Senang","Happy"],
["Semangat membara","On fire"],
["SELAMAT PAGI ☀️","GOOD MORNING ☀️"],
["SELAMAT SIANG 🌤️","GOOD AFTERNOON 🌤️"],
["SELAMAT SORE 🌇","GOOD EVENING 🌇"],
["SELAMAT MALAM 🌙","GOOD NIGHT 🌙"],
["Satu langkah kecil hari ini.","One small step today."],
["Hei, ","Hey, "],
["beres hari ini","done today"],
[" tugas · "," tasks · "],
[" sesi fokus · ⏱ "," focus sessions · ⏱ "],
[" menit"," min"],
[" tugas total"," tasks total"],
[" habit aktif"," active habits"],
[" hari konsisten"," consistent days"],
[" hari"," days"],
["Selasa","Tuesday"],["Senin","Monday"],["Rabu","Wednesday"],["Kamis","Thursday"],["Jumat","Friday"],["Sabtu","Saturday"],["Minggu","Sunday"],
["Jan","Jan"],["Feb","Feb"],["Mar","Mar"],["Apr","Apr"],["Mei","May"],["Jun","Jun"],["Jul","Jul"],["Agu","Aug"],["Sep","Sep"],["Okt","Oct"],["Nov","Nov"],["Des","Dec"],
["Hari Ini","Today"],["Tugas","Tasks"],["Fokus","Focus"],["Spiritual","Spiritual"],["Kebiasaan","Habits"],["Kebun","Garden"],["Roda","Wheel"],["Laporan","Report"],
["📿 Dzikir","📿 Dhikr"],["🕌 Qur'an","🕌 Qur'an"],
["← NYALA","← NYALA"],
["📿 DZIKIR PAGI & PETANG","📿 MORNING & EVENING DHIKR"],
["TAMAN QUR'AN","QUR'AN GARDEN"],
["A · BACA & DENGAR","A · READ & LISTEN"],
["Mushaf Digital 114 Surah / 30 Juz","Digital Mushaf · 114 Surahs / 30 Juz"],
["Baca sendiri atau baca bareng murottal. 📖","Read alone or recite along with murottal. 📖"],
["Per Surah","Per Surah"],["Per Juz","Per Juz"],
["📖 Baca Sendiri","📖 Read Alone"],["🎧 Baca Bareng","🎧 Recite Along"],
["▶ Murottal Surah","▶ Surah Murottal"],["▶ Mulai Baca Bareng","▶ Start Reciting Along"],["⏹ Berhenti","⏹ Stop"],["▶ dengar","▶ listen"],
["B · AYAT UNTUK HATIMU","B · VERSES FOR YOUR HEART"],
["Sedang Merasa Apa?","How Are You Feeling?"],
["😢 Sedih","😢 Sad"],["😰 Cemas","😰 Anxious"],["🥰 Bersyukur","🥰 Grateful"],["🌾 Butuh Sabar","🌾 Need Patience"],["💼 Memohon Rezeki","💼 Seeking Provision"],["🌙 Merasa Sendiri","🌙 Feeling Alone"],["🤍 Meminta Ampun","🤍 Seeking Forgiveness"],["🛡️ Ingin Terlindungi","🛡️ Wanting Protection"],
["C · TRACKER HAFALAN","C · MEMORIZATION TRACKER"],
["Perjalanan Huffaz-mu 🏆","Your Huffaz Journey 🏆"],
["Belum","Not yet"],["Proses","In progress"],["Hafal","Memorized"],
[" surah dihafal"," surahs memorized"],
[" — Masya Allah, Khatam Hafizh! 🏆"," — MashaAllah, Khatam Hafizh! 🏆"],
["D · DOA-DOA","D · SUPPLICATIONS"],
["Doa Sehari-hari, Nabi & Masa Kini","Everyday, Prophetic & Modern Duas"],
["🌤️ Sehari-hari","🌤️ Everyday"],["🕌 Doa Para Nabi","🕌 Prophetic Duas"],["🕰️ Masa Kini","🕰️ Modern"],
["✨ Manfaat: ","✨ Benefit: "],["📚 Sumber: ","📚 Source: "],
["Kolaborasi: ","Collaboration: "],
["🔄 Memuat…","🔄 Loading…"],["📦 Memuat data…","📦 Loading data…"],["📥 Mengunduh data…","📥 Downloading data…"],
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
["Segala puji bagi Allah, Tuhan semesta alam.","All praise is due to Allah, Lord of the worlds."],
["Maha Pemurah lagi Maha Penyayang.","The Most Gracious, the Most Merciful."],
["Yang menguasai di Hari Pembalasan.","Master of the Day of Judgment."],
["Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan.","You alone we worship, and You alone we ask for help."],
["Tunjukilah kami jalan yang lurus,","Guide us to the straight path,"],
["(yaitu) Jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.","The path of those You have blessed, not of those who earned anger, nor of those who went astray."],
["Madaniyah","Medinan"],["Makkiyah","Meccan"],
[" ayat"," verses"],
["Waktu utama:","Prime time:"],
["Lisensi:","License:"],
["🌅 Pagi","🌅 Morning"],["🌇 Petang","🌇 Evening"],
[" selesai"," done"],
[" — Masya Allah, lengkap! 🌹"," — MashaAllah, complete! 🌹"],
["Dzikir selesai 📿","Dhikr complete 📿"],
["Dzikir pagi lengkap! 🌹","Morning dhikr complete! 🌹"],
["Dzikir petang lengkap! 🌹","Evening dhikr complete! 🌹"],
["Hitung dzikir ","Count dhikr "],
["Ayat Kursi","Ayat al-Kursi"],
["Pembuka: Kerajaan Milik Allah","Opening: Sovereignty Belongs to Allah"],
["Sayyidul Istighfar (Penghulu Istighfar)","Sayyidul Istighfar (The Master of Seeking Forgiveness)"],
["Penyerahan Diri","Submission of Oneself"],
["Persaksian Tauhid","Testimony of Tawhid"],
["Mohon Kesehatan","Seeking Wellbeing"],
["Cukuplah Allah","Allah Is Sufficient"],
["Perlindungan dari Bahaya","Protection from Harm"],
["Ridha kepada Allah","Contentment with Allah"],
["Mohon Pertolongan","Seeking Help"],
["Shalawat kepada Nabi ﷺ","Salawat upon the Prophet ﷺ"],
["Tasbih 100 Kali","Tasbih 100 Times"],
["Tauhid 10 Kali","Tawhid 10 Times"],
["Tasbih Timbangan Arsy (khusus pagi)","Tasbih Weighing the Throne (morning only)"],
["Mohon Ilmu & Rezeki (khusus pagi)","Seeking Knowledge & Provision (morning only)"],
["Istighfar 100 Kali (harian)","Istighfar 100 Times (daily)"],
["ADZAN ","ADHAN "],
["Adzan ","Adhan "],
[" (besok)"," (tomorrow)"],
[" jam "," h "],[" mnt "," min "],[" dtk lagi"," s left"],
["Menghitung…","Calculating…"],
["Subuh","Fajr"],["Dzuhur","Dhuhr"],["Ashr","Asr"],["Maghrib","Maghrib"],["Isya","Isha"],
["MANTRA NYALA","NYALA MANTRA"],
["PERIBAHASA INDONESIA","INDONESIAN PROVERB"],
["TIM NYALA","NYALA TEAM"],
["Klik untuk ganti nama","Click to rename"],
["Suara nyala — tap untuk matikan","Sound on — tap to mute"],
["Suara mati — tap untuk nyalakan","Sound off — tap to unmute"],
["Streak check-in harianmu","Your daily check-in streak"],
["Tahan & seret untuk menggeser urutan","Hold & drag to reorder"],
["Geser urutan tugas","Reorder task"],
["Batalkan selesai","Undo done"],
["Tandai selesai","Mark done"],
["Hapus status prioritas","Remove priority"],
["Tandai sebagai prioritas","Mark as priority"],
["Geser naik","Move up"],["Geser turun","Move down"],
["Hapus tugas","Delete task"],["Hapus kebiasaan","Delete habit"],
["Tap untuk memperbaiki typo / mengedit tugas ✏️","Tap to fix a typo / edit task ✏️"],
["Kurangi 1 menit","Minus 1 minute"],["Tambah 1 menit","Plus 1 minute"],
["Tap untuk ketik angka persis, mis. 23","Tap to type exact minutes, e.g. 23"],
["Pilih kota atau GPS","Choose city or GPS"],
["Hitung ulang jadwal","Recalculate schedule"],
["Koreksi menit jadwal adzan","Adjust adhan minutes"],
["Ketik namamu di sini…","Type your name here…"],
["Mulai Nyala 🔥","Start Lighting Up 🔥"],
["Lewati dulu","Skip for now"],
["Tutup","Close"],
["🔕 Suara efek dimatikan.","🔕 Sound effects muted."],
["🔔 Suara efek dinyalakan.","🔔 Sound effects unmuted."],
["🎧 Murottal tetap mengalun di latar belakang.","🎧 Murottal keeps playing in the background."],
["⏹ Murottal dihentikan.","⏹ Murottal stopped."],
["📥 ","📥 "],
[" tugas dibawa ke hari ini. Semangat!"," tasks carried to today. Keep going!"],
["Contoh: hujan reda tepat sebelum berangkat…","Example: the rain stopped right before leaving…"],
["Contoh: ada teman yang menyapa dulu…","Example: a friend greeted me first…"],
["Contoh: tubuhku kuat puasa hari ini…","Example: my body stayed strong fasting today…"],
["1. Contoh: ","1. Example: "],["2. Contoh: ","2. Example: "],["3. Contoh: ","3. Example: "],
["GAS!","GO!"],
["Menit","Minutes"],
["Custom · ","Custom · "],
[" mnt"," min"],
["Menuju Adzan ","Until Adhan "],
["Fokus","Focus"],["Kilat","Blitz"],["Rehat","Break"],
["belum","not yet"],["proses 🌱","in progress 🌱"],["hafal 🏆","memorized 🏆"],
[" HAFAL! 🏆"," MEMORIZED! 🏆"],
["Sudah hafal","Already memorized"],
["Target ","Target "],
[" tercapai! 📿"," reached! 📿"],
["Prioritas beres! 🌟","Priority done! 🌟"],
["Satu tugas tumbang!","One task down!"],
["Check-in mood dulu ☺️","Mood check-in first ☺️"],
["Syukur hari ini lengkap 🌸","Today's gratitude complete 🌸"],
["Habit \"","Habit \""],
["\" beres! 💪","\" done! 💪"],
["Mantap! ✨","Awesome! ✨"],
["Indonesia","Indonesia"],["English","English"]
];
PAIRS.sort(function(a,b){return b[0].length-a[0].length;});
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
var RX=PAIRS.map(function(p){return [new RegExp(esc(p[0]),'g'),p[1]];});
var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
var SKIP='.arabic,.doa-ar,.latin,.doa-la,.surah-info .ar,[data-no-i18n],.nyalaHafDate,#nyalaLangSel';

function toEN(t){
  if(!t||AR.test(t))return t;
  var s=t.trim();
  if(!s)return t;
  for(var i=0;i<PAIRS.length;i++){if(PAIRS[i][0]===s)return t.replace(s,PAIRS[i][1]);}
  var out=t;
  for(var j=0;j<RX.length;j++){out=out.replace(RX[j][0],RX[j][1]);}
  var extra=window.NYALA_EN_DUA||{},extra2=window.NYALA_EN_DZIKR||{};
  var k=out.trim();
  if(extra[k]!=null)out=out.replace(k,extra[k]);
  else if(extra2[k]!=null)out=out.replace(k,extra2[k]);
  return out;
}

var origText=new WeakMap(),origAttr=new WeakMap();
function protectedNode(n){
  var e=n.parentElement;
  while(e&&e!==document.body){
    if(e.matches&&e.matches(SKIP))return true;
    e=e.parentElement;
  }
  return false;
}
function walkText(root){
  if(!root)return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    if(protectedNode(n))return NodeFilter.FILTER_REJECT;
    var p=n.parentElement;
    if(p&&/^(SCRIPT|STYLE|TEXTAREA|INPUT|CANVAS)$/.test(p.tagName))return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }});
  var list=[],n;
  while((n=w.nextNode()))list.push(n);
  var L=lang();
  for(var i=0;i<list.length;i++){
    var node=list[i],cur=node.nodeValue;
    if(!cur||!cur.trim())continue;
    if(AR.test(cur))continue;
    var base;
    if(origText.has(node)){base=origText.get(node);}
    else{base=cur;origText.set(node,cur);}
    var want=(L==='en')?toEN(base):base;
    if(cur!==want)node.nodeValue=want;
  }
}
function walkAttrs(){
  var L=lang();
  var els=document.querySelectorAll('[placeholder],[title],[aria-label]');
  for(var i=0;i<els.length;i++){
    var el=els[i];
    if(el.id==='nyalaLangSel')continue;
    if(el.matches&&el.matches(SKIP))continue;
    var store=origAttr.get(el);
    if(!store){store={};origAttr.set(el,store);}
    var attrs=['placeholder','title','aria-label'];
    for(var a=0;a<attrs.length;a++){
      var key=attrs[a],v=el.getAttribute(key);
      if(v==null)continue;
      if(AR.test(v))continue;
      if(!(key in store))store[key]=v;
      var base=store[key];
      var want=(L==='en')?toEN(base):base;
      if(v!==want)el.setAttribute(key,want);
    }
  }
}
function fixTitle(){
  var t=document.title;
  if(!t)return;
  if(!window.__nyalaTitleOrig)window.__nyalaTitleOrig=t;
  var base=window.__nyalaTitleOrig;
  if(lang()==='en'){var w=toEN(base);if(t!==w)document.title=w;}
  else if(t!==base)document.title=base;
}
var pend=false,mo=null;
function run(){
  pend=false;
  document.documentElement.lang=(lang()==='en'?'en':'id');
  walkText(document.body);
  walkAttrs();
  fixTitle();
}
function schedule(){if(pend)return;pend=true;requestAnimationFrame(run);}
function apply(){
  run();
  if(mo)mo.disconnect();
  mo=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var m=muts[i];
      if(m.type==='characterData'&&origText.has(m.target))continue;
      schedule();return;
    }
    schedule();
  });
  mo.observe(document.body,{childList:true,subtree:true,characterData:true});
}
function setLang(l){
  try{localStorage.setItem(LANG,l==='en'?'en':'id');}catch(e){}
  var sel=document.getElementById('nyalaLangSel');
  if(sel&&sel.value!==lang())sel.value=lang();
  apply();
  try{window.dispatchEvent(new CustomEvent('nyala:lang',{detail:lang()}));}catch(e){}
}
function ensureSwitch(){
  var sel=document.getElementById('nyalaLangSel');
  if(!sel){
    sel=document.createElement('select');
    sel.id='nyalaLangSel';
    sel.className='chip';
    sel.setAttribute('data-no-i18n','1');
    sel.setAttribute('aria-label','Language / Bahasa');
    var o1=document.createElement('option');o1.value='id';o1.textContent='🇮🇩 Indonesia';
    var o2=document.createElement('option');o2.value='en';o2.textContent='🇬🇧 English';
    sel.appendChild(o1);sel.appendChild(o2);
    var anchor=document.querySelector('.chips')||document.querySelector('header .top-in')||document.querySelector('header')||document.body;
    if(anchor===document.body)sel.style.cssText='position:fixed;top:8px;right:8px;z-index:9999;';
    anchor.appendChild(sel);
  }
  sel.setAttribute('data-no-i18n','1');
  if(!sel.options.length){
    var a=document.createElement('option');a.value='id';a.textContent='🇮🇩 Indonesia';
    var b=document.createElement('option');b.value='en';b.textContent='🇬🇧 English';
    sel.appendChild(a);sel.appendChild(b);
  }
  sel.value=lang();
  if(!sel.__nyalaBound){
    sel.__nyalaBound=true;
    sel.addEventListener('change',function(){setLang(sel.value);});
  }
  if(!document.getElementById('nyalaLangStyle')){
    var st=document.createElement('style');st.id='nyalaLangStyle';
    st.textContent='#nyalaLangSel{cursor:pointer;font-weight:700;max-width:150px}';
    document.head.appendChild(st);
  }
}
window.NYALA_I18N={lang:lang,set:setLang,refresh:schedule,extend:function(){schedule();}};
setInterval(function(){if(lang()==='en')fixTitle();},1200);
function boot(){ensureSwitch();apply();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
