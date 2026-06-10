/* ============================================
   PARALLAX HERO — GAMAEL APOLLON
   L'image et le texte bougent à des vitesses
   différentes au scroll — effet de profondeur
   ============================================ */

(function () {

  const hero     = document.getElementById('hero');
  const heroBg   = document.querySelector('.hero-bg');
  const heroInner = document.querySelector('.hero-inner');
  const heroOrb  = document.querySelector('.hero-orb');

  if (!hero || !heroBg) return;

  // Désactiver sur mobile (performance)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  // Désactiver si préférence reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function updateParallax() {
    const scrollY      = window.scrollY;
    const heroHeight   = hero.offsetHeight;

    // On ne parallaxe que quand le hero est visible
    if (scrollY > heroHeight) return;

    // Image de fond — bouge plus lentement (0.4x)
    const bgOffset = scrollY * 0.4;
    heroBg.style.transform = `translateY(${bgOffset}px)`;

    // Texte — bouge légèrement plus vite (0.15x)
    const textOffset = scrollY * 0.15;
    if (heroInner) {
      heroInner.style.transform = `translateY(${textOffset}px)`;
    }

    // Orbe — bouge encore plus vite (0.25x) — effet profondeur
    if (heroOrb) {
      heroOrb.style.transform = `translateY(${scrollY * 0.25}px)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Reset au resize
  window.addEventListener('resize', () => {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    if (mobile) {
      heroBg.style.transform   = '';
      if (heroInner) heroInner.style.transform = '';
      if (heroOrb)   heroOrb.style.transform   = '';
    }
  });

})();