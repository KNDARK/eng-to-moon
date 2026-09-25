/* Tính điểm band: quy đổi số câu đúng Listening/Reading và tính overall theo quy tắc làm tròn IELTS. */
Pages.band = {
  render(el) {
    const bands = [];
    for (let b = 9; b >= 0; b -= 0.5) bands.push(b);
    const opt = sel => bands.map(b => `<option value="${b}" ${b === sel ? 'selected' : ''}>${b.toFixed(1)}</option>`).join('');
    el.innerHTML = `
      <div class="page-head"><h1>🎯 Tính điểm band IELTS</h1>
        <p>Nhập số câu đúng Listening/Reading (trên 40) và band ước lượng cho Writing/Speaking để biết overall.
        Có thể lưu kết quả thi thử vào tiến độ.</p></div>
      <div class="grid grid-2">
        <div class="card">
          <div class="grid grid-2">
            <label>🎧 Listening (số câu đúng /40)<br><input type="number" min="0" max="40" id="lr" value="30" /></label>
            <label>📖 Reading (số câu đúng /40)<br><input type="number" min="0" max="40" id="rr" value="30" /></label>
            <label>✍️ Writing (band)<br><select id="wb">${opt(6.5)}</select></label>
            <label>🎤 Speaking (band)<br><select id="sb">${opt(6.5)}</select></label>
          </div>
          <div id="out" class="mt"></div>
          <button class="btn success" id="save">💾 Lưu kết quả thi thử</button>
        </div>
        <div class="card">
          <h3>Bảng quy đổi Listening & Academic Reading</h3>
          <div class="table-wrap"><table class="small"><tr><th>Số câu đúng</th><th>Band</th></tr>
            ${[['39–40', 9], ['37–38', 8.5], ['35–36', 8], ['32–34', 7.5], ['30–31', 7], ['26–29', 6.5], ['23–25', 6], ['18–22', 5.5], ['16–17', 5], ['13–15', 4.5], ['10–12', 4]]
              .map(([r, b]) => `<tr ${b === 7 ? 'style="font-weight:700"' : ''}><td>${r}</td><td>${b.toFixed(1)}</td></tr>`).join('')}
          </table></div>
          <p class="small muted mt">Bảng mang tính tham khảo, ngưỡng thực tế có thể thay đổi nhẹ theo từng đề.</p>
          <h3>Quy tắc làm tròn overall</h3>
          <p class="small">Lấy trung bình 4 kỹ năng: phần lẻ .25 → làm tròn lên .5; phần lẻ .75 → làm tròn lên số nguyên kế tiếp.
          Ví dụ: 6.5 + 6.5 + 7 + 7 = 27 → 6.75 → <b>7.0</b>.</p>
        </div>
      </div>`;

    const calc = () => {
      const l = U.bandFrom40(Math.min(40, Math.max(0, +U.$('#lr', el).value || 0)));
      const r = U.bandFrom40(Math.min(40, Math.max(0, +U.$('#rr', el).value || 0)));
      const w = +U.$('#wb', el).value, s = +U.$('#sb', el).value;
      const o = U.overall([l, r, w, s]);
      const target = Store.s.profile.target;
      const lowest = [['Listening', l], ['Reading', r], ['Writing', w], ['Speaking', s]].sort((a, b) => a[1] - b[1])[0];
      U.$('#out', el).innerHTML = `
        <div class="metrics"><div class="metric"><b>${l.toFixed(1)}</b><span>Listening</span></div><div class="metric"><b>${r.toFixed(1)}</b><span>Reading</span></div>
        <div class="metric"><b>${w.toFixed(1)}</b><span>Writing</span></div><div class="metric"><b>${s.toFixed(1)}</b><span>Speaking</span></div></div>
        <div class="callout ${o >= target ? 'good' : ''} mt"><span style="font-size:1.4rem"><b>Overall: ${o.toFixed(1)}</b></span>
        ${o >= target ? ' 🎉 Đạt mục tiêu!' : ` — còn thiếu ${(target - o).toFixed(1)} band so với mục tiêu ${target.toFixed(1)}.`}
        <div class="small">Kỹ năng cần ưu tiên: <b>${lowest[0]}</b> (${lowest[1].toFixed(1)}).</div></div>`;
      return { l, r, w, s, o };
    };
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
    calc();
    U.$('#save', el).onclick = () => {
      const { l, r, w, s } = calc();
      const lr = +U.$('#lr', el).value, rr = +U.$('#rr', el).value;
      Store.addResult({ kind: 'listening', id: 'mock', title: 'Thi thử', score: lr, total: 40, band: l });
      Store.addResult({ kind: 'reading', id: 'mock', title: 'Thi thử', score: rr, total: 40, band: r });
      Store.addResult({ kind: 'writing', id: 'mock', title: 'Thi thử (tự ước lượng)', band: w });
      Store.addResult({ kind: 'speaking', id: 'mock', title: 'Thi thử (tự ước lượng)', band: s });
      U.toast('Đã lưu kết quả thi thử vào tiến độ ✔');
    };
  }
};
