 

(function () {
 
  const EMAILJS_PUBLIC_KEY  = '0tb6iDYzhdvgpm9Yr';
  const EMAILJS_SERVICE_ID  = 'service_sqed76o';
  const EMAILJS_TEMPLATE_ID = 'template_qxbvzbo';

   
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

   
  const timeEl = document.getElementById('local-time');
  function updateTime() {
    if (!timeEl) return;
    timeEl.textContent = new Date().toLocaleTimeString('fr-FR', {
      timeZone: 'America/Port-au-Prince',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }) + ' (HAT)';
  }
  updateTime();
  setInterval(updateTime, 1000);

  
  const emailItem = document.getElementById('copy-email');
  emailItem?.addEventListener('click', () => {
    navigator.clipboard.writeText('gamaelapollon@example.com').then(() => {
      const val = emailItem.querySelector('.contact-info-value');
      const original = val.textContent;
      val.textContent = '✓ Copié !';
      val.style.color = 'var(--accent)';
      setTimeout(() => { val.textContent = original; val.style.color = ''; }, 2000);
    });
  });

  
  const form      = document.getElementById('contact-form');
  const success   = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit');
  const errorMsg  = document.getElementById('form-error');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.querySelector('#form-name')?.value.trim();
    const email   = form.querySelector('#form-email')?.value.trim();
    const message = form.querySelector('#form-message')?.value.trim();

    if (!name || !email || !message) {
      showError('Merci de remplir tous les champs.');
      return;
    }
    if (!isValidEmail(email)) {
      showError('Adresse email invalide.');
      return;
    }

    if (errorMsg) errorMsg.style.display = 'none';
    setLoading(true);

    try {
      if (typeof emailjs === 'undefined') throw new Error('EmailJS non chargé');

      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      form.style.display = 'none';
      if (success) success.classList.add('visible');

    } catch (err) {
      console.error('EmailJS error:', err);
      showError("Erreur d'envoi. Contacte-moi directement par email.");
      setLoading(false);
    }
  });

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled    = loading;
    submitBtn.textContent = loading ? 'Envoi en cours...' : 'Envoyer →';
  }

  function showError(msg) {
    if (!errorMsg) return;
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    setTimeout(() => { errorMsg.style.display = 'none'; }, 4000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();