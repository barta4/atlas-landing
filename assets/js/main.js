// Residencial Atlas — interacciones de la landing

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  let sections = [];

  // Header con sombra al hacer scroll
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    if (sections.length) updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // Link activo según la sección visible
  sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateActiveLink() {
    const offset = header.offsetHeight + 90;
    let current = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current.id}`);
    });
  }

  onScroll();

  // Aparición suave de los bloques
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = Math.min(i * 80, 320);
          setTimeout(() => el.classList.add('is-visible'), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // Año del footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Hook de conversión (Google Ads / Analytics) para los clics de WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', () => {
      // Si agregás Google Ads, descomentá y ajustá:
      // if (typeof gtag === 'function') {
      //   gtag('event', 'conversion', { send_to: 'AW-XXXXXXX/XXXXXXX' });
      // }
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({ event: 'whatsapp_click', location: link.className || 'link' });
      }
    });
  });
});
