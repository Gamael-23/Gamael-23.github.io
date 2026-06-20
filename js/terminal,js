/* ============================================
   TERMINAL ANIMÉ — GAMAEL APOLLON
   Tape du vrai code C++ caractère par caractère
   ============================================ */

(function () {

  const codeEl   = document.getElementById('terminal-code');
  const cursorEl = document.getElementById('terminal-cursor');
  if (!codeEl) return;

  // ── Extrait de code réel — inspiré du projet pharmacie ──
  const lines = [
    { text: '<span class="tk-com">// Gestion de stock — Pharmacie</span>' },
    { text: '<span class="tk-kw">class</span> <span class="tk-type">Produit</span> {' },
    { text: '<span class="tk-type">public</span>:' },
    { text: '    <span class="tk-type">string</span> nom;' },
    { text: '    <span class="tk-type">int</span> quantite;' },
    { text: '    <span class="tk-type">float</span> prix;' },
    { text: '    <span class="tk-type">bool</span> <span class="tk-fn">estPerime</span>() {' },
    { text: '        <span class="tk-kw">return</span> quantite == <span class="tk-num">0</span>;' },
    { text: '    }' },
    { text: '};' },
    { text: '' },
    { text: '<span class="tk-type">void</span> <span class="tk-fn">verifierStock</span>(<span class="tk-type">Produit</span>& p) {' },
    { text: '    <span class="tk-kw">if</span> (p.<span class="tk-fn">estPerime</span>()) {' },
    { text: '        <span class="tk-fn">alerter</span>(<span class="tk-str">"Stock vide !"</span>);' },
    { text: '    }' },
    { text: '}' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentHTML = [];

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      // Pause puis reset pour boucler
      setTimeout(() => {
        currentHTML = [];
        lineIndex = 0;
        charIndex = 0;
        codeEl.innerHTML = '';
        typeNextChar();
      }, 2200);
      return;
    }

    const line = lines[lineIndex];
    const plainLength = line.text.replace(/<[^>]*>/g, '').length;

    if (charIndex === 0) {
      currentHTML.push('');
    }

    // On affiche la ligne en HTML complet d'un coup pour préserver les balises,
    // mais on simule l'effet "typing" via un compteur de caractères visibles
    charIndex++;

    const revealed = revealPartialHTML(line.text, charIndex);
    currentHTML[lineIndex] = revealed;
    codeEl.innerHTML = currentHTML.join('\n');

    if (charIndex >= plainLength) {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 90);
    } else {
      const speed = plainLength === 0 ? 0 : 18 + Math.random() * 22;
      setTimeout(typeNextChar, speed);
    }
  }

  // Révèle progressivement le texte en ignorant les balises HTML pour le compte de caractères
  function revealPartialHTML(html, visibleChars) {
    let result   = '';
    let visible  = 0;
    let i        = 0;

    while (i < html.length) {
      if (html[i] === '<') {
        const tagEnd = html.indexOf('>', i);
        result += html.slice(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        if (visible < visibleChars) {
          result += html[i];
          visible++;
        }
        i++;
      }
    }
    return result;
  }

  // Démarre après l'apparition du terminal (synchronisé avec l'animation CSS)
  setTimeout(typeNextChar, 900);

})();