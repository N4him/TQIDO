export default function Testimonials() {
    const column1 = [
        {
            id: 1,
            name: "Leslie Alexander",
            username: "@lesliealexander",
            avatar: "👩‍💼",
            text: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus illo. Aut enim doloremque et ipsam.",
        },
        {
            id: 2,
            name: "Michael Foster",
            username: "@michaelfoster",
            avatar: "👨‍💻",
            text: "Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.",
        },
        {
            id: 3,
            name: "Dries Vincent",
            username: "@driesvincent",
            avatar: "🧑‍💼",
            text: "Consequatur ut atque. Itaque nostrum molestiae id veniam eos cumque. Ut quia eum fugit laborum autem inventore ut voluptate.",
        }
    ];

    const column2 = [
        {
            id: 4,
            name: "Brenna Goyette",
            username: "@brennagoyette",
            avatar: "👩‍🎨",
            text: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
        },
        {
            id: 5,
            name: "Lindsay Walton",
            username: "@lindsaywalton",
            avatar: "👩‍💻",
            text: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
            logo: "SavvyCal"
        },
        {
            id: 6,
            name: "Tom Cook",
            username: "@tomcook",
            avatar: "👨‍🍳",
            text: "Voluptas quos itaque ipsum in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
        },

    ];

    const column3 = [
        {
            id: 9,
            name: "Leonard Krasner",
            username: "@leonardkrasner",
            avatar: "🧑‍💼",
            text: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit tincidunt excepturi rerum voluptatem minus harum.",
        },
        {
            id: 10,
            name: "Floyd Miles",
            username: "@floydmiles",
            avatar: "👨‍🔧",
            text: "Architecto libero natus est. Est quam debitis officia enim atque et ut non. Sunt reiciendis quasi eaque. Itaque error ut et.",
        },
        {
            id: 11,
            name: "Emily Selman",
            username: "@emilyselman",
            avatar: "👩‍🏫",
            text: "Temporibus ea molestiae impedit adipisci perspiciatis illo aliquid. Quis ut ratione et voluptatem et. Nostrum explicabo iste unda beatae.",
        }
    ];

    const TestimonialCard = ({ testimonial }: { testimonial: {
        id: number;
        name: string;
        username: string;
        avatar: string;
        text: string;
        featured?: boolean;
        logo?: string;
        highlight?: boolean;
    }}) => (
        <div 
            className={`
                bg-white/5 backdrop-blur-sm rounded-2xl p-6 
                border transition-all duration-300
                ${testimonial.highlight 
                    ? 'border-blue-400/50 shadow-lg shadow-blue-400/20' 
                    : 'border-white/10 hover:border-white/20'
                }
            `}
        >
            <p className="text-white/80 mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg">
                        {testimonial.avatar}
                    </div>

                    <div>
                        <div className="font-semibold text-white text-sm">
                            {testimonial.name}
                        </div>
                        <div className="text-xs text-white/70">
                            {testimonial.username}
                        </div>
                    </div>
                </div>

                {testimonial.logo && (
                    <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                        <span className="text-xs font-semibold text-gray-900">{testimonial.logo}</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section id="testimonials" className="py-20 bg-foreground overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        We have worked with<br />thousands of amazing people
                    </h2>
                </div>

                {/* Testimonials Grid - Masonry Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        {column1.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        {column2.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-6">
                        {column3.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet - Single column */}
                <div className="lg:hidden space-y-6">
                    {[...column1, ...column2, ...column3].map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>

                {/* Social Proof Stats */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-5xl font-bold text-blue-400 mb-2">4.9/5</div>
                        <div className="text-white/70">Average Rating</div>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold text-purple-400 mb-2">1,200+</div>
                        <div className="text-white/70">Happy Customers</div>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold text-blue-400 mb-2">98%</div>
                        <div className="text-white/70">Would Recommend</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a 
                        href="#pricing"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all hover:shadow-lg hover:shadow-blue-400/50"
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