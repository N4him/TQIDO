import { PropsWithChildren, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function LandingLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#about', label: 'Nosotros' },
        { href: '#features', label: 'Características' },
        { href: '#services', label: 'Servicios' },
        { href: '#testimonials', label: 'Testimonios' },
        { href: '#faqs', label: 'FAQ' },
        { href: '#pricing', label: 'Precios' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = 80;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1200;
            let startTime: number | null = null;
            const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                window.scrollTo(0, startPosition + distance * ease(progress));
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };
            requestAnimationFrame(animation);
        }
    };

    return (
        <div className="min-h-screen">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                * { box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                /* ─────────────────────────────────────────
                   NAVBAR SHELL
                ───────────────────────────────────────── */
                .navbar {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    transition: background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }

                .navbar.top {
                    background: transparent;
                    border-bottom: 1px solid transparent;
                    box-shadow: none;
                }

                .navbar.scrolled {
                    background: rgba(12, 28, 52, 0.82);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    box-shadow: 0 8px 40px rgba(0,0,0,0.28);
                }

                /* ─────────────────────────────────────────
                   INNER — 3 zonas con grid para centrado
                   perfecto independiente del contenido
                ───────────────────────────────────────── */
.navbar-inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 36px;
    height: 76px;
    min-height: 76px;  /* 👈 */
    max-height: 76px;  /* 👈 fuerza el height fijo */
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    overflow: hidden;  /* 👈 evita que el logo expanda el navbar */
}

                /* ── LOGO (zona izquierda) ── */
                .nav-logo {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    text-decoration: none;
                }
.nav-logo img {
    height: 60px;
    width: auto;
    transition: opacity 0.25s ease, transform 0.25s ease;
    display: block;  /* 👈 evita espacio extra de inline */
}
                .nav-logo:hover img {
                    opacity: 0.85;
                    transform: scale(1.03);
                }

                /* ── LINKS (zona central — siempre centrada) ── */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.10);
                    border-radius: 100px;
                    padding: 5px 6px;
                    backdrop-filter: blur(10px);
                    transition: background 0.3s ease, border-color 0.3s ease;
                }
                .navbar.top .nav-links {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.14);
                }
                .navbar.scrolled .nav-links {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.09);
                }

                .nav-link {
                    padding: 7px 15px;
                    border-radius: 100px;
                    font-size: 13.5px;
                    font-weight: 500;
                    letter-spacing: 0.015em;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: color 0.2s ease, background 0.2s ease;
                    white-space: nowrap;
                    cursor: pointer;
                    position: relative;
                }
                .nav-link:hover {
                    color: #ffffff;
                    background: rgba(255,255,255,0.12);
                }

                /* ── AUTH (zona derecha) ── */
                .nav-auth {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 10px;
                        padding-left: 8px; /* 👈 empuja los botones hacia el borde derecho */

                }

                .nav-user-greeting {
                    font-size: 13px;
                    color: rgba(255,255,255,0.5);
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }

                /* Botón ghost — "Iniciar sesión" */
                .nav-btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 20px;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.28);
                    background: rgba(255,255,255,0.07);
                    color: rgba(255,255,255,0.88);
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 13.5px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease;
                    white-space: nowrap;
                    cursor: pointer;
                    letter-spacing: 0.01em;
                }
                .nav-btn-ghost:hover {
                    background: rgba(255,255,255,0.15);
                    border-color: rgba(255,255,255,0.55);
                    color: #ffffff;
                }

                                    /* Botón solid — "Prueba gratis" */
.nav-btn-solid {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 22px;
    border-radius: 100px;
    border: none;
    background: #ffffff;
    color: #0c1c34;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    white-space: nowrap;
    cursor: pointer;
    letter-spacing: 0.02em;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}
.nav-btn-solid:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    background: #eef1f8;
}
    .nav-btn-solid:active {
    transform: translateY(0);
    box-shadow: none;
}
                
                                    /* Mobile menu */
                                    .mobile-menu-btn {
                                        display: none;
                                        background: none;
                                        border: none;
                                        color: rgba(255,255,255,0.7);
                                        font-size: 24px;
                                        cursor: pointer;
                                        transition: color 0.2s ease;
                                    }
                                    .mobile-menu-btn:hover {
                                        color: #ffffff;
                                    }
                
                                    @media (max-width: 768px) {
                                        .navbar-inner {
                                            grid-template-columns: 1fr auto;
                                            padding: 0 20px;
                                        }
                                        .mobile-menu-btn {
                                            display: block;
                                        }
                                        .nav-links {
                                            display: none;
                                            position: absolute;
                                            top: 76px;
                                            left: 0;
                                            right: 0;
                                            flex-direction: column;
                                            background: rgba(12, 28, 52, 0.95);
                                            border: none;
                                            border-radius: 0;
                                            padding: 20px;
                                            gap: 0;
                                        }
                                        .nav-links.open {
                                            display: flex;
                                        }
                                        .nav-link {
                                            padding: 12px 0;
                                            border-radius: 0;
                                        }
                                    }
                                `}</style>

            {/* Navbar */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : 'top'}`}>
                <div className="navbar-inner">
                    <Link href="/" className="nav-logo">
                        <img src="assets/Logo_navbar.svg" alt="TQIDO" />
                    </Link>

                    <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="nav-link"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="nav-auth">
                        {auth?.user ? (
                            <>
                                <span className="nav-user-greeting">
                                    Bienvenido, {auth.user.name}
                                </span>
                                <Link
                                    href="/dashboard"
                                    className="nav-btn-solid"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="nav-btn-ghost"
                                >
                                    Cerrar sesión
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="nav-btn-ghost"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/register"
                                    className="nav-btn-solid"
                                >
                                    Prueba gratis
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <main className="pt-[76px]">
                {children}
            </main>
        </div>
    );
}