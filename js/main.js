/* ============================================
   GAMAEL APOLLON — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observer toutes les classes reveal
  document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .skills-col'
  ).forEach((el) => revealObserver.observe(el));

  // ── Nav scroll ──
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Burger menu ──
  const burger    = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('nav-mobile');

  burger?.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    mobileNav?.setAttribute('aria-hidden', String(isOpen));
    mobileNav?.classList.toggle('open', !isOpen);
    burger.classList.toggle('active', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      mobileNav?.setAttribute('aria-hidden', 'true');
      mobileNav?.classList.remove('open');
      burger?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((s) => activeObserver.observe(s));

});