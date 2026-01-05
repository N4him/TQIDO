import React, { useState } from 'react';

interface GalleryItem {
    id: number;
    image: string;
    title: string;
    courses: string;
}

export default function Hero() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const galleryItems: GalleryItem[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
            title: "Mascotas",
            courses: "50+",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
            title: "Niños",
            courses: "100+",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800",
            title: "Personas mayores",
            courses: "75+",
        },
    ];

    const totalCards = galleryItems.length;
    const centerIndex = Math.floor(totalCards / 2);

    const getCardStyle = (index: number) => {
        const offset = index - centerIndex;
        const isHovered = hoveredIndex === index;
        
        // Efecto abanico con más separación
        const angle = offset * 15;
        const translateX = offset * 140;
        
        // Z-index: la card del centro siempre tiene el más alto
        let zIndex = 10 + index;
        if (index === centerIndex) {
            zIndex = 15;
        }
        if (isHovered) {
            zIndex = 20;
        }
        
        if (isHovered) {
            return {
                transform: `translateX(${translateX}px) rotate(${angle}deg) scale(1.08)`,
                width: '350px',
                zIndex: zIndex,
            };
        }
        
        if (hoveredIndex !== null) {
            return {
                transform: `translateX(${translateX}px) rotate(${angle}deg) scale(0.96)`,
                width: '350px',
                zIndex: zIndex,
            };
        }
        
        return {
            transform: `translateX(${translateX}px) rotate(${angle}deg)`,
            width: '350px',
            zIndex: zIndex,
        };
    };

    return (
        <>
            <style >{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
            `}</style>
            
            <div className="min-h-screen flex items-center justify-center bg-background" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div className="max-w-7xl mx-auto w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-32 xl:gap-40 items-center">
                        
                        {/* Contenido del texto - Responsive - Movido más a la izquierda */}
                        <div className="text-left px-2 sm:px-0 lg:-ml-8 xl:-ml-15">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
                                Somos expertos <br />
                                <span className="text-white">
                                    en el cuidado de tus seres amados
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed">
                                Descubre todos los servicios que tenemos para cada uno
                                de tus seres queridos 
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-white rounded-full font-semibold hover:bg-[#21456b] transition-colors duration-300 hover:shadow-2xl inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                                    Ver vídeo
                                </button>
                                
                            </div>
                        </div>

                        {/* Galería con efecto FanOut - Desktop y Tablet Landscape */}
                        <div className="hidden lg:block relative flex items-center justify-center pl-8 lg:pl-12 xl:pl-16" style={{ height: '450px', perspective: '1200px' }}>
                            <div className="relative" style={{ width: '100%', height: '100%' }}>
                                {galleryItems.map((item, index) => {
                                    const isHovered = hoveredIndex === index;
                                    const cardStyle = getCardStyle(index);
                                    
                                    return (
                                        <div
                                            key={item.id}
                                            className="absolute top-1/2 left-1/2 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
                                            style={{
                                                height: '600px',
                                                marginLeft: '-150px',
                                                marginTop: '-350px',
                                                transformOrigin: 'center bottom',
                                                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                pointerEvents: 'none',
                                                willChange: 'transform',
                                                ...cardStyle,
                                            }}
                                        >
                                            <div 
                                                className="absolute inset-0 cursor-pointer"
                                                style={{ 
                                                    pointerEvents: 'auto',
                                                    padding: '20px',
                                                    margin: '-20px'
                                                }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            />
                                            
                                            <div 
                                                className="absolute inset-0"
                                                style={{
                                                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                    willChange: 'transform',
                                                }}
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div 
                                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                                style={{
                                                    opacity: isHovered ? 0.9 : 0.7,
                                                    transition: 'opacity 0.4s ease-out',
                                                }}
                                            />

                                            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                                                <div className="text-white text-center"
                                                    style={{
                                                        transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                                                        opacity: isHovered ? 1 : 0.95,
                                                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                    }}
                                                >
                                                    <h3 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">{item.title}</h3>
                                                    <p className="text-2xl lg:text-3xl font-bold text-white/90">{item.courses}</p>
                                                    <p className="text-xs lg:text-sm opacity-80 mt-1 lg:mt-2">servicios disponibles</p>
                                                    
                                                    <div
                                                        style={{
                                                            opacity: isHovered ? 1 : 0,
                                                            transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                                                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                        }}
                                                    >
                                                        {isHovered && (
                                                            <button className="mt-4 lg:mt-6 px-5 lg:px-6 py-2 lg:py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-sm lg:text-base">
                                                                Explorar →
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Vista móvil y tablets portrait - Grid responsive */}
                        <div className="lg:hidden grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-0">
                            {galleryItems.map((item, index) => {
                                const isClicked = clickedIndex === index;
                                
                                return (
                                    <div
                                        key={item.id}
                                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-72 md:h-80 cursor-pointer"
                                        onClick={() => setClickedIndex(isClicked ? null : index)}
                                    >
                                        <div 
                                            className="absolute inset-0"
                                            style={{
                                                transform: isClicked ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            }}
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div 
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                            style={{
                                                opacity: isClicked ? 0.9 : 0.7,
                                                transition: 'opacity 0.4s ease-out',
                                            }}
                                        />

                                        <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 md:p-6">
                                            <div 
                                                className="text-white text-center"
                                                style={{
                                                    transform: isClicked ? 'translateY(0)' : 'translateY(10px)',
                                                    opacity: isClicked ? 1 : 0.95,
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                }}
                                            >
                                                <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                                                <p className="text-xl sm:text-2xl font-bold text-white/90">{item.courses}</p>
                                                <p className="text-xs sm:text-sm opacity-80 mt-1">servicios disponibles</p>
                                                
                                                <div
                                                    style={{
                                                        opacity: isClicked ? 1 : 0,
                                                        transform: isClicked ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                                                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                    }}
                                                >
                                                    {isClicked && (
                                                        <button 
                                                            className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-sm sm:text-base"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            Explorar →
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}