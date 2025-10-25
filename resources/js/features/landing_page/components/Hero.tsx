import { Link } from '@inertiajs/react';

interface HeroProps {
    canRegister?: boolean;
}

export default function Hero({ canRegister = true }: HeroProps) {
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto w-full py-20">
                <div className="text-center mb-16">
                    {/* Badge con usuarios */}
                    <div className="flex justify-center items-center gap-2 mb-8 animate-fade-in">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-md"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white shadow-md"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white shadow-md"></div>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Over 1k happy users</span>
                    </div>

                    {/* Título Principal */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
                        Regulate your mood <br />
                        <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                            with our videos
                        </span>
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Our pre-recorded sessions contain all the essentials
                        to help you fix your mood in four sessions
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={canRegister ? "/register" : "#"}
                            className="group px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            Play Video
                            <svg 
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                        </Link>
                        
                        
                        <a
                            href="#features"
                            className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Cards Coloridas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20">
                    {/* Card Azul - Sol Feliz */}
                    <div className="group relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl p-8 h-72 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer">
                        <div className="absolute top-6 right-6">
                            <div className="text-3xl animate-pulse">⭐</div>
                        </div>
                          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
                 Pets
                    </p> 
                        <div className="absolute top-6 left-6">
                            <div className="text-2xl animate-bounce">✨</div>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <div className="w-28 h-28 bg-yellow-300 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <span className="text-6xl">🐶</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Rosa - Paz */}
                    <div className="group relative bg-gradient-to-br from-pink-300 to-pink-500 rounded-3xl p-8 h-72 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer">
                        <div className="absolute top-6 left-6">
                            <div className="text-3xl animate-pulse">✨</div>
                        </div>
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                            <div className="text-white text-7xl mb-3 group-hover:scale-110 transition-transform">
                                ✌️
                            </div>
                            <div className="flex gap-3 justify-center">
                                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                                    <span className="text-4xl">🌼</span>
                                </div>
                                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-transform">
                                    <span className="text-4xl">🌼</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Naranja - Flor Sonriente */}
                    <div className="group relative bg-gradient-to-br from-orange-300 to-orange-500 rounded-3xl p-8 h-72 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer">
                        <div className="absolute top-6 left-6">
                            <div className="w-18 h-18 bg-yellow-300 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-45 transition-transform">
                                <span className="text-4xl">🌻</span>
                            </div>
                        </div>
                        <div className="absolute top-6 right-6">
                            <div className="text-3xl animate-pulse">💫</div>
                        </div>
                        <div className="absolute bottom-6 right-6">
                            <div className="w-28 h-28 bg-cyan-400 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <span className="text-6xl">👴</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}