import React from 'react';

export default function Features() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeButton;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`,
        top: `${offsetTop}px`,
      });
    }
  }, [activeTab]);

  const features = [
    {
      icon: "🧑‍💻",
      title: "Siempre estamos para ti",
      description: "Cuentas con atención las 24 horas",
      background: "/assets/feat1.png",
      benefits: [
        "Soporte disponible 24/7 los 365 días del año",
        "Respuesta inmediata a emergencias",
        "Chat en tiempo real con nuestro equipo",
        "Equipo de expertos siempre disponible"
      ],
      preview: "/assets/feat1.png"
    },
    {
      icon: "🤝",
      title: "Conectados somos mejores",
      description: "Lo primero es conocer a quién te cuida",
      background: "/assets/feat2.png",
      benefits: [
        "Perfiles verificados de todos los cuidadores",
        "Reseñas y calificaciones de usuarios reales",
        "Video presentaciones personales",
        "Comunicación directa antes de contratar"
      ],
      preview: "/assets/feat2.png"
    },
    {
      icon: "🥼",
      title: "Cuidado experto",
      description: "Cada cuidador es un especialista",
      background: "/assets/feat3.png",
      benefits: [
        "Cuidadores certificados y capacitados",
        "Especialización por área de cuidado",
        "Capacitación continua y actualizada",
        "Experiencia comprobada en el campo"
      ],
      preview: "/assets/feat3.png"
    },
    {
      icon: "🏡",   
      title: "Todo en un solo lugar",
      description: "¿Mascotas, niños o abuelitos? Todos están aquí",
      background: "/images/feature-bg-4.jpg",
      benefits: [
        "Cuidado profesional de mascotas",
        "Niñeras certificadas y de confianza",
        "Cuidado especializado de adultos mayores",
        "Servicios personalizados a tus necesidades"
      ],
      preview: "/images/feature-bg-4.jpg"
    },
  ];

  return (
    <section id="features" className="relative bg-background pt-20 pb-0 -mt-1">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tab-indicator {
          position: absolute;
          background: white;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
      `}</style>
      
      {/* Contenedor con border radius solo arriba */}
      <div className="bg-foreground rounded-t-[6rem] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Personaliza la experiencia completa
            </h2>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
              Desde reservas hasta atención, nuestros servicios están diseñados para ti
            </p>
          </div>

          {/* Tabs - Solo visible en tablet y desktop */}
          <div className="mb-12 px-4 hidden md:block">
            <div className="flex justify-center">
              <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1.5 relative">
                {/* Indicador animado */}
                <div className="tab-indicator" style={indicatorStyle} />
                
                {features.map((feature, index) => (
                  <button
                    key={index}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 rounded-full font-medium text-base transition-colors duration-300 relative z-10 whitespace-nowrap ${
                      activeTab === index
                        ? 'text-foreground'
                        : 'text-white hover:text-white'
                    }`}
                  >
                    {feature.icon} {feature.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area - Con tabs (Tablet y Desktop) */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 items-center">
            {/* Left Side - Benefits List */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-2xl sm:text-3xl">{features[activeTab].icon}</span>
                <span className="text-lg sm:text-xl font-bold text-white">{features[activeTab].title}</span>
              </div>
              
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                {features[activeTab].description}
              </p>

              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                {features[activeTab].benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 sm:gap-4 group"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-400 flex items-center justify-center mt-0.5 sm:mt-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side - Preview */}
            <div className="relative order-1 md:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-4 sm:border-8 border-white/10">
                <div 
                  className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-4"
                  style={{
                    backgroundImage: `url(${features[activeTab].preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Overlay mockup de teléfono */}
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 w-full max-w-xs sm:w-80">
                    {/* Header del mockup */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          T
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-xs sm:text-sm">TQido</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">{features[activeTab].title}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      </div>
                    </div>

                    {/* Contenido del mockup */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                        <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{features[activeTab].icon}</div>
                        <div className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">
                          {features[activeTab].title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">
                          {features[activeTab].description}
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        {features[activeTab].benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 sm:gap-2 bg-gray-50 rounded-lg p-1.5 sm:p-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] sm:text-xs text-gray-700 line-clamp-2">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-blue-500 text-white rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors">
                        Ver más detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elemento decorativo */}
              <div className="absolute -z-10 -top-4 -right-4 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Mobile Layout - Sin tabs, todo en columna */}
          <div className="md:hidden space-y-12 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="px-4">
                {/* Card de feature */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Preview Image */}
                  <div 
                    className="aspect-video rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden"
                    style={{
                      backgroundImage: `url(${feature.preview})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
            {/* Left Side - Benefits List */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
          </div>

          {/* Bottom CTA */}

        </div>
      </div>
    </section>
  );
}