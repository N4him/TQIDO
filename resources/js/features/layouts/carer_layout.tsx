import { useState, useRef, useEffect } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

:root {
  --sky:        #4AA2DB;
  --sky-deep:   #3A92CB;
  --sky-light:  #7BBFE8;
  --sky-pale:   #B8DDF4;
  --sky-mist:   #E4F4FC;
  --sky-frost:  #F0F9FF;
  --white:      #ffffff;

  --ink:        #0D2F44;
  --ink-80:     rgba(13,47,68,0.80);
  --ink-55:     rgba(13,47,68,0.55);
  --ink-35:     rgba(13,47,68,0.35);
  --ink-15:     rgba(13,47,68,0.15);
  --ink-08:     rgba(13,47,68,0.08);

  --green:      #1E8A5E;
  --green-bg:   #D4F2E7;
  --amber:      #B87020;
  --amber-bg:   #FEF0D0;
  --red:        #D44030;
  --red-bg:     #FDEAE8;

  --ff-d: 'DM Serif Display', Georgia, serif;
  --ff-s: 'DM Sans', system-ui, sans-serif;

  --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-xl: 28px; --r-full: 999px;

  --sh-card:    0 4px 24px rgba(74,162,219,.18), 0 1px 6px rgba(74,162,219,.10);
  --sh-lift:    0 12px 40px rgba(74,162,219,.28), 0 4px 12px rgba(74,162,219,.14);
  --sh-glow:    0 0 0 3px rgba(74,162,219,.20);
  --sh-inset:   inset 0 1px 3px rgba(13,47,68,.08);
}

html, body {
  min-height: 100%;
  font-family: var(--ff-s);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}

body {
  background:#89D9FB;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 48px,
  rgba(255,255,255,.03) 48px,
  rgba(255,255,255,.03) 50px
  );
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,.1); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,.35); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.55); }

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #90dbfb;
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid rgba(255,255,255,.22);
  box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 4px 20px rgba(58,146,203,.25);
}

.nav-logo {
  display: flex;
  align-items: center;
  user-select: none;
}

/* ── Nav pills ── */
.nav-center {
  display: flex;
  align-items: center;
  gap: 3px;
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.16);
  border-radius: var(--r-full);
  padding: 5px;
}

.nav-pill {
  padding: 9px 24px;
  border-radius: var(--r-full);
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,.62);
  background: none;
  border: none;
  font-family: var(--ff-s);
  cursor: pointer;
  transition: all .18s ease;
  letter-spacing: .01em;
}

.nav-pill:hover {
  color: var(--white);
  background: rgba(255,255,255,.14);
}

.nav-pill.active {
  color: var(--sky);
  background: var(--white);
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(13,47,68,.12);
}

/* ── Right controls ── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-notif {
  width: 46px;
  height: 46px;
  border-radius: var(--r-full);
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  cursor: pointer;
  position: relative;
  transition: background .15s, transform .15s;
}

.nav-notif:hover {
  background: rgba(255,255,255,.24);
  transform: scale(1.05);
}

.nav-notif-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--sky);
  box-shadow: 0 0 0 2px rgba(255,255,255,.3);
}

/* ── Avatar ── */
.nav-avatar-wrap {
  position: relative;
}

.nav-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  font-family: var(--ff-s);
  border: 2px solid rgba(255,255,255,.45);
  cursor: pointer;
  transition: all .18s;
  position: relative;
  user-select: none;
}

.nav-avatar::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,.2);
  pointer-events: none;
}

.nav-avatar:hover,
.nav-avatar.open {
  background: rgba(255,255,255,.32);
  border-color: rgba(255,255,255,.65);
  transform: scale(1.06);
}

/* ══════════════════════════════════════════════
   DROPDOWN
══════════════════════════════════════════════ */
.nav-dropdown {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: 230px;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(74,162,219,.14);
  box-shadow:
    0 16px 48px rgba(13,47,68,.20),
    0 4px 12px rgba(13,47,68,.10);
  overflow: hidden;
  transform-origin: top right;
  transition: opacity .18s cubic-bezier(.4,0,.2,1), transform .18s cubic-bezier(.4,0,.2,1);
  z-index: 200;
}

.nav-dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 14px;
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,.97);
  border-left: 1px solid rgba(74,162,219,.14);
  border-top: 1px solid rgba(74,162,219,.14);
  transform: rotate(45deg);
  border-radius: 2px 0 0 0;
}

.nav-dropdown.hidden {
  opacity: 0;
  transform: scale(.92) translateY(-6px);
  pointer-events: none;
}

.nav-dropdown.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.dd-header {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid rgba(74,162,219,.10);
  background: linear-gradient(180deg, rgba(228,244,252,.5) 0%, transparent 100%);
}

.dd-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(140deg, var(--sky-light) 0%, var(--sky) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  font-family: var(--ff-s);
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(74,162,219,.30);
}

.dd-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}

.dd-email {
  font-size: 11px;
  color: var(--ink-35);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dd-progress {
  margin: 10px 12px 4px;
  padding: 10px 12px;
  background: linear-gradient(135deg, var(--sky-mist) 0%, var(--sky-frost) 100%);
  border: 1px solid var(--sky-pale);
  border-radius: 13px;
}

.dd-prog-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.dd-prog-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: var(--sky-deep);
}

.dd-prog-pct {
  font-size: 13px;
  font-weight: 700;
  color: var(--sky);
  font-family: var(--ff-d);
}

.dd-track {
  height: 5px;
  background: rgba(74,162,219,.15);
  border-radius: var(--r-full);
  overflow: hidden;
}

.dd-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sky) 0%, var(--sky-light) 100%);
  border-radius: var(--r-full);
  transition: width .7s cubic-bezier(.4,0,.2,1);
}

.dd-next {
  font-size: 10px;
  color: var(--sky-deep);
  opacity: .65;
  margin-top: 5px;
}

.dd-menu {
  padding: 6px 6px 8px;
}

.dd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 13px;
  cursor: pointer;
  transition: background .14s;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  font-family: var(--ff-s);
  text-decoration: none;
}

.dd-item:hover {
  background: rgba(74,162,219,.07);
}

.dd-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--sky-mist) 0%, rgba(255,255,255,.8) 100%);
  border: 1px solid var(--sky-pale);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(74,162,219,.10);
}

.dd-item-text {
  font-size: 13px;
  color: var(--ink-80);
  font-weight: 500;
  flex: 1;
}

.dd-item-badge {
  min-width: 20px;
  height: 20px;
  border-radius: var(--r-full);
  background: var(--sky);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.dd-divider {
  height: 1px;
  background: rgba(74,162,219,.10);
  margin: 4px 12px;
}

.dd-item.danger .dd-item-text { color: var(--red); }
.dd-item.danger .dd-item-icon { background: var(--red-bg); border-color: rgba(212,64,48,.18); }
.dd-item.danger:hover          { background: rgba(212,64,48,.05); }

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
.page {
  max-width: 1920px;
  margin: 0 auto;
  padding: 32px 32px 72px;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 80px);
}

.sec-title {
  font-family: var(--ff-d);
  font-size: 11px;
  font-weight: 400;
  color: rgba(255,255,255,.75);
  letter-spacing: .12em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sec-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,.25) 0%, transparent 100%);
}

.btn-primary {
  flex: 1;
  padding: 12px 20px;
  border-radius: var(--r-md);
  background: var(--white);
  color: var(--sky-deep);
  font-family: var(--ff-s);
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all .2s ease;
  box-shadow: 0 4px 18px rgba(13,47,68,.14), 0 1px 4px rgba(13,47,68,.08);
  letter-spacing: .01em;
}

.btn-primary:hover {
  background: var(--sky-frost);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(13,47,68,.18), 0 2px 6px rgba(13,47,68,.10);
}

.btn-primary:active { transform: translateY(0); }

.btn-secondary {
  padding: 12px 16px;
  border-radius: var(--r-md);
  background: rgba(255,255,255,.16);
  color: rgba(255,255,255,.88);
  font-family: var(--ff-s);
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,.26);
  cursor: pointer;
  transition: all .18s;
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background: rgba(255,255,255,.26);
  border-color: rgba(255,255,255,.4);
  color: var(--white);
}

@media (max-width: 640px) {
  .nav { padding: 0 18px; height: 68px; }
  .nav-center { display: none; }
  .nav-notif  { width: 40px; height: 40px; font-size: 17px; }
  .nav-avatar { width: 40px; height: 40px; font-size: 14px; }
  .page { padding: 20px 16px 56px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
`;

const NAV_LINKS = ['Inicio', 'Agenda', 'Clientes'];

const DD_MENU_ITEMS = [
  { icon: '👤', label: 'Mi perfil',    badge: null, danger: false },
  { icon: '📅', label: 'Mis reservas', badge: 0,    danger: false },
  { icon: '❤️', label: 'Favoritos',    badge: 0,    danger: false },
  { icon: '⚙️', label: 'Ajustes',      badge: null, danger: false },
] as const;

interface CarerLayoutProps {
  children: React.ReactNode;
  initials: string;
  userName?: string;
  userEmail?: string;
  profileCompletion?: number;
  profileCompletionNext?: string;
  activeNav?: string;
  onNavChange?: (nav: string) => void;
  onMenuItemClick?: (item: string) => void;
  onLogout?: () => void;
}

export default function CarerLayout({
  children,
  initials,
  userName = 'Tu perfil',
  userEmail = 'Sin correo',
  profileCompletion = 0,
  profileCompletionNext = 'Número verificado',
  activeNav = 'Inicio',
  onNavChange,
  onMenuItemClick,
  onLogout,
}: CarerLayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo">
          <img
            src="/assets/heart-carer.svg"
            alt="TQido Pro"
            style={{ height: '62px', width: 'auto', display: 'block' }}
          />
        </div>

        {/* Center pills */}
        <div className="nav-center">
          {NAV_LINKS.map((n) => (
            <button
              key={n}
              className={`nav-pill${activeNav === n ? ' active' : ''}`}
              onClick={() => onNavChange?.(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="nav-right">
          <div className="nav-notif">
            🔔
            <div className="nav-notif-dot" />
          </div>

          {/* Avatar + Dropdown */}
          <div className="nav-avatar-wrap" ref={wrapRef}>
            <div
              className={`nav-avatar${dropdownOpen ? ' open' : ''}`}
              onClick={() => setDropdownOpen((v) => !v)}
              role="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {initials}
            </div>

            <div className={`nav-dropdown${dropdownOpen ? ' visible' : ' hidden'}`} role="menu">
              {/* User header */}
              <div className="dd-header">
                <div className="dd-avatar">{initials}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="dd-name">{userName}</div>
                  <div className="dd-email" title={userEmail}>{userEmail}</div>
                </div>
              </div>

              {/* Profile completion */}
              <div className="dd-progress">
                <div className="dd-prog-row">
                  <span className="dd-prog-label">Perfil completado</span>
                  <span className="dd-prog-pct">{profileCompletion}%</span>
                </div>
                <div className="dd-track">
                  <div className="dd-fill" style={{ width: `${profileCompletion}%` }} />
                </div>
                {profileCompletionNext && (
                  <div className="dd-next">Siguiente: {profileCompletionNext}</div>
                )}
              </div>

              {/* Menu items */}
              <div className="dd-menu">
                {DD_MENU_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    className="dd-item"
                    role="menuitem"
                    onClick={() => {
                      onMenuItemClick?.(item.label);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className="dd-item-icon">{item.icon}</div>
                    <span className="dd-item-text">{item.label}</span>
                    {item.badge !== null && (
                      <span className="dd-item-badge">{item.badge}</span>
                    )}
                  </button>
                ))}

                <div className="dd-divider" />

                <button
                  className="dd-item danger"
                  role="menuitem"
                  onClick={() => {
                    onLogout?.();
                    setDropdownOpen(false);
                  }}
                >
                  <div className="dd-item-icon">↩️</div>
                  <span className="dd-item-text">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="page">{children}</div>
    </>
  );
}