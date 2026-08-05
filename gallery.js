(() => {
  const gallery = document.querySelector('.media-gallery');
  const viewer = document.querySelector('#media-viewer');
  if (!gallery || !viewer) return;

  const cards = [...gallery.querySelectorAll('.media-card')];
  const filters = [...document.querySelectorAll('.media-filter')];
  const empty = document.querySelector('.gallery-empty');
  const content = viewer.querySelector('.media-viewer-content');
  const title = viewer.querySelector('.media-viewer-title');
  const caption = viewer.querySelector('.media-viewer-caption');
  const count = viewer.querySelector('.media-viewer-count');
  const stage = viewer.querySelector('.media-viewer-stage');
  const prevBtn = viewer.querySelector('.viewer-prev');
  const nextBtn = viewer.querySelector('.viewer-next');
  const zoomReset = viewer.querySelector('.viewer-zoom-reset');
  let visibleCards = cards;
  let index = 0;
  let scale = 1;
  let x = 0;
  let y = 0;
  let dragging = false;
  let dragStart = null;
  let pinchStart = null;
  let swipeStart = null;
  let lastTap = 0;

  function mediaUrl(card) {
    const raw = card.dataset.src;
    const existing = card.querySelector(card.dataset.type === 'video' ? 'source' : 'img')?.getAttribute('src');
    return existing || raw;
  }

  function applyTransform() {
    const img = content.querySelector('img');
    if (!img) return;
    img.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    zoomReset.textContent = `${Math.round(scale * 100)} %`;
    stage.classList.toggle('is-zoomed', scale > 1.01);
  }

  function resetZoom() {
    scale = 1; x = 0; y = 0; applyTransform();
  }

  function setZoom(nextScale, originX = 0, originY = 0) {
    const old = scale;
    scale = Math.min(5, Math.max(1, nextScale));
    if (old !== scale && scale > 1) {
      const ratio = scale / old;
      x = originX - (originX - x) * ratio;
      y = originY - (originY - y) * ratio;
    }
    if (scale === 1) x = y = 0;
    applyTransform();
  }

  function render() {
    const card = visibleCards[index];
    if (!card) return;
    resetZoom();
    content.replaceChildren();
    if (card.dataset.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = mediaUrl(card);
      content.append(video);
      viewer.classList.add('is-video');
    } else {
      const img = document.createElement('img');
      img.alt = card.dataset.title || '';
      img.draggable = false;
      img.src = mediaUrl(card);
      content.append(img);
      viewer.classList.remove('is-video');
      const next = visibleCards[(index + 1) % visibleCards.length];
      if (next?.dataset.type === 'image') (new Image()).src = mediaUrl(next);
    }
    title.textContent = card.dataset.title || '';
    caption.textContent = card.dataset.caption || '';
    count.textContent = `${index + 1} / ${visibleCards.length}`;
    const multi = visibleCards.length > 1;
    prevBtn.hidden = nextBtn.hidden = !multi;
  }

  function open(card) {
    visibleCards = cards.filter(c => !c.hidden);
    index = Math.max(0, visibleCards.indexOf(card));
    viewer.hidden = false;
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('viewer-open');
    render();
    viewer.querySelector('.viewer-close').focus();
  }

  function close() {
    content.querySelector('video')?.pause();
    viewer.hidden = true;
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('viewer-open');
    resetZoom();
  }

  function move(step) {
    if (!visibleCards.length) return;
    content.querySelector('video')?.pause();
    index = (index + step + visibleCards.length) % visibleCards.length;
    render();
  }

  cards.forEach(card => card.querySelector('.media-open')?.addEventListener('click', () => open(card)));
  viewer.querySelectorAll('[data-viewer-close]').forEach(el => el.addEventListener('click', close));
  prevBtn.addEventListener('click', () => move(-1));
  nextBtn.addEventListener('click', () => move(1));
  viewer.querySelector('.viewer-zoom-in').addEventListener('click', () => setZoom(scale + .5));
  viewer.querySelector('.viewer-zoom-out').addEventListener('click', () => setZoom(scale - .5));
  zoomReset.addEventListener('click', resetZoom);
  viewer.querySelector('.viewer-fullscreen').addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await viewer.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {}
  });

  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.toggle('is-active', b === btn));
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/);
      card.hidden = filter !== 'all' && !categories.includes(filter);
    });
    empty.hidden = cards.some(card => !card.hidden);
  }));

  stage.addEventListener('wheel', e => {
    if (!content.querySelector('img')) return;
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    setZoom(scale * (e.deltaY < 0 ? 1.15 : .87), e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2);
  }, { passive: false });

  stage.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    if (scale <= 1 || !content.querySelector('img')) return;
    dragging = true;
    dragStart = { px: e.clientX, py: e.clientY, x, y };
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging || !dragStart) return;
    x = dragStart.x + e.clientX - dragStart.px;
    y = dragStart.y + e.clientY - dragStart.py;
    applyTransform();
  });
  stage.addEventListener('pointerup', () => { dragging = false; dragStart = null; });

  stage.addEventListener('touchstart', e => {
    if (e.touches.length === 2 && content.querySelector('img')) {
      const [a,b] = e.touches;
      pinchStart = { distance: Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY), scale };
    } else if (e.touches.length === 1) {
      const t=e.touches[0];
      swipeStart={x:t.clientX,y:t.clientY,time:Date.now(),tx:x,ty:y};
    }
  }, {passive:true});
  stage.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && pinchStart) {
      e.preventDefault();
      const [a,b]=e.touches;
      setZoom(pinchStart.scale * Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY)/pinchStart.distance);
    } else if (e.touches.length === 1 && swipeStart && scale > 1) {
      e.preventDefault();
      const t=e.touches[0]; x=swipeStart.tx+t.clientX-swipeStart.x; y=swipeStart.ty+t.clientY-swipeStart.y; applyTransform();
    }
  }, {passive:false});
  stage.addEventListener('touchend', e => {
    if (pinchStart) { pinchStart=null; return; }
    if (!swipeStart) return;
    const t=e.changedTouches[0];
    const dx=t.clientX-swipeStart.x, dy=t.clientY-swipeStart.y, elapsed=Date.now()-swipeStart.time;
    if (scale === 1 && elapsed < 600 && Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)) move(dx<0?1:-1);
    swipeStart=null;
  });
  stage.addEventListener('click', e => {
    if (!content.querySelector('img')) return;
    const now=Date.now();
    if (now-lastTap<320) setZoom(scale>1?1:2);
    lastTap=now;
  });

  document.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
    if (e.key === '+' || e.key === '=') setZoom(scale + .5);
    if (e.key === '-') setZoom(scale - .5);
    if (e.key === '0') resetZoom();
  });
})();
