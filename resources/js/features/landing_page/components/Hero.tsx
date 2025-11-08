import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface HeroProps {
    canRegister?: boolean;
}

export default function Hero({ canRegister = true }: HeroProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const galleryItems = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
            title: "Pets",
            courses: "50+",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
            title: "Kids",
            courses: "100+",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800",
            title: "Seniors",
            courses: "75+",
        },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8  bg-background">
            <div className="max-w-[1400px] mx-auto w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-32 items-center xl:items-center">
                    {/* Contenido del texto */}
                    <div className="text-left order-1 lg:order-1 lg:col-span-5 lg:pr-8 xl:pr-16 xl:-ml-8">
                        {/* Título Principal */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            Somos expertos <br />
                            <span className="text-white">
                                en el cuidado de tus seres amados
                            </span>
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 lg:mb-10 max-w-2xl leading-relaxed">
                            Descubre todos los servicios que tenemos para cada uno
                            de tus seres queridos 
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 lg:mb-0">
                            <Link
                                href={canRegister ? "/register" : "#"}
                                className="group px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-2xl inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                Ver vídeo
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
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg w-full sm:w-auto text-center"
                            >
                                Ver más
                            </a>
                        </div>

                        {/* Vista Mobile/Tablet de Galería (debajo de los botones) */}
                        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4 w-full xl:hidden">
                            {galleryItems.map((item, index) => {
                                const isMobileExpanded = hoveredIndex === index;
                                
                                return (
                                    <motion.div
                                        key={item.id}
                                        className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg"
                                        onClick={() => setHoveredIndex(isMobileExpanded ? null : index)}
                                        animate={{
                                            height: isMobileExpanded ? "320px" : "240px",
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.32, 0.72, 0, 1],
                                        }}
                                    >
                                        {/* Imagen de fondo con efecto zoom */}
                                        <motion.div 
                                            className="absolute inset-0"
                                            animate={{
                                                scale: isMobileExpanded ? 1.1 : 1,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.32, 0.72, 0, 1],
                                            }}
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Overlay oscuro con cambio de opacidad */}
                                        <motion.div 
                                            className="absolute inset-0 bg-black"
                                            animate={{
                                                opacity: isMobileExpanded ? 0.5 : 0.7,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        />

                                        {/* Contenido */}
                                        <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                                            <div className="text-white text-center">
                                                <motion.div
                                                    animate={{
                                                        opacity: isMobileExpanded ? 1 : 0.9,
                                                        y: isMobileExpanded ? 0 : 10,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                                                    <p className="text-xl md:text-2xl font-bold">{item.courses}</p>
                                                    <p className="text-xs md:text-sm opacity-90">servicios</p>
                                                    
                                                    {/* Texto adicional solo cuando está expandida */}
                                                    <motion.p 
                                                        className="text-xs mt-2 opacity-80"
                                                        animate={{
                                                            opacity: isMobileExpanded ? 1 : 0,
                                                            height: isMobileExpanded ? "auto" : 0,
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        Tap para ver más
                                                    </motion.p>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Galería Expandible - Solo Desktop */}
                    <div className="hidden xl:flex justify-end order-2 lg:order-2 lg:col-span-7 xl:pl-24">
                        {/* Vista Desktop/Tablet (md+) */}
                        <div className="flex flex-row gap-3 lg:gap-4 h-[500px] sm:h-[550px] lg:h-[650px]">
                            {galleryItems.map((item, index) => {
                                const isHovered = hoveredIndex === index;
                                
                                // Calcular el ancho de cada rectángulo
                                const getWidth = () => {
                                    if (hoveredIndex === null) return "240px";
                                    if (isHovered) return "320px";
                                    
                                    // Si el hover está en el primero, los que están a la derecha se contraen
                                    if (hoveredIndex === 0 && index > hoveredIndex) {
                                        return "200px";
                                    }
                                    
                                    // Si el hover está en el último, los que están a la izquierda se contraen
                                    if (hoveredIndex === galleryItems.length - 1 && index < hoveredIndex) {
                                        return "200px";
                                    }
                                    
                                    // Si el hover está en el medio, todos los demás se contraen
                                    if (hoveredIndex !== 0 && hoveredIndex !== galleryItems.length - 1) {
                                        return "200px";
                                    }
                                    
                                    // Los que no se mueven mantienen su tamaño
                                    return "240px";
                                };

                                // Determinar el origen de transformación según la posición
                                const getTransformOrigin = () => {
                                    if (index === 0) return 'left center';
                                    if (index === galleryItems.length - 1) return 'right center';
                                    return 'center center';
                                };
                                
                                return (
                                    <motion.div
                                        key={item.id}
                                        className="relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{ transformOrigin: getTransformOrigin() }}
                                        animate={{
                                            width: getWidth(),
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.32, 0.72, 0, 1],
                                        }}
                                    >
                                        {/* Imagen de fondo con efecto zoom */}
                                        <motion.div 
                                            className="absolute inset-0"
                                            animate={{
                                                scale: isHovered ? 1.1 : 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.32, 0.72, 0, 1],
                                            }}
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Overlay oscuro con cambio de opacidad */}
                                        <motion.div 
                                            className="absolute inset-0 bg-black"
                                            animate={{
                                                opacity: isHovered ? 0.7 : 0.85,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        />

                                        {/* Contenido */}
                                        <div className="relative h-full flex flex-col justify-between p-4 lg:p-6">
                                            {/* Título y número de cursos */}
                                            <div className="text-white">
                                                {/* Título vertical (cuando está colapsada) */}
                                                <motion.h2
                                                    className="font-bold absolute bottom-6 left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl"
                                                    style={{ writingMode: "vertical-rl" }}
                                                    animate={{
                                                        opacity: isHovered ? 0 : 1,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {item.title}
                                                </motion.h2>

                                                {/* Título horizontal (cuando está expandida) */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: isHovered ? 1 : 0,
                                                    }}
                                                    transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
                                                >
                                                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">{item.title}</h2>
                                                    <p className="text-2xl lg:text-3xl font-bold">{item.courses}</p>
                                                    <p className="text-xs lg:text-sm opacity-90">servicios</p>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}