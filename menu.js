
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const shell = document.querySelector('.mobile-menu-shell');
  const panel = document.querySelector('.mobile-menu-panel');
  const levels = [...document.querySelectorAll('.mobile-menu-level')];

  if (!toggle || !shell || !panel || !levels.length) return;

  const setViewportHeight = () => {
    const height = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty('--mobile-vh', `${Math.round(height)}px`);
  };

  const showLevel = name => {
    levels.forEach(level => {
      const active = level.dataset.level === name;
      level.hidden = !active;
      level.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) {
        const scroller = level.querySelector('.mobile-menu-content');
        if (scroller) scroller.scrollTop = 0;
      }
    });
  };

  const openMenu = () => {
    setViewportHeight();
    showLevel('root');
    shell.hidden = false;
    shell.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');
  };

  const closeMenu = () => {
    shell.hidden = true;
    shell.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    showLevel('root');
  };

  toggle.addEventListener('click', () => {
    shell.hidden ? openMenu() : closeMenu();
  });

  shell.querySelectorAll('[data-close-mobile-menu]').forEach(el => {
    el.addEventListener('click', closeMenu);
  });

  shell.querySelectorAll('[data-open-level]').forEach(el => {
    el.addEventListener('click', () => showLevel(el.dataset.openLevel));
  });

  shell.querySelectorAll('[data-back-root]').forEach(el => {
    el.addEventListener('click', () => showLevel('root'));
  });

  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !shell.hidden) closeMenu();
  });

  const refresh = () => {
    setViewportHeight();
    if (window.innerWidth > 900) closeMenu();
  };

  window.addEventListener('resize', refresh);
  window.addEventListener('orientationchange', () => setTimeout(refresh, 150));
  window.visualViewport?.addEventListener('resize', setViewportHeight);
  window.visualViewport?.addEventListener('scroll', setViewportHeight);

  setViewportHeight();
  shell.hidden = true;
  showLevel('root');
});
