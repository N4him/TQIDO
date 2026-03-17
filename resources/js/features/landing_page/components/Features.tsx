import { useState, useRef, useEffect } from "react";
import "../../../../../resources/css/landing_page/features.css";

const features = [
  {
    id: "disponible",
    icon: "🕐",
    title: "Disponibles 24/7",
    tagline: "Cuidado cuando lo necesitas",
    color: "#1a4a8a",
    benefits: [
      "Servicio las 24h, los 365 días del año",
      "Turnos de mañana, tarde o noche",
      "Flexibilidad: horas, media jornada o completa",
      "Modalidad interna para acompañamiento permanente",
    ],
  },
  {
    id: "validados",
    icon: "✅",
    title: "Cuidadores validados",
    tagline: "Profesionales que inspiran confianza",
    color: "#1a4a8a",
    benefits: [
      "Proceso riguroso: antecedentes + referencias",
      "Experiencia y formación certificada verificada",
      "Perfiles con presentación en vídeo",
      "Reseñas reales de familias verificadas",
    ],
  },
  {
    id: "digital",
    icon: "📱",
    title: "100% Digital",
    tagline: "Todo desde tu móvil",
    color: "#1a4a8a",
    benefits: [
      "Búsqueda y selección desde la plataforma",
      "Contratación digital sin papeleos",
      "Pagos automáticos seguros en línea",
      "Seguimiento en tiempo real del servicio",
    ],
  },
  {
    id: "todo",
    icon: "🏡",
    title: "Todo en un lugar",
    tagline: "Mascotas, niños y mayores",
    color: "#1a4a8a",
    benefits: [
      "Cuidado profesional de mascotas en tu hogar",
      "Niñeras certificadas para tus hijos",
      "Atención especializada para personas mayores",
      "Servicios personalizados a tu medida",
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const [barStyle, setBarStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setBarStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
        top: el.offsetTop,
      });
    }
  }, [active]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".ft-reveal").forEach((el, i) =>
            setTimeout(() => el.classList.add("ft-in"), i * 90)
          );
      }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const feat = features[active];

  return (
    

      <section className="ft-root" id="features" ref={ref}>
        <div className="ft-inner">
          {/* Header */}
          <div className="ft-head">
            <div className="ft-reveal">
              <div className="ft-eyebrow">Características</div>
              <h2 className="ft-h2">
                Cuidado <em>profesional</em><br />con tecnología humana
              </h2>
            </div>
            <p className="ft-head-sub ft-reveal">
              Conectamos familias con expertos para cuidar de niños, mascotas y personas mayores.
            </p>
          </div>

          {/* Tabs */}
          <div className="ft-tabs-wrap ft-reveal">
            <div className="ft-tabs">
              <div className="ft-tab-indicator" style={barStyle} />
              {features.map((f, i) => (
                <button
                  key={f.id}
                  ref={el => { tabRefs.current[i] = el; }}
                  className={`ft-tab ${active === i ? "active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {f.icon} {f.title}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop content */}
          <div className="ft-content">
            <div className="ft-left ft-reveal">
              <div className="ft-feat-badge">
                <div className="ft-feat-icon-wrap">{feat.icon}</div>
                <div>
                  <div className="ft-feat-name">{feat.title}</div>
                  <div className="ft-feat-tagline">{feat.tagline}</div>
                </div>
              </div>
              <ul className="ft-benefit-list">
                {feat.benefits.map((b, i) => (
                  <li className="ft-benefit" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="ft-check">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#a4c8ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="ft-benefit-text">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-right ft-reveal">
              <div className="ft-mockup-outer">
                <div className="ft-mockup-header">
                  <div className="ft-mockup-logo">TQ</div>
                  <div>
                    <div className="ft-mockup-title">TQido</div>
                    <div className="ft-mockup-sub">{feat.title}</div>
                  </div>
                  <div className="ft-mockup-dots">
                    <div className="ft-mockup-dot" />
                    <div className="ft-mockup-dot" />
                    <div className="ft-mockup-dot" />
                  </div>
                </div>

                <div className="ft-mockup-hero-area">
                  <div className="ft-mockup-icon-big">{feat.icon}</div>
                  <div className="ft-mockup-feat-title">{feat.title}</div>
                  <div className="ft-mockup-feat-sub">{feat.tagline}</div>
                  <div className="ft-mockup-chips">
                    {feat.benefits.slice(0, 2).map((b, i) => (
                      <div className="ft-chip" key={i}>
                        <div className="ft-chip-dot" />
                        {b.split(":")[0]}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="ft-mockup-cta">Ver detalles completos →</button>
              </div>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="ft-mobile-list">
            {features.map((f) => (
              <div className="ft-mobile-item ft-reveal" key={f.id}>
                <div className="ft-mobile-head">
                  <div className="ft-mobile-icon">{f.icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{f.tagline}</div>
                  </div>
                </div>
                <ul className="ft-benefit-list">
                  {f.benefits.map((b, bi) => (
                    <li className="ft-benefit" key={bi}>
                      <div className="ft-check">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#a4c8ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="ft-benefit-text">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}