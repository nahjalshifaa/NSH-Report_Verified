// ============================================================
// فوتر موحّد لكل صفحات الموقع — حقوق الملكية الفكرية وبيانات التواصل
// ============================================================
function renderSiteFooter() {
    if (document.getElementById('siteFooter')) return;
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.id = 'siteFooter';
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="site-footer-inner">
            <p class="footer-copyright">© جميع حقوق الملكية الفكرية لهذا التطبيق محفوظة لدى الشركة المطوّرة — مجمع نهج الشفاء الطبي العام ${year}</p>
            <p class="footer-contact">
                يمكنكم التواصل معنا:
                <span class="footer-contact-item">📞 <a href="tel:+201384679999">01384679999</a> - <a href="tel:+205909331883">05909331883</a></span>
                <span class="footer-contact-item">✉️ <a href="mailto:info@nahjalshifaa.com">info@nahjalshifaa.com</a></span>
            </p>
        </div>`;
    document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', renderSiteFooter);
