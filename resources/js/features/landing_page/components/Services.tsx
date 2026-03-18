import { useState, useEffect, useRef, useCallback } from "react";
import "../../../css/landing_page/services.css";

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
  );
}