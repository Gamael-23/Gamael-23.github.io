/* ============================================
   CONTACT JS — GAMAEL APOLLON
   EmailJS + heure locale Haïti + copie email
   ============================================ */

(function () {

  /* ══════════════════════════════════════
     CONFIGURATION EMAILJS
     À remplir avec tes vraies clés :

     1. Va sur https://www.emailjs.com
     2. Crée un compte gratuit
     3. Add Service → Gmail → copie le Service ID
     4. Email Templates → crée un template → copie le Template ID
     5. Account → API Keys → copie la Public Key

     Le template EmailJS doit contenir :
     {{from_name}}   — nom de l'expéditeur
     {{from_email}}  — email de l'expéditeur
     {{subject}}     — type d'opportunité
     {{message}}     — message
     {{to_name}}     — "Gamael" (fixe)
  ══════════════════════════════════════ */
  const EMAILJS_PUBLIC_KEY  = 'TA_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID  = 'TA_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'TON_TEMPLATE_ID';

  // Initialiser EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  // ── Heure locale Haïti ──
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

  // ── Copier email ──
  const emailItem = document.getElementById('copy-email');
  emailItem?.addEventListener('click', () => {
    navigator.clipboard.writeText('gamaelapollon@example.com').then(() => {
      const val = emailItem.querySelector('.contact-info-value');
      if (!val) return;
      const original = val.textContent;
      val.textContent = '✓ Copié !';
      val.style.color = 'var(--accent)';
      setTimeout(() => { val.textContent = original; val.style.color = ''; }, 2000);
    });
  });

  // ── Formulaire ──
  const form      = document.getElementById('contact-form');
  const success   = document.getElementById('form-success');
  const errorMsg  = document.getElementById('form-error');
  const submitBtn = document.getElementById('form-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.querySelector('#form-name')?.value.trim();
    const email   = form.querySelector('#form-email')?.value.trim();
    const message = form.querySelector('#form-message')?.value.trim();

    if (!name || !email || !message) { showError('Merci de remplir tous les champs.'); return; }
    if (!isValidEmail(email))        { showError('Adresse email invalide.');            return; }

    setLoading(true);

    try {
      if (typeof emailjs === 'undefined') throw new Error('EmailJS non chargé');

      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      form.style.display = 'none';
      if (success) success.classList.add('visible');

    } catch (err) {
      console.error('EmailJS error:', err);

      // Mode démo si clés pas encore configurées
      if (EMAILJS_PUBLIC_KEY === 'TA_PUBLIC_KEY') {
        await new Promise(r => setTimeout(r, 1000));
        form.style.display = 'none';
        if (success) success.classList.add('visible');
      } else {
        showError("Erreur d'envoi. Contacte-moi directement par email.");
        setLoading(false);
      }
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
    errorMsg.classList.add('visible');
    setTimeout(() => errorMsg.classList.remove('visible'), 4000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();