/* ============================================
   GITHUB API — GAMAEL APOLLON
   Affiche tes repos publics automatiquement
   ============================================ */

(function () {

  const GITHUB_USERNAME = 'gamaelapollon'; // ← change par ton vrai username
  const container = document.getElementById('github-repos');
  if (!container) return;

  // ── Skeleton loader pendant le fetch ──
  container.innerHTML = Array(3).fill(`
    <div class="github-card github-skeleton">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-desc"></div>
      <div class="skeleton-line skeleton-meta"></div>
    </div>
  `).join('');

  // ── Fetch les repos ──
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('GitHub API error');
      return res.json();
    })
    .then(repos => {
      // Filtrer les forks, garder les vrais projets
      const filtered = repos
        .filter(r => !r.fork && r.name !== GITHUB_USERNAME)
        .slice(0, 4);

      if (filtered.length === 0) {
        container.innerHTML = `
          <p class="github-empty">
            Aucun repo public pour l'instant —
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">
              voir le profil GitHub ↗
            </a>
          </p>`;
        return;
      }

      container.innerHTML = filtered.map(repo => `
        <a href="${repo.html_url}" target="_blank" rel="noopener"
           class="github-card reveal">
          <div class="github-card-top">
            <span class="github-card-name">${repo.name}</span>
            <span class="github-card-arrow">↗</span>
          </div>
          <p class="github-card-desc">
            ${repo.description || 'Pas de description — voir le code.'}
          </p>
          <div class="github-card-meta">
            ${repo.language ? `
              <span class="github-meta-lang">
                <span class="lang-dot" data-lang="${repo.language}"></span>
                ${repo.language}
              </span>` : ''}
            <span class="github-meta-stars">
              ★ ${repo.stargazers_count}
            </span>
            <span class="github-meta-updated">
              Mis à jour ${formatDate(repo.updated_at)}
            </span>
          </div>
        </a>
      `).join('');

      // Réobserver les nouveaux éléments pour le scroll reveal
      document.querySelectorAll('.github-card.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 100);
      });
    })
    .catch(() => {
      container.innerHTML = `
        <p class="github-empty">
          Impossible de charger les repos —
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">
            voir directement sur GitHub ↗
          </a>
        </p>`;
    });


  // ── Formater la date ──
  function formatDate(isoString) {
    const date = new Date(isoString);
    const now  = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "aujourd'hui";
    if (diff === 1) return 'hier';
    if (diff < 7)  return `il y a ${diff} jours`;
    if (diff < 30) return `il y a ${Math.floor(diff/7)} sem.`;
    if (diff < 365) return `il y a ${Math.floor(diff/30)} mois`;
    return `il y a ${Math.floor(diff/365)} an(s)`;
  }

})();