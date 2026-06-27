 

document.addEventListener('DOMContentLoaded', () => {

 
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

  
  document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .skills-col'
  ).forEach((el) => revealObserver.observe(el));
 
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
  });

 
  const burger    = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('nav-mobile');
  let scrollY = 0;

  function openMenu() {
    scrollY = window.scrollY;
    burger.setAttribute('aria-expanded', 'true');
    mobileNav?.setAttribute('aria-hidden', 'false');
    mobileNav?.classList.add('open');
    burger.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.top = `-${scrollY}px`;
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    mobileNav?.setAttribute('aria-hidden', 'true');
    mobileNav?.classList.remove('open');
    burger.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  }

  burger?.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMenu();
  });

  
  burger?.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      history.pushState({ menuOpen: true }, '');
    }
  });

  window.addEventListener('popstate', () => {
    if (burger?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

 
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