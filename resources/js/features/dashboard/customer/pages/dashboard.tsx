import { useState } from 'react';
import { router } from '@inertiajs/react';
import type { NavLink, DropdownItem, ProfileStep, CarerLayoutUser } from '@/features/layouts/customer_layout';
import CarerLayout from '@/features/layouts/customer_layout';
import CarerCard, { carerCardCss } from '@/components/common/care_card';
import type { Carer } from '@/components/common/care_card';

/* ─────────────────────────────────────────────
   PAGE-SPECIFIC CSS
   (los estilos de .card viven en carerCardCss)
───────────────────────────────────────────── */
const pageCss = `
/* ── HERO ── */
.hero-section {
  padding: var(--s16) var(--s8) var(--s10);
  max-width: 860px; margin: 0 auto; text-align: center;
  position: relative; z-index: 1;
}
.hero-pill {
  display: inline-flex; align-items: center; gap: var(--s2);
  background: var(--on-dom-12); border: 1px solid rgba(255,255,255,0.30);
  border-radius: var(--rF); padding: 5px 16px;
  font-size: 11px; font-weight: 600; color: var(--on-dom);
  letter-spacing: 0.06em; text-transform: uppercase;
  margin-bottom: var(--s6); backdrop-filter: blur(8px);
}
.hero-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #fff176;
  box-shadow: 0 0 0 3px rgba(255,241,118,0.25);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(255,241,118,0.25); }
  50%      { box-shadow: 0 0 0 7px rgba(255,241,118,0); }
}
.hero-title {
  font-family: var(--ff-d);
  font-size: clamp(36px,5.5vw,56px);
  font-weight: 500; color: var(--on-dom);
  line-height: 1.1; letter-spacing: -0.025em;
  margin-bottom: var(--s5);
  text-shadow: 0 2px 20px rgba(20,50,100,0.25);
}
.hero-title em {
  font-style: italic; color: var(--on-dom); position: relative;
}
.hero-title em::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(255,241,118,0.9), rgba(255,241,118,0.3));
  border-radius: 2px;
}
.hero-sub {
  font-size: 15.5px; color: var(--on-dom-80); font-weight: 400;
  line-height: 1.7; max-width: 520px; margin: 0 auto var(--s10);
}

/* ── SEARCH BAR ── */
.search-frame {
  background: var(--surf); border-radius: var(--r16);
  box-shadow: var(--sh-lg); padding: var(--s2);
  display: flex; align-items: stretch;
  max-width: 740px; margin: 0 auto;
  border: 1px solid rgba(255,255,255,0.9);
  gap: var(--s2);
}
.search-frame:focus-within { box-shadow: var(--sh-lg), 0 0 0 4px rgba(255,255,255,0.30); }
.sf {
  flex: 1; padding: 10px var(--s4);
  display: flex; flex-direction: column; gap: 3px;
  border-radius: var(--r12); cursor: pointer;
  transition: background 0.12s ease; min-width: 0;
}
.sf:hover { background: var(--surf-2); }
.sf-label { font-size: 9.5px; font-weight: 700; color: var(--ink); letter-spacing: 0.08em; text-transform: uppercase; }
.sf-val   { font-size: 13px; color: var(--muted); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sf-input {
  background: none; border: none; outline: none;
  font-family: var(--ff-ui); font-size: 13px; color: var(--ink); width: 100%;
}
.sf-input::placeholder { color: var(--faint); }
.sf-sep { width: 1px; background: var(--surf-3); margin: var(--s2) 0; flex-shrink: 0; align-self: stretch; }
.search-cta {
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff; border: none; border-radius: var(--r12); padding: 10px 22px;
  font-size: 13px; font-weight: 600; cursor: pointer; font-family: var(--ff-ui);
  display: flex; align-items: center; gap: var(--s2);
  transition: all 0.18s ease; white-space: nowrap;
  flex-shrink: 0; box-shadow: var(--sh-glow);
}
.search-cta:hover { background: linear-gradient(135deg, var(--dom-xdk), var(--dom-deep)); transform: translateY(-1px); box-shadow: 0 6px 28px rgba(26,74,144,0.60); }
.search-cta:active { transform: none; }

/* ── TRUST STRIP ── */
.trust-strip {
  background: rgba(58,120,204,0.35);
  border-top: 1px solid var(--on-dom-20); border-bottom: 1px solid var(--on-dom-20);
  padding: 14px var(--s8);
  display: flex; align-items: center; justify-content: center;
  gap: var(--s10); flex-wrap: wrap;
  backdrop-filter: blur(10px); position: relative; z-index: 1;
}
.trust-item { display: flex; align-items: center; gap: var(--s2); font-size: 12px; font-weight: 500; color: var(--on-dom-80); }
.trust-icon-wrap {
  width: 22px; height: 22px; border-radius: var(--r4);
  background: var(--on-dom-20); border: 1px solid rgba(255,255,255,0.30);
  display: flex; align-items: center; justify-content: center; font-size: 11px;
}

/* ── FILTER BAR ── */
.filter-bar {
  display: flex; align-items: center; gap: var(--s2);
  padding: var(--s6) var(--s8) 0;
  max-width: 1920px; margin: 0 auto;
  flex-wrap: wrap; position: relative; z-index: 1;
}
.filter-label { font-size: 11px; font-weight: 600; color: var(--on-dom-60); letter-spacing: 0.06em; text-transform: uppercase; margin-right: var(--s1); }
.chip {
  display: inline-flex; align-items: center; gap: var(--s1);
  padding: 5px 13px; border-radius: var(--r8);
  font-size: 12.5px; font-weight: 500; color: var(--on-dom);
  background: var(--on-dom-12); border: 1px solid rgba(255,255,255,0.30);
  cursor: pointer; transition: all 0.13s ease; font-family: var(--ff-ui); white-space: nowrap;
  backdrop-filter: blur(8px);
}
.chip:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.chip.on { background: var(--surf); color: var(--dom-dk); border-color: rgba(255,255,255,0.95); box-shadow: var(--sh-sm); }
.chip.on:hover { background: var(--surf-2); }
.chip-count { font-size: 9.5px; font-weight: 700; background: var(--on-dom-20); border-radius: var(--rF); padding: 1px 5px; color: var(--on-dom); }
.chip.on .chip-count { background: var(--surf-3); color: var(--dom-dk); }
.chip-status { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.chip-clear { color: #fff176; border-color: rgba(255,241,118,0.35); background: rgba(255,241,118,0.12); }
.chip-clear:hover { background: rgba(255,241,118,0.22); border-color: rgba(255,241,118,0.55); color: #ffd600; }
.sort-select {
  margin-left: auto; padding: 5px 30px 5px 13px;
  border-radius: var(--r8); font-size: 12.5px; font-weight: 500;
  color: var(--on-dom); background: var(--on-dom-12);
  border: 1px solid rgba(255,255,255,0.30);
  cursor: pointer; font-family: var(--ff-ui); outline: none; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  transition: all 0.13s ease; backdrop-filter: blur(8px);
}
.sort-select option { background: var(--dom-dk); color: #fff; }
.sort-select:hover  { background-color: var(--on-dom-20); }

/* ── RESULTS HEADER ── */
.results-head {
  display: flex; align-items: baseline; gap: var(--s2);
  padding: var(--s6) var(--s8) var(--s4);
  max-width: 1920px; margin: 0 auto;
  position: relative; z-index: 1;
}
.results-count { font-family: var(--ff-d); font-size: 24px; font-weight: 500; color: var(--on-dom); letter-spacing: -0.02em; }
.results-count em { font-style: italic; color: #fff176; }
.results-label { font-size: 13px; color: var(--on-dom-60); }

/* ── CARER GRID ── */
.grid-outer {
  padding: 0 var(--s8) var(--s16);
  max-width: 1920px; margin: 0 auto;
  position: relative; z-index: 1;
}
.carer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: var(--s4);
}

/* ── EMPTY STATE ── */
.empty-state {
  grid-column: 1/-1; padding: var(--s16) var(--s8);
  display: flex; flex-direction: column; align-items: center; gap: var(--s3); text-align: center;
}
.empty-icon {
  width: 64px; height: 64px; border-radius: var(--r16);
  background: var(--on-dom-12); border: 1px solid var(--on-dom-20);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin-bottom: var(--s2); backdrop-filter: blur(8px);
}
.empty-title  { font-family: var(--ff-d); font-size: 20px; font-style: italic; color: var(--on-dom); }
.empty-sub    { font-size: 13px; color: rgba(255,255,255,0.70); max-width: 280px; line-height: 1.6; }
.empty-action {
  margin-top: var(--s2); padding: 9px 22px;
  background: var(--surf); border: none; border-radius: var(--rF);
  color: var(--dom-dk); font-family: var(--ff-ui); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.13s ease; box-shadow: var(--sh-sm);
}
.empty-action:hover { background: var(--surf-2); transform: translateY(-1px); box-shadow: var(--sh-md); }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
.hero-section { animation: fadeUp 0.6s cubic-bezier(0.22,0.68,0,1) both 0.05s; }
.search-frame { animation: fadeUp 0.6s cubic-bezier(0.22,0.68,0,1) both 0.14s; }
.trust-strip  { animation: fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.22s; }
.filter-bar   { animation: fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.28s; }
.card:nth-child(1){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.32s}
.card:nth-child(2){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.37s}
.card:nth-child(3){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.42s}
.card:nth-child(4){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.47s}
.card:nth-child(5){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.40s}
.card:nth-child(6){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.45s}
.card:nth-child(7){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.50s}
.card:nth-child(8){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.55s}

@media(max-width:640px) {
  .hero-section { padding: var(--s10) var(--s4) var(--s8); }
  .search-frame { flex-direction: column; border-radius: var(--r12); gap: var(--s1); }
  .sf-sep { display: none; }
  .filter-bar, .grid-outer, .results-head { padding-left: var(--s4); padding-right: var(--s4); }
  .trust-strip { gap: var(--s5); padding: 12px var(--s4); }
}
`;

/* ─────────────────────────────────────────────
   DATOS (en prod vendrían de props/API)
───────────────────────────────────────────── */
const CARERS: Carer[] = [
  {
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    name: 'Sara González',
    spec: 'Cuidadora de adultos mayores',
    avail: true,
    stars: 4.9,
    reviews: 184,
    cat: 'adultos',
    services: [
      { tipo: 'adultos_mayores', descripcion: 'Cuidado a domicilio para mayores con movilidad reducida', precio_hora: 18, precio_oferta: 14, oferta_activa: true },
      { tipo: 'ninos',           descripcion: 'Cuidado de niños con actividades educativas', precio_hora: 16, precio_oferta: null, oferta_activa: false },
    ],
  },
];

const CATS = [
  { key:'todos',    label:'Todos',    emoji:'✦'  },
  { key:'adultos',  label:'Mayores',  emoji:'👴' },
  { key:'ninos',    label:'Niños',    emoji:'👶' },
  { key:'mascotas', label:'Mascotas', emoji:'🐾' },
];

const USER: CarerLayoutUser = {
  name: 'Sara González',
  email: 'sara@email.com',
  initials: 'SG',
  city: 'Madrid',
};

const PROFILE_STEPS: ProfileStep[] = [
  { label:'Foto de perfil',         done:true  },
  { label:'Número verificado',      done:true  },
  { label:'Dirección completa',     done:true  },
  { label:'Método de pago',         done:false },
  { label:'Preferencias guardadas', done:false },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function TQidoHome() {
  const [cat,    setCat]    = useState('todos');
  const [avail,  setAvail]  = useState('todos');
  const [sort,   setSort]   = useState('rating');
  const [favs,   setFavs]   = useState(new Set<number>());
  const [search, setSearch] = useState('');
  const [activeNav, setActiveNav] = useState('Explorar');

  const toggleFav = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = CARERS
    .filter(c => cat   === 'todos' || c.cat === cat)
    .filter(c => avail === 'todos' || c.avail)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.spec.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'rating')      return b.stars - a.stars;
      return 0;
    });

  const reset    = () => { setCat('todos'); setAvail('todos'); setSearch(''); };
  const countCat = (k: string) => CARERS.filter(c => k === 'todos' || c.cat === k).length;
  const hasFilter = cat !== 'todos' || avail !== 'todos' || search;

  const navLinks: NavLink[] = ['Explorar', 'Mis reservas', 'Favoritos'].map(label => ({
    label,
    active: activeNav === label,
    onClick: () => setActiveNav(label),
  }));

  const dropdownItems: DropdownItem[] = [
    { icon:'👤', label:'Mi perfil' },
    { icon:'📅', label:'Mis reservas', badge: 2 },
    { icon:'❤️', label:'Favoritos',    badge: Math.max(favs.size, 4) },
    { icon:'💳', label:'Métodos de pago' },
    { icon:'⚙️', label:'Ajustes' },
    { icon:'↩',  label:'Cerrar sesión', danger: true, onClick: () => router.post('/logout') },
  ];

  return (
    <>
      {/* Estilos: página + card (importado del componente) */}
      <style>{pageCss}{carerCardCss}</style>

      <CarerLayout
        user={USER}
        navLinks={navLinks}
        notifCount={1}
        profileSteps={PROFILE_STEPS}
        dropdownItems={dropdownItems}
      >
        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="hero-pill">
            <div className="hero-pill-dot" />
            Madrid · 48 cuidadores activos
          </div>
          <h1 className="hero-title">
            Hola, <em>{USER.name.split(' ')[0]}</em> 👋<br />
            ¿A quién cuidamos hoy?
          </h1>
          <p className="hero-sub">
            Cuidadores verificados, con experiencia real y reseñas de familias como la tuya.
          </p>

          <div className="search-frame">
            <div className="sf">
              <div className="sf-label">¿Para quién?</div>
              <div className="sf-val">Adulto mayor, niño, mascota…</div>
            </div>
            <div className="sf-sep" />
            <div className="sf">
              <div className="sf-label">¿Cuándo?</div>
              <div className="sf-val">Hoy · Esta semana</div>
            </div>
            <div className="sf-sep" />
            <div className="sf" style={{ flex: '0 0 auto', minWidth: 160 }}>
              <div className="sf-label">Buscar</div>
              <input
                className="sf-input"
                placeholder="Nombre o especialidad…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="search-cta">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
                <path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Buscar
            </button>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="trust-strip">
          {[
            ['✓',  'Cuidadores verificados'],
            ['🔒', 'Pago seguro'],
            ['⭐', '4.9 de media · +1.200 reseñas'],
            ['💬', 'Soporte 24 h'],
          ].map(([icon, label]) => (
            <div className="trust-item" key={label}>
              <div className="trust-icon-wrap">{icon}</div>
              {label}
            </div>
          ))}
        </div>

        {/* ── FILTER BAR ── */}
        <div className="filter-bar">
          <span className="filter-label">Filtrar</span>
          {CATS.map(o => (
            <button
              key={o.key}
              className={`chip${cat === o.key ? ' on' : ''}`}
              onClick={() => setCat(o.key)}
            >
              {o.emoji} {o.label}
              {o.key !== 'todos' && <span className="chip-count">{countCat(o.key)}</span>}
            </button>
          ))}
          <button
            className={`chip${avail === 'disponible' ? ' on' : ''}`}
            onClick={() => setAvail(a => a === 'disponible' ? 'todos' : 'disponible')}
          >
            <span className="chip-status" style={{ background: avail === 'disponible' ? '#fff' : 'var(--dom-lt)' }} />
            Disponibles hoy
          </button>
          {hasFilter && (
            <button className="chip chip-clear" onClick={reset}>✕ Quitar filtros</button>
          )}
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="rating">Mejor valorados</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </div>

        {/* ── RESULTS HEADER ── */}
        <div className="results-head">
          <div className="results-count">
            <em>{filtered.length}</em> cuidador{filtered.length !== 1 ? 'es' : ''}
          </div>
          <div className="results-label">
            {hasFilter ? 'con los filtros aplicados' : 'disponibles en tu zona'}
          </div>
        </div>

        {/* ── GRID — usa CarerCard importada ── */}
        <div className="grid-outer">
          <div className="carer-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-title">Sin resultados</div>
                <div className="empty-sub">
                  Ningún cuidador cumple los filtros actuales. Prueba ajustando los criterios.
                </div>
                <button className="empty-action" onClick={reset}>Ver todos los cuidadores</button>
              </div>
            ) : filtered.map(c => (
              <CarerCard
                key={c.id}
                carer={c}
                isFav={favs.has(c.id)}
                onToggleFav={toggleFav}
                onBook={(carer: Carer) => console.log('Reservar', carer.name)}
              />
            ))}
          </div>
        </div>
      </CarerLayout>
    </>
  );
}