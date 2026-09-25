/* Speaking: Part 1–3, cue card có đếm giờ, ghi âm, chuyển giọng nói thành chữ, đo tốc độ & từ đệm, luyện phát âm. */
Pages.speaking = {
  cleanup: [],

  render(el, params) {
    const tab = params[0] || 'p1';
    el.innerHTML = `
      <div class="page-head"><h1>🎤 Speaking</h1>
        <p>Phỏng vấn trực tiếp 11–14 phút: <b>Part 1</b> (câu hỏi quen thuộc, 4–5 phút), <b>Part 2</b> (nói 2 phút theo cue card, 1 phút chuẩn bị),
        <b>Part 3</b> (thảo luận sâu, 4–5 phút). Hãy ghi âm và nghe lại — đó là cách tự sửa hiệu quả nhất.</p>
        ${U.hasSR() ? '' : '<div class="callout warn small">Trình duyệt này không hỗ trợ chuyển giọng nói thành chữ. Bạn vẫn ghi âm & nghe lại được; để có transcript và chấm phát âm, hãy dùng Chrome hoặc Edge trên máy tính.</div>'}
      </div>
      <div class="tabs">
        ${[['p1', 'Part 1'], ['p2', 'Part 2 & 3'], ['shadow', 'Phát âm / Shadowing'], ['phrases', 'Cụm từ & tự chấm']]
          .map(([k, n]) => `<button class="${tab === k ? 'active' : ''}" data-tab="${k}">${n}</button>`).join('')}
      </div>
      <div id="tab"></div>`;
    el.querySelector('.tabs').onclick = e => { const b = e.target.closest('button'); if (b) location.hash = '#/speaking/' + b.dataset.tab; };
    const box = U.$('#tab', el);
    if (tab === 'p2') this.part2(box, params[1]);
    else if (tab === 'shadow') this.shadow(box);
    else if (tab === 'phrases') this.phrases(box);
    else this.part1(box);
  },

  leave() {
    this.cleanup.forEach(f => { try { f(); } catch (e) { /* bỏ qua */ } });
    this.cleanup = [];
  },

  // Khối ghi âm + transcript + phân tích, dùng lại cho mọi phần
  recorderBlock(box, opts = {}) {
    box.innerHTML = `
      <div class="row"><button class="btn rec" data-r="rec">⏺ Ghi âm & trả lời</button>
        <button class="btn hidden" data-r="stop">■ Dừng</button>
        <span class="timer" data-r="time">00:00</span><span class="spacer"></span></div>
      <audio data-r="audio" controls class="hidden mt" style="width:100%"></audio>
      <div data-r="live" class="transcript mt hidden"></div>
      <div data-r="stats" class="mt"></div>`;
    const q = s => box.querySelector(`[data-r="${s}"]`);
    let rec = null, sr = null, watch = null, finalText = '';

    const stop = async () => {
      if (watch) watch.stop();
      if (sr) sr.stop();
      q('stop').classList.add('hidden');
      q('rec').classList.remove('hidden');
      if (rec) {
        const url = await rec.stop();
        rec = null;
        q('audio').src = url;
        q('audio').classList.remove('hidden');
      }
      const secs = watch ? watch.elapsed : 0;
      if (U.hasSR()) q('stats').innerHTML = this.speechStats(finalText, secs, opts.target);
      if (opts.onDone) opts.onDone(finalText, secs);
      Store.logActivity();
    };

    q('rec').onclick = async () => {
      finalText = '';
      try { rec = await U.recorder(); } catch (e) { rec = null; U.toast('Không truy cập được micro — hãy cấp quyền trong trình duyệt.'); }
      if (rec) rec.start();
      if (U.hasSR()) {
        q('live').classList.remove('hidden');
        q('live').textContent = '…';
        sr = U.recognizer((f, interim) => { finalText = f; q('live').textContent = (f + ' ' + interim).trim() || '…'; });
        sr.start();
      }
      if (!rec && !sr) return;
      q('rec').classList.add('hidden');
      q('stop').classList.remove('hidden');
      q('stats').innerHTML = '';
      watch = U.stopwatch(t => {
        q('time').textContent = U.fmtTime(t);
        if (opts.maxSec && t >= opts.maxSec) { U.toast('Hết thời gian!'); stop(); }
      });
    };
    q('stop').onclick = stop;
    this.cleanup.push(() => { if (sr) sr.stop(); if (rec) rec.stop(); });
  },

  speechStats(text, secs, target) {
    const ws = U.words(text);
    if (!ws.length) return '<div class="callout warn small">Không nhận được giọng nói. Hãy nói to, rõ và kiểm tra micro.</div>';
    const wpm = secs ? Math.round(ws.length / secs * 60) : 0;
    const lower = ' ' + U.normalize(text) + ' ';
    const fillers = SPEAKING.fillers.map(f => [f, (lower.match(new RegExp(' ' + f + ' ', 'g')) || []).length]).filter(x => x[1]);
    const fillerTotal = fillers.reduce((a, b) => a + b[1], 0);
    const uniq = Math.round(new Set(ws.map(w => w.toLowerCase())).size / ws.length * 100);
    let html = U.esc(text);
    SPEAKING.fillers.forEach(f => { html = html.replace(new RegExp('\\b(' + f + ')\\b', 'gi'), '<span class="filler">$1</span>'); });
    const tips = [];
    if (wpm && wpm < 100) tips.push('Tốc độ hơi chậm — band 7 thường nói khoảng 120–160 từ/phút, trôi chảy, ít ngập ngừng.');
    if (wpm > 180) tips.push('Bạn nói khá nhanh — chậm lại một chút để phát âm rõ và nhấn trọng âm câu.');
    if (fillerTotal / ws.length > 0.05) tips.push('Dùng nhiều từ đệm — thay bằng cụm câu giờ tự nhiên (Let me think… / That’s an interesting question).');
    if (target === 'p2' && secs < 90) tips.push('Part 2 nên nói gần đủ 2 phút. Hãy kể thêm chi tiết, cảm xúc, ví dụ.');
    if (target === 'p1' && ws.length < 20) tips.push('Câu trả lời Part 1 hơi ngắn — hãy thêm lý do hoặc ví dụ (2–3 câu).');
    return `<div class="metrics">
        <div class="metric"><b>${ws.length}</b><span>từ</span></div>
        <div class="metric"><b>${wpm}</b><span>từ/phút</span></div>
        <div class="metric"><b>${fillerTotal}</b><span>từ đệm</span></div>
        <div class="metric"><b>${uniq}%</b><span>từ khác nhau</span></div>
      </div>
      <div class="transcript mt">${html}</div>
      ${tips.length ? `<ul class="mt small">${tips.map(t => `<li>${t}</li>`).join('')}</ul>` : '<p class="small mt">✅ Tốc độ và độ trôi chảy khá tốt. Nghe lại bản ghi để kiểm tra phát âm và ngữ pháp.</p>'}
      <p class="small muted">Transcript do máy nhận diện: từ bị nhận sai có thể là dấu hiệu phát âm chưa rõ.</p>`;
  },

  part1(box) {
    const all = SPEAKING.part1.flatMap(t => t.qs.map(q => ({ topic: t.topic, q })));
    let cur = U.shuffle(all)[0];
    const ex = SPEAKING.part1Sample;
    box.innerHTML = `
      <div class="grid grid-2">
        <div class="card">
          <div class="row"><span class="tag blue" id="topic"></span><span class="spacer"></span><button class="btn sm" id="nextQ">🔀 Câu khác</button></div>
          <h2 class="mt" id="question"></h2>
          <div class="row"><button class="btn sm" id="hear">🔊 Nghe giám khảo hỏi</button></div>
          <div class="mt" id="rec"></div>
        </div>
        <div class="card">
          <h3>Câu trả lời band 5 vs band 7+</h3>
          <p><b>Q:</b> ${U.esc(ex.q)}</p>
          <div class="callout bad small"><b>Band 5:</b> ${U.esc(ex.weak)}</div>
          <div class="callout good small"><b>Band 7+:</b> ${U.esc(ex.strong)} ${U.speakBtn(ex.strong)}</div>
          <p class="small">${U.esc(ex.note)}</p>
          <h3>Tất cả chủ đề Part 1</h3>
          ${SPEAKING.part1.map(t => `<details><summary>${U.esc(t.topic)}</summary><ul>${t.qs.map(q => `<li>${U.esc(q)} ${U.speakBtn(q)}</li>`).join('')}</ul></details>`).join('')}
        </div>
      </div>`;
    const show = () => {
      U.$('#topic', box).textContent = cur.topic;
      U.$('#question', box).textContent = cur.q;
      this.recorderBlock(U.$('#rec', box), { target: 'p1', maxSec: 60 });
    };
    U.$('#nextQ', box).onclick = () => { cur = U.shuffle(all.filter(x => x !== cur))[0]; show(); U.speak(cur.q); };
    U.$('#hear', box).onclick = () => U.speak(cur.q);
    show();
  },

  part2(box, id) {
    const card = SPEAKING.part2.find(c => c.id === id);
    if (!card) {
      box.innerHTML = `<div class="grid grid-2"><div>${SPEAKING.part2.map(c => `<a class="list-item" href="#/speaking/p2/${c.id}">
          <span class="li-main"><span class="li-title">${U.esc(c.topic)}</span></span>${c.sample ? '<span class="tag">có bài mẫu</span>' : ''}›</a>`).join('')}</div>
        <div class="card"><h2>💡 Chiến lược Part 2</h2><ul>
          <li>Dùng 1 phút chuẩn bị để ghi <b>từ khoá</b> cho từng gợi ý, không viết câu hoàn chỉnh.</li>
          <li>Nói theo trình tự gợi ý, mỗi ý ~25–30 giây; thêm <b>chi tiết, cảm xúc, ví dụ</b>.</li>
          <li>Dùng thì quá khứ chính xác khi kể chuyện; kết thúc bằng câu tổng kết.</li>
          <li>Nói tới khi giám khảo dừng — đừng tự dừng ở 1 phút.</li></ul>
          <h3>Công thức trả lời Part 3</h3>
          <table class="small">${SPEAKING.part3Formula.map(([a, b]) => `<tr><th>${U.esc(a)}</th><td>${U.esc(b)}</td></tr>`).join('')}</table></div></div>`;
      return;
    }
    box.innerHTML = `
      <p><a href="#/speaking/p2">← Danh sách cue card</a></p>
      <div class="grid grid-2">
        <div>
          <div class="cue-card"><h2>${U.esc(card.topic)}</h2><p class="mb0">You should say:</p>
            <ul>${card.points.map(p => `<li>${U.esc(p)}</li>`).join('')}</ul></div>
          <div class="card mt">
            <div class="big-timer" id="bt">01:00</div>
            <p class="center small muted" id="phase">Bấm bắt đầu: 1 phút chuẩn bị, sau đó ghi âm 2 phút.</p>
            <div class="row" style="justify-content:center"><button class="btn primary" id="prep">▶ Bắt đầu chuẩn bị</button></div>
            <textarea rows="4" class="mt" placeholder="Ghi chú từ khoá khi chuẩn bị…"></textarea>
          </div>
          <div class="card"><h3>🎙️ Phần nói (tối đa 2 phút)</h3><div id="rec"></div></div>
        </div>
        <div>
          <div class="card"><h3>Part 3 — Câu hỏi thảo luận</h3>
            ${card.part3.map((q, i) => `<div class="list-item" style="cursor:default"><span class="li-main">${U.esc(q)}</span>${U.speakBtn(q)}
              <button class="btn sm" data-p3="${i}">🎙️</button></div>`).join('')}
            <div id="p3rec" class="mt"></div>
          </div>
          ${card.sample ? `<div class="card"><details><summary><b>📄 Bài nói mẫu band 8</b></summary>
            <div class="mt">${card.sample.split('\n\n').map(p => `<p>${U.esc(p)}</p>`).join('')}</div>
            <button class="btn sm" id="playSample">🔊 Nghe bài mẫu</button></details></div>` : ''}
        </div>
      </div>`;
    const bt = U.$('#bt', box);
    const recBox = U.$('#rec', box);
    this.recorderBlock(recBox, { target: 'p2', maxSec: 120, onDone: (t, secs) => {
      Store.addResult({ kind: 'speaking-practice', id: card.id, title: 'Part 2: ' + card.topic.slice(0, 40), score: U.words(t).length, total: null });
    } });
    U.$('#prep', box).onclick = e => {
      e.target.disabled = true;
      U.$('#phase', box).textContent = 'Đang chuẩn bị… ghi chú từ khoá!';
      U.countdown(60, r => { bt.textContent = U.fmtTime(r); }, () => {
        U.$('#phase', box).textContent = 'Hết giờ chuẩn bị — bắt đầu nói!';
        U.toast('Bắt đầu nói!');
        const recBtn = recBox.querySelector('[data-r="rec"]');
        if (recBtn) recBtn.click();
      });
    };
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-p3]');
      if (!b) return;
      const q = card.part3[+b.dataset.p3];
      const host = U.$('#p3rec', box);
      host.innerHTML = `<div class="callout small"><b>${U.esc(q)}</b></div><div></div>`;
      U.speak(q);
      this.recorderBlock(host.lastElementChild, { target: 'p3', maxSec: 90 });
    });
    const ps = U.$('#playSample', box);
    if (ps) ps.onclick = () => { U.stopSpeak(); U.speak(card.sample); };
  },

  shadow(box) {
    let i = 0;
    box.innerHTML = `
      <div class="card">
        <p>Shadowing: nghe câu mẫu → bắt chước <b>ngữ điệu, nối âm, âm cuối</b> → bấm "Đọc lại" để máy nhận diện và so khớp.
        Mục tiêu độ chính xác ≥ 90%.</p>
        <div class="row"><span class="tag blue" id="cnt"></span><span class="spacer"></span>
          <label class="small">Tốc độ mẫu <select id="rate"><option value="0.75">Chậm</option><option value="0.95" selected>Bình thường</option></select></label></div>
        <h2 class="mt" id="sent"></h2>
        <div class="row"><button class="btn" id="listen">🔊 Nghe mẫu</button>
          <button class="btn rec" id="say">🎙️ Đọc lại</button>
          <button class="btn" id="next">Câu tiếp ›</button></div>
        <div id="res" class="mt"></div>
      </div>
      <div class="card"><h3>Lỗi phát âm phổ biến của người Việt</h3><ul>
        <li><b>Âm cuối</b> (/s/, /z/, /t/, /d/, /k/): <i>works, played, asked</i> — người Việt hay nuốt âm cuối.</li>
        <li><b>/θ/ và /ð/</b>: <i>think, three</i> ≠ <i>tink</i>; <i>this, that</i> ≠ <i>dis, dat</i>.</li>
        <li><b>/ʃ/ và /s/</b>: <i>ship</i> vs <i>sip</i>. <b>/r/ và /z/</b>: <i>rice</i> ≠ <i>zice</i>.</li>
        <li><b>Trọng âm từ</b>: <i>eCOnomy, ecoNOmic, PHOtograph, phoTOgraphy</i>.</li>
        <li><b>Nối âm</b>: <i>turn_it_off, pick_it_up</i>. <b>Ngữ điệu</b>: xuống giọng cuối câu trần thuật.</li></ul></div>`;
    const sents = SPEAKING.shadowing;
    const show = () => { U.$('#cnt', box).textContent = `Câu ${i + 1}/${sents.length}`; U.$('#sent', box).textContent = sents[i]; U.$('#res', box).innerHTML = ''; };
    U.$('#listen', box).onclick = () => { U.stopSpeak(); U.speak(sents[i], { rate: parseFloat(U.$('#rate', box).value) }); };
    U.$('#next', box).onclick = () => { i = (i + 1) % sents.length; show(); };
    let sr = null;
    U.$('#say', box).onclick = e => {
      if (!U.hasSR()) return U.toast('Cần Chrome/Edge để dùng nhận diện giọng nói.');
      const btn = e.target;
      if (sr) { sr.stop(); return; }
      btn.textContent = '■ Dừng';
      let got = '';
      sr = U.recognizer(f => { got = f; U.$('#res', box).innerHTML = `<div class="transcript">${U.esc(f)}</div>`; }, final => {
        sr = null;
        btn.textContent = '🎙️ Đọc lại';
        const r = U.diffWords(sents[i], final || got);
        U.$('#res', box).innerHTML = `<div class="callout ${r.accuracy >= 90 ? 'good' : r.accuracy >= 70 ? '' : 'warn'}"><b>Độ khớp: ${r.accuracy}%</b>
          <div class="diff mt">${r.html}</div><div class="small muted mt">Máy nghe được: "${U.esc(final || got)}"</div></div>`;
        Store.logActivity();
      });
      sr.start();
      // Tự dừng sau 12 giây
      setTimeout(() => { if (sr) sr.stop(); }, 12000);
    };
    this.cleanup.push(() => { if (sr) sr.stop(); });
    show();
  },

  phrases(box) {
    box.innerHTML = `<div class="grid grid-2">${SPEAKING.phrases.map(([title, list]) => `<div class="card"><h3>${U.esc(title)}</h3>
      <ul>${list.map(p => `<li>${U.esc(p)} ${U.speakBtn(p)}</li>`).join('')}</ul></div>`).join('')}
      <div class="card"><h3>Tiêu chí chấm Speaking</h3><table class="small">
        <tr><th>Fluency & Coherence</th><td>Nói trôi chảy, ít ngập ngừng; ý có liên kết.</td></tr>
        <tr><th>Lexical Resource</th><td>Dùng từ linh hoạt, có idiom/collocation tự nhiên; biết paraphrase.</td></tr>
        <tr><th>Grammatical Range & Accuracy</th><td>Kết hợp câu đơn & phức; nhiều câu không lỗi.</td></tr>
        <tr><th>Pronunciation</th><td>Dễ hiểu; trọng âm, ngữ điệu, nối âm tự nhiên; âm cuối rõ.</td></tr></table></div>
      <div class="card"><h3>📝 Tự chấm sau khi nghe lại bản ghi</h3>
        <p class="small muted">Nghe lại một bài nói đầy đủ (hoặc nhờ bạn/giáo viên chấm), chọn band cho từng tiêu chí.</p>
        <div class="grid grid-2">${['Fluency & Coherence', 'Lexical Resource', 'Grammar', 'Pronunciation'].map((n, i) =>
          `<label class="small">${n}<br><select data-crit="${i}">${[5, 5.5, 6, 6.5, 7, 7.5, 8].map(b => `<option ${b === 6 ? 'selected' : ''}>${b.toFixed(1)}</option>`).join('')}</select></label>`).join('')}</div>
        <div class="row mt"><button class="btn success" id="saveSpk">Lưu band Speaking</button><span id="spkOut"></span></div></div></div>`;
    const calc = () => {
      const vals = U.$$('[data-crit]', box).map(s => +s.value);
      const band = Math.floor(vals.reduce((a, b) => a + b, 0) / 4 * 2) / 2;
      U.$('#spkOut', box).innerHTML = `Band: <span class="tag ${band >= 7 ? 'green' : 'blue'}">${band.toFixed(1)}</span>`;
      return band;
    };
    box.addEventListener('change', calc);
    calc();
    U.$('#saveSpk', box).onclick = () => {
      Store.addResult({ kind: 'speaking', id: 'self', title: 'Tự chấm Speaking', band: calc() });
      U.toast('Đã lưu band Speaking ✔');
    };
  }
};
