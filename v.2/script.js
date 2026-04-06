// ==========================================
// 1. برمجة الوضع المظلم (Dark Mode)
// ==========================================
function toggleDarkMode() {
    const body = document.body;
    // نبحث عن جميع أزرار الوضع المظلم في الصفحة (لتجنب أي خطأ)
    const btns = document.querySelectorAll('.btn-dark-mode');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        btns.forEach(btn => btn.innerText = '☀️');
    } else {
        localStorage.setItem('theme', 'light');
        btns.forEach(btn => btn.innerText = '🌙');
    }
}

function applyThemeOnLoad() {
    const savedTheme = localStorage.getItem('theme');
    const btns = document.querySelectorAll('.btn-dark-mode');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        btns.forEach(btn => btn.innerText = '☀️');
    } else {
        document.body.classList.remove('dark-mode');
        btns.forEach(btn => btn.innerText = '🌙');
    }
}

// ==========================================
// 2. إضافة الفوتر الحكومي تلقائياً
// ==========================================
const govFooterHTML = `
<footer class="gov-footer">
    <div class="footer-container">
        <div class="footer-col branding">
            <div class="footer-logos">
                <div class="hospital-logo" data-ar="🏥 المدينة الطبية" data-en="🏥 Medical City">🏥 المدينة الطبية</div>
                <div class="vision-logo" data-ar="🇸🇦 رؤية 2030" data-en="🇸🇦 Vision 2030">🇸🇦 رؤية 2030</div>
            </div>
            <p data-ar="منصة التوعية بالأمن السيبراني، نهدف لبناء بيئة رقمية آمنة وموثوقة تحمي بيانات المرضى وتضمن استمرارية الأعمال." data-en="Cybersecurity Awareness Portal, aiming to build a secure digital environment that protects patient data and ensures business continuity.">منصة التوعية بالأمن السيبراني، نهدف لبناء بيئة رقمية آمنة وموثوقة تحمي بيانات المرضى وتضمن استمرارية الأعمال.</p>
        </div>
        <div class="footer-col links">
            <h3 data-ar="روابط وطنية هامة" data-en="Important National Links">روابط وطنية هامة</h3>
            <ul>
                <li><a href="https://nca.gov.sa" target="_blank" data-ar="الهيئة الوطنية للأمن السيبراني" data-en="National Cybersecurity Authority">الهيئة الوطنية للأمن السيبراني</a></li>
                <li><a href="https://sdaia.gov.sa" target="_blank" data-ar="الهيئة السعودية للبيانات (سدايا)" data-en="SDAIA">الهيئة السعودية للبيانات (سدايا)</a></li>
                <li><a href="https://moh.gov.sa" target="_blank" data-ar="وزارة الصحة" data-en="Ministry of Health">وزارة الصحة</a></li>
            </ul>
        </div>
        <div class="footer-col links">
            <h3 data-ar="السياسات والدعم" data-en="Policies & Support">السياسات والدعم</h3>
            <ul>
                <li><a href="#" data-ar="سياسة الخصوصية (PDPL)" data-en="Privacy Policy (PDPL)">سياسة الخصوصية (PDPL)</a></li>
                <li><a href="faq.html" data-ar="الأسئلة الشائعة (FAQ)" data-en="Frequently Asked Questions (FAQ)">الأسئلة الشائعة (FAQ)</a></li>
                <li><a href="report.html" data-ar="رفع تذكرة أمنية (SOC)" data-en="Raise Security Ticket (SOC)">رفع تذكرة أمنية (SOC)</a></li>
            </ul>
        </div>
        <div class="footer-col contact">
            <h3 data-ar="تواصل مع فريق الأمن" data-en="Contact Security Team">تواصل مع فريق الأمن</h3>
            <p>📧 SOC@hospital.edu.sa</p>
            <p>📞 <span data-ar="تحويلة طوارئ:" data-en="Emergency Ext:">تحويلة طوارئ:</span> 9111</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p data-ar="جميع الحقوق محفوظة © 2026 المستشفى الجامعي | تم التطوير داخلياً" data-en="All Rights Reserved © 2026 University Hospital | Developed Internally">جميع الحقوق محفوظة © 2026 المستشفى الجامعي | تم التطوير داخلياً</p>
    </div>
</footer>
`;

// تشغيل الوظائف عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // 1. تفعيل الوضع المظلم إذا كان محفوظاً
    applyThemeOnLoad();
    // 2. إدراج الفوتر في أسفل الصفحة
    document.body.insertAdjacentHTML('beforeend', govFooterHTML);
});