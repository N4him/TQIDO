import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import type { NavLink, DropdownItem, ProfileStep, CarerLayoutUser } from '@/features/layouts/customer_layout';
import CustomerLayout from '@/features/layouts/customer_layout';
import type { AddressProfile, CareProfile, ProfileCompletion, SharedData, UserProfile } from '@/types';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

/* ══ DESIGN TOKENS ══════════════════════════════════════ */
:root {
  --sky:       #4AA2DB;
  --sky-deep:  #3A92CB;
  --sky-light: #7BBFE8;
  --sky-pale:  #B8DDF4;
  --sky-mist:  #E4F4FC;
  --sky-frost: #F0F9FF;

  --ink:       #0D2F44;
  --ink-80:    rgba(13,47,68,.80);
  --ink-55:    rgba(13,47,68,.55);
  --ink-35:    rgba(13,47,68,.35);
  --ink-15:    rgba(13,47,68,.15);
  --ink-08:    rgba(13,47,68,.08);
  --ink-05:    rgba(13,47,68,.05);

  --t100: var(--ink);
  --t80:  var(--ink-80);
  --t55:  var(--ink-55);
  --t35:  var(--ink-35);
  --t15:  var(--ink-15);
  --t08:  var(--ink-08);
  --t05:  var(--ink-05);
  --card: #ffffff;
  --bg-2: var(--sky-frost);

  --green:     #1E8A5E;
  --green-bg:  #D4F2E7;
  --amber:     #B87020;
  --amber-bg:  #FEF0D0;
  --red:       #D44030;
  --red-bg:    #FDEAE8;

  --ff-d: 'DM Serif Display', Georgia, serif;
  --ff-s: 'DM Sans', system-ui, sans-serif;
  --r-sm:8px; --r-md:14px; --r-lg:20px; --r-xl:28px; --r-full:999px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══ PAGE SHELL ══════════════════════════════════════════ */
.profile-bg { padding: 0; }

.profile-shell {
  display: grid;
  grid-template-columns: 290px 1fr;
  gap: 22px;
  align-items: start;
}

/* ══ SIDEBAR ════════════════════════════════════════════ */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: sticky;
  top: 88px;
}

.profile-card {
  border-radius: 26px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,.75);
  box-shadow:
    0 8px 40px rgba(58,146,203,.22),
    0 2px 8px rgba(58,146,203,.12),
    inset 0 1px 0 rgba(255,255,255,.9);
}

.profile-hero {
  padding: 36px 24px 22px;
  text-align: center;
  position: relative;
  background: linear-gradient(
    160deg,
    rgba(74,162,219,.12) 0%,
    rgba(184,221,244,.08) 45%,
    transparent 75%
  );
  border-bottom: 1px solid rgba(74,162,219,.10);
}

.profile-hero::before {
  content: '';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74,162,219,.14) 0%, transparent 70%);
  pointer-events: none;
}

.avatar-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 4px;
}

.avatar-wrap::before {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 2px solid rgba(74,162,219,.22);
  animation: ring-pulse 3s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .4; transform: scale(1.06); }
}

.avatar-ring {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(140deg, rgba(255,255,255,.9) 0%, var(--sky-pale) 100%);
  box-shadow:
    0 6px 24px rgba(74,162,219,.30),
    inset 0 1px 2px rgba(255,255,255,.8);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(140deg, var(--sky-light) 0%, var(--sky) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font: 600 26px var(--ff-d);
  letter-spacing: .5px;
  text-shadow: 0 1px 4px rgba(13,47,68,.2);
}

.profile-name {
  font: 300 21px/1.25 var(--ff-d);
  color: var(--ink);
  letter-spacing: -.2px;
  margin-top: 14px;
}

.profile-since {
  font-size: 11.5px;
  color: var(--ink-35);
  margin-top: 5px;
  font-weight: 400;
  letter-spacing: .02em;
}

.progress-area {
  margin-top: 18px;
  padding: 14px 16px;
  background: linear-gradient(135deg, var(--sky-mist) 0%, var(--sky-frost) 100%);
  border: 1px solid var(--sky-pale);
  border-radius: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 9px;
}

.progress-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--sky-deep);
}

.progress-pct {
  font-size: 22px;
  font-weight: 700;
  color: var(--sky);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-family: var(--ff-d);
}

.progress-track {
  height: 7px;
  background: rgba(74,162,219,.14);
  border-radius: var(--r-full);
  overflow: hidden;
  margin-bottom: 7px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sky) 0%, var(--sky-light) 100%);
  border-radius: var(--r-full);
  transition: width .7s cubic-bezier(.4,0,.2,1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.5) 50%, transparent 100%);
  animation: shimmer 2.2s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.progress-count {
  font-size: 10.5px;
  color: var(--sky-deep);
  opacity: .7;
}

.profile-meta { padding: 4px 0 0; }

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 11px 22px;
  border-bottom: 1px solid rgba(74,162,219,.08);
  transition: background .14s;
}

.meta-row:last-child { border-bottom: none; }
.meta-row:hover { background: rgba(74,162,219,.04); }

.meta-icon {
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
  margin-top: 1px;
  box-shadow: 0 1px 4px rgba(74,162,219,.12);
}

.meta-content { flex: 1; min-width: 0; }

.meta-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--sky);
  opacity: .65;
  margin-bottom: 2px;
}

.meta-value {
  font-size: 12.5px;
  color: var(--ink-80);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-actions {
  padding: 14px 22px 22px;
  display: flex;
  gap: 8px;
}

/* ══ MAIN AREA ═══════════════════════════════════════════ */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tab-nav {
  background: rgba(255,255,255,.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 22px;
  padding: 5px;
  display: flex;
  gap: 2px;
  box-shadow:
    0 6px 28px rgba(58,146,203,.18),
    inset 0 1px 0 rgba(255,255,255,.9);
}

.tab-btn {
  flex: 1;
  padding: 9px 10px;
  border-radius: 17px;
  border: none;
  background: transparent;
  color: var(--ink-55);
  cursor: pointer;
  font: 500 12px var(--ff-s);
  transition: all .18s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.tab-btn:hover {
  background: var(--sky-mist);
  color: var(--sky);
}

.tab-btn.active {
  background: #4AA2DB;
  color: #fff;
}

.tab-icon  { font-size: 16px; line-height: 1; }
.tab-label { font-size: 10.5px; font-weight: 600; letter-spacing: .01em; }

.content-card {
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 26px;
  overflow: hidden;
  box-shadow:
    0 8px 40px rgba(58,146,203,.20),
    0 2px 8px rgba(58,146,203,.10),
    inset 0 1px 0 rgba(255,255,255,.9);
}

.card-header {
  padding: 22px 28px 18px;
  border-bottom: 1px solid rgba(74,162,219,.10);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: linear-gradient(180deg, rgba(228,244,252,.5) 0%, transparent 100%);
}

.card-title {
  font: 300 20px/1.2 var(--ff-d);
  color: var(--ink);
  letter-spacing: -.2px;
}

.card-meta-badge {
  font-size: 11.5px;
  color: var(--sky-deep);
  background: linear-gradient(135deg, var(--sky-mist) 0%, var(--sky-frost) 100%);
  padding: 4px 12px;
  border-radius: var(--r-full);
  border: 1px solid var(--sky-pale);
  font-weight: 600;
  letter-spacing: .01em;
}

.card-body { padding: 24px 28px; }

/* ══ FEEDBACK ════════════════════════════════════════════ */
.feedback-ok {
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--green-bg);
  color: var(--green);
  font-size: 13px;
  border-radius: 14px;
  border: 1px solid rgba(30,138,94,.2);
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 500;
}

.feedback-err {
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--red-bg);
  color: var(--red);
  font-size: 13px;
  border-radius: 14px;
  border: 1px solid rgba(212,64,48,.2);
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 500;
}

/* ══ HINT BOX ════════════════════════════════════════════ */
.hint-box {
  padding: 13px 16px;
  background: linear-gradient(135deg, var(--sky-mist) 0%, var(--sky-frost) 100%);
  border: 1px solid var(--sky-pale);
  border-left: 3px solid var(--sky);
  border-radius: 14px;
  color: var(--sky-deep);
  font-size: 12.5px;
  line-height: 1.6;
  margin-bottom: 22px;
  display: flex;
  gap: 9px;
  align-items: flex-start;
}

.hint-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }

/* ══ SECTION DIVIDERS ════════════════════════════════════ */
.section-group { display: flex; flex-direction: column; gap: 20px; }

.section-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 2px 0;
}

.section-divider-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--sky);
  opacity: .65;
  white-space: nowrap;
}

.section-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(74,162,219,.2) 0%, transparent 100%);
}

/* ══ FORM GRID ═══════════════════════════════════════════ */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.col-full { grid-column: 1 / -1; }
.col-1    { grid-column: span 1; }
.field    { display: flex; flex-direction: column; gap: 5px; }

.field-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: var(--sky);
  opacity: .7;
}

.field-input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1.5px solid rgba(74,162,219,.18);
  background: rgba(255,255,255,.7);
  color: var(--ink-80);
  font: 400 13.5px var(--ff-s);
  outline: none;
  transition: border-color .15s, box-shadow .15s, background .15s;
  -webkit-appearance: none;
}

.field-input:hover:not([readonly]):not(:disabled) {
  border-color: var(--sky-light);
  background: rgba(255,255,255,.9);
}

.field-input:focus {
  border-color: var(--sky);
  box-shadow: 0 0 0 3.5px rgba(74,162,219,.14);
  background: #fff;
}

.field-input[readonly] {
  background: var(--sky-mist);
  color: var(--ink-55);
  border-color: rgba(74,162,219,.10);
  cursor: default;
}

textarea.field-input { resize: vertical; min-height: 96px; line-height: 1.65; }

select.field-input {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%234AA2DB' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 13px center;
  padding-right: 32px;
  cursor: pointer;
}

/* ══ LIST ITEMS ══════════════════════════════════════════ */
.item-list { display: flex; flex-direction: column; gap: 12px; }

.list-item {
  border: 1.5px solid rgba(74,162,219,.14);
  border-radius: 20px;
  background: rgba(255,255,255,.55);
  overflow: hidden;
  transition: border-color .18s, box-shadow .18s, transform .18s;
}

.list-item:hover {
  border-color: var(--sky-pale);
  box-shadow: 0 4px 20px rgba(74,162,219,.12);
  transform: translateY(-1px);
}

.list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(74,162,219,.08);
  background: linear-gradient(180deg, rgba(228,244,252,.35) 0%, transparent 100%);
}

.list-item-title { font-size: 13.5px; font-weight: 600; color: var(--ink-80); margin-bottom: 3px; }
.list-item-sub   { font-size: 11.5px; color: var(--ink-35); }
.list-item-body  { padding: 16px 20px; }

/* ══ BADGES ══════════════════════════════════════════════ */
.badge {
  display: inline-flex;
  padding: 3px 11px;
  border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--sky-mist) 0%, var(--sky-frost) 100%);
  border: 1.5px solid var(--sky-pale);
  color: var(--sky-deep);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  align-items: center;
  gap: 5px;
  letter-spacing: .01em;
}

/* ══ BUTTONS ═════════════════════════════════════════════ */
.btn-primary {
  padding: 11px 20px;
  border-radius: var(--r-md);
  background: var(--sky);
  color: #fff;
  font: 600 13px var(--ff-s);
  border: none;
  cursor: pointer;
  transition: all .18s;
  box-shadow: 0 3px 14px rgba(74,162,219,.32);
  letter-spacing: .01em;
}

.btn-primary:hover {
  background: var(--sky-deep);
  box-shadow: 0 6px 22px rgba(74,162,219,.42);
  transform: translateY(-1px);
}
.btn-primary:active  { transform: translateY(0); box-shadow: 0 2px 8px rgba(74,162,219,.25); }
.btn-primary:disabled { opacity: .55; cursor: not-allowed; transform: none; }

.btn-secondary {
  padding: 11px 20px;
  border-radius: var(--r-md);
  background: rgba(255,255,255,.6);
  color: var(--sky-deep);
  border: 1.5px solid var(--sky-pale);
  font: 500 13px var(--ff-s);
  cursor: pointer;
  transition: all .18s;
  backdrop-filter: blur(8px);
}

.btn-secondary:hover   {
  background: rgba(255,255,255,.85);
  border-color: var(--sky-light);
  box-shadow: 0 2px 10px rgba(74,162,219,.12);
}
.btn-secondary:disabled { opacity: .55; cursor: not-allowed; }

.btn-danger {
  padding: 7px 13px;
  border-radius: 10px;
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(212,64,48,.18);
  font: 600 12px var(--ff-s);
  cursor: pointer;
  transition: all .15s;
}

.btn-danger:hover { background: #fbd5d1; box-shadow: 0 2px 8px rgba(212,64,48,.15); }

.btn-add {
  padding: 11px 16px;
  border-radius: var(--r-md);
  background: transparent;
  color: var(--sky);
  border: 1.5px dashed var(--sky-light);
  font: 600 13px var(--ff-s);
  cursor: pointer;
  transition: all .18s;
  width: 100%;
  text-align: center;
}

.btn-add:hover {
  background: var(--sky-mist);
  border-color: var(--sky);
  border-style: solid;
}

.btn-ghost {
  padding: 7px 13px;
  border-radius: 10px;
  background: transparent;
  color: var(--sky);
  border: 1px solid var(--sky-pale);
  font: 500 12px var(--ff-s);
  cursor: pointer;
  transition: all .15s;
}

.btn-ghost:hover { background: var(--sky-mist); border-color: var(--sky-light); }

.btn-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

/* ══ EMPTY STATE ═════════════════════════════════════════ */
.empty-state {
  padding: 36px 20px;
  text-align: center;
  border: 1.5px dashed var(--sky-pale);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(228,244,252,.4) 0%, rgba(240,249,255,.3) 100%);
  color: var(--ink-35);
}

.empty-state-icon { font-size: 30px; margin-bottom: 10px; filter: grayscale(.3); }
.empty-state-text { font-size: 13px; line-height: 1.55; }

/* ══ PAYMENT ROWS ════════════════════════════════════════ */
.payment-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border: 1.5px solid rgba(74,162,219,.14);
  border-radius: 18px;
  background: rgba(255,255,255,.55);
  transition: all .18s;
}

.payment-row:hover {
  border-color: var(--sky-pale);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(74,162,219,.10);
}

.payment-icon {
  width: 48px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--sky) 0%, var(--sky-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(74,162,219,.25);
}

.payment-info { flex: 1; }
.payment-name   { font-size: 13px; font-weight: 600; color: var(--ink-80); }
.payment-detail { font-size: 11.5px; color: var(--ink-35); margin-top: 2px; }

/* ══ RESPONSIVE ══════════════════════════════════════════ */
@media (max-width: 900px) {
  .profile-shell { grid-template-columns: 1fr; }
  .sidebar { position: static; }
  .form-grid { grid-template-columns: 1fr; }
  .tab-btn .tab-label { display: none; }
  .tab-btn { padding: 10px 8px; }
}
`;

/* ══ CONSTANTS ════════════════════════════════════════════ */
const TABS = ['personal', 'cuidados', 'direcciones', 'pagos', 'notificaciones'] as const;
type Tab = typeof TABS[number];

const TAB_CONFIG: Record<Tab, { label: string; icon: string }> = {
  personal:       { label: 'Perfil',          icon: '👤' },
  cuidados:       { label: 'Perfiles de cuidado', icon: '🧡' },
  direcciones:    { label: 'Direcciones',         icon: '📍' },
  pagos:          { label: 'Métodos de pago',     icon: '💳' },
  notificaciones: { label: 'Notificaciones',      icon: '🔔' },
};

const CARE_ROLE_OPTIONS = ['Adulto mayor', 'Niño', 'Mascota'] as const;

const PROFILE_STEPS_LABELS = [
  'Número verificado',
  'Dirección completa',
  'Fecha de nacimiento',
  'Ciudad',
  'Perfil básico',
];

/* ══ TYPES ═══════════════════════════════════════════════ */
type EditableCareProfile = {
  id?: number;
  nombre: string; rol: string; especificacion: string; edad: string;
  movilidad: string; medicacion: string; alergias: string;
  diagnostico: string; contacto_emergencia: string;
};

type EditableAddress = {
  id?: number;
  label: string; address_line_1: string; address_line_2: string;
  neighborhood: string; reference: string; type: string; is_default: boolean;
};

/* ══ HELPERS ═════════════════════════════════════════════ */
const normalizeCareProfiles = (items?: CareProfile[] | null): EditableCareProfile[] =>
  (items ?? []).map((item) => ({
    id: item.id, nombre: item.nombre ?? '', rol: item.rol ?? '',
    especificacion: item.especificacion ?? '', edad: item.edad ?? '',
    movilidad: item.movilidad ?? '', medicacion: item.medicacion ?? '',
    alergias: item.alergias ?? '', diagnostico: item.diagnostico ?? '',
    contacto_emergencia: item.contacto_emergencia ?? '',
  }));

const normalizeAddresses = (items?: AddressProfile[] | null): EditableAddress[] =>
  (items ?? []).map((item) => ({
    id: item.id, label: item.label ?? '', address_line_1: item.address_line_1 ?? '',
    address_line_2: item.address_line_2 ?? '', neighborhood: item.neighborhood ?? '',
    reference: item.reference ?? '', type: item.type ?? 'home',
    is_default: Boolean(item.is_default),
  }));

const emptyCareProfile = (): EditableCareProfile => ({
  nombre: '', rol: '', especificacion: '', edad: '', movilidad: '',
  medicacion: '', alergias: '', diagnostico: '', contacto_emergencia: '',
});

const emptyAddress = (): EditableAddress => ({
  label: '', address_line_1: '', address_line_2: '', neighborhood: '',
  reference: '', type: 'home', is_default: false,
});

const initialsOf = (v: string) =>
  v.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || 'TU';

const memberSince = (v?: string | null) =>
  v ? `Miembro desde ${new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(v))}` : 'Miembro reciente';

const birthDate = (v?: string | null) =>
  v ? new Intl.DateTimeFormat('es-CO').format(new Date(v)) : 'Sin fecha';

const primaryAddress = (items: EditableAddress[]) =>
  items.find((i) => i.is_default) ?? items[0] ?? null;

const addressText = (item?: EditableAddress | null) =>
  item ? [item.address_line_1, item.address_line_2, item.neighborhood].filter(Boolean).join(', ') || 'Sin dirección' : 'Sin dirección';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

/* ══ COMPONENT ═══════════════════════════════════════════ */
export default function TQidoClientProfile() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const initialProfile = (user?.profile ?? null) as UserProfile | null;

  const [savedProfile,   setSavedProfile]   = useState<UserProfile | null>(initialProfile);
  const [completion,     setCompletion]      = useState<ProfileCompletion | null>((user?.profile_completion ?? null) as ProfileCompletion | null);
  const [profileForm,    setProfileForm]     = useState({ user_id: Number(user?.id ?? 0), fecha_nacimiento: initialProfile?.fecha_nacimiento ?? '', ciudad: initialProfile?.ciudad ?? '', direccion: initialProfile?.direccion ?? '' });
  const [careProfiles,   setCareProfiles]    = useState<EditableCareProfile[]>(normalizeCareProfiles(initialProfile?.cuidados));
  const [addresses,      setAddresses]       = useState<EditableAddress[]>(normalizeAddresses(initialProfile?.direcciones));
  const [activeTab,      setActiveTab]       = useState<Tab>('personal');
  const [activeNav,      setActiveNav]       = useState('Perfil');
  const [editing,        setEditing]         = useState(false);
  const [saving,         setSaving]          = useState(false);
  const [saveOk,         setSaveOk]          = useState('');
  const [saveError,      setSaveError]       = useState('');

  const profileSteps: ProfileStep[] = [
    { label: 'Número verificado',  done: Boolean(user?.phone) },
    { label: 'Dirección completa', done: Boolean(primaryAddress(addresses) || profileForm.direccion || savedProfile?.direccion) },
    { label: 'Fecha de nacimiento',done: Boolean(profileForm.fecha_nacimiento || savedProfile?.fecha_nacimiento) },
    { label: 'Ciudad',             done: Boolean(profileForm.ciudad || savedProfile?.ciudad) },
    { label: 'Perfil básico',      done: Boolean(user?.name && user?.email) },
  ];

  const completedSteps = profileSteps.filter((s) => s.done).length;
  const completionPct  = completion?.percentage ?? Math.round((completedSteps / profileSteps.length) * 100);

  const layoutUser: CarerLayoutUser = {
    name:     user?.name ?? 'Tu perfil',
    email:    user?.email ?? 'Sin correo',
    initials: initialsOf(user?.name ?? 'Tu perfil'),
    city:     profileForm.ciudad || savedProfile?.ciudad || 'Sin ciudad',
  };

  const navLinks: NavLink[] = ['Explorar', 'Mis reservas', 'Favoritos'].map((label) => ({
    label, active: activeNav === label, onClick: () => setActiveNav(label),
  }));

  const dropdownItems: DropdownItem[] = [
    { icon: '👤', label: 'Mi perfil' },
    { icon: '📅', label: 'Mis reservas', badge: 0 },
    { icon: '❤️', label: 'Favoritos', badge: 0 },
    { icon: '⚙️', label: 'Ajustes' },
    { icon: '↩',  label: 'Cerrar sesión', danger: true },
  ];

  const resetForm = () => {
    setProfileForm({ user_id: Number(user?.id ?? 0), fecha_nacimiento: savedProfile?.fecha_nacimiento ?? '', ciudad: savedProfile?.ciudad ?? '', direccion: savedProfile?.direccion ?? '' });
    setCareProfiles(normalizeCareProfiles(savedProfile?.cuidados));
    setAddresses(normalizeAddresses(savedProfile?.direcciones));
  };

  const saveProfile = async () => {
    setSaving(true); setSaveOk(''); setSaveError('');
    try {
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...profileForm, care_profiles: careProfiles, addresses }),
      });
      const data = await response.json();
      if (!response.ok) {
        const firstError = data?.errors ? Object.values(data.errors).flat()[0] : data?.message;
        setSaveError(String(firstError ?? 'No se pudo guardar la información.'));
        return;
      }
      const updated = (data.profile ?? null) as UserProfile | null;
      setSavedProfile(updated);
      setCompletion((data.profile_completion ?? null) as ProfileCompletion | null);
      setProfileForm({ user_id: Number(user?.id ?? 0), fecha_nacimiento: updated?.fecha_nacimiento ?? profileForm.fecha_nacimiento, ciudad: updated?.ciudad ?? profileForm.ciudad, direccion: updated?.direccion ?? profileForm.direccion });
      setCareProfiles(normalizeCareProfiles(updated?.cuidados));
      setAddresses(normalizeAddresses(updated?.direcciones));
      setEditing(false);
      setSaveOk(data.message ?? 'Perfil actualizado correctamente.');
    } catch (error) {
      console.error(error);
      setSaveError('Hubo un problema de conexión. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const mainAddr = primaryAddress(addresses);

  return (
    <>
      <style>{css}</style>
      <CustomerLayout
        user={layoutUser}
        navLinks={navLinks}
        notifCount={0}
        profileSteps={profileSteps}
        dropdownItems={dropdownItems}
      >
        <div className="profile-bg">
          <div className="profile-shell">

            {/* ══ SIDEBAR ══════════════════════════════════ */}
            <aside className="sidebar">
              <div className="profile-card">

                <div className="profile-hero">
                  <div className="avatar-wrap">
                    <div className="avatar-ring">
                      <div className="avatar-inner">{initialsOf(user?.name ?? 'Tu perfil')}</div>
                    </div>
                  </div>
                  <div className="profile-name">{user?.name ?? 'Tu perfil'}</div>
                  <div className="profile-since">{memberSince(user?.created_at)}</div>
                  <div className="progress-area">
                    <div className="progress-header">
                      <span className="progress-label">Perfil completado</span>
                      <span className="progress-pct">{completionPct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${completionPct}%` }} />
                    </div>
                    <div className="progress-count">{completedSteps} de {profileSteps.length} pasos base completos</div>
                  </div>
                </div>

                <div className="profile-meta">
                  {[
                    { icon: '✉️', label: 'Email',               value: user?.email ?? 'Sin correo' },
                    { icon: '📞', label: 'Teléfono',            value: user?.phone ?? 'Sin teléfono' },
                    { icon: '🎂', label: 'Nacimiento',          value: birthDate(profileForm.fecha_nacimiento || savedProfile?.fecha_nacimiento) },
                    { icon: '🏠', label: 'Dirección principal', value: addressText(mainAddr) || profileForm.direccion || savedProfile?.direccion || 'Sin dirección' },
                  ].map((item) => (
                    <div className="meta-row" key={item.label}>
                      <div className="meta-icon">{item.icon}</div>
                      <div className="meta-content">
                        <div className="meta-label">{item.label}</div>
                        <div className="meta-value" title={item.value}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sidebar-actions">
                  {editing ? (
                    <>
                      <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { resetForm(); setSaveOk(''); setSaveError(''); setEditing(false); }} disabled={saving}>
                        Cancelar
                      </button>
                      <button className="btn-primary" style={{ flex: 1 }} onClick={saveProfile} disabled={saving}>
                        {saving ? 'Guardando…' : 'Guardar'}
                      </button>
                    </>
                  ) : (
                    <button className="btn-primary" style={{ width: '100%' }} onClick={() => setEditing(true)}>
                      ✏️ Editar perfil
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* ══ MAIN ═════════════════════════════════════ */}
            <div className="main-content">

              {/* Tabs */}
              <nav className="tab-nav">
                {TABS.map((tab) => (
                  <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                    <span className="tab-icon">{TAB_CONFIG[tab].icon}</span>
                    <span className="tab-label">{TAB_CONFIG[tab].label}</span>
                  </button>
                ))}
              </nav>

              {/* Content */}
              <div className="content-card">
                <div className="card-header">
                  <span className="card-title">{TAB_CONFIG[activeTab].label}</span>
                  {activeTab === 'cuidados'    && <span className="card-meta-badge">{careProfiles.length} perfiles</span>}
                  {activeTab === 'direcciones' && <span className="card-meta-badge">{addresses.length} guardadas</span>}
                </div>

                <div className="card-body">
                  {saveError && <div className="feedback-err">⚠️ {saveError}</div>}
                  {saveOk    && <div className="feedback-ok">✅ {saveOk}</div>}

                  {/* ─ PERSONAL ─ */}
                  {activeTab === 'personal' && (
                    <div className="section-group">
                      <div className="hint-box">
                        <span className="hint-icon">ℹ️</span>
                        <span>Nombre y email se gestionan desde la configuración de cuenta. Los demás campos se guardan con el botón del panel izquierdo.</span>
                      </div>
                      <div>
                        <div className="section-divider"><span className="section-divider-label">Datos de cuenta</span><div className="section-divider-line" /></div>
                        <div className="form-grid" style={{ marginTop: 14 }}>
                          <Field label="Nombre"><input className="field-input" value={(user?.name ?? '').split(' ')[0] ?? ''} readOnly /></Field>
                          <Field label="Apellidos"><input className="field-input" value={(user?.name ?? '').split(' ').slice(1).join(' ')} readOnly /></Field>
                          <Field label="Teléfono"><input className="field-input" value={user?.phone ?? ''} readOnly={!editing} /></Field>
                          <Field label="Email"><input className="field-input" value={user?.email ?? ''} readOnly /></Field>
                        </div>
                      </div>
                      <div>
                        <div className="section-divider"><span className="section-divider-label">Datos del perfil</span><div className="section-divider-line" /></div>
                        <div className="form-grid" style={{ marginTop: 14 }}>
                          <Field label="Fecha de nacimiento">
                            <input type="date" className="field-input" value={profileForm.fecha_nacimiento} onChange={(e) => setProfileForm((c) => ({ ...c, fecha_nacimiento: e.target.value }))} readOnly={!editing} />
                          </Field>
                          <Field label="Ciudad">
                            <input className="field-input" value={profileForm.ciudad} onChange={(e) => setProfileForm((c) => ({ ...c, ciudad: e.target.value }))} readOnly={!editing} />
                          </Field>
                          <div className="col-full">
                            <Field label="Dirección principal del perfil">
                              <input className="field-input" value={profileForm.direccion} onChange={(e) => setProfileForm((c) => ({ ...c, direccion: e.target.value }))} readOnly={!editing} />
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─ CUIDADOS ─ */}
                  {activeTab === 'cuidados' && (
                    <div className="section-group">
                      <div className="hint-box">
                        <span className="hint-icon">🧡</span>
                        <span>Registra a cada persona o mascota que recibirá el cuidado. Cada perfil guarda información médica y de contacto de emergencia.</span>
                      </div>
                      <div className="item-list">
                        {careProfiles.length === 0 && (
                          <div className="empty-state">
                            <div className="empty-state-icon">🧡</div>
                            <div className="empty-state-text">Todavía no tienes perfiles de cuidado registrados.<br />Usa el botón de abajo para agregar el primero.</div>
                          </div>
                        )}
                        {careProfiles.map((care, index) => (
                          <div className="list-item" key={care.id ?? `care-${index}`}>
                            <div className="list-item-header">
                              <div>
                                <div className="list-item-title">{care.nombre || `Perfil ${index + 1}`}</div>
                                <div className="list-item-sub">{care.rol || 'Sin rol definido'}</div>
                              </div>
                              <div className="btn-row">
                                {care.rol && <span className="badge">{care.rol}</span>}
                                {editing && <button className="btn-danger" onClick={() => setCareProfiles((c) => c.filter((_, i) => i !== index))}>Eliminar</button>}
                              </div>
                            </div>
                            <div className="list-item-body">
                              <div className="form-grid">
                                {([
                                  ['nombre',       'Nombre'],
                                  ['especificacion','Especificación'],
                                  ['edad',         'Edad'],
                                  ['movilidad',    'Movilidad'],
                                  ['medicacion',   'Medicación'],
                                  ['alergias',     'Alergias'],
                                  ['diagnostico',  'Diagnóstico'],
                                ] as [keyof EditableCareProfile, string][]).map(([key, lbl]) => (
                                  <Field key={key} label={lbl}>
                                    <input className="field-input" value={care[key] as string} onChange={(e) => setCareProfiles((c) => c.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item))} readOnly={!editing} />
                                  </Field>
                                ))}
                                <Field label="Rol">
                                  {editing ? (
                                    <select className="field-input" value={care.rol} onChange={(e) => setCareProfiles((c) => c.map((item, i) => i === index ? { ...item, rol: e.target.value } : item))}>
                                      <option value="">Selecciona una opción</option>
                                      {CARE_ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                  ) : (
                                    <input className="field-input" value={care.rol} readOnly />
                                  )}
                                </Field>
                                <div className="col-full">
                                  <Field label="Contacto de emergencia">
                                    <input className="field-input" value={care.contacto_emergencia} onChange={(e) => setCareProfiles((c) => c.map((item, i) => i === index ? { ...item, contacto_emergencia: e.target.value } : item))} readOnly={!editing} />
                                  </Field>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {editing && <button className="btn-add" onClick={() => setCareProfiles((c) => [...c, emptyCareProfile()])}>+ Añadir perfil de cuidado</button>}
                      </div>
                    </div>
                  )}

                  {/* ─ DIRECCIONES ─ */}
                  {activeTab === 'direcciones' && (
                    <div className="section-group">
                      <div className="hint-box">
                        <span className="hint-icon">ℹ️</span>
                        <span>Las direcciones guardadas se usan para planificar servicios. Puedes marcar una como principal y dejar referencias de acceso.</span>
                      </div>
                      <div className="item-list">
                        {addresses.length === 0 && (
                          <div className="empty-state"><div className="empty-state-icon">📍</div><div className="empty-state-text">Todavía no tienes direcciones registradas.</div></div>
                        )}
                        {addresses.map((address, index) => (
                          <div className="list-item" key={address.id ?? `address-${index}`}>
                            <div className="list-item-header">
                              <div>
                                <div className="list-item-title">{address.label || `Dirección ${index + 1}`}</div>
                                <div className="list-item-sub">{addressText(address)}</div>
                              </div>
                              <div className="btn-row">
                                {address.is_default && <span className="badge">⭐ Principal</span>}
                                {editing && !address.is_default && <button className="btn-ghost" onClick={() => setAddresses((c) => c.map((item, i) => ({ ...item, is_default: i === index })))}>Marcar principal</button>}
                                {editing && <button className="btn-danger" onClick={() => setAddresses((c) => c.filter((_, i) => i !== index))}>Eliminar</button>}
                              </div>
                            </div>
                            <div className="list-item-body">
                              <div className="form-grid">
                                <Field label="Etiqueta"><input className="field-input" value={address.label} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, label: e.target.value } : item))} readOnly={!editing} /></Field>
                                <Field label="Tipo">
                                  {editing ? (
                                    <select className="field-input" value={address.type} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, type: e.target.value } : item))}>
                                      <option value="home">Casa</option>
                                      <option value="office">Oficina</option>
                                      <option value="shipping">Envío</option>
                                      <option value="billing">Facturación</option>
                                    </select>
                                  ) : <input className="field-input" value={address.type} readOnly />}
                                </Field>
                                <div className="col-full"><Field label="Dirección"><input className="field-input" value={address.address_line_1} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, address_line_1: e.target.value } : item))} readOnly={!editing} /></Field></div>
                                <div className="col-full"><Field label="Complemento (apto, piso, etc.)"><input className="field-input" value={address.address_line_2} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, address_line_2: e.target.value } : item))} readOnly={!editing} /></Field></div>
                                <Field label="Barrio / Sector"><input className="field-input" value={address.neighborhood} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, neighborhood: e.target.value } : item))} readOnly={!editing} /></Field>
                                <Field label="Referencia de acceso"><input className="field-input" value={address.reference} onChange={(e) => setAddresses((c) => c.map((item, i) => i === index ? { ...item, reference: e.target.value } : item))} readOnly={!editing} /></Field>
                              </div>
                            </div>
                          </div>
                        ))}
                        {editing && <button className="btn-add" onClick={() => setAddresses((c) => [...c, { ...emptyAddress(), is_default: c.length === 0 }])}>+ Añadir dirección</button>}
                      </div>
                    </div>
                  )}

                  {/* ─ PAGOS ─ */}
                  {activeTab === 'pagos' && (
                    <div className="section-group">
                      <div className="hint-box">
                        <span className="hint-icon">🔒</span>
                        <span>La gestión de métodos de pago está disponible en vista previa. La funcionalidad completa se habilitará próximamente.</span>
                      </div>
                      <div className="item-list">
                        {[{ name: 'Visa', last: '4821', default: true }, { name: 'Mastercard', last: '3309', default: false }].map((card) => (
                          <div className="payment-row" key={card.last}>
                            <div className="payment-icon">💳</div>
                            <div className="payment-info">
                              <div className="payment-name">{card.name} •••• {card.last}</div>
                              <div className="payment-detail">{card.default ? 'Método predeterminado' : 'Método guardado'}</div>
                            </div>
                            {card.default && <span className="badge">✓ Principal</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ─ NOTIFICACIONES ─ */}
                  {activeTab === 'notificaciones' && (
                    <div className="section-group">
                      <div className="hint-box">
                        <span className="hint-icon">🔔</span>
                        <span>La configuración de notificaciones estará disponible próximamente.</span>
                      </div>
                      <div className="empty-state">
                        <div className="empty-state-icon">🔔</div>
                        <div className="empty-state-text">Esta sección sigue en modo vista previa.<br />Pronto podrás configurar tus preferencias de notificación.</div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </>
  );
}