import { useEffect, useRef, CSSProperties } from "react";
import "../../../../../resources/css/landing_page/testimonials.css";

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
  );
}