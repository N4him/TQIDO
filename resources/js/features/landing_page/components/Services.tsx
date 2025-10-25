export default function Services() {
    const services = [
        {
            id: 1,
            emoji: "😌",
            title: "Relaxation Sessions",
            description: "Calm your mind and reduce stress with guided relaxation videos designed to help you unwind after a long day.",
            color: "from-blue-400 to-blue-600",
            features: ["15-30 min sessions", "Breathing exercises", "Soothing visuals"]
        },
        {
            id: 2,
            emoji: "⚡",
            title: "Energy Boost",
            description: "Feel revitalized and motivated with our energizing content that helps you power through your day with positivity.",
            color: "from-orange-400 to-orange-600",
            features: ["5-15 min sessions", "Uplifting music", "Motivational content"]
        },
        {
            id: 3,
            emoji: "🎯",
            title: "Focus & Clarity",
            description: "Improve concentration and mental clarity with sessions designed to help you stay present and productive.",
            color: "from-purple-400 to-purple-600",
            features: ["10-20 min sessions", "Focus techniques", "Mindfulness practices"]
        },
        {
            id: 4,
            emoji: "😴",
            title: "Sleep Better",
            description: "Wind down for restful sleep with calming bedtime routines and relaxation techniques for better rest.",
            color: "from-indigo-400 to-indigo-600",
            features: ["20-40 min sessions", "Sleep stories", "Calming sounds"]
        }
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
                        Our Services
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything you need to feel your best
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose from our curated collection of mood-regulating video sessions, 
                        each designed for specific emotional needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            {/* Emoji Badge */}
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <span className="text-4xl">{service.emoji}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features List */}
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all group-hover:shadow-lg">
                                Try This Service
                            </button>

                            {/* Decorative Corner */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full`}></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">
                        Not sure which service is right for you?
                    </p>
                    <a 
                        href="#contact"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        Get personalized recommendations
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}