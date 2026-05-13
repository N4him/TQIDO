import { useState } from 'react';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Carer {
  id: number;
  av: string;
  bg: string;
  name: string;
  spec: string;
  price: number;
  tags: string[];
  avail: boolean;
  stars: number;
  reviews: number;
  cat: 'adultos' | 'ninos' | 'mascotas';
  since: string;
  bookings: number;
  responseTime: string;
  distance: string;
}

interface ToastState {
  carer: Carer;
  timer: ReturnType<typeof setTimeout>;
}

interface CatFilter {
  key: string;
  label: string;
  emoji: string;
  color: string;
}

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
:root {
  --dom:#5a96e8; --dom-lt:#7ab0f0;
  --dom-dk:#3a78cc; --dom-xdk:#2260b0; --dom-deep:#1a4a90;
  --on-dom:#ffffff;
  --on-dom-80:rgba(255,255,255,0.80); --on-dom-60:rgba(255,255,255,0.60);
  --on-dom-40:rgba(255,255,255,0.40); --on-dom-20:rgba(255,255,255,0.20);
  --on-dom-12:rgba(255,255,255,0.12); --on-dom-08:rgba(255,255,255,0.08);
  --surf:#ffffff; --surf-2:#f4f8fe; --surf-3:#e8f0fb;
  --ink:#0d1e2e; --ink-2:#1b3348; --muted:#4a6b88; --faint:#96b2cc;
  --success:#12B76A; --warning:#F79009; --error:#F04438;
  --sh-xs:0 1px 3px rgba(20,50,100,0.18);
  --sh-sm:0 2px 8px rgba(20,50,100,0.20),0 1px 2px rgba(20,50,100,0.12);
  --sh-md:0 6px 16px rgba(20,50,100,0.22),0 2px 4px rgba(20,50,100,0.10);
  --sh-lg:0 14px 32px rgba(20,50,100,0.26),0 4px 8px rgba(20,50,100,0.12);
  --sh-xl:0 24px 48px rgba(20,50,100,0.30),0 8px 16px rgba(20,50,100,0.14);
  --r4:4px; --r8:8px; --r12:12px; --r16:16px; --r24:24px; --rF:9999px;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px; --s6:24px;
  --s8:32px; --s10:40px; --s12:48px; --s16:64px;
  --ff-ui:'Plus Jakarta Sans',system-ui,sans-serif;
  --ff-d:'Lora',Georgia,serif;
}
html,body { min-height:100%; background:#4aa2db; font-family:var(--ff-ui); color:var(--on-dom); -webkit-font-smoothing:antialiased; }
body::before { content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
  background:linear-gradient(160deg,#3e8fd4 0%,#4aa2db 45%,#3578c0 100%); }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--dom-dk); }
::-webkit-scrollbar-thumb { background:var(--dom-lt); border-radius:4px; }

/* ── NAV ── */
.nav { position:sticky; top:0; z-index:100; height:72px; padding:0 var(--s8);
  display:flex; align-items:center; justify-content:space-between;
  background:rgba(74,162,219,0.82); backdrop-filter:blur(28px) saturate(1.8);
  border-bottom:1px solid var(--on-dom-20);
  box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 4px 24px rgba(26,74,144,.22); }
.nav-logo-text { font-family:var(--ff-d); font-size:22px; font-weight:500; color:var(--on-dom); font-style:italic; }
.nav-center { display:flex; align-items:center; gap:3px; background:var(--on-dom-08);
  border:1px solid var(--on-dom-20); border-radius:var(--rF); padding:4px; }
.nav-pill { padding:8px 22px; border-radius:var(--rF); font-size:13.5px; font-weight:500;
  color:var(--on-dom-60); background:none; border:none; font-family:var(--ff-ui); cursor:pointer; transition:all .18s ease; }
.nav-pill:hover { color:var(--on-dom); background:var(--on-dom-12); }
.nav-pill.active { color:var(--dom-dk); background:var(--on-dom); font-weight:700; box-shadow:var(--sh-xs); }
.nav-right { display:flex; align-items:center; gap:var(--s3); }
.nav-notif { width:42px; height:42px; border-radius:var(--r8); background:var(--on-dom-12);
  border:1px solid var(--on-dom-20); display:flex; align-items:center; justify-content:center;
  font-size:17px; cursor:pointer; position:relative; transition:all .15s ease; }
.nav-notif:hover { background:var(--on-dom-20); }
.nav-notif-dot { position:absolute; top:7px; right:7px; width:8px; height:8px; border-radius:50%;
  background:#fff176; border:2px solid var(--dom-dk); }
.nav-avatar-trigger { width:42px; height:42px; border-radius:50%; border:2px solid var(--on-dom-40);
  background:var(--on-dom-12); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .15s ease; }
.nav-avatar-trigger:hover { border-color:var(--on-dom-80); transform:scale(1.06); }
.nav-avatar { width:100%; height:100%; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:700; color:var(--dom-dk); background:var(--on-dom); }

/* ── PAGE SHELL ── */
.page { position:relative; z-index:1; max-width:1600px; margin:0 auto; padding:0 var(--s6); }

/* ── HERO HEADER ── */
.hero { padding:var(--s8) 0 var(--s6);
  animation:fadeUp .5s cubic-bezier(0.22,0.68,0,1) both .05s; }
.hero-eyebrow { display:flex; align-items:center; gap:var(--s2); margin-bottom:var(--s3); }
.hero-eyebrow-line { height:1px; width:32px; background:var(--on-dom-40); }
.hero-eyebrow-text { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--on-dom-60); }
.hero-title { font-family:var(--ff-d); font-size:clamp(26px,4vw,36px); font-weight:500;
  color:var(--on-dom); letter-spacing:-0.025em; line-height:1.15; margin-bottom:var(--s2); }
.hero-title em { font-style:italic; color:#fff176; }
.hero-sub { font-size:14px; color:var(--on-dom-60); line-height:1.6; }

/* ── STAT CARDS ── */
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--s3);
  margin-bottom:var(--s6);
  animation:fadeUp .5s cubic-bezier(0.22,0.68,0,1) both .12s; }
.stat-card { background:var(--on-dom-12); border:1px solid var(--on-dom-20);
  border-radius:var(--r16); padding:var(--s4) var(--s5);
  backdrop-filter:blur(10px); transition:all .2s ease; cursor:default; }
.stat-card:hover { background:var(--on-dom-20); transform:translateY(-3px); box-shadow:var(--sh-md); }
.stat-icon { font-size:20px; margin-bottom:var(--s2); }
.stat-value { font-family:var(--ff-d); font-size:30px; font-weight:500; color:var(--on-dom);
  letter-spacing:-0.03em; line-height:1; margin-bottom:2px; }
.stat-value em { font-style:italic; color:#fff176; }
.stat-label { font-size:11px; color:var(--on-dom-60); }

/* ── TOOLBAR ── */
.toolbar { display:flex; align-items:center; gap:var(--s2); flex-wrap:wrap;
  padding-top:var(--s6); padding-bottom:var(--s4);
  animation:fadeUp .5s cubic-bezier(0.22,0.68,0,1) both .18s; }
.filter-section { display:flex; align-items:center; gap:6px; flex-wrap:wrap; flex:1; }
.filter-label { font-size:10.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  color:var(--on-dom-60); margin-right:2px; white-space:nowrap; }
.chip { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border-radius:var(--rF);
  font-size:12.5px; font-weight:500; color:var(--on-dom-80);
  background:var(--on-dom-08); border:1px solid var(--on-dom-20);
  cursor:pointer; transition:all .15s ease; font-family:var(--ff-ui); white-space:nowrap;
  backdrop-filter:blur(8px); }
.chip:hover { background:var(--on-dom-20); color:var(--on-dom); border-color:var(--on-dom-40); }
.chip.on { background:var(--surf); color:var(--dom-dk); border-color:rgba(255,255,255,.95);
  box-shadow:var(--sh-sm); font-weight:700; }
.chip-count { font-size:9.5px; font-weight:700; background:var(--on-dom-20);
  border-radius:var(--rF); padding:1px 6px; }
.chip.on .chip-count { background:var(--surf-3); color:var(--dom-dk); }
.avail-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; transition:background .15s; }
.sort-select { padding:6px 30px 6px 13px; border-radius:var(--r8); font-size:12.5px; font-weight:500;
  color:var(--on-dom); background:var(--on-dom-08); border:1px solid var(--on-dom-20);
  cursor:pointer; font-family:var(--ff-ui); outline:none; appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 10px center;
  transition:all .13s ease; backdrop-filter:blur(8px); }
.sort-select option { background:#2260b0; color:#fff; }
.sort-select:hover { background-color:var(--on-dom-20); }

/* ── RESULTS BAR ── */
.results-bar { display:flex; align-items:center; justify-content:space-between;
  padding-bottom:var(--s4); }
.results-text { font-size:12px; color:var(--on-dom-60); }
.results-text strong { font-family:var(--ff-d); font-size:15px; font-style:italic;
  color:var(--on-dom); font-weight:400; margin-right:3px; }

/* ── GRID ── */
.fav-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
  gap:var(--s4); padding-bottom:var(--s16); }

/* ── CARD ── */
.card { background:var(--surf); border-radius:var(--r16); border:1px solid rgba(255,255,255,0.88);
  box-shadow:var(--sh-md); overflow:hidden; display:flex; flex-direction:column;
  position:relative; cursor:pointer;
  transition:transform .28s cubic-bezier(0.34,1.2,0.64,1), box-shadow .28s ease;
  animation:fadeUp .42s cubic-bezier(0.22,0.68,0,1) both; }
.card:hover { transform:translateY(-6px); box-shadow:var(--sh-xl); }
.card.removing { opacity:0; transform:scale(0.93) translateY(10px); transition:all .3s ease; }

/* card header band */
.card-band { height:120px; position:relative; overflow:hidden; flex-shrink:0; }
.card-band-bg { position:absolute; inset:0; }
.card-band-overlay { position:absolute; inset:0;
  background:linear-gradient(to top,rgba(10,26,42,0.6) 0%,rgba(10,26,42,0.1) 55%,transparent 100%); }

/* avatar floating */
.card-av-wrap { position:absolute; bottom:-18px; left:var(--s4); }
.card-av { width:40px; height:40px; border-radius:var(--r12); display:flex; align-items:center;
  justify-content:center; font-size:13px; font-weight:700; color:#fff;
  border:3px solid #fff; box-shadow:var(--sh-sm); }

/* availability pill */
.avail-pill { position:absolute; top:10px; left:10px; display:flex; align-items:center; gap:5px;
  background:rgba(255,255,255,.94); border-radius:var(--rF); padding:4px 10px;
  box-shadow:var(--sh-xs); backdrop-filter:blur(12px); }
.avail-pip { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.avail-label { font-size:9.5px; font-weight:700; letter-spacing:.02em; }

/* fav button */
.fav-btn { position:absolute; top:10px; right:10px; width:34px; height:34px; border-radius:var(--r8);
  background:rgba(255,255,255,.94); display:flex; align-items:center; justify-content:center;
  font-size:15px; cursor:pointer; border:none;
  box-shadow:var(--sh-xs); backdrop-filter:blur(12px);
  transition:transform .2s cubic-bezier(0.34,1.2,0.64,1), box-shadow .2s ease; }
.fav-btn:hover { transform:scale(1.18); box-shadow:var(--sh-sm); }
.fav-btn:active { transform:scale(0.9); }

/* since chip */
.since-chip { position:absolute; bottom:10px; right:10px;
  background:rgba(0,0,0,.42); border-radius:var(--r4); padding:3px 8px;
  font-size:9.5px; font-weight:600; color:rgba(255,255,255,.85); backdrop-filter:blur(8px); }

/* card body */
.card-body { padding:28px var(--s4) var(--s4); flex:1; display:flex; flex-direction:column; gap:var(--s3); }
.card-name-row { display:flex; align-items:flex-start; justify-content:space-between; gap:var(--s2); }
.card-name { font-family:var(--ff-d); font-size:16px; font-weight:500; color:var(--ink); letter-spacing:-0.01em; line-height:1.3; }
.card-spec { font-size:12px; color:var(--muted); }

/* rating */
.card-rating { display:flex; align-items:center; gap:6px; }
.stars { color:#F79009; font-size:10px; letter-spacing:1.5px; }
.rating-num { font-size:12px; font-weight:700; color:var(--ink); }
.review-cnt { font-size:11px; color:var(--faint); }

/* quick stats */
.card-quick { display:flex; gap:var(--s3); }
.quick-item { display:flex; align-items:center; gap:4px; font-size:11px; color:var(--muted); }
.quick-icon { font-size:11px; }
.quick-val { font-weight:600; color:var(--ink-2); }

/* tags */
.card-tags { display:flex; gap:4px; flex-wrap:wrap; }
.card-tag { padding:2px 8px; border-radius:var(--r4); font-size:10px; font-weight:600;
  background:#e8f0fb; color:var(--dom-deep); border:1px solid #c8dcf5; }

/* price row */
.card-price-row { display:flex; align-items:center; justify-content:space-between;
  padding-top:var(--s3); border-top:1px solid var(--surf-3); margin-top:auto; }
.price-block { display:flex; align-items:baseline; gap:2px; }
.price-val { font-family:var(--ff-d); font-size:24px; font-weight:500; color:var(--ink); letter-spacing:-0.02em; }
.price-unit { font-size:11px; color:var(--muted); }
.bookings-badge { display:flex; align-items:center; gap:4px; padding:3px 10px;
  border-radius:var(--rF); background:var(--surf-3); border:1px solid #c8dcf5; }
.bookings-badge-num { font-size:12px; font-weight:700; color:var(--dom-dk); }
.bookings-badge-label { font-size:10px; color:var(--muted); }

/* CTA row — hidden until hover */
.card-cta { display:flex; gap:var(--s2); padding:0 var(--s4);
  background:var(--surf-2); border-top:1px solid var(--surf-3);
  max-height:0; opacity:0; overflow:hidden;
  transition:all .28s cubic-bezier(0.34,1.2,0.64,1); }
.card:hover .card-cta { max-height:60px; opacity:1; padding:var(--s3) var(--s4) var(--s4); }
.btn-p { flex:1; padding:9px 12px; border-radius:var(--r8);
  background:linear-gradient(135deg,var(--dom-deep),var(--dom-dk));
  color:#fff; font-family:var(--ff-ui); font-size:12px; font-weight:600;
  border:none; cursor:pointer; box-shadow:var(--sh-sm);
  transition:all .14s ease; white-space:nowrap; }
.btn-p:hover { background:linear-gradient(135deg,var(--dom-xdk),var(--dom-deep)); transform:translateY(-1px); }
.btn-s { padding:9px 14px; border-radius:var(--r8); background:transparent; color:var(--muted);
  font-family:var(--ff-ui); font-size:12px; font-weight:600;
  border:1px solid var(--surf-3); cursor:pointer; transition:all .14s ease; white-space:nowrap; }
.btn-s:hover { border-color:#c8dcf5; color:var(--dom-dk); background:var(--surf); }

/* ── EMPTY ── */
.empty { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:var(--s3);
  text-align:center; padding:var(--s16) var(--s8); }
.empty-ico { font-size:40px; margin-bottom:var(--s2); }
.empty-title { font-family:var(--ff-d); font-size:22px; font-style:italic; color:var(--on-dom); }
.empty-sub { font-size:13px; color:var(--on-dom-60); max-width:300px; line-height:1.65; }
.empty-btn { margin-top:var(--s3); padding:10px 26px; background:var(--surf); border:none;
  border-radius:var(--rF); color:var(--dom-dk); font-family:var(--ff-ui); font-size:13px; font-weight:600;
  cursor:pointer; transition:all .14s ease; box-shadow:var(--sh-sm); }
.empty-btn:hover { background:var(--surf-2); transform:translateY(-1px); }

/* ── TOAST ── */
.toast { position:fixed; bottom:var(--s8); left:50%; transform:translateX(-50%) translateY(20px);
  background:var(--ink); color:#fff; padding:13px 22px; border-radius:var(--rF);
  font-size:13px; font-weight:500; display:flex; align-items:center; gap:var(--s3);
  box-shadow:var(--sh-xl); z-index:999; opacity:0;
  transition:all .32s cubic-bezier(0.34,1.2,0.64,1); pointer-events:none; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); pointer-events:all; }
.toast-undo { background:none; border:none; color:#fff176; font-weight:700; font-size:13px;
  cursor:pointer; font-family:var(--ff-ui); padding:0; text-decoration:underline; }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
.card:nth-child(1){animation-delay:.22s}
.card:nth-child(2){animation-delay:.28s}
.card:nth-child(3){animation-delay:.34s}
.card:nth-child(4){animation-delay:.40s}
.card:nth-child(5){animation-delay:.46s}
.card:nth-child(6){animation-delay:.52s}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .page { padding:0 var(--s4); }
  .stats-row { grid-template-columns:repeat(2,1fr); }
  .fav-grid { grid-template-columns:1fr; }
  .nav { padding:0 var(--s4); }
  .nav-center { display:none; }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const INITIAL_FAVS: Carer[] = [
  { id:1, av:'MC', bg:'linear-gradient(135deg,#0D56A0,#1A8EE6)',
    name:'María Carrasco', spec:'Adultos mayores · Niños',
    price:18, tags:['Primeros auxilios','Enfermería'],
    avail:true, stars:4.9, reviews:24, cat:'adultos',
    since:'feb. 2025', bookings:3, responseTime:'< 1 h', distance:'0.8 km' },
  { id:2, av:'LP', bg:'linear-gradient(135deg,#0b6b45,#12B76A)',
    name:'Laura Pons', spec:'Niños y bebés',
    price:16, tags:['Pedagogía','Inglés'],
    avail:true, stars:4.8, reviews:18, cat:'ninos',
    since:'mar. 2025', bookings:2, responseTime:'< 2 h', distance:'1.2 km' },
  { id:3, av:'AS', bg:'linear-gradient(135deg,#0A3D78,#3AA5F5)',
    name:'Ana Suárez', spec:'Mayores · Discapacidad',
    price:20, tags:['Enfermería','Fisioterapia'],
    avail:true, stars:5.0, reviews:31, cat:'adultos',
    since:'ene. 2025', bookings:5, responseTime:'< 30 min', distance:'2.1 km' },
  { id:5, av:'DM', bg:'linear-gradient(135deg,#0D56A0,#76C3FF)',
    name:'Diego Molina', spec:'Niños · Actividades',
    price:15, tags:['Ed. física','Manualidades'],
    avail:true, stars:4.7, reviews:12, cat:'ninos',
    since:'abr. 2025', bookings:1, responseTime:'< 3 h', distance:'0.5 km' },
  { id:6, av:'IG', bg:'linear-gradient(135deg,#0A3D78,#1A8EE6)',
    name:'Isabel García', spec:'Adultos mayores · Compañía',
    price:17, tags:['Gerontología','Compañía'],
    avail:false, stars:4.9, reviews:22, cat:'adultos',
    since:'mar. 2025', bookings:4, responseTime:'< 1 h', distance:'3.0 km' },
  { id:8, av:'PM', bg:'linear-gradient(135deg,#0D56A0,#AEDCFF)',
    name:'Pablo Martín', spec:'Mascotas · Entrenamiento',
    price:13, tags:['Entrenador','Paseos'],
    avail:true, stars:4.5, reviews:7, cat:'mascotas',
    since:'may. 2025', bookings:0, responseTime:'< 4 h', distance:'1.8 km' },
];

const CAT_FILTERS: CatFilter[] = [
  { key:'todos',    label:'Todos',    emoji:'✦',  color:'var(--dom-dk)' },
  { key:'adultos',  label:'Mayores',  emoji:'👴', color:'#0D56A0' },
  { key:'ninos',    label:'Niños',    emoji:'👶', color:'#0b6b45' },
  { key:'mascotas', label:'Mascotas', emoji:'🐾', color:'#7c2d12' },
];

const starsStr = (n: number): string =>
  '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function MisFavoritos() {
  const [favs,      setFavs]      = useState<Carer[]>(INITIAL_FAVS);
  const [cat,       setCat]       = useState<string>('todos');
  const [availOnly, setAvailOnly] = useState<boolean>(false);
  const [sort,      setSort]      = useState<string>('recientes');
  const [activeNav, setActiveNav] = useState<string>('Favoritos');
  const [toast,     setToast]     = useState<ToastState | null>(null);
  const [removing,  setRemoving]  = useState<number | null>(null);

  const removeFav = (carer: Carer): void => {
    setRemoving(carer.id);
    setTimeout(() => {
      setFavs(prev => prev.filter(c => c.id !== carer.id));
      setRemoving(null);
    }, 300);
    if (toast?.timer) clearTimeout(toast.timer);
    const timer = setTimeout(() => setToast(null), 4000);
    setToast({ carer, timer });
  };

  const undoRemove = (): void => {
    if (!toast) return;
    clearTimeout(toast.timer);
    setFavs(prev => {
      if (prev.find(c => c.id === toast.carer.id)) return prev;
      const original = INITIAL_FAVS.find(c => c.id === toast.carer.id);
      return original
        ? [...prev, original].sort((a, b) => INITIAL_FAVS.indexOf(a) - INITIAL_FAVS.indexOf(b))
        : prev;
    });
    setToast(null);
  };

  const filtered: Carer[] = favs
    .filter((c: Carer) => cat === 'todos' || c.cat === cat)
    .filter((c: Carer) => !availOnly || c.avail)
    .sort((a: Carer, b: Carer) => {
      if (sort === 'recientes')   return b.id - a.id;
      if (sort === 'valoracion')  return b.stars - a.stars;
      if (sort === 'precio-asc')  return a.price - b.price;
      if (sort === 'precio-desc') return b.price - a.price;
      if (sort === 'reservas')    return b.bookings - a.bookings;
      return 0;
    });

  const countCat  = (k: string): number => favs.filter((c: Carer) => k === 'todos' || c.cat === k).length;
  const avgRating = favs.length
    ? (favs.reduce((s: number, c: Carer) => s + c.stars, 0) / favs.length).toFixed(1)
    : '-';
  const availCount = favs.filter((c: Carer) => c.avail).length;
  const totalBookings = favs.reduce((s: number, c: Carer) => s + c.bookings, 0);

  const navLinks: string[] = ['Explorar', 'Mis reservas', 'Favoritos'];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo-text">TQido</span>
        <div className="nav-center">
          {navLinks.map((l: string) => (
            <button key={l} className={`nav-pill${activeNav === l ? ' active' : ''}`}
              onClick={() => setActiveNav(l)}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="nav-notif">🔔<div className="nav-notif-dot" /></button>
          <div className="nav-avatar-trigger"><div className="nav-avatar">SG</div></div>
        </div>
      </nav>

      <div className="page">

        {/* TOOLBAR */}
        <div className="toolbar">
          <div className="filter-section">
            <span className="filter-label">Filtrar</span>
            {CAT_FILTERS.map((f: CatFilter) => (
              <button key={f.key}
                className={`chip${cat === f.key ? ' on' : ''}`}
                onClick={() => setCat(f.key)}>
                {f.emoji} {f.label}
                {f.key !== 'todos' && <span className="chip-count">{countCat(f.key)}</span>}
              </button>
            ))}
            <button className={`chip${availOnly ? ' on' : ''}`}
              onClick={() => setAvailOnly((v: boolean) => !v)}>
              <span className="avail-dot" style={{ background: availOnly ? 'var(--success)' : 'rgba(255,255,255,0.4)' }} />
              Disponibles hoy
            </button>
          </div>
          <select className="sort-select" value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}>
            <option value="recientes">Más recientes</option>
            <option value="valoracion">Mejor valorados</option>
            <option value="reservas">Más reservados</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </div>

        {/* RESULTS BAR */}
        <div className="results-bar">
          <span className="results-text">
            <strong>{filtered.length}</strong>
            cuidador{filtered.length !== 1 ? 'es' : ''}
            {cat !== 'todos' ? ` · ${CAT_FILTERS.find((f: CatFilter) => f.key === cat)?.label}` : ''}
            {availOnly ? ' · Disponibles' : ''}
          </span>
        </div>

        {/* GRID */}
        <div className="fav-grid">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">❤️</div>
              <div className="empty-title">Sin resultados</div>
              <div className="empty-sub">No hay cuidadores con los filtros actuales. Prueba ajustando los criterios.</div>
              <button className="empty-btn" onClick={() => { setCat('todos'); setAvailOnly(false); }}>
                Ver todos
              </button>
            </div>
          ) : (
            filtered.map((c: Carer) => (
              <div key={c.id} className={`card${removing === c.id ? ' removing' : ''}`}>
                {/* Band */}
                <div className="card-band">
                  <div className="card-band-bg" style={{ background: c.bg }} />
                  <div className="card-band-overlay" />

                  <div className="avail-pill">
                    <div className="avail-pip" style={{ background: c.avail ? '#12B76A' : '#96b2cc' }} />
                    <span className="avail-label" style={{ color: c.avail ? '#065f46' : '#4a6b88' }}>
                      {c.avail ? 'Disponible' : 'Ocupado/a'}
                    </span>
                  </div>

                  <button className="fav-btn" onClick={() => removeFav(c)} title="Quitar de favoritos">
                    ❤️
                  </button>

                  <div className="since-chip">⭐ Fav. desde {c.since}</div>

                  <div className="card-av-wrap">
                    <div className="card-av" style={{ background: c.bg }}>{c.av}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div>
                    <div className="card-name">{c.name}</div>
                    <div className="card-spec">{c.spec}</div>
                  </div>

                  <div className="card-rating">
                    <span className="stars">{starsStr(c.stars)}</span>
                    <span className="rating-num">{c.stars}</span>
                    <span className="review-cnt">({c.reviews} reseñas)</span>
                  </div>

                  <div className="card-quick">
                    <div className="quick-item">
                      <span className="quick-icon">⚡</span>
                      <span>Responde</span>
                      <span className="quick-val">{c.responseTime}</span>
                    </div>
                    <div className="quick-item">
                      <span className="quick-icon">📍</span>
                      <span className="quick-val">{c.distance}</span>
                    </div>
                  </div>

                  <div className="card-tags">
                    {c.tags.map((t: string) => (
                      <span key={t} className="card-tag">{t}</span>
                    ))}
                  </div>

                  <div className="card-price-row">
                    <div className="price-block">
                      <span className="price-val">€{c.price}</span>
                      <span className="price-unit">/hora</span>
                    </div>
                    {c.bookings > 0 ? (
                      <div className="bookings-badge">
                        <span className="bookings-badge-num">{c.bookings}</span>
                        <span className="bookings-badge-label">reserva{c.bookings !== 1 ? 's' : ''} contigo</span>
                      </div>
                    ) : (
                      <div className="bookings-badge">
                        <span className="bookings-badge-label" style={{ color: 'var(--faint)' }}>Sin reservas aún</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="card-cta">
                  <button className="btn-p">Reservar ahora</button>
                  <button className="btn-s">Ver perfil</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast${toast ? ' show' : ''}`}>
        <span>❤️ {toast?.carer.name} eliminado/a</span>
        <button className="toast-undo" onClick={undoRemove}>Deshacer</button>
      </div>
    </>
  );
}