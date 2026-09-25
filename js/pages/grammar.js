/* Ngữ pháp: bài giảng tiếng Việt + quiz. */
Pages.grammar = {
  render(el, params) {
    const g = GRAMMAR.find(x => x.id === params[0]);
    if (g) return this.lesson(el, g);
    const best = Store.s.grammar;
    el.innerHTML = `
      <div class="page-head"><h1>🧩 Ngữ pháp cho band 7</h1>
        <p>Band 7 Grammatical Range & Accuracy: dùng <b>đa dạng cấu trúc phức</b> và có <b>nhiều câu hoàn toàn không lỗi</b>.
        10 chủ điểm dưới đây là những gì giám khảo tìm kiếm — và những lỗi người Việt hay mắc nhất.</p></div>
      ${GRAMMAR.map((g, i) => `<a class="list-item" href="#/grammar/${g.id}">
        <span class="tag blue">${i + 1}</span><span class="li-main"><span class="li-title">${U.esc(g.title)}</span></span>
        <span class="tag">${U.esc(g.tag)}</span>
        ${best[g.id] != null ? `<span class="tag ${best[g.id] >= 80 ? 'green' : 'orange'}">${best[g.id]}%</span>` : ''}›</a>`).join('')}`;
  },

  lesson(el, g) {
    const idx = GRAMMAR.indexOf(g);
    const nx = GRAMMAR[idx + 1];
    el.innerHTML = `
      <p><a href="#/grammar">← Danh sách bài ngữ pháp</a></p>
      <div class="card lesson-body"><h1>${U.esc(g.title)}</h1>${g.content}</div>
      <div class="card"><h2>✏️ Luyện tập</h2><div id="qs"></div>
        <div class="row"><button class="btn success" id="submit">Chấm điểm</button><button class="btn" id="retry">↺ Làm lại</button>
        <span class="spacer"></span>${nx ? `<a class="btn" href="#/grammar/${nx.id}">Bài tiếp: ${U.esc(nx.title)} ›</a>` : ''}</div>
        <div id="res" class="mt"></div></div>`;
    const quiz = Quiz.render(U.$('#qs', el), g.quiz);
    U.$('#retry', el).onclick = () => App.route();
    U.$('#submit', el).onclick = () => {
      const { score, total } = quiz.check();
      const pct = Math.round(score / total * 100);
      Store.s.grammar[g.id] = Math.max(Store.s.grammar[g.id] || 0, pct);
      Store.addResult({ kind: 'grammar', id: g.id, title: g.title, score, total });
      U.$('#res', el).innerHTML = `<div class="callout ${pct >= 80 ? 'good' : 'warn'}"><b>${score}/${total} (${pct}%)</b> —
        ${pct >= 80 ? 'Tốt lắm! Hãy thử dùng cấu trúc này trong bài Writing tiếp theo.' : 'Đọc lại phần giải thích và làm lại để đạt ≥ 80%.'}</div>`;
      U.$('#submit', el).disabled = true;
    };
  }
};
