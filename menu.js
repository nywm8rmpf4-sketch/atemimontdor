
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const shell = document.getElementById('mobile-menu');
  const panel = shell?.querySelector('.mobile-menu-panel');
  const levels = shell ? [...shell.querySelectorAll('.mobile-menu-level')] : [];

  if (!toggle || !shell || !panel || !levels.length) return;

  const setViewportHeight = () => {
    const height = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty('--mobile-vh', `${Math.round(height)}px`);
  };

  const showLevel = (name) => {
    levels.forEach(level => {
      const active = level.dataset.level === name;
      level.hidden = !active;
      level.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) {
        const content = level.querySelector('.mobile-menu-content');
        if (content) content.scrollTop = 0;
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

  toggle.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    shell.hidden ? openMenu() : closeMenu();
  });

  shell.querySelectorAll('[data-close-mobile-menu]').forEach(button => {
    button.addEventListener('click', closeMenu);
  });

  shell.querySelectorAll('[data-open-level]').forEach(button => {
    button.addEventListener('click', () => showLevel(button.dataset.openLevel));
  });

  shell.querySelectorAll('[data-back-root]').forEach(button => {
    button.addEventListener('click', () => showLevel('root'));
  });

  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !shell.hidden) closeMenu();
  });

  const refreshViewport = () => {
    setViewportHeight();
    if (window.innerWidth > 900) closeMenu();
  };

  window.addEventListener('resize', refreshViewport);
  window.addEventListener('orientationchange', () => setTimeout(refreshViewport, 150));
  window.visualViewport?.addEventListener('resize', setViewportHeight);

  shell.hidden = true;
  showLevel('root');
  setViewportHeight();
});
