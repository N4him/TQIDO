import { router } from '@inertiajs/react';
import { useState } from 'react';

const layoutCss = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --dom:#5a96e8; --dom-lt:#7ab0f0; --dom-llt:#a0c8f8;
  --dom-dk:#3a78cc; --dom-xdk:#2260b0; --dom-deep:#1a4a90;
  --on-dom:#ffffff; --on-dom-80:rgba(255,255,255,0.80);
  --on-dom-60:rgba(255,255,255,0.60); --on-dom-40:rgba(255,255,255,0.40);
  --on-dom-20:rgba(255,255,255,0.20); --on-dom-12:rgba(255,255,255,0.12);
  --on-dom-08:rgba(255,255,255,0.08);
  --surf:#ffffff; --surf-2:#f4f8fe; --surf-3:#e8f0fb;
  --surf-border:rgba(90,150,232,0.18);
  --ink:#0d1e2e; --ink-2:#1b3348; --muted:#4a6b88; --faint:#96b2cc;
  --success:#12B76A; --warning:#F79009; --error:#F04438;
  --sh-xs:0 1px 3px rgba(20,50,100,0.18);
  --sh-sm:0 2px 8px rgba(20,50,100,0.20),0 1px 2px rgba(20,50,100,0.12);
  --sh-md:0 6px 16px rgba(20,50,100,0.22),0 2px 4px rgba(20,50,100,0.10);
  --sh-lg:0 14px 32px rgba(20,50,100,0.26),0 4px 8px rgba(20,50,100,0.12);
  --sh-xl:0 24px 48px rgba(20,50,100,0.30),0 8px 16px rgba(20,50,100,0.14);
  --sh-glow:0 4px 20px rgba(26,74,144,0.50);
  --r4:4px; --r8:8px; --r12:12px; --r16:16px; --r24:24px; --rF:9999px;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px; --s6:24px;
  --s8:32px; --s10:40px; --s12:48px; --s16:64px;
  --ff-ui:'Plus Jakarta Sans',system-ui,sans-serif;
  --ff-d:'Lora',Georgia,serif;
}
html,body { min-height:100%; background:#4aa2db; font-family:var(--ff-ui); color:var(--on-dom); -webkit-font-smoothing:antialiased; }
body::before { content:''; position:fixed; inset:0; pointer-events:none; z-index:0; background:linear-gradient(160deg,#3e8fd4 0%,#4aa2db 45%,#3578c0 100%); }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--dom-dk); }
::-webkit-scrollbar-thumb { background:var(--dom-lt); border-radius:4px; }

/* NAV */
.nav { position:sticky; top:0; z-index:100; height:72px; padding:0 var(--s8);
  display:flex; align-items:center; justify-content:space-between;
  background:rgba(74,162,219,0.82); backdrop-filter:blur(28px) saturate(1.8);
  border-bottom:1px solid var(--on-dom-20);
  box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 4px 24px rgba(26,74,144,.22); }
.nav-logo { display:flex; align-items:center; user-select:none; }
.nav-logo-text { font-family:var(--ff-d); font-size:22px; font-weight:500; color:var(--on-dom); font-style:italic; letter-spacing:-0.01em; }
.nav-center { display:flex; align-items:center; gap:3px; background:var(--on-dom-08);
  border:1px solid var(--on-dom-20); border-radius:var(--rF); padding:4px; }
.nav-pill { padding:8px 22px; border-radius:var(--rF); font-size:13.5px; font-weight:500;
  color:var(--on-dom-60); background:none; border:none; font-family:var(--ff-ui); cursor:pointer; transition:all .18s ease; }
.nav-pill:hover { color:var(--on-dom); background:var(--on-dom-12); }
.nav-pill.active { color:var(--dom-dk); background:var(--on-dom); font-weight:700; box-shadow:var(--sh-xs); }
.nav-right { display:flex; align-items:center; gap:var(--s3); }
.nav-notif { width:42px; height:42px; border-radius:var(--r8);
  background:var(--on-dom-12); border:1px solid var(--on-dom-20);
  display:flex; align-items:center; justify-content:center; font-size:17px; cursor:pointer; position:relative; transition:all .15s ease; }
.nav-notif:hover { background:var(--on-dom-20); }
.nav-notif-dot { position:absolute; top:7px; right:7px; width:8px; height:8px; border-radius:50%; background:#fff176; border:2px solid var(--dom-dk); }
.nav-avatar-trigger { width:42px; height:42px; border-radius:50%; border:2px solid var(--on-dom-40);
  background:var(--on-dom-12); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .15s ease; }
.nav-avatar-trigger:hover { border-color:var(--on-dom-80); transform:scale(1.06); }
.nav-avatar { width:100%; height:100%; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:700; color:var(--dom-dk); background:var(--on-dom); }
`;

const pageCss = `
.page { position:relative; z-index:1; max-width:1600px; margin:0 auto; padding:0 var(--s5); }

/* ── TOOLBAR ── */
.toolbar {
  display:flex; align-items:center; gap:var(--s2);
  padding:var(--s6) 0 var(--s4);
  flex-wrap:wrap;
  animation:fadeUp .45s cubic-bezier(0.22,0.68,0,1) both .08s;
}
.toolbar-pills { display:flex; align-items:center; gap:6px; flex-wrap:wrap; flex:1; }
.tab-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:7px 16px; border-radius:var(--rF);
  font-size:13px; font-weight:500; color:var(--on-dom-80);
  background:var(--on-dom-08); border:1px solid var(--on-dom-20);
  cursor:pointer; transition:all .15s ease; font-family:var(--ff-ui);
  white-space:nowrap; backdrop-filter:blur(8px);
}
.tab-btn:hover { background:var(--on-dom-20); color:var(--on-dom); border-color:var(--on-dom-40); }
.tab-btn.active {
  background:var(--surf); color:var(--dom-dk); border-color:rgba(255,255,255,0.9);
  box-shadow:var(--sh-sm); font-weight:700;
}
.tab-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.tab-count {
  font-size:10px; font-weight:700; padding:1px 6px; border-radius:var(--rF);
  background:var(--on-dom-20); color:var(--on-dom-80);
}
.tab-btn.active .tab-count { background:var(--surf-3); color:var(--dom-dk); }

.sort-select {
  margin-left:auto; padding:7px 28px 7px 13px; border-radius:var(--r8);
  font-size:12.5px; font-weight:500; color:var(--on-dom);
  background:var(--on-dom-08); border:1px solid var(--on-dom-20);
  cursor:pointer; font-family:var(--ff-ui); outline:none; appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 10px center;
  transition:all .13s ease; backdrop-filter:blur(8px);
}
.sort-select option { background:#2260b0; color:#fff; }
.sort-select:hover { background-color:var(--on-dom-20); }

/* ── RESULTS LINE ── */
.results-line {
  display:flex; align-items:center; justify-content:space-between;
  padding-bottom:var(--s3);
  animation:fadeUp .45s cubic-bezier(0.22,0.68,0,1) both .14s;
}
.results-actions { display:flex; align-items:center; gap:8px; }
.results-text { font-size:12px; color:var(--on-dom-60); }
.results-text strong { font-family:var(--ff-d); font-size:15px; color:var(--on-dom); font-weight:400; font-style:italic; margin-right:4px; }

/* ── LIST ── */
.list-wrap { display:flex; flex-direction:column; gap:0; padding-bottom:var(--s16); }

/* ── MONTH DIVIDER ── */
.month-sep {
  display:flex; align-items:center; gap:var(--s3);
  padding:var(--s5) 0 var(--s3);
}
.month-sep-label { font-family:var(--ff-d); font-style:italic; font-size:11.5px; color:var(--on-dom-60); white-space:nowrap; letter-spacing:.01em; }
.month-sep-line { flex:1; height:1px; background:linear-gradient(90deg,var(--on-dom-20),transparent); }
.month-sep-count { font-size:10px; font-weight:700; color:rgba(255,241,118,0.85); white-space:nowrap; letter-spacing:.03em; text-transform:uppercase; }

/* ── ROW CARD ── */
.row-card {
  display:grid;
  grid-template-columns: 52px 1fr auto;
  align-items:center;
  gap:0;
  background:var(--surf);
  border-radius:var(--r16);
  border:1px solid rgba(255,255,255,0.85);
  box-shadow:var(--sh-sm);
  overflow:hidden;
  margin-bottom:var(--s2);
  cursor:pointer;
  transition:transform .22s cubic-bezier(0.34,1.2,0.64,1), box-shadow .22s ease;
  position:relative;
}
.row-card:hover { transform:translateY(-2px) scale(1.003); box-shadow:var(--sh-lg); }

/* live glow */
.row-card.is-live { box-shadow:var(--sh-sm),0 0 0 2px rgba(18,183,106,0.35); }
.row-card.is-live:hover { box-shadow:var(--sh-lg),0 0 0 2px rgba(18,183,106,0.5); }

/* left accent column */
.row-accent {
  width:52px; align-self:stretch;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:6px; padding:var(--s3) 0;
  position:relative;
}
.row-accent::after {
  content:''; position:absolute; right:0; top:12px; bottom:12px;
  width:1px; background:var(--surf-3);
}
.row-av {
  width:32px; height:32px; border-radius:var(--r8);
  display:flex; align-items:center; justify-content:center;
  font-size:10.5px; font-weight:700; color:#fff;
  box-shadow:0 2px 6px rgba(0,0,0,0.18); flex-shrink:0;
}
.row-status-pip {
  width:8px; height:8px; border-radius:50%; flex-shrink:0;
}

/* middle body */
.row-body {
  padding:var(--s3) var(--s4);
  display:flex; flex-direction:column; gap:4px;
  min-width:0;
}
.row-top { display:flex; align-items:center; gap:var(--s2); flex-wrap:wrap; }
.row-name { font-family:var(--ff-d); font-size:15px; font-weight:500; color:var(--ink); letter-spacing:-0.01em; }
.row-spec { font-size:11px; color:var(--muted); }
.row-status-badge {
  display:inline-flex; align-items:center; gap:4px;
  border-radius:var(--rF); padding:2px 8px; flex-shrink:0;
}
.row-status-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.row-status-label { font-size:9.5px; font-weight:700; letter-spacing:.03em; }

.row-meta { display:flex; align-items:center; gap:var(--s3); flex-wrap:wrap; }
.row-meta-item { display:flex; align-items:center; gap:4px; font-size:11.5px; color:var(--muted); }
.row-meta-icon { font-size:11px; }
.row-meta-val { font-weight:500; color:var(--ink-2); }

.row-tags { display:flex; gap:4px; flex-wrap:wrap; }
.row-tag { padding:2px 7px; border-radius:var(--r4); font-size:9.5px; font-weight:600; background:#e8f0fb; color:var(--dom-deep); border:1px solid #c8dcf5; }

.row-note {
  font-size:11px; color:var(--muted); background:var(--surf-2);
  border:1px solid var(--surf-3); border-radius:var(--r8);
  padding:4px 8px; line-height:1.5; max-width:100%;
}

.row-stars { display:flex; align-items:center; gap:4px; }
.stars-glyph { color:#F79009; font-size:10.5px; letter-spacing:1.5px; }
.stars-num { font-size:11px; font-weight:600; color:var(--ink); }

/* right panel */
.row-right {
  padding:var(--s3) var(--s4);
  display:flex; flex-direction:column; align-items:flex-end; justify-content:center;
  gap:var(--s2); flex-shrink:0;
  border-left:1px solid var(--surf-3);
  min-width:140px; align-self:stretch;
}
.row-price-total { font-family:var(--ff-d); font-size:22px; font-weight:500; color:var(--ink); letter-spacing:-0.02em; line-height:1; }
.row-price-detail { font-size:10.5px; color:var(--muted); }
.row-actions { display:flex; flex-direction:column; gap:4px; width:100%; }

.btn-p {
  width:100%; padding:6px 10px; border-radius:var(--r8);
  background:linear-gradient(135deg,var(--dom-deep),var(--dom-dk));
  color:#fff; font-family:var(--ff-ui); font-size:11px; font-weight:600;
  border:none; cursor:pointer; transition:all .14s ease;
  box-shadow:var(--sh-xs); text-align:center; white-space:nowrap;
}
.btn-p:hover { background:linear-gradient(135deg,var(--dom-xdk),var(--dom-deep)); transform:translateY(-1px); }
.btn-s {
  width:100%; padding:6px 10px; border-radius:var(--r8);
  background:transparent; color:var(--muted); font-family:var(--ff-ui); font-size:11px; font-weight:600;
  border:1px solid var(--surf-3); cursor:pointer; transition:all .14s ease; text-align:center;
}
.btn-s:hover { border-color:#c8dcf5; color:var(--dom-dk); background:var(--surf-2); }
.btn-d {
  width:100%; padding:6px 10px; border-radius:var(--r8);
  background:transparent; color:var(--error); font-family:var(--ff-ui); font-size:11px; font-weight:600;
  border:1px solid rgba(240,68,56,0.22); cursor:pointer; transition:all .14s ease; text-align:center;
}
.btn-d:hover { background:rgba(240,68,56,0.06); border-color:rgba(240,68,56,0.44); }

/* status colors */
.sc-upcoming { background:rgba(58,120,204,0.10); }
.sc-upcoming .row-status-dot,.sc-upcoming-pip { background:#3a78cc; }
.sc-upcoming .row-status-label { color:#1a4a90; }
.sc-live { background:rgba(18,183,106,0.12); }
.sc-live .row-status-dot,.sc-live-pip { background:#12B76A; animation:pulse-g 1.8s infinite; }
.sc-live .row-status-label { color:#065f46; }
.sc-done { background:rgba(150,178,204,0.15); }
.sc-done .row-status-dot,.sc-done-pip { background:#96b2cc; }
.sc-done .row-status-label { color:#4a6b88; }
.sc-cancelled { background:rgba(240,68,56,0.09); }
.sc-cancelled .row-status-dot,.sc-cancelled-pip { background:#F04438; }
.sc-cancelled .row-status-label { color:#b42318; }

@keyframes pulse-g {
  0%,100% { box-shadow:0 0 0 2px rgba(18,183,106,0.28); }
  50%      { box-shadow:0 0 0 7px rgba(18,183,106,0); }
}

/* ── EMPTY ── */
.empty {
  display:flex; flex-direction:column; align-items:center; gap:var(--s3);
  text-align:center; padding:var(--s16) var(--s8);
}
.empty-ico { font-size:36px; margin-bottom:var(--s2); }
.empty-title { font-family:var(--ff-d); font-style:italic; font-size:20px; color:var(--on-dom); }
.empty-sub { font-size:13px; color:var(--on-dom-60); max-width:280px; line-height:1.65; }
.empty-btn {
  margin-top:var(--s2); padding:9px 22px; background:var(--surf); border:none;
  border-radius:var(--rF); color:var(--dom-dk); font-family:var(--ff-ui); font-size:13px; font-weight:600;
  cursor:pointer; transition:all .14s ease; box-shadow:var(--sh-sm);
}
.empty-btn:hover { background:var(--surf-2); transform:translateY(-1px); }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
.row-card { animation:fadeUp .38s cubic-bezier(0.22,0.68,0,1) both; }

@media(max-width:640px){
  .page { padding:0 var(--s3); }
  .row-card { grid-template-columns:44px 1fr; }
  .row-right { display:none; }
  .nav { padding:0 var(--s4); height:64px; }
  .nav-center { display:none; }
  .row-accent { width:44px; }
}
`;

// ── TIPOS ──────────────────────────────────────────────────────────────────

type BookingStatus = 'upcoming' | 'live' | 'done' | 'cancelled';

interface Booking {
  id: number;
  month: string;
  av: string;
  bg: string;
  name: string;
  spec: string;
  status: BookingStatus;
  date: string;
  time: string;
  hours: number;
  address: string;
  price: number;
  total: number;
  tags: string[];
  note: string | null;
  stars?: number;
}

interface FilterItem {
  key: string;
  label: string;
  dot: string | null;
}

interface StatusMeta {
  label: string;
  cls: string;
  pip: string;
}

// ── DATOS ──────────────────────────────────────────────────────────────────

const BOOKINGS: Booking[] = [
  { id:1, month:'Mayo 2025', av:'MC', bg:'linear-gradient(135deg,#0D56A0,#1A8EE6)', name:'María Carrasco', spec:'Adultos mayores · Niños', status:'upcoming', date:'Lun, 13 mayo 2025', time:'09:00 – 13:00', hours:4, address:'Calle Serrano 44, Madrid', price:18, total:72, tags:['Primeros auxilios','Enfermería'], note:'Cuidado de abuela materna, medicación a las 11 h' },
  { id:2, month:'Mayo 2025', av:'SR', bg:'linear-gradient(135deg,#065f46,#2dd4e0)', name:'Sofía Romero', spec:'Niños · Bebés', status:'live', date:'Hoy, 11 mayo 2025', time:'08:00 – 14:00', hours:6, address:'Av. de América 22, Madrid', price:15, total:90, tags:['Montessori','Prim. auxilios'], note:'Lucas (3 años) y Emma (8 meses)' },
  { id:3, month:'Abril 2025', av:'AS', bg:'linear-gradient(135deg,#0A3D78,#3AA5F5)', name:'Ana Suárez', spec:'Mayores · Discapacidad', status:'done', date:'Vie, 26 abril 2025', time:'10:00 – 15:00', hours:5, address:'Calle Goya 88, Madrid', price:20, total:100, tags:['Enfermería','Fisioterapia'], stars:5, note:null },
  { id:4, month:'Abril 2025', av:'LP', bg:'linear-gradient(135deg,#0b6b45,#12B76A)', name:'Laura Pons', spec:'Niños y bebés', status:'done', date:'Sáb, 19 abril 2025', time:'16:00 – 20:00', hours:4, address:'Calle Velázquez 5, Madrid', price:16, total:64, tags:['Pedagogía','Inglés'], stars:4, note:null },
  { id:5, month:'Abril 2025', av:'CR', bg:'linear-gradient(135deg,#7c2d12,#ea580c)', name:'Carlos Ruiz', spec:'Mascotas · Paseos diarios', status:'cancelled', date:'Mar, 8 abril 2025', time:'17:00 – 19:00', hours:2, address:'Retiro, Madrid', price:14, total:28, tags:['Veterinaria','Adiestramiento'], note:null },
  { id:6, month:'Marzo 2025', av:'IG', bg:'linear-gradient(135deg,#0A3D78,#1A8EE6)', name:'Isabel García', spec:'Adultos mayores · Compañía', status:'done', date:'Dom, 23 marzo 2025', time:'11:00 – 17:00', hours:6, address:'Calle Mayor 3, Madrid', price:17, total:102, tags:['Gerontología','Compañía'], stars:5, note:null },
];

const FILTERS: FilterItem[] = [
  { key:'todas',     label:'Todas',       dot:null },
  { key:'upcoming',  label:'Próximas',    dot:'#3a78cc' },
  { key:'live',      label:'En curso',    dot:'#12B76A' },
  { key:'done',      label:'Completadas', dot:'#96b2cc' },
  { key:'cancelled', label:'Canceladas',  dot:'#F04438' },
];

const STATUS_META: Record<BookingStatus, StatusMeta> = {
  upcoming:  { label:'Próxima',     cls:'sc-upcoming',  pip:'#3a78cc' },
  live:      { label:'En curso',    cls:'sc-live',      pip:'#12B76A' },
  done:      { label:'Completada',  cls:'sc-done',      pip:'#96b2cc' },
  cancelled: { label:'Cancelada',   cls:'sc-cancelled', pip:'#F04438' },
};

// ── HELPERS ────────────────────────────────────────────────────────────────

function starsStr(n: number): string {
  return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
}

// ── COMPONENTES ────────────────────────────────────────────────────────────

interface RowCardProps {
  b: Booking;
  delay: number;
}

function RowCard({ b, delay }: RowCardProps) {
  const sm: StatusMeta = STATUS_META[b.status];
  return (
    <div className={`row-card${b.status === 'live' ? ' is-live' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      {/* accent column */}
      <div className="row-accent">
        <div className="row-av" style={{ background: b.bg }}>{b.av}</div>
        <div className="row-status-pip" style={{ background: sm.pip, boxShadow: b.status === 'live' ? '0 0 0 3px rgba(18,183,106,0.25)' : 'none' }} />
      </div>

      {/* body */}
      <div className="row-body">
        <div className="row-top">
          <span className="row-name">{b.name}</span>
          <div className={`row-status-badge ${sm.cls}`}>
            <div className="row-status-dot" />
            <span className="row-status-label">{sm.label}</span>
          </div>
        </div>

        <div className="row-meta">
          <div className="row-meta-item">
            <span className="row-meta-icon">📅</span>
            <span className="row-meta-val">{b.date}</span>
          </div>
          <div className="row-meta-item">
            <span className="row-meta-icon">🕐</span>
            <span className="row-meta-val">{b.time}</span>
            <span style={{ color:'var(--faint)' }}>·</span>
            <span>{b.hours} h</span>
          </div>
          <div className="row-meta-item">
            <span className="row-meta-icon">📍</span>
            <span>{b.address}</span>
          </div>
        </div>

        {b.note && (
          <div className="row-note">💬 {b.note}</div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:'var(--s3)', flexWrap:'wrap' }}>
          <div className="row-tags">
            {b.tags.map((t: string) => <span key={t} className="row-tag">{t}</span>)}
          </div>
          {b.status === 'done' && b.stars && (
            <div className="row-stars">
              <span className="stars-glyph">{starsStr(b.stars)}</span>
              <span className="stars-num">{b.stars}.0</span>
            </div>
          )}
        </div>
      </div>

      {/* right */}
      <div className="row-right">
        <div>
          <div className="row-price-total">€{b.total}</div>
          <div className="row-price-detail">€{b.price}/h · {b.hours} h</div>
        </div>
        <div className="row-actions">
          {b.status === 'upcoming' && <>
            <button className="btn-p">Gestionar</button>
            <button className="btn-s">Ver cuidador</button>
            <button className="btn-d">Cancelar</button>
          </>}
          {b.status === 'live' && <>
            <button className="btn-p">📍 Seguir en vivo</button>
            <button className="btn-s">Contactar</button>
          </>}
          {b.status === 'done' && <>
            <button className="btn-p">🔁 Repetir</button>
            {!b.stars && <button className="btn-s">⭐ Valorar</button>}
          </>}
          {b.status === 'cancelled' && <>
            <button className="btn-p">🔁 Volver a reservar</button>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────────────────────────

export default function MisReservas() {
  const [filter, setFilter] = useState<string>('todas');
  const [sort, setSort] = useState<string>('fecha-desc');
  const [activeNav, setActiveNav] = useState<string>('Mis reservas');

  const countFor = (k: string): number =>
    k === 'todas' ? BOOKINGS.length : BOOKINGS.filter((b: Booking) => b.status === k).length;

  const filtered: Booking[] = BOOKINGS
    .filter((b: Booking) => filter === 'todas' || b.status === filter)
    .sort((a: Booking, b: Booking) => {
      if (sort === 'fecha-desc')  return b.id - a.id;
      if (sort === 'fecha-asc')   return a.id - b.id;
      if (sort === 'precio-desc') return b.total - a.total;
      if (sort === 'precio-asc')  return a.total - b.total;
      return 0;
    });

  const grouped: Record<string, Booking[]> = filtered.reduce(
    (acc: Record<string, Booking[]>, b: Booking) => {
      if (!acc[b.month]) acc[b.month] = [];
      acc[b.month].push(b);
      return acc;
    },
    {} as Record<string, Booking[]>
  );

  const navLinks: string[] = ['Explorar', 'Mis reservas', 'Favoritos'];
  let cardIdx = 0;

  return (
    <>
      <style>{layoutCss + pageCss}</style>

      <nav className="nav">
        <div className="nav-logo"><span className="nav-logo-text">TQido</span></div>
        <div className="nav-center">
          {navLinks.map((l: string) => (
            <button
              key={l}
              className={`nav-pill${activeNav === l ? ' active' : ''}`}
              onClick={() => {
                setActiveNav(l);
                if (l === 'Explorar') router.visit('/dashboard/customer');
                if (l === 'Mis reservas') router.visit('/dashboard/customer/reservas');
                if (l === 'Favoritos') router.visit('/dashboard/customer/favoritos');
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button className="nav-notif">🔔<div className="nav-notif-dot" /></button>
          <div className="nav-avatar-trigger" onClick={() => router.visit('/profile/customer')}><div className="nav-avatar">SG</div></div>
        </div>
      </nav>

      <div className="page">

        {/* TOOLBAR */}
        <div className="toolbar">
          <div className="toolbar-pills">
            {FILTERS.map((f: FilterItem) => (
              <button
                key={f.key}
                className={`tab-btn${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.dot && (
                  <span className="tab-dot" style={{ background: filter === f.key ? f.dot : 'rgba(255,255,255,0.45)' }} />
                )}
                {f.label}
                <span className="tab-count">{countFor(f.key)}</span>
              </button>
            ))}
          </div>
          <select className="sort-select" value={sort} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}>
            <option value="fecha-desc">Más recientes</option>
            <option value="fecha-asc">Más antiguas</option>
            <option value="precio-desc">Mayor importe</option>
            <option value="precio-asc">Menor importe</option>
          </select>
        </div>

        {/* RESULTS LINE */}
        <div className="results-line">
          <span className="results-text">
            <strong>{filtered.length}</strong>
            reserva{filtered.length !== 1 ? 's' : ''}
            {filter !== 'todas' ? ` · ${FILTERS.find((f: FilterItem) => f.key === filter)?.label}` : ''}
          </span>
          <div className="results-actions">
            <button className="btn-s" onClick={() => router.visit('/profile/customer')}>Mi perfil</button>
          </div>
        </div>

        {/* LIST */}
        <div className="list-wrap">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">📋</div>
              <div className="empty-title">Sin reservas</div>
              <div className="empty-sub">No hay reservas con este filtro. Explora nuevos cuidadores o cambia el estado.</div>
              <button className="empty-btn" onClick={() => setFilter('todas')}>Ver todas</button>
            </div>
          ) : (
            Object.entries(grouped).map(([month, items]: [string, Booking[]]) => (
              <div key={month}>
                <div className="month-sep">
                  <span className="month-sep-label">{month}</span>
                  <div className="month-sep-line" />
                  <span className="month-sep-count">{items.length} reserva{items.length !== 1 ? 's' : ''}</span>
                </div>
                {items.map((b: Booking, i: number) => {
                  const delay: number = (cardIdx++ * 55) + 180;
                  return <RowCard key={b.id} b={b} delay={delay} />;
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
