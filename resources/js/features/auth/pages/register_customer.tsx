import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

function getScore(val: string | any[]) {
  const str = typeof val === 'string' ? val : '';
  let s = 0;
  if (str.length >= 8)          s++;
  if (/[A-Z]/.test(str))        s++;
  if (/[0-9]/.test(str))        s++;
  if (/[^A-Za-z0-9]/.test(str)) s++;
  return s;
}
const SW_COLORS = ['#ef4444','#f97316','#eab308','#22c55e'];
const SW_LABELS = ['Muy débil','Débil','Media','Fuerte'];

function StrengthBars({ password, }: { password: string }) {
  const score = password.length === 0 ? 0 : getScore(password);
  const color = score > 0 ? SW_COLORS[score - 1] : '#cce8f6';
  const label = password.length === 0 ? 'Mínimo 8 caracteres' : (SW_LABELS[score - 1] ?? 'Muy débil');
  return (
    <div style={{ marginTop:6 }}>
      <div style={{ display:'flex', gap:3 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            height:3, flex:1, borderRadius:999,
            background: i < score ? color : '#cce8f6',
            transition:'background 0.35s',
          }}/>
        ))}
      </div>
      <p style={{
        fontSize:10.5, marginTop:5, fontWeight:500,
        color: password.length === 0 ? '#7a9ab8' : color,
        transition:'color 0.35s',
      }}>{label}</p>
    </div>
  );
}

function FieldLabel({ children, badge = undefined }: { children: React.ReactNode; badge?: string | undefined }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
      <label style={{
        fontSize:10.5, fontWeight:700, color:'#0b1f3a',
        letterSpacing:'0.07em', textTransform:'uppercase',
      }}>{children}</label>
      {badge && (
        <span style={{
          fontSize:9, fontWeight:700, letterSpacing:'0.05em',
          background:'#0e2d5a', color:'#fff',
          padding:'2px 8px', borderRadius:999,
        }}>{badge}</span>
      )}
    </div>
  );
}

function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (value: boolean) => void; children: React.ReactNode }) {
  return (
    <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer', userSelect:'none' }}>
      <div onClick={() => onChange(!checked)} style={{
        width:18, height:18, borderRadius:8, flexShrink:0, marginTop:2,
        border:`2px solid ${checked ? '#0e2d5a' : '#cce8f6'}`,
        background: checked ? '#0e2d5a' : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all 0.18s',
        boxShadow: checked ? '0 3px 10px rgba(14,45,90,0.22)' : 'none',
      }}>
        {checked && <Check size={10} color="#fff" strokeWidth={3}/>}
      </div>
      <span style={{ fontSize:12.5, color:'#4a6a80', lineHeight:1.65 }}>{children}</span>
    </label>
  );
}

const GoogleSVG = () => (
  <svg width="16" height="16" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
    <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
    <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
    <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
  </svg>
);

export default function RegisterCliente() {
  const [form, setForm] = useState({
    name:'', email:'', phone:'',
    role:'customer',
    specialty:'Cliente',
    password:'', password_confirmation:'',
    terms:false, privacy:false,
  });
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready,   setReady]   = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
      const payload = new URLSearchParams();
      payload.append('_token', csrfToken);
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('phone', form.phone);
      payload.append('role', form.role);
      payload.append('specialty', form.specialty);
      payload.append('password', form.password);
      payload.append('password_confirmation', form.password_confirmation);
      if (form.terms) payload.append('terms', '1');
      if (form.privacy) payload.append('privacy', '1');

      const response = await fetch('/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: [data.message || 'Hubo un error inesperado.'] });
        }
        return;
      }

      window.location.assign(data.redirect_url || '/profile/customer');
    } catch (error) {
      console.error('Error de red:', error);
      setErrors({ general: ['Hubo un problema con la conexión. Inténtalo de nuevo más tarde.'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'DM Sans', system-ui, sans-serif; -webkit-font-smoothing:antialiased; }

        /* ─ layout ─ */
        .cli-page { min-height:100vh; display:grid; grid-template-columns:44fr 56fr; }

        /* ─ left: solid sky-blue ─ */
        .cli-left {
          background:#93dafa;
          display:flex; flex-direction:column;
          justify-content:center; align-items:flex-start;
          padding:64px 52px; overflow:hidden;
        }

        /* ─ right ─ */
        .cli-right {
          background:#ffffff;
          display:flex; flex-direction:column;
          justify-content:center; align-items:center;
          padding:52px 64px; overflow-y:auto;
        }

        /* ─ inputs ─ */
        .cli-input {
          width:100%; border:1.5px solid #cce8f6; border-radius:14px;
          padding:11px 15px;
          font-family:'DM Sans', sans-serif; font-size:13.5px; color:#0b1f3a;
          background:#f4f8fd; outline:none; transition:all 0.18s;
        }
        .cli-input::placeholder { color:#7a9ab8; }
        .cli-input:hover  { border-color:#93dafa; background:#fff; }
        .cli-input:focus  { border-color:#60c8f0; background:#fff;
                            box-shadow:0 0 0 3.5px rgba(147,218,250,0.3); }

        .cli-prefix {
          display:flex; align-items:center; gap:6px;
          border:1.5px solid #cce8f6; border-radius:14px;
          padding:11px 13px; background:#e8f4fb;
          font-size:13px; font-weight:600; color:#0b1f3a;
          white-space:nowrap; flex-shrink:0;
        }

        /* ─ eye ─ */
        .cli-eye {
          position:absolute; right:11px; top:50%; transform:translateY(-50%);
          background:none; border:none; cursor:pointer;
          color:#7a9ab8; display:flex; padding:4px; transition:color 0.16s;
        }
        .cli-eye:hover { color:#0e2d5a; }

        /* ─ primary btn ─ */
        .cli-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 26px; border-radius:999px; border:none;
          background:#0e2d5a; color:#fff;
          font-family:'DM Sans', sans-serif; font-size:13.5px; font-weight:600;
          cursor:pointer; transition:all 0.2s;
          box-shadow:0 4px 16px rgba(14,45,90,0.28); white-space:nowrap;
        }
        .cli-btn:hover    { background:#163f7a; transform:translateY(-2px);
                            box-shadow:0 8px 24px rgba(14,45,90,0.34); }
        .cli-btn:active   { transform:none; }
        .cli-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; box-shadow:none; }

        /* ─ google btn ─ */
        .cli-google {
          width:100%; border:1.5px solid #cce8f6; border-radius:14px;
          padding:11px 18px; background:#fff; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:9px;
          font-family:'DM Sans', sans-serif; font-size:13px; font-weight:600;
          color:#0b1f3a; transition:all 0.18s;
          box-shadow:0 2px 8px rgba(11,31,58,0.06);
        }
        .cli-google:hover { border-color:#93dafa; box-shadow:0 3px 16px rgba(147,218,250,0.3); }

        /* ─ link ─ */
        .cli-link {
          color:#0e2d5a; font-weight:700; text-decoration:none;
          border-bottom:1.5px solid #cce8f6; transition:border-color 0.16s;
        }
        .cli-link:hover { border-color:#0e2d5a; }

        /* ─ checks block ─ */
        .cli-checks {
          background:#f4f8fd; border:1.5px solid #cce8f6;
          border-radius:14px; padding:14px 16px;
          display:flex; flex-direction:column; gap:11px;
        }

        /* ─ divider ─ */
        .cli-div-line { flex:1; height:1px;
          background:linear-gradient(to right, transparent, #cce8f6, transparent); }

        /* ─ card tag (kit pattern) ─ */
        .cli-badge-chip {
          display:inline-flex; align-items:center; gap:5px;
          padding:5px 14px; border-radius:999px;
          background:rgba(11,34,66,0.08); border:1px solid rgba(11,34,66,0.14);
          font-size:11.5px; font-weight:600; color:#0b2242; letter-spacing:0.04em;
        }

        /* ─ animations ─ */
        .cli-l-enter { opacity:0; transform:translateX(-18px);
          animation:cliL 0.55s cubic-bezier(.22,1,.36,1) forwards; }
        .cli-r-enter { opacity:0; transform:translateY(14px);
          animation:cliR 0.5s cubic-bezier(.22,1,.36,1) 0.08s forwards; }
        @keyframes cliL { to { opacity:1; transform:none; } }
        @keyframes cliR { to { opacity:1; transform:none; } }
        @keyframes cliSpin { to { transform:rotate(360deg); } }

        @media (max-width:860px) {
          .cli-page { grid-template-columns:1fr; }
          .cli-left { display:none !important; }
          .cli-right { padding:36px 24px; }
        }
      `}</style>

      <div className="cli-page">

        {/* ─── LEFT ─── */}
        <div className="cli-left">
          <div className={ready ? 'cli-l-enter' : ''} style={{ maxWidth:360 }}>

            {/* Logo — kit pattern from nav-logo */}
            <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:52 }}>
              <div style={{
                width:44, height:44, borderRadius:14,
                background:'#0e2d5a',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:"'Fraunces', Georgia, serif", fontSize:20, color:'#93dafa',
                fontWeight:400, boxShadow:'0 4px 16px rgba(14,45,90,0.22)',
              }}>T</div>
              <span style={{
                fontFamily:"'Fraunces', Georgia, serif",
                fontSize:24, color:'#0b2242', fontWeight:400, letterSpacing:'-0.02em',
              }}>TQ<em style={{ fontStyle:'italic', color:'#0e2d5a' }}>ido</em></span>
            </div>

            {/* Eyebrow — kit hero-eyebrow pattern */}
            <div className="cli-badge-chip" style={{ marginBottom:22 }}>
              <span>📍</span> Plataforma de confianza
            </div>

            {/* Headline — kit hero-title pattern */}
            <h2 style={{
              fontFamily:"'Fraunces', Georgia, serif",
              fontSize:46, lineHeight:1.1, color:'#0b2242',
              fontWeight:300, marginBottom:14, letterSpacing:'-0.025em',
            }}>
              Cuida a los<br/>
              <em style={{ fontStyle:'italic', color:'#0e2d5a' }}>que más amas</em>
            </h2>
            <p style={{
              fontSize:14.5, color:'#1a4a66',
              lineHeight:1.75, marginBottom:44, fontWeight:300,
            }}>
              Conectamos familias con cuidadores profesionales verificados.
              Seguro, confiable y cercano.
            </p>

            {/* Social proof — kit trust-bar pattern */}
            <div style={{
              paddingTop:22, borderTop:'1px solid rgba(11,34,66,0.14)',
              display:'flex', alignItems:'center', gap:14,
            }}>
              <div style={{ display:'flex' }}>
                {['#0e2d5a','#1a5090','#2e6fba','#4a90d0'].map((c,i) => (
                  <div key={i} style={{
                    width:28, height:28, borderRadius:'50%',
                    background:c, border:'2px solid #93dafa',
                    marginLeft: i > 0 ? -9 : 0, flexShrink:0,
                  }}/>
                ))}
              </div>
              <p style={{ fontSize:12.5, color:'#1a4a66', lineHeight:1.55 }}>
                <span style={{ color:'#0b2242', fontWeight:700 }}>+2.400 familias</span><br/>
                ya confían en TQido
              </p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT ─── */}
        <div className="cli-right">
          <div className={ready ? 'cli-r-enter' : ''} style={{ width:'100%', maxWidth:430 }}>

            {/* Header — kit nav-user pill pattern */}
            <div style={{
              display:'flex', alignItems:'center', gap:9, marginBottom:34,
              padding:'6px 6px 6px 14px', borderRadius:999,
              border:'1px solid #e8f4fb', background:'#fff',
              boxShadow:'0 2px 8px rgba(11,31,58,0.06)',
              width:'fit-content',
            }}>
              <span style={{ fontFamily:"'Fraunces', serif", fontSize:13, color:'#0b1f3a', fontWeight:400 }}>TQido</span>
              <div style={{
                padding:'4px 12px', borderRadius:999,
                background:'#93dafa', color:'#0e2d5a',
                fontSize:11, fontWeight:700, letterSpacing:'0.04em',
              }}>Cliente</div>
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily:"'Fraunces', Georgia, serif",
              fontSize:32, color:'#0b1f3a', fontWeight:300,
              letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:8,
            }}>
              Crea tu <em style={{ fontStyle:'italic', color:'#1a5090' }}>cuenta</em>
            </h1>
            <p style={{ fontSize:14, color:'#4a6a80', marginBottom:28, lineHeight:1.6, fontWeight:300 }}>
              Encuentra el cuidador perfecto para tu familia.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display:'flex', flexDirection:'column', gap:15 }}>

                <div>
                  <FieldLabel>Nombre completo</FieldLabel>
                  <input className="cli-input" type="text" placeholder="María García López"
                    autoComplete="name" value={form.name}
                    onChange={e => set('name', e.target.value)}/>
                  {errors.name && <p style={{ color:'red', fontSize:'12px' }}>{errors.name.join(', ')}</p>}
                </div>

                <div>
                  <FieldLabel>Correo electrónico</FieldLabel>
                  <input className="cli-input" type="email" placeholder="correo@ejemplo.com"
                    autoComplete="email" value={form.email}
                    onChange={e => set('email', e.target.value)}/>
                  {errors.email && <p style={{ color:'red', fontSize:'12px' }}>{errors.email.join(', ')}</p>}
                </div>

                <div>
                  <FieldLabel>Teléfono</FieldLabel>
                  <div style={{ display:'flex', gap:8 }}>
                    <div className="cli-prefix">🇨🇴 +57</div>
                    <input className="cli-input" style={{ flex:1 }} type="tel"
                      placeholder="300 123 4567" autoComplete="tel"
                      value={form.phone} onChange={e => set('phone', e.target.value)}/>
                  </div>
                  {errors.phone && <p style={{ color:'red', fontSize:'12px' }}>{errors.phone.join(', ')}</p>}
                </div>

                <div style={{ display:'flex', gap:12 }}>
                  <div style={{ flex:1 }}>
                    <FieldLabel>Contraseña</FieldLabel>
                    <div style={{ position:'relative' }}>
                      <input className="cli-input" style={{ paddingRight:40 }}
                        type={showPw ? 'text' : 'password'} placeholder="Mín. 8 caracteres"
                        autoComplete="new-password" value={form.password}
                        onChange={e => set('password', e.target.value)}/>
                      <button type="button" className="cli-eye" onClick={() => setShowPw(v => !v)}>
                        {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                      </button>
                    </div>
                    {errors.password && <p style={{ color:'red', fontSize:'12px' }}>{errors.password.join(', ')}</p>}
                    <StrengthBars password={form.password}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <FieldLabel>Confirmar</FieldLabel>
                    <div style={{ position:'relative' }}>
                      <input className="cli-input" style={{ paddingRight:40 }}
                        type={showCpw ? 'text' : 'password'} placeholder="Repite la contraseña"
                        autoComplete="new-password" value={form.password_confirmation}
                        onChange={e => set('password_confirmation', e.target.value)}/>
                      <button type="button" className="cli-eye" onClick={() => setShowCpw(v => !v)}>
                        {showCpw ? <EyeOff size={15}/> : <Eye size={15}/>}
                      </button>
                    </div>
                    {errors.password_confirmation && <p style={{ color:'red', fontSize:'12px' }}>{errors.password_confirmation.join(', ')}</p>}
                    {form.password_confirmation && (
                      <p style={{
                        fontSize:10.5, marginTop:6, fontWeight:500,
                        color: form.password === form.password_confirmation ? '#22c55e' : '#ef4444',
                      }}>
                        {form.password === form.password_confirmation ? '✓ Coinciden' : '✗ No coinciden'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="cli-checks">
                  <Checkbox checked={form.terms} onChange={v => set('terms', v)}>
                    Acepto los{' '}
                    <a href="/terms" target="_blank" className="cli-link">Términos y Condiciones</a>
                    {' '}y la{' '}
                    <a href="/privacy" target="_blank" className="cli-link">Política de Privacidad</a>
                  </Checkbox>
                  {errors.terms && <p style={{ color:'red', fontSize:'12px' }}>{errors.terms.join(', ')}</p>}
                  <Checkbox checked={form.privacy} onChange={v => set('privacy', v)}>
                    Consiento el tratamiento de mis datos para la gestión de la plataforma
                  </Checkbox>
                  {errors.privacy && <p style={{ color:'red', fontSize:'12px' }}>{errors.privacy.join(', ')}</p>}
                </div>
                {errors.general && (
                  <p style={{ color:'red', fontSize:'12px', marginTop:'10px' }}>
                    {errors.general.join(', ')}
                  </p>
                )}
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
                <div className="cli-div-line"/>
                <span style={{ fontSize:11.5, color:'#7a9ab8', fontWeight:500, whiteSpace:'nowrap' }}>
                  o continúa con
                </span>
                <div className="cli-div-line"/>
              </div>

              <a href="/auth/google?role=customer" className="cli-google" style={{ textDecoration:'none' }}>
                <GoogleSVG/>
                Continuar con Google
              </a>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:22 }}>
                <p style={{ fontSize:13, color:'#4a6a80' }}>
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login" className="cli-link">Inicia sesión</a>
                </p>
                <button type="submit" disabled={loading} className="cli-btn">
                  {loading ? (
                    <>
                      <span style={{
                        width:13, height:13, borderRadius:'50%',
                        border:'2px solid rgba(255,255,255,0.3)',
                        borderTopColor:'#fff', display:'inline-block',
                        animation:'cliSpin 0.7s linear infinite',
                      }}/>
                      Creando…
                    </>
                  ) : <>Registrarse <ArrowRight size={14}/></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
