// nyala-i18n.js — Poin 5 (chrome ID<->EN) + dropdown bahasa + proteksi Arab/translit + hook konten. Drop-in, gagal-aman.
(function(){
'use strict';
var LANG='nyala_lang';
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
function setLang(l){try{localStorage.setItem(LANG,l==='en'?'en':'id');}catch(e){}apply();window.dispatchEvent(new CustomEvent('nyala:lang',{detail:l}));}

// ===== KAMUS CHROME (whole-node exact match) =====
var DICT={
 "Produktif Anti-Mager":"Productive Anti-Lazy",
 "Hari Ini":"Today","Tugas":"Tasks","Fokus":"Focus","Spiritual":"Spiritual","Kebiasaan":"Habits","Kebun":"Garden","Roda":"Wheel","Laporan":"Report","📿 Dzikir":"📿 Dhikr","🕌 Qur'an":"🕌 Qur'an",
 "← NYALA":"← NYALA","📿 DZIKIR PAGI & PETANG":"📿 MORNING & EVENING DHIKR","TAMAN QUR'AN":"QUR'AN GARDEN",
 "A · BACA & DENGAR":"A · READ & LISTEN","Mushaf Digital 114 Surah / 30 Juz":"Digital Mushaf · 114 Surahs / 30 Juz","Baca sendiri atau baca bareng murottal. 📖":"Read alone or recite along with murottal. 📖",
 "Per Surah":"Per Surah","Per Juz":"Per Juz","📖 Baca Sendiri":"📖 Read Alone","🎧 Baca Bareng":"🎧 Recite Along","▶ Murottal Surah":"▶ Surah Murottal","▶ Mulai Baca Bareng":"▶ Start Reciting Along","⏹ Berhenti":"⏹ Stop","▶ dengar":"▶ listen",
 "B · AYAT UNTUK HATIMU":"B · VERSES FOR YOUR HEART","Sedang Merasa Apa?":"How Are You Feeling?",
 "😢 Sedih":"😢 Sad","😰 Cemas":"😰 Anxious","🥰 Bersyukur":"🥰 Grateful","🌾 Butuh Sabar":"🌾 Need Patience","💼 Memohon Rezeki":"💼 Seeking Provision","🌙 Merasa Sendiri":"🌙 Feeling Alone","🤍 Meminta Ampun":"🤍 Seeking Forgiveness","🛡️ Ingin Terlindungi":"🛡️ Wanting Protection",
 "C · TRACKER HAFALAN":"C · MEMORIZATION TRACKER","Perjalanan Huffaz-mu 🏆":"Your Huffaz Journey 🏆","Belum":"Not yet","Proses":"In progress","Hafal":"Memorized",
 "D · DOA-DOA":"D · SUPPLICATIONS","Doa Sehari-hari, Nabi & Masa Kini":"Everyday, Prophetic & Modern Duas","🌤️ Sehari-hari":"🌤️ Everyday","🕌 Doa Para Nabi":"🕌 Prophetic Duas","🕰️ Masa Kini":"🕰️ Modern",
 "Kolaborasi: Muslimah WFH × Juariah":"Collaboration: Muslimah WFH × Juariah",
 "🔄 Memuat…":"🔄 Loading…","📦 Memuat data…":"📦 Loading data…","📥 Mengunduh data…":"📥 Downloading data…",
 "Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.":"In the name of Allah, the Most Gracious, the Most Merciful.",
 "Ayat Kursi":"Ayat al-Kursi","Al-Ikhlas, Al-Falaq & An-Nas":"Al-Ikhlas, Al-Falaq & An-Nas",
 "Pembuka: Kerajaan Milik Allah":"Opening: Sovereignty Belongs to Allah","Sayyidul Istighfar (Penghulu Istighfar)":"Sayyidul Istighfar (The Master of Seeking Forgiveness)","Penyerahan Diri":"Submission of Oneself","Persaksian Tauhid":"Testimony of Tawhid","Mohon Kesehatan":"Seeking Wellbeing","Cukuplah Allah":"Allah Is Sufficient","Perlindungan dari Bahaya":"Protection from Harm","Ridha kepada Allah":"Contentment with Allah","Mohon Pertolongan":"Seeking Help","Shalawat kepada Nabi ﷺ":"Salawat upon the Prophet ﷺ","Tasbih 100 Kali":"Tasbih 100 Times","Tauhid 10 Kali":"Tawhid 10 Times","Tasbih Timbangan Arsy (khusus pagi)":"Tasbih Weighing the Throne (morning only)","Mohon Ilmu & Rezeki (khusus pagi)":"Seeking Knowledge & Provision (morning only)","Istighfar 100 Kali (harian)":"Istighfar 100 Times (daily)",
 "🌅 Pagi":"🌅 Morning","🌇 Petang":"🌇 Evening",
 "Kaum Rebahan 🛋️":"Couch Crew 🛋️","Mulai Geliat 🥱":"Starting to Stir 🥱","Pemanasan ☕":"Warming Up ☕","Mode Gas ⚡":"Gas Mode ⚡","Pejuang Fokus 🔥":"Focus Fighter 🔥","Pendekar Produktif ⚔️":"Productivity Warrior ⚔️","Master Anti-Mager 👑":"Anti-Lazy Master 👑",
 "Mode mager terdeteksi":"Lazy mode detected","Mode hemat energi":"Energy-saver mode","Mode stabil":"Stable mode","Mode cerah":"Sunny mode","Mode turbo!":"Turbo mode!",
 "🔋 Baterai semangat":"🔋 Motivation battery","⚡ Gas 2 Menit":"⚡ 2-Min Blitz","🎲 Bingung mulai?":"🎲 Not sure where to start?","🌱 Intip Kebunku":"🌱 Peek my Garden","📋 Skor Hari Ini":"📋 Today's Score","beres hari ini":"done today",
 "+ Tambah":"+ Add","⭐ Prioritas":"⭐ Priority","Papan masih kosong nih…":"The board is still empty…",
 "🍅 Fokus 25":"🍅 Focus 25","⚡ Kilat 2":"⚡ Blitz 2","🌿 Rehat 5":"🌿 Break 5","🔥 Deep 50":"🔥 Deep 50","🚀 Deep 90":"🚀 Deep 90","⏱️ Atur:":"⏱️ Set:","Pakai":"Use","▶ Mulai":"▶ Start","↺ Ulang":"↺ Reset","Koleksi hari ini:":"Today's collection:","belum ada — ayo mulai!":"none yet — let's go!",
 "🕌 Fokus Sampai Adzan":"🕌 Focus Until Adhan","Menghitung…":"Calculating…","📍 Lokasimu (GPS)":"📍 Your location (GPS)","📍 Otomatis (GPS saya)":"📍 Automatic (my GPS)",
 "📿 Tasbih Digital":"📿 Digital Tasbih","➕ Kebiasaan baru:":"➕ New habit:","Tambah Kebiasaan":"Add Habit","Tandai Beres Hari Ini":"Mark Done Today","✔ Hari ini beres!":"✔ Done today!",
 "TUGAS SELESAI SEPANJANG MASA":"TASKS DONE ALL-TIME","MENIT FOKUS TERKUMPUL":"FOCUS MINUTES COLLECTED","HARI BERUNTUN CHECK-IN":"CONSECUTIVE CHECK-IN DAYS","GAS!":"GO!","🎡 PUTAR SEKARANG":"🎡 SPIN NOW","✅ Jadikan tugas":"✅ Make it a task",
 "📸 Unduh Gambar":"📸 Download Image","📤 Share ke Story":"📤 Share to Story","🔀 Kocok semangat lagi":"🔀 Shuffle motivation",
 "💾 Cadangkan data":"💾 Back up data","📂 Pulihkan data":"📂 Restore data","Mulai ulang dari nol (hapus semua data)":"Start from zero (delete all data)",
 "Selamat datang di NYALA":"Welcome to NYALA","Mulai Nyala 🔥":"Start Lighting Up 🔥","Lewati dulu":"Skip for now","📥 Bawa tugas belum selesai ke hari ini":"📥 Carry unfinished tasks to today",
 "01 · MISI HARIAN":"01 · DAILY MISSION","Papan Tugas Anti-Mager":"Anti-Lazy Task Board","02 · MODE FOKUS":"02 · FOCUS MODE","Timer Nyalakan Fokus":"Light-Up Focus Timer","Pilih ritmemu 🎧":"Pick your rhythm 🎧","03 · SPIRITUAL CORNER":"03 · SPIRITUAL CORNER","Produktif Dunia, Tenang Ibadah":"Productive in Life, Calm in Worship","04 · RITUAL HARIAN":"04 · DAILY RITUAL","Pelacak Kebiasaan":"Habit Tracker","05 · BUKTI PROGRES":"05 · PROOF OF PROGRESS","Kebun Nyalamu":"Your Light-Up Garden","06 · ANTI BINGUNG":"06 · ANTI-OVERWHELM","Roda Semangat":"Motivation Wheel","Putar rodanya 🎰":"Spin the wheel 🎰","07 · LAPORAN MINGGUAN":"07 · WEEKLY REPORT","Sepekan Barakahku":"My Barakah Week",
 "SELAMAT PAGI ☀️":"GOOD MORNING ☀️","SELAMAT SIANG 🌤️":"GOOD AFTERNOON 🌤️","SELAMAT SORE 🌇":"GOOD EVENING 🌇","SELAMAT MALAM 🌙":"GOOD NIGHT 🌙",
 "Satu langkah kecil hari ini.":"One small step today.","Cek dulu: gimana energimu sekarang?":"First, how's your energy right now?",
 "🌸 3 Hal yang Disyukuri Hari Ini":"🌸 3 Things to Be Grateful for Today","🗓️ Jejak 14 hari terakhir":"🗓️ Last 14 days trail","(tap tanggal untuk rincian)":"(tap a date for details)",
 "AKTIVITAS PER HARI":"DAILY ACTIVITY","PROGRESS HARIAN (%)":"DAILY PROGRESS (%)","TUGAS BERES":"TASKS DONE","MENIT FOKUS":"FOCUS MINUTES","HABIT TERCEKLIS":"HABITS CHECKED","DZIKIR":"DHIKR",
 "Madaniyah":"Medinan","Makkiyah":"Meccan"
};

// ===== FRASA EMBEDDED (substring; urutan panjang-dulu) =====
var PHRASES=[
 "Masih benih nih — siram dengan satu tugas kecil 🌰|Still a seed — water it with one small task 🌰",
 "Kecambah pertama muncul! Jangan berhenti 🌱|First sprout! Don't stop 🌱",
 "Akarmu menguat, lanjutkan ritmenya 🌿|Your roots strengthen, keep the rhythm 🌿",
 "Daunnya rimbun — fokusmu juga 🍃|Leaves are lush — so is your focus 🍃",
 "Mulai berbunga. Kamu keren! 🌷|Blooming now. You're awesome! 🌷",
 "Kebunmu hampir jadi hutan! 🌳|Your garden is almost a forest! 🌳",
 "Legendaris. Kebunmu subur maksimal 🏆|Legendary. Your garden is fully thriving 🏆",
 "\"Mulai aja dulu. Sempurnanya sambil jalan.\"|\"Just start. Perfect it along the way.\"",
 "\"Kamu nggak perlu hebat buat mulai, tapi perlu mulai buat jadi hebat.\"|\"You don't have to be great to start, but you have to start to be great.\"",
 "\"Sedikit demi sedikit, lama-lama jadi bukit.\"|\"Little by little, eventually it becomes a mountain.\"",
 "\"Disiplin adalah memilih antara yang kamu mau sekarang dan yang kamu mau paling banyak.\"|\"Discipline is choosing between what you want now and what you want most.\"",
 "\"Rahasia untuk maju adalah memulai.\"|\"The secret of getting ahead is getting started.\"",
 "\"Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.\"|\"Life is like riding a bicycle. To keep balance, you must keep moving.\"",
 "\"Perjalanan seribu mil dimulai dari satu langkah.\"|\"A journey of a thousand miles begins with a single step.\"",
 "\"Fokus pada progres, bukan kesempurnaan.\"|\"Focus on progress, not perfection.\"",
 "\"Mager itu wajar. Menyerah itu pilihan — dan kamu nggak harus milih itu.\"|\"Feeling lazy is normal. Giving up is a choice — and you don't have to make it.\"",
 "\"Orang produktif bukan yang selalu semangat, tapi yang tetap jalan walau nggak mood.\"|\"Productive people aren't always motivated; they keep going even when they're not.\"",
 "\"Yang berat itu bukan pekerjaannya, tapi memulainya.\"|\"The hard part isn't the work — it's starting.\"",
 "MANTRA NYALA|NYALA MANTRA","PERIBAHASA INDONESIA|INDONESIAN PROVERB","TIM NYALA|NYALA TEAM",
 "Waktu utama:|Prime time:","Dzikir pagi setelah Subuh hingga terbit matahari; dzikir petang setelah Ashar hingga terbenam (boleh selepas Maghrib). Tap lingkaran hitungan sesuai jumlah anjuran. 🤍|Morning dhikr after Fajr until sunrise; evening dhikr after Asr until sunset (allowed after Maghrib). Tap the counter circle the recommended number of times. 🤍",
 "Lisensi:|License:","Teks Arab (Al-Qur'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.|Arabic text (Qur'an & Hadith) = public domain. Transliteration & Indonesian translation = original work of this app, released CC0 / public domain for unrestricted use by the ummah.",
 "Pilih keadaanmu — Allah sudah menyiapkan ayatnya untukmu. 🤍|Pick your state — Allah has prepared verses for you. 🤍",
 "Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = |Tap a surah: grey = not yet, rose = in progress, gold = memorized. Marking memorized = ",
 "Lengkap dengan teks Arab, latin, arti, |Complete with Arabic text, transliteration, meaning, ","manfaat|benefits","sumber|source","nya. 🤲|s. 🤲",
 "surah dihafal|surahs memorized"," — Masya Allah, Khatam Hafizh! 🏆| — MashaAllah, Khatam Hafizh! 🏆"," — Masya Allah, lengkap! 🌹| — MashaAllah, complete! 🌹"," selesai| done",
 "📦 114 surah siap ✅ (dari cache HP)|📦 114 surahs ready ✅ (from phone cache)","📦 114 surah siap ✅ (tersimpan di HP)|📦 114 surahs ready ✅ (saved on phone)","⚠️ Gagal memuat. Pastikan terhubung internet.|⚠️ Failed to load. Make sure you're online.",
 "✅ Data Qur'an termuat!|✅ Qur'an data loaded!","⚠️ Gagal memuat data. Pastikan terhubung internet.|⚠️ Failed to load data. Make sure you're online.",
 "🎧 Mode baca bareng aktif|🎧 Recite-along mode on","Sesi berhenti 🌿|Session stopped 🌿","Muat dulu ayatnya ya 😊|Load the verses first 😊","🎧 Baca bareng dimulai…|🎧 Reciting along started…",
 "Muroja'ah selesai! 🌹|Revision complete! 🌹","Data Qur'an belum termuat 😔|Qur'an data not loaded yet 😔","Data surah belum ada 😔|Surah data not available 😔","🎧 Memutar murottal…|🎧 Playing murottal…","✅ Murottal surah selesai 🌹|✅ Surah murottal finished 🌹","Audio tidak tersedia 😔|Audio unavailable 😔",
 "Data belum termuat. Buka saat terhubung internet dulu ya 🙏|Data not loaded. Open while connected to the internet first 🙏",
 "HAFAL! 🏆|MEMORIZED! 🏆",": belum|: not yet",": proses 🌱|: in progress 🌱",": hafal 🏆|: memorized 🏆",
 "Dzikir selesai 📿|Dhikr complete 📿","Dzikir pagi lengkap! 🌹|Morning dhikr complete! 🌹","Dzikir petang lengkap! 🌹|Evening dhikr complete! 🌹","Hitung dzikir |Count dhikr ",
 "ayat|verses","Juz |Juz ",
 "Nggak mood?|Not in the mood?","Kilat 2 menit|2-min blitz","Lagi ambis?|Feeling ambitious?","Deep Focus 50/90 menit|Deep Focus 50/90 min",
 " — atau atur sendiri menitnya (tap angka ⏱️ untuk ketik bebas, mis. 23). XP sampai +100! 🚀 Timer tetap jalan walau aplikasi diminimkan.| — or set your own minutes (tap the ⏱️ number to type freely, e.g. 23). Up to +100 XP! 🚀 Timer keeps running even when the app is minimized.",
 "Selesai satu sesi = |Finish one session = "," (Deep Focus sampai | (Deep Focus up to ",",") dan tomat 🍅 masuk koleksi.|,) and a tomato 🍅 joins your collection.",
 "Rahasianya: mulai dari yang |The trick: start with the ","paling kecil|smallest",". Centang satu, dapat XP + konfeti. Serius. |. Tick one, earn XP + confetti. Seriously. ",
 "⭐ = prioritas selalu di atas|⭐ = priority always on top","▲▼ atau tahan ⠿ lalu seret = atur urutan|▲▼ or hold ⠿ and drag = reorder","· tap teks tugas = edit typo ✏️|· tap task text = edit typo ✏️",
 "Kerjaan jalan, sholat tetap nomor satu. Murottal tetap mengalun walau kamu pindah menu. 🕌|Work goes on, prayer stays number one. Murottal keeps flowing even when you switch menus. 🕌",
 "Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!|Small habits repeated = big change. Check today off, +10 XP per habit!",
 "Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun 🌸|Every finished task grows a new plant. The more you do, the lusher it gets 🌸",
 "Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!|Mind blank? Let the wheel choose. Spin, then go without thinking!",
 "Apa pun hasilnya, kerjakan |Whatever it lands on, do "," sekarang| now"," — maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti.| — max 2 minutes. No overthinking, no later.",
 "Rehat selesai. Segar? Lanjut gas!|Break over. Refreshed? Keep going!","Jeda dulu, tarik napas 🌬️|Pause first, take a breath 🌬️","Timer diulang ↺|Timer reset ↺",
 "Lokasi terdeteksi! Jadwal disesuaikan 📍|Location detected! Schedule adjusted 📍","Lokasi terdeteksi! Jadwal & metode disesuaikan 📍|Location detected! Schedule & method adjusted 📍",
 "GPS ditolak — pilih kota manual ya 🙏|GPS denied — pick a city manually 🙏","Jadwal dihitung ulang ✅|Schedule recalculated ✅","Jadwal & metode dihitung ulang ✅|Schedule & method recalculated ✅",
 "Koreksi jadwal adzan (menit). Contoh: -2 atau 3|Adjust adhan schedule (minutes). E.g. -2 or 3","Adzan |Adhan "," (besok)| (tomorrow)"," jam | h "," mnt | min "," dtk lagi| s left",
 "metode Kemenag: Subuh 20°, Isya 18°.|Kemenag method: Fajr 20°, Isha 18°.","Dihitung otomatis di perangkat (|Calculated automatically on-device (","· metode Kemenag · koreksi |· Kemenag method · correction "," mnt via ⚙️| min via ⚙️",
 "Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu. 🤍|Write 3 small things you're grateful for today — saved automatically on your phone. 🤍",
 "🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!|🌸 MashaAllah, today's gratitude is complete. May it become a beautiful habit!",
 "Kemarin kamu beresin |Yesterday you finished "," tugas. Keren!| tasks. Nice!","Kemarin belum ada catatan — hari ini kita mulai!|No record yesterday — let's start today!","Hari baru, lembaran baru. Satu tugas kecil pun berarti!|New day, fresh page. Even one small task counts!",
 "Tidak ada tugas tercatat hari itu.|No tasks recorded that day.","🌸 Syukur hari itu:|🌸 Gratitude that day:",
 "Angka besar = tanggal · lencana emas = jumlah tugas beres hari itu.|Big number = date · gold badge = tasks done that day.",
 "Prioritas beres! 🌟|Priority done! 🌟","Satu tugas tumbang!|One task down!","Check-in mood dulu ☺️|Mood check-in first ☺️","tercapai! 📿|reached! 📿","beres! 💪|done! 💪","Syukur hari ini lengkap 🌸|Today's gratitude complete 🌸",
 "Misi roda masuk ke papan! Gas! 🚀|Wheel mission added to board! Go! 🚀","Timer diset sampai adzan |Timer set until adhan ",". Gas!|. Go!",
 "Fokus sampai adzan tuntas! Waktunya sholat 🕌|Focus until adhan complete! Time to pray 🕌","Mode kilat 2 menit beres! ⚡|2-minute blitz complete! ⚡",
 "Deep Focus 50 menit tuntas! Ambis! 🚀|Deep Focus 50 min complete! Ambitious! 🚀","Deep Focus 90 menit tuntas! LEGENDARIS! 🚀|Deep Focus 90 min complete! LEGENDARY! 🚀",
 "menit beres! 💪|min done! 💪","Satu sesi fokus tuntas! 🍅|One focus session complete! 🍅","Timer custom |Custom timer "," menit siap. Gas!| min ready. Go!","Angka diset: |Minutes set: "," menit — tap \"Pakai\" untuk mulai ⏱️| min — tap \"Use\" to start ⏱️",
 "Urutan tugas diperbarui|Task order updated","Tugas diperbarui|Task updated","Tugas tidak boleh kosong 😅|Task can't be empty 😅","Tulis dulu tugasnya ya ✍️|Write the task first ✍️","Tulis tugasnya dulu, lalu tandai ⭐|Write the task first, then mark ⭐",
 "Ditambahkan! Sekarang gas kerjakan 🚀|Added! Now go do it 🚀","⚡ Mode kilat nyala! 2 menit aja, janji.|⚡ Blitz mode on! Just 2 minutes, promise.",
 "Siapa nama panggilanmu? 😊|What should we call you? 😊","Kita nyala bareng 🔥|Let's light up together 🔥","Halo, |Hello, ","! Ayo nyalakan harimu ✨|! Let's light up your day ✨",
 "Kebiasaan baru ditanam! 🌱|New habit planted! 🌱","Isi dulu nama kebiasaannya ✍️|Fill the habit name first ✍️","Hapus kebiasaan \"|Delete habit \"","\"?|\"?",
 "Yakin mau menghapus SEMUA data NYALA di perangkat ini?|Sure you want to delete ALL NYALA data on this device?","Beneran yakin? Streak dan XP-mu akan hilang 😢|Really sure? Your streak and XP will be gone 😢",
 "Data dipulihkan! Memuat ulang… 📂|Data restored! Reloading… 📂","File cadangan tidak valid 😔|Invalid backup file 😔","Pulihkan data dari cadangan |Restore data from backup ","? Data saat ini akan ditimpa.|? Current data will be overwritten.",
 "Gagal membaca file cadangan 😔|Failed to read backup file 😔","Cadangan terunduh! Simpan file-nya di tempat aman 💾|Backup downloaded! Store the file somewhere safe 💾","Gagal membuat cadangan 😔|Failed to create backup 😔",
 "Tips: cadangkan datamu lewat tombol di bawah halaman ya.|Tip: back up your data via the button at the bottom of the page.",
 "Gambar tersimpan! Tinggal upload ke IG Story 📸|Image saved! Just upload to IG Story 📸","Gagal membuat gambar 😔|Failed to create image 😔",
 "NYALA — Sepekan Barakahku|NYALA — My Barakah Week","Laporan produktivitas pekan ini|This week's productivity report",
 "Dibuat dengan NYALA — produktif pelan-pelan|Made with NYALA — productive, slowly but surely",
 "Gambar 9:16 dengan branding NYALA — siap tempel ke IG Story / Status WA.|9:16 image with NYALA branding — ready to post to IG Story / WA Status.",
 "Rekap otomatis 7 hari terakhir — unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular!|Auto recap of the last 7 days — download as a 9:16 image, post to IG Story / WA Status, and spread the motivation!",
 "Hari konsisten: ≥70% tugas beres! 🔥|Consistent day: ≥70% tasks done! 🔥","XP lagi ke Lv.|XP to reach Lv.","LEVEL MAKSIMAL! 👑|MAX LEVEL! 👑",
 "Klik untuk ganti nama|Click to rename","Suara nyala — tap untuk matikan|Sound on — tap to mute","Suara mati — tap untuk nyalakan|Sound off — tap to unmute","Streak check-in harianmu|Your daily check-in streak",
 "Tahan & seret untuk menggeser urutan|Hold & drag to reorder","Geser urutan tugas|Reorder task","Batalkan selesai|Undo done","Tandai selesai|Mark done","Hapus status prioritas|Remove priority","Tandai sebagai prioritas|Mark as priority","Geser naik|Move up","Geser turun|Move down","Hapus tugas|Delete task","Hapus kebiasaan|Delete habit","Tap untuk memperbaiki typo / mengedit tugas ✏️|Tap to fix a typo / edit task ✏️",
 "Kurangi 1 menit|Minus 1 minute","Tambah 1 menit|Plus 1 minute","Tap untuk ketik angka persis, mis. 23|Tap to type exact minutes, e.g. 23",
 "Mager banget|So lazy","Capek|Tired","Biasa aja|Meh","Senang|Happy","Semangat membara|On fire",
 "Tulis satu hal kecil… (misal: balas 1 email)|Write one small thing… (e.g. reply to 1 email)","Ketik namamu di sini…|Type your name here…","misal: Tilawah 1 halaman|e.g. Read 1 page","Pilih kota atau GPS|Choose city or GPS","Hitung ulang jadwal|Recalculate schedule","Koreksi menit jadwal adzan|Adjust adhan minutes",
 "💧 Minum segelas air|💧 Drink a glass of water","🧹 Rapikan meja 2 menit|🧹 Tidy desk for 2 min","📖 Baca 1 halaman buku|📖 Read 1 page","💬 Balas 1 chat tertunda|💬 Reply to 1 pending chat","🙆 Stretching ringan|🙆 Light stretching",
 "Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!|Tap a suggestion above, or write your own. Start small!"
];

// ===== ATRIBUT =====
var ATTR={"Tulis satu hal kecil… (misal: balas 1 email)":"Write one small thing… (e.g. reply to 1 email)","Ketik namamu di sini…":"Type your name here…","misal: Tilawah 1 halaman":"e.g. Read 1 page","Pilih kota atau GPS":"Choose city or GPS","Hitung ulang jadwal":"Recalculate schedule","Koreksi menit jadwal adzan":"Adjust adhan minutes","Suara nyala — tap untuk matikan":"Sound on — tap to mute","Suara mati — tap untuk nyalakan":"Sound off — tap to unmute","Streak check-in harianmu":"Your daily check-in streak","Klik untuk ganti nama":"Click to rename","Geser urutan tugas":"Reorder task","Hapus tugas":"Delete task","Hapus kebiasaan":"Delete habit","Tahan & seret untuk menggeser urutan":"Hold & drag to reorder","Tap untuk ketik angka persis, mis. 23":"Tap to type exact minutes, e.g. 23","Kurangi 1 menit":"Minus 1 minute","Tambah 1 menit":"Plus 1 minute","Tap untuk memperbaiki typo / mengedit tugas ✏️":"Tap to fix a typo / edit task ✏️","Mager banget":"So lazy","Capek":"Tired","Biasa aja":"Meh","Senang":"Happy","Semangat membara":"On fire","Hitung dzikir ":"Count dhikr "};

var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
var SKIP_CLS='.latin,.doa-la,.arabic,.doa-ar,.surah-info .ar,[data-no-i18n],.nyalaHafDate';
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
var PH=PHRASES.map(function(p){var parts=p.split('|');return [new RegExp(esc(parts[0]),'g'),parts[1]];});
function prot(node){var e=node.parentElement;while(e){if(e.matches&&e.matches(SKIP_CLS))return true;e=e.parentElement;}return false;}
function contentHit(s){var a=window.NYALA_EN_DUA,b=window.NYALA_EN_DZIKR;if(a&&a[s]!=null)return a[s];if(b&&b[s]!=null)return b[s];return null;}
function trText(t){var s=t.trim();if(!s)return t;if(AR.test(t))return t;if(lang()==='id')return t;
 if(DICT[s]!=null)return t.replace(s,DICT[s]);var c=contentHit(s);if(c!=null)return t.replace(s,c);
 for(var i=0;i<PH.length;i++){t=t.replace(PH[i][0],PH[i][1]);}return t;}
function walk(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){if(prot(n))return NodeFilter.FILTER_REJECT;var p=n.parentElement;if(p&&(p.tagName==='SCRIPT'||p.tagName==='STYLE'||p.tagName==='TEXTAREA'||p.tagName==='INPUT'||p.tagName==='OPTION'||p.tagName==='SELECT'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});var ch=[];while(w.nextNode())ch.push(w.currentNode);ch.forEach(function(n){var o=n.nodeValue,d=trText(o);if(d!==o)n.nodeValue=d;});}
function attrs(){var l=lang();if(l==='id')return;document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(function(el){['placeholder','title','aria-label'].forEach(function(a){var v=el.getAttribute(a);if(!v)return;var s=v.trim();if(AR.test(v))return;var nv=(ATTR[s]!=null)?v.replace(s,ATTR[s]):null;if(nv==null){nv=v;for(var i=0;i<PH.length;i++)nv=nv.replace(PH[i][0],PH[i][1]);}if(nv!==v)el.setAttribute(a,nv);});});}
function title(){var t=document.title;if(!t||lang()==='id')return;var nt=t;for(var i=0;i<PH.length;i++)nt=nt.replace(PH[i][0],PH[i][1]);if(DICT[t.trim()]!=null)nt=t.replace(t.trim(),DICT[t.trim()]);if(nt!==t)document.title=nt;}
var mo=null,pend=false;
function schedule(){if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;walk(document.body);attrs();title();});}
function apply(){var l=lang();document.documentElement.lang=(l==='en'?'en':'id');walk(document.body);attrs();title();if(mo)mo.disconnect();mo=new MutationObserver(schedule);mo.observe(document.body,{childList:true,subtree:true,characterData:true});}
function injectSwitch(){if(document.getElementById('nyalaLangSel'))return;var sel=document.createElement('select');sel.id='nyalaLangSel';sel.className='chip';sel.setAttribute('data-no-i18n','1');sel.setAttribute('aria-label','Language / Bahasa');var o1=document.createElement('option');o1.value='id';o1.textContent='🇮🇩 Bahasa Indonesia';var o2=document.createElement('option');o2.value='en';o2.textContent='🇬🇧 English';sel.appendChild(o1);sel.appendChild(o2);sel.value=lang();sel.addEventListener('change',function(){setLang(sel.value);});var anchor=document.querySelector('.chips')||document.querySelector('header .top-in')||document.querySelector('header')||document.body;if(anchor&&anchor.appendChild){if(anchor===document.body)sel.style.cssText='position:fixed;top:8px;right:8px;z-index:9999;';anchor.appendChild(sel);}var st=document.createElement('style');st.textContent='#nyalaLangSel{cursor:pointer;font-weight:700}';document.head.appendChild(st);}
window.NYALA_I18N={lang:lang,set:setLang,refresh:schedule,extend:function(d,p,a){Object.keys(d||{}).forEach(function(k){DICT[k]=d[k];});(p||[]).forEach(function(x){PH.unshift([new RegExp(esc(x[0]),'g'),x[1]]);});Object.keys(a||{}).forEach(function(k){ATTR[k]=a[k];});schedule();}};
function boot(){injectSwitch();apply();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
