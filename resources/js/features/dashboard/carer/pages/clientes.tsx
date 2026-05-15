import { useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import CarerLayout from '@/features/layouts/carer_layout';
import type { SharedData } from '@/types';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

/* ═══ ROOT ═══ */
.cr { display:flex; flex-direction:column; gap:16px; }

/* ═══ SEARCH ═══ */
.search-wrap { animation: fu .38s cubic-bezier(.22,.68,0,1) both .02s; }
.search-field {
  display:flex; align-items:center; gap:10px;
  background:#fff; border:1.5px solid var(--t08);
  border-radius:14px; padding:11px 16px;
  box-shadow:0 2px 14px rgba(20,50,90,.06);
  transition:border-color .18s, box-shadow .18s;
}
.search-field:focus-within {
  border-color:var(--blue-lt);
  box-shadow:0 0 0 3px rgba(90,150,212,.10), 0 2px 14px rgba(20,50,90,.08);
}
.si-icon { font-size:15px; color:var(--t35); flex-shrink:0; }
.si-input {
  flex:1; background:none; border:none; outline:none;
  font-family:'DM Sans',inherit; font-size:13px;
  color:var(--t80); letter-spacing:.01em;
}
.si-input::placeholder { color:var(--t35); }
.si-meta { display:flex; align-items:center; gap:8px; flex-shrink:0; }
.si-count {
  font-family:'DM Sans',inherit; font-size:11px;
  color:var(--t35); letter-spacing:.02em; white-space:nowrap;
}
.si-clear {
  width:20px; height:20px; border-radius:50%;
  background:var(--t08); border:none; color:var(--t55);
  font-size:10px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:background .14s, transform .14s;
}
.si-clear:hover { background:var(--t15); transform:scale(1.1); }

/* ═══ CLIENT LIST ═══ */
.list-wrap {
  background:#fff; border:1px solid var(--t08);
  border-radius:16px; overflow:hidden;
  box-shadow:0 2px 18px rgba(20,50,90,.07);
  animation:fu .4s cubic-bezier(.22,.68,0,1) both .08s;
}
.list-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:13px 20px 12px; border-bottom:1px solid var(--t05);
}
.list-title {
  font-family:'Syne',inherit; font-size:12px;
  font-weight:500; color:var(--t55);
  letter-spacing:.09em; text-transform:uppercase;
}
.list-badge {
  font-family:'DM Sans',inherit; font-size:10px; font-weight:500;
  background:rgba(90,150,212,.10); color:var(--blue-lt);
  padding:2px 10px; border-radius:99px;
  border:1px solid rgba(90,150,212,.18);
}

.col-heads {
  display:grid;
  grid-template-columns:1fr 1.3fr 130px 76px 20px;
  padding:8px 20px 8px 24px;
  background:rgba(235,246,253,.55);
  border-bottom:1px solid var(--t05);
}
.ch {
  font-family:'DM Sans',inherit; font-size:9px; font-weight:500;
  color:var(--t35); text-transform:uppercase; letter-spacing:.08em;
}

.c-row {
  display:grid;
  grid-template-columns:1fr 1.3fr 130px 76px 20px;
  padding:13px 20px 13px 20px;
  align-items:center;
  border-bottom:1px solid var(--t05);
  border-left:3.5px solid transparent;
  cursor:pointer; position:relative;
  transition:background .14s, border-left-color .14s;
  animation:fu .3s cubic-bezier(.22,.68,0,1) both;
}
.c-row:last-child { border-bottom:none; }
.c-row:hover { background:rgba(90,150,212,.03); }
.c-row:hover { border-left-color:var(--blue-lt) !important; }
.c-row:active { background:rgba(90,150,212,.06); }
.c-row.s-active   { border-left-color:rgba(18,183,106,.30); }
.c-row.s-new      { border-left-color:rgba(90,150,212,.30); }
.c-row.s-inactive { border-left-color:rgba(150,150,160,.20); }

/* Identity */
.c-id { display:flex; align-items:center; gap:11px; min-width:0; }
.c-av {
  width:36px; height:36px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-family:'DM Sans',inherit; font-size:11px; font-weight:500;
  color:#fff; letter-spacing:.03em;
  box-shadow:0 2px 7px rgba(0,0,0,.15);
}
.c-name {
  font-family:'DM Sans',inherit; font-size:13px;
  font-weight:500; color:var(--t80);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.c-age  { font-family:'DM Sans',inherit; font-size:10px; color:var(--t35); margin-top:1px; }

/* Type */
.c-type { font-family:'DM Sans',inherit; font-size:11px; color:var(--t55); line-height:1.45; }

/* Recency */
.c-rec { display:flex; flex-direction:column; gap:3px; }
.c-rec-date { font-family:'DM Sans',inherit; font-size:11px; color:var(--t55); }
.c-rec-pill {
  display:inline-flex; align-items:center; gap:4px;
  padding:2px 7px; border-radius:99px; width:fit-content;
  font-family:'DM Sans',inherit; font-size:9px; font-weight:500;
  letter-spacing:.02em;
}
.c-rec-pill.fresh { background:rgba(18,183,106,.10); color:var(--green); }
.c-rec-pill.mid   { background:rgba(245,158,11,.10); color:var(--amber); }
.c-rec-pill.stale { background:rgba(220,60,60,.08);  color:#d44f4f; }
.c-rec-dot { width:5px; height:5px; border-radius:50%; background:currentColor; flex-shrink:0; }

/* Status */
.c-sbadge {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 9px; border-radius:99px;
  font-family:'DM Sans',inherit; font-size:9px; font-weight:500;
  letter-spacing:.03em; white-space:nowrap;
}
.c-sbadge.active   { background:rgba(18,183,106,.09); color:var(--green);   border:1px solid rgba(18,183,106,.18); }
.c-sbadge.inactive { background:rgba(150,150,160,.08); color:var(--t35);    border:1px solid var(--t08); }
.c-sbadge.new      { background:rgba(90,150,212,.10); color:var(--blue-lt); border:1px solid rgba(90,150,212,.20); }
.c-sdot { width:5px; height:5px; border-radius:50%; background:currentColor; flex-shrink:0; }

/* Pending dot */
.c-pend {
  width:8px; height:8px; border-radius:50%; background:var(--amber);
  box-shadow:0 0 0 2.5px rgba(245,158,11,.20);
}

/* Empty */
.list-empty { padding:52px 20px; text-align:center; }
.list-empty-icon { font-size:32px; margin-bottom:10px; opacity:.5; }
.list-empty-text { font-family:'DM Sans',inherit; font-size:13px; color:var(--t35); }

/* ═══ DETAIL OVERLAY ═══ */
.dp-overlay {
  position:fixed; inset:0;
  background:rgba(8,18,38,.22);
  backdrop-filter:blur(3px);
  -webkit-backdrop-filter:blur(3px);
  z-index:200; display:flex; justify-content:flex-end;
  animation:fov .2s ease both;
}
@keyframes fov { from{opacity:0} to{opacity:1} }

.dp-panel {
  width:360px; max-width:100vw; height:100%;
  background:#f3f8fb; display:flex; flex-direction:column;
  box-shadow:-6px 0 44px rgba(0,0,0,.14);
  animation:spanel .26s cubic-bezier(.22,.68,0,1) both;
  overflow-y:auto;
}
@keyframes spanel { from{transform:translateX(24px);opacity:0} to{transform:none;opacity:1} }

/* Hero */
.dp-hero {
  background:linear-gradient(148deg, var(--blue) 0%, var(--blue-lt) 100%);
  padding:22px 18px 16px; flex-shrink:0; position:relative; overflow:hidden;
}
.dp-hero::before {
  content:''; position:absolute; top:-50px; right:-20px;
  width:180px; height:180px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.09), transparent 65%);
  pointer-events:none;
}
.dp-hero::after {
  content:''; position:absolute; bottom:-40px; left:-15px;
  width:130px; height:130px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.06), transparent 65%);
  pointer-events:none;
}
.dp-close {
  position:absolute; top:14px; right:14px; z-index:1;
  width:26px; height:26px; border-radius:50%;
  background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.24);
  color:#fff; font-size:12px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:background .15s;
}
.dp-close:hover { background:rgba(255,255,255,.27); }
.dp-hero-top { display:flex; align-items:center; gap:14px; position:relative; z-index:1; }
.dp-hero-av {
  width:54px; height:54px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-family:'DM Sans',inherit; font-size:15px; font-weight:500; color:#fff;
  border:2px solid rgba(255,255,255,.30);
  box-shadow:0 4px 16px rgba(0,0,0,.20);
}
.dp-hero-name {
  font-family:'Syne',inherit; font-size:20px;
  font-weight:500; color:#fff; line-height:1.1; letter-spacing:.01em;
}
.dp-hero-sub {
  font-family:'DM Sans',inherit; font-size:10px;
  color:rgba(255,255,255,.60); margin-top:5px; line-height:1.55;
}
.dp-stats {
  display:flex; margin-top:14px; position:relative; z-index:1;
  border-top:1px solid rgba(255,255,255,.13); padding-top:13px;
}
.dp-stat { flex:1; text-align:center; }
.dp-stat:not(:last-child) { border-right:1px solid rgba(255,255,255,.13); }
.dp-stat-n {
  font-family:'Syne',inherit; font-size:17px;
  font-weight:400; color:#fff; line-height:1;
}
.dp-stat-l {
  font-family:'DM Sans',inherit; font-size:9px;
  color:rgba(255,255,255,.52); margin-top:3px; letter-spacing:.04em;
}

/* Quick actions */
.dp-actions {
  display:flex; gap:8px; padding:14px 16px;
  border-bottom:1px solid rgba(20,50,90,.07);
  flex-shrink:0; background:#fff;
}
.dp-btn {
  flex:1; padding:9px 10px; border-radius:10px;
  border:1px solid var(--t08); background:#f8fbfd;
  cursor:pointer; display:flex; align-items:center;
  justify-content:center; gap:6px;
  font-family:'DM Sans',inherit; font-size:11px;
  font-weight:500; color:var(--t55);
  transition:all .15s;
}
.dp-btn:hover { background:#edf4fb; color:var(--blue-lt); border-color:rgba(90,150,212,.25); }
.dp-btn:active { transform:scale(.97); }
.dp-btn-p {
  background:rgba(90,150,212,.08); color:var(--blue-lt);
  border-color:rgba(90,150,212,.22);
}
.dp-btn-p:hover { background:rgba(90,150,212,.15) !important; }
.dp-btn-icon { font-size:13px; }

/* Body */
.dp-body { padding:16px; display:flex; flex-direction:column; gap:14px; flex:1; }

.dp-sec { display:flex; flex-direction:column; gap:9px; }
.dp-sec-lbl {
  display:flex; align-items:center; gap:8px;
  font-family:'Syne',inherit; font-size:9px;
  font-weight:600; color:var(--t35);
  text-transform:uppercase; letter-spacing:.10em;
}
.dp-sec-lbl::after { content:''; flex:1; height:1px; background:var(--t08); }

/* Notes */
.dp-alert {
  background:rgba(245,158,11,.045); border:1px solid rgba(245,158,11,.22);
  border-left:3px solid var(--amber); border-radius:0 10px 10px 0; padding:10px 12px;
}
.dp-alert-tag {
  font-family:'DM Sans',inherit; font-size:9px; font-weight:600;
  color:var(--amber); text-transform:uppercase; letter-spacing:.07em;
  margin-bottom:5px; display:flex; align-items:center; gap:5px;
}
.dp-alert-txt { font-family:'DM Sans',inherit; font-size:11px; color:var(--t80); line-height:1.65; }
.dp-note {
  background:#fff; border:1px solid var(--t08);
  border-left:3px solid var(--blue-lt); border-radius:0 10px 10px 0; padding:10px 12px;
  font-family:'DM Sans',inherit; font-size:11px; color:var(--t55); line-height:1.65;
}

/* Timeline */
.dp-timeline { display:flex; flex-direction:column; }
.dp-tl-group { display:flex; flex-direction:column; margin-bottom:8px; }
.dp-tl-sublbl {
  font-family:'DM Sans',inherit; font-size:9px; font-weight:600;
  color:var(--t35); text-transform:uppercase; letter-spacing:.07em;
  padding-left:21px; margin-bottom:6px;
}
.dp-tl-row { display:flex; align-items:stretch; gap:0; margin-bottom:4px; }
.dp-tl-axis { display:flex; flex-direction:column; align-items:center; width:21px; flex-shrink:0; padding-top:5px; }
.dp-tl-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.dp-tl-dot.confirmed { background:var(--blue-lt); }
.dp-tl-dot.pending   { background:var(--amber); }
.dp-tl-line { width:1.5px; flex:1; background:var(--t08); margin-top:3px; min-height:10px; }
.dp-tl-card {
  flex:1; background:#fff; border:1px solid var(--t08);
  border-radius:10px; padding:9px 12px;
  display:flex; align-items:center; gap:8px;
}
.dp-tl-card.pending { border-color:rgba(245,158,11,.25); background:rgba(245,158,11,.03); }
.dp-tl-info { flex:1; }
.dp-tl-date { font-family:'DM Sans',inherit; font-size:12px; font-weight:500; color:var(--t80); }
.dp-tl-time { font-family:'DM Sans',inherit; font-size:9px; color:var(--t35); margin-top:2px; }
.dp-tl-r { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.dp-tl-price { font-family:'Syne',inherit; font-size:14px; font-weight:400; color:var(--blue-lt); }
.dp-tl-pill {
  font-family:'DM Sans',inherit; font-size:8px; font-weight:600;
  padding:2px 6px; border-radius:99px; letter-spacing:.04em;
}
.dp-tl-pill.pending { background:rgba(245,158,11,.16); color:var(--amber); }

/* Contact */
.dp-contact { display:flex; flex-direction:column; }
.dp-kv { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:7px 0; border-bottom:1px solid var(--t05); }
.dp-kv:last-child { border-bottom:none; }
.dp-k { font-family:'DM Sans',inherit; font-size:11px; color:var(--t35); flex-shrink:0; }
.dp-v { font-family:'DM Sans',inherit; font-size:11px; color:var(--t80); font-weight:500; text-align:right; }

/* ═══ ANIMATION ═══ */
@keyframes fu { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:none} }

@media (max-width:680px) {
  .col-heads { display:none; }
  .c-row { grid-template-columns:1fr auto 20px; }
  .c-type, .c-rec { display:none; }
}
`;

type CStatus = 'active' | 'inactive' | 'new';
interface Session { date:string; timeStart:string; timeEnd:string; hours:number; price:number; status:'confirmed'|'pending'; }
interface Client {
  id:number; name:string; initials:string; avatarBg:string;
  age:number; type:string; address:string; phone:string;
  since:string; lastSession:string; totalSessions:number; totalEarnings:number;
  status:CStatus; notes:string; sessions:Session[];
}

const CLIENTS: Client[] = [
  { id:1, name:'José Fernández', initials:'JF', avatarBg:'linear-gradient(135deg,#0e2d5a,#2e6fba)', age:78, type:'Adulto mayor · Alzheimer leve', address:'C/ Serrano 42, Madrid', phone:'+34 612 345 678', since:'2024-01', lastSession:'2025-06-23', totalSessions:24, totalEarnings:1296, status:'active', notes:'Necesita supervisión constante. Tomar medicación a las 10h y 18h.', sessions:[{date:'2025-06-23',timeStart:'09:00',timeEnd:'12:00',hours:3,price:54,status:'confirmed'},{date:'2025-06-09',timeStart:'09:00',timeEnd:'12:00',hours:3,price:54,status:'confirmed'},{date:'2025-05-26',timeStart:'09:00',timeEnd:'12:00',hours:3,price:54,status:'confirmed'}] },
  { id:2, name:'Lucas Martín',   initials:'LM', avatarBg:'linear-gradient(135deg,#065f46,#12B76A)', age:4,  type:'Niño · Cuidado infantil',        address:'Av. Castellana 88, Madrid', phone:'+34 623 456 789', since:'2024-03', lastSession:'2025-06-23', totalSessions:18, totalEarnings:864,  status:'active', notes:'Alérgico a los frutos secos. Siesta de 14h a 16h.', sessions:[{date:'2025-06-23',timeStart:'16:00',timeEnd:'19:00',hours:3,price:48,status:'confirmed'},{date:'2025-06-09',timeStart:'16:00',timeEnd:'19:00',hours:3,price:48,status:'confirmed'},{date:'2025-05-26',timeStart:'16:00',timeEnd:'19:00',hours:3,price:48,status:'confirmed'}] },
  { id:3, name:'Rosa Pérez',     initials:'RP', avatarBg:'linear-gradient(135deg,#1a4a8a,#5a96d4)', age:83, type:'Adulto mayor · Alzheimer avanzado', address:'C/ Goya 15, Madrid',  phone:'+34 634 567 890', since:'2023-09', lastSession:'2025-06-24', totalSessions:36, totalEarnings:3024, status:'active', notes:'Familia muy involucrada. Llamar a la hija al inicio de cada sesión.', sessions:[{date:'2025-06-24',timeStart:'10:00',timeEnd:'14:00',hours:4,price:84,status:'confirmed'},{date:'2025-06-10',timeStart:'10:00',timeEnd:'14:00',hours:4,price:84,status:'confirmed'},{date:'2025-05-27',timeStart:'10:00',timeEnd:'14:00',hours:4,price:84,status:'confirmed'}] },
  { id:4, name:'Tomás García',   initials:'TG', avatarBg:'linear-gradient(135deg,#0e2d5a,#2e6fba)', age:2,  type:'Niño · Cuidado infantil',        address:'C/ Velázquez 33, Madrid', phone:'+34 645 678 901', since:'2024-06', lastSession:'2025-06-25', totalSessions:12, totalEarnings:960,  status:'active', notes:'Horario flexible. Padres trabajan en turno partido.', sessions:[{date:'2025-06-25',timeStart:'09:00',timeEnd:'14:00',hours:5,price:80,status:'confirmed'},{date:'2025-06-11',timeStart:'09:00',timeEnd:'14:00',hours:5,price:80,status:'confirmed'}] },
  { id:5, name:'Elena Soler',    initials:'ES', avatarBg:'linear-gradient(135deg,#4a1d96,#7c3aed)', age:71, type:'Adulto mayor · Compañía',        address:'C/ Alcalá 120, Madrid',  phone:'+34 656 789 012', since:'2024-09', lastSession:'2025-06-25', totalSessions:9,  totalEarnings:486,  status:'active', notes:'Vive sola. Le gusta leer y pasear por el retiro. Sin restricciones médicas.', sessions:[{date:'2025-06-25',timeStart:'10:00',timeEnd:'13:00',hours:3,price:54,status:'confirmed'},{date:'2025-06-11',timeStart:'10:00',timeEnd:'13:00',hours:3,price:54,status:'confirmed'}] },
  { id:6, name:'Pedro Ruiz',     initials:'PR', avatarBg:'linear-gradient(135deg,#0e2d5a,#3aa5f5)', age:67, type:'Adulto mayor · Post-operatorio', address:'C/ Mayor 7, Madrid',       phone:'+34 667 890 123', since:'2025-05', lastSession:'2025-06-26', totalSessions:4,  totalEarnings:240,  status:'new',    notes:'Recuperación tras operación de cadera. Movilidad reducida.', sessions:[{date:'2025-06-26',timeStart:'15:00',timeEnd:'18:00',hours:3,price:60,status:'pending'},{date:'2025-06-12',timeStart:'15:00',timeEnd:'18:00',hours:3,price:60,status:'confirmed'}] },
  { id:7, name:'Marta López',    initials:'ML', avatarBg:'linear-gradient(135deg,#7c2d12,#ea580c)', age:6,  type:'Niña · Cuidado infantil',        address:'Paseo del Prado 4, Madrid', phone:'+34 678 901 234', since:'2024-01', lastSession:'2025-06-27', totalSessions:28, totalEarnings:2688, status:'active', notes:'Tiene actividades extraescolares los lunes y miércoles. Recogida en el colegio.', sessions:[{date:'2025-06-27',timeStart:'08:00',timeEnd:'14:00',hours:6,price:96,status:'confirmed'},{date:'2025-06-13',timeStart:'08:00',timeEnd:'14:00',hours:6,price:96,status:'confirmed'}] },
  { id:8, name:'Ana Villanueva', initials:'AV', avatarBg:'linear-gradient(135deg,#1a4a8a,#5a96d4)', age:75, type:'Adulto mayor · Movilidad reducida', address:'C/ Hortaleza 22, Madrid', phone:'+34 689 012 345', since:'2024-11', lastSession:'2025-06-30', totalSessions:7,  totalEarnings:420,  status:'active', notes:'Usa silla de ruedas. Acceso al edificio por rampa lateral.', sessions:[{date:'2025-06-30',timeStart:'11:00',timeEnd:'14:00',hours:3,price:60,status:'confirmed'}] },
  { id:9, name:'Carlos Díaz',    initials:'CD', avatarBg:'linear-gradient(135deg,#0b6b45,#12b76a)', age:80, type:'Adulto mayor · Diabetes',        address:'C/ Fuencarral 55, Madrid', phone:'+34 690 123 456', since:'2024-08', lastSession:'2025-05-15', totalSessions:6,  totalEarnings:324,  status:'inactive', notes:'Control de glucemia antes y después de cada servicio. Dieta estricta.', sessions:[{date:'2025-05-15',timeStart:'09:00',timeEnd:'12:00',hours:3,price:54,status:'confirmed'},{date:'2025-04-28',timeStart:'09:00',timeEnd:'12:00',hours:3,price:54,status:'confirmed'}] },
];

const SL: Record<CStatus,string> = { active:'Activo', inactive:'Inactivo', new:'Nuevo' };
const MO = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const fmtDate = (ds:string) => { const d=new Date(ds+'T00:00:00'); return `${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}`; };
const fmtSince = (ym:string) => { const [y,m]=ym.split('-'); return `${MO[parseInt(m)-1]} ${y}`; };
const daysSince = (ds:string) => Math.floor((Date.now()-new Date(ds+'T00:00:00').getTime())/86400000);
const recClass = (days:number, s:CStatus) => s==='inactive'?'stale': days<=14?'fresh': days<=30?'mid':'stale';
const recLabel = (days:number) => days===0?'Hoy': days===1?'Ayer': days<7?`Hace ${days}d`: days<30?`Hace ${Math.floor(days/7)}sem`:`Hace ${Math.floor(days/30)}mes`;
const isMedical = (n:string) => /medicaci[oó]n|glucemia|alérgi|movilidad|silla|operaci[oó]n|supervisión|llamar/i.test(n);

export default function ClientsPage() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const [activeNav, setActiveNav] = useState('Clientes');
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState<Client|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  // Sort: active → new → inactive; within group by recency desc
  const ORDER = { active:0, new:1, inactive:2 };
  const sorted = [...filtered].sort((a,b) => {
    if (ORDER[a.status] !== ORDER[b.status]) return ORDER[a.status]-ORDER[b.status];
    return new Date(b.lastSession).getTime()-new Date(a.lastSession).getTime();
  });

  const pendSess  = selected?.sessions.filter(s=>s.status==='pending')   ?? [];
  const pastSess  = selected?.sessions.filter(s=>s.status==='confirmed') ?? [];
  const hasPend   = (c:Client) => c.sessions.some(s=>s.status==='pending');

  return (
    <>
      <style>{css}</style>
      <CarerLayout
        initials=""
        userName={user?.name ?? 'Tu perfil'}
        userEmail={user?.email ?? 'Sin correo'}
        profileCompletion={user?.profile_completion?.percentage ?? 0}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      >
        <div className="cr">

          {/* ─── SEARCH ─── */}
          <div className="search-wrap">
            <div className="search-field">
              <span className="si-icon">🔍</span>
              <input
                ref={inputRef}
                className="si-input"
                placeholder="Buscar por nombre o tipo de cuidado…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="si-meta">
                <span className="si-count">
                  {search
                    ? `${filtered.length} resultado${filtered.length!==1?'s':''}`
                    : `${CLIENTS.length} clientes`}
                </span>
                {search && (
                  <button className="si-clear" onClick={()=>{setSearch('');inputRef.current?.focus();}}>✕</button>
                )}
              </div>
            </div>
          </div>

          {/* ─── LIST ─── */}
          <div className="list-wrap">
            <div className="list-header">
              <span className="list-title">Clientes</span>
              <span className="list-badge">{sorted.length}</span>
            </div>

            <div className="col-heads">
              <div className="ch">Cliente</div>
              <div className="ch">Tipo de cuidado</div>
              <div className="ch">Última sesión</div>
              <div className="ch">Estado</div>
              <div className="ch" />
            </div>

            {sorted.length === 0 ? (
              <div className="list-empty">
                <div className="list-empty-icon">🔎</div>
                <div className="list-empty-text">Sin resultados para «{search}»</div>
              </div>
            ) : sorted.map((c, i) => {
              const days = daysSince(c.lastSession);
              return (
                <div
                  key={c.id}
                  className={`c-row s-${c.status}`}
                  style={{ animationDelay:`${.05+i*.028}s` }}
                  onClick={()=>setSelected(c)}
                >
                  <div className="c-id">
                    <div className="c-av" style={{background:c.avatarBg}}>{c.initials}</div>
                    <div>
                      <div className="c-name">{c.name}</div>
                      <div className="c-age">{c.age} años</div>
                    </div>
                  </div>
                  <div className="c-type">{c.type}</div>
                  <div className="c-rec">
                    <div className="c-rec-date">{fmtDate(c.lastSession)}</div>
                    <div className={`c-rec-pill ${recClass(days,c.status)}`}>
                      <span className="c-rec-dot" />{recLabel(days)}
                    </div>
                  </div>
                  <div>
                    <span className={`c-sbadge ${c.status}`}>
                      <span className="c-sdot" />{SL[c.status]}
                    </span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {hasPend(c) && <div className="c-pend" title="Sesión pendiente de confirmación"/>}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ─── DETAIL PANEL ─── */}
        {selected && (
          <div className="dp-overlay" onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
            <div className="dp-panel">

              <div className="dp-hero">
                <button className="dp-close" onClick={()=>setSelected(null)}>✕</button>
                <div className="dp-hero-top">
                  <div className="dp-hero-av" style={{background:selected.avatarBg}}>{selected.initials}</div>
                  <div>
                    <div className="dp-hero-name">{selected.name}</div>
                    <div className="dp-hero-sub">{selected.age} años<br/>{selected.type}</div>
                  </div>
                </div>
                <div className="dp-stats">
                  <div className="dp-stat">
                    <div className="dp-stat-n">{selected.totalSessions}</div>
                    <div className="dp-stat-l">Sesiones</div>
                  </div>
                  <div className="dp-stat">
                    <div className="dp-stat-n">€{selected.totalEarnings.toLocaleString()}</div>
                    <div className="dp-stat-l">Ganancias</div>
                  </div>
                  <div className="dp-stat">
                    <div className="dp-stat-n">{fmtSince(selected.since)}</div>
                    <div className="dp-stat-l">Cliente desde</div>
                  </div>
                </div>
              </div>

              <div className="dp-actions">
                <button className="dp-btn" onClick={()=>window.open(`tel:${selected.phone}`)}>
                  <span className="dp-btn-icon">📞</span> Llamar
                </button>
                <button className="dp-btn dp-btn-p">
                  <span className="dp-btn-icon">📅</span> Nueva sesión
                </button>
                <button className="dp-btn">
                  <span className="dp-btn-icon">✏️</span> Editar
                </button>
              </div>

              <div className="dp-body">

                {/* 1 — Notas */}
                <div className="dp-sec">
                  <div className="dp-sec-lbl">Notas de cuidado</div>
                  {isMedical(selected.notes) ? (
                    <div className="dp-alert">
                      <div className="dp-alert-tag">⚠ Información importante</div>
                      <div className="dp-alert-txt">{selected.notes}</div>
                    </div>
                  ) : (
                    <div className="dp-note">{selected.notes}</div>
                  )}
                </div>

                {/* 2 — Sesiones (timeline) */}
                <div className="dp-sec">
                  <div className="dp-sec-lbl">Sesiones</div>
                  <div className="dp-timeline">
                    {pendSess.length > 0 && (
                      <div className="dp-tl-group">
                        <div className="dp-tl-sublbl">Pendiente de confirmar</div>
                        {pendSess.map((s,i)=>(
                          <div className="dp-tl-row" key={`p${i}`}>
                            <div className="dp-tl-axis">
                              <div className="dp-tl-dot pending"/>
                              {i<pendSess.length-1 && <div className="dp-tl-line"/>}
                            </div>
                            <div className="dp-tl-card pending">
                              <div className="dp-tl-info">
                                <div className="dp-tl-date">{fmtDate(s.date)}</div>
                                <div className="dp-tl-time">🕐 {s.timeStart}–{s.timeEnd} · {s.hours}h</div>
                              </div>
                              <div className="dp-tl-r">
                                <div className="dp-tl-price">€{s.price}</div>
                                <span className="dp-tl-pill pending">Pendiente</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {pastSess.length > 0 && (
                      <div className="dp-tl-group">
                        {pendSess.length > 0 && <div className="dp-tl-sublbl">Historial</div>}
                        {pastSess.map((s,i)=>(
                          <div className="dp-tl-row" key={`c${i}`}>
                            <div className="dp-tl-axis">
                              <div className="dp-tl-dot confirmed"/>
                              {i<pastSess.length-1 && <div className="dp-tl-line"/>}
                            </div>
                            <div className="dp-tl-card">
                              <div className="dp-tl-info">
                                <div className="dp-tl-date">{fmtDate(s.date)}</div>
                                <div className="dp-tl-time">🕐 {s.timeStart}–{s.timeEnd} · {s.hours}h</div>
                              </div>
                              <div className="dp-tl-r">
                                <div className="dp-tl-price">€{s.price}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3 — Contacto */}
                <div className="dp-sec">
                  <div className="dp-sec-lbl">Contacto</div>
                  <div className="dp-contact">
                    <div className="dp-kv">
                      <span className="dp-k">📍 Dirección</span>
                      <span className="dp-v">{selected.address}</span>
                    </div>
                    <div className="dp-kv">
                      <span className="dp-k">📞 Teléfono</span>
                      <span className="dp-v">{selected.phone}</span>
                    </div>
                    <div className="dp-kv">
                      <span className="dp-k">Estado</span>
                      <span className={`c-sbadge ${selected.status}`}>
                        <span className="c-sdot"/>{SL[selected.status]}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </CarerLayout>
    </>
  );
}
