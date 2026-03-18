import { useEffect, useRef } from "react";
import "../../../css/landing_page/about.css";

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".ab-reveal").forEach((el, i) =>
            setTimeout(() => el.classList.add("ab-in"), i * 110)
          );
      }),
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
   

      <section className="ab-root" ref={ref}>
        <div className="ab-inner">
          {/* Header */}
          <div className="ab-header">
            <div className="ab-reveal">
              <div className="ab-eyebrow">
                <span className="ab-eyebrow-line" />
                Quiénes somos
              </div>
              <h2 className="ab-h2">
                Cuidado que <em>importa,</em><br />para quienes más quieres
              </h2>
            </div>
            <p className="ab-lead ab-reveal">
              Conectamos familias con cuidadores profesionales y empáticos — para personas
              mayores, niños y mascotas — todo desde una plataforma digital ágil y segura.
            </p>
          </div>

          {/* Bento grid */}
          <div className="ab-grid">
            {/* Mission */}
            <div className="ab-card ab-mission ab-reveal">
              <div className="ab-mission-quote">Nuestra misión</div>
              <p className="ab-mission-text">
                Transformar el cuidado domiciliario en una experiencia de confianza,
                combinando la calidez humana con la eficiencia de la tecnología.
              </p>
              <p className="ab-mission-sub">
                Nacimos de una necesidad real: brindar tranquilidad a las familias.
                Nuestro objetivo es ser líderes en España para 2030.
              </p>
            </div>

            {/* Visual */}
            <div className="ab-card ab-visual ab-reveal">
              <div className="ab-icons-area">
                <div className="ab-icon-row">
                  <div className="ab-icon-bubble">👴</div>
                  <div className="ab-icon-bubble">👶</div>
                  <div className="ab-icon-bubble">🐾</div>
                </div>
                <div className="ab-icon-row">
                  <div className="ab-icon-bubble sm">❤️</div>
                  <div className="ab-icon-bubble sm">🏡</div>
                  <div className="ab-icon-bubble sm">🛡️</div>
                  <div className="ab-icon-bubble sm">✓</div>
                </div>
              </div>
              <div className="ab-visual-label">Toda la familia, un solo lugar</div>
              <div className="ab-visual-sub">Niños, mayores y mascotas — siempre protegidos</div>
            </div>

            {/* Stats */}
            <div className="ab-card ab-stat-1 ab-reveal">
              <div className="ab-stat-num">24<span>/7</span></div>
              <div className="ab-stat-label">Siempre disponibles, cualquier día del año</div>
            </div>

            <div className="ab-card ab-stat-2 ab-reveal">
              <div className="ab-stat-num">100<span>%</span></div>
              <div className="ab-stat-label">Digital, sin papeles ni trámites engorrosos</div>
            </div>

            {/* Story */}
            <div className="ab-card ab-story ab-reveal">
              <div className="ab-story-icon">📍</div>
              <div className="ab-story-title">Nacidos en Madrid, 2025</div>
              <p className="ab-story-text">
                Cuidadores validados con antecedentes verificados, referencias y formación certificada.{" "}
                <strong>Confianza respaldada por tecnología.</strong>
              </p>
            </div>

            {/* Vision bar */}
            <div className="ab-card ab-vision ab-reveal">
              <div className="ab-vision-left">
                <div className="ab-vision-tag">Visión 2030</div>
                <p className="ab-vision-text">
                  Ser la plataforma <em>líder en España</em> y referente internacional
                  en atención domiciliaria digitalizada.
                </p>
              </div>
              <div className="ab-vision-right">
                {[
                  { num: "500+", lbl: "Cuidadores" },
                  { num: "12K+", lbl: "Familias" },
                  { num: "4.9★", lbl: "Valoración" },
                ].map((s, i) => (
                  <div className="ab-vision-stat" key={i}>
                    <div className="ab-vision-num">{s.num}</div>
                    <div className="ab-vision-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}