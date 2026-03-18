import { useState, useEffect, useRef } from "react";
import "../../../css/landing_page/cta.css";
export default function SplitCTA() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [tapped, setTapped] = useState<"left" | "right" | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleTap = (side: "left" | "right") => {
    if (isMobile()) setTapped((p) => (p === side ? null : side));
  };

  const isActive = (side: "left" | "right") =>
    hovered === side || tapped === side;
  const isDimmed = (side: "left" | "right") =>
    (hovered !== null && hovered !== side) ||
    (tapped !== null && tapped !== side);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    
      <section className="scta-root" ref={sectionRef} id="cta-final">

        {/* ── Shared header ── */}
        <div className="scta-header">
          <div className="scta-bubbles reveal">

          </div>

          <h2 className="scta-title reveal">
            Tu familia merece<br />el mejor <em>cuidado</em>
          </h2>

          <p className="scta-subtitle reveal">
            Únete a más de 12.000 familias que ya confían en TQido. Empieza hoy, sin compromiso.
          </p>
        </div>

        {/* vertical connector line */}
        <div className="scta-divider-h reveal" />

        {/* ── Split interactive ── */}
        <div
          className="scta-split"
          onMouseLeave={() => setHovered(null)}
        >

          {/* LEFT — Busco cuidador */}
          <div
            className={`scta-side ${isActive("left") ? "active" : ""} ${isDimmed("left") ? "dimmed" : ""}`}
            onMouseEnter={() => setHovered("left")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleTap("left")}
          >
            <div
              className="scta-bg"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80')" }}
            />
            <div
              className="scta-overlay"
              style={{
                background: "#0d2545",
                opacity: isActive("left") ? 0.82 : isDimmed("left") ? 0.7 : 0.88,
              }}
            />
            <div className="scta-grain" />
            <div className="scta-dots" />

            <div className="scta-content">
              <div className="scta-icon-wrap">
                <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>

              <h3 className="scta-side-title">
                Busco<br />
                <em style={{ fontStyle: "italic", color: "#5b9bd5" }}>Cuidador</em>
              </h3>

              <p className="scta-side-sub">
                Encuentra profesionales verificados para tus seres queridos. Seguro, rápido y 100% digital.
              </p>

              <button className="scta-btn scta-btn-left">
                🔍 Encontrar cuidador
                <span className="scta-btn-arrow">→</span>
              </button>
            </div>

            <div className="scta-stat">
            </div>
          </div>

          {/* vertical divider */}
          <div className="scta-vdivider" />

          {/* OR pill */}
          <div className="scta-or">
            <div className="scta-or-pill">o bien</div>
          </div>

          {/* RIGHT — Soy cuidador */}
          <div
            className={`scta-side ${isActive("right") ? "active" : ""} ${isDimmed("right") ? "dimmed" : ""}`}
            onMouseEnter={() => setHovered("right")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleTap("right")}
          >
            <div
              className="scta-bg"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608622-067973a79f53?w=1200&q=80')" }}
            />
            <div
              className="scta-overlay"
              style={{
                background: "#091829",
                opacity: isActive("right") ? 0.82 : isDimmed("right") ? 0.7 : 0.88,
              }}
            />
            <div className="scta-grain" />
            <div className="scta-dots" />

            <div className="scta-content">
              <div className="scta-icon-wrap">
                <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>

              <h3 className="scta-side-title">
                Soy<br />
                <em style={{ fontStyle: "italic", color: "#a4c8e8" }}>Cuidador</em>
              </h3>

              <p className="scta-side-sub">
                Únete a nuestra red. Gestiona clientes, horarios y crece profesionalmente desde una plataforma.
              </p>

              <button className="scta-btn scta-btn-right">
                Ofrecer servicios
                <span className="scta-btn-arrow">→</span>
              </button>
            </div>

            <div className="scta-stat">
            </div>
          </div>
        </div>



      </section>
  
  );
}