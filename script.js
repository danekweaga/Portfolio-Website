// Edit NAV_LINKS to update site navigation everywhere.
const NAV_LINKS = [
  { href: '/', label: 'Home', nav: 'home' },
  { href: '/work.html', label: 'Work', nav: 'work' },
  { href: '/experience.html', label: 'Experience', nav: 'experience' },
  { href: '/about.html', label: 'About', nav: 'about' },
  {
    href: 'https://drive.google.com/file/d/1cFklpjNJI2-tKJNjwq6rfoWKYUwmiJXJ/view?usp=sharing',
    label: 'Résumé',
    external: true,
  },
];

function renderNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const page = document.body.dataset.page;
  nav.replaceChildren(...NAV_LINKS.map(({ href, label, nav: navKey, external }) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (navKey) link.dataset.nav = navKey;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    if (navKey && navKey === page) link.setAttribute('aria-current', 'page');
    return link;
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  const clock = document.querySelector('.clock');
  const greeting = document.querySelector('.greeting');
  const updateTime = () => {
    const now = new Date();
    if (clock) clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (greeting) {
      const hour = now.getHours();
      greeting.textContent = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    }
  };
  updateTime();
  window.setInterval(updateTime, 30000);

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  initScreenshotLightbox();
});

function initScreenshotLightbox() {
  const links = document.querySelectorAll('a.screenshot-zoom');
  if (!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Full-size screenshot');
  overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close full-size view">Close</button><img alt="">';
  document.body.appendChild(overlay);

  const fullImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  const close = () => {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
    fullImg.removeAttribute('src');
  };

  const open = (href, alt) => {
    fullImg.src = href;
    fullImg.alt = alt || '';
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const thumb = link.querySelector('img');
      open(link.href, thumb?.alt || '');
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hasAttribute('hidden')) close();
  });
}