/* Tiện ích dùng chung: DOM, phát âm (TTS), nhận diện giọng nói, hẹn giờ, quy đổi band. */
window.Pages = {};
const U = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function toast(msg, ms = 2200) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), ms);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  /* ---------- Text-to-speech ---------- */
  const synth = window.speechSynthesis;
  let voices = [];
  function loadVoices() {
    if (!synth) return [];
    voices = synth.getVoices().filter(v => /^en[-_]/i.test(v.lang));
    return voices;
  }
  if (synth) {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }

  function pickVoice(pref) {
    if (!voices.length) loadVoices();
    const chosen = Store.s.settings.voice;
    if (!pref && chosen) {
      const v = voices.find(v => v.name === chosen);
      if (v) return v;
    }
    const byLang = lang => voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(lang));
    const gb = byLang('en-gb'), us = byLang('en-us'), au = byLang('en-au');
    const pool = [...gb, ...au, ...us, ...voices];
    if (pref === 'B') return pool.find(v => v !== pickVoice('A')) || pool[0] || null;
    if (pref === 'C') return pool[2] || pool[pool.length - 1] || null;
    return (chosen && voices.find(v => v.name === chosen)) || pool[0] || null;
  }

  function hasTTS() { return !!synth; }

  // Đọc một đoạn; trả về Promise kết thúc khi đọc xong
  function speak(text, opts = {}) {
    return new Promise(resolve => {
      if (!synth) { toast('Trình duyệt không hỗ trợ đọc văn bản (TTS).'); return resolve(); }
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(opts.voice);
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-GB'; }
      u.rate = opts.rate || Store.s.settings.rate || 0.95;
      u.pitch = opts.pitch || 1;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    });
  }

  function stopSpeak() { if (synth) synth.cancel(); }

  // Đọc lần lượt nhiều lượt thoại (hội thoại nhiều giọng)
  async function speakScript(lines, opts = {}) {
    stopSpeak();
    const token = {};
    speakScript.current = token;
    const speakers = [...new Set(lines.map(l => l.s))];
    for (let i = 0; i < lines.length; i++) {
      if (speakScript.current !== token) return false;
      if (opts.onLine) opts.onLine(i);
      const idx = speakers.indexOf(lines[i].s);
      const voice = ['A', 'B', 'C'][idx % 3];
      const pitch = [1, 1.15, 0.85][idx % 3];
      await speak(lines[i].t, { voice, pitch, rate: opts.rate });
      await new Promise(r => setTimeout(r, 250));
    }
    return speakScript.current === token;
  }
  function stopScript() { speakScript.current = null; stopSpeak(); }

  function speakBtn(text) {
    return `<button class="speak-btn" data-say="${esc(text)}" title="Nghe phát âm" aria-label="Nghe phát âm">🔊</button>`;
  }
  // Uỷ quyền sự kiện cho mọi nút 🔊
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); stopSpeak(); speak(b.dataset.say); }
  });

  /* ---------- Speech recognition ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function hasSR() { return !!SR; }

  // Tạo phiên nhận diện liên tục; onText(finalText, interimText)
  function recognizer(onText, onEnd) {
    if (!SR) return null;
    const r = new SR();
    r.lang = 'en-US';
    r.continuous = true;
    r.interimResults = true;
    let finalText = '';
    let stopped = false;
    r.onresult = ev => {
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) finalText += t + ' ';
        else interim += t;
      }
      onText(finalText.trim(), interim);
    };
    r.onerror = ev => {
      if (ev.error === 'not-allowed') toast('Bạn cần cho phép truy cập micro.');
    };
    r.onend = () => {
      // Chrome tự dừng sau một lúc im lặng: khởi động lại nếu người dùng chưa bấm dừng
      if (!stopped) { try { r.start(); } catch (e) { /* bỏ qua */ } }
      else if (onEnd) onEnd(finalText.trim());
    };
    return {
      start() { stopped = false; finalText = ''; try { r.start(); } catch (e) { /* đã chạy */ } },
      stop() { stopped = true; try { r.stop(); } catch (e) { /* bỏ qua */ } }
    };
  }

  /* ---------- Ghi âm ---------- */
  async function recorder() {
    if (!navigator.mediaDevices || !window.MediaRecorder) return null;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    const chunks = [];
    mr.ondataavailable = e => chunks.push(e.data);
    return {
      start() { mr.start(); },
      stop() {
        return new Promise(resolve => {
          mr.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            resolve(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/webm' })));
          };
          mr.stop();
        });
      }
    };
  }

  /* ---------- Hẹn giờ ---------- */
  // Đếm ngược; onTick(remain), onDone()
  function countdown(seconds, onTick, onDone) {
    let remain = seconds;
    onTick(remain);
    const h = setInterval(() => {
      remain--;
      onTick(remain);
      if (remain <= 0) { clearInterval(h); if (onDone) onDone(); }
    }, 1000);
    const c = { stop() { clearInterval(h); }, get remain() { return remain; } };
    U._timers.push(c);
    return c;
  }
  function stopwatch(onTick) {
    let t = 0;
    const h = setInterval(() => onTick(++t), 1000);
    const c = { stop() { clearInterval(h); }, get elapsed() { return t; } };
    U._timers.push(c);
    return c;
  }
  function clearTimers() { U._timers.forEach(t => t.stop()); U._timers = []; }

  /* ---------- Quy đổi band ---------- */
  // Bảng quy đổi Listening / Academic Reading (40 câu) theo IELTS
  const BAND_40 = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0]];
  function bandFrom40(raw) {
    for (const [min, b] of BAND_40) if (raw >= min) return b;
    return 0;
  }
  // Bài luyện ngắn: quy về thang 40 để ước lượng
  function bandFromScore(score, total) {
    if (!total) return 0;
    return bandFrom40(Math.round(score / total * 40));
  }
  // Làm tròn overall theo quy tắc IELTS (.25 → .5, .75 → lên 1)
  function overall(bands) {
    const avg = bands.reduce((a, b) => a + b, 0) / bands.length;
    const whole = Math.floor(avg), frac = avg - whole;
    if (frac < 0.25) return whole;
    if (frac < 0.75) return whole + 0.5;
    return whole + 1;
  }

  function normalize(s) {
    return String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function words(s) { return (String(s).match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []); }

  return {
    $, $$, esc, toast, shuffle, fmtTime, fmtDate,
    hasTTS, speak, stopSpeak, speakScript, stopScript, speakBtn, loadVoices, get voices() { return voices; },
    hasSR, recognizer, recorder,
    countdown, stopwatch, clearTimers, _timers: [],
    bandFrom40, bandFromScore, overall, normalize, words
  };
})();

/* So khớp từng từ giữa câu gốc và câu người học (dùng LCS).
 * Trả về { html, accuracy } — từ đúng tô xanh, từ thiếu/sai tô đỏ. */
U.diffWords = function (target, attempt) {
  const t = U.normalize(target).split(' ').filter(Boolean);
  const a = U.normalize(attempt).split(' ').filter(Boolean);
  const dp = Array.from({ length: t.length + 1 }, () => new Array(a.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--) {
    for (let j = a.length - 1; j >= 0; j--) {
      dp[i][j] = t[i] === a[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const matched = new Array(t.length).fill(false);
  let i = 0, j = 0;
  while (i < t.length && j < a.length) {
    if (t[i] === a[j]) { matched[i] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const origWords = target.split(/\s+/);
  // Nếu số từ khớp nhau thì hiển thị từ gốc (giữ hoa thường, dấu câu)
  const shown = origWords.length === t.length ? origWords : t;
  const html = shown.map((w, k) => `<span class="${matched[k] ? 'ok' : 'miss'}">${U.esc(w)}</span>`).join(' ');
  const correct = matched.filter(Boolean).length;
  // Phạt thêm nếu người học thêm nhiều từ thừa
  const extra = Math.max(0, a.length - t.length);
  const accuracy = t.length ? Math.max(0, Math.round((correct - extra * 0.5) / t.length * 100)) : 0;
  return { html, accuracy, correct, total: t.length };
};
