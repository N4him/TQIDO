import { useState, useRef, useEffect } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ═══════════════════════════════════════════
   DESIGN TOKENS — #5a96e8 Dominant System
═══════════════════════════════════════════ */
:root {
  /* ── Brand: #5a96e8 is THE dominant ── */
  --dom:        #5a96e8;         /* ← THE background dominant */
  --dom-lt:     #7ab0f0;
  --dom-llt:    #a0c8f8;
  --dom-dk:     #3a78cc;
  --dom-xdk:    #2260b0;
  --dom-deep:   #1a4a90;

  /* ── On-dominant (white spectrum) ── */
  --on-dom:      #ffffff;
  --on-dom-80:   rgba(255,255,255,0.80);
  --on-dom-60:   rgba(255,255,255,0.60);
  --on-dom-40:   rgba(255,255,255,0.40);
  --on-dom-20:   rgba(255,255,255,0.20);
  --on-dom-12:   rgba(255,255,255,0.12);
  --on-dom-08:   rgba(255,255,255,0.08);

  /* ── Surface (cards, dropdowns — float above the blue) ── */
  --surf:        #ffffff;
  --surf-2:      #f4f8fe;
  --surf-3:      #e8f0fb;
  --surf-border: rgba(90,150,232,0.18);

  /* ── Text on white surfaces ── */
  --ink:    #0d1e2e;
  --ink-2:  #1b3348;
  --muted:  #4a6b88;
  --faint:  #96b2cc;

  /* ── Semantic ── */
  --success: #12B76A;
  --warning: #F79009;
  --error:   #F04438;

  /* ── Elevation shadows (cast on the blue bg) ── */
  --sh-xs:  0 1px 3px rgba(20,50,100,0.18);
  --sh-sm:  0 2px 8px rgba(20,50,100,0.20), 0 1px 2px rgba(20,50,100,0.12);
  --sh-md:  0 6px 16px rgba(20,50,100,0.22), 0 2px 4px rgba(20,50,100,0.10);
  --sh-lg:  0 14px 32px rgba(20,50,100,0.26), 0 4px 8px rgba(20,50,100,0.12);
  --sh-xl:  0 24px 48px rgba(20,50,100,0.30), 0 8px 16px rgba(20,50,100,0.14);
  --sh-glow:0 4px 20px rgba(26,74,144,0.50);

  /* ── Radii ── */
  --r4: 4px; --r8: 8px; --r12: 12px; --r16: 16px;
  --r24: 24px; --rF: 9999px;

  /* ── 4pt spacing ── */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px;
  --s5:20px; --s6:24px; --s8:32px; --s10:40px; --s12:48px; --s16:64px;

  /* ── Type ── */
  --ff-ui: 'Plus Jakarta Sans', system-ui, sans-serif;
  --ff-d:  'Lora', Georgia, serif;
}

html,body {
  min-height: 100%;
  background: var(--dom);
  font-family: var(--ff-ui);
  color: var(--on-dom);
  -webkit-font-smoothing: antialiased;
}

/* ── Background texture ── */
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

/* ═══════════════════════════════════════
   NAV — glass over blue
═══════════════════════════════════════ */
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
.nav-link:hover { color: var(--on-dom); background: var(--on-dom-12); }
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

/* User pill */
.nav-user {
  display: flex; align-items: center; gap: var(--s2);
  padding: 4px 10px 4px 12px;
  border-radius: var(--rF);
  border: 1px solid var(--on-dom-30, rgba(255,255,255,0.30));
  background: var(--on-dom-12);
  cursor: pointer; transition: all 0.15s ease;
  position: relative; user-select: none;
  backdrop-filter: blur(8px);
}
.nav-user:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.nav-user-meta { display: flex; flex-direction: column; gap: 1px; }
.nav-user-name { font-size: 12px; font-weight: 600; color: var(--on-dom); line-height: 1; }
.nav-user-loc  { font-size: 10px; color: var(--on-dom-60); line-height: 1; }
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

/* ═══════════════════════════════════════
   DROPDOWN — white surface
═══════════════════════════════════════ */
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
.dd-progress-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s2); }
.dd-progress-label { font-size: 11px; font-weight: 600; color: var(--dom-deep); }
.dd-progress-pct { font-size: 13px; font-weight: 700; color: var(--dom-dk); font-family: var(--ff-d); font-style: italic; }
.dd-progress-track { height: 4px; background: #c8dcf5; border-radius: var(--rF); overflow: hidden; }
.dd-progress-fill {
  height: 100%; border-radius: var(--rF);
  background: linear-gradient(90deg, var(--dom-dk), var(--dom));
  transition: width 0.9s cubic-bezier(0.34,1.2,0.64,1);
}
.dd-progress-hint { font-size: 10px; color: var(--dom-deep); margin-top: var(--s1); }
.dd-progress-hint strong { font-weight: 600; }

.dd-section { padding: var(--s2); }
.dd-item {
  display: flex; align-items: center; gap: var(--s2);
  padding: var(--s2) var(--s3); border-radius: var(--r8);
  font-size: 13px; font-weight: 500; color: var(--muted);
  cursor: pointer; transition: all 0.12s ease;
}
.dd-item:hover { background: var(--surf-2); color: var(--ink); }
.dd-item.danger { color: var(--error); }
.dd-item.danger:hover { background: #fef3f2; }
.dd-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
.dd-badge {
  margin-left: auto; background: var(--dom); color: #fff;
  font-size: 10px; font-weight: 700; padding: 1px 7px;
  border-radius: var(--rF);
}
.dd-sep { height: 1px; background: var(--surf-3); margin: var(--s1) var(--s2); }

/* ═══════════════════════════════════════
   HERO — text on blue
═══════════════════════════════════════ */
.hero-section {
  padding: var(--s16) var(--s8) var(--s10);
  max-width: 860px; margin: 0 auto; text-align: center;
  position: relative; z-index: 1;
}

.hero-pill {
  display: inline-flex; align-items: center; gap: var(--s2);
  background: var(--on-dom-12); border: 1px solid var(--on-dom-30, rgba(255,255,255,0.30));
  border-radius: var(--rF); padding: 5px 16px;
  font-size: 11px; font-weight: 600; color: var(--on-dom);
  letter-spacing: 0.06em; text-transform: uppercase;
  margin-bottom: var(--s6); backdrop-filter: blur(8px);
}
.hero-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #fff176;
  box-shadow: 0 0 0 3px rgba(255,241,118,0.25);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(255,241,118,0.25); }
  50%      { box-shadow: 0 0 0 7px rgba(255,241,118,0); }
}

.hero-title {
  font-family: var(--ff-d);
  font-size: clamp(36px, 5.5vw, 56px);
  font-weight: 500; color: var(--on-dom);
  line-height: 1.1; letter-spacing: -0.025em;
  margin-bottom: var(--s5);
  text-shadow: 0 2px 20px rgba(20,50,100,0.25);
}
.hero-title em {
  font-style: italic; color: var(--on-dom);
  position: relative;
}
.hero-title em::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(255,241,118,0.9), rgba(255,241,118,0.3));
  border-radius: 2px;
}

.hero-sub {
  font-size: 15.5px; color: var(--on-dom-80); font-weight: 400;
  line-height: 1.7; max-width: 520px;
  margin: 0 auto var(--s10);
}

/* ═══════════════════════════════════════
   SEARCH BAR — white card on blue
═══════════════════════════════════════ */
.search-frame {
  background: var(--surf); border-radius: var(--r16);
  box-shadow: var(--sh-lg); padding: var(--s2);
  display: flex; align-items: stretch;
  max-width: 740px; margin: 0 auto;
  border: 1px solid rgba(255,255,255,0.9);
  gap: var(--s2);
}
.search-frame:focus-within {
  box-shadow: var(--sh-lg), 0 0 0 4px rgba(255,255,255,0.30);
}
.sf {
  flex: 1; padding: 10px var(--s4);
  display: flex; flex-direction: column; gap: 3px;
  border-radius: var(--r12); cursor: pointer;
  transition: background 0.12s ease; min-width: 0;
}
.sf:hover { background: var(--surf-2); }
.sf-label { font-size: 9.5px; font-weight: 700; color: var(--ink); letter-spacing: 0.08em; text-transform: uppercase; }
.sf-val { font-size: 13px; color: var(--muted); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sf-input {
  background: none; border: none; outline: none;
  font-family: var(--ff-ui); font-size: 13px; color: var(--ink); width: 100%;
}
.sf-input::placeholder { color: var(--faint); }
.sf-sep { width: 1px; background: var(--surf-3); margin: var(--s2) 0; flex-shrink: 0; align-self: stretch; }
.search-cta {
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff; border: none;
  border-radius: var(--r12); padding: 10px 22px;
  font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: var(--ff-ui);
  display: flex; align-items: center; gap: var(--s2);
  transition: all 0.18s ease; white-space: nowrap;
  flex-shrink: 0; box-shadow: var(--sh-glow);
}
.search-cta:hover {
  background: linear-gradient(135deg, var(--dom-xdk, #1a4a90), var(--dom-deep));
  transform: translateY(-1px); box-shadow: 0 6px 28px rgba(26,74,144,0.60);
}
.search-cta:active { transform: none; }

/* ═══════════════════════════════════════
   TRUST STRIP — glass on blue
═══════════════════════════════════════ */
.trust-strip {
  background: rgba(58,120,204,0.35);
  border-top: 1px solid var(--on-dom-20);
  border-bottom: 1px solid var(--on-dom-20);
  padding: 14px var(--s8);
  display: flex; align-items: center;
  justify-content: center; gap: var(--s10); flex-wrap: wrap;
  backdrop-filter: blur(10px); position: relative; z-index: 1;
}
.trust-item { display: flex; align-items: center; gap: var(--s2); font-size: 12px; font-weight: 500; color: var(--on-dom-80); }
.trust-icon-wrap {
  width: 22px; height: 22px; border-radius: var(--r4);
  background: var(--on-dom-20); border: 1px solid var(--on-dom-30, rgba(255,255,255,0.30));
  display: flex; align-items: center; justify-content: center; font-size: 11px;
}

/* ═══════════════════════════════════════
   FILTER BAR — glass chips on blue
═══════════════════════════════════════ */
.filter-bar {
  display: flex; align-items: center; gap: var(--s2);
  padding: var(--s6) var(--s8) 0;
  max-width: 1200px; margin: 0 auto;
  flex-wrap: wrap; position: relative; z-index: 1;
}
.filter-label {
  font-size: 11px; font-weight: 600; color: var(--on-dom-60);
  letter-spacing: 0.06em; text-transform: uppercase; margin-right: var(--s1);
}

.chip {
  display: inline-flex; align-items: center; gap: var(--s1);
  padding: 5px 13px; border-radius: var(--r8);
  font-size: 12.5px; font-weight: 500; color: var(--on-dom);
  background: var(--on-dom-12); border: 1px solid var(--on-dom-30, rgba(255,255,255,0.30));
  cursor: pointer; transition: all 0.13s ease;
  font-family: var(--ff-ui); white-space: nowrap;
  backdrop-filter: blur(8px);
}
.chip:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.chip.on {
  background: var(--surf); color: var(--dom-dk);
  border-color: rgba(255,255,255,0.95);
  box-shadow: var(--sh-sm);
}
.chip.on:hover { background: var(--surf-2); }
.chip-count {
  font-size: 9.5px; font-weight: 700;
  background: var(--on-dom-20); border-radius: var(--rF);
  padding: 1px 5px; color: var(--on-dom);
}
.chip.on .chip-count { background: var(--surf-3); color: var(--dom-dk); }
.chip-status { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

.chip-clear {
  color: #fff176; border-color: rgba(255,241,118,0.35);
  background: rgba(255,241,118,0.12);
}
.chip-clear:hover { background: rgba(255,241,118,0.22); border-color: rgba(255,241,118,0.55); color: #ffd600; }

.sort-select {
  margin-left: auto; padding: 5px 30px 5px 13px;
  border-radius: var(--r8); font-size: 12.5px; font-weight: 500;
  color: var(--on-dom); background: var(--on-dom-12);
  border: 1px solid var(--on-dom-30, rgba(255,255,255,0.30));
  cursor: pointer; font-family: var(--ff-ui); outline: none; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  transition: all 0.13s ease; backdrop-filter: blur(8px);
}
.sort-select option { background: var(--dom-dk); color: #fff; }
.sort-select:hover { background-color: var(--on-dom-20); }
.sort-select:focus { border-color: var(--on-dom-40); box-shadow: 0 0 0 3px var(--on-dom-12); outline: none; }

/* ═══════════════════════════════════════
   RESULTS HEADER
═══════════════════════════════════════ */
.results-head {
  display: flex; align-items: baseline; gap: var(--s2);
  padding: var(--s6) var(--s8) var(--s4);
  max-width: 1200px; margin: 0 auto;
  position: relative; z-index: 1;
}
.results-count {
  font-family: var(--ff-d); font-size: 24px; font-weight: 500;
  color: var(--on-dom); letter-spacing: -0.02em;
}
.results-count em { font-style: italic; color: #fff176; }
.results-label { font-size: 13px; color: var(--on-dom-60); }

/* ═══════════════════════════════════════
   CARER CARDS — white surface on blue
═══════════════════════════════════════ */
.grid-outer {
  padding: 0 var(--s8) var(--s16);
  max-width: 1200px; margin: 0 auto;
  position: relative; z-index: 1;
}
.carer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: var(--s4);
}

.card {
  background: var(--surf);
  border-radius: var(--r16);
  border: 1px solid rgba(255,255,255,0.85);
  box-shadow: var(--sh-md);
  overflow: hidden; cursor: pointer;
  transition:
    transform 0.28s cubic-bezier(0.34,1.2,0.64,1),
    box-shadow 0.28s ease;
  display: flex; flex-direction: column;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--sh-xl);
}
.card:hover .card-cta-row { max-height: 56px; opacity: 1; padding: var(--s3) var(--s4) var(--s4); }
.card:hover .card-header-overlay { opacity: 1; }

.card-header { height: 160px; position: relative; overflow: hidden; flex-shrink: 0; }
.card-header-bg { position: absolute; inset: 0; }
.card-header-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,26,42,0.55), transparent 55%);
  opacity: 0; transition: opacity 0.22s ease;
}

.status-badge {
  position: absolute; top: 10px; left: 10px;
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.95); border-radius: var(--rF);
  padding: 3px 10px; backdrop-filter: blur(10px); box-shadow: var(--sh-xs);
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status-text { font-size: 10px; font-weight: 700; letter-spacing: 0.02em; }

.card-fav {
  position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px; border-radius: var(--r8);
  background: rgba(255,255,255,0.95);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.34,1.2,0.64,1);
  backdrop-filter: blur(10px); box-shadow: var(--sh-xs);
}
.card-fav:hover { transform: scale(1.15); }

.card-identity { position: absolute; bottom: -16px; left: 14px; }
.card-av {
  width: 36px; height: 36px; border-radius: var(--r8);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff;
  border: 2.5px solid #fff; box-shadow: var(--sh-sm);
  font-family: var(--ff-ui);
}

.card-body { padding: 24px var(--s4) var(--s4); flex: 1; display: flex; flex-direction: column; gap: var(--s3); }
.card-name { font-family: var(--ff-d); font-size: 15.5px; font-weight: 500; color: var(--ink); letter-spacing: -0.01em; }
.card-spec { font-size: 12px; color: var(--muted); line-height: 1.5; }
.card-tags { display: flex; gap: var(--s1); flex-wrap: wrap; }
.card-tag {
  padding: 2px 8px; border-radius: var(--r4);
  font-size: 10px; font-weight: 600;
  background: #e8f0fb; color: var(--dom-deep);
  border: 1px solid #c8dcf5;
}

.card-foot {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: auto; padding-top: var(--s3);
  border-top: 1px solid var(--surf-3);
}
.card-rating { display: flex; align-items: center; gap: var(--s1); }
.stars { color: var(--warning); font-size: 10px; letter-spacing: 1px; }
.rating-num { font-size: 12px; font-weight: 600; color: var(--ink); }
.review-cnt { font-size: 11px; color: var(--faint); }
.card-price { display: flex; align-items: baseline; gap: 2px; }
.price-val { font-family: var(--ff-d); font-size: 22px; font-weight: 500; color: var(--ink); letter-spacing: -0.02em; }
.price-unit { font-size: 10.5px; color: var(--muted); }

.card-cta-row {
  display: flex; gap: var(--s2);
  overflow: hidden; max-height: 0; opacity: 0; padding: 0 var(--s4);
  background: var(--surf-2); border-top: 1px solid var(--surf-3);
  transition: all 0.28s cubic-bezier(0.34,1.2,0.64,1);
}
.btn-primary {
  flex: 1; padding: 8px 12px; border-radius: var(--r8);
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff; font-family: var(--ff-ui); font-size: 12px; font-weight: 600;
  border: none; cursor: pointer; transition: all 0.14s ease; box-shadow: var(--sh-sm);
}
.btn-primary:hover { background: linear-gradient(135deg, var(--dom-xdk, #1a4a90), var(--dom-deep)); }
.btn-secondary {
  padding: 8px 14px; border-radius: var(--r8);
  background: transparent; color: var(--muted);
  font-family: var(--ff-ui); font-size: 12px; font-weight: 600;
  border: 1px solid var(--surf-3); cursor: pointer; transition: all 0.14s ease;
}
.btn-secondary:hover { border-color: #c8dcf5; color: var(--dom-dk); background: var(--surf-2); }

/* ═══════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════ */
.empty-state {
  grid-column: 1/-1; padding: var(--s16) var(--s8);
  display: flex; flex-direction: column; align-items: center; gap: var(--s3);
  text-align: center;
}
.empty-icon {
  width: 64px; height: 64px; border-radius: var(--r16);
  background: var(--on-dom-12); border: 1px solid var(--on-dom-20);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin-bottom: var(--s2);
  backdrop-filter: blur(8px);
}
.empty-title { font-family: var(--ff-d); font-size: 20px; font-style: italic; color: var(--on-dom); }
.empty-sub { font-size: 13px; color: var(--on-dom-70, rgba(255,255,255,0.70)); max-width: 280px; line-height: 1.6; }
.empty-action {
  margin-top: var(--s2); padding: 9px 22px;
  background: var(--surf); border: none;
  border-radius: var(--rF); color: var(--dom-dk);
  font-family: var(--ff-ui); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.13s ease; box-shadow: var(--sh-sm);
}
.empty-action:hover { background: var(--surf-2); transform: translateY(-1px); box-shadow: var(--sh-md); }

/* ═══════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
.hero-section { animation: fadeUp 0.6s cubic-bezier(0.22,0.68,0,1) both 0.05s; }
.search-frame { animation: fadeUp 0.6s cubic-bezier(0.22,0.68,0,1) both 0.14s; }
.trust-strip  { animation: fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.22s; }
.filter-bar   { animation: fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.28s; }
.card:nth-child(1){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.32s}
.card:nth-child(2){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.37s}
.card:nth-child(3){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.42s}
.card:nth-child(4){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.47s}
.card:nth-child(5){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.40s}
.card:nth-child(6){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.45s}
.card:nth-child(7){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.50s}
.card:nth-child(8){animation:fadeUp 0.45s cubic-bezier(0.22,0.68,0,1) both 0.55s}

@media(max-width:640px){
  .nav { padding: 0 var(--s4); }
  .nav-center { display: none; }
  .nav-user-meta { display: none; }
  .hero-section { padding: var(--s10) var(--s4) var(--s8); }
  .search-frame { flex-direction: column; border-radius: var(--r12); gap: var(--s1); }
  .sf-sep { display: none; }
  .filter-bar, .grid-outer, .results-head { padding-left: var(--s4); padding-right: var(--s4); }
  .trust-strip { gap: var(--s5); padding: 12px var(--s4); }
}
`;

/* ── DATA ── */
const CARERS = [
  { id:1,  av:'MC', bg:'linear-gradient(135deg,#0D56A0,#1A8EE6)', name:'María Carrasco', spec:'Adultos mayores · Niños',    price:18, tags:['Primeros auxilios','Enfermería'],  avail:true,  stars:4.9, reviews:24, cat:'adultos'  },
  { id:2,  av:'LP', bg:'linear-gradient(135deg,#0b6b45,#12B76A)', name:'Laura Pons',     spec:'Niños y bebés',              price:16, tags:['Pedagogía','Inglés'],              avail:true,  stars:4.8, reviews:18, cat:'ninos'    },
  { id:3,  av:'AS', bg:'linear-gradient(135deg,#0A3D78,#3AA5F5)', name:'Ana Suárez',     spec:'Mayores · Discapacidad',     price:20, tags:['Enfermería','Fisioterapia'],       avail:true,  stars:5.0, reviews:31, cat:'adultos'  },
  { id:4,  av:'CR', bg:'linear-gradient(135deg,#7c2d12,#ea580c)', name:'Carlos Ruiz',    spec:'Mascotas · Paseos diarios',  price:14, tags:['Veterinaria','Adiestramiento'],   avail:false, stars:4.6, reviews:9,  cat:'mascotas' },
  { id:5,  av:'DM', bg:'linear-gradient(135deg,#0D56A0,#76C3FF)', name:'Diego Molina',   spec:'Niños · Actividades',        price:15, tags:['Ed. física','Manualidades'],       avail:true,  stars:4.7, reviews:12, cat:'ninos'    },
  { id:6,  av:'IG', bg:'linear-gradient(135deg,#0A3D78,#1A8EE6)', name:'Isabel García',  spec:'Adultos mayores · Compañía', price:17, tags:['Gerontología','Compañía'],        avail:false, stars:4.9, reviews:22, cat:'adultos'  },
  { id:7,  av:'SR', bg:'linear-gradient(135deg,#065f46,#2dd4e0)', name:'Sofía Romero',   spec:'Niños · Bebés',              price:15, tags:['Montessori','Prim. auxilios'],     avail:true,  stars:4.8, reviews:16, cat:'ninos'    },
  { id:8,  av:'PM', bg:'linear-gradient(135deg,#0D56A0,#AEDCFF)', name:'Pablo Martín',   spec:'Mascotas · Entrenamiento',   price:13, tags:['Entrenador','Paseos'],             avail:true,  stars:4.5, reviews:7,  cat:'mascotas' },
];

const CATS = [
  { key:'todos',    label:'Todos',    emoji:'✦'  },
  { key:'adultos',  label:'Mayores',  emoji:'👴' },
  { key:'ninos',    label:'Niños',    emoji:'👶' },
  { key:'mascotas', label:'Mascotas', emoji:'🐾' },
];

const USER = { name:'Sara González', email:'sara@email.com', initials:'SG', city:'Madrid' };

const STEPS = [
  { label:'Foto de perfil',         done:true  },
  { label:'Número verificado',      done:true  },
  { label:'Dirección completa',     done:true  },
  { label:'Método de pago',         done:false },
  { label:'Preferencias guardadas', done:false },
];
const PROFILE_PCT = Math.round(STEPS.filter(s=>s.done).length / STEPS.length * 100);
const NEXT_STEP   = STEPS.find(s=>!s.done);

/* ── COMPONENT ── */
export default function TQidoFigmaKit() {
  const [cat,      setCat]      = useState('todos');
  const [avail,    setAvail]    = useState('todos');
  const [sort,     setSort]     = useState('rating');
  const [favs,     setFavs]     = useState(new Set());
  const [search,   setSearch]   = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: { target: any; }) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const toggleFav = (id: unknown, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setFavs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const filtered = CARERS
    .filter(c => cat   === 'todos' || c.cat === cat)
    .filter(c => avail === 'todos' || c.avail)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.spec.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
      if (sort==='rating')      return b.stars - a.stars;
      if (sort==='precio-asc')  return a.price - b.price;
      if (sort==='precio-desc') return b.price - a.price;
      return 0;
    });

  const reset     = () => { setCat('todos'); setAvail('todos'); setSearch(''); };
  const countCat  = (k: string) => CARERS.filter(c => k==='todos' || c.cat===k).length;
  const hasFilter = cat !== 'todos' || avail !== 'todos' || search;
  const stars     = (n: number) => '★'.repeat(Math.round(n)) + '☆'.repeat(5-Math.round(n));

  return (
    <>
      <style>{css}</style>

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

        {/* Center nav */}
        <div className="nav-center">
          <button className="nav-link active">Explorar</button>
          <button className="nav-link">Mis reservas</button>
          <button className="nav-link">Favoritos</button>
        </div>

        {/* Right cluster */}
        <div className="nav-right">
          <button className="icon-btn" title="Notificaciones" style={{fontSize:14}}>
            🔔<div className="icon-btn-badge"/>
          </button>
          <div className="nav-divider"/>
          <div className={`nav-user${menuOpen?' open':''}`} ref={menuRef} onClick={() => setMenuOpen(o=>!o)}>
            <div className="nav-user-meta">
              <div className="nav-user-name">{USER.name.split(' ')[0]}</div>
              <div className="nav-user-loc">📍 {USER.city}</div>
            </div>
            <div className="nav-avatar">{USER.initials}</div>
            <span className="nav-chevron">▼</span>

            {/* Dropdown */}
            <div className={`dropdown${menuOpen?' open':''}`}>
              <div className="dd-user-block">
                <div className="dd-user-avatar">{USER.initials}</div>
                <div>
                  <div className="dd-name">{USER.name}</div>
                  <div className="dd-email">{USER.email}</div>
                </div>
              </div>
              <div className="dd-progress">
                <div className="dd-progress-head">
                  <span className="dd-progress-label">Perfil completado</span>
                  <span className="dd-progress-pct">{PROFILE_PCT}%</span>
                </div>
                <div className="dd-progress-track">
                  <div className="dd-progress-fill" style={{width:`${PROFILE_PCT}%`}}/>
                </div>
                {NEXT_STEP && (
                  <div className="dd-progress-hint">
                    Siguiente: <strong>{NEXT_STEP.label}</strong>
                  </div>
                )}
              </div>
              <div className="dd-section">
                <div className="dd-item"><span className="dd-icon">👤</span>Mi perfil</div>
                <div className="dd-item"><span className="dd-icon">📅</span>Mis reservas<span className="dd-badge">2</span></div>
                <div className="dd-item"><span className="dd-icon">❤️</span>Favoritos<span className="dd-badge">{Math.max(favs.size,4)}</span></div>
                <div className="dd-item"><span className="dd-icon">💳</span>Métodos de pago</div>
                <div className="dd-sep"/>
                <div className="dd-item"><span className="dd-icon">⚙️</span>Ajustes</div>
                <div className="dd-item danger"><span className="dd-icon">↩</span>Cerrar sesión</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-pill">
          <div className="hero-pill-dot"/>
          Madrid · 48 cuidadores activos
        </div>
        <h1 className="hero-title">
          Hola, <em>{USER.name.split(' ')[0]}</em> 👋<br/>
          ¿A quién cuidamos hoy?
        </h1>
        <p className="hero-sub">
          Cuidadores verificados, con experiencia real y reseñas de familias como la tuya.
        </p>

        {/* Search */}
        <div className="search-frame">
          <div className="sf">
            <div className="sf-label">¿Para quién?</div>
            <div className="sf-val">Adulto mayor, niño, mascota…</div>
          </div>
          <div className="sf-sep"/>
          <div className="sf">
            <div className="sf-label">¿Cuándo?</div>
            <div className="sf-val">Hoy · Esta semana</div>
          </div>
          <div className="sf-sep"/>
          <div className="sf" style={{flex:'0 0 auto', minWidth:160}}>
            <div className="sf-label">Buscar</div>
            <input
              className="sf-input"
              placeholder="Nombre o especialidad…"
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <button className="search-cta">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5"/>
              <path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Buscar
          </button>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        {[
          ['✓','Cuidadores verificados'],
          ['🔒','Pago seguro'],
          ['⭐','4.9 de media · +1.200 reseñas'],
          ['💬','Soporte 24 h'],
        ].map(([icon,label]) => (
          <div className="trust-item" key={label}>
            <div className="trust-icon-wrap">{icon}</div>
            {label}
          </div>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <div className="filter-bar">
        <span className="filter-label">Filtrar</span>
        {CATS.map(o => (
          <button key={o.key} className={`chip${cat===o.key?' on':''}`} onClick={()=>setCat(o.key)}>
            {o.emoji} {o.label}
            {o.key!=='todos' && <span className="chip-count">{countCat(o.key)}</span>}
          </button>
        ))}
        <button
          className={`chip${avail==='disponible'?' on':''}`}
          onClick={()=>setAvail(a=>a==='disponible'?'todos':'disponible')}
        >
          <span className="chip-status" style={{background: avail==='disponible'?'#fff':'var(--b500)'}}/>
          Disponibles hoy
        </button>
        {hasFilter && (
          <button className="chip chip-clear" onClick={reset}>✕ Quitar filtros</button>
        )}
        <select className="sort-select" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="rating">Mejor valorados</option>
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
        </select>
      </div>

      {/* ── RESULTS HEADER ── */}
      <div className="results-head">
        <div className="results-count"><em>{filtered.length}</em> cuidador{filtered.length!==1?'es':''}</div>
        <div className="results-label">{hasFilter ? 'con los filtros aplicados' : 'disponibles en tu zona'}</div>
      </div>

      {/* ── GRID ── */}
      <div className="grid-outer">
        <div className="carer-grid">
          {filtered.length===0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">Sin resultados</div>
              <div className="empty-sub">Ningún cuidador cumple los filtros actuales. Prueba ajustando los criterios.</div>
              <button className="empty-action" onClick={reset}>Ver todos los cuidadores</button>
            </div>
          ) : filtered.map(c => {
            const isFav = favs.has(c.id);
            return (
              <div className="card" key={c.id}>
                {/* Header */}
                <div className="card-header">
                  <div className="card-header-bg" style={{background:c.bg}}/>
                  <div className="card-header-overlay"/>
                  <div className="status-badge">
                    <div className="status-dot" style={{background: c.avail ? 'var(--b500)' : 'var(--n300)'}}/>
                    <span className="status-text" style={{color: c.avail ? 'var(--b700)' : 'var(--n500)'}}>
                      {c.avail ? 'Disponible' : 'Ocupado/a'}
                    </span>
                  </div>
                  <div className="card-fav" onClick={e=>toggleFav(c.id,e)}>
                    {isFav ? '❤️' : '🤍'}
                  </div>
                  <div className="card-identity">
                    <div className="card-av" style={{background:c.bg}}>{c.av}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="card-name">{c.name}</div>
                  <div className="card-spec">{c.spec}</div>
                  <div className="card-tags">
                    {c.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
                  </div>
                  <div className="card-foot">
                    <div className="card-rating">
                      <span className="stars">{stars(c.stars)}</span>
                      <span className="rating-num">{c.stars}</span>
                      <span className="review-cnt">({c.reviews})</span>
                    </div>
                    <div className="card-price">
                      <span className="price-val">€{c.price}</span>
                      <span className="price-unit">/h</span>
                    </div>
                  </div>
                </div>

                {/* CTA (hover reveal) */}
                <div className="card-cta-row">
                  <button className="btn-primary">Reservar</button>
                  <button className="btn-secondary">Ver perfil</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}