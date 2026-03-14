import { useState, useRef } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, ChevronLeft, Check } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1, label: 'Cuenta',  sub: 'Acceso'     },
  { num: 2, label: 'Datos',   sub: 'Personales'  },
  { num: 3, label: 'Cuidado', sub: 'Perfil'      },
];

const dmSans   = "'DM Sans', sans-serif";
const dmSerif  = "'DM Serif Display', serif";
const LOGO_WIDTH = 80;

const inputCls = [
  'w-full border border-[#e2e8f0] rounded-xl px-4 py-3',
  'text-sm text-[#0e2d5a] placeholder-[#94a3b8]',
  'focus:outline-none focus:border-[#2e6fba] focus:ring-2 focus:ring-[#2e6fba]/20',
  'transition-all bg-white',
].join(' ');

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

// ─── Chip ──────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      style={{ fontFamily: dmSans }}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[#2e6fba] border-[#2e6fba] text-white'
          : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#2e6fba] hover:text-[#2e6fba]'
      }`}>
      {active && '✓ '}{label}
    </button>
  );
}

// ─── Mobile Top Bar ────────────────────────────────────────────────────────
function MobileTopBar({ current }: { current: Step }) {
  const totalSteps = STEPS.length;
  const idx = current - 1;
  // Each step column is 100/totalSteps % wide → center at (idx * (100/total) + 50/total)%
  const pct = 100 / totalSteps;
  const logoLeft = `${idx * pct + pct / 2}%`;

  return (
    <div className="lg:hidden sticky top-0 z-20" style={{ background: '#0e2d5a' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative z-10 px-4 pt-3 pb-3">
        <div className="relative">
          {/* Floating logo */}
          <div style={{
            position: 'absolute', top: 0, left: logoLeft,
            transform: 'translateX(-50%)',
            transition: 'left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '2px', pointerEvents: 'none', height: '40px',
            justifyContent: 'flex-end', zIndex: 10,
          }}>
            <img src="../assets/Logo_symbol.png" alt="TQido" style={{ width: 24, height: 'auto', objectFit: 'contain' }} />
            <div style={{
              width: 0, height: 0,
              borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
              borderTop: '5px solid rgba(164,200,238,0.7)',
            }} />
          </div>

          {/* Step row */}
          <div className="relative flex w-full" style={{ paddingTop: '40px' }}>
            {/* Connector lines */}
            {[0, 1].map(i => (
              <div key={i} className="absolute h-0.5 rounded-full transition-all duration-500"
                style={{
                  left:  `calc(${i * pct + pct / 2}% + 16px)`,
                  right: `calc(${(totalSteps - 1 - i) * pct + pct / 2}% + 16px)`,
                  top: '16px',
                  background: current > i + 1 ? '#2e6fba' : 'rgba(46,111,186,0.2)',
                }} />
            ))}

            {STEPS.map(s => {
              const done   = current > s.num;
              const active = current === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center" style={{ width: `${pct}%` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: done ? '#2e6fba' : active ? 'white' : 'rgba(46,111,186,0.15)',
                      border:     active ? '2px solid #2e6fba' : 'none',
                      boxShadow:  active ? '0 0 0 4px rgba(46,111,186,0.25), 0 2px 12px rgba(46,111,186,0.4)' : 'none',
                      position: 'relative', zIndex: 1,
                    }}>
                    {done
                      ? <Check size={14} color="white" strokeWidth={2.5} />
                      : <span className="text-xs font-bold" style={{ fontFamily: dmSans, color: active ? '#2e6fba' : 'rgba(113,174,221,0.4)' }}>{s.num}</span>
                    }
                  </div>
                  <span className="text-[9px] font-semibold leading-none text-center mt-1"
                    style={{ fontFamily: dmSans, color: active ? '#ffffff' : done ? '#71aedd' : 'rgba(113,174,221,0.35)' }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ───────────────────────────────────────────────────────
function Sidebar({ current }: { current: Step }) {
  return (
    <aside
      className="hidden lg:flex w-[240px] flex-shrink-0 sticky top-0 h-screen flex-col"
      style={{ background: '#0e2d5a' }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="relative z-10 flex flex-col h-full px-7 py-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="../assets/Logo_symbol.png" alt="TQido" style={{ width: LOGO_WIDTH, height: 'auto', objectFit: 'contain' }} />
        </div>


        <nav className="flex flex-1">
          {/* Circle column */}
          <div className="flex flex-col items-center" style={{ width: '40px', flexShrink: 0 }}>
            {STEPS.map((s, i) => {
              const done   = current > s.num;
              const active = current === s.num;
              const isLast = i === STEPS.length - 1;
              return (
                <div key={s.num} className="flex flex-col items-center" style={{ flex: isLast ? '0 0 auto' : 1 }}>
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: done ? '#2e6fba' : active ? 'white' : 'rgba(46,111,186,0.12)',
                        border:     active ? '2px solid #2e6fba' : done ? 'none' : '1.5px solid rgba(46,111,186,0.25)',
                        boxShadow:  active ? '0 0 0 6px rgba(46,111,186,0.18), 0 4px 16px rgba(46,111,186,0.35)' : 'none',
                      }}>
                      {done
                        ? <Check size={16} color="white" strokeWidth={2.5} />
                        : active
                          ? <span className="text-base font-black" style={{ color: '#2e6fba', fontFamily: dmSans }}>{s.num}</span>
                          : <span className="text-sm font-semibold" style={{ color: 'rgba(113,174,221,0.4)', fontFamily: dmSans }}>{s.num}</span>
                      }
                    </div>
                    {active && (
                      <div className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: 'rgba(46,111,186,0.2)', animationDuration: '2s' }} />
                    )}
                  </div>
                  {!isLast && (
                    <div className="flex-1 w-0.5 my-1 rounded-full transition-all duration-500"
                      style={{ background: done ? '#2e6fba' : 'rgba(46,111,186,0.2)', minHeight: '24px' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Label column */}
          <div className="flex flex-col flex-1 pl-3.5">
            {STEPS.map((s, i) => {
              const done   = current > s.num;
              const active = current === s.num;
              const isLast = i === STEPS.length - 1;
              return (
                <div key={s.num} className="flex items-start" style={{ flex: isLast ? '0 0 auto' : 1 }}>
                  <div className="flex items-center justify-between w-full" style={{ height: '40px' }}>
                    <div>
                      <p className="text-sm font-semibold leading-tight transition-all duration-300"
                        style={{ fontFamily: dmSans, color: active ? '#ffffff' : done ? '#a4c8ee' : 'rgba(113,174,221,0.4)' }}>
                        {s.label}
                      </p>
                      <p className="text-xs leading-tight mt-0.5 transition-all duration-300"
                        style={{ fontFamily: dmSans, color: active ? '#71aedd' : done ? 'rgba(164,200,238,0.5)' : 'rgba(113,174,221,0.25)' }}>
                        {s.sub}
                      </p>
                    </div>
                    {done && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ fontFamily: dmSans, background: 'rgba(46,111,186,0.2)', color: '#71aedd', border: '1px solid rgba(46,111,186,0.3)' }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom info card */}
        <div className="mt-8 rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(164,200,238,0.12)', backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ background: 'rgba(46,111,186,0.3)' }}>🏠</div>
            <span className="text-xs font-semibold" style={{ color: '#a4c8ee', fontFamily: dmSans }}>
              Plataforma segura
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(164,200,238,0.7)', fontFamily: dmSans }}>
            Conectamos familias con <strong style={{ color: 'white' }}>cuidadores verificados</strong> en tu zona.
          </p>
        </div>

        {/* Back link */}
        <Link href="/register"
          className="mt-4 flex items-center justify-center gap-1.5 text-xs transition-colors"
          style={{ fontFamily: dmSans, color: 'rgba(164,200,238,0.45)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a4c8ee')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(164,200,238,0.45)')}>
          <ChevronLeft size={12} />
          Cambiar tipo de registro
        </Link>
      </div>
    </aside>
  );
}

// ─── Step 1: Cuenta ────────────────────────────────────────────────────────
function Step1({ data, setData, errors }: any) {
  const [showPwd, setShowPwd]   = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
        Crea tu cuenta
      </h2>
      <p className="text-sm mb-5 sm:mb-6" style={{ fontFamily: dmSans, color: '#475569' }}>
        Paso 1 de 3 · Información de acceso
      </p>

      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Nombre completo</label>
          <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="Ej: María García López"
            value={data.name} onChange={e => setData('name', e.target.value)} autoComplete="name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Correo electrónico</label>
          <input className={inputCls} style={{ fontFamily: dmSans }} type="email" placeholder="tu@email.com"
            value={data.email} onChange={e => setData('email', e.target.value)} autoComplete="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Teléfono</label>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 border border-[#e2e8f0] rounded-xl px-3 py-3 bg-white min-w-[80px] flex-shrink-0">
              <span>🇪🇸</span>
              <span className="text-sm font-semibold" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>+34</span>
            </div>
            <input className={`${inputCls} flex-1`} style={{ fontFamily: dmSans }} placeholder="612 345 678"
              value={data.phone} onChange={e => setData('phone', e.target.value)} autoComplete="tel" />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Contraseña</label>
          <div className="relative">
            <input className={inputCls} style={{ fontFamily: dmSans }}
              type={showPwd ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
              value={data.password} onChange={e => setData('password', e.target.value)} autoComplete="new-password" />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2e6fba] transition-colors">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirmar */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Confirmar contraseña</label>
          <div className="relative">
            <input className={inputCls} style={{ fontFamily: dmSans }}
              type={showCPwd ? 'text' : 'password'} placeholder="Repite tu contraseña"
              value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
            <button type="button" onClick={() => setShowCPwd(!showCPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2e6fba] transition-colors">
              {showCPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-1">
          {[
            { key: 'terms',   label: <>Acepto los <a href="/terms" target="_blank" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Términos y Condiciones</a> y la <a href="/privacy" target="_blank" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Política de Privacidad</a></> },
            { key: 'privacy', label: 'Consiento el tratamiento de mis datos personales para la gestión de la plataforma' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-start gap-2.5 cursor-pointer">
              <div onClick={() => setData(key, !(data as any)[key])}
                className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{ background: (data as any)[key] ? '#2e6fba' : 'white', borderColor: (data as any)[key] ? '#2e6fba' : '#cbd5e0' }}>
                {(data as any)[key] && <Check size={10} className="text-white" />}
              </div>
              <span className="text-sm leading-relaxed" style={{ fontFamily: dmSans, color: '#475569' }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Divider + Google */}
      <div className="relative my-5 sm:my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e2e8f0]" /></div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-[#94a3b8]" style={{ fontFamily: dmSans }}>o</span>
        </div>
      </div>
      <button type="button"
        className="w-full border border-[#e2e8f0] rounded-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#0e2d5a] hover:bg-[#f8fafc] hover:border-[#2e6fba] transition-all duration-200"
        style={{ fontFamily: dmSans }}>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
          <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
          <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
          <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
        </svg>
        Continuar con Google
      </button>
    </div>
  );
}

// ─── Step 2: Datos personales ──────────────────────────────────────────────
function Step2({ data, setData, errors }: any) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
        Datos personales
      </h2>
      <p className="text-sm mb-5 sm:mb-6" style={{ fontFamily: dmSans, color: '#475569' }}>
        Paso 2 de 3 · Información básica
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Fecha de nacimiento</label>
          <input className={inputCls} style={{ fontFamily: dmSans }} type="date"
            value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} />
          {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Dirección completa</label>
          <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="Calle, número, piso, puerta"
            value={data.address} onChange={e => setData('address', e.target.value)} autoComplete="street-address" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Ciudad</label>
            <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="Ej: Madrid"
              value={data.city} onChange={e => setData('city', e.target.value)} />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div className="sm:w-32">
            <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Código postal</label>
            <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="28001"
              value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} />
            {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>
            DNI / NIE
            <span className="ml-2 text-[10px] font-normal text-[#94a3b8] normal-case">(Opcional)</span>
          </label>
          <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="12345678A"
            value={data.dni} onChange={e => setData('dni', e.target.value)} />
          <p className="text-xs mt-1" style={{ fontFamily: dmSans, color: '#94a3b8' }}>
            Solo si deseas verificar tu identidad para mayor confianza
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Perfil de cuidado ─────────────────────────────────────────────
const CARE_TYPES = ['Personas mayores', 'Niños y bebés', 'Personas con discapacidad', 'Mascotas'];
const ZONES = [
  'Centro', 'Arganzuela', 'Retiro', 'Salamanca', 'Chamartín', 'Tetuán',
  'Chamberí', 'Fuencarral', 'Moncloa', 'Latina', 'Carabanchel', 'Usera',
];

function Step3({ data, setData }: any) {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
          style={{ background: 'rgba(46,111,186,0.08)', border: '2px solid rgba(46,111,186,0.15)' }}>
          🤝
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
          Perfil de cuidado
        </h2>
        <p className="text-sm" style={{ fontFamily: dmSans, color: '#475569' }}>
          Paso 3 de 3 · Cuéntanos qué necesitas
        </p>
      </div>

      {/* Info cards */}
      <div className="space-y-3 mb-6">
        {[
          { icon: '🔍', title: 'Cuidadores verificados', desc: 'Todos los cuidadores pasan por verificación de identidad, antecedentes y experiencia.', color: 'rgba(46,111,186,0.08)' },
          { icon: '🛡️', title: 'Tu privacidad, protegida', desc: 'Tus datos personales y los de tu familia nunca se comparten con terceros.', color: 'rgba(34,197,94,0.08)' },
          { icon: '💬', title: 'Comunicación directa', desc: 'Contacta con los cuidadores directamente, sin intermediarios ni comisiones ocultas.', color: 'rgba(245,158,11,0.08)' },
        ].map(card => (
          <div key={card.title}
            className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200"
            style={{ border: '1px solid #e2e8f0', background: card.color }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: 'white' }}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>{card.title}</p>
              <p className="text-xs leading-relaxed" style={{ fontFamily: dmSans, color: '#475569' }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Care types */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Tipo de cuidado que necesitas</label>
        <p className="text-xs mb-2.5" style={{ fontFamily: dmSans, color: '#5a96d4' }}>Puedes seleccionar más de uno</p>
        <div className="flex flex-wrap gap-2">
          {CARE_TYPES.map(ct => (
            <Chip key={ct} label={ct} active={data.care_types.includes(ct)}
              onClick={() => setData('care_types', toggle(data.care_types, ct))} />
          ))}
        </div>
      </div>

      {/* Zones */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Zonas de interés</label>
        <p className="text-xs mb-2.5" style={{ fontFamily: dmSans, color: '#5a96d4' }}>Selecciona los barrios donde buscarías cuidador</p>
        <div className="flex flex-wrap gap-2">
          {ZONES.map(z => (
            <Chip key={z} label={z} active={data.care_zones.includes(z)}
              onClick={() => setData('care_zones', toggle(data.care_zones, z))} />
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>
          Notas adicionales
          <span className="ml-2 text-[10px] font-normal text-[#94a3b8] normal-case">(Opcional)</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0e2d5a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2e6fba] focus:ring-2 focus:ring-[#2e6fba]/20 transition-all bg-white resize-none h-24"
            style={{ fontFamily: dmSans }}
            placeholder="Cuéntanos más sobre lo que necesitas..."
            value={data.notes}
            onChange={e => setData('notes', e.target.value)}
            maxLength={400}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-[#94a3b8]" style={{ fontFamily: dmSans }}>
            {data.notes.length}/400
          </span>
        </div>
      </div>

      {/* Final consent */}
      <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#f0f6ff]"
        style={{ border: '1px solid rgba(46,111,186,0.2)', background: 'rgba(46,111,186,0.04)' }}>
        <div onClick={() => setData('terms', !data.terms)}
          className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ background: data.terms ? '#2e6fba' : 'white', borderColor: data.terms ? '#2e6fba' : '#cbd5e0' }}>
          {data.terms && <Check size={10} className="text-white" />}
        </div>
        <span className="text-sm leading-relaxed" style={{ fontFamily: dmSans, color: '#475569' }}>
          He leído y acepto las <strong style={{ color: '#0e2d5a' }}>condiciones de uso de la plataforma</strong> como cliente, incluyendo la{' '}
          <a href="/privacy" style={{ color: '#2e6fba', fontWeight: 600 }}>política de privacidad</a>.
        </span>
      </label>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function RegisterCustomer() {
  const [step, setStep] = useState<Step>(1);

  const { data, setData, post, processing, errors } = useForm({
    // step 1
    name: '', email: '', phone: '', password: '', password_confirmation: '',
    terms: false, privacy: false,
    // step 2
    birth_date: '', address: '', city: '', postal_code: '', dni: '',
    // step 3
    care_types: [] as string[], care_zones: [] as string[], notes: '',
  });

  const next = () => { if (step < 3) setStep(s => (s + 1) as Step); };
  const back = () => { if (step > 1) setStep(s => (s - 1) as Step); };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) { next(); return; }
    post(route('register.customer.store'));
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: '#f8fafc' }}>
        <MobileTopBar current={step} />
        <Sidebar current={step} />

        <main className="flex-1 flex items-start justify-center py-6 sm:py-10 lg:py-12 px-4 sm:px-6 overflow-y-auto">
          <form onSubmit={submit} className="w-full max-w-[500px]">
            <div className="bg-white rounded-2xl p-5 sm:p-8"
              style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(30,95,170,0.08)' }}>

              {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
              {step === 2 && <Step2 data={data} setData={setData} errors={errors} />}
              {step === 3 && <Step3 data={data} setData={setData} />}

              <div className={`flex mt-6 sm:mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                {step > 1 && (
                  <button type="button" onClick={back}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#f8fafc]"
                    style={{ fontFamily: dmSans, border: '1px solid #e2e8f0', color: '#475569' }}>
                    <ChevronLeft size={15} />
                    Atrás
                  </button>
                )}
                <button type="submit" disabled={processing || (step === 3 && !data.terms)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 hover:opacity-90"
                  style={{
                    fontFamily: dmSans,
                    background: '#2e6fba',
                    boxShadow: '0 6px 24px rgba(30,95,170,0.35)',
                  }}>
                  {step === 3
                    ? (processing ? 'Creando cuenta...' : 'Crear mi cuenta')
                    : 'Continuar'
                  } {step !== 3 && '→'}
                </button>
              </div>
            </div>

            {/* Mobile info card */}
            <div className="lg:hidden mt-4 rounded-2xl p-4"
              style={{ background: '#0e2d5a', border: '1px solid rgba(164,200,238,0.12)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🏠</span>
                <span className="text-xs font-semibold" style={{ color: '#a4c8ee', fontFamily: dmSans }}>Plataforma segura</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(164,200,238,0.7)', fontFamily: dmSans }}>
                Conectamos familias con <strong style={{ color: 'white' }}>cuidadores verificados</strong> en tu zona.
              </p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

function route(arg0: string): string {
  throw new Error('Function not implemented.');
}