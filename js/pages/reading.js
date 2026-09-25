/* Reading: passage học thuật + câu hỏi, bấm giờ, tô sáng văn bản. */
Pages.reading = {
  render(el, params) {
    const p = READING.find(r => r.id === params[0]);
    if (p) this.test(el, p); else this.index(el);
  },

  index(el) {
    el.innerHTML = `
      <div class="page-head"><h1>📖 Academic Reading</h1>
        <p>Bài thi gồm 3 passage, 40 câu trong 60 phút (không có thời gian chép đáp án). Mỗi passage nên hoàn thành trong khoảng 20 phút.</p></div>
      <div class="grid grid-2">
        <div>
          ${READING.map(r => {
            const res = Store.s.results.filter(x => x.kind === 'reading' && x.id === r.id);
            const best = res.length ? Math.max(...res.map(x => x.band)) : null;
            return `<a class="list-item" href="#/reading/${r.id}">
              <span class="li-main"><span class="li-title">${U.esc(r.title)}</span><br>
              <span class="small muted">Band ${r.level} · ${U.esc(r.focus)}</span></span>
              ${best != null ? `<span class="tag green">${best.toFixed(1)}</span>` : ''}›</a>`;
          }).join('')}
        </div>
        <div class="card">
          <h2>💡 Chiến lược Reading band 7</h2>
          <ul>
            <li><b>Skim</b> 2–3 phút: đọc câu đầu mỗi đoạn để nắm ý chính.</li>
            <li><b>Scan</b> tìm tên riêng, số, năm, từ in hoa để định vị nhanh.</li>
            <li><b>TRUE/FALSE/NOT GIVEN</b>: FALSE = trái ngược thông tin; NOT GIVEN = không đề cập. Đừng dùng kiến thức cá nhân.</li>
            <li><b>YES/NO/NOT GIVEN</b>: hỏi về <i>quan điểm tác giả</i>, không phải sự thật.</li>
            <li><b>Matching headings</b>: làm sau cùng, đọc cả đoạn chứ không chỉ câu đầu; cẩn thận heading "bẫy" chỉ nhắc 1 chi tiết.</li>
            <li>Câu hỏi hoàn thành câu/tóm tắt thường <b>theo thứ tự</b> bài đọc.</li>
            <li>Band 7 ≈ <b>30/40</b> câu đúng.</li>
          </ul>
          <p class="small muted">Mẹo: bôi đen chữ trong bài đọc để tô sáng (highlight) như khi thi trên máy.</p>
        </div>
      </div>`;
  },

  test(el, p) {
    el.innerHTML = `
      <div class="row" style="margin-bottom:12px"><a href="#/reading">← Danh sách bài đọc</a><span class="spacer"></span>
        <span class="timer" id="timer">${U.fmtTime(p.minutes * 60)}</span>
        <button class="btn sm" id="startTimer">⏱ Bắt đầu tính giờ</button></div>
      <div class="split">
        <div class="pane card passage" id="passage">
          <h2>${U.esc(p.title)}</h2>
          ${p.paragraphs.map(([lab, txt]) => `<p><span class="para-label">${lab}</span>${U.esc(txt)}</p>`).join('')}
        </div>
        <div class="pane card">
          <div id="qs"></div>
          <button class="btn success" id="submit">Nộp bài & chấm</button>
          <div id="result" class="mt"></div>
        </div>
      </div>`;

    const quiz = Quiz.render(U.$('#qs', el), p.questions);
    let timer = null;
    const submit = () => {
      if (timer) timer.stop();
      const { score, total } = quiz.check();
      const band = U.bandFromScore(score, total);
      const used = timer ? p.minutes * 60 - timer.remain : null;
      U.$('#result', el).innerHTML = Quiz.resultBox(score, total, used != null ? `Thời gian: ${U.fmtTime(used)}.` : '');
      Store.addResult({ kind: 'reading', id: p.id, title: p.title, score, total, band });
      U.$('#submit', el).disabled = true;
      U.$('#result', el).scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    U.$('#submit', el).onclick = submit;
    U.$('#startTimer', el).onclick = e => {
      e.target.disabled = true;
      timer = U.countdown(p.minutes * 60, r => {
        const t = U.$('#timer', el);
        if (!t) return;
        t.textContent = U.fmtTime(r);
        t.classList.toggle('low', r <= 180);
      }, () => { U.toast('Hết giờ! Bài đã được nộp tự động.'); submit(); });
    };

    // Tô sáng đoạn văn được chọn trong bài đọc
    U.$('#passage', el).addEventListener('mouseup', () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      if (!U.$('#passage', el).contains(range.commonAncestorContainer)) return;
      try {
        const m = document.createElement('mark');
        range.surroundContents(m);
        sel.removeAllRanges();
      } catch (e) { /* vùng chọn vượt qua nhiều đoạn: bỏ qua */ }
    });
    // Bấm vào đoạn tô sáng để bỏ
    U.$('#passage', el).addEventListener('click', e => {
      if (e.target.tagName === 'MARK') {
        const m = e.target;
        m.replaceWith(document.createTextNode(m.textContent));
      }
    });
  }
};
