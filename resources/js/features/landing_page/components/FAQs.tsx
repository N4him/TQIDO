import { useState, useRef, useEffect } from "react";
import "../../../css/landing_page/faqs.css";

const faqs = [
    {
        category: "Para familias",
        emoji: "👨‍👩‍👧",
        items: [
            {
                q: "¿Cómo funciona el proceso de búsqueda de cuidador?",
                a: "Es muy sencillo: crea tu perfil, describe lo que necesitas (tipo de cuidado, horarios, ubicación) y nuestra plataforma te mostrará cuidadores disponibles y verificados. Puedes revisar sus perfiles, leer reseñas de otras familias y contactarlos directamente."
            },
            {
                q: "¿Cómo se verifican los cuidadores?",
                a: "Todos nuestros cuidadores pasan por un proceso riguroso: verificación de identidad, consulta de antecedentes penales, comprobación de referencias laborales y entrevista personal. Solo el 30% de los candidatos supera el proceso."
            },
            {
                q: "¿Qué pasa si el cuidador no encaja con mi familia?",
                a: "Sin problema. Puedes cambiar de cuidador en cualquier momento sin coste adicional. Queremos que encontréis la persona perfecta, aunque lleve un par de intentos."
            },
            {
                q: "¿Cómo se gestionan los pagos?",
                a: "Todo se gestiona digitalmente y de forma segura a través de la plataforma. Puedes pagar por hora o acordar tarifas fijas. Los pagos se procesan automáticamente y recibirás un recibo detallado de cada servicio."
            },
        ]
    },
    {
        category: "Para cuidadores",
        emoji: "🧑‍⚕️",
        items: [
            {
                q: "¿Cómo me registro como cuidador en TQido?",
                a: "Crea tu perfil, sube tu documentación (DNI, titulaciones, referencias) y pasa nuestro proceso de verificación. Una vez aprobado, tu perfil será visible para miles de familias en tu zona."
            },
            {
                q: "¿Cuánto puedo ganar como cuidador?",
                a: "Tú fijas tus propias tarifas. Los cuidadores en nuestra plataforma ganan entre 12€ y 25€/hora dependiendo de la especialización, experiencia y tipo de servicio. TQido cobra una pequeña comisión por la gestión."
            },
            {
                q: "¿Tengo flexibilidad de horarios?",
                a: "Total. Tú decides cuándo estás disponible y aceptas solo los servicios que quieras. Puedes trabajar a tiempo parcial, completo, o solo fines de semana — como prefieras."
            },
        ]
    },
    {
        category: "General",
        emoji: "💬",
        items: [
            {
                q: "¿En qué ciudades está disponible TQido?",
                a: "Actualmente operamos en Madrid, Barcelona, Valencia, Sevilla, Bilbao y Málaga. Estamos expandiéndonos rápidamente — si tu ciudad no está en la lista, déjanos tu email y te avisamos cuando lleguemos."
            },
            {
                q: "¿Qué tipos de cuidado ofrece TQido?",
                a: "Cuidado infantil (niñeras, canguros, educadores), cuidado de personas mayores (auxiliares, gerocultores, enfermeras), y cuidado de mascotas (paseadores, cuidadores en casa, veterinarios). Todo en una sola plataforma."
            },
            {
                q: "¿Hay contrato o compromiso mínimo?",
                a: "No. Puedes contratar servicios puntuales por horas o establecer servicios regulares. Sin permanencias, sin letras pequeñas. Cancela cuando quieras con 24 horas de antelación."
            },
        ]
    }
];

function AccordionItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`faq-item ${open ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span className="faq-q-text">{q}</span>
                <span className="faq-icon">{open ? '−' : '+'}</span>
            </button>
            <div
                className="faq-answer"
                ref={bodyRef}
                style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 300}px` : '0px' }}
            >
                <p className="faq-answer-text">{a}</p>
            </div>
        </div>
    );
}

export default function FAQs() {
    const [activeCategory, setActiveCategory] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
                            setTimeout(() => el.classList.add("revealed"), i * 80);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const current = faqs[activeCategory];

    return (

            <section className="faq-section" ref={sectionRef} id="faqs">
                <div className="faq-inner">
                    <div className="faq-header reveal">
                        <div>
                            <div className="faq-eyebrow">Preguntas frecuentes</div>
                            <h2 className="faq-title">Resolvemos<br />tus <em>dudas</em></h2>
                        </div>
                        <div>
                            <p className="faq-header-desc">
                                Todo lo que necesitas saber antes de empezar. Si no encuentras tu respuesta, nuestro equipo está disponible las 24 horas.
                            </p>
                            <button className="faq-contact-link">Hablar con el equipo →</button>
                        </div>
                    </div>

                    <div className="faq-tabs reveal">
                        {faqs.map((cat, i) => (
                            <button
                                key={i}
                                className={`faq-tab ${activeCategory === i ? 'active' : ''}`}
                                onClick={() => setActiveCategory(i)}
                            >
                                <span>{cat.emoji}</span>{cat.category}
                            </button>
                        ))}
                    </div>

                    <div className="faq-list reveal">
                        {current.items.map((item, i) => (
                            <AccordionItem key={`${activeCategory}-${i}`} q={item.q} a={item.a} />
                        ))}
                    </div>

                    <div className="faq-bottom reveal">
                        <div className="faq-bottom-text">
                            <h3>¿Tienes más preguntas?</h3>
                            <p>Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
                        </div>
                        <button className="faq-bottom-btn">💬 Contactar soporte</button>
                    </div>
                </div>
            </section>
    );
}