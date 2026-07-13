// ============================================================
// تسجيل الـ Service Worker + زرار "تثبيت التطبيق" على الموبايل/الكمبيوتر
// ============================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 'sw.js' لازم يكون دايمًا في جذر الموقع عشان يقدر يتحكم في كل الصفحات
        const base = window.location.pathname.replace(/[^/]+$/, '');
        navigator.serviceWorker.register(base + 'sw.js').catch(() => {
            // تجاهل: لو فشل التسجيل (مثلاً الموقع مش شغال على HTTPS)، الموقع يفضل شغال عادي بدون PWA
        });
    });
}

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallButton();
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    hideInstallButton();
});

async function handleInstallClick() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    hideInstallButton();
}

// نفس تصميم زرار الواتساب بالظبط: شريط نص + دائرة أيقونة، بس على الجنب التاني من الشاشة
function showInstallButton() {
    if (document.getElementById('pwaInstallWidget')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'pwaInstallWidget';
    wrapper.className = 'pwa-widget';
    wrapper.innerHTML = `
        <a href="#" class="pwa-install-pill">⬇️ تثبيت التطبيق</a>
        <button type="button" class="pwa-install-circle" aria-label="تثبيت التطبيق">⬇️</button>
    `;
    wrapper.querySelectorAll('.pwa-install-pill, .pwa-install-circle').forEach(el => {
        el.addEventListener('click', (e) => { e.preventDefault(); handleInstallClick(); });
    });
    document.body.appendChild(wrapper);
}

function hideInstallButton() {
    const el = document.getElementById('pwaInstallWidget');
    if (el) el.remove();
}
