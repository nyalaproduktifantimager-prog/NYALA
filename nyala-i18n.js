// nyala-i18n.js — NYALA Bilingual Engine (Final Version with Full Dzikir/Doa Support)
(function(){
'use strict';
if(window.__nyalaI18nLoaded)return;
window.__nyalaI18nLoaded=true;

var LANG='nyala_lang';
function lang(){try{return localStorage.getItem(LANG)==='en'?'en':'id';}catch(e){return 'id';}}
function setLang(l){try{localStorage.setItem(LANG,l==='en'?'en':'id');}catch(e){}apply();window.dispatchEvent(new CustomEvent('nyala:lang',{detail:l}));}

// KAMUS UTAMA: Berisi UI pendek & Paragraf Panjang Dzikir/Doa
var PAIRS=[
  // --- UI DASAR & NAVIGASI ---
  ["Produktif Anti-Mager","Productive Anti-Lazy"],
  ["DZIKIR PAGI & PETANG","MORNING & EVENING DHIKR"],
  ["📿 DZIKIR PAGI & PETANG","📿 MORNING & EVENING DHIKR"],
  ["TAMAN QUR'AN","QUR'AN GARDEN"],
  ["Hari Ini","Today"],["Tugas","Tasks"],["Fokus","Focus"],["Spiritual","Spiritual"],["Kebiasaan","Habits"],
  ["Kebun","Garden"],["Roda","Wheel"],["Laporan","Report"],["📿 Dzikir","📿 Dhikr"],["🕌 Qur'an","🕌 Qur'an"],
  ["← NYALA","← NYALA"],
  
  // --- TEKS PANJANG DZIKIR (Agar tidak campur aduk) ---
  ["Allah, tidak ada Tuhan selain Dia; Yang Maha Hidup lagi terus-menerus mengurus makhluk-Nya; tidak mengantuk dan tidak tidur. Milik-Nya apa yang di langit dan di bumi... Kursi-Nya meliputi langit dan bumi, dan Dia Maha Tinggi lagi Maha Agung.","Allah, there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth... His Kursi extends over the heavens and the earth, and He is the Most High, the Most Great."],
  ["Tiga surah perlindungan (Al-Ikhlas, Al-Falaq, An-Nas). Membacanya 3 kali pagi & petang mencukupkanmu dari segala sesuatu.","The three surahs of protection (Al-Ikhlas, Al-Falaq, An-Nas). Reciting them three times morning and evening suffices you against everything."],
  ["Kami memasuki pagi dan kerajaan menjadi milik Allah... Ya Tuhanku, aku mohon kebaikan hari ini dan setelahnya, dan berlindung dari keburukannya.","We enter the morning and sovereignty belongs to Allah... My Lord, I ask You for the good of this day and the good after it, and I seek refuge in You from its evil."],
  ["Kami memasuki petang dan kerajaan menjadi milik Allah... Ya Tuhanku, aku mohon kebaikan malam ini dan setelahnya, dan berlindung dari keburukannya.","We enter the evening and sovereignty belongs to Allah... My Lord, I ask You for the good of this night and the good after it, and I seek refuge in You from its evil."],
  ["Ya Allah, Engkaulah Tuhanku, tiada tuhan selain Engkau. Engkau menciptakanku dan aku hamba-Mu... aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku; tiada yang mengampuni dosa selain Engkau.","O Allah, You are my Lord, there is no deity but You. You created me and I am Your servant... I acknowledge Your favor upon me and my sin, so forgive me; for none forgives sins but You."],
  ["Ya Allah, dengan-Mu kami memasuki pagi & petang, dengan-Mu kami hidup & mati, dan kepada-Mu kami kembali.","O Allah, by You we enter the morning and the evening, by You we live and die, and to You is the return."],
  ["Ya Allah, dengan-Mu kami memasuki petang & pagi, dengan-Mu kami hidup & mati, dan kepada-Mu tempat kembali.","O Allah, by You we enter the evening and the morning, by You we live and die, and to You is the final destination."],
  ["Ya Allah, pagi ini aku mempersaksikan Engkau, para pemikul arsy-Mu, malaikat-Mu, dan seluruh makhluk-Mu bahwa Engkau Allah tiada tuhan selain Engkau, dan Muhammad hamba & utusan-Mu.","O Allah, this morning I call You to witness, and the bearers of Your Throne, Your angels, and all Your creation, that You are Allah, there is no deity but You, and that Muhammad is Your servant and messenger."],
  ["Ya Allah, petang ini aku mempersaksikan Engkau... bahwa Engkau Allah tiada tuhan selain Engkau, dan Muhammad hamba & utusan-Mu.","O Allah, this evening I call You to witness... that You are Allah, there is no deity but You, and that Muhammad is Your servant and messenger."],
  ["Ya Allah, sehatkanlah badanku, pendengaranku, dan penglihatanku; tiada tuhan selain Engkau.","O Allah, grant wellbeing to my body, my hearing, and my sight; there is no deity but You."],
  ["Cukuplah Allah bagiku, tiada tuhan selain Dia; kepada-Nya aku bertawakal, Dia Tuhan arsy yang agung.","Allah is sufficient for me; there is no deity but Him. Upon Him I rely, and He is the Lord of the Mighty Throne."],
  ["Dengan nama Allah yang bersama nama-Nya tiada sesuatu pun membahayakan di bumi & langit; Dia Maha Mendengar lagi Maha Mengetahui.","In the name of Allah, with whose name nothing on earth or in heaven can cause harm; and He is the All-Hearing, the All-Knowing."],
  ["Aku ridha Allah sebagai Tuhan, Islam sebagai agama, dan Muhammad ﷺ sebagai nabi.","I am pleased with Allah as my Lord, Islam as my religion, and Muhammad (peace be upon him) as my prophet."],
  ["Wahai Yang Maha Hidup lagi Maha Mengurus, dengan rahmat-Mu aku memohon pertolongan; perbaikilah seluruh urusanku dan jangan serahkan aku pada diriku walau sekejap mata.","O Ever-Living, O Sustainer, by Your mercy I seek help; rectify all my affairs and do not leave me to myself even for the blink of an eye."],
  ["Ya Allah, limpahkanlah shalawat & salam kepada nabi kami Muhammad. (10 kali pagi & petang = mendapat syafaat beliau)","O Allah, send blessings and peace upon our prophet Muhammad. (10 times morning and evening = attaining his intercession)"],
  ["Mahasuci Allah dan dengan memuji-Nya. (100 kali menghapus kesalahan & mendatangkan kebaikan)","Glory be to Allah and praise be to Him. (100 times erases faults and brings good)"],
  ["Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya; milik-Nya kerajaan & pujian, Dia Maha Kuasa atas segala sesuatu.","There is no deity except Allah alone, with no partner; His is the dominion and His is the praise, and He is over all things competent."],
  ["Mahasuci Allah sebanyak bilangan makhluk-Nya, ridha diri-Nya, timbangan arsy-Nya, dan tinta kalimat-Nya.","Glory be to Allah and praise be to Him, as many as His creation, to the satisfaction of His Self, to the weight of His Throne, and to the ink of His words."],
  ["Ya Allah, aku mohon ilmu bermanfaat, rezeki baik, dan amal yang diterima.","O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds."],
  ["Aku memohon ampun kepada Allah dan bertaubat kepada-Nya. (100 kali sehari menghapus dosa walau sebanyak buih lautan)","I seek forgiveness from Allah and repent to Him. (100 times a day wipes out sins even as numerous as the foam of the sea)"],

  // --- TEKS PANJANG DOA (QURAN.HTML) ---
  ["Dengan nama Allah. Ya Allah, berkahilah rezeki kami dan jagalah kami dari api neraka.","In the name of Allah. O Allah, bless our provision and protect us from the fire of Hell."],
  ["Membawa berkah pada makanan dan menjauhkan setan dari rezeki kita.","Brings blessing to the food and keeps shaytan away from our provision."],
  ["Segala puji bagi Allah yang memberi kami makan dan minum, serta menjadikan kami muslim.","All praise is due to Allah who fed us and gave us drink and made us Muslims."],
  ["Menjadi sebab diampuninya dosa dan menumbuhkan syukur.","A means for sins to be forgiven and for gratitude to grow."],
  ["Dengan nama-Mu ya Allah aku hidup, dan dengan nama-Mu aku mati.","In Your name, O Allah, I live and in Your name I die."],
  ["Perlindungan selama tidur; bila wafat, wafat dalam fitrah.","Protection during sleep; if one passes away, it is upon the fitrah."],
  ["Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami.","All praise is due to Allah who gave us life after death."],
  ["Membuka hari dengan syukur dan pengingat kebangkitan.","Opens the day with gratitude and remembrance of the resurrection."],
  ["Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan.","O Allah, I seek refuge in You from the male and female shaytans."],
  ["Menjadi penghalang antara pandangan jin dan aurat kita.","A barrier between the gaze of the jinn and our awrah."],
  ["Ya Allah, aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan penyakit dariku dan menyehatkanku.","O Allah, I seek Your forgiveness. All praise is due to Allah who has removed discomfort from me and restored my health."],
  ["Mengajarkan istighfar sekaligus syukur atas kesehatan setelah membuang kotoran.","Teaches istighfar alongside gratitude for health after relieving oneself."],
  ["Aku bersaksi tiada tuhan selain Allah, dan Muhammad hamba dan utusan-Nya.","I bear witness that there is no deity but Allah, and that Muhammad is His servant and messenger."],
  ["Dibukakan delapan pintu surga untuk dipilihnya.","Eight gates of Paradise are opened for him to choose from."],
  ["Dengan nama Allah kami masuk dan keluar, dan kepada Allah kami bertawakal.","In the name of Allah we enter and exit, and upon Allah we rely."],
  ["Rumah diberkahi dan hati tertaut pada tawakal.","The home is blessed and the heart is anchored in reliance."],
  ["Dengan nama Allah, aku bertawakal kepada-Nya.","In the name of Allah, I place my trust in Him."],
  ["Dijamin petunjuk, perlindungan, dan kecukupan dari Allah.","Guaranteed guidance, protection, and sufficiency from Allah."],
  ["Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.","O Allah, open for me the gates of Your mercy."],
  ["Memohon dibukakan pintu rahmat saat memasuki rumah Allah.","Asking that the gates of mercy be opened upon entering Allah's house."],
  ["Ya Allah, aku memohon kepada-Mu dari karunia-Mu.","O Allah, I ask You of Your bounty."],
  ["Memohon karunia Allah saat kembali ke urusan dunia.","Seeking Allah's bounty when returning to worldly affairs."],
  ["Ya Allah, Tuhan pemilik seruan yang sempurna dan shalat yang didirikan ini, berikanlah kepada Nabi Muhammad wasilah dan keutamaan, dan bangkitkanlah beliau pada kedudukan terpuji yang telah Engkau janjikan.","O Allah, Lord of this perfect call and the established prayer, grant Muhammad al-Wasilah and excellence, and raise him to the praiseworthy station You promised him."],
  ["Barangsiapa membaca doa ini setelah adzan, ia berhak mendapatkan syafaat Nabi ﷺ di hari kiamat.","Whoever says this after the adhan earns the right to the Prophet's ﷺ intercession on the Day of Judgment."],
  ["Ya Tuhanku, ampunilah aku dan kedua orang tuaku.","My Lord, forgive me and my parents."],
  ["Bentuk birrul walidain; doa anak saleh yang pahalanya tak terputus.","A form of honoring parents; the prayer of a righteous child whose reward never ceases."],
  ["Ya Allah, turunkanlah hujan yang bermanfaat.","O Allah, send beneficial rain."],
  ["Mengubah hujan menjadi rahmat yang bermanfaat.","Turns the rain into a beneficial mercy."],
  ["Aku berlindung kepada Allah dari setan yang terkutuk.","I seek refuge in Allah from the cursed shaytan."],
  ["Meredam amarah dan mengusir bisikan setan.","Quells anger and drives away the whispers of shaytan."],
  ["Mahasuci Tuhan yang menundukkan semua ini bagi kami.","Glory to He who subjected this to us."],
  ["Perlindungan dalam perjalanan dan pengingat pulang kepada Allah.","Protection in travel and a reminder of the return to Allah."],
  ["Ya Tuhanku, tambahkanlah ilmuku dan anugerahkanlah aku pemahaman.","My Lord, increase me in knowledge and grant me understanding."],
  ["Membuka hati dan pikiran untuk menerima ilmu; bentuk tawakal kepada Allah sebelum belajar.","Opens the heart and mind to receive knowledge; a form of reliance on Allah before studying."],
  
  // --- FRASA UMUM & UI LAINNYA ---
  ["Waktu utama:","Prime time:"],
  ["Lisensi:","License:"],
  ["Teks Arab (Al-Qur'an & Hadits) = domain publik. Transliterasi & terjemahan Indonesia = tulisan asli aplikasi ini, dirilis CC0 / domain publik untuk dipakai umat tanpa batas.","Arabic text (Qur'an & Hadith) = public domain. Transliteration & Indonesian translation = original work of this app, released CC0 / public domain for unrestricted use by the ummah."],
  ["Pilih keadaanmu — Allah sudah menyiapkan ayatnya untukmu. 🤍","Pick your state — Allah has prepared verses for you. 🤍"],
  ["Tap surah: abu-abu = belum, rose = proses, emas = hafal. Menandai hafal = ","Tap a surah: grey = not yet, pink = in progress, gold = memorized. Marking memorized = "],
  ["Lengkap dengan teks Arab, latin, arti, ","Complete with Arabic text, transliteration, meaning, "],
  ["manfaat","benefits"],["sumber","sources"],["nya. 🤲",". 🤲"],
  ["surah dihafal","surahs memorized"],[" — Masya Allah, Khatam Hafizh! 🏆"," — MashaAllah, Khatam Hafizh! 🏆"],[" selesai"," done"],
  ["📦 114 surah siap ✅ (dari cache HP)","📦 114 surahs ready ✅ (from phone cache)"],
  ["📦 114 surah siap ✅ (tersimpan di HP)","📦 114 surahs ready ✅ (saved on phone)"],
  ["⚠️ Gagal memuat. Pastikan terhubung internet.","⚠️ Failed to load. Make sure you're online."],
  ["✅ Data Qur'an termuat!","✅ Qur'an data loaded!"],
  ["⚠️ Gagal memuat data. Pastikan terhubung internet.","⚠️ Failed to load data. Make sure you're online."],
  ["🎧 Mode baca bareng aktif","🎧 Recite-along mode on"],["Sesi berhenti 🌿","Session stopped 🌿"],
  ["Muat dulu ayatnya ya 😊","Load the verses first 😊"],["🎧 Baca bareng dimulai…","🎧 Reciting along started…"],
  ["Muroja'ah selesai! 🌹","Revision complete! 🌹"],["Data Qur'an belum termuat 😔","Qur'an data not loaded yet 😔"],
  ["Data surah belum ada 😔","Surah data not available 😔"],["🎧 Memutar murottal…","🎧 Playing murottal…"],
  ["✅ Murottal surah selesai 🌹","✅ Surah murottal finished 🌹"],["Audio tidak tersedia 😔","Audio unavailable 😔"],
  ["Data belum termuat. Buka saat terhubung internet dulu ya 🙏","Data not loaded. Open while connected to the internet first 🙏"],
  ["HAFAL! 🏆","MEMORIZED! 🏆"],[": belum",": not yet"],[": proses 🌱",": in progress 🌱"],[": hafal 🏆",": memorized 🏆"],
  ["Dzikir selesai 📿","Dhikr complete 📿"],["Dzikir pagi lengkap! 🌹","Morning dhikr complete! 🌹"],["Dzikir petang lengkap! 🌹","Evening dhikr complete! 🌹"],
  ["Hitung dzikir ","Count dhikr "],["ayat","verses"],["Juz ","Juz "],
  ["Nggak mood?","Not in the mood?"],["Kilat 2 menit","2-min blitz"],["Lagi ambis?","Feeling ambitious?"],["Deep Focus 50/90 menit","Deep Focus 50/90 min"],
  [" — atau atur sendiri menitnya (tap angka ⏱️ untuk ketik bebas, mis. 23). XP sampai +100! 🚀 Timer tetap jalan walau aplikasi diminimkan."," — or set your own minutes (tap the ⏱️ number to type freely, e.g. 23). Up to +100 XP! 🚀 Timer keeps running even when the app is minimized."],
  ["Selesai satu sesi = ","Finish one session = "],[" (Deep Focus sampai "," (Deep Focus up to "],[",") dan tomat 🍅 masuk koleksi.",",") and a tomato 🍅 joins your collection."],
  ["Rahasianya: mulai dari yang ","The trick: start with the "],["paling kecil","smallest"],[". Centang satu, dapat XP + konfeti. Serius. ",". Tick one, earn XP + confetti. Seriously. "],
  ["⭐ = prioritas selalu di atas","⭐ = priority always on top"],["▲▼ atau tahan ⠿ lalu seret = atur urutan","▲▼ or hold ⠿ and drag = reorder"],["· tap teks tugas = edit typo ✏️","· tap task text = edit typo ✏️"],
  ["Kerjaan jalan, sholat tetap nomor satu. Murottal tetap mengalun walau kamu pindah menu. 🕌","Work goes on, prayer stays number one. Murottal keeps flowing even when you switch menus. 🕌"],
  ["Kebiasaan kecil yang diulang = perubahan besar. Ceklis hari ini, +10 XP per habit!","Small habits repeated = big change. Check today off, +10 XP per habit!"],
  ["Setiap tugas yang beres menumbuhkan tanaman baru. Makin rajin, makin rimbun 🌸","Every finished task grows a new plant. The more you do, the lusher it gets 🌸"],
  ["Otak nge-blank? Biar rodanya yang milih. Putar, lalu gas tanpa mikir!","Mind blank? Let the wheel choose. Spin, then go without thinking!"],
  ["Apa pun hasilnya, kerjakan ","Whatever it lands on, do "],[" sekarang"," now"],[" — maksimal 2 menit. Nggak pakai mikir, nggak pakai nanti."," — max 2 minutes. No overthinking, no later."],
  ["Rehat selesai. Segar? Lanjut gas!","Break over. Refreshed? Keep going!"],["Jeda dulu, tarik napas 🌬️","Pause first, take a breath 🌬️"],["Timer diulang ↺","Timer reset ↺"],
  ["Lokasi terdeteksi! Jadwal disesuaikan 📍","Location detected! Schedule adjusted 📍"],["Lokasi terdeteksi! Jadwal & metode disesuaikan 📍","Location detected! Schedule & method adjusted 📍"],
  ["GPS ditolak — pilih kota manual ya 🙏","GPS denied — pick a city manually 🙏"],["Jadwal dihitung ulang ✅","Schedule recalculated ✅"],["Jadwal & metode dihitung ulang ✅","Schedule & method recalculated ✅"],
  ["Koreksi jadwal adzan (menit). Contoh: -2 atau 3","Adjust adhan schedule (minutes). E.g. -2 or 3"],["Adzan ","Adhan "],[" (besok)"," (tomorrow)"],[" jam "," h "],[" mnt "," min "],[" dtk lagi"," s left"],
  ["metode Kemenag: Subuh 20°, Isya 18°.","Kemenag method: Fajr 20°, Isha 18°."],["Dihitung otomatis di perangkat (","Calculated automatically on-device ("],["· metode Kemenag · koreksi ","· Kemenag method · correction "],[" mnt via ⚙️"," min via ⚙️"],
  ["Tulis 3 hal kecil yang kamu syukuri hari ini — tersimpan otomatis di HP-mu. 🤍","Write 3 small things you're grateful for today — saved automatically on your phone. 🤍"],
  ["🌸 MasyaAllah, syukur hari ini lengkap. Semoga jadi kebiasaan indah!","🌸 MashaAllah, today's gratitude is complete. May it become a beautiful habit!"],
  ["Kemarin kamu beresin ","Yesterday you finished "],[" tugas. Keren!"," tasks. Nice!"],["Kemarin belum ada catatan — hari ini kita mulai!","No record yesterday — let's start today!"],["Hari baru, lembaran baru. Satu tugas kecil pun berarti!","New day, fresh page. Even one small task counts!"],
  ["Tidak ada tugas tercatat hari itu.","No tasks recorded that day."],["🌸 Syukur hari itu:","🌸 Gratitude that day:"],
  ["Angka besar = tanggal · lencana emas = jumlah tugas beres hari itu.","Big number = date · gold badge = tasks done that day."],
  ["Prioritas beres! 🌟","Priority done! 🌟"],["Satu tugas tumbang!","One task down!"],["Check-in mood dulu ☺️","Mood check-in first ☺️"],["tercapai! 📿","reached! 📿"],["beres! 💪","done! 💪"],["Syukur hari ini lengkap 🌸","Today's gratitude complete 🌸"],
  ["Misi roda masuk ke papan! Gas! 🚀","Wheel mission added to board! Go! 🚀"],["Timer diset sampai adzan ","Timer set until adhan "],[". Gas!",". Go!"],
  ["Fokus sampai adzan tuntas! Waktunya sholat 🕌","Focus until adhan complete! Time to pray 🕌"],["Mode kilat 2 menit beres! ⚡","2-minute blitz complete! ⚡"],
  ["Deep Focus 50 menit tuntas! Ambis! 🚀","Deep Focus 50 min complete! Ambitious! 🚀"],["Deep Focus 90 menit tuntas! LEGENDARIS! 🚀","Deep Focus 90 min complete! LEGENDARY! 🚀"],
  ["menit beres! 💪","min done! 💪"],["Satu sesi fokus tuntas! 🍅","One focus session complete! 🍅"],["Timer custom ","Custom timer "],[" menit siap. Gas!"," min ready. Go!"],["Angka diset: ","Minutes set: "],[" menit — tap \"Pakai\" untuk mulai ⏱️"," min — tap \"Use\" to start ⏱️"],
  ["Urutan tugas diperbarui","Task order updated"],["Tugas diperbarui","Task updated"],["Tugas tidak boleh kosong 😅","Task can't be empty 😅"],["Tulis dulu tugasnya ya ✍️","Write the task first ✍️"],["Tulis tugasnya dulu, lalu tandai ⭐","Write the task first, then mark ⭐"],
  ["Ditambahkan! Sekarang gas kerjakan 🚀","Added! Now go do it 🚀"],["⚡ Mode kilat nyala! 2 menit aja, janji.","⚡ Blitz mode on! Just 2 minutes, promise."],
  ["Siapa nama panggilanmu? 😊","What should we call you? 😊"],["Kita nyala bareng 🔥","Let's light up together 🔥"],["Halo, ","Hello, "],["! Ayo nyalakan harimu ✨","! Let's light up your day ✨"],
  ["Kebiasaan baru ditanam! 🌱","New habit planted! 🌱"],["Isi dulu nama kebiasaannya ✍️","Fill the habit name first ✍️"],["Hapus kebiasaan \"","Delete habit \""],["\"?","\"?"],
  ["Yakin mau menghapus SEMUA data NYALA di perangkat ini?","Sure you want to delete ALL NYALA data on this device?"],["Beneran yakin? Streak dan XP-mu akan hilang 😢","Really sure? Your streak and XP will be gone 😢"],
  ["Data dipulihkan! Memuat ulang… 📂","Data restored! Reloading… 📂"],["File cadangan tidak valid 😔","Invalid backup file 😔"],["Pulihkan data dari cadangan ","Restore data from backup "],["? Data saat ini akan ditimpa.","? Current data will be overwritten."],
  ["Gagal membaca file cadangan 😔","Failed to read backup file 😔"],["Cadangan terunduh! Simpan file-nya di tempat aman 💾","Backup downloaded! Store the file somewhere safe 💾"],["Gagal membuat cadangan 😔","Failed to create backup 😔"],
  ["Tips: cadangkan datamu lewat tombol di bawah halaman ya.","Tip: back up your data via the button at the bottom of the page."],
  ["Gambar tersimpan! Tinggal upload ke IG Story 📸","Image saved! Just upload to IG Story 📸"],["Gagal membuat gambar 😔","Failed to create image 😔"],
  ["NYALA — Sepekan Barakahku","NYALA — My Barakah Week"],["Laporan produktivitas pekan ini","This week's productivity report"],
  ["Dibuat dengan NYALA — produktif pelan-pelan","Made with NYALA — productive, slowly but surely"],
  ["Gambar 9:16 dengan branding NYALA — siap tempel ke IG Story / Status WA.","9:16 image with NYALA branding — ready to post to IG Story / WA Status."],
  ["Rekap otomatis 7 hari terakhir — unduh sebagai gambar 9:16, tempel ke IG Story / Status WA, biar semangatmu menular!","Auto recap of the last 7 days — download as a 9:16 image, post to IG Story / WA Status, and spread the motivation!"],
  ["Hari konsisten: ≥70% tugas beres! 🔥","Consistent day: ≥70% tasks done! 🔥"],["XP lagi ke Lv.","XP to reach Lv."],["LEVEL MAKSIMAL! 👑","MAX LEVEL! 👑"],
  ["Klik untuk ganti nama","Click to rename"],["Suara nyala — tap untuk matikan","Sound on — tap to mute"],["Suara mati — tap untuk nyalakan","Sound off — tap to unmute"],["Streak check-in harianmu","Your daily check-in streak"],
  ["Tahan & seret untuk menggeser urutan","Hold & drag to reorder"],["Geser urutan tugas","Reorder task"],["Batalkan selesai","Undo done"],["Tandai selesai","Mark done"],["Hapus status prioritas","Remove priority"],["Tandai sebagai prioritas","Mark as priority"],["Geser naik","Move up"],["Geser turun","Move down"],["Hapus tugas","Delete task"],["Hapus kebiasaan","Delete habit"],["Tap untuk memperbaiki typo / mengedit tugas ✏️","Tap to fix a typo / edit task ✏️"],
  ["Kurangi 1 menit","Minus 1 minute"],["Tambah 1 menit","Plus 1 minute"],["Tap untuk ketik angka persis, mis. 23","Tap to type exact minutes, e.g. 23"],
  ["Mager banget","So lazy"],["Capek","Tired"],["Biasa aja","Meh"],["Senang","Happy"],["Semangat membara","On fire"],
  ["Tulis satu hal kecil… (misal: balas 1 email)","Write one small thing… (e.g. reply to 1 email)"],["Ketik namamu di sini…","Type your name here…"],["misal: Tilawah 1 halaman","e.g. Read 1 page"],["Pilih kota atau GPS","Choose city or GPS"],["Hitung ulang jadwal","Recalculate schedule"],["Koreksi menit jadwal adzan","Adjust adhan minutes"],
  ["💧 Minum segelas air","💧 Drink a glass of water"],["🧹 Rapikan meja 2 menit","🧹 Tidy desk for 2 min"],["📖 Baca 1 halaman buku","📖 Read 1 page"],["💬 Balas 1 chat tertunda","💬 Reply to 1 pending chat"],["🙆 Stretching ringan","🙆 Light stretching"],
  ["Klik salah satu saran di atas, atau tulis tugasmu sendiri. Yang kecil aja dulu!","Tap a suggestion above, or write your own. Start small!"],
  ["Madaniyah","Medinan"],["Makkiyah","Meccan"],["ayat","verses"],
  ["🌅 Pagi","🌅 Morning"],["🌇 Petang","🌇 Evening"],
  ["Kaum Rebahan 🛋️","Couch Crew 🛋️"],["Mulai Geliat 🥱","Starting to Stir 🥱"],["Pemanasan ☕","Warming Up ☕"],["Mode Gas ⚡","Gas Mode ⚡"],["Pejuang Fokus 🔥","Focus Fighter 🔥"],["Pendekar Produktif ⚔️","Productivity Warrior ⚔️"],["Master Anti-Mager 👑","Anti-Lazy Master 👑"],
  ["Mode mager terdeteksi","Lazy mode detected"],["Mode hemat energi","Energy-saver mode"],["Mode stabil","Stable mode"],["Mode cerah","Sunny mode"],["Mode turbo!","Turbo mode!"],
  ["🔋 Baterai semangat","🔋 Motivation battery"],["⚡ Gas 2 Menit","⚡ 2-Min Blitz"],["🎲 Bingung mulai?","🎲 Not sure where to start?"],["🌱 Intip Kebunku","🌱 Peek my Garden"],["📋 Skor Hari Ini","📋 Today's Score"],["beres hari ini","done today"],
  ["+ Tambah","+ Add"],["⭐ Prioritas","⭐ Priority"],["Papan masih kosong nih…","The board is still empty…"],
  ["🍅 Fokus 25","🍅 Focus 25"],["⚡ Kilat 2","⚡ Blitz 2"],["🌿 Rehat 5","🌿 Break 5"],["🔥 Deep 50","🔥 Deep 50"],["🚀 Deep 90","🚀 Deep 90"],["⏱️ Atur:","⏱️ Set:"],["Pakai","Use"],["▶ Mulai","▶ Start"],["↺ Ulang","↺ Reset"],["Koleksi hari ini:","Today's collection:"],["belum ada — ayo mulai!","none yet — let's go!"],
  ["🕌 Fokus Sampai Adzan","🕌 Focus Until Adhan"],["Menghitung…","Calculating…"],["📍 Lokasimu (GPS)","📍 Your location (GPS)"],["📍 Otomatis (GPS saya)","📍 Automatic (my GPS)"],
  ["📿 Tasbih Digital","📿 Digital Tasbih"],["➕ Kebiasaan baru:","➕ New habit:"],["Tambah Kebiasaan","Add Habit"],["Tandai Beres Hari Ini","Mark Done Today"],["✔ Hari ini beres!","✔ Done today!"],
  ["TUGAS SELESAI SEPANJANG MASA","TASKS DONE ALL-TIME"],["MENIT FOKUS TERKUMPUL","FOCUS MINUTES COLLECTED"],["HARI BERUNTUN CHECK-IN","CONSECUTIVE CHECK-IN DAYS"],["GAS!","GO!"],["🎡 PUTAR SEKARANG","🎡 SPIN NOW"],["✅ Jadikan tugas","✅ Make it a task"],
  ["📸 Unduh Gambar","📸 Download Image"],["📤 Share ke Story","📤 Share to Story"],["🔀 Kocok semangat lagi","🔀 Shuffle motivation"],
  ["💾 Cadangkan data","💾 Back up data"],["📂 Pulihkan data","📂 Restore data"],["Mulai ulang dari nol (hapus semua data)","Start from zero (delete all data)"],
  ["Selamat datang di NYALA","Welcome to NYALA"],["Mulai Nyala 🔥","Start Lighting Up 🔥"],["Lewati dulu","Skip for now"],["📥 Bawa tugas belum selesai ke hari ini","📥 Carry unfinished tasks to today"],
  ["01 · MISI HARIAN","01 · DAILY MISSION"],["Papan Tugas Anti-Mager","Anti-Lazy Task Board"],["02 · MODE FOKUS","02 · FOCUS MODE"],["Timer Nyalakan Fokus","Light-Up Focus Timer"],["Pilih ritmemu 🎧","Pick your rhythm 🎧"],["03 · SPIRITUAL CORNER","03 · SPIRITUAL CORNER"],["Produktif Dunia, Tenang Ibadah","Productive in Life, Calm in Worship"],["04 · RITUAL HARIAN","04 · DAILY RITUAL"],["Pelacak Kebiasaan","Habit Tracker"],["05 · BUKTI PROGRES","05 · PROOF OF PROGRESS"],["Kebun Nyalamu","Your Light-Up Garden"],["06 · ANTI BINGUNG","06 · ANTI-OVERWHELM"],["Roda Semangat","Motivation Wheel"],["Putar rodanya 🎰","Spin the wheel 🎰"],["07 · LAPORAN MINGGUAN","07 · WEEKLY REPORT"],["Sepekan Barakahku","My Barakah Week"],
  ["SELAMAT PAGI ☀️","GOOD MORNING ☀️"],["SELAMAT SIANG 🌤️","GOOD AFTERNOON 🌤️"],["SELAMAT SORE 🌇","GOOD EVENING 🌇"],["SELAMAT MALAM 🌙","GOOD NIGHT 🌙"],
  ["Satu langkah kecil hari ini.","One small step today."],["Cek dulu: gimana energimu sekarang?","First, how's your energy right now?"],
  ["🌸 3 Hal yang Disyukuri Hari Ini","🌸 3 Things to Be Grateful for Today"],["🗓️ Jejak 14 hari terakhir","🗓️ Last 14 days trail"],["(tap tanggal untuk rincian)","(tap a date for details)"],
  ["AKTIVITAS PER HARI","DAILY ACTIVITY"],["PROGRESS HARIAN (%)","DAILY PROGRESS (%)"],["TUGAS BERES","TASKS DONE"],["MENIT FOKUS","FOCUS MINUTES"],["HABIT TERCEKLIS","HABITS CHECKED"],["DZIKIR","DHIKR"],
  ["A · BACA & DENGAR","A · READ & LISTEN"],["Mushaf Digital 114 Surah / 30 Juz","Digital Mushaf · 114 Surahs / 30 Juz"],["Baca sendiri atau baca bareng murottal. 📖","Read alone or recite along with murottal. 📖"],
  ["Per Surah","Per Surah"],["Per Juz","Per Juz"],["📖 Baca Sendiri","📖 Read Alone"],["🎧 Baca Bareng","🎧 Recite Along"],["▶ Murottal Surah","▶ Surah Murottal"],["▶ Mulai Baca Bareng","▶ Start Reciting Along"],["⏹ Berhenti","⏹ Stop"],["▶ dengar","▶ listen"],
  ["B · AYAT UNTUK HATIMU","B · VERSES FOR YOUR HEART"],["Sedang Merasa Apa?","How Are You Feeling?"],
  ["😢 Sedih","😢 Sad"],["😰 Cemas","😰 Anxious"],["🥰 Bersyukur","🥰 Grateful"],["🌾 Butuh Sabar","🌾 Need Patience"],["💼 Memohon Rezeki","💼 Seeking Provision"],["🌙 Merasa Sendiri","🌙 Feeling Alone"],["🤍 Meminta Ampun","🤍 Seeking Forgiveness"],["🛡️ Ingin Terlindungi","🛡️ Wanting Protection"],
  ["C · TRACKER HAFALAN","C · MEMORIZATION TRACKER"],["Perjalanan Huffaz-mu 🏆","Your Huffaz Journey 🏆"],["Belum","Not yet"],["Proses","In progress"],["Hafal","Memorized"],
  ["D · DOA-DOA","D · SUPPLICATIONS"],["Doa Sehari-hari, Nabi & Masa Kini","Everyday, Prophetic & Modern Duas"],["🌤️ Sehari-hari","🌤️ Everyday"],["🕌 Doa Para Nabi","🕌 Prophetic Duas"],["🕰️ Masa Kini","🕰️ Modern"],
  ["Kolaborasi: Muslimah WFH × Juariah","Collaboration: Muslimah WFH × Juariah"],
  ["🔄 Memuat…","🔄 Loading…"],["📦 Memuat data…","📦 Loading data…"],["📥 Mengunduh data…","📥 Downloading data…"],
  ["Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.","In the name of Allah, the Most Gracious, the Most Merciful."],
  ["Ayat Kursi","Ayat al-Kursi"],["Al-Ikhlas, Al-Falaq & An-Nas","Al-Ikhlas, Al-Falaq & An-Nas"],
  ["Pembuka: Kerajaan Milik Allah","Opening: Sovereignty Belongs to Allah"],["Sayyidul Istighfar (Penghulu Istighfar)","Sayyidul Istighfar (The Master of Seeking Forgiveness)"],["Penyerahan Diri","Submission of Oneself"],["Persaksian Tauhid","Testimony of Tawhid"],["Mohon Kesehatan","Seeking Wellbeing"],["Cukuplah Allah","Allah Is Sufficient"],["Perlindungan dari Bahaya","Protection from Harm"],["Ridha kepada Allah","Contentment with Allah"],["Mohon Pertolongan","Seeking Help"],["Shalawat kepada Nabi ﷺ","Salawat upon the Prophet ﷺ"],["Tasbih 100 Kali","Tasbih 100 Times"],["Tauhid 10 Kali","Tawhid 10 Times"],["Tasbih Timbangan Arsy (khusus pagi)","Tasbih Weighing the Throne (morning only)"],["Mohon Ilmu & Rezeki (khusus pagi)","Seeking Knowledge & Provision (morning only)"],["Istighfar 100 Kali (harian)","Istighfar 100 Times (daily)"],
  ["MANTRA NYALA","NYALA MANTRA"],["PERIBAHASA INDONESIA","INDONESIAN PROVERB"],["TIM NYALA","NYALA TEAM"],
  ["Muhammad ﷺ","Muhammad (peace be upon him)"],["ﷺ","(peace be upon him)"]
];

// Urutkan berdasarkan panjang string agar yang panjang diproses duluan (mencegah partial match)
PAIRS.sort(function(a,b){return b[0].length-a[0].length;});

function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
var RX=PAIRS.map(function(p){return [new RegExp(esc(p[0]),'g'),p[1]];});
var AR=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
var SKIP='.arabic,.doa-ar,.latin,.doa-la,.surah-info .ar,[data-no-i18n],.nyalaHafDate,#nyalaLangSel';

function toEN(t){
  if(!t||AR.test(t))return t;
  var s=t.trim();
  if(!s)return t;
  // Cek kamus penuh dulu
  for(var i=0;i<PAIRS.length;i++){if(PAIRS[i][0]===s)return t.replace(s,PAIRS[i][1]);}
  // Cek regex
  var out=t;
  for(var j=0;j<RX.length;j++){out=out.replace(RX[j][0],RX[j][1]);}
  // Cek kamus eksternal (dzikir/doa)
  var e1=window.NYALA_EN_DUA||{},e2=window.NYALA_EN_DZIKR||{};
  var k=out.trim();
  if(e1[k]!=null)out=out.replace(k,e1[k]);
  else if(e2[k]!=null)out=out.replace(k,e2[k]);
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
