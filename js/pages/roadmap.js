/* Lộ trình 12 tuần có đánh dấu hoàn thành. */
Pages.roadmap = {
  render(el) {
    const s = Store.s;
    const start = new Date(s.profile.startDate || Store.today());
    const curWeek = Math.min(12, Math.max(1, Math.floor((new Date(Store.today()) - start) / (7 * 86400000)) + 1));
    let weekNo = 0;

    el.innerHTML = `
      <div class="page-head">
        <h1>🗺️ Lộ trình 12 tuần lên IELTS 7.0</h1>
        <p>Dành cho sinh viên đã có nền tảng cơ bản (tương đương 5.0–5.5). Mỗi ngày khoảng 1,5–2 giờ.
        Bấm vào nhiệm vụ để mở trang luyện tập, tick ô vuông khi hoàn thành.</p>
        <div class="row small"><span class="muted">Ngày bắt đầu lộ trình:</span>
          <input type="date" id="startDate" value="${U.esc(s.profile.startDate)}" />
          <span class="tag blue">Hiện tại: tuần ${curWeek}</span></div>
      </div>
      ${ROADMAP.map((p, pi) => `
        <div class="card phase">
          <h2>${U.esc(p.phase)}</h2>
          <p class="muted">${U.esc(p.goal)}</p>
          ${p.weeks.map((w, wi) => {
            weekNo++;
            const ids = w.tasks.map((_, ti) => `${pi}-${wi}-${ti}`);
            const done = ids.filter(id => s.roadmap[id]).length;
            return `<details class="week" ${weekNo === curWeek ? 'open' : ''}>
              <summary>${U.esc(w.title)} <span class="spacer"></span>
                <span class="tag ${done === ids.length ? 'green' : ''}" data-count="${pi}-${wi}">${done}/${ids.length}</span></summary>
              <div class="mt">
              ${w.tasks.map(([text, link], ti) => {
                const id = `${pi}-${wi}-${ti}`;
                return `<div class="task ${s.roadmap[id] ? 'done' : ''}">
                  <input type="checkbox" data-task="${id}" ${s.roadmap[id] ? 'checked' : ''} aria-label="Đánh dấu hoàn thành" />
                  <span>${link ? `<a href="${link}">${U.esc(text)}</a>` : U.esc(text)}</span></div>`;
              }).join('')}
              </div></details>`;
          }).join('')}
        </div>`).join('')}
    `;

    el.addEventListener('change', e => {
      if (e.target.id === 'startDate') {
        s.profile.startDate = e.target.value || Store.today();
        Store.save();
        App.route();
        return;
      }
      const id = e.target.dataset.task;
      if (!id) return;
      if (e.target.checked) { s.roadmap[id] = true; Store.logActivity(); } else delete s.roadmap[id];
      Store.save();
      e.target.closest('.task').classList.toggle('done', e.target.checked);
      const [pi, wi] = id.split('-');
      const total = ROADMAP[pi].weeks[wi].tasks.length;
      const done = ROADMAP[pi].weeks[wi].tasks.filter((_, ti) => s.roadmap[`${pi}-${wi}-${ti}`]).length;
      const tag = el.querySelector(`[data-count="${pi}-${wi}"]`);
      tag.textContent = `${done}/${total}`;
      tag.classList.toggle('green', done === total);
    });
  }
};
