import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function LandingLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition">
                            🎥 MoodFix
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition font-medium">
                                Features
                            </a>
                            <a href="#services" className="text-gray-600 hover:text-gray-900 transition font-medium">
                                Services
                            </a>
                            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition font-medium">
                                Testimonials
                            </a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition font-medium">
                                Pricing
                            </a>
                            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition font-medium">
                                Contact
                            </a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            {auth?.user ? (
                                // Usuario autenticado
                                <>
                                    <span className="hidden sm:inline text-sm text-gray-600">
                                        Hello, {auth.user.name}!
                                    </span>
                                    <Link
                                        href="/settings/profile"
                                        className="text-gray-600 hover:text-gray-900 font-medium transition"
                                    >
                                        Settings
                                    </Link>
                                </>
                            ) : (
                                // Usuario no autenticado
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-gray-900 font-medium transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg"
                                    >
                                        Try for free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Espaciador para navbar fijo */}
            <div className="h-16"></div>

            {/* Contenido principal */}
            <main>
                {children}
            </main>
        </div>
    );
}
