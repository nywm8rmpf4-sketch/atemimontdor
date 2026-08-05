(() => {
  const host=document.querySelector('[data-interactive-calendar]'); if(!host) return;
  const events=[
    {start:'2026-09-14',end:'2026-09-30',title:'Journées Portes Ouvertes au dojo',type:'Portes ouvertes',status:'confirmed',detail:'Essais adultes possibles pendant les cours de chaque discipline.'},
    {month:'2026-11',title:'Stage d’automne Cheng Ming',type:'Stage Cheng Ming',detail:'Avec Paolo Magagnato. Date à confirmer.'},
    {month:'2027-03',title:'Stage de printemps CALAM',type:'Stage CALAM',detail:'Prévu en mars ou avril. Date et intervenants à confirmer.'},
    {month:'2027-05',title:'Rencontres Tui Shou',type:'Rencontres',detail:'Date et programme à confirmer.'},
    {month:'2027-05',title:'Stage de Milan',type:'Stage international',detail:'Avec le Grand Maître Wang Fu Lai. Week-end à confirmer.'},
    {month:'2027-07',title:'Stage d’été Cheng Ming',type:'Stage Cheng Ming',detail:'Avec Paolo Magagnato. Date à confirmer.'}
  ];
  const monthNames=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const weekdays=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']; let current=new Date(2026,8,1); let selected=null;
  const inMonth=(e,y,m)=>e.month===`${y}-${String(m+1).padStart(2,'0')}` || (e.start && e.start.slice(0,7)===`${y}-${String(m+1).padStart(2,'0')}`);
  const onDay=(e,iso)=>{ if(e.start&&e.end) return iso>=e.start&&iso<=e.end; return false; };
  function render(){const y=current.getFullYear(),m=current.getMonth(); const first=(new Date(y,m,1).getDay()+6)%7, days=new Date(y,m+1,0).getDate();
    host.innerHTML=`<div class="calendar-toolbar"><button type="button" data-prev aria-label="Mois précédent">‹</button><div class="calendar-month-title"><strong>${monthNames[m]} ${y}</strong><span>Choisissez un jour ou parcourez les mois</span></div><button type="button" data-next aria-label="Mois suivant">›</button></div><div class="calendar-body"><div class="calendar-grid-wrap"><div class="calendar-weekdays">${weekdays.map(d=>`<span>${d}</span>`).join('')}</div><div class="calendar-grid"></div></div><aside class="calendar-event-panel" aria-live="polite"></aside></div><div class="calendar-jump">${[['2026-09','Sept.'],['2026-11','Nov.'],['2027-03','Mars'],['2027-05','Mai'],['2027-07','Juil.']].map(([v,l])=>`<button type="button" data-jump="${v}" aria-current="${v===`${y}-${String(m+1).padStart(2,'0')}`}">${l}</button>`).join('')}</div>`;
    const grid=host.querySelector('.calendar-grid');
    for(let i=0;i<42;i++){const d=i-first+1; const dt=new Date(y,m,d); const iso=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`; const dayEvents=events.filter(e=>onDay(e,iso)); const b=document.createElement('div'); b.className='calendar-day'+(dt.getMonth()!==m?' is-outside':'')+(dayEvents.length?' has-event':'')+(selected===iso?' is-selected':''); b.innerHTML=`<button type="button" data-date="${iso}" aria-label="${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()}${dayEvents.length?', événement':''}">${dt.getDate()}</button>`; grid.appendChild(b);}
    showPanel(); host.querySelector('[data-prev]').onclick=()=>{current=new Date(y,m-1,1);selected=null;render()}; host.querySelector('[data-next]').onclick=()=>{current=new Date(y,m+1,1);selected=null;render()}; host.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{selected=b.dataset.date;render()}); host.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{const [yy,mm]=b.dataset.jump.split('-').map(Number);current=new Date(yy,mm-1,1);selected=null;render()});
  }
  function showPanel(){const y=current.getFullYear(),m=current.getMonth(), panel=host.querySelector('.calendar-event-panel'); let list=selected?events.filter(e=>onDay(e,selected)):events.filter(e=>inMonth(e,y,m)); const heading=selected?`Événements du ${new Date(selected+'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}`:`Événements en ${monthNames[m]} ${y}`; panel.innerHTML=`<h3>${heading}</h3><div class="calendar-event-list">${list.length?list.map(e=>`<article class="calendar-event-item"><strong>${e.title}</strong><span>${e.type}</span><p>${e.detail}</p><span class="calendar-status ${e.status==='confirmed'?'confirmed':''}">${e.status==='confirmed'?'Dates confirmées':'Date à confirmer'}</span></article>`).join(''):`<p class="calendar-empty">Aucun grand rendez-vous annoncé pour cette période.</p>`}</div>`;}
  render();
})();
