// ============================================================
// فوتر موحّد لكل صفحات الموقع — حقوق الملكية الفكرية وبيانات التواصل
// ============================================================
async function renderSiteFooter() {
    if (document.getElementById('siteFooter')) return;
    const year = new Date().getFullYear();
    const defaultText = `© جميع حقوق الملكية الفكرية لهذا التطبيق محفوظة لدى الشركة المطوّرة — مجمع نهج الشفاء الطبي العام ${year}`;

    const footer = document.createElement('footer');
    footer.id = 'siteFooter';
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="site-footer-inner">
            <p class="footer-copyright" id="footerCopyrightText">${defaultText}</p>
            <p class="footer-contact">
                يمكنكم التواصل معنا:
                <span class="footer-contact-item">📞 <a href="tel:+201384679999">01384679999</a> - <a href="tel:+205909331883">05909331883</a></span>
                <span class="footer-contact-item">✉️ <a href="mailto:info@nahjalshifaa.com">info@nahjalshifaa.com</a></span>
            </p>
        </div>`;
    document.body.appendChild(footer);

    // لو الأدمن حط نص مخصص لحقوق الملكية في الإعدادات، نستخدمه بدل النص الافتراضي
    try {
        if (typeof sheetsGetSettings === 'function') {
            const settings = await sheetsGetSettings();
            const customText = (settings.copyright_text || '').toString().trim();
            if (customText) {
                document.getElementById('footerCopyrightText').textContent = customText;
            }
        }
    } catch (e) {
        // تجاهل: يفضل النص الافتراضي شغال لو حصل أي خطأ في تحميل الإعدادات
    }
}

document.addEventListener('DOMContentLoaded', renderSiteFooter);
