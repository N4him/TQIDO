import { PropsWithChildren, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function LandingLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#features', label: 'Conoce más' },
        { href: '#services', label: 'Servicios' },
        { href: '#testimonials', label: 'Testimonios' },
        { href: '#pricing', label: 'Precios' },
        { href: '#contact', label: 'Contacto' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Detectar si el usuario ha hecho scroll más de 50px
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 font-roboto">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-background border-gray-200 z-50 transition-all duration-300">
                <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24">
                    <div className="relative flex items-center justify-center h-16 sm:h-20">

                        {/* Logo - Posición absoluta izquierda */}
                        <div className="absolute left-0 pl-20 lg:pl-40 xl:pl-48">
                            <Link
                                href="/"
                                className="flex-shrink-0 text-2xl font-bold text-gray-900 hover:text-gray-700 transition"
                            >
                                <img
                                    src="/assets/logo.png"
                                    alt="TQido Logo"
                                    className="h-30 sm:h-16 md:h-20 lg:h-30 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Navigation Links - Desktop - Centrado absoluto */}
                        <div className={`hidden lg:flex items-center gap-8 xl:gap-10 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-white hover:text-gray-300 transition font-medium text-sm xl:text-base"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Auth Buttons - Desktop & Tablet - Posición absoluta derecha */}
                        <div className="absolute right-0 hidden md:flex items-center gap-3 lg:gap-4 pr-8 lg:pr-16 xl:pr-24">
                            {auth?.user ? (
                                <>
                                    <span className={`hidden lg:inline text-sm text-white transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                        }`}>
                                        Hola, {auth.user.name}!
                                    </span>
                                    <Link
                                        href="/settings/profile"
                                        className={`text-white hover:text-gray-300 font-medium transition-all duration-300 text-sm lg:text-base ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                            }`}
                                    >
                                        Configuración
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={`
        inline-flex items-center gap-2 px-4 lg:px-5 py-2
        bg-white/25 backdrop-blur-sl border border-white/50
        text-white text-sm lg:text-base font-medium rounded-full
        hover:bg-[#21456b] transition-all duration-300
        ${isScrolled ? 'opacity-0 pointer-events-none' : ''}
    `.trim().replace(/\s+/g, ' ')}
                                    >
                                        Iniciar sesión
                                    </Link>
<Link
    href="/register"
    className="px-4 lg:px-6 py-2 bg-white text-background rounded-full font-medium hover:bg-[#21456b] hover:text-white transition-colors duration-300 hover:shadow-lg text-sm lg:text-base whitespace-nowrap"
>
    Prueba gratis
</Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 pt-2 pb-6 space-y-3 bg-background/95 backdrop-blur-sm border-t border-white/10">
                        {/* Navigation Links - Mobile */}
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={handleNavClick}
                                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Auth Buttons - Mobile */}
                        <div className="pt-4 space-y-3 border-t border-white/10">
                            {auth?.user ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-white/80">
                                        Hola, {auth.user.name}!
                                    </div>
                                    <Link
                                        href="/settings/profile"
                                        onClick={handleNavClick}
                                        className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium text-center"
                                    >
                                        Configuración
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={handleNavClick}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all mx-4"
                                    >
                                        <span className="text-lg">👤</span>
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={handleNavClick}
                                        className="block px-4 py-3 bg-foreground text-white rounded-full font-medium hover:bg-[#21456b] transition-colors duration-300 text-center mx-4"
                                    >
                                        Prueba gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Espaciador para navbar fijo */}
            <div className="h-16 sm:h-20"></div>

            {/* Contenido principal */}
            <main>
                {children}
            </main>
        </div>
    );
}