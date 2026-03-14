import { useState, useEffect, useRef } from "react";

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ─── ROOT ─── */
        .scta-root {
          font-family: 'Roboto', sans-serif;
          display: flex;
          flex-direction: column;
          width: 100%;
          background: #0a1e3d;
          position: relative;
          overflow: hidden;
        }

        /* dot texture global */
        .scta-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%231a4f8c' opacity='0.18'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        /* ─── TOP HEADER (shared, above the split) ─── */
        .scta-header {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 80px 32px 56px;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .scta-bubbles {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 36px;
        }
        .scta-bubble {
          width: 64px; height: 64px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          backdrop-filter: blur(8px);
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), background 0.25s;
        }
        .scta-bubble:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.12);
        }

        .scta-title {
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          font-size: clamp(36px, 5.5vw, 64px);
          line-height: 1.05;
          color: #ffffff;
          margin: 0 0 16px;
        }
        .scta-title em {
          font-style: italic;
          color: #5b9bd5;
        }

        .scta-subtitle {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }

        /* divider between header and split */
        .scta-divider-h {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0));
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* ─── SPLIT AREA ─── */
        .scta-split {
          display: flex;
          flex-direction: row;
          width: 100%;
          /* fixed height for the split portion */
          height: 520px;
          position: relative;
          z-index: 5;
        }

        .scta-side {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: flex 0.65s cubic-bezier(.22,.68,0,1.2);
        }
        .scta-side.active { flex: 1.45; }
        .scta-side.dimmed { flex: 0.65; }

        /* background image */
        .scta-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s cubic-bezier(.22,.68,0,1);
        }
        .scta-side.active .scta-bg { transform: scale(1.06); }

        /* color overlay */
        .scta-overlay {
          position: absolute; inset: 0;
          transition: opacity 0.5s ease;
        }

        /* grain */
        .scta-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 2; opacity: 0.4;
        }

        /* dot pattern */
        .scta-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none; z-index: 2;
        }

        /* ─── SIDE CONTENT ─── */
        .scta-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: #ffffff;
          padding: 0 40px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .scta-icon-wrap {
          width: 76px; height: 76px;
          border-radius: 22px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          transition: all 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .scta-side.active .scta-icon-wrap {
          background: rgba(255,255,255,0.18);
          transform: translateY(-5px) scale(1.04);
        }

        .scta-side-title {
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 3.5vw, 52px);
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 12px;
          transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .scta-side.active .scta-side-title { transform: translateY(-4px); }

        .scta-side-sub {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          margin-bottom: 28px;
          font-weight: 400;
          max-width: 280px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s;
          pointer-events: none;
        }
        .scta-side.active .scta-side-sub {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .scta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        .scta-side.active .scta-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.06s;
        }
        .scta-btn:hover { transform: translateY(-2px) !important; }
        .scta-btn-arrow { transition: transform 0.25s ease; }
        .scta-btn:hover .scta-btn-arrow { transform: translateX(4px); }

        /* left btn — azul claro sobre oscuro */
        .scta-btn-left {
          background: #1e5faa;
          border: 1.5px solid rgba(255,255,255,0.2);
          color: #ffffff;
          box-shadow: 0 6px 24px rgba(30,95,170,0.5);
        }
        .scta-btn-left:hover { background: #2568b8; box-shadow: 0 12px 36px rgba(30,95,170,0.6); }

        /* right btn — outline */
        .scta-btn-right {
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #ffffff;
        }
        .scta-btn-right:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.6); }

        /* stat badge */
        .scta-stat {
          position: absolute;
          bottom: 32px;
          display: flex; flex-direction: column; align-items: center;
          gap: 3px; z-index: 10;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
        }
        .scta-side.active .scta-stat { opacity: 1; transform: translateY(0); }
        .scta-stat-num {
          font-family: 'Roboto', sans-serif;
          font-size: 26px; font-weight: 700;
          color: #ffffff; line-height: 1;
        }
        .scta-stat-lbl {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* vertical divider between sides */
        .scta-vdivider {
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          width: 1px;
          background: rgba(255,255,255,0.15);
          z-index: 15;
          pointer-events: none;
        }

        /* center OR pill */
        .scta-or {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .scta-or-pill {
          background: #0a1e3d;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          backdrop-filter: blur(12px);
          white-space: nowrap;
        }

        /* ─── TRUST STRIP ─── */
        .scta-trust {
          position: relative; z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
          padding: 36px 32px 64px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .scta-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
        }
        .scta-trust-item span:first-child { font-size: 16px; }

        /* ─── ANIMATIONS ─── */
        .reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(.22,.68,0,1), transform 0.6s cubic-bezier(.22,.68,0,1);
        }
        .revealed { opacity: 1; transform: none; }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .scta-header { padding: 60px 24px 40px; }
          .scta-split { flex-direction: column; height: auto; }
          .scta-side { flex: none !important; height: 50svh; min-height: 260px; width: 100%; transition: height 0.5s cubic-bezier(.22,.68,0,1.2); }
          .scta-side.active { height: 58svh; }
          .scta-side.dimmed { height: 42svh; }
          .scta-vdivider { top: 50%; bottom: auto; left: 0; right: 0; width: 100%; height: 1px; }
          .scta-or { display: none; }
          .scta-trust { gap: 20px; padding: 28px 24px 48px; }
          .scta-bubble { width: 52px; height: 52px; font-size: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .scta-side, .scta-bg, .scta-btn, .scta-stat, .scta-icon-wrap,
          .scta-side-title, .scta-side-sub, .scta-bubble { transition: none !important; }
          .reveal { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

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
    </>
  );
}