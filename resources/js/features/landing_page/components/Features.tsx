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
      description: "Lo primero es conocer a quién te cuida",
      background: "/assets/feat2.png",
    },
    {
      icon: "🥼",
      title: "Cuidado experto",
      description: "Cada cuidador es un especialista",
      background: "/assets/feat3.png",
    },
    {
      icon: "🏡",   
      title: "Todo en un solo lugar",
      description: "¿Mascotas, niños o abuelitos? Todos están aquí",
      background: "/images/feature-bg-4.jpg",
    },
  ];

  return (
    <section id="features" className="relative bg-background pt-20 pb-0">
      {/* Contenedor con border radius solo arriba - SIN shadow */}
      <div className="bg-foreground rounded-t-[6rem] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/90">Características</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ¿Qué ofrecemos?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Descubre lo que hace de TQido la plataforma más top en el cuidado de quienes amas
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${feature.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                
                {/* Gradiente overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500" />
                
                {/* Borde brillante en hover */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
                
                {/* Contenido */}
                <div className="relative h-80 p-6 flex flex-col justify-end">
                  {/* Icono */}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                    {feature.icon}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-white/80 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Indicador de hover */}
                  <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Explorar más</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            {[
              { value: "24/7", label: "Disponibilidad" },
              { value: "100%", label: "Verificados" },
              { value: "+5000", label: "Cuidadores" },
              { value: "4.9★", label: "Calificación" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-foreground rounded-full font-bold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/50 hover:scale-105"
            >
              ¡Únete a nosotros!
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <p className="mt-4 text-sm text-white/50">
              Sin tarjeta de crédito requerida • Cancela cuando quieras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}