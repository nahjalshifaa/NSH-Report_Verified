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

function showInstallButton() {
    if (document.getElementById('pwaInstallBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'pwaInstallBtn';
    btn.type = 'button';
    btn.className = 'pwa-install-btn';
    btn.innerHTML = '⬇️ تثبيت التطبيق';
    btn.addEventListener('click', async () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        hideInstallButton();
    });
    document.body.appendChild(btn);
}

function hideInstallButton() {
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.remove();
}
