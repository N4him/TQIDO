import { useState, useRef, useEffect } from "react";

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
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

                .faq-section {
                    font-family: 'Roboto', sans-serif;
                    /* #112a52 — azul oscuro-medio: baja suavemente desde Testimonios,
                       prepara al usuario para el cierre sin salto brusco */
                    background: #112a52;
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0 120px;
                }

                /* dot texture — sutil sobre oscuro */
                .faq-section::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%231e5faa' opacity='0.2'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 0;
                }



                .faq-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 32px;
                    position: relative;
                    z-index: 3;
                }

                /* === HEADER === */
                .faq-header {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: end;
                    margin-bottom: 56px;
                }

                .faq-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.45);
                    margin-bottom: 16px;
                }
                .faq-eyebrow::before {
                    content: '';
                    width: 28px; height: 2px;
                    background: rgba(255,255,255,0.3);
                    display: block;
                }

                .faq-title {
                    font-family: 'Roboto', sans-serif;
                    font-weight: 700;
                    font-size: clamp(38px, 5vw, 64px);
                    line-height: 1.05;
                    color: #ffffff;
                    margin: 0;
                }
                .faq-title em {
                    font-style: italic;
                    color: #5b9bd5;
                }

                .faq-header-desc {
                    font-size: 16px;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.55);
                    margin: 0 0 28px;
                }

                .faq-contact-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.75);
                    text-decoration: none;
                    border-bottom: 1.5px solid rgba(255,255,255,0.3);
                    padding-bottom: 2px;
                    cursor: pointer;
                    transition: color 0.2s, gap 0.2s, border-color 0.2s;
                    background: none;
                    border-left: none; border-right: none; border-top: none;
                    font-family: 'Roboto', sans-serif;
                }
                .faq-contact-link:hover {
                    color: #ffffff;
                    border-color: rgba(255,255,255,0.7);
                    gap: 12px;
                }

                /* === TABS === */
                .faq-tabs {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 32px;
                    flex-wrap: wrap;
                }

                .faq-tab {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 22px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    border: 1.5px solid rgba(255,255,255,0.15);
                    background: transparent;
                    color: rgba(255,255,255,0.5);
                    font-family: 'Roboto', sans-serif;
                    transition: all 0.25s ease;
                    letter-spacing: 0.02em;
                }
                .faq-tab:hover {
                    border-color: rgba(255,255,255,0.4);
                    color: rgba(255,255,255,0.85);
                }
                .faq-tab.active {
                    background: rgba(255,255,255,0.12);
                    border-color: rgba(255,255,255,0.35);
                    color: #ffffff;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                }

                /* === ACCORDION === */
                .faq-list {
                    display: flex;
                    flex-direction: column;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .faq-item {
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    transition: background 0.2s;
                }
                .faq-item.open {
                    background: rgba(255,255,255,0.05);
                }

                .faq-question {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    padding: 24px 0;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    font-family: 'Roboto', sans-serif;
                }

                .faq-q-text {
                    font-size: 17px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.85);
                    line-height: 1.4;
                    transition: color 0.2s;
                }
                .faq-item.open .faq-q-text { color: #ffffff; }
                .faq-question:hover .faq-q-text { color: #ffffff; }

                .faq-icon {
                    flex-shrink: 0;
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255,255,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 20px; font-weight: 300;
                    color: rgba(255,255,255,0.6);
                    transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.3s;
                    line-height: 1;
                }
                .faq-item.open .faq-icon {
                    background: rgba(255,255,255,0.15);
                    border-color: rgba(255,255,255,0.4);
                    color: #ffffff;
                    transform: rotate(180deg);
                }

                .faq-answer {
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(.22,.68,0,1);
                }
                .faq-answer-text {
                    font-size: 15px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.6);
                    padding: 0 52px 24px 0;
                    margin: 0;
                }

                /* === BOTTOM STRIP === */
                .faq-bottom {
                    margin-top: 56px;
                    padding: 36px 44px;
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    backdrop-filter: blur(10px);
                    position: relative;
                    overflow: hidden;
                }
                .faq-bottom::before {
                    content: '';
                    position: absolute;
                    top: -40px; right: -40px;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(30,95,170,0.25), transparent 70%);
                    pointer-events: none;
                }

                .faq-bottom-text h3 {
                    font-family: 'Roboto', sans-serif;
                    font-size: clamp(18px, 2.5vw, 26px);
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 6px;
                }
                .faq-bottom-text p {
                    font-size: 14px;
                    color: rgba(255,255,255,0.5);
                    margin: 0; line-height: 1.6;
                }

                .faq-bottom-btn {
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    background: rgba(255,255,255,0.12);
                    border: 1.5px solid rgba(255,255,255,0.25);
                    color: #ffffff;
                    font-family: 'Roboto', sans-serif;
                    font-size: 14px; font-weight: 700;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: transform 0.25s cubic-bezier(.22,.68,0,1.2), background 0.2s, border-color 0.2s;
                    white-space: nowrap;
                }
                .faq-bottom-btn:hover {
                    transform: translateY(-2px);
                    background: rgba(255,255,255,0.2);
                    border-color: rgba(255,255,255,0.5);
                }

                /* === ANIMATIONS === */
                .reveal {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.55s cubic-bezier(.22,.68,0,1), transform 0.55s cubic-bezier(.22,.68,0,1);
                }
                .revealed { opacity: 1; transform: none; }

                @media (prefers-reduced-motion: reduce) {
                    .reveal { transition: none; opacity: 1; transform: none; }
                    .faq-answer, .faq-icon, .faq-tab, .faq-item { transition: none; }
                }

                @media (max-width: 900px) {
                    .faq-header { grid-template-columns: 1fr; gap: 28px; }
                    .faq-bottom { flex-direction: column; align-items: flex-start; }
                }
                @media (max-width: 600px) {
                    .faq-section { padding: 72px 0; }
                    .faq-answer-text { padding-right: 0; }
                    .faq-bottom { padding: 24px 20px; }
                    .faq-bottom-btn { width: 100%; justify-content: center; }
                }
            `}</style>

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
        </>
    );
}