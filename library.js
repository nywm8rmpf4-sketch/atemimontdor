
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.library-card')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const input = document.getElementById('letter-search');
  let filter = 'all';
  const update = () => {
    const q = (input?.value || '').toLowerCase().trim();
    cards.forEach(card => {
      const theme = card.dataset.theme || '';
      const okTheme = filter === 'all' || theme === filter;
      const okText = !q || card.textContent.toLowerCase().includes(q);
      card.hidden = !(okTheme && okText);
    });
  };
  buttons.forEach(btn => btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    buttons.forEach(b => b.classList.toggle('active', b === btn));
    update();
  }));
  input?.addEventListener('input', update);
});
