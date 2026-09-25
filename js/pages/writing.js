/* Writing: đề Task 1/Task 2, soạn bài có bấm giờ, phân tích tự động, tự chấm theo 4 tiêu chí. */
Pages.writing = {
  render(el, params) {
    const all = [...WRITING.task1.map(x => ({ ...x, task: 1 })), ...WRITING.task2.map(x => ({ ...x, task: 2 }))];
    const p = all.find(x => x.id === params[0]);
    if (p) this.editor(el, p); else this.index(el, params[0] === 't2' ? 2 : 1);
  },

  index(el, tab) {
    const saved = Store.s.writing;
    const list = (arr) => arr.map(p => {
      const d = saved[p.id];
      const st = d && d.text ? `<span class="tag ${d.selfBand ? 'green' : 'orange'}">${d.selfBand ? 'Tự chấm ' + d.selfBand.toFixed(1) : 'Bản nháp ' + U.words(d.text).length + ' từ'}</span>` : '';
      return `<a class="list-item" href="#/writing/${p.id}"><span class="tag blue">${U.esc(p.type)}</span>
        <span class="li-main"><span class="li-title">${U.esc(p.title)}</span><br><span class="small muted">${U.esc(p.prompt.slice(0, 110))}…</span></span>
        ${p.model ? '<span class="tag">có bài mẫu</span>' : ''}${st}›</a>`;
    }).join('');

    el.innerHTML = `
      <div class="page-head"><h1>✍️ Academic Writing</h1>
        <p>60 phút cho 2 bài. <b>Task 1</b> (≥150 từ, ~20 phút) mô tả biểu đồ/quy trình. <b>Task 2</b> (≥250 từ, ~40 phút) là bài luận nghị luận và chiếm <b>gấp đôi</b> số điểm Task 1.</p></div>
      <div class="tabs"><button data-tab="1" class="${tab === 1 ? 'active' : ''}">Task 1</button><button data-tab="2" class="${tab === 2 ? 'active' : ''}">Task 2</button></div>
      <div class="grid grid-2">
        <div>${tab === 1 ? list(WRITING.task1) : list(WRITING.task2)}</div>
        <div class="card">${tab === 1 ? this.tips1() : this.tips2()}</div>
      </div>`;
    el.querySelector('.tabs').onclick = e => {
      const b = e.target.closest('button');
      if (b) location.hash = b.dataset.tab === '2' ? '#/writing/t2' : '#/writing';
    };
  },

  tips1() {
    return `<h2>📐 Cấu trúc Task 1</h2>
      <ol><li><b>Introduction</b> (1 câu): paraphrase đề bài. <i>The chart illustrates…</i></li>
      <li><b>Overview</b> (2 câu): xu hướng chính/điểm nổi bật nhất — <u>bắt buộc để đạt band 7</u>. Không đưa số liệu chi tiết.</li>
      <li><b>Body 1 & 2</b>: nhóm dữ liệu hợp lý, mô tả số liệu cụ thể và <b>so sánh</b>.</li></ol>
      <div class="callout warn small">Không nêu ý kiến cá nhân, không giải thích nguyên nhân, không viết kết luận kiểu Task 2.</div>
      <p class="small">Từ vựng xu hướng: xem chủ đề <a href="#/vocab">Task 1 — Trends</a>. Ngữ pháp: <a href="#/grammar/g5">So sánh & mô tả số liệu</a>.</p>`;
  },

  tips2() {
    return `<h2>📐 Cấu trúc Task 2 (4 đoạn)</h2>
      <ol><li><b>Introduction</b>: paraphrase đề + <b>thesis statement</b> nêu rõ quan điểm.</li>
      <li><b>Body 1</b>: Topic sentence → Giải thích → Ví dụ → Liên kết về luận điểm.</li>
      <li><b>Body 2</b>: như trên (ý thứ hai / quan điểm đối lập).</li>
      <li><b>Conclusion</b>: nhắc lại quan điểm, tóm tắt ý chính, không đưa ý mới.</li></ol>
      <table class="small"><tr><th>Dạng đề</th><th>Câu hỏi</th></tr>
      <tr><td>Opinion</td><td>To what extent do you agree or disagree?</td></tr>
      <tr><td>Discussion</td><td>Discuss both views and give your opinion.</td></tr>
      <tr><td>Problem–Solution</td><td>What are the causes/problems… and solutions?</td></tr>
      <tr><td>Adv–Disadv</td><td>Do the advantages outweigh the disadvantages?</td></tr>
      <tr><td>Two-part</td><td>Hai câu hỏi riêng — phải trả lời cả hai.</td></tr></table>
      <div class="callout small">Band 7 cần: trả lời <b>đủ mọi phần</b> của đề, quan điểm <b>nhất quán</b>, ý được <b>mở rộng</b> bằng giải thích và ví dụ.</div>`;
  },

  chartSVG(c) {
    const W = 560, H = 300, L = 44, R = 28, T = 16, B = 40;
    const colors = ['#3552d8', '#e07b00', '#1c8a4e', '#b8328f'];
    const max = Math.ceil(Math.max(...c.series.flatMap(s => s.data)) / 10) * 10 || 10;
    const x = i => L + (c.kind === 'bar' ? (i + 0.5) : i) * (W - L - R) / (c.kind === 'bar' ? c.labels.length : c.labels.length - 1);
    const y = v => T + (H - T - B) * (1 - v / max);
    let g = '';
    for (let k = 0; k <= 5; k++) {
      const v = max * k / 5;
      g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" stroke-opacity=".15"/>
        <text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`;
    }
    c.labels.forEach((lab, i) => { g += `<text x="${x(i)}" y="${H - B + 18}" text-anchor="middle" font-size="12" fill="currentColor">${U.esc(lab)}</text>`; });
    if (c.kind === 'line') {
      c.series.forEach((s, si) => {
        g += `<polyline fill="none" stroke="${colors[si]}" stroke-width="2.5" points="${s.data.map((v, i) => x(i) + ',' + y(v)).join(' ')}"/>`;
        s.data.forEach((v, i) => { g += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${colors[si]}"><title>${U.esc(s.name)} ${c.labels[i]}: ${v}${c.unit}</title></circle>`; });
      });
    } else {
      const groupW = (W - L - R) / c.labels.length * 0.7, bw = groupW / c.series.length;
      c.series.forEach((s, si) => s.data.forEach((v, i) => {
        const bx = x(i) - groupW / 2 + si * bw;
        g += `<rect x="${bx}" y="${y(v)}" width="${bw - 2}" height="${y(0) - y(v)}" fill="${colors[si]}" rx="2"><title>${U.esc(s.name)} – ${c.labels[i]}: ${v} ${c.unit}</title></rect>`;
      }));
    }
    const legend = c.series.map((s, si) => `<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px"><span style="width:12px;height:12px;background:${colors[si]};display:inline-block;border-radius:2px"></span>${U.esc(s.name)}</span>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto" role="img" aria-label="Biểu đồ">${g}</svg>
      <div class="small">${legend} <span class="muted">(Đơn vị: ${U.esc(c.unit)})</span></div>`;
  },

  visual(p) {
    if (p.chart) return this.chartSVG(p.chart);
    if (p.table) return `<div class="table-wrap"><table><tr>${p.table.head.map(h => `<th>${U.esc(h)}</th>`).join('')}</tr>
      ${p.table.rows.map(r => `<tr>${r.map(c => `<td>${U.esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
    if (p.steps) return `<div class="row" style="align-items:stretch">${p.steps.map((s, i) =>
      `<div class="card flat small" style="margin:0;padding:8px 10px;flex:1 1 120px"><b>${i + 1}.</b> ${U.esc(s)}</div>`).join('<span style="align-self:center">→</span>')}</div>`;
    return '';
  },

  editor(el, p) {
    const minWords = p.task === 1 ? 150 : 250;
    const minutes = p.task === 1 ? 20 : 40;
    const saved = Store.s.writing[p.id] || { text: '' };
    el.innerHTML = `
      <p><a href="#/writing${p.task === 2 ? '/t2' : ''}">← Danh sách đề Task ${p.task}</a></p>
      <div class="card">
        <div class="row"><span class="tag blue">Task ${p.task} · ${U.esc(p.type)}</span><span class="spacer"></span>
          <span class="timer" id="timer">${U.fmtTime(minutes * 60)}</span><button class="btn sm" id="startTimer">⏱ Bắt đầu ${minutes} phút</button></div>
        <p class="mt"><b>${U.esc(p.prompt)}</b></p>
        <p class="small muted">Viết ít nhất ${minWords} từ.</p>
        ${this.visual(p)}
        ${p.ideas ? `<details class="mt"><summary>💡 Gợi ý ý tưởng (chỉ xem sau khi tự lập dàn ý)</summary><ul class="mt">${p.ideas.map(i => `<li>${U.esc(i)}</li>`).join('')}</ul></details>` : ''}
      </div>
      <div class="card">
        <textarea id="text" class="editor" placeholder="Bắt đầu viết bài tại đây… (tự động lưu)" spellcheck="false">${U.esc(saved.text)}</textarea>
        <div class="row mt"><span id="wc" class="tag"></span><span class="small muted" id="savedAt"></span><span class="spacer"></span>
          <button class="btn primary" id="analyse">🔍 Phân tích bài viết</button>
          ${p.model ? '<button class="btn" id="modelBtn">📄 Bài mẫu band 8</button>' : ''}</div>
        <p class="small muted mb0">Chính tả tự động đã tắt để giống phòng thi — hãy tự soát lỗi.</p>
      </div>
      <div id="analysis"></div>
      ${p.model ? `<div class="card hidden" id="model"><h3>Bài mẫu tham khảo</h3><div class="passage">${p.model.split('\n\n').map(x => `<p>${U.esc(x)}</p>`).join('')}</div>
        <p class="small muted">${U.words(p.model).length} từ. Chú ý cách viết overview/thesis, từ nối và collocation.</p></div>` : ''}
      <div class="card">
        <h2>📝 Tự chấm theo 4 tiêu chí</h2>
        <p class="small muted">Đọc lại bài của bạn, bấm chọn ô mô tả đúng nhất cho mỗi tiêu chí (dựa trên band descriptors công khai, diễn giải ngắn gọn).</p>
        <div class="table-wrap"><table class="rubric"><tr><th>Tiêu chí</th>${[5, 6, 7, 8].map(b => `<th>Band ${b}</th>`).join('')}</tr>
        ${WRITING.rubric.map(r => `<tr><th>${U.esc(r.name)}</th>${[5, 6, 7, 8].map(b => `<td data-crit="${r.key}" data-band="${b}">${U.esc(r.bands[b])}</td>`).join('')}</tr>`).join('')}
        </table></div>
        <div class="row mt"><button class="btn success" id="saveScore">Lưu điểm tự chấm</button><span id="selfBand" class="spacer"></span></div>
      </div>`;

    const ta = U.$('#text', el);
    const upd = () => {
      const n = U.words(ta.value).length;
      const wc = U.$('#wc', el);
      wc.textContent = `${n} từ`;
      wc.className = 'tag ' + (n >= minWords ? 'green' : 'orange');
    };
    let saveH;
    ta.addEventListener('input', () => {
      upd();
      clearTimeout(saveH);
      saveH = setTimeout(() => {
        Store.s.writing[p.id] = Object.assign(Store.s.writing[p.id] || {}, { text: ta.value, updated: new Date().toISOString() });
        Store.save();
        const s = U.$('#savedAt', el);
        if (s) s.textContent = 'Đã lưu lúc ' + new Date().toLocaleTimeString('vi-VN');
      }, 600);
    });
    upd();

    U.$('#startTimer', el).onclick = e => {
      e.target.disabled = true;
      U.countdown(minutes * 60, r => {
        const t = U.$('#timer', el);
        if (!t) return;
        t.textContent = U.fmtTime(r);
        t.classList.toggle('low', r <= 300);
      }, () => U.toast('⏰ Hết giờ! Hãy dừng bút và phân tích bài viết.', 4000));
    };

    U.$('#analyse', el).onclick = () => {
      U.$('#analysis', el).innerHTML = this.analyse(ta.value, p.task, minWords);
      Store.logActivity();
      U.$('#analysis', el).scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (p.model) U.$('#modelBtn', el).onclick = () => U.$('#model', el).classList.toggle('hidden');

    // Rubric
    const sel = Object.assign({}, saved.rubric || {});
    const paint = () => {
      U.$$('.rubric td', el).forEach(td => td.classList.toggle('sel', sel[td.dataset.crit] === +td.dataset.band));
      const vals = Object.values(sel);
      const out = U.$('#selfBand', el);
      if (vals.length === 4) {
        const avg = vals.reduce((a, b) => a + b, 0) / 4;
        const band = Math.floor(avg * 2) / 2;
        out.innerHTML = `Band tự chấm: <span class="tag ${band >= 7 ? 'green' : 'blue'}">${band.toFixed(1)}</span>`;
        return band;
      }
      out.innerHTML = `<span class="small muted">Chọn đủ 4 tiêu chí (${vals.length}/4)</span>`;
      return null;
    };
    el.querySelector('.rubric').onclick = e => {
      const td = e.target.closest('td[data-crit]');
      if (!td) return;
      sel[td.dataset.crit] = +td.dataset.band;
      paint();
    };
    paint();
    U.$('#saveScore', el).onclick = () => {
      const band = paint();
      if (band == null) return U.toast('Hãy chọn đủ 4 tiêu chí.');
      Store.s.writing[p.id] = Object.assign(Store.s.writing[p.id] || {}, { text: ta.value, selfBand: band, rubric: sel, updated: new Date().toISOString() });
      Store.addResult({ kind: 'writing', id: p.id, title: `Task ${p.task}: ${p.title}`, band });
      U.toast('Đã lưu điểm tự chấm ✔');
    };
  },

  // Phân tích tự động: không thay thế giám khảo, chỉ chỉ ra dấu hiệu cần cải thiện
  analyse(text, task, minWords) {
    const ws = U.words(text);
    const n = ws.length;
    if (n < 30) return `<div class="card callout warn">Hãy viết ít nhất vài đoạn trước khi phân tích.</div>`;
    const lower = ' ' + text.toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ') + ' ';
    const sentences = text.split(/[.!?]+(?:\s|$)/).map(s => s.trim()).filter(s => U.words(s).length > 2);
    const paras = text.split(/\n\s*\n|\n/).map(x => x.trim()).filter(Boolean);
    const avgLen = n / Math.max(1, sentences.length);
    const lw = ws.map(w => w.toLowerCase());
    const uniq = new Set(lw).size;
    const diversity = Math.round(uniq / n * 100);

    const has = phrase => new RegExp('(^|[^a-z])' + phrase.replace(/ /g, '\\s+') + '([^a-z]|$)', 'i').test(lower);
    const count = phrase => (lower.match(new RegExp('(^|[^a-z])' + phrase.replace(/ /g, '\\s+') + '(?=[^a-z]|$)', 'gi')) || []).length;
    const links = WRITING.linking.filter(has);
    const weak = Object.keys(WRITING.weakWords).filter(w => count(w) > 0).map(w => [w, count(w)]);
    const contractions = (text.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).filter(c => !/'s$/i.test(c) || /^(it|that|there|what|he|she)'s$/i.test(c));
    const complexMarkers = ['which', 'who', 'whom', 'whose', 'although', 'whereas', 'while', 'if', 'unless', 'because', 'since', 'when', 'that'];
    const complexCount = complexMarkers.reduce((a, m) => a + count(m), 0);
    const passive = (text.match(/\b(is|are|was|were|be|been|being)\s+(\w+ly\s+)?\w+(ed|en|wn|lt|pt|ught)\b/gi) || []).length;

    const stop = new Set('the a an and or but of to in on at for with by from as is are was were be been being this that these those it its their there they them he she we you i my our your his her not no so than then also more most can could will would should may might must do does did have has had which who whom whose what when where why how if into about over such very many much some any all each other only own same too just both between after before during while because since until although whereas however'.split(' '));
    const freq = {};
    lw.forEach(w => { if (w.length > 3 && !stop.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const overused = Object.entries(freq).filter(([, c]) => c >= Math.max(4, Math.round(n / 70))).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const vocabSet = new Set(VOCAB_TOPICS.flatMap(t => t.words.map(w => w[0].toLowerCase())));
    const topicWords = [...vocabSet].filter(w => w.split(' ').length === 1 ? lw.includes(w) || lw.some(x => x.startsWith(w) && x.length - w.length <= 3) : has(w));

    const checks = [];
    const ok = (cond, good, bad) => checks.push(cond ? `<li>✅ ${good}</li>` : `<li>⚠️ ${bad}</li>`);
    ok(n >= minWords, `Đủ độ dài (${n}/${minWords} từ).`, `Chưa đủ ${minWords} từ (${n} từ) — bài dưới độ dài bị trừ điểm Task Response.`);
    if (task === 2) {
      ok(paras.length >= 4, `Có ${paras.length} đoạn.`, `Chỉ có ${paras.length} đoạn — nên có 4–5 đoạn (mở bài, 2–3 thân bài, kết bài). Xuống dòng giữa các đoạn.`);
      ok(/in conclusion|to conclude|to sum up|in summary|overall/.test(lower), 'Có đoạn kết luận rõ ràng.', 'Chưa thấy từ báo hiệu kết luận (In conclusion, To conclude…).');
      ok(/i (strongly )?(believe|agree|disagree|would argue)|in my (view|opinion)|i am convinced|my view/.test(lower), 'Có nêu quan điểm cá nhân rõ ràng.', 'Chưa thấy câu nêu quan điểm rõ (In my view, I strongly believe…) — dạng Opinion/Discussion bắt buộc có.');
    } else {
      ok(/overall|in general|generally|it is clear that|it is evident/.test(lower), 'Có đoạn Overview.', 'Chưa thấy Overview (Overall, …) — thiếu Overview khó vượt band 5–6 ở Task Achievement.');
      ok(!/\b(i think|i believe|in my opinion)\b/.test(lower), 'Không nêu ý kiến cá nhân (đúng yêu cầu Task 1).', 'Task 1 không nêu ý kiến cá nhân — bỏ "I think / In my opinion".');
      ok(/\d/.test(text), 'Có dẫn số liệu cụ thể.', 'Chưa có số liệu cụ thể — cần dẫn chứng dữ liệu từ biểu đồ.');
    }
    ok(avgLen >= 14 && avgLen <= 28, `Độ dài câu trung bình hợp lý (${avgLen.toFixed(1)} từ).`, avgLen < 14 ? `Câu khá ngắn (TB ${avgLen.toFixed(1)} từ) — hãy kết hợp câu bằng mệnh đề quan hệ, liên từ.` : `Câu quá dài (TB ${avgLen.toFixed(1)} từ) — dễ sai ngữ pháp, nên tách bớt.`);
    ok(complexCount >= sentences.length * 0.5, 'Có sử dụng nhiều cấu trúc câu phức.', 'Ít dấu hiệu câu phức — thêm mệnh đề quan hệ, điều kiện, nhượng bộ (although, whereas…).');
    ok(links.length >= 6, `Dùng ${links.length} từ nối khác nhau.`, `Chỉ có ${links.length} từ nối khác nhau — cần đa dạng hơn (However, Moreover, As a result…).`);
    ok(contractions.length === 0, 'Không dùng dạng rút gọn (văn phong trang trọng).', `Có dạng rút gọn: ${[...new Set(contractions)].slice(0, 5).join(', ')} — viết đầy đủ (do not, cannot…).`);
    ok(diversity >= 45, `Độ đa dạng từ vựng tốt (${diversity}%).`, `Độ đa dạng từ vựng thấp (${diversity}%) — lặp từ nhiều.`);

    return `<div class="card">
      <h2>🔍 Phân tích bài viết</h2>
      <div class="metrics">
        <div class="metric"><b>${n}</b><span>số từ</span></div>
        <div class="metric"><b>${sentences.length}</b><span>câu</span></div>
        <div class="metric"><b>${paras.length}</b><span>đoạn</span></div>
        <div class="metric"><b>${avgLen.toFixed(1)}</b><span>từ/câu</span></div>
        <div class="metric"><b>${diversity}%</b><span>từ khác nhau</span></div>
        <div class="metric"><b>${links.length}</b><span>từ nối</span></div>
        <div class="metric"><b>${passive}</b><span>câu bị động (ước)</span></div>
        <div class="metric"><b>${topicWords.length}</b><span>từ vựng IELTS</span></div>
      </div>
      <h3 class="mt">Nhận xét</h3><ul>${checks.join('')}</ul>
      ${links.length ? `<p class="small"><b>Từ nối đã dùng:</b> ${links.map(l => `<span class="tag">${U.esc(l)}</span>`).join(' ')}</p>` : ''}
      ${topicWords.length ? `<p class="small"><b>Từ vựng chủ đề đã dùng:</b> ${topicWords.slice(0, 20).map(l => `<span class="tag green">${U.esc(l)}</span>`).join(' ')}</p>` : ''}
      ${weak.length ? `<h3>Từ nên thay thế cho văn phong học thuật</h3><div class="table-wrap"><table><tr><th>Từ</th><th>Số lần</th><th>Gợi ý</th></tr>
        ${weak.map(([w, c]) => `<tr><td>${U.esc(w)}</td><td>${c}</td><td>${U.esc(WRITING.weakWords[w])}</td></tr>`).join('')}</table></div>` : ''}
      ${overused.length ? `<h3>Từ lặp nhiều</h3><p>${overused.map(([w, c]) => `<span class="tag orange">${U.esc(w)} ×${c}</span>`).join(' ')}</p><p class="small muted">Dùng từ đồng nghĩa hoặc đại từ (this, these, such…) để tránh lặp.</p>` : ''}
      <div class="callout small">Công cụ này chỉ phân tích hình thức (độ dài, từ nối, lặp từ…), không đánh giá được nội dung, lập luận hay lỗi ngữ pháp chi tiết. Hãy so sánh với bài mẫu và tự chấm bằng bảng tiêu chí bên dưới, hoặc nhờ giáo viên/bạn học chữa bài.</div>
    </div>`;
  }
};
