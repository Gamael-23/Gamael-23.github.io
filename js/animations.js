 

document.addEventListener('DOMContentLoaded', () => {

 
  const badgeSpan = document.querySelector('.hero-badge-text');
  if (badgeSpan) {
    const text = badgeSpan.getAttribute('data-text') || badgeSpan.textContent;
    badgeSpan.textContent = '';

    setTimeout(() => {
      let i = 0;
      const type = setInterval(() => {
        badgeSpan.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(type);
      }, 40);
    }, 1500);
  }


  
  const statItems = document.querySelectorAll('.stat-item');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target.querySelector('.stat-number');
      if (!el || el.dataset.animated) return;
      el.dataset.animated = 'true';

      const suffix   = el.dataset.suffix  || '';
      const target   = parseFloat(el.dataset.target || '0');
      const isFloat  = el.dataset.float === 'true';
      const duration = 1400;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = isFloat
          ? (eased * target).toFixed(1)
          : Math.floor(eased * target);

        el.innerHTML = `${current}<span>${suffix}</span>`;
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  statItems.forEach(el => counterObserver.observe(el));

 
  const progressFills = document.querySelectorAll('.learning-progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill   = entry.target;
      const target = fill.dataset.progress || '0%';
      setTimeout(() => { fill.style.width = target; }, 200);
      progressObserver.unobserve(fill);
    });
  }, { threshold: 0.3 });

  progressFills.forEach(el => progressObserver.observe(el));


  
  const cards = document.querySelectorAll(
    '.project-card:not(.project-card--featured)'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width  / 2) / rect.width)  *  6;
      card.style.transition = 'transform 0.08s ease';
      card.style.transform  =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s ease, background 0.25s';
      card.style.transform  = '';
    });
  });


   
  const scrollHint = document.querySelector('.hero-scroll');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.style.opacity   = window.scrollY > 80 ? '0' : '1';
      scrollHint.style.transition = 'opacity 0.4s ease';
    }, { passive: true });
  }

});