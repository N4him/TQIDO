export default function Features() {
    const features = [
        {
      icon: "🧑‍💻",
      title: "Siempre estamos para ti",
      description: "Cuentas con atención las 24 horas",
      background: "/assets/feat1.png",
    },
    {
      icon: "🤝",
      title: "Conectados somos mejores",
      description: "Lo primero es conocer a quién te qida",
      background: "/assets/feat2.png",
    },
    {
      icon: "🥼",
      title: "Qidado experto",
      description: "Cada cuidador es un especialista",
      background: "/assets/feat3.png",
    },
    {
      icon: "IMAGEN",   
      title: "Todo en un solo lugar",
      description: "¿Mascotas, niños o abuelitos? Todos están aquí",
      background: "/images/feature-bg-4.jpg",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground-900 mb-4">
            ¿Qué ofrecemos?
          </h2>
          <p className="text-xl text-foreground-600 max-w-2xl mx-auto">
            Descubre lo que hace de TQido la plataforma más top en el cuidado de quienes amas
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden bg-gray-100"
              style={
                feature.background
                  ? {
                      backgroundImage: `url(${feature.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : undefined
              }
            >
              {/* Overlay para legibilidad */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/70 group-hover:bg-white/50 transition-colors duration-300" />

              <div className="relative z-10">
                {/* Icono */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-lg"
          >
            ¡Únete a nosotros!
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}