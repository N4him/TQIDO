import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'Services', href: '#services' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'Testimonials', href: '#testimonials' }
        ],
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Blog', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#contact' }
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Documentation', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Community', href: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Disclaimer', href: '#' }
        ]
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4">
                            🎥 MoodFix
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Transform your emotional wellbeing with our scientifically-backed video sessions. 
                            Feel better, one video at a time.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a 
                                href="#" 
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Twitter"
                            >
                                <span className="text-lg">𝕏</span>
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Facebook"
                            >
                                <span className="text-lg">f</span>
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <span className="text-lg">in</span>
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Instagram"
                            >
                                <span className="text-lg">IG</span>
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="YouTube"
                            >
                                <span className="text-lg">▶</span>
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-800 pt-8 mb-8">
                    <div className="max-w-md">
                        <h3 className="text-white font-semibold mb-2">Stay updated</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for wellness tips and updates
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © {currentYear} MoodFix. All rights reserved.
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Cookies
                        </a>
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <select className="bg-transparent border-none text-gray-400 text-sm focus:ring-0 cursor-pointer">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
}
