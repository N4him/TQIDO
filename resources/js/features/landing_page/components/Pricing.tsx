import { Link } from '@inertiajs/react';

export default function Pricing() {
    const plans = [
        {
            id: 1,
            name: "Free",
            price: "0",
            period: "forever",
            description: "Perfect for trying out our platform",
            features: [
                "5 video sessions per month",
                "Basic mood tracking",
                "Mobile access",
                "Community support"
            ],
            notIncluded: [
                "Premium content",
                "Personalized recommendations",
                "Offline downloads",
                "Priority support"
            ],
            cta: "Get Started",
            popular: false,
            color: "border-gray-200"
        },
        {
            id: 2,
            name: "Pro",
            price: "9.99",
            period: "month",
            description: "For serious mood management",
            features: [
                "Unlimited video sessions",
                "Advanced mood tracking",
                "All device access",
                "Personalized recommendations",
                "Offline downloads",
                "Priority email support",
                "Ad-free experience",
                "Early access to new content"
            ],
            notIncluded: [],
            cta: "Start Free Trial",
            popular: true,
            color: "border-blue-500"
        },
        {
            id: 3,
            name: "Lifetime",
            price: "199",
            period: "one-time",
            description: "Invest in your wellbeing forever",
            features: [
                "Everything in Pro",
                "Lifetime access",
                "All future updates",
                "VIP support",
                "Exclusive content",
                "Beta features access",
                "Annual wellness report",
                "Private coaching sessions (4/year)"
            ],
            notIncluded: [],
            cta: "Get Lifetime Access",
            popular: false,
            color: "border-purple-500"
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        Pricing Plans
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Choose your plan
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Start free, upgrade when you're ready. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan) => (
                        <div 
                            key={plan.id}
                            className={`relative rounded-3xl border-2 ${plan.color} p-8 ${
                                plan.popular 
                                    ? 'bg-gradient-to-br from-blue-50 to-white shadow-2xl transform md:-translate-y-4 md:scale-105' 
                                    : 'bg-white shadow-lg hover:shadow-xl'
                            } transition-all duration-300`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {plan.name}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-6">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900">
                                        ${plan.price}
                                    </span>
                                    <span className="text-gray-600">
                                        /{plan.period}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/register"
                                className={`block w-full py-4 rounded-full font-semibold text-center transition-all mb-8 ${
                                    plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                            >
                                {plan.cta}
                            </Link>

                            {/* Features List */}
                            <div className="space-y-4">
                                <div className="text-sm font-semibold text-gray-900 mb-3">
                                    What's included:
                                </div>
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}

                                {/* Not Included */}
                                {plan.notIncluded.length > 0 && (
                                    <>
                                        <div className="text-sm font-semibold text-gray-900 mb-3 mt-6">
                                            Not included:
                                        </div>
                                        {plan.notIncluded.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-500">{feature}</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Note */}
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        Have questions about our pricing?
                    </p>
                    <a 
                        href="#contact"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        Contact our sales team
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="p-4">
                        <div className="text-3xl mb-2">💳</div>
                        <div className="text-sm text-gray-600 font-medium">Secure Payment</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl mb-2">🔒</div>
                        <div className="text-sm text-gray-600 font-medium">Privacy Protected</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="text-sm text-gray-600 font-medium">Cancel Anytime</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl mb-2">✅</div>
                        <div className="text-sm text-gray-600 font-medium">14-Day Trial</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
