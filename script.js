document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  document.querySelector(`[data-nav="${page}"]`)?.setAttribute('aria-current', 'page');

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
});
