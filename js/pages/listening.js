/* Listening: bài nghe mô phỏng 4 Section (đọc bằng TTS) + chép chính tả. */
Pages.listening = {
  render(el, params) {
    if (!params[0]) return this.index(el);
    if (params[0] === 'dictation') return this.dictation(el);
    const test = LISTENING.find(t => t.id === params[0]);
    if (!test) return this.index(el);
    this.test(el, test);
  },

  leave() { U.stopScript(); },

  index(el) {
    const done = id => Store.s.results.filter(r => r.kind === 'listening' && r.id === id);
    el.innerHTML = `
      <div class="page-head">
        <h1>🎧 Listening</h1>
        <p>IELTS Listening gồm 4 Section (40 câu, ~30 phút). Section 1–2 về đời sống, Section 3–4 về học thuật.
        Bài nghe ở đây được đọc bằng giọng máy của trình duyệt — hãy dùng Chrome/Edge để có giọng Anh–Anh tự nhiên hơn.</p>
        ${U.hasTTS() ? '' : '<div class="callout bad">Trình duyệt không hỗ trợ đọc văn bản. Hãy dùng Chrome, Edge hoặc Safari bản mới.</div>'}
      </div>
      <div class="grid grid-2">
        <div>
          <h2>Bài nghe theo Section</h2>
          ${LISTENING.map(t => {
            const r = done(t.id);
            const best = r.length ? Math.max(...r.map(x => x.band)) : null;
            return `<a class="list-item" href="#/listening/${t.id}">
              <span class="tag blue">S${t.section}</span>
              <span class="li-main"><span class="li-title">${U.esc(t.title)}</span><br><span class="small muted">Band ${t.level} · ${t.questions.reduce((a, g) => a + g.items.length, 0)} câu</span></span>
              ${best != null ? `<span class="tag green">${best.toFixed(1)}</span>` : ''}›</a>`;
          }).join('')}
          <a class="list-item" href="#/listening/dictation"><span class="tag orange">✎</span>
            <span class="li-main"><span class="li-title">Chép chính tả (Dictation)</span><br><span class="small muted">${DICTATION.length} câu, tăng dần độ khó — luyện nghe chi tiết & chính tả</span></span>›</a>
        </div>
        <div class="card">
          <h2>💡 Chiến lược Listening band 7</h2>
          <ul>
            <li><b>Đọc trước câu hỏi</b> và gạch chân từ khoá, đoán loại từ cần điền (số, tên, danh từ...).</li>
            <li>Cẩn thận <b>bẫy sửa lời</b>: "Actually…", "Sorry, I mean…", "No, wait…".</li>
            <li>Đáp án thường là <b>paraphrase</b> của câu hỏi, hiếm khi trùng từ.</li>
            <li>Viết đúng <b>chính tả</b> và <b>số ít/số nhiều</b>; tuân thủ giới hạn số từ.</li>
            <li>Nếu lỡ một câu, <b>bỏ qua ngay</b> và theo kịp câu tiếp theo.</li>
            <li>Band 7 ≈ <b>30/40</b> câu đúng.</li>
          </ul>
        </div>
      </div>`;
  },

  test(el, t) {
    const exam = { plays: 0 };
    el.innerHTML = `
      <p><a href="#/listening">← Danh sách bài nghe</a></p>
      <div class="page-head">
        <h1>Section ${t.section}: ${U.esc(t.title)}</h1>
        <p>${U.esc(t.desc)}</p>
      </div>
      <div class="card">
        <div class="row">
          <button class="btn primary" id="play">▶ Nghe</button>
          <button class="btn" id="stop">■ Dừng</button>
          <label class="small">Tốc độ
            <select id="rate"><option value="0.8">0.8x</option><option value="0.95" selected>1.0x</option><option value="1.1">1.1x</option></select>
          </label>
          <label class="small"><input type="checkbox" id="practice" /> Chế độ luyện tập (nghe lại nhiều lần)</label>
          <span class="spacer"></span>
          <span class="small muted" id="playInfo">Chế độ thi: chỉ được nghe 1 lần</span>
        </div>
        <div class="progress mt"><span id="bar" style="width:0%"></span></div>
      </div>
      <div class="card"><div id="qs"></div>
        <div class="row"><button class="btn success" id="submit">Nộp bài & chấm</button><span class="spacer"></span>
        <button class="btn hidden" id="showScript">📜 Xem transcript</button></div>
        <div id="result" class="mt"></div>
      </div>
      <div class="card hidden" id="scriptBox"><h3>Transcript</h3>
        ${t.script.map((l, i) => `<p data-line="${i}"><b>${U.esc(l.s)}:</b> ${U.esc(l.t)} ${U.speakBtn(l.t)}</p>`).join('')}
      </div>`;

    const quiz = Quiz.render(U.$('#qs', el), t.questions);
    const playBtn = U.$('#play', el);

    playBtn.onclick = async () => {
      const practice = U.$('#practice', el).checked;
      if (!practice && exam.plays >= 1) return U.toast('Chế độ thi chỉ cho nghe 1 lần. Bật "Chế độ luyện tập" để nghe lại.');
      exam.plays++;
      playBtn.disabled = true;
      U.$('#playInfo', el).textContent = 'Đang phát…';
      const rate = parseFloat(U.$('#rate', el).value);
      await U.speakScript(t.script, {
        rate,
        onLine: i => {
          const bar = U.$('#bar', el);
          if (bar) bar.style.width = ((i + 1) / t.script.length * 100) + '%';
        }
      });
      if (!document.body.contains(playBtn)) return;
      playBtn.disabled = false;
      U.$('#playInfo', el).textContent = `Đã nghe ${exam.plays} lần`;
    };
    U.$('#stop', el).onclick = () => { U.stopScript(); playBtn.disabled = false; };

    U.$('#submit', el).onclick = () => {
      U.stopScript();
      const { score, total } = quiz.check();
      const band = U.bandFromScore(score, total);
      U.$('#result', el).innerHTML = Quiz.resultBox(score, total, 'Xem transcript để tìm chỗ nghe sai — đó là cách tiến bộ nhanh nhất.');
      Store.addResult({ kind: 'listening', id: t.id, title: t.title, score, total, band });
      U.$('#submit', el).disabled = true;
      U.$('#showScript', el).classList.remove('hidden');
    };
    U.$('#showScript', el).onclick = () => U.$('#scriptBox', el).classList.toggle('hidden');
  },

  dictation(el) {
    let idx = 0, total = 0, sum = 0;
    el.innerHTML = `
      <p><a href="#/listening">← Danh sách bài nghe</a></p>
      <div class="page-head"><h1>✎ Chép chính tả (Dictation)</h1>
        <p>Nghe câu, gõ lại chính xác từng từ. Dictation giúp bạn nghe được âm cuối, từ nối và chính tả — những lỗi làm mất điểm Listening nhiều nhất.</p></div>
      <div class="card">
        <div class="row"><span class="tag blue" id="counter"></span><span class="spacer"></span><span class="small muted" id="avg"></span></div>
        <div class="row mt">
          <button class="btn primary" id="play">▶ Nghe</button>
          <button class="btn" id="slow">🐢 Nghe chậm</button>
        </div>
        <textarea id="answer" rows="3" class="mt" placeholder="Gõ lại câu bạn nghe được…" spellcheck="false"></textarea>
        <div class="row mt"><button class="btn success" id="check">Kiểm tra (Enter)</button>
          <button class="btn" id="next">Câu tiếp ›</button></div>
        <div id="out" class="mt"></div>
      </div>`;

    const show = () => {
      U.$('#counter', el).textContent = `Câu ${idx + 1}/${DICTATION.length}`;
      U.$('#answer', el).value = '';
      U.$('#out', el).innerHTML = '';
      U.$('#answer', el).focus();
    };
    const sentence = () => DICTATION[idx];
    U.$('#play', el).onclick = () => { U.stopSpeak(); U.speak(sentence()); };
    U.$('#slow', el).onclick = () => { U.stopSpeak(); U.speak(sentence(), { rate: 0.7 }); };
    const check = () => {
      const r = U.diffWords(sentence(), U.$('#answer', el).value);
      total++; sum += r.accuracy;
      U.$('#out', el).innerHTML = `<div class="callout ${r.accuracy >= 90 ? 'good' : r.accuracy >= 70 ? '' : 'warn'}">
        <b>Độ chính xác: ${r.accuracy}%</b><div class="diff mt">${r.html}</div></div>`;
      U.$('#avg', el).textContent = `Trung bình: ${Math.round(sum / total)}% (${total} lần)`;
      if (total % 5 === 0) Store.addResult({ kind: 'dictation', id: 'dictation', title: 'Dictation (5 câu)', score: Math.round(sum / total), total: 100 });
      else Store.logActivity();
    };
    U.$('#check', el).onclick = check;
    U.$('#answer', el).addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); } });
    U.$('#next', el).onclick = () => { idx = (idx + 1) % DICTATION.length; show(); U.speak(sentence()); };
    show();
  }
};
