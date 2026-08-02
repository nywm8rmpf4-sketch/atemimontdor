
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
