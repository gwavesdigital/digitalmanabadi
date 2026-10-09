// ==========================================
// AP SCHOOLS E-DIARY - MAIN APPLICATION SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const headers = document.querySelectorAll('.app-header');
  headers.forEach(header => {
    if (!header.querySelector('.header-brand')) {
      const isSubfolder = window.location.pathname.includes('/pages/');
      const assetPath = isSubfolder ? '../assets/icon-192.png' : './assets/icon-192.png';
      const homePath = isSubfolder ? '../index.html' : './index.html';
      
      const savedPass = localStorage.getItem('ap_app_password');
      const isLoggedOut = !savedPass || savedPass.trim() === '';
      const isInstalled = localStorage.getItem('ap_is_installed');
      const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';

      let actionsHTML = '';

      if (!isHomePage) {
        actionsHTML += `<button onclick="appGoBack()" class="header-btn" title="Go Back">⬅️ Back</button>`;
      }

      actionsHTML += `<a href="${homePath}" class="header-btn" title="Home">🏠 Home</a>`;

      if (!isLoggedOut && !isHomePage) {
        actionsHTML += `<button onclick="appLogout()" class="header-btn" title="Logout">🚪 Logout</button>`;
      }

      if (!isInstalled) {
        actionsHTML += `<button onclick="triggerInstall()" class="header-btn" title="Install App">⬇️ App</button>`;
      }

      header.innerHTML = `
        <div class="header-brand">
          <img src="${assetPath}" alt="AP Schools Logo" class="header-logo" />
          <div>
            <h1>AP Schools</h1>
            <p>Government of AP</p>
          </div>
        </div>
        <div class="header-actions">
          ${actionsHTML}
        </div>
      `;
    }
  });

  const footers = document.querySelectorAll('.app-footer');
  footers.forEach(footer => {
    footer.innerHTML = `
      <p style="font-weight: 600; color: var(--primary-dark); margin-bottom: 3px;">An initiative of @VALIASS team for AP Schools</p>
      <div class="support-links" style="display: flex; justify-content: center; align-items: center; gap: 8px;">
        <a href="tel:8985361991" class="support-link support-call" title="Call VALIASS Support">📞</a>
        <a href="https://wa.me/918985361991?text=Hello%20VALIASS%20team,%20I%20need%20assistance%20with%20AP%20Schools%20App." target="_blank" class="support-link support-whatsapp" title="WhatsApp VALIASS Support">
          <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>
    `;
  });
});

function appGoBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    const isSubfolder = window.location.pathname.includes('/pages/');
    window.location.href = isSubfolder ? '../index.html' : './index.html';
  }
}

function appLogout() {
  if (confirm('Are you sure you want to log out of your session?')) {
    const isSubfolder = window.location.pathname.includes('/pages/');
    window.location.href = isSubfolder ? './login.html' : './pages/login.html';
  }
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});

function triggerInstall() {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem('ap_is_installed', 'true');
      }
      window.deferredPrompt = null;
    });
  } else {
    alert('To install this app, tap your browser menu (3 dots) and select "Add to Home Screen" or "Install App".');
  }
}

function verifySchoolActivation(secretCode) {
  const cleanCode = secretCode ? secretCode.trim() : '';
  const expectedKey = "@533340";
  const dynamicKey = String(generateResetKey());
  return cleanCode === expectedKey || cleanCode === dynamicKey || cleanCode.endsWith("@533340");
}

function generateResetKey() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = dd + mm + yy;
  return 919720 - parseInt(dateStr, 10);
}
