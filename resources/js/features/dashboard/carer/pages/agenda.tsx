import { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import CarerLayout from '@/features/layouts/carer_layout';
import type { SharedData } from '@/types';

const css = `
/* ═══════════════════════ ROOT ═══════════════════════ */
.agenda-root { display:flex; flex-direction:column; gap:12px; }

/* ═══════════════════════ CALENDAR CARD ═══════════════════════ */
/* Month nav + day strip unified in one card */
.calendar-card {
  background:#EBF6FD; border:1px solid var(--t08);
  border-radius:var(--r-xl); overflow:hidden;
  box-shadow:var(--sh-card);
  animation:fadeUp 0.35s cubic-bezier(0.22,0.68,0,1) both;
}
.calendar-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 14px 8px;
  border-bottom:1px solid var(--t08);
}
.month-nav { display:flex; align-items:center; gap:4px; }
.month-label { font-family:var(--ff-d); font-size:13px; font-weight:300; color:var(--t100); min-width:110px; text-align:center; }
.month-btn {
  width:24px; height:24px; border-radius:50%;
  background:none; border:1px solid var(--t08);
  color:var(--t55); font-size:13px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all 0.14s;
}
.month-btn:hover { background:var(--t05); border-color:var(--t15); color:var(--t80); }
.cal-legend { display:flex; gap:10px; }
.legend-item { display:flex; align-items:center; gap:4px; font-size:9px; color:var(--t35); }
.legend-dot  { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

.day-strip {
  display:flex;
  overflow-x:auto;
  scroll-behavior:smooth;
  padding:8px 10px 10px;
  scrollbar-width:none;
  gap:2px;
}
.day-strip::-webkit-scrollbar { display:none; }

.day-chip {
  flex:1 1 0; min-width:38px;
  display:flex; flex-direction:column; align-items:center;
  padding:7px 3px 6px;
  border-radius:var(--r-md);
  border:1px solid transparent;
  cursor:pointer; transition:all 0.15s;
  background:transparent; gap:3px;
}
.day-chip:hover:not(.active) { background:var(--t05); border-color:var(--t08); }
.day-chip.active {
  background:var(--blue-lt);
  box-shadow:0 2px 10px rgba(90,150,212,0.35);
}
.day-chip.today:not(.active) {
  border-color:rgba(90,150,212,0.30);
  background:rgba(90,150,212,0.06);
}
.day-chip.past:not(.active):not(.today) { opacity:0.38; }

.dc-dow {
  font-size:8px; font-weight:600; text-transform:uppercase;
  letter-spacing:0.06em; line-height:1; color:var(--t35);
}
.day-chip.active   .dc-dow { color:rgba(255,255,255,0.72); }
.day-chip.today:not(.active) .dc-dow { color:var(--blue-lt); }

.dc-num {
  font-family:var(--ff-d); font-size:17px; font-weight:300; line-height:1; color:var(--t80);
}
.day-chip.active   .dc-num { color:#fff; font-weight:400; }
.day-chip.today:not(.active) .dc-num { color:var(--blue-lt); }

.dc-dots { display:flex; gap:2px; justify-content:center; height:4px; }
.dc-dot  { width:3px; height:3px; border-radius:50%; }
.dc-dot.confirmed { background:var(--blue-lt); }
.dc-dot.pending   { background:var(--amber); }
.dc-dot.on-active { background:rgba(255,255,255,0.65); }

/* ═══════════════════════ DAY DETAIL CARD ═══════════════════════ */
/* Banner + services unified in one card */
.day-detail-card {
  background:#EBF6FD; border:1px solid var(--t08);
  border-radius:var(--r-xl); overflow:hidden;
  box-shadow:var(--sh-card);
  animation:fadeUp 0.30s cubic-bezier(0.22,0.68,0,1) both;
}

/* Compact header bar replaces the large blue banner */
.day-detail-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 16px 10px; border-bottom:1px solid var(--t08);
  background:linear-gradient(135deg, var(--blue), var(--blue-lt));
  position:relative; overflow:hidden;
}
.day-detail-head::after {
  content:''; position:absolute; top:-30px; right:-10px;
  width:120px; height:120px;
  background:radial-gradient(circle, rgba(255,255,255,0.10), transparent 65%);
  pointer-events:none;
}
.ddh-left {}
.ddh-date { font-family:var(--ff-d); font-size:17px; font-weight:300; color:#fff; line-height:1.1; }
.ddh-meta { font-size:10px; color:rgba(255,255,255,0.62); margin-top:2px; }
.ddh-stats { display:flex; gap:6px; flex-shrink:0; }
.ddh-stat {
  background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.22);
  border-radius:var(--r-full); padding:3px 10px;
  display:flex; flex-direction:column; align-items:center;
  font-size:9px; color:rgba(255,255,255,0.72); white-space:nowrap;
}
.ddh-stat strong { font-family:var(--ff-d); font-size:14px; font-weight:400; color:#fff; line-height:1.1; }
.ddh-stat.amber { background:rgba(245,166,35,0.22); border-color:rgba(245,166,35,0.38); }

/* Services inside the day-detail card */
.services-body { padding:10px 12px; display:flex; flex-direction:column; gap:6px; }

/* Service row: timeline column + content */
.svc-row {
  display:flex; align-items:stretch;
  border-radius:var(--r-md); overflow:hidden;
  border:1px solid var(--t08); background:var(--bg-2);
  cursor:pointer; transition:all 0.15s;
}
.svc-row:hover { border-color:var(--t15); box-shadow:0 2px 8px rgba(0,0,0,0.05); }

.svc-time-col {
  width:56px; flex-shrink:0;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:10px 4px; border-right:1px solid var(--t08);
  background:var(--t03); gap:2px;
}
.svc-time-start { font-family:var(--ff-d); font-size:13px; color:var(--blue-lt); line-height:1; }
.svc-time-end   { font-size:9px; color:var(--t35); }
.svc-time-hrs   { font-size:9px; color:var(--t35); margin-top:3px; padding-top:3px; border-top:1px solid var(--t08); }

.svc-bar { width:3px; flex-shrink:0; }
.svc-bar.confirmed { background:var(--blue-lt); }
.svc-bar.pending   { background:var(--amber); }

.svc-body { flex:1; min-width:0; padding:9px 10px; }
.svc-name { font-size:13px; font-weight:500; color:var(--t80); margin-bottom:1px; }
.svc-type { font-size:10px; color:var(--t35); margin-bottom:3px; }
.svc-addr { font-size:10px; color:var(--t55); }
.svc-badge { display:inline-flex; padding:2px 7px; border-radius:var(--r-full); font-size:9px; font-weight:600; margin-top:4px; }
.svc-badge.confirmed { background:rgba(90,150,212,0.12); color:var(--blue-lt); border:1px solid rgba(90,150,212,0.22); }
.svc-badge.pending   { background:var(--amber-bg); color:var(--amber); border:1px solid rgba(245,166,35,0.22); }

.svc-price-col {
  padding:9px 12px; display:flex; flex-direction:column;
  align-items:flex-end; justify-content:center; flex-shrink:0; gap:1px;
}
.svc-price     { font-family:var(--ff-d); font-size:17px; color:var(--t80); }
.svc-price-lbl { font-size:9px; color:var(--t35); }

.svc-empty { padding:28px 16px; text-align:center; color:var(--t35); font-size:12px; }
.svc-empty-icon { font-size:26px; margin-bottom:6px; }

/* ═══════════════════════ UPCOMING ═══════════════════════ */
.upcoming-card {
  background:#EBF6FD; border:1px solid var(--t08);
  border-radius:var(--r-xl); overflow:hidden;
  box-shadow:var(--sh-card);
  animation:fadeUp 0.40s cubic-bezier(0.22,0.68,0,1) both 0.08s;
}
.upcoming-head {
  padding:10px 16px 9px; border-bottom:1px solid var(--t08);
  display:flex; align-items:center; justify-content:space-between;
}
.sec-label { font-family:var(--ff-d); font-size:13px; font-weight:300; color:var(--t100); }
.svc-count {
  background:rgba(90,150,212,0.12); color:var(--blue-lt);
  font-size:10px; font-weight:700; padding:2px 9px;
  border-radius:var(--r-full); border:1px solid rgba(90,150,212,0.22);
}

/* Group headers inside upcoming */
.upc-group-label {
  font-size:9px; font-weight:700; text-transform:uppercase;
  letter-spacing:0.07em; color:var(--t35);
  padding:8px 16px 4px;
  background:var(--t03); border-bottom:1px solid var(--t05);
}

.upc-list { display:flex; flex-direction:column; }
.upc-item {
  display:flex; align-items:center; gap:10px;
  padding:9px 16px; border-bottom:1px solid var(--t05);
  cursor:pointer; transition:background 0.14s;
}
.upc-item:last-child { border-bottom:none; }
.upc-item:hover { background:var(--t03); }

.upc-date-badge {
  min-width:38px; text-align:center;
  background:var(--bg-2); border:1px solid var(--t08);
  border-radius:var(--r-md); padding:4px 3px; flex-shrink:0;
}
.upc-day-num  { font-family:var(--ff-d); font-size:15px; font-weight:300; color:var(--blue-lt); line-height:1; }
.upc-day-name { font-size:7px; color:var(--t35); text-transform:uppercase; letter-spacing:0.06em; }

.upc-sdot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.upc-sdot.confirmed { background:var(--blue-lt); }
.upc-sdot.pending   { background:var(--amber); }

.upc-info { flex:1; min-width:0; }
.upc-name   { font-size:12px; font-weight:500; color:var(--t80); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:1px; }
.upc-detail { font-size:10px; color:var(--t35); }

.upc-right { display:flex; flex-direction:column; align-items:flex-end; gap:1px; flex-shrink:0; }
.upc-price  { font-family:var(--ff-d); font-size:13px; color:var(--blue-lt); }
.upc-time   { font-size:9px; color:var(--t35); }

/* ═══════════════════════ ANIMATIONS ═══════════════════════ */
@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }

@media (max-width:600px) {
  .ddh-stats { display:none; }
  .dc-num    { font-size:14px; }
}
`;

type Status = 'confirmed' | 'pending';
interface Service {
  id: number; clientName: string; type: string;
  timeStart: string; timeEnd: string; hours: number; price: number;
  status: Status; date: string; address: string;
}

const SERVICES: Service[] = [
  { id:1,  clientName:'José Fernández', type:'Adulto mayor · Alzheimer leve', timeStart:'09:00', timeEnd:'12:00', hours:3, price:54,  status:'confirmed', date:'2025-06-23', address:'C/ Serrano 42'      },
  { id:2,  clientName:'Lucas Martín',   type:'Niño · 4 años',                 timeStart:'16:00', timeEnd:'19:00', hours:3, price:48,  status:'confirmed', date:'2025-06-23', address:'Av. Castellana 88'   },
  { id:3,  clientName:'Rosa Pérez',     type:'Adulto mayor · Alzheimer',      timeStart:'10:00', timeEnd:'14:00', hours:4, price:84,  status:'confirmed', date:'2025-06-24', address:'C/ Goya 15'          },
  { id:4,  clientName:'Tomás García',   type:'Niño · 2 años',                 timeStart:'09:00', timeEnd:'14:00', hours:5, price:80,  status:'confirmed', date:'2025-06-25', address:'C/ Velázquez 33'     },
  { id:5,  clientName:'Elena Soler',    type:'Adulto mayor · Compañía',       timeStart:'10:00', timeEnd:'13:00', hours:3, price:54,  status:'confirmed', date:'2025-06-25', address:'C/ Alcalá 120'       },
  { id:6,  clientName:'Pedro Ruiz',     type:'Adulto mayor · Post-op',        timeStart:'15:00', timeEnd:'18:00', hours:3, price:60,  status:'pending',   date:'2025-06-26', address:'C/ Mayor 7'          },
  { id:7,  clientName:'Marta López',    type:'Niño · 6 años',                 timeStart:'08:00', timeEnd:'14:00', hours:6, price:96,  status:'confirmed', date:'2025-06-27', address:'Paseo del Prado 4'   },
  { id:8,  clientName:'Carlos Díaz',    type:'Adulto mayor · Diabetes',       timeStart:'09:00', timeEnd:'12:00', hours:3, price:54,  status:'pending',   date:'2025-06-28', address:'C/ Fuencarral 55'    },
  { id:9,  clientName:'Ana Villanueva', type:'Adulto mayor · Movilidad red.',  timeStart:'11:00', timeEnd:'14:00', hours:3, price:60,  status:'confirmed', date:'2025-06-30', address:'C/ Hortaleza 22'     },
  { id:10, clientName:'José Fernández', type:'Adulto mayor · Alzheimer leve', timeStart:'09:00', timeEnd:'12:00', hours:3, price:54,  status:'confirmed', date:'2025-07-02', address:'C/ Serrano 42'       },
  { id:11, clientName:'Lucas Martín',   type:'Niño · 4 años',                 timeStart:'16:00', timeEnd:'19:00', hours:3, price:48,  status:'confirmed', date:'2025-07-03', address:'Av. Castellana 88'   },
  { id:12, clientName:'Rosa Pérez',     type:'Adulto mayor · Alzheimer',      timeStart:'10:00', timeEnd:'14:00', hours:4, price:84,  status:'pending',   date:'2025-07-05', address:'C/ Goya 15'          },
];

const MONTHS   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOW_FULL = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const DOW_2    = ['Do','Lu','Ma','Mi','Ju','Vi','Sá'];
const TODAY    = '2025-06-25';

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
function parseDate(ds: string) {
  const d = new Date(ds + 'T00:00:00');
  return { day:d.getDate(), dow:DOW_FULL[d.getDay()], dow2:DOW_2[d.getDay()], month:MONTHS[d.getMonth()] };
}

/** Relative label for upcoming groups */
function relativeGroup(ds: string): string {
  if (ds === TODAY) return 'Hoy';
  const next = new Date(TODAY + 'T00:00:00');
  next.setDate(next.getDate() + 1);
  if (ds === toDateStr(next.getFullYear(), next.getMonth(), next.getDate())) return 'Mañana';
  return 'Próximamente';
}

export default function AgendaPage() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const [activeNav,    setActiveNav]    = useState('Agenda');
  const [viewYear,     setViewYear]     = useState(2025);
  const [viewMonth,    setViewMonth]    = useState(5);
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const stripRef      = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLDivElement>(null);

  const prevMonth = () => { if (viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); };

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const days = Array.from({length:daysInMonth}, (_,i) => i+1);

  const svcsOn = (d: string) => SERVICES.filter(s=>s.date===d).sort((a,b)=>a.timeStart.localeCompare(b.timeStart));
  const selectedSvcs = svcsOn(selectedDate);

  // Upcoming: from today, sorted, grouped
  const upcomingRaw = SERVICES
    .filter(s => s.date >= TODAY)
    .sort((a,b) => a.date.localeCompare(b.date) || a.timeStart.localeCompare(b.timeStart))
    .slice(0, 7);

  // Build grouped list
  type Group = { label: string; items: Service[] };
  const upcomingGroups: Group[] = [];
  for (const svc of upcomingRaw) {
    const lbl = relativeGroup(svc.date);
    const last = upcomingGroups[upcomingGroups.length - 1];
    if (last && last.label === lbl) last.items.push(svc);
    else upcomingGroups.push({ label: lbl, items: [svc] });
  }

  const sel = parseDate(selectedDate);
  const totalHrs  = selectedSvcs.reduce((a,s) => a + s.hours, 0);
  const totalEuro = selectedSvcs.reduce((a,s) => a + s.price, 0);
  const hasPend   = selectedSvcs.some(s => s.status === 'pending');
  const hasConf   = selectedSvcs.some(s => s.status === 'confirmed');

  useEffect(() => {
    if (activeChipRef.current && stripRef.current) {
      const strip = stripRef.current;
      const chip  = activeChipRef.current;
      strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth/2 + chip.offsetWidth/2, behavior:'smooth' });
    }
  }, [selectedDate, viewMonth]);

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
        <div className="agenda-root">

          {/* ── CALENDAR CARD: month nav + day strip in one block ── */}
          <div className="calendar-card">
            <div className="calendar-head">
              <div className="month-nav">
                <button className="month-btn" onClick={prevMonth}>‹</button>
                <div className="month-label">{MONTHS[viewMonth]} {viewYear}</div>
                <button className="month-btn" onClick={nextMonth}>›</button>
              </div>
              <div className="cal-legend">
                <div className="legend-item"><div className="legend-dot" style={{background:'var(--blue-lt)'}} />Confirmado</div>
                <div className="legend-item"><div className="legend-dot" style={{background:'var(--amber)'}} />Pendiente</div>
              </div>
            </div>

            <div className="day-strip" ref={stripRef}>
              {days.map(day => {
                const ds       = toDateStr(viewYear, viewMonth, day);
                const svcs     = svcsOn(ds);
                const isActive = ds === selectedDate;
                const isToday  = ds === TODAY;
                const isPast   = ds < TODAY;
                const hasC     = svcs.some(s => s.status === 'confirmed');
                const hasP     = svcs.some(s => s.status === 'pending');
                const d2       = parseDate(ds);
                const cls = ['day-chip', isActive?'active':'', isToday&&!isActive?'today':'', isPast&&!isToday?'past':''].filter(Boolean).join(' ');
                return (
                  <div key={ds} className={cls} ref={isActive ? activeChipRef : undefined} onClick={() => setSelectedDate(ds)}>
                    <div className="dc-dow">{d2.dow2}</div>
                    <div className="dc-num">{day}</div>
                    <div className="dc-dots">
                      {hasC && <div className={`dc-dot ${isActive?'on-active':'confirmed'}`} />}
                      {hasP && <div className={`dc-dot ${isActive?'on-active':'pending'}`}   />}
                      {!hasC && !hasP && <div style={{width:3,height:3}} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── DAY DETAIL CARD: banner + services in one block ── */}
          <div className="day-detail-card" key={selectedDate}>
            {/* Compact header with day info + summary stats */}
            <div className="day-detail-head">
              <div className="ddh-left">
                <div className="ddh-date">{sel.dow}, {sel.day} de {sel.month}</div>
                <div className="ddh-meta">
                  {selectedSvcs.length === 0
                    ? 'Día libre — sin servicios'
                    : `${selectedSvcs.length} servicio${selectedSvcs.length>1?'s':''} programados`}
                </div>
              </div>
              {selectedSvcs.length > 0 && (
                <div className="ddh-stats">
                  <div className="ddh-stat">
                    <strong>{totalHrs}h</strong>
                    trabajo
                  </div>
                  <div className="ddh-stat">
                    <strong>€{totalEuro}</strong>
                    total
                  </div>
                  {hasPend && (
                    <div className="ddh-stat amber">
                      <strong>{selectedSvcs.filter(s=>s.status==='pending').length}</strong>
                      pend.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Services list */}
            <div className="services-body">
              {selectedSvcs.length === 0 ? (
                <div className="svc-empty">
                  <div className="svc-empty-icon">📭</div>
                  No hay servicios — desliza para ver otro día.
                </div>
              ) : selectedSvcs.map(s => (
                <div className="svc-row" key={s.id}>
                  <div className="svc-time-col">
                    <div className="svc-time-start">{s.timeStart}</div>
                    <div className="svc-time-end">{s.timeEnd}</div>
                    <div className="svc-time-hrs">{s.hours}h</div>
                  </div>
                  <div className={`svc-bar ${s.status}`} />
                  <div className="svc-body">
                    <div className="svc-name">{s.clientName}</div>
                    <div className="svc-type">{s.type}</div>
                    <div className="svc-addr">📍 {s.address}</div>
                    <div className={`svc-badge ${s.status}`}>{s.status==='confirmed'?'Confirmado':'Pendiente'}</div>
                  </div>
                  <div className="svc-price-col">
                    <div className="svc-price">€{s.price}</div>
                    <div className="svc-price-lbl">total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── UPCOMING: grouped by relative date ── */}
          <div className="upcoming-card">
            <div className="upcoming-head">
              <div className="sec-label">Próximos servicios</div>
              <span className="svc-count">{upcomingRaw.length}</span>
            </div>
            <div className="upc-list">
              {upcomingGroups.map(group => (
                <div key={group.label}>
                  <div className="upc-group-label">{group.label}</div>
                  {group.items.map(s => {
                    const d = parseDate(s.date);
                    return (
                      <div className="upc-item" key={s.id} onClick={() => setSelectedDate(s.date)}>
                        <div className="upc-date-badge">
                          <div className="upc-day-num">{d.day}</div>
                          <div className="upc-day-name">{d.dow2}</div>
                        </div>
                        <div className={`upc-sdot ${s.status}`} />
                        <div className="upc-info">
                          <div className="upc-name">{s.clientName}</div>
                          <div className="upc-detail">📍 {s.address}</div>
                        </div>
                        <div className="upc-right">
                          <div className="upc-price">€{s.price}</div>
                          <div className="upc-time">{s.timeStart}–{s.timeEnd}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </CarerLayout>
    </>
  );
}
