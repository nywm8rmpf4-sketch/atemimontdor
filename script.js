
document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const value=btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-category]').forEach(item=>{
      item.style.display=(value==='all'||item.dataset.category.includes(value))?'block':'none';
    });
  });
});

/* ATEMI v7.14 — apparitions discrètes au défilement */
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.section-head, .card, .course, .person, .event, .month-card, .summer-feature, .gallery, .quote, details');
  targets.forEach((el, index) => {
    el.classList.add('reveal-ready');
    el.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  targets.forEach(el => observer.observe(el));
});
