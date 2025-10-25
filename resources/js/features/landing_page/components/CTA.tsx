import { Link } from '@inertiajs/react';

export default function CTA() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/30">
                        🎉 Limited Time Offer
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to transform <br />
                        your emotional wellbeing?
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join over 1,000 happy users who have already improved their mood 
                        and mental clarity with our proven video sessions
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link
                            href="/register"
                            className="group px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:shadow-2xl inline-flex items-center justify-center gap-3"
                        >
                            Start Your Free Trial
                            <svg 
                                className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        
                        
                        <a
                            href="#pricing"
                            className="px-10 py-5 bg-transparent text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm"
                        >
                            View Pricing
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>14-day free trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold text-white mb-2">1,200+</div>
                            <div className="text-white/80">Active Users</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold text-white mb-2">4.9/5</div>
                            <div className="text-white/80">User Rating</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-5xl font-bold text-white mb-2">50K+</div>
                            <div className="text-white/80">Sessions Completed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Emojis */}
            <div className="absolute top-10 left-1/4 text-6xl opacity-20 animate-bounce">⭐</div>
            <div className="absolute bottom-10 right-1/4 text-6xl opacity-20 animate-bounce delay-100">💫</div>
            <div className="absolute top-1/3 right-10 text-5xl opacity-20 animate-pulse">✨</div>
            <div className="absolute bottom-1/3 left-10 text-5xl opacity-20 animate-pulse delay-75">🎯</div>
        </section>
    );
}
