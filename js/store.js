/* Lưu tiến độ học vào localStorage (chỉ trên trình duyệt của bạn). */
const Store = (() => {
  const KEY = 'eng-to-moon:v1';

  function defaults() {
    return {
      profile: { name: '', current: 5.5, target: 7.0, examDate: '', startDate: today() },
      roadmap: {},        // taskId -> true
      vocab: {},          // wordId -> { ef, interval, reps, due, lapses }
      results: [],        // { kind, id, title, score, total, band, date }
      writing: {},        // promptId -> { text, updated, selfBand }
      grammar: {},        // lessonId -> best score %
      activity: {},       // 'YYYY-MM-DD' -> số hoạt động
      settings: { theme: '', voice: '', rate: 0.95 }
    };
  }

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function merge(base, saved) {
    for (const k of Object.keys(saved || {})) {
      if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && saved[k] && typeof saved[k] === 'object') {
        base[k] = merge(base[k], saved[k]);
      } else {
        base[k] = saved[k];
      }
    }
    return base;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? merge(defaults(), JSON.parse(raw)) : defaults();
    } catch (e) {
      return defaults();
    }
  }

  let state = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* bộ nhớ bị chặn: vẫn chạy bình thường */ }
  }

  function logActivity() {
    const d = today();
    state.activity[d] = (state.activity[d] || 0) + 1;
    save();
    if (typeof App !== 'undefined') App.updateStreak();
  }

  function streak() {
    let n = 0;
    const d = new Date();
    const key = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
    // Hôm nay chưa học vẫn giữ chuỗi của hôm qua
    if (!state.activity[key(d)]) d.setDate(d.getDate() - 1);
    while (state.activity[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function addResult(r) {
    state.results.push(Object.assign({ date: new Date().toISOString() }, r));
    if (state.results.length > 500) state.results = state.results.slice(-500);
    save();
    logActivity();
  }

  function exportJSON() { return JSON.stringify(state, null, 2); }
  function importJSON(text) {
    const obj = JSON.parse(text);
    state = merge(defaults(), obj);
    save();
  }
  function reset() { state = defaults(); save(); }

  return {
    get s() { return state; },
    save, today, logActivity, streak, addResult, exportJSON, importJSON, reset
  };
})();
