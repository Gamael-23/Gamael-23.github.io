 

(function () {
  const loader  = document.getElementById('loader');
  const bar     = document.querySelector('.loader-bar');
  const counter = document.querySelector('.loader-count');

  if (!loader) return;

  let progress = 0;

  const tick = setInterval(() => {
    const step = progress < 70 ? 2.5 : progress < 90 ? 1 : 0.4;
    progress = Math.min(progress + step, 100);

    if (bar)     bar.style.width   = progress + '%';
    if (counter) counter.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 650);
      }, 300);
    }
  }, 28);
})();