 

(function () {

  const STORAGE_KEY = 'gamael-theme';
  const root        = document.documentElement;
  const toggle      = document.getElementById('theme-toggle');
  const icon        = toggle?.querySelector('.theme-toggle-icon');
 
  const ICONS = { light: '☀', dark: '☾' };

   
  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  
  function applyTheme(theme, animate = false) {
    if (animate) {
      
      if (icon) {
        icon.style.transform = 'rotate(360deg) scale(0.5)';
        setTimeout(() => {
          icon.textContent     = theme === 'dark' ? ICONS.dark : ICONS.light;
          icon.style.transform = '';
        }, 200);
      }
    } else {
      if (icon) icon.textContent = theme === 'dark' ? ICONS.dark : ICONS.light;
    }

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggle?.setAttribute('aria-label', 'Passer en mode clair');
    } else {
      root.removeAttribute('data-theme');
      toggle?.setAttribute('aria-label', 'Passer en mode sombre');
    }

     
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0C0C0E' : '#FFFFFF');
    }
  }

 
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme, false);
 
  toggle?.addEventListener('click', () => {
    const isDark  = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme, true);
    localStorage.setItem(STORAGE_KEY, newTheme);
  });

 
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light', true);
      }
    });

})();