import { useState, useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS & GLOBAL CSS
───────────────────────────────────────────── */
export const layoutCss = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --dom:       #5a96e8;
  --dom-lt:    #7ab0f0;
  --dom-llt:   #a0c8f8;
  --dom-dk:    #3a78cc;
  --dom-xdk:   #2260b0;
  --dom-deep:  #1a4a90;

  --on-dom:    #ffffff;
  --on-dom-80: rgba(255,255,255,0.80);
  --on-dom-60: rgba(255,255,255,0.60);
  --on-dom-40: rgba(255,255,255,0.40);
  --on-dom-20: rgba(255,255,255,0.20);
  --on-dom-12: rgba(255,255,255,0.12);
  --on-dom-08: rgba(255,255,255,0.08);

  --surf:        #ffffff;
  --surf-2:      #f4f8fe;
  --surf-3:      #e8f0fb;
  --surf-border: rgba(90,150,232,0.18);

  --ink:   #0d1e2e;
  --ink-2: #1b3348;
  --muted: #4a6b88;
  --faint: #96b2cc;

  --success: #12B76A;
  --warning: #F79009;
  --error:   #F04438;

  --sh-xs:   0 1px 3px rgba(20,50,100,0.18);
  --sh-sm:   0 2px 8px rgba(20,50,100,0.20), 0 1px 2px rgba(20,50,100,0.12);
  --sh-md:   0 6px 16px rgba(20,50,100,0.22), 0 2px 4px rgba(20,50,100,0.10);
  --sh-lg:   0 14px 32px rgba(20,50,100,0.26), 0 4px 8px rgba(20,50,100,0.12);
  --sh-xl:   0 24px 48px rgba(20,50,100,0.30), 0 8px 16px rgba(20,50,100,0.14);
  --sh-glow: 0 4px 20px rgba(26,74,144,0.50);

  --r4: 4px; --r8: 8px; --r12: 12px; --r16: 16px;
  --r24: 24px; --rF: 9999px;

  --s1:4px;  --s2:8px;  --s3:12px; --s4:16px;
  --s5:20px; --s6:24px; --s8:32px; --s10:40px;
  --s12:48px; --s16:64px;

  --ff-ui: 'Plus Jakarta Sans', system-ui, sans-serif;
  --ff-d:  'Lora', Georgia, serif;
}

html, body {
  min-height: 100%;
  background: #4aa2db; 
  font-family: var(--ff-ui);
  color: var(--on-dom);
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:#4aa2db; }
  
body::after {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-size: 28px 28px;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--dom-dk); }
::-webkit-scrollbar-thumb { background: var(--dom-lt); border-radius: 4px; }

/* ══ NAV ══ */
.nav {
  position: sticky; top: 0; z-index: 100;
  height: 80px;
  padding: 0 var(--s8);
  display: flex; align-items: center; justify-content: space-between;
  background: #4aa2db; 
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border-bottom: 1px solid var(--on-dom-20);
  box-shadow: 0 1px 0 rgba(255,255,255,.14) inset, 0 4px 20px rgba(26,74,144,.25);
}

/* ── Logo ── */
.nav-logo {
  display: flex;
  align-items: center;
  user-select: none;
}

/* ── Pills ── */
.nav-center {
  display: flex; align-items: center; gap: 3px;
  background: var(--on-dom-08);
  border: 1px solid var(--on-dom-20);
  border-radius: var(--rF);
  padding: 5px;
}

.nav-pill {
  padding: 9px 24px;
  border-radius: var(--rF);
  font-size: 14px; font-weight: 500;
  color: var(--on-dom-60);
  background: none; border: none;
  font-family: var(--ff-ui); cursor: pointer;
  transition: all .18s ease;
}
.nav-pill:hover  { color: var(--on-dom); background: var(--on-dom-12); }
.nav-pill.active {
  color: var(--dom-dk);
  background: var(--on-dom);
  font-weight: 700;
  box-shadow: var(--sh-xs);
}

/* ── Right cluster ── */
.nav-right { display: flex; align-items: center; gap: var(--s3); }

.nav-notif {
  width: 46px; height: 46px;
  border-radius: var(--r8);
  background: var(--on-dom-12); border: 1px solid var(--on-dom-20);
  display: flex; align-items: center; justify-content: center;
  font-size: 19px; cursor: pointer; position: relative;
  transition: all .15s ease;
}
.nav-notif:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.nav-notif-dot {
  position: absolute; top: 7px; right: 7px;
  width: 9px; height: 9px; border-radius: 50%;
  background: #fff176; border: 2px solid var(--dom-dk);
}

.nav-divider { width: 1px; height: 24px; background: var(--on-dom-20); margin: 0 var(--s1); }

/* ── Avatar trigger ── */
.nav-avatar-trigger {
  width: 46px; height: 46px; border-radius: 50%;
  border: 2px solid var(--on-dom-40);
  background: var(--on-dom-12);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .15s ease;
  position: relative;
  user-select: none;
  flex-shrink: 0;
}
.nav-avatar-trigger:hover {
  border-color: var(--on-dom-80);
  background: var(--on-dom-20);
  transform: scale(1.06);
}
.nav-avatar-trigger.open {
  border-color: var(--on-dom);
  background: var(--on-dom-20);
  box-shadow: 0 0 0 3px var(--on-dom-20);
}

.nav-avatar {
  width: 100%; height: 100%; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 700; color: var(--dom-dk);
  background: var(--on-dom);
  font-family: var(--ff-ui);
  box-shadow: var(--sh-xs);
}

/* ══ DROPDOWN ══ */
.dropdown {
  position: absolute; top: calc(100% + 12px); right: 0;
  width: 272px;
  background: var(--surf);
  border: 1px solid var(--surf-border);
  border-radius: var(--r16); overflow: hidden;
  box-shadow: var(--sh-xl);
  opacity: 0; transform: translateY(-10px) scale(0.96);
  pointer-events: none;
  transition: opacity .2s cubic-bezier(0.34,1.2,0.64,1),
              transform .2s cubic-bezier(0.34,1.2,0.64,1);
  transform-origin: top right; z-index: 200;
}
.dropdown.open {
  opacity: 1; transform: translateY(0) scale(1);
  pointer-events: all;
}

.dd-user-block {
  padding: var(--s4);
  background: linear-gradient(135deg, #e8f0fb, #f4f8fe);
  border-bottom: 1px solid var(--surf-3);
  display: flex; align-items: center; gap: var(--s3);
}
.dd-user-avatar {
  width: 40px; height: 40px; border-radius: var(--r12);
  background: linear-gradient(135deg, var(--dom-dk), var(--dom));
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #fff;
  flex-shrink: 0; box-shadow: var(--sh-sm);
}
.dd-name  { font-size: 13px; font-weight: 600; color: var(--ink); }
.dd-email { font-size: 11px; color: var(--muted); margin-top: 2px; }

.dd-progress {
  margin: var(--s3) var(--s3) var(--s2);
  background: #edf4fd; border: 1px solid #c8dcf5;
  border-radius: var(--r12); padding: var(--s3);
}
.dd-progress-head  { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s2); }
.dd-progress-label { font-size: 11px; font-weight: 600; color: var(--dom-deep); }
.dd-progress-pct   { font-size: 13px; font-weight: 700; color: var(--dom-dk); font-family: var(--ff-d); font-style: italic; }
.dd-progress-track { height: 4px; background: #c8dcf5; border-radius: var(--rF); overflow: hidden; }
.dd-progress-fill  {
  height: 100%; border-radius: var(--rF);
  background: linear-gradient(90deg, var(--dom-dk), var(--dom));
  transition: width .9s cubic-bezier(0.34,1.2,0.64,1);
}
.dd-progress-hint        { font-size: 10px; color: var(--dom-deep); margin-top: var(--s1); }
.dd-progress-hint strong { font-weight: 600; }

.dd-section { padding: var(--s2); }
.dd-item {
  display: flex; align-items: center; gap: var(--s2);
  padding: var(--s2) var(--s3); border-radius: var(--r8);
  font-size: 13px; font-weight: 500; color: var(--muted);
  cursor: pointer; transition: all .12s ease;
}
.dd-item:hover        { background: var(--surf-2); color: var(--ink); }
.dd-item.danger       { color: var(--error); }
.dd-item.danger:hover { background: #fef3f2; }
.dd-icon  { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
.dd-badge {
  margin-left: auto; background: var(--dom); color: #fff;
  font-size: 10px; font-weight: 700; padding: 1px 7px;
  border-radius: var(--rF);
}
.dd-sep { height: 1px; background: var(--surf-3); margin: var(--s1) var(--s2); }

/* ══ PAGE ══ */
.layout-page {
  max-width: 1160px;
  margin: 0 auto;
  padding: 32px var(--s8) 72px;
  position: relative; z-index: 1;
  min-height: calc(100vh - 80px);
}

/* ══ SHARED UTILITIES ══ */
.sec-title {
  font-family: var(--ff-d);
  font-size: 11px; font-weight: 400;
  color: var(--on-dom-60);
  letter-spacing: .12em; text-transform: uppercase;
  margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.sec-title::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, var(--on-dom-20) 0%, transparent 100%);
}

.btn-primary {
  flex: 1; padding: 12px 20px;
  border-radius: var(--r8);
  background: var(--on-dom); color: var(--dom-dk);
  font-family: var(--ff-ui); font-size: 13px; font-weight: 700;
  border: none; cursor: pointer;
  transition: all .2s ease;
  box-shadow: var(--sh-sm);
}
.btn-primary:hover {
  background: var(--surf-2);
  transform: translateY(-2px);
  box-shadow: var(--sh-md);
}
.btn-primary:active { transform: translateY(0); }

.btn-secondary {
  padding: 12px 16px; border-radius: var(--r8);
  background: var(--on-dom-12); color: var(--on-dom-80);
  font-family: var(--ff-ui); font-size: 13px; font-weight: 500;
  border: 1px solid var(--on-dom-20);
  cursor: pointer; transition: all .18s;
  backdrop-filter: blur(8px);
}
.btn-secondary:hover {
  background: var(--on-dom-20);
  border-color: var(--on-dom-40);
  color: var(--on-dom);
}

/* ══ RESPONSIVE ══ */
@media (max-width: 640px) {
  .nav { padding: 0 var(--s4); height: 68px; }
  .nav-center { display: none; }
  .nav-notif  { width: 40px; height: 40px; font-size: 17px; }
  .nav-avatar-trigger { width: 40px; height: 40px; }
  .layout-page { padding: 20px var(--s4) 56px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
`;

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export interface NavLink {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface DropdownItem {
  icon: string;
  label: string;
  badge?: string | number;
  danger?: boolean;
  onClick?: () => void;
}

export interface ProfileStep {
  label: string;
  done: boolean;
}

export interface CarerLayoutUser {
  name: string;
  email: string;
  initials: string;
  city: string;
}

export interface CarerLayoutProps {
  children: React.ReactNode;
  user: CarerLayoutUser;
  navLinks: NavLink[];
  notifCount?: number;
  dropdownItems?: DropdownItem[];
  profileSteps?: ProfileStep[];
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CustomerLayout({
  children,
  user,
  navLinks,
  notifCount = 0,
  dropdownItems = [],
  profileSteps = [],
}: CarerLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pct = profileSteps.length
    ? Math.round(profileSteps.filter((s) => s.done).length / profileSteps.length * 100)
    : 0;
  const nextStep = profileSteps.find((s) => !s.done);

  return (
    <>
      <style>{layoutCss}</style>

      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo">
          <img
            src="/assets/heart-costumer.svg"
            alt="TQido"
            style={{ height: '62px', width: 'auto', display: 'block' }}
          />
        </div>

        {/* Center nav pills */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className={`nav-pill${link.active ? ' active' : ''}`}
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="nav-right">
          {/* Notificaciones */}
          <button className="nav-notif" title="Notificaciones">
            🔔
            {notifCount > 0 && <div className="nav-notif-dot" />}
          </button>



          {/* Avatar trigger */}
          <div
            ref={menuRef}
            className={`nav-avatar-trigger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <div className="nav-avatar">{user.initials}</div>

            {/* Dropdown */}
            <div className={`dropdown${menuOpen ? ' open' : ''}`}>
              {/* Bloque de usuario */}
              <div className="dd-user-block">
                <div className="dd-user-avatar">{user.initials}</div>
                <div>
                  <div className="dd-name">{user.name}</div>
                  <div className="dd-email">{user.email}</div>
                </div>
              </div>

              {/* Progreso del perfil */}
              {profileSteps.length > 0 && (
                <div className="dd-progress">
                  <div className="dd-progress-head">
                    <span className="dd-progress-label">Perfil completado</span>
                    <span className="dd-progress-pct">{pct}%</span>
                  </div>
                  <div className="dd-progress-track">
                    <div className="dd-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  {nextStep && (
                    <div className="dd-progress-hint">
                      Siguiente: <strong>{nextStep.label}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Items del menú */}
              <div className="dd-section">
                {dropdownItems.map((item, i) => (
                  <div key={i}>
                    {item.danger && i > 0 && <div className="dd-sep" />}
                    <div
                      className={`dd-item${item.danger ? ' danger' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        item.onClick?.();
                      }}
                    >
                      <span className="dd-icon">{item.icon}</span>
                      {item.label}
                      {item.badge != null && (
                        <span className="dd-badge">{item.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE */}
      <div className="layout-page">{children}</div>
    </>
  );
}