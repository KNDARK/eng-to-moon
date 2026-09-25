/* Cài đặt: hồ sơ, giọng đọc, sao lưu/khôi phục dữ liệu. */
Pages.settings = {
  render(el) {
    const s = Store.s;
    const bands = [];
    for (let b = 4; b <= 9; b += 0.5) bands.push(b);
    const opt = v => bands.map(b => `<option value="${b}" ${b === v ? 'selected' : ''}>${b.toFixed(1)}</option>`).join('');
    el.innerHTML = `
      <div class="page-head"><h1>⚙️ Cài đặt & dữ liệu</h1>
        <p>Tiến độ được lưu <b>trên trình duyệt của bạn</b> (localStorage), không gửi đi đâu. Hãy xuất file sao lưu định kỳ hoặc khi đổi máy.</p></div>
      <div class="grid grid-2">
        <div class="card"><h2>👤 Hồ sơ</h2>
          <p><label>Tên của bạn<br><input type="text" id="name" value="${U.esc(s.profile.name)}" placeholder="VD: Minh" /></label></p>
          <div class="row"><label>Band hiện tại<br><select id="cur">${opt(s.profile.current)}</select></label>
            <label>Mục tiêu<br><select id="target">${opt(s.profile.target)}</select></label></div>
          <p class="mt"><label>Ngày thi dự kiến<br><input type="date" id="exam" value="${U.esc(s.profile.examDate)}" /></label></p>
          <p><label>Ngày bắt đầu lộ trình<br><input type="date" id="start" value="${U.esc(s.profile.startDate)}" /></label></p>
          <button class="btn primary" id="saveProfile">Lưu hồ sơ</button>
        </div>
        <div class="card"><h2>🔊 Giọng đọc</h2>
          <p class="small muted">Giọng có sẵn phụ thuộc hệ điều hành và trình duyệt. Chrome/Edge thường có giọng "Google UK English" hoặc "Microsoft … (English UK)".</p>
          <p><label>Giọng mặc định<br><select id="voice"><option value="">Tự động (ưu tiên Anh–Anh)</option></select></label></p>
          <p><label>Tốc độ đọc: <b id="rateVal">${s.settings.rate}</b><br><input type="range" id="rate" min="0.6" max="1.3" step="0.05" value="${s.settings.rate}" style="width:100%" /></label></p>
          <button class="btn" id="testVoice">▶ Nghe thử</button>
        </div>
        <div class="card"><h2>💾 Sao lưu & khôi phục</h2>
          <div class="row"><button class="btn" id="export">⬇ Xuất file sao lưu (.json)</button>
            <label class="btn">⬆ Nhập file sao lưu<input type="file" id="import" accept="application/json,.json" class="hidden" /></label></div>
          <hr />
          <button class="btn danger" id="reset">🗑 Xoá toàn bộ tiến độ</button>
        </div>
      </div>`;

    const fillVoices = () => {
      const sel = U.$('#voice', el);
      if (!sel) return;
      const vs = U.loadVoices();
      sel.innerHTML = '<option value="">Tự động (ưu tiên Anh–Anh)</option>' +
        vs.map(v => `<option value="${U.esc(v.name)}" ${v.name === s.settings.voice ? 'selected' : ''}>${U.esc(v.name)} (${U.esc(v.lang)})</option>`).join('');
    };
    fillVoices();
    if (window.speechSynthesis) window.speechSynthesis.addEventListener('voiceschanged', fillVoices);
    this.leave = () => { if (window.speechSynthesis) window.speechSynthesis.removeEventListener('voiceschanged', fillVoices); };

    U.$('#saveProfile', el).onclick = () => {
      s.profile.name = U.$('#name', el).value.trim();
      s.profile.current = +U.$('#cur', el).value;
      s.profile.target = +U.$('#target', el).value;
      s.profile.examDate = U.$('#exam', el).value;
      s.profile.startDate = U.$('#start', el).value || Store.today();
      Store.save();
      U.toast('Đã lưu hồ sơ ✔');
    };
    U.$('#voice', el).onchange = e => { s.settings.voice = e.target.value; Store.save(); };
    U.$('#rate', el).oninput = e => { s.settings.rate = +e.target.value; U.$('#rateVal', el).textContent = e.target.value; Store.save(); };
    U.$('#testVoice', el).onclick = () => { U.stopSpeak(); U.speak('Welcome to Eng to Moon. Your target is band seven. Let’s get started!'); };

    U.$('#export', el).onclick = () => {
      const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `eng-to-moon-backup-${Store.today()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    U.$('#import', el).onchange = e => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try { Store.importJSON(reader.result); U.toast('Đã khôi phục dữ liệu ✔'); App.applyTheme(); App.updateStreak(); App.route(); }
        catch (err) { U.toast('File không hợp lệ.'); }
      };
      reader.readAsText(f);
    };
    U.$('#reset', el).onclick = () => {
      if (!confirm('Xoá toàn bộ tiến độ học? Hành động này không thể hoàn tác (trừ khi bạn đã xuất file sao lưu).')) return;
      Store.reset();
      App.applyTheme(); App.updateStreak(); App.route();
      U.toast('Đã xoá dữ liệu.');
    };
  }
};
