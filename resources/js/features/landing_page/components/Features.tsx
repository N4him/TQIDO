import { useState, useRef, useEffect } from "react";

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ft-root {
          font-family: 'DM Sans', sans-serif;
          background: #0e2d5a;
          position: relative;
          overflow: hidden;
          padding: 100px 0 90px;
        }

        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .ft-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 60px;
        }

        .ft-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a4c8ee;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ft-eyebrow::before {
          content: '';
          width: 28px; height: 1.5px;
          background: #a4c8ee;
        }

        .ft-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 1.0;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .ft-h2 em { font-style: italic; color: #a4c8ee; }

        .ft-head-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          max-width: 320px;
          line-height: 1.75;
          flex-shrink: 0;
          font-weight: 300;
          align-self: flex-end;
        }

        /* ── TABS ── */
        .ft-tabs-wrap {
          margin-bottom: 48px;
        }
        .ft-tabs {
          display: inline-flex;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 6px;
          position: relative;
          gap: 4px;
        }
        .ft-tab-indicator {
          position: absolute;
          background: #2e6fba;
          border-radius: 11px;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          z-index: 0;
          pointer-events: none;
        }
        .ft-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          z-index: 1;
          transition: color 0.25s;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }
        .ft-tab.active { color: #ffffff; font-weight: 600; }
        .ft-tab:hover:not(.active) { color: rgba(255,255,255,0.8); }

        /* ── CONTENT AREA ── */
        .ft-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .ft-feat-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px 8px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 24px;
        }
        .ft-feat-icon-wrap {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(46,111,186,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .ft-feat-name {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
        .ft-feat-tagline {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-top: 1px;
        }

        .ft-benefit-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ft-benefit {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          transition: background 0.2s, border-color 0.2s, transform 0.3s cubic-bezier(.22,.68,0,1.2);
        }
        .ft-benefit:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(46,111,186,0.35);
          transform: translateX(4px);
        }
        .ft-check {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(46,111,186,0.2);
          border: 1px solid rgba(46,111,186,0.4);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ft-benefit-text {
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          line-height: 1.5;
          font-weight: 300;
        }

        /* Right: mockup card */
        .ft-right { position: relative; }

        .ft-mockup-outer {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #1a4a8a;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 380px;
        }

        .ft-mockup-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ft-mockup-logo {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: #2e6fba;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          font-weight: 900;
          color: #ffffff;
          font-family: 'DM Serif Display', serif;
          flex-shrink: 0;
        }
        .ft-mockup-title { font-size: 15px; font-weight: 600; color: #fff; }
        .ft-mockup-sub { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 1px; }
        .ft-mockup-dots {
          margin-left: auto;
          display: flex; gap: 4px;
        }
        .ft-mockup-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        .ft-mockup-hero-area {
          flex: 1;
          border-radius: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          gap: 12px;
        }
        .ft-mockup-icon-big {
          font-size: 56px;
          line-height: 1;
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .ft-mockup-outer:hover .ft-mockup-icon-big {
          transform: scale(1.1) rotate(-5deg);
        }
        .ft-mockup-feat-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #ffffff;
          text-align: center;
        }
        .ft-mockup-feat-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-align: center;
          font-weight: 300;
        }

        .ft-mockup-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 4px;
        }
        .ft-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
        }
        .ft-chip-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #a4c8ee;
        }

        .ft-mockup-cta {
          width: 100%;
          padding: 13px;
          background: #2e6fba;
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.2s;
        }
        .ft-mockup-cta:hover { transform: translateY(-2px); }

        /* Mobile */
        .ft-mobile-list {
          display: none;
          flex-direction: column;
          gap: 16px;
        }
        .ft-mobile-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 24px;
        }
        .ft-mobile-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ft-mobile-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(46,111,186,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        /* Reveal */
        .ft-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.6s cubic-bezier(.22,.68,0,1), transform 0.6s cubic-bezier(.22,.68,0,1);
        }
        .ft-in { opacity: 1; transform: none; }

        @media (max-width: 900px) {
          .ft-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ft-head-sub { max-width: 100%; }
          .ft-tabs { flex-wrap: wrap; }
          .ft-content { display: none; }
          .ft-mobile-list { display: flex; }
        }
        @media (max-width: 600px) {
          .ft-inner { padding: 0 20px; }
          .ft-root { padding: 60px 0 50px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ft-reveal { transition: none; opacity: 1; transform: none; }
          .ft-tab-indicator, .ft-benefit, .ft-mockup-icon-big { transition: none; }
        }
      `}</style>

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
    </>
  );
}