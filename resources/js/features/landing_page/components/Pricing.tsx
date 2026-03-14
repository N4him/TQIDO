import { useState } from "react";

export default function SplitScreen() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [tapped, setTapped] = useState<"left" | "right" | null>(null);

  const isMobile = () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleTap = (side: "left" | "right") => {
    if (isMobile()) setTapped(p => p === side ? null : side);
  };

  const isActive = (side: "left" | "right") => hovered === side || tapped === side;
  const isDimmed = (side: "left" | "right") => (hovered !== null && hovered !== side) || (tapped !== null && tapped !== side);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sp-root {
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100svh;
          min-height: 560px;
          overflow: hidden;
          position: relative;
        }

        .sp-side {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: flex 0.65s cubic-bezier(.22,.68,0,1.2);
        }
        .sp-side.active { flex: 1.4; }
        .sp-side.dimmed { flex: 0.7; }

        /* Background image */
        .sp-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s cubic-bezier(.22,.68,0,1);
        }
        .sp-side.active .sp-bg { transform: scale(1.07); }

        /* Color overlay */
        .sp-overlay {
          position: absolute; inset: 0;
          transition: opacity 0.5s ease;
        }

        /* Grain texture */
        .sp-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 2; opacity: 0.5;
        }

        /* Dot pattern */
        .sp-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none; z-index: 2;
        }

        /* Content */
        .sp-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: #ffffff;
          padding: 0 48px;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Icon */
        .sp-icon-wrap {
          width: 80px; height: 80px;
          border-radius: 24px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          transition: all 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .sp-side.active .sp-icon-wrap {
          background: rgba(255,255,255,0.2);
          transform: translateY(-6px) scale(1.05);
        }

        /* Title */
        .sp-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400;
          line-height: 1.0;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
          transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .sp-side.active .sp-title { transform: translateY(-4px); }
        .sp-title em {
          font-style: italic;
        }

        /* Subtitle — hidden by default, shown on active */
        .sp-subtitle {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
          margin-bottom: 32px;
          font-weight: 300;
          max-width: 300px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          pointer-events: none;
        }
        .sp-side.active .sp-subtitle {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* CTA button */
        .sp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.4);
          color: #ffffff;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        .sp-side.active .sp-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.05s;
        }
        .sp-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.65);
          transform: translateY(-2px) !important;
        }
        .sp-btn-arrow { transition: transform 0.25s ease; }
        .sp-btn:hover .sp-btn-arrow { transform: translateX(4px); }

        /* Stat badge at bottom */
        .sp-stat {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          z-index: 10;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
        }
        .sp-side.active .sp-stat { opacity: 1; transform: translateY(0); }
        .sp-stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #ffffff;
          line-height: 1;
        }
        .sp-stat-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* Divider + center mark */
        .sp-divider {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(255,255,255,0.2);
          z-index: 15;
          pointer-events: none;
          transition: left 0.65s cubic-bezier(.22,.68,0,1.2);
        }
        .sp-center-mark {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
        }
        .sp-center-circle {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #71aedd;
          border: 3px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(15,32,51,0.5);
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
        }
        .sp-center-circle:hover { transform: scale(1.1); box-shadow: 0 12px 44px rgba(15,32,51,0.6); }

        /* Top label */
        .sp-top-label {
          position: absolute;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          background: rgba(15,32,51,0.7);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          backdrop-filter: blur(12px);
          white-space: nowrap;
          pointer-events: none;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .sp-root { flex-direction: column; height: auto; min-height: 100svh; }
          .sp-side { flex: none !important; height: 50svh; min-height: 280px; width: 100%; transition: height 0.5s cubic-bezier(.22,.68,0,1.2); }
          .sp-side.active { height: 58svh; }
          .sp-side.dimmed { height: 42svh; }
          .sp-title { font-size: clamp(32px, 8vw, 48px); }
          .sp-icon-wrap { width: 60px; height: 60px; border-radius: 18px; margin-bottom: 18px; }
          .sp-content { padding: 0 24px; }
          .sp-divider { top: 50%; bottom: auto; left: 0; right: 0; width: 100%; height: 1px; }
          .sp-center-mark { display: none; }
          .sp-top-label { display: none; }
          .sp-stat { bottom: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-side, .sp-bg, .sp-btn, .sp-stat, .sp-icon-wrap, .sp-title, .sp-subtitle { transition: none !important; }
        }
      `}</style>

      <section
        className="sp-root"
        id="tipo-usuario"
        onMouseLeave={() => setHovered(null)}
      >
        {/* LEFT — Busco cuidador */}
        <div
          className={`sp-side ${isActive("left") ? "active" : ""} ${isDimmed("left") ? "dimmed" : ""}`}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleTap("left")}
        >
          <div
            className="sp-bg"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80')" }}
          />
          <div
            className="sp-overlay"
            style={{
              background: "#1d3557",
              opacity: isActive("left") ? 0.88 : isDimmed("left") ? 0.55 : 0.82,
            }}
          />
          <div className="sp-grain" />
          <div className="sp-dots" />

          <div className="sp-content">
            <div className="sp-icon-wrap">
              <svg width="34" height="34" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <h2 className="sp-title">
              Busco<br />
              <em style={{ color: "#71aedd" }}>Cuidador</em>
            </h2>

            <p className="sp-subtitle">
              Encuentra profesionales verificados para el cuidado de tus seres queridos.
              Seguro, rápido y 100% digital.
            </p>

            <button className="sp-btn">
              Encontrar ayuda
              <span className="sp-btn-arrow">→</span>
            </button>
          </div>

          <div className="sp-stat">
            <div className="sp-stat-num">12K+</div>
            <div className="sp-stat-lbl">Familias atendidas</div>
          </div>
        </div>

        {/* Divider */}
        <div className="sp-divider" />

        {/* Center mark */}
        <div className="sp-center-mark">
          <div className="sp-center-circle">
            <svg width="22" height="22" fill="#1d3557" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* Top label */}
        <div className="sp-top-label">¿Qué eres tú?</div>

        {/* RIGHT — Soy cuidador */}
        <div
          className={`sp-side ${isActive("right") ? "active" : ""} ${isDimmed("right") ? "dimmed" : ""}`}
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleTap("right")}
        >
          <div
            className="sp-bg"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608622-067973a79f53?w=1200&q=80')" }}
          />
          <div
            className="sp-overlay"
            style={{
              background: "#324f79",
              opacity: isActive("right") ? 0.88 : isDimmed("right") ? 0.55 : 0.82,
            }}
          />
          <div className="sp-grain" />
          <div className="sp-dots" />

          <div className="sp-content">
            <div className="sp-icon-wrap">
              <svg width="34" height="34" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="sp-title">
              Soy<br />
              <em style={{ color: "#a4b8e8" }}>Cuidador</em>
            </h2>

            <p className="sp-subtitle">
              Únete a nuestra red de profesionales. Gestiona clientes, horarios
              y crece profesionalmente desde una plataforma.
            </p>

            <button className="sp-btn">
              Ofrecer servicios
              <span className="sp-btn-arrow">→</span>
            </button>
          </div>

          <div className="sp-stat">
          </div>
        </div>
      </section>
    </>
  );
}