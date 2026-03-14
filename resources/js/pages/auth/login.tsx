import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue-base:    #2e6fba;
          --blue-dark-1:  #1a4a8a;
          --blue-dark-2:  #0e2d5a;
          --blue-light-2: #71aedd;
          --blue-light-3: #a4c8ee;
          --font-display: 'DM Serif Display', serif;
          --font-body:    'DM Sans', sans-serif;
        }

        .lp-root {
          font-family: var(--font-body);
          min-height: 100vh;
          display: flex;
          align-items: stretch;
          background: var(--blue-dark-2);
          position: relative;
          overflow: hidden;
        }

        /* ══ LEFT PANEL ══ */
        .lp-left {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: #0e2d5a;
        }

        /* photo background */
        .lp-left-img {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80');
          background-size: cover;
          background-position: center;
        }

        /* dark gradient overlay so text stays readable */
        .lp-left-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,30,61,0.45) 0%,
            rgba(10,30,61,0.2) 40%,
            rgba(10,30,61,0.65) 100%
          );
        }

        /* large italic watermark */
        .lp-left-watermark {
          position: absolute;
          bottom: -60px; right: -40px;
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(130px, 16vw, 220px);
          color: rgba(164,200,238,0.035);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        /* Heading anchored to bottom-right */
        .lp-left-heading {
          position: absolute;
          bottom: 52px; right: 52px;
          text-align: right;
          z-index: 1;
        }
        .lp-heading {
          font-family: var(--font-display);
          font-size: clamp(36px, 3.8vw, 58px);
          line-height: 1.05; color: #fff;
          letter-spacing: -0.5px;
        }
        .lp-heading em { font-style: italic; color: var(--blue-light-3); }

        /* ══ RIGHT PANEL ══ */
        .lp-right {
          width: 480px; flex-shrink: 0;
          background: #f8fafc;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 56px 52px;
          position: relative;
          overflow: hidden;
        }

        /* top accent bar */
        .lp-right::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--blue-base), var(--blue-light-2));
        }

        /* subtle circle */
        .lp-right::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(46,111,186,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .lp-form-wrap { position: relative; z-index: 1; }

        /* ── Logo above form ── */
        .lp-form-logo {
          display: flex; justify-content: center;
          text-decoration: none; margin-bottom: 36px;
        }
        .lp-form-logo img {
          width: 100px; height: auto; object-fit: contain;
        }

        /* ── FORM HEADER ── */
        .lp-form-header { margin-bottom: 28px; }

        .lp-form-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px;
          background: rgba(46,111,186,0.08);
          border: 1px solid rgba(46,111,186,0.15);
          border-radius: 100px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--blue-base); margin-bottom: 16px;
        }
        .lp-form-pill::before {
          content: ''; width: 5px; height: 5px;
          border-radius: 50%; background: var(--blue-base);
        }

        .lp-form-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 40px);
          line-height: 1.0; color: var(--blue-dark-2);
          letter-spacing: -0.3px; margin-bottom: 8px;
        }
        .lp-form-title em { font-style: italic; color: var(--blue-base); }

        .lp-form-sub {
          font-size: 14px; font-weight: 300; line-height: 1.65; color: #475569;
        }

        /* ── FIELDS ── */
        .lp-fields { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }

        .lp-field {
          position: relative;
          display: flex; align-items: center;
          height: 60px; padding: 0 16px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          overflow: hidden;
        }
        .lp-field::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--blue-base);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2);
        }
        .lp-field.focused {
          border-color: rgba(46,111,186,0.3);
          box-shadow: 0 0 0 4px rgba(46,111,186,0.08);
        }
        .lp-field.focused::after { transform: scaleX(1); }
        .lp-field.error { border-color: rgba(220,80,80,0.35); background: #fff8f8; }

        .lp-field-inner {
          flex: 1; display: flex; flex-direction: column;
          justify-content: center; min-width: 0;
        }

        .lp-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #94a3b8;
          transition: color 0.2s; margin-bottom: 3px; line-height: 1;
        }
        .lp-field.focused .lp-label { color: var(--blue-base); }
        .lp-field.error .lp-label { color: #dc5050; }

        .lp-input {
          border: none; background: transparent; outline: none;
          font-family: var(--font-body); font-size: 15px;
          color: var(--blue-dark-2); padding: 0; width: 100%;
        }
        .lp-input::placeholder { color: #cbd5e0; }

        .lp-field-icon {
          background: none; border: none; padding: 6px;
          display: flex; align-items: center; flex-shrink: 0; margin-left: 8px;
          color: #94a3b8; cursor: pointer; transition: color 0.2s;
        }
        .lp-field-icon:hover { color: var(--blue-dark-2); }

        .lp-err {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: #dc5050; font-weight: 500;
          margin: 5px 0 0 4px;
        }

        /* ── REMEMBER / FORGOT ── */
        .lp-extras {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .lp-check-wrap { display: flex; align-items: center; gap: 9px; cursor: pointer; }
        .lp-checkbox {
          appearance: none; -webkit-appearance: none;
          width: 18px; height: 18px; border-radius: 6px;
          border: 1.5px solid #e2e8f0; background: #fff;
          cursor: pointer; position: relative; flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .lp-checkbox:checked { background: var(--blue-dark-2); border-color: var(--blue-dark-2); }
        .lp-checkbox:checked::after {
          content: ''; position: absolute;
          top: 2px; left: 5.5px; width: 4px; height: 7px;
          border: 1.5px solid white; border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .lp-check-text { font-size: 13px; color: #475569; }
        .lp-forgot {
          font-size: 13px; font-weight: 500; color: var(--blue-base);
          text-decoration: none; transition: color 0.2s;
        }
        .lp-forgot:hover { color: var(--blue-dark-1); }

        /* ── SUBMIT ── */
        .lp-submit {
          width: 100%; height: 52px; border: none; border-radius: 100px;
          background: var(--blue-dark-2); color: #fff;
          font-family: var(--font-body); font-size: 14px; font-weight: 700;
          letter-spacing: 0.02em; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 22px; position: relative; overflow: hidden;
          box-shadow: 0 6px 24px rgba(14,45,90,0.35);
          transition: transform 0.25s cubic-bezier(.22,.68,0,1.2), box-shadow 0.25s, background 0.2s;
        }
        .lp-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
          transform: translateX(-100%); transition: transform 0.55s ease;
        }
        .lp-submit:hover:not(:disabled)::before { transform: translateX(100%); }
        .lp-submit:hover:not(:disabled) {
          background: var(--blue-dark-1);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(14,45,90,0.4);
        }
        .lp-submit:active:not(:disabled) { transform: translateY(0); }
        .lp-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── OR ── */
        .lp-or {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .lp-or::before, .lp-or::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }
        .lp-or span {
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #94a3b8;
        }

        /* ── GOOGLE BUTTON ── */
        .lp-google-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 13px; height: 48px;
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: 12px; margin-bottom: 28px;
          font-family: var(--font-body); font-size: 13px; font-weight: 500;
          color: var(--blue-dark-2); text-decoration: none; cursor: pointer;
          transition: border-color 0.2s, transform 0.25s cubic-bezier(.22,.68,0,1.2), box-shadow 0.2s;
        }
        .lp-google-btn:hover {
          border-color: rgba(46,111,186,0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(30,95,170,0.12);
        }

        /* ── REGISTER ── */
        .lp-register {
          text-align: center; font-size: 13px; color: #475569;
        }
        .lp-register a {
          font-weight: 700; color: var(--blue-dark-2); text-decoration: none;
          border-bottom: 1.5px solid var(--blue-light-2);
          padding-bottom: 1px; transition: color 0.2s;
        }
        .lp-register a:hover { color: var(--blue-base); }

        @keyframes lp-spin { to { transform: rotate(360deg); } }

        @keyframes lp-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        .lp-left-heading  { animation: lp-up 0.7s cubic-bezier(.22,.68,0,1) both 0.15s; }
        .lp-form-logo     { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.05s; }
        .lp-form-header   { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.10s; }
        .lp-fields        { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.17s; }
        .lp-extras        { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.22s; }
        .lp-submit        { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.26s; }
        .lp-or            { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.30s; }
        .lp-google-btn    { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.34s; }
        .lp-register      { animation: lp-up 0.55s cubic-bezier(.22,.68,0,1) both 0.38s; }

        @media (max-width: 960px) {
          .lp-left { display: none; }
          .lp-right { width: 100%; padding: 48px 40px; }
        }
        @media (max-width: 480px) {
          .lp-right { padding: 40px 24px; min-height: 100vh; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-left-heading, .lp-form-logo, .lp-form-header, .lp-fields,
          .lp-extras, .lp-submit, .lp-or, .lp-google-btn, .lp-register { animation: none; }
        }
      `}</style>

      <div className="lp-root">

        {/* ══ LEFT PANEL ══ */}
        <div className="lp-left">
          <div className="lp-left-img" />
          <div className="lp-left-overlay" />
          <div className="lp-left-watermark">TQido</div>

          <div className="lp-left-heading">
            <h1 className="lp-heading">
              Cuidado que<br /><em>transforma</em><br />vidas
            </h1>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="lp-right">
          <div className="lp-form-wrap">

            {/* Logo above form — bare image, centered */}
            <a href="/" className="lp-form-logo">
              <img src="../assets/Logo_symbol.png" alt="TQido" />
            </a>

            {/* Header */}
            <div className="lp-form-header">
              <h1 className="lp-form-title">Bienvenido de <em>vuelta</em></h1>
              <p className="lp-form-sub">Ingresa tus datos para continuar en TQido</p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="lp-fields">

                {/* Email */}
                <div>
                  <div className={`lp-field${focusedField === 'email' ? ' focused' : ''}${errors.email ? ' error' : ''}`}>
                    <div className="lp-field-inner">
                      <label className="lp-label" htmlFor="lp-email">Correo electrónico</label>
                      <input
                        id="lp-email" type="email" className="lp-input"
                        placeholder="tu@email.com"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        autoComplete="email"
                      />
                    </div>
                    <span className="lp-field-icon" style={{ pointerEvents: 'none' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </span>
                  </div>
                  {errors.email && (
                    <p className="lp-err">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className={`lp-field${focusedField === 'password' ? ' focused' : ''}${errors.password ? ' error' : ''}`}>
                    <div className="lp-field-inner">
                      <label className="lp-label" htmlFor="lp-password">Contraseña</label>
                      <input
                        id="lp-password"
                        type={showPassword ? 'text' : 'password'}
                        className="lp-input"
                        placeholder="Mínimo 8 caracteres"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        autoComplete="current-password"
                      />
                    </div>
                    <button
                      type="button" className="lp-field-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="lp-err">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="lp-extras">
                <label className="lp-check-wrap">
                  <input
                    type="checkbox" className="lp-checkbox"
                    checked={data.remember}
                    onChange={e => setData('remember', e.target.checked)}
                  />
                  <span className="lp-check-text">Recordarme</span>
                </label>
                <Link href="/forgot-password" className="lp-forgot">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className="lp-submit" disabled={processing}>
                {processing ? (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      style={{ animation: 'lp-spin 0.8s linear infinite' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar a TQido
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </>
                )}
              </button>

              {/* OR */}
              <div className="lp-or"><span>o entra con</span></div>

              {/* Google only */}
              <a href="/auth/google" className="lp-google-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </a>

            </form>

            <p className="lp-register">
              ¿No tienes cuenta?{' '}
              <Link href="/register">Regístrate gratis →</Link>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}