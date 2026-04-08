import { useState } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

:root {
  --bg:        #0e2d5a;
  --bg-2:      #0b2249;
  --card:      #122f61;
  --card-2:    #163570;
  --card-3:    #1a3d7d;
  --blue:      #2e6fba;
  --blue-lt:   #5a96d4;
  --blue-ltr:  #a4c8ee;
  --blue-lltr: #deedf9;
  --t100: #ffffff;
  --t80:  rgba(255,255,255,0.82);
  --t55:  rgba(255,255,255,0.55);
  --t35:  rgba(255,255,255,0.35);
  --t15:  rgba(255,255,255,0.15);
  --t08:  rgba(255,255,255,0.08);
  --t05:  rgba(255,255,255,0.05);
  --green:    #22c55e;
  --green-bg: rgba(34,197,94,0.12);
  --amber:    #f5a623;
  --amber-bg: rgba(245,166,35,0.12);
  --red:      #ef4444;
  --red-bg:   rgba(239,68,68,0.12);
  --ff-d: 'DM Serif Display', Georgia, serif;
  --ff-s: 'DM Sans', system-ui, sans-serif;
  --r-sm:10px; --r-md:14px; --r-lg:20px; --r-xl:26px; --r-full:999px;
  --sh-card:  0 2px 16px rgba(8,18,38,0.40), 0 1px 4px rgba(8,18,38,0.30);
  --sh-hover: 0 14px 44px rgba(8,18,38,0.60), 0 4px 12px rgba(8,18,38,0.35);
  --sh-blue:  0 4px 20px rgba(46,111,186,0.50);
  --sh-glow:  0 0 0 3px rgba(90,150,212,0.22);
}

html,body {
  min-height:100%; background:var(--bg);
  font-family:var(--ff-s); color:var(--t100);
  -webkit-font-smoothing:antialiased;
}
body::before {
  content:''; position:fixed; inset:0;
  background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events:none; z-index:0;
}
::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-thumb { background:var(--card-3); border-radius:2px; }

.nav {
  position:sticky; top:0; z-index:50;
  background:rgba(11,34,73,0.88); backdrop-filter:blur(20px);
  border-bottom:1px solid var(--t08);
  padding:0 32px; height:60px;
  display:flex; align-items:center; justify-content:space-between;
}
.nav-logo { font-family:var(--ff-d); font-size:22px; color:var(--t100); letter-spacing:-0.02em; }
.nav-logo em { font-style:italic; color:var(--blue-lt); }
.nav-logo-pro { font-size:10px; color:var(--t35); font-family:var(--ff-s); font-weight:400; margin-left:5px; }
.nav-center { display:flex; align-items:center; gap:4px; }
.nav-pill {
  padding:6px 16px; border-radius:var(--r-full);
  font-size:13px; font-weight:400; color:var(--t55);
  background:none; border:none; font-family:var(--ff-s);
  cursor:pointer; transition:all 0.15s ease;
}
.nav-pill:hover { color:var(--t80); background:var(--t08); }
.nav-pill.active { color:var(--blue-lt); background:rgba(90,150,212,0.12); font-weight:500; }
.nav-right { display:flex; align-items:center; gap:10px; }
.nav-notif {
  width:36px; height:36px; border-radius:var(--r-full);
  background:var(--t08); border:1px solid var(--t15);
  display:flex; align-items:center; justify-content:center;
  font-size:14px; cursor:pointer; position:relative; transition:background 0.15s;
}
.nav-notif:hover { background:var(--t15); }
.nav-notif-dot {
  position:absolute; top:6px; right:6px;
  width:7px; height:7px; border-radius:50%;
  background:var(--blue-lt); border:2px solid var(--bg);
}
.nav-avatar {
  width:36px; height:36px; border-radius:50%;
  background:linear-gradient(135deg, var(--blue), var(--blue-lt));
  display:flex; align-items:center; justify-content:center;
  font-size:12px; font-weight:700; color:var(--t100); font-family:var(--ff-s);
  border:2px solid rgba(90,150,212,0.35); box-shadow:var(--sh-blue); cursor:pointer;
}

.page {
  max-width:1140px; margin:0 auto; padding:28px 28px 64px;
  position:relative; z-index:1;
  min-height:calc(100vh - 60px);
}

.sec-title {
  font-family:var(--ff-d); font-size:12px; font-weight:400;
  color:var(--blue-ltr); letter-spacing:0.1em; text-transform:uppercase;
  margin-bottom:14px; display:flex; align-items:center; gap:8px;
}
.sec-title::after { content:''; flex:1; height:1px; background:var(--t08); }

.btn-primary {
  flex:1; padding:11px 16px; border-radius:var(--r-md);
  background:var(--blue-lt); color:var(--bg);
  font-family:var(--ff-s); font-size:13px; font-weight:700;
  border:none; cursor:pointer; transition:all 0.18s ease;
  box-shadow:0 4px 16px rgba(90,150,212,0.45);
}
.btn-primary:hover { background:var(--blue-ltr); transform:translateY(-1px); }
.btn-secondary {
  padding:11px 14px; border-radius:var(--r-md);
  background:var(--t08); color:var(--t55);
  font-family:var(--ff-s); font-size:13px; font-weight:500;
  border:1px solid var(--t15); cursor:pointer; transition:all 0.18s;
}
.btn-secondary:hover { background:var(--t15); color:var(--t80); }

@media (max-width:600px) {
  .nav { padding:0 16px; }
  .nav-center { display:none; }
  .page { padding:20px 16px 48px; }
}
@media (prefers-reduced-motion:reduce) {
  *, *::before, *::after { animation:none !important; transition:none !important; }
}
`;

const NAV_LINKS = ['Inicio', 'Agenda', 'Clientes', 'Ganancias'];

interface CarerLayoutProps {
    children: React.ReactNode;
    initials: string;
    activeNav?: string;
    onNavChange?: (nav: string) => void;
}

export default function CarerLayout({ children, initials, activeNav = 'Inicio', onNavChange }: CarerLayoutProps) {
    return (
        <>
            <style>{css}</style>

            <nav className="nav">
                <div className="nav-logo">
                    TQ<em>ido</em>
                    <span className="nav-logo-pro">pro</span>
                </div>
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
                <div className="nav-right">
                    <div className="nav-notif">
                        🔔<div className="nav-notif-dot" />
                    </div>
                    <div className="nav-avatar">{initials}</div>
                </div>
            </nav>

            <div className="page">{children}</div>
        </>
    );
}