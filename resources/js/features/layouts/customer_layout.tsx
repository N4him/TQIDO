import { useState, useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS & NAV CSS
   Shared by every page that uses CarerLayout
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

  --sh-xs: 0 1px 3px rgba(20,50,100,0.18);
  --sh-sm: 0 2px 8px rgba(20,50,100,0.20), 0 1px 2px rgba(20,50,100,0.12);
  --sh-md: 0 6px 16px rgba(20,50,100,0.22), 0 2px 4px rgba(20,50,100,0.10);
  --sh-lg: 0 14px 32px rgba(20,50,100,0.26), 0 4px 8px rgba(20,50,100,0.12);
  --sh-xl: 0 24px 48px rgba(20,50,100,0.30), 0 8px 16px rgba(20,50,100,0.14);
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
  background: var(--dom);
  font-family: var(--ff-ui);
  color: var(--on-dom);
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(122,176,240,0.45) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 90%, rgba(26,96,176,0.35) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 55% 50%, rgba(255,255,255,0.06) 0%, transparent 50%);
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--dom-dk); }
::-webkit-scrollbar-thumb { background: var(--dom-lt); border-radius: 4px; }

/* ── NAV ── */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(58,120,204,0.72);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border-bottom: 1px solid var(--on-dom-20);
  height: 60px; padding: 0 var(--s8);
  display: flex; align-items: center; justify-content: space-between;
}

.nav-logo { display: flex; align-items: center; gap: var(--s2); }
.nav-logo-mark {
  width: 32px; height: 32px; border-radius: var(--r8);
  background: var(--on-dom); opacity: 0.95;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--sh-glow); flex-shrink: 0;
}
.nav-logo-mark svg { width: 16px; height: 16px; }
.nav-logo-text { font-size: 16px; font-weight: 700; color: var(--on-dom); letter-spacing: -0.02em; }
.nav-logo-text span { color: var(--on-dom-80); font-style: italic; }

.nav-center { display: flex; align-items: center; gap: var(--s1); }
.nav-link {
  padding: 6px 14px; border-radius: var(--r8);
  font-size: 13px; font-weight: 500; color: var(--on-dom-80);
  cursor: pointer; transition: all 0.15s ease;
  border: none; background: none; font-family: var(--ff-ui);
}
.nav-link:hover  { color: var(--on-dom); background: var(--on-dom-12); }
.nav-link.active { color: var(--on-dom); background: var(--on-dom-20); }

.nav-right { display: flex; align-items: center; gap: var(--s2); }

.icon-btn {
  width: 36px; height: 36px; border-radius: var(--r8);
  display: flex; align-items: center; justify-content: center;
  background: var(--on-dom-12); border: 1px solid var(--on-dom-20);
  cursor: pointer; transition: all 0.15s ease; position: relative;
}
.icon-btn:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.icon-btn-badge {
  position: absolute; top: 5px; right: 5px;
  width: 8px; height: 8px; border-radius: 50%;
  background: #fff176; border: 2px solid var(--dom-dk);
}

.nav-divider { width: 1px; height: 20px; background: var(--on-dom-20); margin: 0 var(--s1); }

.nav-user {
  display: flex; align-items: center; gap: var(--s2);
  padding: 4px 10px 4px 12px; border-radius: var(--rF);
  border: 1px solid rgba(255,255,255,0.30);
  background: var(--on-dom-12);
  cursor: pointer; transition: all 0.15s ease;
  position: relative; user-select: none;
  backdrop-filter: blur(8px);
}
.nav-user:hover  { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.nav-user-meta   { display: flex; flex-direction: column; gap: 1px; }
.nav-user-name   { font-size: 12px; font-weight: 600; color: var(--on-dom); line-height: 1; }
.nav-user-loc    { font-size: 10px; color: var(--on-dom-60); line-height: 1; }
.nav-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--on-dom);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: var(--dom-dk);
  font-family: var(--ff-ui); flex-shrink: 0;
  box-shadow: var(--sh-xs);
}
.nav-chevron { color: var(--on-dom-60); font-size: 9px; transition: transform 0.2s; }
.nav-user.open .nav-chevron { transform: rotate(180deg); }

/* ── DROPDOWN ── */
.dropdown {
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 264px; background: var(--surf);
  border: 1px solid var(--surf-border);
  border-radius: var(--r16); overflow: hidden;
  box-shadow: var(--sh-xl);
  opacity: 0; transform: translateY(-8px) scale(0.97);
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.34,1.2,0.64,1);
  transform-origin: top right; z-index: 200;
}
.dropdown.open { opacity: 1; transform: none; pointer-events: all; }

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
  transition: width 0.9s cubic-bezier(0.34,1.2,0.64,1);
}
.dd-progress-hint        { font-size: 10px; color: var(--dom-deep); margin-top: var(--s1); }
.dd-progress-hint strong { font-weight: 600; }

.dd-section { padding: var(--s2); }
.dd-item {
  display: flex; align-items: center; gap: var(--s2);
  padding: var(--s2) var(--s3); border-radius: var(--r8);
  font-size: 13px; font-weight: 500; color: var(--muted);
  cursor: pointer; transition: all 0.12s ease;
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

/* ── PAGE WRAPPER ── */
.layout-page { position: relative; z-index: 1; }

/* ── RESPONSIVE ── */
@media(max-width:640px) {
  .nav { padding: 0 var(--s4); }
  .nav-center { display: none; }
  .nav-user-meta { display: none; }
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
  /** Page content */
  children: React.ReactNode;
  /** Authenticated user */
  user: CarerLayoutUser;
  /** Nav links to render in the center */
  navLinks: NavLink[];
  /** Notification count — shows badge dot when > 0 */
  notifCount?: number;
  /** Dropdown menu items (below the progress bar) */
  dropdownItems?: DropdownItem[];
  /** Profile-completion steps for the dropdown progress widget */
  profileSteps?: ProfileStep[];
  /** Favourites count shown in dropdown */
  favsCount?: number;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CarerLayout({
  children,
  user,
  navLinks,
  notifCount = 0,
  dropdownItems = [],
  profileSteps = [],
  favsCount = 0,
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

  const pct      = profileSteps.length
    ? Math.round(profileSteps.filter(s => s.done).length / profileSteps.length * 100)
    : 0;
  const nextStep = profileSteps.find(s => !s.done);

  return (
    <>
      <style>{layoutCss}</style>

      {/* ── TOP NAV ── */}
      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo">
          <div className="nav-logo-mark">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2C5.79 2 4 3.79 4 6c0 1.48.81 2.77 2 3.46V12h4V9.46c1.19-.69 2-1.98 2-3.46 0-2.21-1.79-4-4-4z" fill="white" opacity="0.9"/>
              <path d="M6 12h4v1.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V12z" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <div className="nav-logo-text">TQ<span>ido</span></div>
        </div>

        {/* Center links */}
        <div className="nav-center">
          {navLinks.map(link => (
            <button
              key={link.label}
              className={`nav-link${link.active ? ' active' : ''}`}
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="nav-right">
          <button className="icon-btn" title="Notificaciones" style={{ fontSize: 14 }}>
            🔔
            {notifCount > 0 && <div className="icon-btn-badge" />}
          </button>

          <div className="nav-divider" />

          {/* User pill + dropdown */}
          <div
            className={`nav-user${menuOpen ? ' open' : ''}`}
            ref={menuRef}
            onClick={() => setMenuOpen(o => !o)}
          >
            <div className="nav-user-meta">
              <div className="nav-user-name">{user.name.split(' ')[0]}</div>
              <div className="nav-user-loc">📍 {user.city}</div>
            </div>
            <div className="nav-avatar">{user.initials}</div>
            <span className="nav-chevron">▼</span>

            <div className={`dropdown${menuOpen ? ' open' : ''}`}>
              {/* User block */}
              <div className="dd-user-block">
                <div className="dd-user-avatar">{user.initials}</div>
                <div>
                  <div className="dd-name">{user.name}</div>
                  <div className="dd-email">{user.email}</div>
                </div>
              </div>

              {/* Progress bar */}
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

              {/* Menu items */}
              <div className="dd-section">
                {dropdownItems.map((item, i) => (
                  <div key={i}>
                    {item.danger && i > 0 && <div className="dd-sep" />}
                    <div
                      className={`dd-item${item.danger ? ' danger' : ''}`}
                      onClick={item.onClick}
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

      {/* ── PAGE ── */}
      <div className="layout-page">{children}</div>
    </>
  );
}