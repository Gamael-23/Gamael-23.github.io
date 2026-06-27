

(function () {

  const codeEl   = document.getElementById('terminal-code');
  const cursorEl = document.getElementById('terminal-cursor');
  if (!codeEl) return;


  const lines = [
    { text: '<span class="tk-com">// Gamael Apollon — apprentissage Java</span>' },
    { text: '<span class="tk-kw">public class</span> <span class="tk-type">Etudiant</span> {' },
    { text: '    <span class="tk-type">private</span> <span class="tk-type">String</span> nom;' },
    { text: '    <span class="tk-type">private</span> <span class="tk-type">int</span> anneeEtude;' },
    { text: '' },
    { text: '    <span class="tk-type">public</span> <span class="tk-fn">Etudiant</span>(<span class="tk-type">String</span> nom, <span class="tk-type">int</span> annee) {' },
    { text: '        <span class="tk-kw">this</span>.nom = nom;' },
    { text: '        <span class="tk-kw">this</span>.anneeEtude = annee;' },
    { text: '    }' },
    { text: '' },
    { text: '    <span class="tk-type">public void</span> <span class="tk-fn">afficherProgres</span>() {' },
    { text: '        System.<span class="tk-fn">out</span>.<span class="tk-fn">println</span>(' },
    { text: '            nom + <span class="tk-str">" apprend depuis "</span>' },
    { text: '            + anneeEtude + <span class="tk-str">" ans."</span>' },
    { text: '        );' },
    { text: '    }' },
    { text: '}' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentHTML = [];

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      
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

 
  setTimeout(typeNextChar, 900);

})();