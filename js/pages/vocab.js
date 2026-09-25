/* Từ vựng: flashcard lặp lại ngắt quãng (SRS, dựa trên SM-2), quiz, danh sách từ theo chủ đề. */
Pages.vocab = {
  DAY: 86400000,

  allWords() {
    return VOCAB_TOPICS.flatMap(t => t.words.map(w => ({
      id: t.id + ':' + w[0], topic: t.id, word: w[0], ipa: w[1], pos: w[2], vi: w[3], def: w[4], ex: w[5], col: w[6]
    })));
  },

  render(el, params) {
    const [mode, topic] = params;
    if (mode === 'study') return this.study(el, topic);
    if (mode === 'quiz') return this.quiz(el, topic);
    if (mode === 'list') return this.list(el, topic);
    this.index(el);
  },

  index(el) {
    const s = Store.s.vocab, now = Date.now();
    const due = Object.values(s).filter(c => c.due <= now).length;
    el.innerHTML = `
      <div class="page-head"><h1>🧠 Từ vựng IELTS (SRS)</h1>
        <p>Flashcard dùng thuật toán <b>lặp lại ngắt quãng</b>: từ bạn nhớ tốt sẽ xuất hiện thưa dần, từ hay quên sẽ được ôn lại sớm.
        Chỉ cần 15 phút mỗi ngày. Từ vựng chiếm 25% điểm Writing và Speaking (Lexical Resource).</p></div>
      <div class="card row">
        <div><b>${Object.keys(s).length}</b> từ đã học · <b>${due}</b> thẻ đến hạn ôn</div><span class="spacer"></span>
        <a class="btn primary" href="#/vocab/study/review" ${due ? '' : 'aria-disabled="true"'}>🔁 Ôn thẻ đến hạn (${due})</a>
      </div>
      <div class="grid grid-3">
        ${VOCAB_TOPICS.map(t => {
          const learned = t.words.filter(w => s[t.id + ':' + w[0]]).length;
          const mastered = t.words.filter(w => { const c = s[t.id + ':' + w[0]]; return c && c.interval >= 7; }).length;
          return `<div class="card">
            <h3 class="mb0">${U.esc(t.name)}</h3><p class="small muted">${U.esc(t.vi)} · ${t.words.length} từ</p>
            <div class="progress"><span style="width:${learned / t.words.length * 100}%"></span></div>
            <p class="small muted mt">${learned} đã học · ${mastered} đã thuộc (≥ 7 ngày)</p>
            <div class="row"><a class="btn sm primary" href="#/vocab/study/${t.id}">Học</a>
              <a class="btn sm" href="#/vocab/quiz/${t.id}">Quiz</a><a class="btn sm" href="#/vocab/list/${t.id}">Danh sách</a></div>
          </div>`;
        }).join('')}
      </div>
      <div class="callout small">💡 Học từ theo <b>collocation</b> (cụm từ đi kèm) thay vì từ đơn lẻ — ví dụ học "<i>mitigate the impact</i>" thay vì chỉ "<i>mitigate</i>". Hãy đặt 1 câu của riêng bạn với mỗi từ mới.</div>`;
  },

  schedule(id, grade) {
    const s = Store.s.vocab;
    const c = s[id] || { ef: 2.5, interval: 0, reps: 0, lapses: 0, due: 0 };
    if (grade === 0) { c.reps = 0; c.lapses++; c.interval = 0; c.ef = Math.max(1.3, c.ef - 0.2); }
    else if (grade === 1) { c.interval = Math.max(1, c.interval * 1.2); c.ef = Math.max(1.3, c.ef - 0.15); c.reps++; }
    else {
      c.interval = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ef);
      if (grade === 3) { c.interval = Math.round(c.interval * 1.3) + 1; c.ef += 0.15; }
      c.reps++;
    }
    // "Quên" → ôn lại sau 1 phút trong phiên; còn lại theo số ngày
    c.due = Date.now() + (c.interval ? c.interval * this.DAY : 60000);
    s[id] = c;
    Store.save();
    return c;
  },

  label(grade, id) {
    const c = Store.s.vocab[id] || { ef: 2.5, interval: 0, reps: 0 };
    let d;
    if (grade === 0) return '< 1 phút';
    if (grade === 1) d = Math.max(1, c.interval * 1.2);
    else { d = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ef); if (grade === 3) d = Math.round(d * 1.3) + 1; }
    return Math.round(d) + ' ngày';
  },

  study(el, topic) {
    const all = this.allWords(), s = Store.s.vocab, now = Date.now();
    let queue;
    if (topic === 'review') queue = all.filter(w => s[w.id] && s[w.id].due <= now);
    else {
      const tw = all.filter(w => w.topic === topic);
      const dueHere = tw.filter(w => s[w.id] && s[w.id].due <= now);
      const fresh = tw.filter(w => !s[w.id]).slice(0, 10);
      queue = [...dueHere, ...fresh];
    }
    queue = U.shuffle(queue);
    const t = VOCAB_TOPICS.find(x => x.id === topic);
    let reviewed = 0;

    el.innerHTML = `<p><a href="#/vocab">← Từ vựng</a></p>
      <div class="page-head"><h1>${topic === 'review' ? 'Ôn thẻ đến hạn' : 'Học: ' + U.esc(t ? t.name : '')}</h1>
      <p class="small muted">Nhìn từ, tự nhớ nghĩa và cách dùng, rồi bấm thẻ (hoặc phím Space) để lật. Đánh giá trung thực mức độ nhớ (phím 1–4).</p></div>
      <div class="row"><span class="tag blue" id="left"></span></div>
      <div id="stage" class="mt"></div>`;

    const stage = U.$('#stage', el);
    const next = () => {
      U.$('#left', el).textContent = `Còn ${queue.length} thẻ · đã ôn ${reviewed}`;
      if (!queue.length) {
        stage.innerHTML = `<div class="card center"><h2>🎉 Hoàn thành!</h2><p>Bạn đã ôn ${reviewed} thẻ trong phiên này. Quay lại vào ngày mai để ôn thẻ đến hạn.</p>
          <a class="btn primary" href="#/vocab">Về trang từ vựng</a></div>`;
        if (reviewed) Store.logActivity();
        return;
      }
      const w = queue[0];
      let flipped = false;
      stage.innerHTML = `<div class="flashcard" id="card" tabindex="0">
          <div class="word">${U.esc(w.word)} ${U.speakBtn(w.word)}</div>
          <div class="ipa">${U.esc(w.ipa)} · <i>${U.esc(w.pos)}</i></div>
          <div id="back" class="hidden">
            <div class="meaning">${U.esc(w.vi)}</div>
            <div class="small muted">${U.esc(w.def)}</div>
            <p class="example mt">“${U.esc(w.ex)}” ${U.speakBtn(w.ex)}</p>
            ${w.col ? `<div class="small"><b>Collocations:</b> ${U.esc(w.col)}</div>` : ''}
          </div>
          <div class="small muted" id="hint">Bấm để lật thẻ</div>
        </div>
        <div class="rate-btns hidden" id="rate">
          ${[['Quên', 0, 'danger'], ['Khó', 1, ''], ['Nhớ', 2, 'primary'], ['Dễ', 3, 'success']].map(([n, g, cls], k) =>
            `<button class="btn ${cls}" data-g="${g}">${k + 1}. ${n}<small>${this.label(g, w.id)}</small></button>`).join('')}
        </div>`;
      const flip = () => {
        if (flipped) return;
        flipped = true;
        U.$('#back', stage).classList.remove('hidden');
        U.$('#hint', stage).classList.add('hidden');
        U.$('#rate', stage).classList.remove('hidden');
        U.speak(w.word);
      };
      U.$('#card', stage).onclick = e => { if (!e.target.closest('[data-say]')) flip(); };
      U.$('#rate', stage).onclick = e => {
        const b = e.target.closest('[data-g]');
        if (b) rate(+b.dataset.g);
      };
      const rate = g => {
        this.schedule(w.id, g);
        reviewed++;
        queue.shift();
        if (g === 0) queue.splice(Math.min(queue.length, 3), 0, w); // xuất hiện lại sau vài thẻ
        next();
      };
      stage._flip = flip;
      stage._rate = g => { if (flipped) rate(g); };
    };

    const onKey = e => {
      if (!document.body.contains(stage) || !stage._flip) return;
      if (e.code === 'Space') { e.preventDefault(); stage._flip(); }
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) stage._rate(+e.code.slice(-1) - 1);
    };
    document.addEventListener('keydown', onKey);
    this.leave = () => document.removeEventListener('keydown', onKey);
    next();
  },

  quiz(el, topic) {
    const all = this.allWords();
    const pool = all.filter(w => w.topic === topic);
    const qs = U.shuffle(pool).slice(0, 10);
    const t = VOCAB_TOPICS.find(x => x.id === topic);
    const groups = [
      {
        instr: 'Chọn nghĩa tiếng Việt đúng.', type: 'choice',
        items: qs.slice(0, 5).map(w => ({ q: w.word, options: U.shuffle([w.vi, ...U.shuffle(all.filter(x => x.id !== w.id)).slice(0, 3).map(x => x.vi)]), a: w.vi }))
      },
      {
        instr: 'Điền từ đúng vào câu (dựa vào định nghĩa trong ngoặc).', type: 'text',
        items: qs.slice(5).map(w => {
          const re = new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i');
          const m = w.ex.match(re);
          return m
            ? { q: w.ex.replace(m[0], '___') + ` (${w.def})`, a: [m[0], w.word] }
            : { q: `___ (${w.def})`, a: [w.word] };
        })
      }
    ];
    el.innerHTML = `<p><a href="#/vocab">← Từ vựng</a></p><div class="page-head"><h1>Quiz: ${U.esc(t ? t.name : '')}</h1></div>
      <div class="card"><div id="qs"></div><div class="row"><button class="btn success" id="submit">Chấm điểm</button>
      <button class="btn" id="again">🔀 Làm bộ khác</button></div><div id="res" class="mt"></div></div>`;
    const quiz = Quiz.render(U.$('#qs', el), groups);
    U.$('#again', el).onclick = () => App.route();
    U.$('#submit', el).onclick = () => {
      const { score, total } = quiz.check();
      U.$('#res', el).innerHTML = `<div class="callout ${score / total >= 0.8 ? 'good' : 'warn'}"><b>${score}/${total}</b> câu đúng.
        ${score / total < 0.8 ? 'Hãy học lại chủ đề này bằng flashcard.' : 'Tuyệt vời!'}</div>`;
      Store.addResult({ kind: 'vocab', id: topic, title: 'Quiz ' + (t ? t.name : ''), score, total });
      U.$('#submit', el).disabled = true;
    };
  },

  list(el, topic) {
    const t = VOCAB_TOPICS.find(x => x.id === topic) || VOCAB_TOPICS[0];
    el.innerHTML = `<p><a href="#/vocab">← Từ vựng</a></p>
      <div class="page-head"><h1>${U.esc(t.name)} — ${U.esc(t.vi)}</h1></div>
      <div class="table-wrap card"><table><tr><th>Từ</th><th>Nghĩa</th><th>Ví dụ</th><th>Collocations</th></tr>
      ${t.words.map(w => `<tr><td><b>${U.esc(w[0])}</b> ${U.speakBtn(w[0])}<br><span class="small muted">${U.esc(w[1])} ${U.esc(w[2])}</span></td>
        <td>${U.esc(w[3])}<br><span class="small muted">${U.esc(w[4])}</span></td><td><i>${U.esc(w[5])}</i> ${U.speakBtn(w[5])}</td><td class="small">${U.esc(w[6])}</td></tr>`).join('')}
      </table></div>`;
  }
};
