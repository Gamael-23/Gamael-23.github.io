 

(function () {

  const counterEl = document.getElementById('visitor-count');
  if (!counterEl) return;

   
  fetch('https://api.counterapi.dev/v1/gamaelapollon-portfolio/visits/up')
    .then(res => res.json())
    .then(data => {
      const count = data.count || 0;
       
      animateCount(counterEl, count);
    })
    .catch(() => {
      
      counterEl.textContent = '—';
    });

  function animateCount(el, target) {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

})();