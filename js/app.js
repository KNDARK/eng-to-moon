/* Bộ định tuyến (hash router) và khởi tạo ứng dụng. */
const App = (() => {
  let current = null;

  function applyTheme() {
    const t = Store.s.settings.theme;
    const dark = t === 'dark' || (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  function updateStreak() {
    U.$('#streakBadge').textContent = '🔥 ' + Store.streak();
  }

  function route() {
    // Dọn dẹp trang trước: dừng hẹn giờ, âm thanh, ghi âm
    U.clearTimers();
    U.stopScript();
    if (current && current.leave) { try { current.leave(); } catch (e) { /* bỏ qua */ } }

    const hash = location.hash.replace(/^#\/?/, '');
    const [name, ...params] = hash.split('/').filter(Boolean);
    const key = name || 'dashboard';
    const page = Pages[key] || Pages.dashboard;
    current = page;

    U.$$('.sidebar a').forEach(a => a.classList.toggle('active', a.dataset.route === (name || '')));
    document.body.classList.remove('nav-open');

    // Thay #app bằng node mới để xoá mọi event listener của trang cũ
    const old = U.$('#app');
    const el = old.cloneNode(false);
    old.replaceWith(el);
    page.render(el, params);
    window.scrollTo(0, 0);
    el.focus({ preventScroll: true });
  }

  function init() {
    applyTheme();
    updateStreak();
    U.$('#themeBtn').addEventListener('click', () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      Store.s.settings.theme = dark ? 'light' : 'dark';
      Store.save();
      applyTheme();
    });
    U.$('#menuBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
    U.$('#backdrop').addEventListener('click', () => document.body.classList.remove('nav-open'));
    window.addEventListener('hashchange', route);
    route();
  }

  return { init, route, updateStreak, applyTheme };
})();

document.addEventListener('DOMContentLoaded', App.init);
