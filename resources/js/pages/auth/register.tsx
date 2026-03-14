import { Link } from '@inertiajs/react';

export default function Register() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue-base:    #2e6fba;
          --blue-dark-2:  #0e2d5a;
          --blue-deepest: #0a1e3d;
          --blue-light-3: #a4c8ee;
          --font-display: 'DM Serif Display', serif;
          --font-body:    'DM Sans', sans-serif;
          --radius-pill:  100px;
          --shadow-btn:   0 6px 24px rgba(30,95,170,0.5);
          --shadow-hover: 0 12px 36px rgba(30,95,170,0.6);
          --shadow-md:    0 8px 32px rgba(30,95,170,0.35);
          --shadow-lg:    0 16px 48px rgba(30,95,170,0.45);
          --ease-spring:  cubic-bezier(0.22, 0.68, 0, 1.2);
          --dur-fast:     0.22s;

          /* Text colors — readable but not too dark */
          --text-heading: #1a4a8a;        /* mid navy */
          --text-body:    #1d5096;        /* medium blue-navy */
          --text-eyebrow: #2e6fba;        /* brand blue */
          --accent-em:    #2e6fba;        /* brand blue for em */
          --check-stroke: #2e6fba;
          --check-bg:     rgba(46,111,186,0.12);
          --check-border: rgba(46,111,186,0.3);
        }

        html, body { overflow: hidden; }

        /* ── WRAP ── */
        .rg-wrap {
          width: 100%; height: 100vh; min-height: 560px;
          position: relative; overflow: hidden;
          background: var(--blue-deepest);
          font-family: var(--font-body);
        }
        .rg-wrap::before {
          content: '';
          position: absolute; inset: 0; z-index: 2;
          background-image: radial-gradient(rgba(10,45,90,0.08) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .rg-side {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: center;
          z-index: 4;
          cursor: pointer;
        }

        /* LEFT — light sky blue */
        .rg-side-l {
          clip-path: polygon(0 0, 53% 0, 47% 100%, 0 100%);
          padding: 80px 48px 80px 7%;
          align-items: flex-start;
          background: #90dbfb;
        }

        /* RIGHT — medium blue */
        .rg-side-r {
          clip-path: polygon(53% 0, 100% 0, 100% 100%, 47% 100%);
          padding: 80px 6% 80px 52%;
          align-items: flex-end;
          text-align: right;
          background: #4aa2db;
        }

        /* ── CONTENT BLOCK ── */
        .rg-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          align-items: flex-start;
          max-width: 400px;
          width: 100%;
        }
        .rg-side-r .rg-content { align-items: flex-end; max-width: 460px; }

        .rg-cta-wrap { margin-top: 32px; }

        /* Eyebrow */
        .rg-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--text-eyebrow);
          margin-bottom: 20px;
        }
        .rg-side-r .rg-eyebrow { flex-direction: row-reverse; }

        .rg-eyebrow-line {
          width: 28px; height: 1.5px;
          background: var(--text-eyebrow);
          flex-shrink: 0;
        }

        /* Headline */
        .rg-giant {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(44px, 4.8vw, 72px);
          line-height: 1.05;
          color: var(--text-heading);
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }
        .rg-giant em { font-style: italic; color: var(--accent-em); }

        /* Body */
        .rg-desc {
          font-size: 18px; line-height: 1.75;
          color: var(--text-body);
          font-weight: 300;
          margin-bottom: 26px;
        }

        /* Features */
        .rg-features {
          display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 0;
        }
        .rg-feature {
          display: flex; align-items: center; gap: 9px;
          font-size: 17px; color: var(--text-body);
          font-weight: 400;
        }
        .rg-side-r .rg-feature { flex-direction: row-reverse; }
        .rg-feat-check {
          width: 17px; height: 17px; border-radius: 50%;
          background: var(--check-bg);
          border: 1px solid var(--check-border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rg-feat-check svg { width: 9px; height: 9px; }

        /* CTA */
        .rg-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px;
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-size: 17px; font-weight: 600;
          text-decoration: none;
          width: fit-content;
          white-space: nowrap;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition:
            transform var(--dur-fast) var(--ease-spring),
            box-shadow var(--dur-fast) ease;
        }
        .rg-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .rg-cta:hover::before { transform: translateX(100%); }
        .rg-cta:hover         { transform: translateY(-2px); }

        /* Left CTA — dark navy on white */
        .rg-cta-l {
          background: var(--blue-dark-2);
          color: #fff;
          box-shadow: 0 6px 24px rgba(10,30,61,0.3);
        }
        .rg-cta-l:hover { box-shadow: 0 12px 36px rgba(10,30,61,0.45); }

        /* Right CTA — white on dark navy */
        .rg-cta-r {
          background: var(--blue-deepest);
          color: #fff;
          box-shadow: 0 6px 24px rgba(10,30,61,0.35);
        }
        .rg-cta-r:hover { box-shadow: 0 12px 36px rgba(10,30,61,0.5); }

        .rg-cta-arrow { transition: transform var(--dur-fast) var(--ease-spring); flex-shrink: 0; }
        .rg-cta:hover .rg-cta-arrow { transform: translateX(4px); }

        /* ── LOGO ── */
        .rg-logo-badge {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
          user-select: none;
        }
        .rg-logo-img { width: 180px; height: auto; display: block; }

        /* ── NAV ── */
        .rg-nav {
          position: absolute; top: 0; left: 0; right: 0;
          z-index: 30; padding: 26px 48px;
          display: flex; justify-content: flex-end;
          pointer-events: none;
        }
        .rg-login {
          pointer-events: all;
          display: inline-flex; align-items: center;
          padding: 8px 20px; border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          color: #0e2d5a;
          text-decoration: none;
          background: rgba(255,255,255,0.35);
          border: 1.5px solid rgba(10,45,90,0.2);
          backdrop-filter: blur(8px);
          transition: background var(--dur-fast) ease,
                      color var(--dur-fast) ease,
                      border-color var(--dur-fast) ease;
        }
        .rg-login:hover {
          background: rgba(255,255,255,0.55);
          border-color: rgba(10,45,90,0.35);
          color: #0a1e3d;
        }

        /* ── MOBILE ── */
        @media (max-width: 680px) {
          html, body { overflow: auto; }
          .rg-wrap { height: auto; min-height: 100vh; }
          .rg-wrap::before { display: none; }
          .rg-logo-badge { display: none; }
          .rg-side {
            position: relative; inset: auto;
            height: auto; min-height: 50vh;
            clip-path: none !important;
            padding: 60px 28px 48px !important;
            align-items: flex-start !important;
          }
          .rg-content { max-width: 100%; }
          .rg-nav     { padding: 20px 24px; }
          .rg-giant   { font-size: clamp(34px, 9vw, 52px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rg-cta, .rg-cta-arrow { transition: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="rg-nav">
        <Link href="/login" className="rg-login">Ya tengo cuenta</Link>
      </nav>

      <div className="rg-wrap">

        {/* ── LOGO ── */}
        <div className="rg-logo-badge">
          <img src="/assets/LOGO SPLIT.png" alt="TQido" className="rg-logo-img" />
        </div>

        {/* ── LEFT PANEL — CUIDADOR ── */}
        <div
          className="rg-side rg-side-l"
          onClick={() => { window.location.href = '/register/carer'; }}
        >
          <div className="rg-content">
            <div className="rg-eyebrow">
              <span className="rg-eyebrow-line" />
              Soy cuidador/a
            </div>
            <h2 className="rg-giant">
              Ofrece tu<br /><em>cuidado</em><br />profesional
            </h2>
            <p className="rg-desc">
              Únete a nuestra red de cuidadores verificados
              y conecta con familias que necesitan tu ayuda.
            </p>
            <div className="rg-features">
              {[
                'Perfil profesional verificado',
                'Acceso a familias en tu zona',
                'Gestión de agenda digital',
              ].map(f => (
                <div key={f} className="rg-feature">
                  <div className="rg-feat-check">
                    <svg fill="none" stroke="#2e6fba" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <div className="rg-cta-wrap">
              <Link
                href="/register/carer"
                className="rg-cta rg-cta-l"
                onClick={e => e.stopPropagation()}
              >
                Registrarme como cuidador/a
                <svg className="rg-cta-arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — CLIENTE ── */}
        <div
          className="rg-side rg-side-r"
          onClick={() => { window.location.href = '/register/customer'; }}
        >
          <div className="rg-content">
            <div className="rg-eyebrow">
              Busco un cuidador/a
              <span className="rg-eyebrow-line" />
            </div>
            <h2 className="rg-giant">
              Encuentra el <em>cuidado</em> que mereces
            </h2>
            <p className="rg-desc">
              Conecta con cuidadores verificados para tus
              seres queridos, cuando más lo necesitas.
            </p>
            <div className="rg-features">
              {[
                'Cuidadores verificados y seguros',
                'Búsqueda por zona y disponibilidad',
                'Comunicación directa y segura',
              ].map(f => (
                <div key={f} className="rg-feature">
                  <div className="rg-feat-check">
                    <svg fill="none" stroke="#2e6fba" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <div className="rg-cta-wrap">
              <Link
                href="/register/customer"
                className="rg-cta rg-cta-r"
                onClick={e => e.stopPropagation()}
              >
                Registrarme como familia
                <svg className="rg-cta-arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}