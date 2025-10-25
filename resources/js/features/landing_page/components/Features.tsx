export default function Features() {
    const features = [
        {
            icon: "🎯",
            title: "Targeted Sessions",
            description: "Each video is designed to address specific emotional states and help you achieve your desired mood quickly and effectively."
        },
        {
            icon: "⚡",
            title: "Quick Results",
            description: "Experience noticeable mood improvements in just four sessions. Our method is proven to work fast."
        },
        {
            icon: "🧠",
            title: "Science-Based",
            description: "All our content is backed by psychological research and developed with mental health professionals."
        },
        {
            icon: "📱",
            title: "Access Anywhere",
            description: "Watch on any device, anytime. Your emotional wellness is always within reach."
        },
        {
            icon: "🎨",
            title: "Personalized Content",
            description: "Choose from a variety of themes and styles that resonate with your personal preferences."
        },
        {
            icon: "💪",
            title: "Build Resilience",
            description: "Develop long-term emotional regulation skills that will serve you throughout your life."
        }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why choose us?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover what makes our platform the best choice for your emotional wellbeing
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <a 
                        href="#pricing"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-lg"
                    >
                        Get Started Now
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
