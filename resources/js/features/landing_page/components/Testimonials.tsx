export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Marketing Manager",
            avatar: "👩‍💼",
            rating: 5,
            text: "This platform has completely transformed how I manage my stress. The sessions are short, effective, and fit perfectly into my busy schedule. I feel more balanced than ever!",
            color: "from-blue-400 to-blue-500"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Developer",
            avatar: "👨‍💻",
            rating: 5,
            text: "As someone who struggles with focus, the clarity sessions have been a game-changer. I'm more productive and feel less overwhelmed during work hours.",
            color: "from-purple-400 to-purple-500"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Teacher",
            avatar: "👩‍🏫",
            rating: 5,
            text: "The relaxation videos help me unwind after long days with students. I love how accessible and easy to use everything is. Highly recommend!",
            color: "from-pink-400 to-pink-500"
        },
        {
            id: 4,
            name: "David Park",
            role: "Entrepreneur",
            avatar: "👨‍💼",
            rating: 5,
            text: "I've tried many wellness apps, but this one stands out. The energy boost sessions give me exactly what I need to power through my day with positivity.",
            color: "from-orange-400 to-orange-500"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            role: "Nurse",
            avatar: "👩‍⚕️",
            rating: 5,
            text: "Working night shifts made sleep difficult until I found these sleep sessions. Now I fall asleep faster and wake up feeling refreshed. Life-changing!",
            color: "from-indigo-400 to-indigo-500"
        },
        {
            id: 6,
            name: "James Wilson",
            role: "Student",
            avatar: "👨‍🎓",
            rating: 5,
            text: "Perfect for managing exam stress! The sessions are quick, effective, and actually work. My grades have improved because I'm calmer and more focused.",
            color: "from-green-400 to-green-500"
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                        Testimonials
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What our users say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of happy users who have transformed their emotional wellbeing
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Stars Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <svg 
                                        key={index}
                                        className="w-5 h-5 text-yellow-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 mb-6 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                                    {testimonial.avatar}
                                </div>

                                {/* Name & Role */}
                                <div>
                                    <div className="font-bold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Proof Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-5xl font-bold text-blue-600 mb-2">4.9/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold text-pink-600 mb-2">1,200+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold text-orange-600 mb-2">98%</div>
                        <div className="text-gray-600">Would Recommend</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a 
                        href="#pricing"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-lg"
                    >
                        Join Our Community
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
