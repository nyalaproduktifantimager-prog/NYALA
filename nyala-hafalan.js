// nyala-hafalan.js — Tracker Hafalan Permanen + Tanggal (Versi Final)
(function(){
  'use strict';
  var SKEY = 'nyala_hafalan_v1';
  var MAIN_KEY = 'nyala_v1';
  var LANG_KEY = 'nyala_lang';

  function $(id) { return document.getElementById(id); }
  function lang() { try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'id'; } catch(e) { return 'id'; } }

  function load() {
    try {
      var r = localStorage.getItem(SKEY);
      if (r) { var o = JSON.parse(r); if (o && typeof o === 'object') return o; }
    } catch(e) {}
    return {};
  }

  function save(o) {
    try { localStorage.setItem(SKEY, JSON.stringify(o)); } catch(e) {}
  }

  var store = load();

  // Migrasi data lama dari app.js agar tidak hilang
  function migrate() {
    try {
      var r = localStorage.getItem(MAIN_KEY);
      if (!r) return;
      var m = JSON.parse(r);
      var h = m && m.quran && m.quran.hafal;
      if (!h) return;
      Object.keys(h).forEach(function(k) {
        var n = parseInt(k, 10);
        if (isNaN(n)) return;
        var v = h[k];
        if (v === 2) {
          if (!store[n] || store[n].s !== 'hafal') {
            store[n] = { s: 'hafal', d: (store[n] && store[n].d) || new Date().toISOString() };
          }
        } else if (v === 1) {
          if (!store[n]) store[n] = { s: 'proses', d: null };
        }
      });
      save(store);
      // Hapus data lama agar tidak konflik
      if(m.quran) { delete m.quran.hafal; localStorage.setItem(MAIN_KEY, JSON.stringify(m)); }
    } catch(e) {}
  }

  function grid() { return $('hafGrid'); }
  function noOf(cell) {
    var n = parseInt((cell.textContent || '').replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? null : n;
  }

  function fmtDate(iso, l) {
    try {
      var d = new Date(iso);
      var mon = l === 'en' ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
      return d.getDate() + ' ' + mon[d.getMonth()] + ' ' + d.getFullYear();
    } catch(e) { return ''; }
  }

  function heal() {
    var g = grid();
    if (!g) return;
    var cells = Array.prototype.slice.call(g.children);
    cells.forEach(function(cell) {
      var n = noOf(cell);
      if (n == null) return;
      var rec = store[n];
      var s = rec ? rec.s : 'belum';

      // Terapkan warna kelas (st0=abu, st1=pink/proses, st2=emas/hafal)
      cell.className = 'haf-cell ' + (s === 'hafal' ? 'st2' : (s === 'proses' ? 'st1' : 'st0'));

      // Tampilkan tanggal jika hafal
      var oldBadge = cell.querySelector('.nyalaHafDate');
      if (s === 'hafal' && rec && rec.d) {
        if (!oldBadge) {
          var sp = document.createElement('span');
          sp.className = 'nyalaHafDate';
          sp.setAttribute('data-no-i18n', '1');
          cell.appendChild(sp);
          oldBadge = sp;
        }
        oldBadge.textContent = '✓ ' + fmtDate(rec.d, lang());
        oldBadge.title = (lang() === 'en' ? 'Memorized' : 'Hafal') + ' · ' + fmtDate(rec.d, lang());
      } else {
        if (oldBadge) oldBadge.parentNode.removeChild(oldBadge);
      }
    });

    // Update Progress Bar
    var h = 0;
    Object.keys(store).forEach(function(k) { if (store[k] && store[k].s === 'hafal') h++; });
    var f = $('hafFill'); if (f) f.style.width = Math.round(h / 114 * 100) + '%';
    var t = $('hafTxt');
    if (t) {
      var label = lang() === 'en' ? 'surahs memorized' : 'surah dihafal';
      var bonus = h >= 30 ? (lang() === 'en' ? ' — MashaAllah, Khatam Hafizh! 🏆' : ' — Masya Allah, Khatam Hafizh! 🏆') : '';
      t.textContent = h + ' / 114 ' + label + bonus;
    }
  }

  function toast(m, g) {
    var b = $('toasts'); if (!b) return;
    var t = document.createElement('div'); t.className = 'toast' + (g ? ' gold' : ''); t.textContent = m;
    b.appendChild(t);
    while (b.children.length > 3) b.removeChild(b.firstChild);
    setTimeout(function() { t.classList.add('go'); setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 320); }, 3000);
  }

  // Logika Klik: Belum -> Proses -> Hafal (Terkunci)
  function onClick(e) {
    var g = grid(); if (!g) return;
    var cell = e.target && e.target.closest ? e.target.closest('.haf-cell') : null;
    if (!cell || !g.contains(cell)) return;
    var n = noOf(cell); if (n == null) return;

    var rec = store[n] || { s: 'belum', d: null };
    var s = rec.s;

    if (s === 'hafal') {
      // Jika sudah hafal, tampilkan tanggal, jangan ubah status
      e.stopPropagation();
      e.preventDefault();
      toast('✓ ' + (lang() === 'en' ? 'Already memorized' : 'Sudah hafal') + ' · ' + fmtDate(rec.d, lang()), true);
      return;
    }

    // Siklus: belum -> proses -> hafal
    var ns = s === 'belum' ? 'proses' : 'hafal';
    var nd = ns === 'hafal' ? new Date().toISOString() : null;

    store[n] = { s: ns, d: nd };
    save(store);

    if (ns === 'hafal') {
      toast((lang() === 'en' ? 'Surah ' : 'Surah ') + n + ' ' + (lang() === 'en' ? 'MEMORIZED! 🏆' : 'HAFAL! 🏆'), true);
    } else {
      toast((lang() === 'en' ? 'Surah ' : 'Surah ') + n + ': ' + (lang() === 'en' ? 'in progress 🌱' : 'proses 🌱'));
    }

    heal();
  }

  function boot() {
    migrate();
    var g = grid();
    if (!g) {
      var tries = 0;
      var iv = setInterval(function() {
        tries++;
        if (grid() || tries > 50) { clearInterval(iv); if(grid()) boot(); }
      }, 100);
      return;
    }

    heal();
    // Gunakan capture phase agar event ini diproses lebih dulu
    g.addEventListener('click', onClick, true); 

    if ('MutationObserver' in window) {
      new MutationObserver(function() { heal(); }).observe(g, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    window.addEventListener('nyala:lang', heal);

    if (!document.getElementById('nyalaHafStyle')) {
      var st = document.createElement('style');
      st.id = 'nyalaHafStyle';
      st.textContent = '.nyalaHafDate{display:block;font-size:.5rem;line-height:1.1;color:var(--gold,#e5c786);font-weight:800;margin-top:1px} .haf-cell.st0{background:rgba(0,0,0,.25);color:var(--ink-soft);border-color:var(--line);} .haf-cell.st1{background:rgba(212,165,165,.12);color:var(--rose-soft);border-color:var(--rose);} .haf-cell.st2{background:linear-gradient(120deg,var(--gold),var(--gold-deep));color:#241a0c;border-color:var(--gold);}';
      document.head.appendChild(st);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
