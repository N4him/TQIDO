import { useEffect, useRef, CSSProperties } from "react";

const testimonials = [
  {
    name: "María Carmen López",
    location: "Madrid",
    avatar: "👩‍💼",
    text: "Encontré a la cuidadora perfecta para mi madre en menos de 24 horas. El proceso de verificación me dio total tranquilidad. Ahora mi madre está feliz en casa y yo puedo trabajar sin preocupaciones.",
    rating: 5,
    service: "Mayores",
    serviceColor: "#1a4a8a",
    weeks: "3 meses usando TQido",
  },
  {
    name: "Carlos Fernández",
    location: "Valencia",
    avatar: "👨‍💻",
    text: "La plataforma es súper intuitiva. Contraté una niñera para mis gemelos y todo fue perfecto desde el primer día. Las referencias verificadas hacen toda la diferencia.",
    rating: 5,
    service: "Niños",
    serviceColor: "#0e2d5a",
    weeks: "6 semanas usando TQido",
  },
  {
    name: "Ana Martínez",
    location: "Sevilla",
    avatar: "👩‍🏫",
    text: "Mi golden retriever tiene necesidades especiales y encontré un cuidador con experiencia veterinaria. El seguimiento digital me permite ver cómo está incluso cuando viajo.",
    rating: 5,
    service: "Mascotas",
    serviceColor: "#1a4a8a",
    weeks: "2 meses usando TQido",
  },
  {
    name: "Roberto Sánchez",
    location: "Barcelona",
    avatar: "👨‍🔧",
    text: "Después de probar varias opciones, TQido fue la única que realmente cumplió. El cuidador de mi padre es profesional, puntual y muy cariñoso. La gestión digital es fantástica.",
    rating: 5,
    service: "Mayores",
    serviceColor: "#1a4a8a",
    weeks: "5 meses usando TQido",
  },
  {
    name: "Laura García",
    location: "Málaga",
    avatar: "👩‍💻",
    text: "Como madre soltera, necesitaba flexibilidad total. Con TQido puedo reservar cuidado por horas cuando lo necesito. Las niñeras son excepcionales y mi hija las adora.",
    rating: 5,
    service: "Niños",
    serviceColor: "#0e2d5a",
    weeks: "4 meses usando TQido",
  },
  {
    name: "Isabel Moreno",
    location: "Zaragoza",
    avatar: "👩‍⚕️",
    text: "Mi abuela necesita atención especializada y TQido me conectó con una enfermera geriátrica perfecta. El matching fue acertadísimo. Ya llevamos 6 meses y estamos encantados.",
    rating: 5,
    service: "Mayores",
    serviceColor: "#1a4a8a",
    weeks: "6 meses usando TQido",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function Card({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  return (
    <div className="tm-card tm-reveal" style={{ "--delay": `${delay}ms` } as CSSProperties}>
      <div className="tm-card-top">
        <Stars n={t.rating} />
        <span className="tm-badge" style={{ background: t.serviceColor }}>
          {t.service}
        </span>
      </div>
      <p className="tm-quote">"{t.text}"</p>
      <div className="tm-card-footer">
        <div className="tm-avatar">{t.avatar}</div>
        <div className="tm-author">
          <span className="tm-name">{t.name}</span>
          <span className="tm-meta">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {t.location} · {t.weeks}
          </span>
        </div>
        <svg width="20" height="20" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".tm-reveal").forEach((el, i) =>
            setTimeout(() => el.classList.add("tm-in"), i * 75)
          );
      }),
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const col1 = testimonials.slice(0, 2);
  const col2 = testimonials.slice(2, 4);
  const col3 = testimonials.slice(4, 6);

  const stats = [
    { val: "4.9/5",  lbl: "Valoración media",      sub: "★★★★★",              subColor: "#f59e0b" },
    { val: "2.400+", lbl: "Familias satisfechas",   sub: "En toda España",      subColor: "rgba(255,255,255,0.45)" },
    { val: "98%",    lbl: "Nos recomendarían",       sub: "A familiares y amigos",subColor: "rgba(255,255,255,0.45)" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        /*
          PALETA Testimonios — #2e6fba (vuelve al base del hero)
          Secuencia: #2e6fba → #2e6fba → #0e2d5a → #1a4a8a → #2e6fba ← aquí
          acento oscuro:  #1a4a8a  (cards de stats)
          acento muy osc: #0e2d5a  (card stat alternativa)
          acento claro:   #a4c8ee  (eyebrow, highlights)
          cards:          #ffffff  (máximo contraste)
          quote bg:       rgba(255,255,255,0.08) (decorativo)
        */

        .tm-root {
          font-family: 'DM Sans', sans-serif;
          background: #2e6fba;
          position: relative;
          overflow: hidden;
          padding: 100px 0 90px;
        }

        /* Dot texture en blanco */
        .tm-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        /* Sin blob decorativo — plano */
        .tm-root::after { display: none; }

        .tm-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .tm-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 64px;
        }

        .tm-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a4c8ee;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tm-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: #a4c8ee; }

        .tm-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 400;
          line-height: 1.0;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .tm-h2 em { font-style: italic; color: #a4c8ee; }

        .tm-head-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          flex-shrink: 0;
        }
        .tm-overall {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
        }
        .tm-overall-score {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #ffffff;
          line-height: 1;
        }
        .tm-overall-right { display: flex; flex-direction: column; gap: 3px; }
        .tm-overall-stars { color: #f59e0b; font-size: 13px; letter-spacing: 1px; }
        .tm-overall-sub { font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 500; }

        /* ── MASONRY GRID ── */
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          align-items: start;
        }
        .tm-col { display: flex; flex-direction: column; gap: 14px; }
        .tm-col:nth-child(2) { margin-top: 36px; }

        /* ── CARD — blanco puro para máximo contraste sobre #2e6fba ── */
        .tm-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 26px;
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2);
          position: relative;
          overflow: hidden;
        }
        /* Comilla decorativa derivada del azul claro */
        .tm-card::before {
          content: '"';
          position: absolute;
          top: 12px; right: 20px;
          font-family: 'DM Serif Display', serif;
          font-size: 80px;
          color: rgba(46,111,186,0.1);
          line-height: 1;
          pointer-events: none;
        }
        .tm-card:hover { transform: translateY(-6px); }

        .tm-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .tm-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .tm-quote {
          font-size: 14px;
          line-height: 1.75;
          color: #1a4a8a;
          margin: 0 0 18px;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        .tm-card-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid rgba(46,111,186,0.1);
        }
        .tm-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(46,111,186,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tm-author { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .tm-name { font-size: 13px; font-weight: 600; color: #0e2d5a; }
        .tm-meta {
          display: flex; align-items: center; gap: 4px;
          font-size: 11px; color: #1a4a8a; opacity: 0.6;
        }

        /* ── STATS ROW ── */
        .tm-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 56px;
        }
        .tm-stat {
          border-radius: 22px;
          padding: 36px 32px;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .tm-stat:hover { transform: translateY(-5px); }

        /* stat-0: oscuro profundo */
        .tm-stat-0 { background: #0e2d5a; }
        /* stat-1: medio oscuro */
        .tm-stat-1 { background: #1a4a8a; }
        /* stat-2: blanco translúcido */
        .tm-stat-2 { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); }

        .tm-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 4vw, 52px);
          color: #ffffff;
          line-height: 1;
          margin-bottom: 6px;
        }
        .tm-stat-1 .tm-stat-val { color: #a4c8ee; }
        .tm-stat-lbl { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 6px; }
        .tm-stat-sub { font-size: 12px; }

        /* ── REVEAL ── */
        .tm-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 0.6s cubic-bezier(.22,.68,0,1) var(--delay, 0ms),
            transform 0.6s cubic-bezier(.22,.68,0,1) var(--delay, 0ms);
        }
        .tm-in { opacity: 1; transform: none; }

        @media (max-width: 900px) {
          .tm-head { flex-direction: column; align-items: flex-start; gap: 20px; }
          .tm-head-right { align-items: flex-start; }
          .tm-grid { grid-template-columns: 1fr 1fr; }
          .tm-col:nth-child(2) { margin-top: 0; }
          .tm-col:nth-child(3) { display: none; }
          .tm-stats { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tm-inner { padding: 0 20px; }
          .tm-root { padding: 60px 0 50px; }
          .tm-grid { grid-template-columns: 1fr; }
          .tm-col:nth-child(2), .tm-col:nth-child(3) { display: flex; margin-top: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-reveal { transition: none; opacity: 1; transform: none; }
          .tm-card, .tm-stat { transition: none; }
        }
      `}</style>

      <section className="tm-root" id="testimonials" ref={ref}>
        <div className="tm-inner">
          {/* Header */}
          <div className="tm-head">
            <div className="tm-reveal">
              <div className="tm-eyebrow">Testimonios</div>
              <h2 className="tm-h2">
                Miles de familias<br />ya confían en <em>TQido</em>
              </h2>
            </div>

          </div>

          {/* Cards */}
          <div className="tm-grid">
            <div className="tm-col">{col1.map((t, i) => <Card key={i} t={t} delay={i * 80} />)}</div>
            <div className="tm-col">{col2.map((t, i) => <Card key={i} t={t} delay={100 + i * 80} />)}</div>
            <div className="tm-col">{col3.map((t, i) => <Card key={i} t={t} delay={200 + i * 80} />)}</div>
          </div>

          {/* Stats */}
          <div className="tm-stats">
            {stats.map((s, i) => (
              <div className={`tm-stat tm-stat-${i} tm-reveal`} key={i}>
                <div className="tm-stat-val">{s.val}</div>
                <div className="tm-stat-lbl">{s.lbl}</div>
                <div className="tm-stat-sub" style={{ color: s.subColor }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}