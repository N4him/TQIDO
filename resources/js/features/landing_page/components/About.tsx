export default function About() {
    return (
        <section id="about" className="py-20 bg-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div>
                        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            About Us
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Helping you feel better, one video at a time
                        </h2>
                        
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            We believe that everyone deserves access to tools that support their emotional wellbeing. 
                            Our mission is to make mood regulation simple, accessible, and effective for everyone.
                        </p>
                        
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Founded by mental health professionals and content creators, we combine scientific 
                            research with engaging video content to help you navigate your emotions with confidence.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-1">1k+</div>
                                <div className="text-sm text-gray-600">Happy Users</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-pink-600 mb-1">100+</div>
                                <div className="text-sm text-gray-600">Video Sessions</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-orange-600 mb-1">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>

                        <a 
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-lg"
                        >
                            Learn Our Story
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* Right: Visual Content */}
                    <div className="relative">
                        {/* Main Card */}
                        <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                            <div className="aspect-square bg-gradient-to-br from-blue-200 via-pink-200 to-orange-200 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">🎬</div>
                                    <p className="text-2xl font-bold text-gray-800">Quality Content</p>
                                    <p className="text-gray-600 mt-2">Made with care</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge 1 */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-2xl p-4 shadow-xl transform rotate-6 hover:rotate-12 transition-transform">
                            <div className="text-4xl">⭐</div>
                        </div>

                        {/* Floating Badge 2 */}
                        <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-2xl p-4 shadow-xl transform -rotate-6 hover:-rotate-12 transition-transform">
                            <div className="text-4xl">💚</div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
                        <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-pink-300 rounded-full opacity-50 blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}