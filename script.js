const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

function closeMenu() {
  nav.classList.remove('open');
  header.classList.remove('nav-open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  header.classList.toggle('nav-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

const practices = {
  taichi: {
    title: 'Tai Chi Chuan',
    html: '<p>Le Tai Chi Chuan associe formes lentes, changements de direction, travail des appuis et applications martiales. La lenteur permet d’observer les ruptures de coordination et d’affiner progressivement la continuité du mouvement.</p><ul><li>Formes et enchaînements</li><li>Principes de Peng, Lu, Ji et An</li><li>Tui Shou et applications contrôlées</li></ul>'
  },
  qigong: {
    title: 'Qi Gong & Yang Sheng',
    html: '<p>Le Qi Gong développe l’attention, la respiration, la mobilité et le relâchement. Le Yang Sheng — « nourrir la vie » — place la pratique dans une perspective d’entretien global du corps.</p><ul><li>Postures et mouvements guidés</li><li>Travail du souffle et de l’attention</li><li>Préparation aux arts internes</li></ul>'
  },
  yiquan: {
    title: 'Yi Quan / Da Cheng Chuan',
    html: '<p>Le Yi Quan s’appuie sur les postures, les essais de force et les déplacements pour relier intention et organisation corporelle. Le pratiquant recherche une force élastique, adaptable et disponible.</p><ul><li>Zhan Zhuang — postures</li><li>Shi Li — essais de force</li><li>Déplacements et émission de force</li></ul>'
  },
  xingyi: {
    title: 'Xing Yi Quan',
    html: '<p>Le Xing Yi Quan est une boxe interne à l’expression directe. Son étude met l’accent sur l’alignement, l’engagement du corps entier et la capacité à agir sans mouvements superflus.</p><ul><li>Actions fondamentales</li><li>Coordination des appuis et du centre</li><li>Applications martiales progressives</li></ul>'
  },
  bagua: {
    title: 'Bagua Zhang',
    html: '<p>Le Bagua Zhang développe mobilité, changements de direction et spirales par la marche circulaire et les changements de paumes. La pratique favorise l’adaptation continue autour d’un axe stable.</p><ul><li>Marche en cercle</li><li>Changements de paumes</li><li>Transformations et travail en relation</li></ul>'
  },
  tuishou: {
    title: 'Tui Shou & applications',
    html: '<p>Le Tui Shou est un laboratoire à deux. Il permet de tester l’équilibre, la qualité du contact, la capacité à absorber et transformer une force, puis à répondre sans rigidité excessive.</p><ul><li>Écoute tactile</li><li>Stabilité et mobilité</li><li>Neutralisation et émission contrôlée</li></ul>'
  }
};

const dialog = document.getElementById('practice-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogContent = document.getElementById('dialog-content');
document.querySelectorAll('.practice-more').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.closest('.practice-card').dataset.practice;
    dialogTitle.textContent = practices[key].title;
    dialogContent.innerHTML = practices[key].html;
    dialog.showModal();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});
dialog.querySelector('a').addEventListener('click', () => dialog.close());

const form = document.getElementById('contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `[Site ATEMI] ${data.get('subject')}`;
  const body = `Bonjour,\n\n${data.get('message')}\n\nNom : ${data.get('name')}\nCourriel : ${data.get('email')}\nTéléphone : ${data.get('phone') || 'Non renseigné'}\n\nCordialement`;
  window.location.href = `mailto:atemimontdor@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-note').textContent = 'Votre application de courrier électronique devrait maintenant s’ouvrir.';
});
