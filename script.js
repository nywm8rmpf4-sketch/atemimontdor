
const bar=document.querySelector('.topbar');
const hamburger=document.querySelector('.hamb');
if(hamburger){hamburger.addEventListener('click',()=>bar.classList.toggle('mobile-open'));}
document.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',()=>bar.classList.remove('mobile-open')));
const modal=document.querySelector('.modal');
if(modal){const img=modal.querySelector('img');document.querySelectorAll('.gallery button').forEach(b=>b.addEventListener('click',()=>{img.src=b.dataset.img;img.alt=b.dataset.alt||'';modal.classList.add('open')}));modal.addEventListener('click',e=>{if(e.target===modal||e.target.tagName==='BUTTON')modal.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});}
