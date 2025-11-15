import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function LandingLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '#features', label: 'Conoce más' },
        { href: '#services', label: 'Servicios' },
        { href: '#testimonials', label: 'Testimonios' },
        { href: '#pricing', label: 'Precios' },
        { href: '#contact', label: 'Contacto' },
    ];

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 font-roboto">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-background border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo */}
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

                        {/* Navigation Links - Desktop */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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

                        {/* Auth Buttons - Desktop & Tablet */}
                        <div className="hidden md:flex items-center gap-3 lg:gap-4">
                            {auth?.user ? (
                                <>
                                    <span className="hidden lg:inline text-sm text-white">
                                        Hola, {auth.user.name}!
                                    </span>
                                    <Link
                                        href="/settings/profile"
                                        className="text-white hover:text-gray-300 font-medium transition text-sm lg:text-base"
                                    >
                                        Configuración
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-white hover:text-gray-300 font-medium transition text-sm lg:text-base"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-4 lg:px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg text-sm lg:text-base whitespace-nowrap"
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
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
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
                                        className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium text-center"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={handleNavClick}
                                        className="block px-4 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all text-center mx-4"
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