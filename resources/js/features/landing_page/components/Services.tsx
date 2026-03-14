import { useState, useEffect, useRef, useCallback } from "react";

const tabs = [
  { id: "seniors", label: "Mayores",  emoji: "🤍", accent: "#2e6fba" },
  { id: "kids",    label: "Niños",    emoji: "👶", accent: "#2e6fba" },
  { id: "pets",    label: "Mascotas", emoji: "🐾", accent: "#2e6fba" },
];

const profiles = {
  seniors: [
    { name: "María Dolores J.", role: "Auxiliar Sociosanitaria",  exp: "8 años",  badge: "Top Valorada", families: 534, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop&crop=face", rating: 4.9 },
    { name: "Roberto Álvarez",  role: "Gerocultor Certificado",   exp: "6 años",  badge: "Certificado",  families: 467, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop&crop=face", rating: 4.8 },
    { name: "Isabel Moreno",    role: "Enfermera Geriátrica",     exp: "12 años", badge: "Experta",       families: 621, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop&crop=face", rating: 5.0 },
    { name: "Carlos Vega",      role: "Cuidador & Fisioterapeuta",exp: "9 años",  badge: "Especialista", families: 389, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop&crop=face", rating: 4.9 },
  ],
  kids: [
    { name: "Ana García",       role: "Educadora Infantil",   exp: "8 años", badge: "Top Valorada", families: 147, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop&crop=face", rating: 4.9 },
    { name: "Carmen Rodríguez", role: "Niñera Profesional",    exp: "5 años", badge: "Verificada",  families: 203, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop&crop=face", rating: 4.8 },
    { name: "Laura Martínez",   role: "Cuidadora Pediátrica",  exp: "7 años", badge: "Premiada",    families: 189, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop&crop=face", rating: 5.0 },
    { name: "Sofía Blanco",     role: "Pedagoga Montessori",   exp: "4 años", badge: "Nueva",       families: 94,  img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&h=600&fit=crop&crop=face", rating: 4.7 },
  ],
  pets: [
    { name: "Miguel Fernández", role: "Cuidador de Mascotas",    exp: "6 años",  badge: "Destacado",   families: 312, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=face", rating: 4.9 },
    { name: "Patricia Sánchez", role: "Veterinaria & Cuidadora", exp: "10 años", badge: "Top Valorada", families: 428, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=face", rating: 5.0 },
    { name: "David Torres",     role: "Especialista Animal",      exp: "8 años",  badge: "Verificado",  families: 267, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop&crop=face", rating: 4.8 },
    { name: "Elena Ruiz",       role: "Dog Sitter Certificada",  exp: "5 años",  badge: "Verificada",  families: 178, img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=600&fit=crop&crop=face", rating: 4.7 },
  ],
};

function ProfileCard({ p, accent }: { p: typeof profiles[keyof typeof profiles][number]; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="cp-card" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="cp-card-img-wrap">
        <img src={p.img} alt={p.name} className="cp-card-img" style={{ transform: hov ? "scale(1.07)" : "scale(1)" }} />
        <div className="cp-card-badge" style={{ background: accent }}>✓ {p.badge}</div>
        <div className="cp-card-hover-cta" style={{ opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(12px)" }}>
          <button className="cp-hire-btn" style={{ background: accent }}>Ver perfil completo →</button>
        </div>
        <div className="cp-rating-chip" style={{ opacity: hov ? 1 : 0 }}>
          <svg width="11" height="11" viewBox="0 0 20 20" fill="#f59e0b">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {p.rating}
        </div>
      </div>
      <div className="cp-card-body">
        <div className="cp-card-meta">
          <span className="cp-families-badge" style={{ color: accent }}>
            <span className="cp-dot" style={{ background: accent }} />
            {p.families} familias
          </span>
          <span className="cp-exp">{p.exp} exp.</span>
        </div>
        <h3 className="cp-card-name">{p.name}</h3>
        <p className="cp-card-role" style={{ color: accent }}>{p.role}</p>
        <button className="cp-card-cta" style={{ borderColor: accent, color: accent }}>
          Contratar ahora
        </button>
      </div>
    </div>
  );
}

function Carousel({ data, accent, visCount, isDesktop }: { data: typeof profiles[keyof typeof profiles]; accent: string; visCount: number; isDesktop: boolean }) {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const mouseX = useRef<number | null>(null);

  const GAP = 16;
  const maxIdx = Math.max(0, data.length - visCount);
  const clamp = (v: number) => Math.max(0, Math.min(maxIdx, v));

  const w = outerRef.current?.clientWidth ?? 900;
  const cardW = (w - GAP * (visCount - 1)) / visCount;
  const stepPx = cardW + GAP;
  const base = -(idx * stepPx / w) * 100;
  const dragPct = (drag / w) * 100;

  const end = useCallback((offset: number) => {
    const threshold = (outerRef.current?.clientWidth ?? 300) * 0.15;
    if (offset < -threshold) setIdx(i => clamp(i + 1));
    else if (offset > threshold) setIdx(i => clamp(i - 1));
    setDrag(0); setDragging(false);
  }, [maxIdx]);

  return (
    <div>
      <div className="cp-carousel" ref={outerRef}>
        <div
          className="cp-track-clip"
          style={{ cursor: !isDesktop ? (dragging ? "grabbing" : "grab") : "default", userSelect: "none" }}
          onTouchStart={e => { touchX.current = e.touches[0].clientX; setDragging(true); }}
          onTouchMove={e => { if (touchX.current !== null) setDrag(e.touches[0].clientX - touchX.current); }}
          onTouchEnd={() => { end(drag); touchX.current = null; }}
          onMouseDown={e => { if (!isDesktop) { mouseX.current = e.clientX; setDragging(true); } }}
          onMouseMove={e => { if (!isDesktop && mouseX.current !== null) setDrag(e.clientX - mouseX.current); }}
          onMouseUp={() => { if (!isDesktop && mouseX.current !== null) { end(drag); mouseX.current = null; } }}
          onMouseLeave={() => { if (!isDesktop && mouseX.current !== null) { end(drag); mouseX.current = null; } }}
        >
          <div
            className="cp-track"
            style={{ transform: `translateX(${base + dragPct}%)`, transition: dragging ? "none" : "transform 0.45s cubic-bezier(.22,.68,0,1.2)" }}
          >
            {data.map((p, i) => <ProfileCard key={i} p={p} accent={accent} />)}
          </div>
        </div>
      </div>

      {isDesktop ? (
        <div className="cp-nav">
          <button className="cp-nav-btn" onClick={() => setIdx(i => clamp(i - 1))} disabled={idx === 0}>‹</button>
          <span className="cp-nav-count">{idx + 1} / {maxIdx + 1}</span>
          <button className="cp-nav-btn" onClick={() => setIdx(i => clamp(i + 1))} disabled={idx >= maxIdx}>›</button>
        </div>
      ) : (
        <div className="cp-dots">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} className={`cp-dot-btn ${i === idx ? "active" : ""}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CuidadoresPerfiles() {
  const [activeTab, setActiveTab] = useState("seniors");
  const [visCount, setVisCount] = useState(3);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 680) { setVisCount(1); setIsDesktop(false); }
      else if (w <= 1024) { setVisCount(2); setIsDesktop(false); }
      else { setVisCount(3); setIsDesktop(true); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        /*
          PALETA Cuidadores — #1a4a8a (azul medio-oscuro)
          Secuencia: #2e6fba → #2e6fba → #0e2d5a → #1a4a8a ← aquí
          base:       #1a4a8a
          acento:     #2e6fba  (hero color, para CTAs y badges)
          acento2:    #a4c8ee  (azul claro para highlights)
          card bg:    #ffffff  (máximo contraste para las cards de perfil)
          dots:       rgba(255,255,255,0.1)
          texto:      #ffffff
          texto2:     rgba(255,255,255,0.6)
        */

        .cp-root {
          font-family: 'DM Sans', sans-serif;
          background: #1a4a8a;
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 80px;
        }

        /* Dot texture — blanco sutil */
        .cp-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none; z-index: 0;
        }

        /* ── HERO ── */
        .cp-hero {
          position: relative; z-index: 1;
          padding: 80px 48px 40px;
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end; gap: 60px;
        }
        .cp-hero-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #a4c8ee;
          margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
        .cp-hero-eyebrow::before {
          content: ''; width: 28px; height: 1.5px; background: #a4c8ee;
        }
        .cp-hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400; line-height: 1.0;
          color: #ffffff; margin: 0 0 18px;
          letter-spacing: -0.5px;
        }
        .cp-hero h1 em { font-style: italic; color: #a4c8ee; }
        .cp-hero-sub {
          font-size: 16px; color: rgba(255,255,255,0.65);
          line-height: 1.7; max-width: 480px; font-weight: 300;
        }
        .cp-hero-stats {
          display: flex; flex-direction: column;
          gap: 24px; flex-shrink: 0;
        }
        .cp-stat-item { text-align: right; }
        .cp-stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 40px; font-weight: 400; line-height: 1;
          color: #ffffff;
        }
        .cp-stat-lbl {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); margin-top: 3px;
        }
        .cp-stat-divider {
          width: 1px; height: 32px;
          background: rgba(255,255,255,0.15);
          margin-left: auto;
        }

        /* ── TABS ── */
        .cp-tabs-wrap {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 0 48px;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          margin-bottom: 48px;
        }
        .cp-tabs { display: flex; }
        .cp-tab {
          display: flex; align-items: center; gap: 9px;
          padding: 18px 32px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.4);
          background: none; border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer; position: relative; bottom: -1px;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.25s, border-color 0.25s;
        }
        .cp-tab:hover { color: rgba(255,255,255,0.75); }
        .cp-tab.active { color: #ffffff; border-bottom-color: #a4c8ee; }
        .cp-tab-emoji { font-size: 18px; }

        /* ── SECTION HEADER ── */
        .cp-section-head {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 0 48px 24px;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 40px;
        }
        .cp-section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.1); color: #ffffff;
          margin-bottom: 14px;
        }
        .cp-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 400; line-height: 1.1; color: #ffffff;
        }
        .cp-section-sub {
          font-size: 14px; color: rgba(255,255,255,0.55);
          line-height: 1.7; max-width: 300px;
          flex-shrink: 0; align-self: flex-end; font-weight: 300;
        }

        /* ── CAROUSEL ── */
        .cp-carousel {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 0 48px;
        }
        .cp-track-clip { overflow: hidden; }
        .cp-track { display: flex; gap: 16px; will-change: transform; }

        /* ── CARD — blanco para máximo contraste sobre #1a4a8a ── */
        .cp-card {
          background: #ffffff;
          border-radius: 22px;
          overflow: hidden;
          flex: 0 0 calc((100% - 32px) / 3);
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .cp-card:hover { transform: translateY(-8px); }

        .cp-card-img-wrap {
          position: relative; height: 220px; overflow: hidden;
        }
        .cp-card-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center top;
          transition: transform 0.65s cubic-bezier(.22,.68,0,1);
        }
        .cp-card-badge {
          position: absolute; top: 14px; left: 14px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff;
          padding: 5px 12px; border-radius: 100px;
        }
        .cp-card-hover-cta {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(14,45,90,0.5);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.22,.68,0,1.2);
        }
        .cp-hire-btn {
          border: none; border-radius: 100px;
          padding: 11px 22px;
          font-size: 13px; font-weight: 600; color: #fff;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .cp-rating-chip {
          position: absolute; bottom: 12px; right: 12px;
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px;
          padding: 4px 9px;
          font-size: 12px; font-weight: 600; color: #fff;
          backdrop-filter: blur(8px);
          transition: opacity 0.3s ease;
        }

        .cp-card-body { padding: 18px 20px 20px; background: #fff; }
        .cp-card-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .cp-families-badge {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 500;
        }
        .cp-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .cp-exp { font-size: 11px; color: rgba(26,74,138,0.45); font-weight: 500; }
        .cp-card-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; font-weight: 400; color: #0e2d5a;
          margin: 0 0 5px; line-height: 1.2;
        }
        .cp-card-role {
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; margin: 0 0 14px;
        }
        .cp-card-cta {
          width: 100%; padding: 10px;
          border-radius: 12px; border: 1.5px solid;
          background: transparent;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
        }
        .cp-card-cta:hover { background: rgba(46,111,186,0.06); transform: translateY(-1px); }

        /* ── NAV ── */
        .cp-nav {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; padding: 28px 0 0;
          position: relative; z-index: 2;
        }
        .cp-nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08); color: #fff;
          font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .cp-nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.5);
        }
        .cp-nav-btn:disabled { opacity: 0.3; cursor: default; }
        .cp-nav-count {
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55);
          min-width: 44px; text-align: center;
        }

        .cp-dots {
          display: flex; justify-content: center; gap: 8px;
          padding: 20px 0 0; position: relative; z-index: 2;
        }
        .cp-dot-btn {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.25); border: none;
          cursor: pointer; transition: background 0.25s, transform 0.25s; padding: 0;
        }
        .cp-dot-btn.active { background: #ffffff; transform: scale(1.3); }

        @media (max-width: 1024px) {
          .cp-hero { grid-template-columns: 1fr; }
          .cp-hero-stats { flex-direction: row; }
          .cp-stat-item { text-align: left; }
          .cp-stat-divider { display: none; }
          .cp-card { flex: 0 0 calc((100% - 16px) / 2); }
        }
        @media (max-width: 680px) {
          .cp-hero { padding: 60px 20px 32px; }
          .cp-tabs-wrap { padding: 0 20px; }
          .cp-tab { padding: 14px 16px; font-size: 13px; }
          .cp-section-head { padding: 0 20px 20px; flex-direction: column; align-items: flex-start; gap: 12px; }
          .cp-section-sub { max-width: 100%; }
          .cp-carousel { padding: 0 20px; }
          .cp-card { flex: 0 0 100%; }
        }
      `}</style>

      <div className="cp-root" id="cuidadores">
        {/* Hero */}
        <div className="cp-hero">
          <div>
            <div className="cp-hero-eyebrow">Nuestros profesionales</div>
            <h1>Profesionales <em>que cuidan</em><br />como familia</h1>
            <p className="cp-hero-sub">
              Más de 500 cuidadores verificados, formados y listos para cuidar
              de quienes más quieres — personas mayores, niños y mascotas.
            </p>
          </div>
          <div className="cp-hero-stats">
            {[
              { num: "500+", lbl: "Cuidadores activos" },
              { num: "4.9★", lbl: "Valoración media" },
              { num: "12K+", lbl: "Familias atendidas" },
            ].map((s, i) => (
              <>
                {i > 0 && <div key={`d${i}`} className="cp-stat-divider" />}
                <div className="cp-stat-item" key={s.lbl}>
                  <div className="cp-stat-num">{s.num}</div>
                  <div className="cp-stat-lbl">{s.lbl}</div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="cp-tabs-wrap">
          <div className="cp-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`cp-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span className="cp-tab-emoji">{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section header */}
        <div className="cp-section-head">
          <div>
            <div className="cp-section-tag">{tab.emoji} Cuidadores de {tab.label}</div>
            <div className="cp-section-title">Profesionales para {tab.label.toLowerCase()}</div>
          </div>
          <p className="cp-section-sub">
            Cada cuidador pasa por un proceso de selección riguroso antes de aparecer en la plataforma.
          </p>
        </div>

        {/* Carousel */}
        {tab && (
          <Carousel
            key={activeTab}
            data={profiles[activeTab as keyof typeof profiles]}
            accent={tab.accent}
            visCount={visCount}
            isDesktop={isDesktop}
          />
        )}
      </div>
    </>
  );
}