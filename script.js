// ==========================================
// 1. إدارة الوضع المظلم (Dark Mode)
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btns = document.querySelectorAll('.btn-theme');
    btns.forEach(btn => {
        if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    });
}

// ==========================================
// 2. إدارة اللغة (ثنائية اللغة)
// ==========================================
let currentLang = localStorage.getItem('preferredLanguage') || 'ar';

function applyLanguage() {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        // حفظ الأيقونات الداخلية
        const icon = el.querySelector('i');
        if (icon) {
            el.innerHTML = icon.outerHTML + ' ' + text;
        } else {
            el.innerText = text;
        }
    });
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('preferredLanguage', currentLang);
    applyLanguage();
    // إعادة تحميل البيانات الحساسة (مثل نتائج الاختبارات) إذا لزم الأمر
    if (typeof updateChecklist === 'function') updateChecklist();
    if (typeof refreshDashboard === 'function') refreshDashboard();
}

// ==========================================
// 3. إضافة الفوتر الحكومي تلقائياً (إذا لم يكن موجوداً)
// ==========================================
function injectFooter() {
    if (document.querySelector('.gov-footer')) return;
    const footerHTML = `
    <footer class="gov-footer">
        <div class="footer-container">
            <div class="footer-col">
                <div class="footer-logos">
                    <div class="hospital-logo">🏥 <span data-ar="المدينة الطبية" data-en="Medical City">المدينة الطبية</span></div>
                    <div class="vision-logo">🇸🇦 <span data-ar="رؤية 2030" data-en="Vision 2030">رؤية 2030</span></div>
                </div>
                <p data-ar="منصة التوعية بالأمن السيبراني، نهدف لبناء بيئة رقمية آمنة وموثوقة تحمي بيانات المرضى وتضمن استمرارية الأعمال." data-en="Cybersecurity Awareness Portal, aiming to build a secure digital environment that protects patient data and ensures business continuity.">منصة التوعية بالأمن السيبراني، نهدف لبناء بيئة رقمية آمنة وموثوقة تحمي بيانات المرضى وتضمن استمرارية الأعمال.</p>
            </div>
            <div class="footer-col links">
                <h3 data-ar="روابط وطنية هامة" data-en="National Links">روابط وطنية هامة</h3>
                <ul>
                    <li><a href="https://nca.gov.sa" target="_blank" data-ar="الهيئة الوطنية للأمن السيبراني" data-en="NCA">الهيئة الوطنية للأمن السيبراني</a></li>
                    <li><a href="https://sdaia.gov.sa" target="_blank" data-ar="الهيئة السعودية للبيانات (سدايا)" data-en="SDAIA">الهيئة السعودية للبيانات (سدايا)</a></li>
                    <li><a href="https://moh.gov.sa" target="_blank" data-ar="وزارة الصحة" data-en="MOH">وزارة الصحة</a></li>
                </ul>
            </div>
            <div class="footer-col links">
                <h3 data-ar="السياسات والدعم" data-en="Policies">السياسات والدعم</h3>
                <ul>
                    <li><a href="#" data-ar="سياسة الخصوصية (PDPL)" data-en="Privacy Policy">سياسة الخصوصية (PDPL)</a></li>
                    <li><a href="faq.html" data-ar="الأسئلة الشائعة (FAQ)" data-en="FAQ">الأسئلة الشائعة (FAQ)</a></li>
                    <li><a href="report.html" data-ar="رفع تذكرة أمنية (SOC)" data-en="SOC Ticket">رفع تذكرة أمنية (SOC)</a></li>
                </ul>
            </div>
            <div class="footer-col contact">
                <h3 data-ar="تواصل مع فريق الأمن" data-en="Contact Security">تواصل مع فريق الأمن</h3>
                <p>📧 SOC@hospital.edu.sa</p>
                <p>📞 <span data-ar="تحويلة طوارئ:" data-en="Emergency Ext:">تحويلة طوارئ:</span> 9111</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p data-ar="جميع الحقوق محفوظة © 2026 المستشفى الجامعي | تم التطوير داخلياً" data-en="All Rights Reserved © 2026 University Hospital | Developed Internally">جميع الحقوق محفوظة © 2026 المستشفى الجامعي | تم التطوير داخلياً</p>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ==========================================
// 4. تشغيل كل شيء عند تحميل الصفحة
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    injectFooter();
    applyLanguage();

    // إضافة مستمعي الأحداث لأزرار الثيم واللغة
    const themeBtn = document.querySelector('.btn-theme');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    const langBtn = document.querySelector('.btn-lang');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
});