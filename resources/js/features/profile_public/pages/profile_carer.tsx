import { useState } from 'react';
import CarerLayout from '@/features/layouts/carer_layout';

const PROFILE = {
  name:       'María Carrasco',
  initials:   'MC',
  city:       'Madrid',
  neighborhood: 'Salamanca',
  memberSince: 'enero 2024',
  descripcion_general_servicio: `Soy María, cuidadora profesional con más de 8 años de experiencia especializada en el cuidado de personas mayores, niños y mascotas en Madrid. Me formé como auxiliar sociosanitaria y he completado formaciones en geriatría, estimulación cognitiva y primeros auxilios pediátricos.

Me caracterizo por mi paciencia, mi capacidad de escucha y mi compromiso con el bienestar de cada persona que cuido. Para mí, cada familia es única, y me esfuerzo en entender sus rutinas, preferencias y necesidades desde el primer día.`,
};

const SERVICES = [
  { tipo: 'adultos_mayores', icon: '👴', name: 'Adultos mayores', descripcion: 'Acompañamiento, higiene personal, medicación y estimulación cognitiva.' },
  { tipo: 'ninos',           icon: '👶', name: 'Niños',           descripcion: 'Recogida escolar, actividades Montessori y refuerzo educativo.' },
  { tipo: 'mascotas',        icon: '🐾', name: 'Mascotas',        descripcion: 'Paseos diarios, alimentación y compañía.' },
];

const DISPONIBILIDADES = [
  { dia_semana: 1, hora_inicio: '08:00', hora_fin: '14:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 1, hora_inicio: '17:00', hora_fin: '20:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 2, hora_inicio: '08:00', hora_fin: '14:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 3, hora_inicio: '08:00', hora_fin: '14:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 3, hora_inicio: '16:00', hora_fin: '19:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 4, hora_inicio: '15:00', hora_fin: '20:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
  { dia_semana: 5, hora_inicio: '15:00', hora_fin: '20:00', duracion_minima_minutos: 120, aviso_previo_horas: 24 },
];

const DOCUMENTOS_VERIFICADOS = [
  { titulo: 'Verificada',       icon: '✓'  },
  { titulo: 'Background check', icon: '🔍' },
  { titulo: 'Primeros auxilios',icon: '🏥' },
  { titulo: 'Cuidados geriátricos', icon: '🧠' },
];

const WEEK_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const buildAvailability = () => {
  const activeDays  = new Set(DISPONIBILIDADES.map(s => s.dia_semana - 1));
  const minNotice   = Math.min(...DISPONIBILIDADES.map(s => s.aviso_previo_horas));
  const minDuration = Math.min(...DISPONIBILIDADES.map(s => s.duracion_minima_minutos));
  // Map from day index (0-based) to array of {hora_inicio, hora_fin} blocks
  const daySchedule: Record<number, Array<{ hora_inicio: string; hora_fin: string }>> = {};
  DISPONIBILIDADES.forEach(s => {
    const idx = s.dia_semana - 1;
    if (!daySchedule[idx]) daySchedule[idx] = [];
    daySchedule[idx].push({ hora_inicio: s.hora_inicio, hora_fin: s.hora_fin });
  });
  return { activeDays, minNotice, minDuration, daySchedule };
};

const css = `
:root {
  --base:      #4aa2db;
  --bg:        #3a8fc7;
  --bg2:       #e8f4fc;
  --card:      #ffffff;
  --card2:     #f0f8ff;
  --blue:      #4aa2db;
  --blue-ltr:  #a8d5f0;
  --t100: #0d2b40;
  --t80:  rgba(13,43,64,0.88);
  --t55:  rgba(13,43,64,0.62);
  --t35:  rgba(13,43,64,0.42);
  --t15:  rgba(13,43,64,0.18);
  --t08:  rgba(13,43,64,0.10);
  --t05:  rgba(13,43,64,0.06);
  --green:    #22c55e;
  --green-bg: rgba(34,197,94,0.18);
  --amber:    #fbbf24;
  --red:      #f87171;
  --ff-d: 'DM Serif Display', Georgia, serif;
  --ff-s: 'DM Sans', system-ui, sans-serif;
  --r-sm:10px; --r-md:14px; --r-lg:20px; --r-xl:26px; --r-full:999px;
  --sh-card: 0 2px 16px rgba(13,43,64,0.14), 0 1px 4px rgba(13,43,64,0.08);
  --sh-blue: 0 6px 28px rgba(13,43,64,0.20);
}

.page-wrapper{width:100%;max-width:1600px;margin:0 auto;padding:0 clamp(16px,2.5vw,40px);box-sizing:border-box}

.profile-grid{display:grid;grid-template-columns:1fr clamp(340px,26%,480px);gap:clamp(16px,2vw,32px);align-items:start}

.hero-banner{border-radius:var(--r-xl);overflow:hidden;margin-bottom:24px;box-shadow:var(--sh-card);animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.04s}
.hero-body{background:var(--card);padding:24px clamp(20px,3vw,40px) 30px}
.hero-identity{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:20px}
.hero-av-wrap{position:relative;flex-shrink:0}
.hero-av{width:112px;height:112px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-ltr));display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:#fff;font-family:var(--ff-s);border:4px solid var(--card2);box-shadow:0 4px 16px rgba(13,43,64,0.18)}
.hero-verified-ring{position:absolute;bottom:5px;right:5px;width:30px;height:30px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:13px;border:3px solid var(--card)}
.hero-name-block{flex:1}
.hero-name{font-family:var(--ff-d);font-size:clamp(24px,2.5vw,40px);font-weight:300;color:var(--t100);line-height:1.1;letter-spacing:-0.02em;margin-bottom:6px}
.hero-name em{font-style:italic;color:var(--blue)}
.hero-spec{font-size:14px;color:var(--blue);font-weight:500;letter-spacing:0.02em;margin-bottom:8px}
.hero-meta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:8px}
.hero-meta-item{display:flex;align-items:center;gap:5px;font-size:12.5px;color:var(--t55)}
.hero-meta-item strong{color:var(--t80);font-weight:500}
.hero-meta-sep{width:3px;height:3px;border-radius:50%;background:var(--t15);flex-shrink:0}
.member-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:var(--r-full);background:var(--bg2);border:1px solid var(--t08);font-size:12px;color:var(--t55)}
.hero-tags{display:flex;gap:8px;flex-wrap:wrap}
.hero-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:var(--r-full);font-size:12px;font-weight:500}
.hero-tag.service{background:rgba(74,162,219,0.12);color:var(--blue);border:1px solid rgba(74,162,219,0.30)}
.hero-tag.verified{background:var(--green-bg);color:#16a34a;border:1px solid rgba(34,197,94,0.30)}

.sec-card{background:var(--card);border:1px solid var(--t08);border-radius:var(--r-xl);overflow:hidden;margin-bottom:20px;box-shadow:var(--sh-card)}
.sec-header{padding:20px 26px 16px;border-bottom:1px solid var(--t08)}
.sec-title-main{font-family:var(--ff-d);font-size:19px;font-weight:300;color:var(--t100)}
.sec-body{padding:20px 26px}
.mini-sec{font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--blue);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.mini-sec::after{content:'';flex:1;height:1px;background:var(--t08)}

.bio-text{font-size:14.5px;color:var(--t80);line-height:1.9;font-weight:300}
.bio-text p{margin-bottom:14px}
.bio-text p:last-child{margin-bottom:0}

.service-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.svc-card{background:var(--bg2);border:1px solid var(--t08);border-radius:var(--r-lg);padding:20px 16px;text-align:center}
.svc-icon{font-size:30px;margin-bottom:10px}
.svc-name{font-size:14px;font-weight:600;color:var(--t80);margin-bottom:4px}
.svc-desc{font-size:12px;color:var(--t55);line-height:1.5;margin-top:6px;text-align:left}

.week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.wg-col{display:flex;flex-direction:column;align-items:center;gap:0}
.wg-col.off .wg-blocks{opacity:0.35}
.wg-day-name{font-size:9px;color:var(--t35);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:7px;text-align:center}
.wg-dot{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0}
.wg-dot.avail{background:rgba(34,197,94,0.15);color:#16a34a;border:1px solid rgba(34,197,94,0.30)}
.wg-dot.off{background:var(--t05);color:var(--t35);border:1px solid var(--t08)}
.wg-connector{width:2px;height:10px;background:var(--t08);flex-shrink:0}
.wg-connector.avail{background:rgba(34,197,94,0.25)}
.wg-blocks{display:flex;flex-direction:column;gap:4px;width:100%}
.wg-block{background:rgba(74,162,219,0.10);border:1px solid rgba(74,162,219,0.25);border-radius:var(--r-sm);padding:5px 4px;text-align:center}
.wg-block-time{font-size:10px;font-weight:600;color:var(--blue);line-height:1.3;display:block}
.wg-no-blocks{height:32px}

.time-badge{display:inline-flex;align-items:center;gap:5px;padding:5px 13px;border-radius:var(--r-full);background:var(--bg2);border:1px solid var(--t08);font-size:12px;color:var(--t55);margin-right:7px;margin-bottom:7px}

.booking-card{position:sticky;top:96px;background:var(--card);border:1px solid var(--t08);border-radius:var(--r-xl);box-shadow:var(--sh-blue);overflow:hidden}
.booking-header{background:linear-gradient(135deg,#1a6fa8 0%,var(--base) 100%);padding:22px 26px 18px;position:relative;overflow:hidden}
.booking-header::after{content:'';position:absolute;top:-30px;right:-30px;width:150px;height:150px;background:radial-gradient(circle,rgba(255,255,255,0.18),transparent 65%)}
.bk-header-label{font-size:13px;color:rgba(255,255,255,0.85);font-weight:300}
.booking-body{padding:20px 24px}
.bk-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--t35);margin-bottom:9px}
.bk-svc-row{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
.bk-svc-option{display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--bg2);border:1px solid var(--t08);border-radius:var(--r-md);cursor:pointer;transition:all 0.15s}
.bk-svc-option:hover{border-color:rgba(74,162,219,0.50)}
.bk-svc-option.sel{background:rgba(74,162,219,0.10);border-color:rgba(74,162,219,0.50)}
.bk-radio{width:16px;height:16px;border-radius:50%;border:2px solid var(--t15);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.bk-svc-option.sel .bk-radio{border-color:var(--blue);background:var(--blue)}
.bk-radio-dot{width:6px;height:6px;border-radius:50%;background:#fff}
.bk-svc-ico{font-size:16px;flex-shrink:0}
.bk-svc-name{font-size:13px;font-weight:500;color:var(--t80);flex:1}
.bk-field{margin-bottom:14px}
.bk-field-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--t35);margin-bottom:7px}
.bk-input{width:100%;background:var(--bg2);border:1px solid var(--t08);border-radius:var(--r-md);padding:10px 14px;font-family:var(--ff-s);font-size:13px;color:var(--t80);outline:none;transition:border-color 0.15s;color-scheme:light;box-sizing:border-box}
.bk-input:focus{border-color:rgba(74,162,219,0.60);box-shadow:0 0 0 3px rgba(74,162,219,0.12)}
.bk-time-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.btn-book-main{width:100%;padding:15px;border-radius:var(--r-lg);background:var(--blue);color:#fff;font-family:var(--ff-s);font-size:15px;font-weight:700;border:none;cursor:pointer;transition:all 0.2s cubic-bezier(0.34,1.2,0.64,1);box-shadow:0 6px 24px rgba(74,162,219,0.40);letter-spacing:0.01em;margin-bottom:10px}
.btn-book-main:hover{background:#3a8fc7;transform:translateY(-2px);box-shadow:0 10px 36px rgba(74,162,219,0.50)}
.bk-note{font-size:11px;color:var(--t35);text-align:center;margin-top:10px;line-height:1.5}
.trust-mini{display:flex;align-items:center;justify-content:center;gap:16px;padding:14px 0 0;border-top:1px solid var(--t08);margin-top:14px}
.trust-mini-item{display:flex;align-items:center;gap:5px;font-size:11.5px;color:var(--t35)}
.trust-mini-icon{font-size:13px;color:var(--blue)}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

@media(max-width:1080px){
  .profile-grid{grid-template-columns:1fr}
  .booking-card{position:static}
}
@media(max-width:640px){
  .service-cards{grid-template-columns:1fr}
  .hero-identity{flex-direction:column;align-items:flex-start}
  .bk-time-row{grid-template-columns:1fr}
}
`;

const DAY_NAMES_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function ProfileCarerPage() {
  const [bkSvc,     setBkSvc]     = useState(SERVICES[0].tipo);
  const [activeNav, setActiveNav] = useState('Buscar');

  const avail       = buildAvailability();
  const nameParts   = PROFILE.name.trim().split(' ');
  const firstName   = nameParts[0];
  const lastName    = nameParts.slice(1).join(' ');
  const locationStr = [PROFILE.city, PROFILE.neighborhood].filter(Boolean).join(' · ');

  return (
    <CarerLayout initials={PROFILE.initials} activeNav={activeNav} onNavChange={setActiveNav}>
      <style>{css}</style>

      <div className="page-wrapper">

        {/* ── HERO ── */}
        <div className="hero-banner">
          <div className="hero-body">
            <div className="hero-identity">
              <div className="hero-av-wrap">
                <div className="hero-av">{PROFILE.initials}</div>
                <div className="hero-verified-ring">✓</div>
              </div>
              <div className="hero-name-block">
                <h1 className="hero-name">{firstName} <em>{lastName}</em></h1>
                <div className="hero-spec">
                  Cuidadora · {SERVICES.map(s => s.name).join(', ')}
                </div>
                <div className="hero-meta-row">
                  <div className="hero-meta-item">📍 <span>{locationStr}</span></div>
                  <div className="hero-meta-sep" />
                  <div className="hero-meta-item">
                    📅 <strong>{avail.activeDays.size}</strong> días disponibles
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-tags">
              {DOCUMENTOS_VERIFICADOS.slice(0, 2).map(doc => (
                <span key={doc.titulo} className="hero-tag verified">
                  {doc.icon} {doc.titulo}
                </span>
              ))}
              {SERVICES.map(s => (
                <span key={s.tipo} className="hero-tag service">
                  {s.icon} {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="profile-grid">

          {/* LEFT */}
          <div>

            {/* Sobre mí */}
            <div className="sec-card">
              <div className="sec-header"><div className="sec-title-main">Sobre mí</div></div>
              <div className="sec-body">
                <div className="bio-text">
                  {PROFILE.descripcion_general_servicio.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className="sec-card">
              <div className="sec-header"><div className="sec-title-main">Servicios</div></div>
              <div className="sec-body">
                <div className="service-cards">
                  {SERVICES.map(s => (
                    <div key={s.tipo} className="svc-card">
                      <div className="svc-icon">{s.icon}</div>
                      <div className="svc-name">{s.name}</div>
                      <div className="svc-desc">{s.descripcion}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="sec-card">
              <div className="sec-header"><div className="sec-title-main">Disponibilidad</div></div>
              <div className="sec-body">
                <div className="week-grid">
                  {WEEK_LABELS.map((label, i) => {
                    const isAvail = avail.activeDays.has(i);
                    const blocks  = avail.daySchedule[i] || [];
                    return (
                      <div className={`wg-col${isAvail ? '' : ' off'}`} key={i}>
                        <div className="wg-day-name">{label}</div>
                        <div className={`wg-dot${isAvail ? ' avail' : ' off'}`}>
                          {isAvail ? '✓' : '—'}
                        </div>
                        {isAvail && <div className={`wg-connector avail`} />}
                        {isAvail ? (
                          <div className="wg-blocks">
                            {blocks.map((block, j) => (
                              <div className="wg-block" key={j}>
                                <span className="wg-block-time">{block.hora_inicio}</span>
                                <span className="wg-block-time">{block.hora_fin}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="wg-no-blocks" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Booking */}
          <div>
            <div className="booking-card">
              <div className="booking-header">
                <div className="bk-header-label">Selecciona servicio y fecha</div>
              </div>
              <div className="booking-body">

                <div style={{ marginBottom: 18 }}>
                  <div className="bk-label">Tipo de servicio</div>
                  <div className="bk-svc-row">
                    {SERVICES.map(s => (
                      <div
                        key={s.tipo}
                        className={`bk-svc-option${bkSvc === s.tipo ? ' sel' : ''}`}
                        onClick={() => setBkSvc(s.tipo)}
                      >
                        <div className="bk-radio">
                          {bkSvc === s.tipo && <div className="bk-radio-dot" />}
                        </div>
                        <span className="bk-svc-ico">{s.icon}</span>
                        <span className="bk-svc-name">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bk-field">
                  <div className="bk-field-label">Fecha</div>
                  <input className="bk-input" type="date" />
                </div>

                <div className="bk-time-row">
                  <div className="bk-field">
                    <div className="bk-field-label">Hora de inicio</div>
                    <input className="bk-input" type="time" defaultValue="09:00" />
                  </div>
                  <div className="bk-field">
                    <div className="bk-field-label">Hora de fin</div>
                    <input className="bk-input" type="time" defaultValue="11:00" />
                  </div>
                </div>

                <button className="btn-book-main">Solicitar reserva →</button>
                <div className="bk-note">Sin compromiso · Cancela gratis hasta 24h antes</div>

                <div className="trust-mini">
                  <div className="trust-mini-item">
                    <span className="trust-mini-icon">✓</span> Verificada
                  </div>
                  <div className="trust-mini-item">
                    <span className="trust-mini-icon">🔒</span> Pago seguro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </CarerLayout>
  );
}