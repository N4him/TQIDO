import { Link } from '@inertiajs/react';
import "../../../css/landing_page/footer.css";
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Características', href: '#features' },
            { name: 'Servicios', href: '#services' },
            { name: 'Precios', href: '#pricing' },
            { name: 'Testimonios', href: '#testimonials' }
        ],
        company: [
            { name: 'Nosotros', href: '#about' },
            { name: 'Blog', href: '#' },
            { name: 'Carreras', href: '#' },
            { name: 'Contacto', href: '#contact' }
        ],
        support: [
            { name: 'Centro de Ayuda', href: '#' },
            { name: 'Documentación', href: '#' },
            { name: 'Preguntas Frecuentes', href: '#' },
            { name: 'Comunidad', href: '#' }
        ],
        legal: [
            { name: 'Política de Privacidad', href: '#' },
            { name: 'Términos de Servicio', href: '#' },
            { name: 'Política de Cookies', href: '#' },
            { name: 'Aviso Legal', href: '#' }
        ]
    };

    const socialLinks = [
        { label: 'Twitter', icon: '𝕏', href: '#' },
        { label: 'Facebook', icon: 'f', href: '#' },
        { label: 'LinkedIn', icon: 'in', href: '#' },
        { label: 'Instagram', icon: '◈', href: '#' },
        { label: 'YouTube', icon: '▶', href: '#' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

                .footer-root {
                    font-family: 'Roboto', sans-serif;
                    background: #1d3557;
                    color: #ffffff;
                    position: relative;
                    overflow: hidden;
                }

                .footer-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%2371aedd' opacity='0.08'/%3E%3C/svg%3E");
                    pointer-events: none;
                }

                .footer-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 80px 32px 40px;
                    position: relative;
                    z-index: 1;
                }

                /* ── TOP: brand + newsletter ── */
                .footer-top {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 80px;
                    padding-bottom: 60px;
                    border-bottom: 1px solid rgba(113,174,221,0.15);
                    align-items: start;
                }

                .footer-brand-desc {
                    font-size: 14px;
                    line-height: 1.75;
                    color: rgba(113,174,221,0.85);
                    margin: 20px 0 28px;
                    max-width: 340px;
                    font-weight: 400;
                }

                /* Social icons */
                .footer-socials {
                    display: flex;
                    gap: 10px;
                }

                .social-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
                    font-family: 'Roboto', sans-serif;
                }
                .social-btn:hover {
                    background: rgba(113,174,221,0.2);
                    border-color: rgba(113,174,221,0.5);
                    color: #ffffff;
                    transform: translateY(-2px);
                }

                /* Newsletter */
                .footer-newsletter-label {
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(113,174,221,0.7);
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .footer-newsletter-label::before {
                    content: '';
                    width: 20px;
                    height: 1px;
                    background: rgba(113,174,221,0.5);
                }

                .footer-newsletter-title {
                    font-family: 'Roboto', sans-serif;
                    font-size: clamp(20px, 2.5vw, 26px);
                    font-weight: 700;
                    color: #ffffff;
                    line-height: 1.2;
                    margin-bottom: 8px;
                }

                .footer-newsletter-title em {
                    font-style: italic;
                    color: #71aedd;
                }

                .footer-newsletter-sub {
                    font-size: 13px;
                    color: rgba(113,174,221,0.75);
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .footer-form {
                    display: flex;
                    gap: 8px;
                }

                .footer-input {
                    flex: 1;
                    padding: 12px 18px;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #ffffff;
                    font-family: 'Roboto', sans-serif;
                    font-size: 13px;
                    outline: none;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }
                .footer-input::placeholder { color: rgba(255,255,255,0.35); }
                .footer-input:focus {
                    border-color: rgba(113,174,221,0.6);
                    background: rgba(255,255,255,0.1);
                }

                .footer-submit {
                    padding: 12px 24px;
                    border-radius: 100px;
                    border: none;
                    background: #71aedd;
                    color: #1d3557;
                    font-family: 'Roboto', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.25s ease, transform 0.2s ease;
                    letter-spacing: 0.02em;
                }
                .footer-submit:hover {
                    background: #ffffff;
                    transform: translateY(-1px);
                }

                /* ── LINKS GRID ── */
                .footer-links-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px;
                    padding: 48px 0;
                    border-bottom: 1px solid rgba(113,174,221,0.15);
                }

                .footer-col-title {
                    font-family: 'Roboto', sans-serif;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .footer-col-title::before {
                    content: '';
                    width: 14px;
                    height: 1px;
                    background: #71aedd;
                    opacity: 0.7;
                }

                .footer-col ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .footer-col a {
                    font-size: 13px;
                    font-weight: 400;
                    color: rgba(113,174,221,0.75);
                    text-decoration: none;
                    transition: color 0.2s ease, padding-left 0.2s ease;
                    display: inline-block;
                    font-family: 'Roboto', sans-serif;
                }
                .footer-col a:hover {
                    color: #ffffff;
                    padding-left: 4px;
                }

                /* ── BOTTOM BAR ── */
                .footer-bottom {
                    padding-top: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                }

                .footer-copyright {
                    font-size: 12px;
                    color: rgba(113,174,221,0.5);
                    font-family: 'Roboto', sans-serif;
                }

                .footer-bottom-links {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .footer-bottom-link {
                    font-size: 12px;
                    color: rgba(113,174,221,0.55);
                    text-decoration: none;
                    transition: color 0.2s ease;
                    font-family: 'Roboto', sans-serif;
                }
                .footer-bottom-link:hover { color: #ffffff; }

                .footer-lang {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .footer-lang select {
                    background: transparent;
                    border: none;
                    font-size: 12px;
                    color: rgba(113,174,221,0.55);
                    cursor: pointer;
                    font-family: 'Roboto', sans-serif;
                    outline: none;
                }
                .footer-lang select option { background: #1d3557; color: #ffffff; }

                /* ── BACK TO TOP ── */
                .back-to-top {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: #324f79;
                    border: 1px solid rgba(113,174,221,0.3);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(29,53,87,0.4);
                    transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
                    z-index: 40;
                }
                .back-to-top:hover {
                    background: #71aedd;
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(29,53,87,0.5);
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 900px) {
                    .footer-top {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                    .footer-brand-desc { max-width: 100%; }
                    .footer-links-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
                }

                @media (max-width: 600px) {
                    .footer-inner { padding: 60px 20px 32px; }
                    .footer-links-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .footer-form { flex-direction: column; }
                    .footer-submit { width: 100%; padding: 13px; }
                    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
                    .back-to-top { bottom: 20px; right: 20px; width: 44px; height: 44px; }
                }
            `}</style>

            <footer className="footer-root">
                <div className="footer-inner">

                    {/* ── TOP ── */}
                    <div className="footer-top">

                        {/* Brand */}
                        <div>
                            <Link href="/">
                                <img
                                    src="/assets/Logo - copia.png"
                                    alt="TQido"
                                    style={{ height: '52px', width: 'auto' }}
                                />
                            </Link>
                            <p className="footer-brand-desc">
                                Conectamos familias con cuidadores profesionales verificados. Cuidado de calidad con confianza y seguridad garantizada.
                            </p>
                            <div className="footer-socials">
                                {socialLinks.map((s) => (
                                    <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="footer-newsletter-title">
                                Mantente <em>informado</em>
                            </h3>
                            <p className="footer-newsletter-sub">
                                Suscríbete para recibir consejos de cuidado y novedades de TQido.
                            </p>
                            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="footer-input"
                                />
                                <button type="submit" className="footer-submit">
                                    Suscribirse
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── LINKS ── */}
                    <div className="footer-links-grid">
                        {Object.entries({
                            Producto: footerLinks.product,
                            Compañía: footerLinks.company,
                            Soporte: footerLinks.support,
                            Legal: footerLinks.legal,
                        }).map(([title, links]) => (
                            <div key={title} className="footer-col">
                                <div className="footer-col-title">{title}</div>
                                <ul>
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* ── BOTTOM ── */}
                    <div className="footer-bottom">
                        <p className="footer-copyright">
                            © {currentYear} TQido. Todos los derechos reservados.
                        </p>

                        <div className="footer-bottom-links">
                            {['Privacidad', 'Términos', 'Cookies'].map((label) => (
                                <a key={label} href="#" className="footer-bottom-link">{label}</a>
                            ))}
                        </div>

                        <div className="footer-lang">
                            <svg width="14" height="14" fill="none" stroke="rgba(113,174,221,0.55)" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <select>
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Back to top */}
            <button
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Volver arriba"
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </>
    );
}