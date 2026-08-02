
document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click',()=>{
    const lb=document.querySelector('.lightbox');
    lb.querySelector('img').src=img.src;
    lb.classList.add('open');
  });
});
document.querySelectorAll('.close-lightbox,.lightbox').forEach(el=>{
  el.addEventListener('click',e=>{
    if(e.target===el || el.classList.contains('close-lightbox')){
      document.querySelector('.lightbox')?.classList.remove('open');
    }
  });
});
