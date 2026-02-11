import { useState } from 'react';

export default function Pricing() {
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            side: 'left',
            badge: '👨‍👩‍👧‍👦 PARA CLIENTES',
            title: 'Encuentra el cuidado perfecto',
            subtitle: 'para tu familia',
            description: 'Conecta con cuidadores verificados y profesionales. Protege lo que más amas con confianza y tranquilidad.',
            cta: 'Ver planes',
            bgColor: 'from-blue-500 to-blue-600',
            plans: [
                { name: 'Básico', price: '$0' },
                { name: 'Premium', price: '$19.99' },
                { name: 'Familia Plus', price: '$39.99' }
            ]
        },
        {
            side: 'right',
            badge: '💼 PARA CUIDADORES',
            title: 'Crece tu carrera profesional',
            subtitle: 'y aumenta tus ingresos',
            description: 'Accede a más oportunidades, reduce tus comisiones y destaca como profesional elite en nuestra plataforma.',
            cta: 'Comenzar ahora',
            bgColor: 'from-orange-400 to-orange-500',
            plans: [
                { name: 'Starter', price: '$0' },
                { name: 'Profesional', price: '$29.99' },
                { name: 'Elite', price: '$59.99' }
            ]
        }
    ];

    const currentSlide = slides[activeSlide];

    return (
        <section  id="pricing"  className="relative h-screen w-full overflow-hidden">
            {/* Split Screen Container */}
            <div className="absolute inset-0 flex">
                {/* LEFT SIDE - CLIENTES */}
                <div 
                    className={`w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 relative transition-all duration-1000 ease-out ${
                        activeSlide === 0 ? 'flex-1' : 'w-1/2 opacity-50'
                    }`}
                    onClick={() => setActiveSlide(0)}
                >
                    <div className={`absolute inset-0 flex flex-col justify-center items-start px-12 lg:px-20 text-white transition-all duration-1000 ${
                        activeSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}>
                        {/* Badge */}
                        <div 
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/30 transition-all duration-700 delay-100 ${
                                activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                            👨‍👩‍👧‍👦 PARA CLIENTES
                        </div>

                        {/* Title */}
                        <h1 
                            className={`text-5xl lg:text-7xl font-black leading-tight mb-4 uppercase transition-all duration-700 delay-200 ${
                                activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Encuentra el<br />
                            cuidado<br />
                            perfecto
                        </h1>

                        {/* Description */}
                        <p 
                            className={`text-lg lg:text-xl text-white/90 max-w-md mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                                activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Conecta con cuidadores verificados y profesionales. Protege lo que más amas con confianza.
                        </p>

                        {/* CTA Button */}
                        <button 
                            className={`group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-700 delay-400 hover:shadow-2xl hover:scale-105 ${
                                activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Ver planes
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-10 left-12 lg:left-20 flex gap-3">
                            <div className={`w-12 h-1 rounded-full transition-all ${activeSlide === 0 ? 'bg-white' : 'bg-white/30'}`}></div>
                            <div className={`w-12 h-1 rounded-full transition-all ${activeSlide === 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                        </div>

                        {/* Price Tags Floating */}
                        <div className="absolute top-1/3 right-10 space-y-4 hidden lg:block">
                            {slides[0].plans.map((plan, idx) => (
                                <div 
                                    key={idx} 
                                    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-right transition-all duration-700 ${
                                        activeSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                    }`}
                                    style={{
                                        animation: activeSlide === 0 ? `float ${3 + idx}s ease-in-out infinite` : 'none',
                                        animationDelay: `${idx * 0.3}s`,
                                        transitionDelay: `${500 + idx * 100}ms`
                                    }}
                                >
                                    <div className="text-sm font-semibold text-white/70">{plan.name}</div>
                                    <div className="text-2xl font-bold">{plan.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overlay when not active */}
                    {activeSlide !== 0 && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer flex items-center justify-center transition-all duration-1000">
                            <div className="text-white text-6xl font-black opacity-50 transform transition-all duration-700 hover:scale-110">Cuidador</div>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE - FREELANCERS */}
                <div 
                    className={`w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 relative transition-all duration-1000 ease-out ${
                        activeSlide === 1 ? 'flex-1' : 'w-1/2 opacity-50'
                    }`}
                    onClick={() => setActiveSlide(1)}
                >
                    <div className={`absolute inset-0 flex flex-col justify-center items-start px-12 lg:px-20 text-white transition-all duration-1000 ${
                        activeSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}>
                        {/* Badge */}
                        <div 
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/30 transition-all duration-700 delay-100 ${
                                activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                            💼 PARA CUIDADORES
                        </div>

                        {/* Title */}
                        <h1 
                            className={`text-5xl lg:text-7xl font-black leading-tight mb-4 uppercase transition-all duration-700 delay-200 ${
                                activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Crece tu<br />
                            carrera<br />
                            profesional
                        </h1>

                        {/* Description */}
                        <p 
                            className={`text-lg lg:text-xl text-white/90 max-w-md mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                                activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Accede a más oportunidades, reduce comisiones y destaca como profesional elite en la plataforma.
                        </p>

                        {/* CTA Button */}
                        <button 
                            className={`group inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-700 delay-400 hover:shadow-2xl hover:scale-105 ${
                                activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Comenzar ahora
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-10 left-12 lg:left-20 flex gap-3">
                            <div className={`w-12 h-1 rounded-full transition-all ${activeSlide === 0 ? 'bg-white' : 'bg-white/30'}`}></div>
                            <div className={`w-12 h-1 rounded-full transition-all ${activeSlide === 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                        </div>

                        {/* Price Tags Floating */}
                        <div className="absolute top-1/3 right-10 space-y-4 hidden lg:block">
                            {slides[1].plans.map((plan, idx) => (
                                <div 
                                    key={idx} 
                                    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-right transition-all duration-700 ${
                                        activeSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                    }`}
                                    style={{
                                        animation: activeSlide === 1 ? `float ${3 + idx}s ease-in-out infinite` : 'none',
                                        animationDelay: `${idx * 0.3}s`,
                                        transitionDelay: `${500 + idx * 100}ms`
                                    }}
                                >
                                    <div className="text-sm font-semibold text-white/70">{plan.name}</div>
                                    <div className="text-2xl font-bold">{plan.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overlay when not active */}
                    {activeSlide !== 1 && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer flex items-center justify-center transition-all duration-1000">
                            <div className="text-white text-6xl font-black opacity-50 transform transition-all duration-700 hover:scale-110">Cliente</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={() => setActiveSlide(0)}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300 z-10"
            >
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={() => setActiveSlide(1)}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300 z-10"
            >
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Floating Animation */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </section>
    );
}