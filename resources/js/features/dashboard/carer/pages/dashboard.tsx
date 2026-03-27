import { useState, useEffect } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

:root {
  /* ── Kit palette · dominante: blue-xdk #0e2d5a ── */
  --bg:        #0e2d5a;   /* base page background */
  --bg-2:      #0b2249;   /* ligeramente más oscuro para profundidad */
  --card:      #122f61;   /* surface de cards */
  --card-2:    #163570;   /* surface alternativa / hover */
  --card-3:    #1a3d7d;   /* borde activo / highlight */

  --blue:      #2e6fba;   /* acento principal azul medio */
  --blue-lt:   #5a96d4;   /* azul claro — CTAs, highlights */
  --blue-ltr:  #a4c8ee;   /* azul muy claro — eyebrows, labels */
  --blue-lltr: #deedf9;   /* tint mínimo */

  /* tokens de texto sobre fondo oscuro */
  --t100: #ffffff;
  --t80:  rgba(255,255,255,0.82);
  --t55:  rgba(255,255,255,0.55);
  --t35:  rgba(255,255,255,0.35);
  --t15:  rgba(255,255,255,0.15);
  --t08:  rgba(255,255,255,0.08);
  --t05:  rgba(255,255,255,0.05);

  /* semánticos */
  --green:    #22c55e;
  --green-bg: rgba(34,197,94,0.12);
  --amber:    #f5a623;
  --amber-bg: rgba(245,166,35,0.12);
  --red:      #ef4444;
  --red-bg:   rgba(239,68,68,0.12);

  --ff-d: 'DM Serif Display', Georgia, serif;
  --ff-s: 'DM Sans', system-ui, sans-serif;

  --r-sm:  10px; --r-md: 14px; --r-lg: 20px; --r-xl: 26px; --r-full: 999px;

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

/* dot texture global */
body::before {
  content:''; position:fixed; inset:0;
  background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events:none; z-index:0;
}

::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-thumb { background:var(--card-3); border-radius:2px; }

/* ═══════════════════════ NAV ═══════════════════════ */
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

/* ═══════════════════════ PAGE ═══════════════════════ */
.page { max-width:1140px; margin:0 auto; padding:28px 28px 64px; position:relative; z-index:1; }

/* ═══════════════════════ HERO ═══════════════════════ */
.hero {
  background:var(--card);
  border:1px solid var(--t08);
  border-radius:var(--r-xl);
  padding:28px 32px;
  display:grid; grid-template-columns:1fr auto;
  gap:24px; align-items:center;
  margin-bottom:18px;
  position:relative; overflow:hidden;
  box-shadow:var(--sh-card);
}
/* glow blob */
.hero::before {
  content:''; position:absolute; top:-60px; right:60px;
  width:320px; height:320px;
  background:radial-gradient(circle, rgba(90,150,212,0.10) 0%, transparent 65%);
  pointer-events:none;
}
.hero-left { position:relative; z-index:1; }
.hero-greeting { font-size:11.5px; color:var(--t35); margin-bottom:6px; letter-spacing:0.06em; text-transform:uppercase; }
.hero-name {
  font-family:var(--ff-d); font-size:clamp(26px,3vw,38px);
  font-weight:300; line-height:1.1; color:var(--t100); margin-bottom:12px;
}
.hero-name em { font-style:italic; color:var(--blue-ltr); }
.hero-status-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.hero-status-text { font-size:13px; color:var(--t55); }
.hero-status-text strong { color:var(--t80); font-weight:500; }

/* toggle */
.toggle-wrap {
  display:flex; align-items:center; gap:12px;
  background:var(--bg-2); border:1px solid var(--t15);
  border-radius:var(--r-full); padding:7px 8px 7px 16px;
  cursor:pointer; user-select:none; transition:all 0.3s ease;
}
.toggle-wrap.online {
  border-color:rgba(90,150,212,0.35);
  background:rgba(90,150,212,0.08);
  box-shadow:var(--sh-glow);
}
.toggle-label-text { font-size:12.5px; font-weight:600; color:var(--t55); transition:color 0.3s; white-space:nowrap; }
.toggle-wrap.online .toggle-label-text { color:var(--blue-lt); }
.toggle-track {
  width:44px; height:24px; border-radius:12px;
  background:var(--t15); border:1px solid var(--t15);
  position:relative; flex-shrink:0;
  transition:background 0.3s, border-color 0.3s;
}
.toggle-wrap.online .toggle-track {
  background:var(--blue-lt); border-color:var(--blue-lt);
  box-shadow:0 0 14px rgba(90,150,212,0.5);
}
.toggle-thumb {
  position:absolute; top:3px; left:3px;
  width:16px; height:16px; border-radius:50%;
  background:var(--t55); transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1), background 0.3s;
  box-shadow:0 2px 6px rgba(0,0,0,0.4);
}
.toggle-wrap.online .toggle-thumb { transform:translateX(20px); background:var(--t100); }
.pulse-dot {
  width:8px; height:8px; border-radius:50%; background:var(--t35); flex-shrink:0; transition:background 0.3s;
}
.toggle-wrap.online .pulse-dot { background:var(--green); box-shadow:0 0 8px var(--green); animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }

/* hero stats */
.hero-stats { display:flex; gap:10px; position:relative; z-index:1; }
.hstat {
  background:var(--bg-2); border:1px solid var(--t08);
  border-radius:var(--r-lg); padding:16px 20px; min-width:94px;
  transition:border-color 0.2s;
}
.hstat:hover { border-color:var(--t15); }
.hstat-num {
  font-family:var(--ff-d); font-size:30px; font-weight:300;
  color:var(--t100); line-height:1; margin-bottom:5px;
}
.hstat-num.blue  { color:var(--blue-lt);  }
.hstat-num.green { color:var(--green);    }
.hstat-num.amber { color:var(--amber);    }
.hstat-num.ltr   { color:var(--blue-ltr); }
.hstat-label { font-size:10px; color:var(--t35); line-height:1.4; }

/* ═══════════════════════ SECTION TITLE ═══════════════════════ */
.sec-title {
  font-family:var(--ff-d); font-size:12px; font-weight:400;
  color:var(--blue-ltr); letter-spacing:0.1em; text-transform:uppercase;
  margin-bottom:14px; display:flex; align-items:center; gap:8px;
}
.sec-title::after { content:''; flex:1; height:1px; background:var(--t08); }

/* ═══════════════════════ LAYOUT ═══════════════════════ */
.two-col    { display:grid; grid-template-columns:1fr 340px; gap:16px; margin-bottom:16px; }
.bottom-row { display:grid; grid-template-columns:1fr 1fr;    gap:16px; margin-top:16px; }

/* ═══════════════════════ PRÓXIMO SERVICIO ═══════════════════════ */
.next-card {
  background:var(--card); border:1px solid var(--t08);
  border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-card);
}
.next-header {
  background:linear-gradient(135deg, var(--blue), var(--blue-lt));
  padding:22px 26px 18px; position:relative; overflow:hidden;
}
.next-header::after {
  content:''; position:absolute; top:-40px; right:-20px;
  width:180px; height:180px;
  background:radial-gradient(circle, rgba(255,255,255,0.10), transparent 65%);
}
.next-eyebrow {
  font-size:10px; letter-spacing:0.12em; text-transform:uppercase;
  color:rgba(255,255,255,0.65); margin-bottom:8px;
  display:flex; align-items:center; gap:6px;
}
.next-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.7); }
.next-time {
  font-family:var(--ff-d); font-size:36px; font-weight:300;
  color:var(--t100); line-height:1; margin-bottom:4px;
}
.next-date { font-size:13px; color:rgba(255,255,255,0.65); }
.countdown { position:absolute; top:22px; right:26px; text-align:right; }
.countdown-num {
  font-family:var(--ff-d); font-size:42px; font-weight:300;
  color:rgba(255,255,255,0.90); line-height:1;
}
.countdown-label { font-size:10px; color:rgba(255,255,255,0.50); letter-spacing:0.1em; }
.next-body { padding:20px 24px; }
.next-client { display:flex; align-items:center; gap:14px; margin-bottom:18px; }
.next-av {
  width:48px; height:48px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:700; color:var(--t100);
  border:2px solid var(--t15); flex-shrink:0;
}
.next-client-name { font-size:15px; font-weight:600; color:var(--t100); margin-bottom:3px; }
.next-client-detail { font-size:12px; color:var(--t55); line-height:1.5; font-weight:300; }
.next-info-row { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
.info-chip {
  display:flex; align-items:center; gap:5px; padding:5px 12px;
  border-radius:var(--r-full); background:var(--t05); border:1px solid var(--t08);
  font-size:11.5px; color:var(--t55);
}

/* buttons */
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
.next-actions { display:flex; gap:8px; }

/* ═══════════════════════ SOLICITUDES ═══════════════════════ */
.requests-card {
  background:var(--card); border:1px solid var(--t08);
  border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-card);
}
.requests-head {
  padding:18px 20px 14px; border-bottom:1px solid var(--t08);
  display:flex; align-items:center; justify-content:space-between;
}
.requests-title { font-family:var(--ff-d); font-size:17px; color:var(--t100); font-weight:300; }
.requests-badge {
  background:var(--amber); color:var(--bg);
  font-size:9.5px; font-weight:700; padding:2px 9px; border-radius:var(--r-full);
}
.request-item {
  padding:14px 20px; border-bottom:1px solid var(--t05);
  transition:background 0.15s;
}
.request-item:last-child { border-bottom:none; }
.request-item:hover { background:var(--t05); }
.req-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; margin-bottom:8px; }
.req-client { display:flex; align-items:center; gap:10px; }
.req-av {
  width:36px; height:36px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:700; color:var(--t100); flex-shrink:0;
}
.req-name { font-size:13px; font-weight:500; color:var(--t80); margin-bottom:1px; }
.req-type { font-size:11px; color:var(--t35); }
.req-price { font-family:var(--ff-d); font-size:19px; color:var(--blue-lt); }
.req-price span { font-family:var(--ff-s); font-size:10px; color:var(--t35); }
.req-details { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
.req-chip {
  padding:3px 9px; border-radius:var(--r-full);
  background:var(--t05); border:1px solid var(--t08);
  font-size:10.5px; color:var(--t35);
}
.req-btns { display:flex; gap:6px; }
.btn-accept {
  flex:1; padding:8px 12px; border-radius:var(--r-sm);
  background:var(--green-bg); color:var(--green);
  border:1px solid rgba(34,197,94,0.25);
  font-family:var(--ff-s); font-size:11.5px; font-weight:600;
  cursor:pointer; transition:all 0.15s;
}
.btn-accept:hover { background:rgba(34,197,94,0.22); }
.btn-decline {
  padding:8px 12px; border-radius:var(--r-sm);
  background:var(--red-bg); color:var(--red);
  border:1px solid rgba(239,68,68,0.2);
  font-family:var(--ff-s); font-size:11.5px; font-weight:600;
  cursor:pointer; transition:all 0.15s;
}
.btn-decline:hover { background:rgba(239,68,68,0.22); }

/* ═══════════════════════ AGENDA ═══════════════════════ */
.agenda-card {
  background:var(--card); border:1px solid var(--t08);
  border-radius:var(--r-xl); padding:22px 24px;
  box-shadow:var(--sh-card);
}
.week-row { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
.day-col { text-align:center; }
.day-name { font-size:9px; color:var(--t35); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:7px; }
.day-num {
  width:32px; height:32px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:12.5px; font-weight:500; color:var(--t55);
  margin:0 auto 7px; cursor:pointer; transition:all 0.15s;
}
.day-num:hover { background:var(--t08); color:var(--t80); }
.day-num.today {
  background:var(--blue-lt); color:var(--bg); font-weight:700;
  box-shadow:0 2px 12px rgba(90,150,212,0.45);
}
.day-num.has-event { color:var(--t80); }
.day-dots { display:flex; justify-content:center; gap:3px; min-height:8px; }
.day-dot { width:5px; height:5px; border-radius:50%; }
.day-dot.booked   { background:var(--blue-lt); }
.day-dot.request  { background:var(--amber); }
.day-slot-list { margin-top:18px; display:flex; flex-direction:column; gap:8px; }
.slot {
  display:flex; align-items:center; gap:12px; padding:10px 14px;
  border-radius:var(--r-md); background:var(--t05); border:1px solid var(--t08);
  transition:all 0.15s; cursor:pointer;
}
.slot:hover { background:var(--t08); border-color:var(--t15); }
.slot-bar { width:3px; border-radius:2px; align-self:stretch; min-height:34px; flex-shrink:0; }
.slot-bar.confirmed { background:var(--blue-lt); }
.slot-bar.pending   { background:var(--amber); }
.slot-time { font-size:12px; font-weight:500; color:var(--t55); min-width:90px; }
.slot-name { font-size:13px; font-weight:500; color:var(--t80); flex:1; }
.slot-type { font-size:11px; color:var(--t35); }
.slot-badge { padding:2px 9px; border-radius:var(--r-full); font-size:9.5px; font-weight:600; }
.slot-badge.confirmed { background:rgba(90,150,212,0.12); color:var(--blue-lt); border:1px solid rgba(90,150,212,0.25); }
.slot-badge.pending   { background:var(--amber-bg); color:var(--amber); border:1px solid rgba(245,166,35,0.25); }

/* ═══════════════════════ VALORACIONES ═══════════════════════ */
.reviews-card {
  background:var(--card); border:1px solid var(--t08);
  border-radius:var(--r-xl); padding:22px 24px; box-shadow:var(--sh-card);
}
.reviews-header { display:flex; align-items:center; gap:22px; margin-bottom:18px; }
.review-score {
  font-family:var(--ff-d); font-size:54px; font-weight:300;
  color:var(--t100); line-height:1;
}
.review-score em { font-style:italic; color:var(--blue-lt); }
.review-stars { font-size:16px; color:var(--amber); letter-spacing:-1px; margin-bottom:4px; }
.review-count { font-size:11px; color:var(--t35); }
.review-bars { flex:1; display:flex; flex-direction:column; gap:5px; }
.rbar-row { display:flex; align-items:center; gap:8px; }
.rbar-num { font-size:10px; color:var(--t35); width:6px; text-align:right; }
.rbar-track { flex:1; height:5px; background:var(--t08); border-radius:3px; overflow:hidden; }
.rbar-fill { height:100%; border-radius:3px; background:var(--amber); }
.rbar-count { font-size:10px; color:var(--t35); width:18px; }
.review-list { display:flex; flex-direction:column; gap:12px; }
.review-item { padding-bottom:12px; border-bottom:1px solid var(--t05); }
.review-item:last-child { border-bottom:none; padding-bottom:0; }
.rev-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
.rev-name { font-size:13px; font-weight:500; color:var(--t80); }
.rev-date { font-size:10.5px; color:var(--t35); }
.rev-stars { font-size:11px; color:var(--amber); margin-bottom:4px; }
.rev-text { font-size:12px; color:var(--t55); line-height:1.6; font-weight:300; }

/* ═══════════════════════ GANANCIAS ═══════════════════════ */
.earnings-card {
  background:var(--card); border:1px solid var(--t08);
  border-radius:var(--r-xl); padding:22px 24px; box-shadow:var(--sh-card);
}
.earn-total { display:flex; align-items:baseline; gap:5px; margin-bottom:4px; }
.earn-currency { font-size:20px; color:var(--blue-ltr); }
.earn-num { font-family:var(--ff-d); font-size:44px; font-weight:300; color:var(--blue-lt); line-height:1; }
.earn-period { font-size:12px; color:var(--t35); margin-bottom:20px; font-weight:300; }
.earn-breakdown { display:flex; flex-direction:column; gap:7px; }
.earn-sublabel { font-size:10px; color:var(--t35); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:4px; }
.earn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 12px; background:var(--t05); border-radius:var(--r-sm); border:1px solid var(--t05);
}
.earn-row-label { font-size:12.5px; color:var(--t55); display:flex; align-items:center; gap:8px; }
.earn-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.earn-row-val { font-family:var(--ff-d); font-size:15px; color:var(--t80); }
.earn-divider { height:1px; background:var(--t08); margin:4px 0; }
.earn-pending {
  margin-top:12px; padding:11px 14px;
  background:var(--amber-bg); border:1px solid rgba(245,166,35,0.22);
  border-radius:var(--r-md); display:flex; align-items:center; justify-content:space-between;
}
.earn-pending-label { font-size:12px; color:var(--amber); }
.earn-pending-val { font-family:var(--ff-d); font-size:17px; color:var(--amber); }

/* ═══════════════════════ ANIMATIONS ═══════════════════════ */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:none; }
}
.hero                         { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.04s; }
.two-col > *:nth-child(1)     { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.12s; }
.two-col > *:nth-child(2)     { animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.18s; }
.agenda-card                  { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.24s; }
.bottom-row > *:nth-child(1)  { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.28s; }
.bottom-row > *:nth-child(2)  { animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.34s; }

/* ═══════════════════════ RESPONSIVE ═══════════════════════ */
@media (max-width:960px) {
  .two-col, .bottom-row { grid-template-columns:1fr; }
  .hero { grid-template-columns:1fr; }
  .hero-stats { justify-content:flex-start; flex-wrap:wrap; }
}
@media (max-width:600px) {
  .nav { padding:0 16px; }
  .nav-center { display:none; }
  .page { padding:20px 16px 48px; }
}
@media (prefers-reduced-motion:reduce) {
  *, *::before, *::after { animation:none !important; transition:none !important; }
}
`;

/* ── DATA ── */
const CARER = { name:'María Carrasco', initials:'MC', specialty:'Cuidadora de adultos mayores', city:'Madrid' };

const TODAY_SLOTS = [
  { time:'09:00–12:00', name:'José Fernández', type:'Adulto mayor · 3h', status:'confirmed' },
  { time:'16:00–19:00', name:'Lucas Martín',   type:'Niño · 3h',         status:'confirmed' },
];

const WEEK = [
  { name:'Lun', num:23, today:false, dots:['booked'] },
  { name:'Mar', num:24, today:false, dots:['booked','booked'] },
  { name:'Mié', num:25, today:true,  dots:['booked','booked'] },
  { name:'Jue', num:26, today:false, dots:['request'] },
  { name:'Vie', num:27, today:false, dots:['booked'] },
  { name:'Sáb', num:28, today:false, dots:[] },
  { name:'Dom', num:29, today:false, dots:[] },
];

const REQUESTS_DATA = [
  { av:'RP', bg:'linear-gradient(135deg,#1a4a8a,#5a96d4)', name:'Rosa Pérez',   type:'Adulto mayor · Alzheimer', price:'€21/h', hours:'4h', date:'Vie 27 jun', time:'10:00–14:00' },
  { av:'TG', bg:'linear-gradient(135deg,#0e2d5a,#2e6fba)', name:'Tomás García', type:'Niño · 2 años',            price:'€16/h', hours:'5h', date:'Sáb 28 jun', time:'09:00–14:00' },
];

const REVIEWS = [
  { name:'Elena Soler',    date:'Hace 3 días', stars:5, text:'María es extraordinaria. Mi madre la adora y siempre llega puntual. La contrataré de nuevo sin dudar.' },
  { name:'Pedro Ruiz',     date:'Hace 1 sem',  stars:5, text:'Muy profesional y cariñosa con mi abuelo. Se nota que lo hace con vocación.' },
  { name:'Ana Villanueva', date:'Hace 2 sem',  stars:4, text:'Muy buena atención. Solo un pequeño retraso la primera vez, pero desde entonces perfecta.' },
];

const RATING_BARS = [5,4,3,2,1];
const RATING_VALS = [18,5,1,0,0];
const TOTAL_REV   = RATING_VALS.reduce((a,b) => a+b, 0);

function useCountdown() {
  const [mins, setMins] = useState(47);
  useEffect(() => {
    const id = setInterval(() => setMins(m => m > 0 ? m-1 : 0), 60000);
    return () => clearInterval(id);
  }, []);
  return mins;
}

export default function TQidoCuidador() {
  const [online,    setOnline]    = useState(true);
  const [activeNav, setActiveNav] = useState('Inicio');
  const [requests,  setRequests]  = useState(REQUESTS_DATA);
  const countdown = useCountdown();

  const acceptReq  = (name: string) => setRequests(r => r.filter(x => x.name !== name));
  const declineReq = (name: string) => setRequests(r => r.filter(x => x.name !== name));
  const starsStr   = (n: number)    => '★'.repeat(n) + '☆'.repeat(5-n);

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">
          TQ<em>ido</em>
          <span className="nav-logo-pro">pro</span>
        </div>
        <div className="nav-center">
          {['Inicio','Agenda','Clientes','Ganancias'].map(n => (
            <button key={n} className={`nav-pill${activeNav===n?' active':''}`} onClick={() => setActiveNav(n)}>{n}</button>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-notif">🔔<div className="nav-notif-dot"/></div>
          <div className="nav-avatar">{CARER.initials}</div>
        </div>
      </nav>

      <div className="page">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-left">
            <div className="hero-greeting">Miércoles 25 jun · {CARER.city}</div>
            <div className="hero-name">Hola, <em>{CARER.name.split(' ')[0]}</em> 👋</div>
            <div className="hero-status-row">
              <div className={`toggle-wrap${online?' online':''}`} onClick={() => setOnline(o => !o)}>
                <div className="pulse-dot"/>
                <span className="toggle-label-text">{online ? 'Disponible' : 'No disponible'}</span>
                <div className="toggle-track"><div className="toggle-thumb"/></div>
              </div>
              <div className="hero-status-text">
                {online
                  ? <><strong>Recibiendo solicitudes</strong> · los clientes pueden encontrarte</>
                  : 'No recibirás nuevas solicitudes'}
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-num blue">€{6*18}</div>
              <div className="hstat-label">Ganancias<br/>de hoy</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">2</div>
              <div className="hstat-label">Servicios<br/>hoy</div>
            </div>
            <div className="hstat">
              <div className="hstat-num amber">{requests.length}</div>
              <div className="hstat-label">Solicitudes<br/>pendientes</div>
            </div>
            <div className="hstat">
              <div className="hstat-num green">4.9</div>
              <div className="hstat-label">Valoración<br/>media</div>
            </div>
          </div>
        </div>

        {/* ── ROW 1: próximo + solicitudes ── */}
        <div className="two-col">

          {/* PRÓXIMO SERVICIO */}
          <div className="next-card">
            <div className="next-header">
              <div className="next-eyebrow">
                <div className="next-eyebrow-dot"/>
                Próximo servicio
              </div>
              <div className="next-time">09:00</div>
              <div className="next-date">Hoy · miércoles 25 de junio</div>
              <div className="countdown">
                <div className="countdown-num">{countdown}</div>
                <div className="countdown-label">MIN RESTANTES</div>
              </div>
            </div>
            <div className="next-body">
              <div className="next-client">
                <div className="next-av" style={{background:'linear-gradient(135deg,#0e2d5a,#2e6fba)'}}>JF</div>
                <div>
                  <div className="next-client-name">José Fernández</div>
                  <div className="next-client-detail">Adulto mayor · 82 años<br/>Alzheimer leve · medicación</div>
                </div>
              </div>
              <div className="next-info-row">
                <div className="info-chip"><span>⏱</span> 3 horas</div>
                <div className="info-chip"><span>📍</span> C/ Serrano 42</div>
                <div className="info-chip"><span>💰</span> €54</div>
              </div>
              <div className="next-actions">
                <button className="btn-primary">Ver instrucciones</button>
                <button className="btn-secondary">📞 Llamar</button>
                <button className="btn-secondary">🗺 Ruta</button>
              </div>
            </div>
          </div>

          {/* SOLICITUDES */}
          <div className="requests-card">
            <div className="requests-head">
              <div className="requests-title">Solicitudes</div>
              {requests.length > 0 && <span className="requests-badge">{requests.length} nuevas</span>}
            </div>
            {requests.length === 0 ? (
              <div style={{padding:'36px 20px',textAlign:'center',color:'var(--t35)',fontSize:13}}>
                No hay solicitudes pendientes
              </div>
            ) : requests.map(r => (
              <div className="request-item" key={r.name}>
                <div className="req-top">
                  <div className="req-client">
                    <div className="req-av" style={{background:r.bg}}>{r.av}</div>
                    <div>
                      <div className="req-name">{r.name}</div>
                      <div className="req-type">{r.type}</div>
                    </div>
                  </div>
                  <div className="req-price">{r.price}<span>/h</span></div>
                </div>
                <div className="req-details">
                  <span className="req-chip">📅 {r.date}</span>
                  <span className="req-chip">🕐 {r.time}</span>
                  <span className="req-chip">⏱ {r.hours}</span>
                </div>
                <div className="req-btns">
                  <button className="btn-accept" onClick={() => acceptReq(r.name)}>✓ Aceptar</button>
                  <button className="btn-decline" onClick={() => declineReq(r.name)}>✕ Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AGENDA ── */}
        <div className="agenda-card">
          <div className="sec-title">Agenda de la semana</div>
          <div className="week-row">
            {WEEK.map(d => (
              <div className="day-col" key={d.name}>
                <div className="day-name">{d.name}</div>
                <div className={`day-num${d.today?' today':d.dots.length?' has-event':''}`}>{d.num}</div>
                <div className="day-dots">
                  {d.dots.map((dot,i) => <div key={i} className={`day-dot ${dot}`}/>)}
                </div>
              </div>
            ))}
          </div>
          <div className="day-slot-list">
            <div style={{fontSize:10,color:'var(--t35)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:4}}>Servicios de hoy</div>
            {TODAY_SLOTS.map(s => (
              <div className="slot" key={s.name}>
                <div className={`slot-bar ${s.status}`}/>
                <div className="slot-time">{s.time}</div>
                <div style={{flex:1}}>
                  <div className="slot-name">{s.name}</div>
                  <div className="slot-type">{s.type}</div>
                </div>
                <div className={`slot-badge ${s.status}`}>{s.status==='confirmed'?'Confirmado':'Pendiente'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2: valoraciones + ganancias ── */}
        <div className="bottom-row">

          {/* VALORACIONES */}
          <div className="reviews-card">
            <div className="sec-title">Mis valoraciones</div>
            <div className="reviews-header">
              <div>
                <div className="review-score">4<em>.9</em></div>
                <div className="review-stars">★★★★★</div>
                <div className="review-count">{TOTAL_REV} reseñas</div>
              </div>
              <div className="review-bars">
                {RATING_BARS.map((n,i) => (
                  <div className="rbar-row" key={n}>
                    <span className="rbar-num">{n}</span>
                    <div className="rbar-track">
                      <div className="rbar-fill" style={{width:`${TOTAL_REV>0?(RATING_VALS[i]/TOTAL_REV*100):0}%`}}/>
                    </div>
                    <span className="rbar-count">{RATING_VALS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="review-list">
              {REVIEWS.map(r => (
                <div className="review-item" key={r.name}>
                  <div className="rev-top">
                    <span className="rev-name">{r.name}</span>
                    <span className="rev-date">{r.date}</span>
                  </div>
                  <div className="rev-stars">{starsStr(r.stars)}</div>
                  <div className="rev-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GANANCIAS */}
          <div className="earnings-card">
            <div className="sec-title">Ganancias</div>
            <div className="earn-total">
              <span className="earn-currency">€</span>
              <span className="earn-num">108</span>
            </div>
            <div className="earn-period">Esta semana · 6 horas completadas</div>
            <div className="earn-breakdown">
              <div className="earn-sublabel">Desglose semanal</div>
              {[
                { label:'Lunes',      dot:'var(--blue-lt)',  val:'€54' },
                { label:'Martes',     dot:'var(--blue-lt)',  val:'€54' },
                { label:'Miércoles',  dot:'var(--amber)',    val:'€108 (pendiente)' },
              ].map(e => (
                <div className="earn-row" key={e.label}>
                  <span className="earn-row-label">
                    <span className="earn-dot" style={{background:e.dot}}/>
                    {e.label}
                  </span>
                  <span className="earn-row-val" style={{fontSize:13,color:'var(--t55)'}}>{e.val}</span>
                </div>
              ))}
              <div className="earn-divider"/>
              <div className="earn-row">
                <span className="earn-row-label" style={{color:'var(--t80)',fontWeight:500}}>Total cobrado</span>
                <span className="earn-row-val">€108</span>
              </div>
            </div>
            <div className="earn-pending">
              <span className="earn-pending-label">⏳ Pendiente de cobro</span>
              <span className="earn-pending-val">€108</span>
            </div>
            <div style={{marginTop:14}}>
              <button className="btn-primary" style={{width:'100%'}}>Ver historial completo</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}