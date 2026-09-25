/* Bộ dựng câu hỏi dùng chung cho Listening, Reading, Grammar.
 * groups: [{ instr, type: 'choice' | 'text', options?, select?, items: [{ q, options?, a, explain? }] }]
 * - choice: a là đáp án đúng (chuỗi) hoặc mảng các đáp án chấp nhận
 * - text:   a là mảng các đáp án chấp nhận (so sánh không phân biệt hoa thường, dấu câu)
 */
const Quiz = (() => {
  const TFNG = ['TRUE', 'FALSE', 'NOT GIVEN'];
  const YNNG = ['YES', 'NO', 'NOT GIVEN'];

  function render(container, groups, opts = {}) {
    let n = opts.startNum || 1;
    const uid = 'q' + Math.random().toString(36).slice(2, 8);
    const items = [];
    const html = groups.map((g, gi) => {
      const shared = g.options === 'TFNG' ? TFNG : g.options === 'YNNG' ? YNNG : g.options;
      const body = g.items.map((it, ii) => {
        const num = n++;
        const name = `${uid}-${gi}-${ii}`;
        const options = it.options || shared;
        items.push({ it, name, type: g.type, num });
        let input;
        if (g.type === 'text') {
          input = `<input type="text" name="${name}" autocomplete="off" spellcheck="false" aria-label="Câu ${num}" />`;
        } else if (g.select) {
          input = `<select name="${name}" aria-label="Câu ${num}"><option value="">— chọn —</option>` +
            options.map(o => `<option value="${U.esc(o)}">${U.esc(o)}</option>`).join('') + `</select>`;
        } else {
          input = `<div class="opts">` + options.map(o =>
            `<label><input type="radio" name="${name}" value="${U.esc(o)}" /> ${U.esc(o)}</label>`).join('') + `</div>`;
        }
        const qText = it.q.includes('___') && g.type === 'text'
          ? `<div class="q-text"><span class="q-num">${num}</span>${U.esc(it.q).replace('___', input)}</div>`
          : `<div class="q-text"><span class="q-num">${num}</span>${U.esc(it.q)}</div>${input}`;
        return `<div class="q-item" data-name="${name}">${qText}<div class="feedback hidden"></div></div>`;
      }).join('');
      const list = g.list ? `<div class="card flat small">${g.list.map(x => `<div>${U.esc(x)}</div>`).join('')}</div>` : '';
      return `<div class="q-group"><div class="instr">${U.esc(g.instr)}</div>${list}${body}</div>`;
    }).join('');
    container.innerHTML = html;

    function valueOf(name, type) {
      if (type === 'text' || container.querySelector(`select[name="${name}"]`)) {
        const el = container.querySelector(`[name="${name}"]`);
        return el ? el.value : '';
      }
      const r = container.querySelector(`input[name="${name}"]:checked`);
      return r ? r.value : '';
    }

    function isCorrect(item, val) {
      const acc = Array.isArray(item.it.a) ? item.it.a : [item.it.a];
      if (item.type === 'text') {
        const v = U.normalize(val);
        return acc.some(a => U.normalize(a) === v);
      }
      return acc.includes(val);
    }

    function check() {
      let score = 0;
      items.forEach(item => {
        const val = valueOf(item.name, item.type);
        const ok = isCorrect(item, val);
        if (ok) score++;
        const box = container.querySelector(`.q-item[data-name="${item.name}"]`);
        box.classList.remove('correct', 'wrong');
        box.classList.add(ok ? 'correct' : 'wrong');
        const fb = box.querySelector('.feedback');
        const acc = Array.isArray(item.it.a) ? item.it.a : [item.it.a];
        fb.innerHTML = (ok ? '✅ Chính xác.' : `❌ Đáp án: <b>${U.esc(acc.join(' / '))}</b>`) +
          (item.it.explain ? `<div class="muted">💡 ${U.esc(item.it.explain)}</div>` : '');
        fb.classList.remove('hidden');
      });
      container.querySelectorAll('input, select').forEach(el => { el.disabled = true; });
      return { score, total: items.length };
    }

    function reset() { render(container, groups, opts); }

    return { check, reset, get total() { return items.length; } };
  }

  // Khối kết quả sau khi chấm
  function resultBox(score, total, extra = '') {
    const pct = Math.round(score / total * 100);
    const band = U.bandFromScore(score, total);
    const cls = band >= 7 ? 'good' : band >= 6 ? '' : 'warn';
    return `<div class="callout ${cls}"><b>Kết quả: ${score}/${total} (${pct}%)</b> — band ước lượng: <b>${band.toFixed(1)}</b>
      <div class="small muted">Band 7.0 tương đương khoảng 30/40 câu đúng (~75%). ${extra}</div></div>`;
  }

  return { render, resultBox, TFNG, YNNG };
})();
