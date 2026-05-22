import { router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import CarerLayout from '@/features/layouts/carer_layout';
import type { SharedData, User } from '@/types';

const css = `
:root {
  --t100: var(--ink);
  --t80: var(--ink-80);
  --t55: var(--ink-55);
  --t35: var(--ink-35);
  --t15: var(--ink-15);
  --t08: var(--ink-08);
  --t05: rgba(13,47,68,0.05);
  --blue: var(--sky-deep);
  --blue-lt: var(--sky);
  --blue-ltr: var(--sky-light);
  --bg-2: var(--sky-frost);
  --bg: var(--white);
}
.hero {
  background:#EBF6FD; border:1px solid var(--t08);
  border-radius:var(--r-xl); padding:28px 32px;
  display:grid; grid-template-columns:1fr auto;
  gap:24px; align-items:center;
  margin-bottom:18px; position:relative; overflow:hidden;
  box-shadow:var(--sh-card);
}
.hero::before {
  content:''; position:absolute; top:-60px; right:60px;
  width:320px; height:320px;
  background:radial-gradient(circle, rgba(90,150,212,0.10) 0%, transparent 65%);
  pointer-events:none;
}
.hero-left { position:relative; z-index:1; }
.hero-greeting { font-size:11.5px; color:var(--t35); margin-bottom:6px; letter-spacing:0.06em; text-transform:uppercase; }
.hero-name { font-family:var(--ff-d); font-size:clamp(26px,3vw,38px); font-weight:300; line-height:1.1; color:var(--t100); margin-bottom:12px; }
.hero-name em { font-style:italic; color:var(--blue-ltr); }
.hero-status-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.hero-status-text { font-size:13px; color:var(--t55); }
.hero-status-text strong { color:var(--t80); font-weight:500; }
.toggle-wrap {
  display:flex; align-items:center; gap:12px;
  background:var(--bg-2); border:1px solid var(--t15);
  border-radius:var(--r-full); padding:7px 8px 7px 16px;
  cursor:pointer; user-select:none; transition:all 0.3s ease;
}
.toggle-wrap.online { border-color:rgba(90,150,212,0.35); background:rgba(90,150,212,0.08); box-shadow:var(--sh-glow); }
.toggle-label-text { font-size:12.5px; font-weight:600; color:var(--t55); transition:color 0.3s; white-space:nowrap; }
.toggle-wrap.online .toggle-label-text { color:var(--blue-lt); }
.toggle-track {
  width:44px; height:24px; border-radius:12px;
  background:var(--t15); border:1px solid var(--t15);
  position:relative; flex-shrink:0; transition:background 0.3s, border-color 0.3s;
}
.toggle-wrap.online .toggle-track { background:var(--blue-lt); border-color:var(--blue-lt); box-shadow:0 0 14px rgba(90,150,212,0.5); }
.toggle-thumb {
  position:absolute; top:3px; left:3px; width:16px; height:16px; border-radius:50%;
  background:var(--t55); transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1), background 0.3s;
  box-shadow:0 2px 6px rgba(0,0,0,0.4);
}
.toggle-wrap.online .toggle-thumb { transform:translateX(20px); background:var(--t100); }
.pulse-dot { width:8px; height:8px; border-radius:50%; background:var(--t35); flex-shrink:0; transition:background 0.3s; }
.toggle-wrap.online .pulse-dot { background:var(--green); box-shadow:0 0 8px var(--green); animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }

.hero-stats { display:flex; gap:10px; position:relative; z-index:1; }
.hstat { background:var(--bg-2); border:1px solid var(--t08); border-radius:var(--r-lg); padding:16px 20px; min-width:94px; transition:border-color 0.2s; }
.hstat:hover { border-color:var(--t15); }
.hstat-num { font-family:var(--ff-d); font-size:30px; font-weight:300; color:var(--t100); line-height:1; margin-bottom:5px; }
.hstat-num.blue  { color:var(--blue-lt);  }
.hstat-num.green { color:var(--green);    }
.hstat-num.amber { color:var(--amber);    }
.hstat-label { font-size:10px; color:var(--t35); line-height:1.4; }

.two-col    { display:grid; grid-template-columns:1fr 360px; gap:16px; margin-bottom:16px; }
.bottom-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }

.next-card { background:#EBF6FD; border:1px solid var(--t08); border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-card); }
.next-header { background:linear-gradient(135deg, var(--blue), var(--blue-lt)); padding:22px 26px 18px; position:relative; overflow:hidden; }
.next-header::after { content:''; position:absolute; top:-40px; right:-20px; width:180px; height:180px; background:radial-gradient(circle, rgba(255,255,255,0.10), transparent 65%); }
.next-eyebrow { font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.65); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.next-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.7); }
.next-time { font-family:var(--ff-d); font-size:36px; font-weight:300; color:var(--t100); line-height:1; margin-bottom:4px; }
.next-date { font-size:13px; color:rgba(255,255,255,0.65); text-transform:capitalize; }
.countdown { position:absolute; top:22px; right:26px; text-align:right; }
.countdown-num { font-family:var(--ff-d); font-size:42px; font-weight:300; color:rgba(255,255,255,0.90); line-height:1; }
.countdown-label { font-size:10px; color:rgba(255,255,255,0.50); letter-spacing:0.1em; }
.next-body { padding:20px 24px; }
.next-client { display:flex; align-items:center; gap:14px; margin-bottom:18px; }
.next-av { width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:var(--t100); border:2px solid var(--t15); flex-shrink:0; }
.next-client-name { font-size:15px; font-weight:600; color:var(--t100); margin-bottom:3px; }
.next-client-detail { font-size:12px; color:var(--t55); line-height:1.5; font-weight:300; }
.next-info-row { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
.info-chip { display:flex; align-items:center; gap:5px; padding:5px 12px; border-radius:var(--r-full); background:var(--t05); border:1px solid var(--t08); font-size:11.5px; color:var(--t55); }
.next-notes { margin:0 0 18px; padding:12px 14px; border-radius:var(--r-md); background:rgba(90,150,212,0.08); border:1px solid rgba(90,150,212,0.16); font-size:12px; color:var(--t55); line-height:1.6; }
.next-actions { display:flex; gap:8px; flex-wrap:wrap; }
.next-empty { padding:32px 24px; text-align:center; color:var(--t35); font-size:13px; }

.requests-card { background:#EBF6FD; border:1px solid var(--t08); border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-card); }
.requests-head { padding:18px 20px 14px; border-bottom:1px solid var(--t08); display:flex; align-items:center; justify-content:space-between; }
.requests-title { font-family:var(--ff-d); font-size:17px; color:var(--t100); font-weight:300; }
.requests-badge { background:var(--amber); color:var(--bg); font-size:9.5px; font-weight:700; padding:2px 9px; border-radius:var(--r-full); }
.request-item { padding:14px 20px; border-bottom:1px solid var(--t05); transition:background 0.15s; cursor:pointer; }
.request-item:last-child { border-bottom:none; }
.request-item:hover { background:var(--t05); }
.req-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; margin-bottom:8px; }
.req-client { display:flex; align-items:center; gap:10px; }
.req-av { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; flex-shrink:0; }
.req-name { font-size:13px; font-weight:500; color:var(--t80); margin-bottom:1px; }
.req-type { font-size:11px; color:var(--t35); }
.req-price { font-family:var(--ff-d); font-size:19px; color:var(--blue-lt); }
.req-price span { font-family:var(--ff-s); font-size:10px; color:var(--t35); }
.req-details { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
.req-chip { padding:3px 9px; border-radius:var(--r-full); background:var(--t05); border:1px solid var(--t08); font-size:10.5px; color:var(--t35); }
.req-btns { display:flex; gap:6px; }
.btn-accept { flex:1; padding:8px 12px; border-radius:var(--r-sm); background:var(--green-bg); color:var(--green); border:1px solid rgba(34,197,94,0.25); font-family:var(--ff-s); font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.15s; }
.btn-accept:hover { background:rgba(34,197,94,0.22); }
.btn-decline { padding:8px 12px; border-radius:var(--r-sm); background:var(--red-bg); color:var(--red); border:1px solid rgba(239,68,68,0.2); font-family:var(--ff-s); font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.15s; }
.btn-decline:hover { background:rgba(239,68,68,0.22); }
.req-expand { margin-top:12px; padding-top:12px; border-top:1px solid var(--t08); display:grid; gap:8px; }
.req-expand-line { font-size:11.5px; color:var(--t55); line-height:1.5; }
.req-expand-line strong { color:var(--t80); }
.req-note { background:rgba(90,150,212,0.08); border:1px solid rgba(90,150,212,0.16); border-radius:var(--r-sm); padding:10px 12px; font-size:11.5px; color:var(--t55); line-height:1.6; }

.agenda-card { background:#EBF6FD; border:1px solid var(--t08); border-radius:var(--r-xl); padding:22px 24px; box-shadow:var(--sh-card); }
.day-slot-list { display:flex; flex-direction:column; gap:8px; }
.slot { display:flex; align-items:center; gap:12px; padding:10px 14px; border-radius:var(--r-md); background:var(--t05); border:1px solid var(--t08); transition:all 0.15s; cursor:pointer; }
.slot:hover { background:var(--t08); border-color:var(--t15); }
.slot-bar { width:3px; border-radius:2px; align-self:stretch; min-height:34px; flex-shrink:0; }
.slot-bar.confirmed { background:var(--blue-lt); }
.slot-bar.pending   { background:var(--amber); }
.slot-time { font-size:12px; font-weight:500; color:var(--t55); min-width:100px; }
.slot-name { font-size:13px; font-weight:500; color:var(--t80); flex:1; }
.slot-type { font-size:11px; color:var(--t35); }
.slot-badge { padding:2px 9px; border-radius:var(--r-full); font-size:9.5px; font-weight:600; }
.slot-badge.confirmed { background:rgba(90,150,212,0.12); color:var(--blue-lt); border:1px solid rgba(90,150,212,0.25); }
.slot-badge.pending   { background:var(--amber-bg); color:var(--amber); border:1px solid rgba(245,166,35,0.25); }

.reviews-card { background:#EBF6FD; border:1px solid var(--t08); border-radius:var(--r-xl); padding:22px 24px; box-shadow:var(--sh-card); }
.reviews-header { display:flex; align-items:center; gap:22px; margin-bottom:18px; }
.review-score { font-family:var(--ff-d); font-size:54px; font-weight:300; color:var(--t100); line-height:1; }
.review-score em { font-style:italic; color:var(--blue-lt); }
.review-stars { font-size:16px; color:var(--amber); letter-spacing:-1px; margin-bottom:4px; }
.review-count { font-size:11px; color:var(--t35); }
.review-bars { flex:1; display:flex; flex-direction:column; gap:5px; }
.rbar-row { display:flex; align-items:center; gap:8px; }
.rbar-num { font-size:10px; color:var(--t35); width:6px; text-align:right; }
.rbar-track { flex:1; height:5px; background:var(--t08); border-radius:3px; overflow:hidden; }
.rbar-fill { height:100%; border-radius:3px; background:var(--amber); }
.rbar-count { font-size:10px; color:var(--t35); width:18px; }
.review-list { display:flex; flex-direction:column; gap:12px; }
.review-item { padding-bottom:12px; border-bottom:1px solid var(--t05); }
.review-item:last-child { border-bottom:none; padding-bottom:0; }
.rev-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
.rev-name { font-size:13px; font-weight:500; color:var(--t80); }
.rev-date { font-size:10.5px; color:var(--t35); }
.rev-stars { font-size:11px; color:var(--amber); margin-bottom:4px; }
.rev-text { font-size:12px; color:var(--t55); line-height:1.6; font-weight:300; }

.earnings-card { background:#EBF6FD; border:1px solid var(--t08); border-radius:var(--r-xl); padding:22px 24px; box-shadow:var(--sh-card); }
.earn-total { display:flex; align-items:baseline; gap:5px; margin-bottom:4px; }
.earn-currency { font-size:20px; color:var(--blue-ltr); }
.earn-num { font-family:var(--ff-d); font-size:44px; font-weight:300; color:var(--blue-lt); line-height:1; }
.earn-period { font-size:12px; color:var(--t35); margin-bottom:20px; font-weight:300; }
.earn-breakdown { display:flex; flex-direction:column; gap:7px; }
.earn-sublabel { font-size:10px; color:var(--t35); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:4px; }
.earn-row { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:var(--t05); border-radius:var(--r-sm); border:1px solid var(--t05); }
.earn-row-label { font-size:12.5px; color:var(--t55); display:flex; align-items:center; gap:8px; }
.earn-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.earn-row-val { font-family:var(--ff-d); font-size:15px; color:var(--t80); }
.earn-divider { height:1px; background:var(--t08); margin:4px 0; }
.earn-pending { margin-top:12px; padding:11px 14px; background:var(--amber-bg); border:1px solid rgba(245,166,35,0.22); border-radius:var(--r-md); display:flex; align-items:center; justify-content:space-between; }
.earn-pending-label { font-size:12px; color:var(--amber); }
.earn-pending-val { font-family:var(--ff-d); font-size:17px; color:var(--amber); }

@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
.hero                        { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.04s; }
.two-col > *:nth-child(1)    { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.12s; }
.two-col > *:nth-child(2)    { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.18s; }
.agenda-card                 { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.24s; }
.bottom-row > *:nth-child(1) { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.28s; }
.bottom-row > *:nth-child(2) { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.34s; }
@media (max-width:960px) {
  .two-col, .bottom-row { grid-template-columns:1fr; }
  .hero { grid-template-columns:1fr; }
  .hero-stats { justify-content:flex-start; flex-wrap:wrap; }
}
`;

const REVIEWS = [
  { name: 'Elena Soler', date: 'Hace 3 días', stars: 5, text: 'Gran experiencia. Muy profesional, puntual y cercana durante todo el servicio.' },
  { name: 'Pedro Ruiz', date: 'Hace 1 sem', stars: 5, text: 'Muy buena comunicación y excelente cuidado durante toda la jornada.' },
  { name: 'Ana Villanueva', date: 'Hace 2 sem', stars: 4, text: 'Todo salió muy bien. Repetiríamos sin problema.' },
];

const RATING_BARS = [5, 4, 3, 2, 1];
const RATING_VALS = [18, 5, 1, 0, 0];
const TOTAL_REV = RATING_VALS.reduce((a, b) => a + b, 0);

type PendingRequest = {
  id: number;
  av: string;
  bg: string;
  name: string;
  type: string;
  price: string;
  hours: string;
  date: string;
  time: string;
  address: string;
  notes: string | null;
  estado: string;
};

type NextService = {
  id: number;
  time: string;
  date: string;
  countdown_minutes: number;
  customer_name: string;
  customer_initials: string;
  customer_phone?: string | null;
  customer_summary: string;
  service_description: string;
  duration: string;
  address: string;
  notes?: string | null;
  total: number;
  status: string;
} | null;

type TodaySlot = {
  id: number;
  time: string;
  name: string;
  type: string;
  status: 'confirmed' | 'pending';
};

type CarerDashboardProps = SharedData & {
  pendingRequests: PendingRequest[];
  nextService: NextService;
  todaySlots: TodaySlot[];
  carerStats: {
    today_earnings: number;
    today_services: number;
    pending_requests: number;
    rating: number;
    week_completed_hours: number;
    pending_amount: number;
  };
};

const initialsOf = (value: string) =>
  value.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'TU';

const firstNameOf = (value: string) => value.split(' ').filter(Boolean)[0] ?? 'perfil';

const locationOf = (user?: User | null) =>
  user?.profile?.ciudad || user?.profile?.direccion || user?.specialty || 'Tu ciudad';

const currency = (value: number) => `€${value.toFixed(2)}`;

export default function CarerDashboard() {
  const { auth, pendingRequests, nextService, todaySlots, carerStats } = usePage<CarerDashboardProps>().props;
  const user = auth.user;
  const carerName = user?.name ?? 'Tu perfil';
  const carerInitials = initialsOf(carerName);
  const carerFirstName = firstNameOf(carerName);
  const carerLocation = locationOf(user);
  const profileCompletion = user?.profile_completion?.percentage ?? 0;

  const [online, setOnline] = useState(true);
  const [activeNav, setActiveNav] = useState('Inicio');
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(pendingRequests[0]?.id ?? null);
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(null);

  const heroDate = useMemo(
    () => new Date().toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'short' }),
    []
  );

  const handleRequestAction = (id: number, action: 'aceptar' | 'rechazar') => {
    setProcessingRequestId(id);

    router.patch(`/dashboard/carer/solicitudes/${id}/${action}`, {}, {
      preserveScroll: true,
      onFinish: () => setProcessingRequestId(null),
    });
  };

  const handleNextServiceAction = (action: 'iniciar' | 'completar') => {
    if (!nextService) {
      return;
    }

    router.patch(`/dashboard/carer/solicitudes/${nextService.id}/${action}`, {}, {
      preserveScroll: true,
    });
  };

  const starsStr = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <>
      <style>{css}</style>
      <CarerLayout
        initials={carerInitials}
        userName={carerName}
        userEmail={user?.email ?? 'Sin correo'}
        profileCompletion={profileCompletion}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onLogout={() => router.post('/logout')}
      >
        <div className="hero">
          <div className="hero-left">
            <div className="hero-greeting">{heroDate} · {carerLocation}</div>
            <div className="hero-name">Hola, <em>{carerFirstName}</em> 👋</div>
            <div className="hero-status-row">
              <div className={`toggle-wrap${online ? ' online' : ''}`} onClick={() => setOnline((value) => !value)}>
                <div className="pulse-dot" />
                <span className="toggle-label-text">{online ? 'Disponible' : 'No disponible'}</span>
                <div className="toggle-track"><div className="toggle-thumb" /></div>
              </div>
              <div className="hero-status-text">
                {online
                  ? <><strong>Recibiendo solicitudes</strong> · tus clientes pueden encontrarte</>
                  : 'No recibirás nuevas solicitudes'}
              </div>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hstat"><div className="hstat-num blue">{currency(carerStats.today_earnings)}</div><div className="hstat-label">Ganancias<br />de hoy</div></div>
            <div className="hstat"><div className="hstat-num">{carerStats.today_services}</div><div className="hstat-label">Servicios<br />hoy</div></div>
            <div className="hstat"><div className="hstat-num amber">{carerStats.pending_requests}</div><div className="hstat-label">Solicitudes<br />pendientes</div></div>
            <div className="hstat"><div className="hstat-num green">{carerStats.rating.toFixed(1)}</div><div className="hstat-label">Valoración<br />media</div></div>
          </div>
        </div>

        <div className="two-col">
          <div className="next-card">
            <div className="next-header">
              <div className="next-eyebrow"><div className="next-eyebrow-dot" />Próximo servicio</div>
              <div className="next-time">{nextService?.time ?? '--:--'}</div>
              <div className="next-date">{nextService?.date ?? 'Sin servicios confirmados'}</div>
              {nextService && (
                <div className="countdown">
                  <div className="countdown-num">{Math.max(0, nextService.countdown_minutes)}</div>
                  <div className="countdown-label">MIN RESTANTES</div>
                </div>
              )}
            </div>

            {nextService ? (
              <div className="next-body">
                <div className="next-client">
                  <div className="next-av" style={{ background: 'linear-gradient(135deg,#0e2d5a,#2e6fba)' }}>{nextService.customer_initials}</div>
                  <div>
                    <div className="next-client-name">{nextService.customer_name}</div>
                    <div className="next-client-detail">{nextService.customer_summary}<br />{nextService.service_description}</div>
                  </div>
                </div>
                <div className="next-info-row">
                  <div className="info-chip"><span>⏱</span> {nextService.duration}</div>
                  <div className="info-chip"><span>📍</span> {nextService.address}</div>
                  <div className="info-chip"><span>💰</span> {currency(nextService.total)}</div>
                </div>
                {nextService.notes && (
                  <div className="next-notes">
                    <strong>Notas:</strong> {nextService.notes}
                  </div>
                )}
                <div className="next-actions">
                  {nextService.status === 'aceptada' && (
                    <button className="btn-primary" onClick={() => handleNextServiceAction('iniciar')}>Iniciar servicio</button>
                  )}
                  {nextService.status === 'en_curso' && (
                    <button className="btn-primary" onClick={() => handleNextServiceAction('completar')}>Completar servicio</button>
                  )}
                  {nextService.customer_phone && (
                    <button className="btn-secondary" onClick={() => window.open(`tel:${nextService.customer_phone}`, '_self')}>📞 Llamar</button>
                  )}
                  <button className="btn-secondary" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextService.address)}`, '_blank')}>🗺 Ruta</button>
                </div>
              </div>
            ) : (
              <div className="next-empty">Aún no tienes servicios aceptados o en curso.</div>
            )}
          </div>

          <div className="requests-card">
            <div className="requests-head">
              <div className="requests-title">Solicitudes</div>
              {pendingRequests.length > 0 && <span className="requests-badge">{pendingRequests.length} nuevas</span>}
            </div>
            {pendingRequests.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--t35)', fontSize: 13 }}>
                No hay solicitudes pendientes
              </div>
            ) : pendingRequests.map((request) => {
              const isExpanded = expandedRequestId === request.id;
              const isBusy = processingRequestId === request.id;

              return (
                <div
                  className="request-item"
                  key={request.id}
                  onClick={() => setExpandedRequestId((current) => current === request.id ? null : request.id)}
                >
                  <div className="req-top">
                    <div className="req-client">
                      <div className="req-av" style={{ background: request.bg }}>{request.av}</div>
                      <div>
                        <div className="req-name">{request.name}</div>
                        <div className="req-type">{request.type}</div>
                      </div>
                    </div>
                    <div className="req-price">{request.price}<span>/h</span></div>
                  </div>
                  <div className="req-details">
                    <span className="req-chip">📅 {request.date}</span>
                    <span className="req-chip">🕐 {request.time}</span>
                    <span className="req-chip">⏱ {request.hours}</span>
                  </div>
                  {isExpanded && (
                    <div className="req-expand" onClick={(event) => event.stopPropagation()}>
                      <div className="req-expand-line"><strong>Dirección:</strong> {request.address}</div>
                      {request.notes && <div className="req-note"><strong>Notas:</strong> {request.notes}</div>}
                      <div className="req-btns">
                        <button className="btn-accept" disabled={isBusy} onClick={() => handleRequestAction(request.id, 'aceptar')}>✓ Aceptar</button>
                        <button className="btn-decline" disabled={isBusy} onClick={() => handleRequestAction(request.id, 'rechazar')}>✕ Rechazar</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="agenda-card">
          <div className="sec-title">Servicios de hoy</div>
          <div className="day-slot-list">
            {todaySlots.length === 0 ? (
              <div style={{ color: 'var(--t35)', fontSize: 13 }}>No tienes servicios agendados para hoy.</div>
            ) : todaySlots.map((slot) => (
              <div className="slot" key={slot.id}>
                <div className={`slot-bar ${slot.status}`} />
                <div className="slot-time">{slot.time}</div>
                <div style={{ flex: 1 }}>
                  <div className="slot-name">{slot.name}</div>
                  <div className="slot-type">{slot.type}</div>
                </div>
                <div className={`slot-badge ${slot.status}`}>{slot.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-row">
          <div className="reviews-card">
            <div className="sec-title">Mis valoraciones</div>
            <div className="reviews-header">
              <div>
                <div className="review-score">4<em>.9</em></div>
                <div className="review-stars">★★★★★</div>
                <div className="review-count">{TOTAL_REV} reseñas</div>
              </div>
              <div className="review-bars">
                {RATING_BARS.map((n, i) => (
                  <div className="rbar-row" key={n}>
                    <span className="rbar-num">{n}</span>
                    <div className="rbar-track">
                      <div className="rbar-fill" style={{ width: `${TOTAL_REV > 0 ? (RATING_VALS[i] / TOTAL_REV * 100) : 0}%` }} />
                    </div>
                    <span className="rbar-count">{RATING_VALS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="review-list">
              {REVIEWS.map((review) => (
                <div className="review-item" key={review.name}>
                  <div className="rev-top">
                    <span className="rev-name">{review.name}</span>
                    <span className="rev-date">{review.date}</span>
                  </div>
                  <div className="rev-stars">{starsStr(review.stars)}</div>
                  <div className="rev-text">{review.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="earnings-card">
            <div className="sec-title">Ganancias</div>
            <div className="earn-total">
              <span className="earn-currency">€</span>
              <span className="earn-num">{carerStats.today_earnings.toFixed(2)}</span>
            </div>
            <div className="earn-period">Esta semana · {carerStats.week_completed_hours} horas completadas</div>
            <div className="earn-breakdown">
              <div className="earn-sublabel">Resumen actual</div>
              <div className="earn-row">
                <span className="earn-row-label"><span className="earn-dot" style={{ background: 'var(--blue-lt)' }} />Ganado hoy</span>
                <span className="earn-row-val">{currency(carerStats.today_earnings)}</span>
              </div>
              <div className="earn-row">
                <span className="earn-row-label"><span className="earn-dot" style={{ background: 'var(--amber)' }} />Solicitudes pendientes</span>
                <span className="earn-row-val">{carerStats.pending_requests}</span>
              </div>
              <div className="earn-divider" />
              <div className="earn-row">
                <span className="earn-row-label" style={{ color: 'var(--t80)', fontWeight: 500 }}>Monto potencial</span>
                <span className="earn-row-val">{currency(carerStats.pending_amount)}</span>
              </div>
            </div>
            <div className="earn-pending">
              <span className="earn-pending-label">⏳ Pendiente por confirmar</span>
              <span className="earn-pending-val">{currency(carerStats.pending_amount)}</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => router.visit('/dashboard/carer/agenda')}>Ver agenda completa</button>
            </div>
          </div>
        </div>
      </CarerLayout>
    </>
  );
}
