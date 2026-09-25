/* Trang tổng quan: mục tiêu, thống kê, band hiện tại theo kỹ năng, kế hoạch hôm nay. */
Pages.dashboard = {
  render(el) {
    const s = Store.s;
    const allTasks = ROADMAP.flatMap((p, pi) => p.weeks.flatMap((w, wi) => w.tasks.map((_, ti) => `${pi}-${wi}-${ti}`)));
    const doneTasks = allTasks.filter(id => s.roadmap[id]).length;
    const pct = Math.round(doneTasks / allTasks.length * 100);

    const now = Date.now();
    const learned = Object.keys(s.vocab).length;
    const due = Object.values(s.vocab).filter(c => c.due <= now).length;
    const totalWords = VOCAB_TOPICS.reduce((a, t) => a + t.words.length, 0);

    const skills = [
      ['listening', '🎧 Listening'], ['reading', '📖 Reading'], ['writing', '✍️ Writing'], ['speaking', '🎤 Speaking']
    ];
    const bandOf = kind => {
      const r = s.results.filter(x => x.kind === kind && typeof x.band === 'number').slice(-3);
      if (!r.length) return null;
      return Math.round(r.reduce((a, b) => a + b.band, 0) / r.length * 2) / 2;
    };
    const bands = skills.map(([k]) => bandOf(k));
    const known = bands.filter(b => b != null);
    const overall = known.length === 4 ? U.overall(known) : null;

    let daysLeft = '';
    if (s.profile.examDate) {
      const d = Math.ceil((new Date(s.profile.examDate) - new Date(Store.today())) / 86400000);
      daysLeft = d >= 0 ? `<div class="stat"><div class="num">${d}</div><div class="lbl">ngày tới kỳ thi</div></div>` : '';
    }

    // Tuần hiện tại theo ngày bắt đầu
    const start = new Date(s.profile.startDate || Store.today());
    const week = Math.min(12, Math.max(1, Math.floor((new Date(Store.today()) - start) / (7 * 86400000)) + 1));

    const recent = s.results.slice(-6).reverse();

    el.innerHTML = `
      <div class="page-head">
        <h1>Xin chào${s.profile.name ? ', ' + U.esc(s.profile.name) : ''}! 👋</h1>
        <p>Mục tiêu của bạn: từ <b>${s.profile.current.toFixed(1)}</b> lên <b>IELTS ${s.profile.target.toFixed(1)}</b>.
        Bạn đang ở <b>tuần ${week}/12</b> của lộ trình. Học đều mỗi ngày quan trọng hơn học nhiều một lúc.</p>
      </div>

      <div class="grid grid-4">
        <div class="card stat"><div class="num">${Store.streak()}</div><div class="lbl">ngày học liên tiếp 🔥</div></div>
        <div class="card stat"><div class="num">${pct}%</div><div class="lbl">lộ trình hoàn thành</div></div>
        <div class="card stat"><div class="num">${learned}<span class="small muted">/${totalWords}</span></div><div class="lbl">từ đã học</div></div>
        <div class="card stat"><div class="num">${due}</div><div class="lbl">thẻ cần ôn hôm nay</div></div>
        ${daysLeft ? `<div class="card">${daysLeft}</div>` : ''}
      </div>

      <div class="grid grid-2">
        <div class="card">
          <h2>🎯 Band ước lượng theo kỹ năng</h2>
          <p class="small muted">Trung bình 3 bài gần nhất của mỗi kỹ năng.</p>
          ${skills.map(([k, name], i) => {
            const b = bands[i];
            const w = b ? Math.min(100, b / 9 * 100) : 0;
            const tag = b == null ? '<span class="tag">chưa có</span>' : `<span class="tag ${b >= s.profile.target ? 'green' : b >= 6 ? 'blue' : 'orange'}">${b.toFixed(1)}</span>`;
            return `<div class="row" style="margin-bottom:8px"><a href="#/${k}" style="width:120px">${name}</a>
              <div class="progress spacer"><span style="width:${w}%"></span></div>${tag}</div>`;
          }).join('')}
          <hr />
          <div class="row"><b>Overall:</b> ${overall != null ? `<span class="tag ${overall >= s.profile.target ? 'green' : 'blue'}">${overall.toFixed(1)}</span>` : '<span class="muted small">Làm ít nhất 1 bài mỗi kỹ năng để xem band tổng.</span>'}
            <span class="spacer"></span><a class="btn sm" href="#/band">Tính band chi tiết</a></div>
        </div>

        <div class="card">
          <h2>📅 Kế hoạch hôm nay (~2 giờ)</h2>
          ${DAILY_PLAN.map(([t, what, link]) => `<a class="list-item" href="${link}"><span class="tag blue">${t}</span><span class="li-main">${what}</span>›</a>`).join('')}
          ${due ? `<div class="callout warn small">Bạn có <b>${due}</b> thẻ từ vựng đến hạn ôn — hãy ôn trước khi học từ mới.</div>` : ''}
        </div>
      </div>

      <div class="card">
        <div class="row"><h2 class="mb0">🕘 Hoạt động gần đây</h2><span class="spacer"></span><a href="#/roadmap" class="btn sm">Xem lộ trình tuần ${week}</a></div>
        ${recent.length ? `<div class="table-wrap mt"><table><tr><th>Thời gian</th><th>Kỹ năng</th><th>Bài</th><th>Điểm</th><th>Band</th></tr>
          ${recent.map(r => `<tr><td>${U.fmtDate(r.date)}</td><td>${U.esc(r.kind)}</td><td>${U.esc(r.title)}</td>
          <td>${r.total ? r.score + '/' + r.total : '—'}</td><td>${typeof r.band === 'number' ? r.band.toFixed(1) : '—'}</td></tr>`).join('')}
        </table></div>` : `<p class="muted mt">Chưa có hoạt động nào. Bắt đầu với <a href="#/tips">tìm hiểu cấu trúc đề thi</a> hoặc <a href="#/listening">làm bài Listening đầu tiên</a>!</p>`}
      </div>

      ${!s.profile.name ? `<div class="callout">💡 Vào <a href="#/settings">Cài đặt</a> để nhập tên, band hiện tại và ngày thi dự kiến — ứng dụng sẽ đếm ngược giúp bạn.</div>` : ''}
    `;
  }
};
