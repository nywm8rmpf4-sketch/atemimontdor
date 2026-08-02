
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const shell = document.querySelector('.mobile-menu-shell');
  const panel = document.querySelector('.mobile-menu-panel');
  const levels = [...document.querySelectorAll('.mobile-menu-level')];
  const closeButtons = [...document.querySelectorAll('[data-close-mobile-menu]')];
  const openButtons = [...document.querySelectorAll('[data-open-level]')];
  const backButtons = [...document.querySelectorAll('[data-back-root]')];

  if (!toggle || !shell || !panel || !levels.length) return;

  const setViewportHeight = () => {
    const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty('--mobile-vh', `${height}px`);
  };

  const showLevel = (name) => {
    levels.forEach(level => {
      const active = level.dataset.level === name;
      level.classList.toggle('is-active', active);
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
    shell.classList.add('is-open');
    shell.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');
  };

  const closeMenu = () => {
    shell.classList.remove('is-open');
    shell.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    showLevel('root');
  };

  toggle.addEventListener('click', () => {
    shell.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  closeButtons.forEach(button => button.addEventListener('click', closeMenu));

  openButtons.forEach(button => {
    button.addEventListener('click', () => showLevel(button.dataset.openLevel));
  });

  backButtons.forEach(button => {
    button.addEventListener('click', () => showLevel('root'));
  });

  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    setViewportHeight();
    if (window.innerWidth > 900) closeMenu();
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 150);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setViewportHeight);
    window.visualViewport.addEventListener('scroll', setViewportHeight);
  }

  setViewportHeight();
});
