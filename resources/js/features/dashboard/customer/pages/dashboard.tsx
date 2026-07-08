import { FormEvent, useMemo, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import type { NavLink, DropdownItem, ProfileStep, CarerLayoutUser } from '@/features/layouts/customer_layout';
import CarerLayout from '@/features/layouts/customer_layout';
import CarerCard, { carerCardCss } from '@/components/common/care_card';
import type { Carer, CarerAvailabilitySlot, CarerService } from '@/components/common/care_card';
import type { SharedData } from '@/types';

const pageCss = `
.hero-section {
  padding: var(--s16) var(--s8) var(--s10);
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--s2);
  background: var(--on-dom-12);
  border: 1px solid rgba(255,255,255,0.30);
  border-radius: var(--rF);
  padding: 5px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--on-dom);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: var(--s6);
  backdrop-filter: blur(8px);
}
.hero-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff176;
  box-shadow: 0 0 0 3px rgba(255,241,118,0.25);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(255,241,118,0.25); }
  50% { box-shadow: 0 0 0 7px rgba(255,241,118,0); }
}
.hero-title {
  font-family: var(--ff-d);
  font-size: clamp(36px,5.5vw,56px);
  font-weight: 500;
  color: var(--on-dom);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: var(--s5);
  text-shadow: 0 2px 20px rgba(20,50,100,0.25);
}
.hero-title em {
  font-style: italic;
  color: var(--on-dom);
  position: relative;
}
.hero-title em::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(255,241,118,0.9), rgba(255,241,118,0.3));
  border-radius: 2px;
}
.hero-sub {
  font-size: 15.5px;
  color: var(--on-dom-80);
  font-weight: 400;
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto var(--s10);
}
.search-frame {
  background: var(--surf);
  border-radius: var(--r16);
  box-shadow: var(--sh-lg);
  padding: var(--s2);
  display: flex;
  align-items: stretch;
  max-width: 740px;
  margin: 0 auto;
  border: 1px solid rgba(255,255,255,0.9);
  gap: var(--s2);
}
.search-frame:focus-within { box-shadow: var(--sh-lg), 0 0 0 4px rgba(255,255,255,0.30); }
.sf {
  flex: 1;
  padding: 10px var(--s4);
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-radius: var(--r12);
  cursor: pointer;
  transition: background 0.12s ease;
  min-width: 0;
}
.sf:hover { background: var(--surf-2); }
.sf-label {
  font-size: 9.5px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sf-val {
  font-size: 13px;
  color: var(--muted);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sf-input {
  background: none;
  border: none;
  outline: none;
  font-family: var(--ff-ui);
  font-size: 13px;
  color: var(--ink);
  width: 100%;
}
.sf-input::placeholder { color: var(--faint); }
.sf-sep {
  width: 1px;
  background: var(--surf-3);
  margin: var(--s2) 0;
  flex-shrink: 0;
  align-self: stretch;
}
.search-cta {
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff;
  border: none;
  border-radius: var(--r12);
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--ff-ui);
  display: flex;
  align-items: center;
  gap: var(--s2);
  transition: all 0.18s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: var(--sh-glow);
}
.search-cta:hover {
  background: linear-gradient(135deg, var(--dom-xdk), var(--dom-deep));
  transform: translateY(-1px);
  box-shadow: 0 6px 28px rgba(26,74,144,0.60);
}
.trust-strip {
  background: rgba(58,120,204,0.35);
  border-top: 1px solid var(--on-dom-20);
  border-bottom: 1px solid var(--on-dom-20);
  padding: 14px var(--s8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s10);
  flex-wrap: wrap;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: var(--s2);
  font-size: 12px;
  font-weight: 500;
  color: var(--on-dom-80);
}
.trust-icon-wrap {
  width: 22px;
  height: 22px;
  border-radius: var(--r4);
  background: var(--on-dom-20);
  border: 1px solid rgba(255,255,255,0.30);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--s2);
  padding: var(--s6) var(--s8) 0;
  max-width: 1920px;
  margin: 0 auto;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.filter-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--on-dom-60);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-right: var(--s1);
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--s1);
  padding: 5px 13px;
  border-radius: var(--r8);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--on-dom);
  background: var(--on-dom-12);
  border: 1px solid rgba(255,255,255,0.30);
  cursor: pointer;
  transition: all 0.13s ease;
  font-family: var(--ff-ui);
  white-space: nowrap;
  backdrop-filter: blur(8px);
}
.chip:hover { background: var(--on-dom-20); border-color: var(--on-dom-40); }
.chip.on {
  background: var(--surf);
  color: var(--dom-dk);
  border-color: rgba(255,255,255,0.95);
  box-shadow: var(--sh-sm);
}
.chip-count {
  font-size: 9.5px;
  font-weight: 700;
  background: var(--on-dom-20);
  border-radius: var(--rF);
  padding: 1px 5px;
  color: var(--on-dom);
}
.chip.on .chip-count { background: var(--surf-3); color: var(--dom-dk); }
.chip-status {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.chip-clear {
  color: #fff176;
  border-color: rgba(255,241,118,0.35);
  background: rgba(255,241,118,0.12);
}
.sort-select {
  margin-left: auto;
  padding: 5px 30px 5px 13px;
  border-radius: var(--r8);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--on-dom);
  background: var(--on-dom-12);
  border: 1px solid rgba(255,255,255,0.30);
  cursor: pointer;
  font-family: var(--ff-ui);
  outline: none;
  appearance: none;
}
.results-head {
  display: flex;
  align-items: baseline;
  gap: var(--s2);
  padding: var(--s6) var(--s8) var(--s4);
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.results-count {
  font-family: var(--ff-d);
  font-size: 24px;
  font-weight: 500;
  color: var(--on-dom);
  letter-spacing: -0.02em;
}
.results-count em { font-style: italic; color: #fff176; }
.results-label { font-size: 13px; color: var(--on-dom-60); }
.grid-outer {
  padding: 0 var(--s8) var(--s16);
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.carer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: var(--s4);
}
.empty-state {
  grid-column: 1/-1;
  padding: var(--s16) var(--s8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s3);
  text-align: center;
}
.empty-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--r16);
  background: var(--on-dom-12);
  border: 1px solid var(--on-dom-20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: var(--s2);
  backdrop-filter: blur(8px);
}
.empty-title {
  font-family: var(--ff-d);
  font-size: 20px;
  font-style: italic;
  color: var(--on-dom);
}
.empty-sub {
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  max-width: 280px;
  line-height: 1.6;
}
.empty-action {
  margin-top: var(--s2);
  padding: 9px 22px;
  background: var(--surf);
  border: none;
  border-radius: var(--rF);
  color: var(--dom-dk);
  font-family: var(--ff-ui);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.13s ease;
  box-shadow: var(--sh-sm);
}
.empty-action:hover { background: var(--surf-2); transform: translateY(-1px); box-shadow: var(--sh-md); }
.booking-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 18, 34, 0.56);
  backdrop-filter: blur(8px);
  z-index: 120;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
}
.booking-modal {
  width: min(100%, 720px);
  max-height: calc(100vh - 48px);
  background: linear-gradient(180deg, #ffffff 0%, #f6faff 100%);
  color: var(--ink);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(10, 35, 70, 0.28);
  animation: fadeUp 0.25s cubic-bezier(0.22,0.68,0,1) both;
  display: flex;
  flex-direction: column;
  margin: auto 0;
}
.booking-head {
  padding: 24px 28px 18px;
  background: linear-gradient(135deg, #2d78c4 0%, #4aa2db 100%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.booking-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.78;
  margin-bottom: 8px;
}
.booking-title {
  font-family: var(--ff-d);
  font-size: 28px;
  line-height: 1.1;
  margin-bottom: 8px;
}
.booking-sub {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255,255,255,0.84);
  max-width: 440px;
}
.booking-close {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.14);
  color: #fff;
  border-radius: 999px;
  cursor: pointer;
  font-size: 18px;
}
.booking-body {
  padding: 24px 28px 28px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.booking-steps {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
}
.booking-step-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid #d6e4f4;
  background: #fff;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}
.booking-step-chip.on {
  background: #edf5ff;
  border-color: #b9d6f4;
  color: var(--dom-deep);
}
.booking-step-index {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e8f1fb;
  color: var(--dom-deep);
  font-size: 11px;
}
.booking-step-chip.on .booking-step-index {
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff;
}
.booking-step-line {
  flex: 1;
  height: 1px;
  background: #dbe7f3;
}
.booking-preview {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.booking-preview-hero {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 18px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  border: 1px solid #dbe8f7;
}
.booking-preview-avatar {
  width: 92px;
  height: 92px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d78c4 0%, #75b8ea 100%);
  color: #fff;
  font-family: var(--ff-d);
  font-size: 30px;
  box-shadow: 0 12px 30px rgba(35, 96, 165, 0.22);
}
.booking-preview-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5a86b1;
  margin-bottom: 8px;
}
.booking-preview-name {
  font-family: var(--ff-d);
  font-size: 34px;
  line-height: 1.05;
  color: var(--ink);
}
.booking-preview-spec {
  margin-top: 6px;
  font-size: 14px;
  color: var(--dom-deep);
}
.booking-preview-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}
.booking-preview-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  border-radius: 999px;
  background: #eef6ff;
  border: 1px solid #d6e6f6;
  font-size: 12px;
  color: var(--muted);
}
.booking-preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 16px;
}
.booking-preview-card {
  border: 1px solid #dce9f8;
  background: #fff;
  border-radius: 20px;
  padding: 18px;
}
.booking-preview-card h3 {
  margin: 0 0 12px;
  font-family: var(--ff-d);
  font-size: 24px;
  color: var(--ink);
}
.booking-preview-copy {
  font-size: 13px;
  line-height: 1.75;
  color: var(--muted);
}
.booking-service-list,
.booking-availability-list {
  display: grid;
  gap: 10px;
}
.booking-service-item,
.booking-availability-item {
  border: 1px solid #deebf8;
  border-radius: 16px;
  padding: 13px 14px;
  background: #f8fbff;
}
.booking-service-top,
.booking-availability-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
.booking-service-name,
.booking-availability-day {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}
.booking-service-rate,
.booking-availability-hours {
  font-size: 13px;
  color: var(--dom-deep);
  font-weight: 700;
  white-space: nowrap;
}
.booking-service-desc,
.booking-availability-note {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--muted);
}
.booking-preview-empty {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
}
.booking-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.booking-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.booking-field.full { grid-column: 1 / -1; }
.booking-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.booking-input,
.booking-select,
.booking-textarea {
  width: 100%;
  border: 1px solid #d9e6f5;
  background: #fff;
  border-radius: 14px;
  padding: 12px 14px;
  font-family: var(--ff-ui);
  font-size: 13px;
  color: var(--ink);
  outline: none;
}
.booking-textarea {
  resize: vertical;
  min-height: 92px;
}
.booking-error {
  font-size: 12px;
  color: #b42318;
}
.booking-summary {
  margin-top: 18px;
  border: 1px solid #dce9f8;
  border-radius: 18px;
  background: #f8fbff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.booking-summary-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}
.booking-summary-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
}
.booking-summary-price { text-align: right; }
.booking-summary-total {
  font-family: var(--ff-d);
  font-size: 28px;
  color: var(--dom-deep);
  line-height: 1;
}
.booking-summary-unit {
  font-size: 11px;
  color: var(--muted);
}
.booking-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}
.booking-btn-secondary,
.booking-btn-primary {
  border-radius: 999px;
  padding: 11px 18px;
  font-family: var(--ff-ui);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.booking-btn-secondary {
  background: #fff;
  color: var(--muted);
  border: 1px solid #d6e4f4;
}
.booking-btn-primary {
  border: none;
  background: linear-gradient(135deg, var(--dom-deep), var(--dom-dk));
  color: #fff;
  box-shadow: var(--sh-glow);
}
.booking-btn-primary:disabled,
.booking-btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
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
@media(max-width:640px) {
  .hero-section { padding: var(--s10) var(--s4) var(--s8); }
  .search-frame { flex-direction: column; border-radius: var(--r12); gap: var(--s1); }
  .sf-sep { display: none; }
  .filter-bar, .grid-outer, .results-head { padding-left: var(--s4); padding-right: var(--s4); }
  .trust-strip { gap: var(--s5); padding: 12px var(--s4); }
  .booking-overlay { padding: 12px; }
  .booking-head, .booking-body { padding-left: 18px; padding-right: 18px; }
  .booking-grid { grid-template-columns: 1fr; }
  .booking-preview-hero { grid-template-columns: 1fr; }
  .booking-preview-grid { grid-template-columns: 1fr; }
  .booking-preview-avatar { width: 78px; height: 78px; font-size: 26px; }
  .booking-preview-name { font-size: 28px; }
  .booking-steps { flex-wrap: wrap; }
  .booking-step-line { display: none; }
  .booking-summary { flex-direction: column; align-items: flex-start; }
  .booking-summary-price { text-align: left; }
  .booking-actions { flex-direction: column-reverse; }
  .booking-btn-secondary, .booking-btn-primary { width: 100%; }
}
`;

const CATS = [
  { key: 'todos', label: 'Todos', emoji: '✦' },
  { key: 'adultos', label: 'Mayores', emoji: '👴' },
  { key: 'ninos', label: 'Niños', emoji: '👶' },
  { key: 'mascotas', label: 'Mascotas', emoji: '🐾' },
];

const PROFILE_STEPS: ProfileStep[] = [
  { label: 'Foto de perfil', done: true },
  { label: 'Número verificado', done: true },
  { label: 'Dirección completa', done: true },
  { label: 'Método de pago', done: false },
  { label: 'Preferencias guardadas', done: false },
];

const SERVICE_CATEGORY_BY_TYPE: Record<string, string> = {
  adultos_mayores: 'adultos',
  ninos: 'ninos',
  mascotas: 'mascotas',
};

const SERVICE_LABELS: Record<string, string> = {
  adultos_mayores: 'Adultos mayores',
  ninos: 'Niños',
  mascotas: 'Mascotas',
};

type DashboardCustomerProps = SharedData & {
  carers: Carer[];
};

type BookingFormData = {
  carer_profile_id: number;
  servicio_perfil_id: number;
  fecha_servicio: string;
  hora_inicio: string;
  duracion_minutos: number;
  direccion_servicio: string;
  notas: string;
};

type BookingStep = 1 | 2;

const initialsOf = (value: string) =>
  value.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'TU';

const displayRate = (service: CarerService | null) => {
  if (!service) {
    return 0;
  }

  return service.oferta_activa && service.precio_oferta != null
    ? service.precio_oferta
    : service.precio_hora ?? 0;
};

const openNativeDatePicker = (input: HTMLInputElement) => {
  if (typeof input.showPicker === 'function') {
    input.showPicker();
  }
};

export default function TQidoHome() {
  const { auth, carers } = usePage<DashboardCustomerProps>().props;
  const user = auth.user;

  const customerUser: CarerLayoutUser = {
    name: user?.name ?? 'Tu perfil',
    email: user?.email ?? 'Sin correo',
    initials: initialsOf(user?.name ?? 'Tu perfil'),
    city: typeof user?.profile?.ciudad === 'string' && user.profile.ciudad.trim() !== '' ? user.profile.ciudad : 'Tu ciudad',
  };

  const [cat, setCat] = useState('todos');
  const [avail, setAvail] = useState('todos');
  const [sort, setSort] = useState('rating');
  const [favs, setFavs] = useState(new Set<number>());
  const [search, setSearch] = useState('');
  const [activeNav, setActiveNav] = useState('Explorar');
  const [bookingCarer, setBookingCarer] = useState<Carer | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);

  const { data, setData, post, processing, errors, clearErrors, reset } = useForm<BookingFormData>({
    carer_profile_id: 0,
    servicio_perfil_id: 0,
    fecha_servicio: '',
    hora_inicio: '',
    duracion_minutos: 60,
    direccion_servicio: typeof user?.profile?.direccion === 'string' ? user.profile.direccion : '',
    notas: '',
  });

  const bookingServices = useMemo(
    () => (bookingCarer ? bookingCarer.services.filter((service) => service.precio_hora != null) : []),
    [bookingCarer]
  );

  const bookingAvailability = useMemo(() => {
    if (!bookingCarer?.availability) {
      return [];
    }

    return bookingCarer.availability.reduce<Array<{ day: string; slots: CarerAvailabilitySlot[] }>>((groups, slot) => {
      const existing = groups.find((group) => group.day === slot.day);

      if (existing) {
        existing.slots.push(slot);
        return groups;
      }

      groups.push({ day: slot.day, slots: [slot] });
      return groups;
    }, []);
  }, [bookingCarer]);

  const selectedService = bookingServices.find((service) => service.id === data.servicio_perfil_id) ?? bookingServices[0] ?? null;
  const estimatedTotal = displayRate(selectedService) > 0
    ? ((displayRate(selectedService) / 60) * Number(data.duracion_minutos || 0)).toFixed(2)
    : '0.00';
  const bookingError = (errors as Record<string, string | undefined>).booking ?? errors.carer_profile_id;

  const toggleFav = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const matchesCategory = (carer: Carer, category: string) =>
    category === 'todos' || carer.services.some((service) => SERVICE_CATEGORY_BY_TYPE[service.tipo] === category);

  const filtered = carers
    .filter((carer) => matchesCategory(carer, cat))
    .filter((carer) => avail === 'todos' || carer.avail)
    .filter((carer) =>
      !search ||
      carer.name.toLowerCase().includes(search.toLowerCase()) ||
      carer.spec.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'rating') {
        return b.stars - a.stars;
      }

      return 0;
    })
    .map((carer) => ({
      ...carer,
      cat: cat !== 'todos' && matchesCategory(carer, cat) ? cat : carer.cat,
    }));

  const resetFilters = () => {
    setCat('todos');
    setAvail('todos');
    setSearch('');
  };

  const countCat = (key: string) => carers.filter((carer) => matchesCategory(carer, key)).length;
  const hasFilter = cat !== 'todos' || avail !== 'todos' || search;

  const openBookingModal = (carer: Carer) => {
    const firstService = carer.services.find((service) => service.precio_hora != null);

    if (!firstService) {
      return;
    }

    setBookingCarer(carer);
    setBookingStep(1);
    clearErrors();
    setData({
      carer_profile_id: carer.id,
      servicio_perfil_id: firstService.id,
      fecha_servicio: '',
      hora_inicio: '',
      duracion_minutos: 60,
      direccion_servicio: typeof user?.profile?.direccion === 'string' ? user.profile.direccion : '',
      notas: '',
    });
  };

  const closeBookingModal = () => {
    setBookingCarer(null);
    setBookingStep(1);
    clearErrors();
    reset();
  };

  const goToBookingForm = () => {
    clearErrors();
    setBookingStep(2);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    post('/dashboard/customer/reservas', {
      preserveScroll: true,
      onSuccess: () => {
        closeBookingModal();
      },
    });
  };

  const navLinks: NavLink[] = [
    { label: 'Explorar', active: activeNav === 'Explorar', onClick: () => { setActiveNav('Explorar'); router.visit('/dashboard/customer'); } },
    { label: 'Mis reservas', active: activeNav === 'Mis reservas', onClick: () => { setActiveNav('Mis reservas'); router.visit('/dashboard/customer/reservas'); } },
    { label: 'Favoritos', active: activeNav === 'Favoritos', onClick: () => { setActiveNav('Favoritos'); router.visit('/dashboard/customer/favoritos'); } },
  ];

  const dropdownItems: DropdownItem[] = [
    { icon: '👤', label: 'Mi perfil' },
    { icon: '📅', label: 'Mis reservas', badge: 2 },
    { icon: '❤️', label: 'Favoritos', badge: Math.max(favs.size, 4) },
    { icon: '💳', label: 'Métodos de pago' },
    { icon: '⚙️', label: 'Ajustes' },
    { icon: '↩', label: 'Cerrar sesión', danger: true, onClick: () => router.post('/logout') },
  ];

  return (
    <>
      <style>{pageCss}{carerCardCss}</style>

      <CarerLayout
        user={customerUser}
        navLinks={navLinks}
        notifCount={1}
        profileSteps={PROFILE_STEPS}
        dropdownItems={dropdownItems}
      >
        <section className="hero-section">
          <div className="hero-pill">
            <div className="hero-pill-dot" />
            {customerUser.city} · {carers.length} cuidadores activos
          </div>
          <h1 className="hero-title">
            Hola, <em>{customerUser.name.split(' ')[0]}</em> 👋
            <br />
            ¿A quién cuidamos hoy?
          </h1>
          <p className="hero-sub">
            Cuidadores verificados, con experiencia real y servicios publicados para familias como la tuya.
          </p>

          <div className="search-frame">
            <div className="sf">
              <div className="sf-label">¿Para quién?</div>
              <div className="sf-val">Adulto mayor, niño, mascota...</div>
            </div>
            <div className="sf-sep" />
            <div className="sf">
              <div className="sf-label">¿Cuándo?</div>
              <div className="sf-val">Hoy · Esta semana</div>
            </div>
            <div className="sf-sep" />
            <div className="sf" style={{ flex: '0 0 auto', minWidth: 160 }}>
              <div className="sf-label">Buscar</div>
              <input
                className="sf-input"
                placeholder="Nombre o especialidad..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <button type="button" className="search-cta">
              Buscar
            </button>
          </div>
        </section>

        <div className="trust-strip">
          {[
            ['✓', 'Cuidadores verificados'],
            ['🔒', 'Pago seguro'],
            ['⭐', '4.9 de media · +1.200 reseñas'],
            ['💬', 'Soporte 24 h'],
          ].map(([icon, label]) => (
            <div className="trust-item" key={label}>
              <div className="trust-icon-wrap">{icon}</div>
              {label}
            </div>
          ))}
        </div>

        <div className="filter-bar">
          <span className="filter-label">Filtrar</span>
          {CATS.map((option) => (
            <button
              type="button"
              key={option.key}
              className={`chip${cat === option.key ? ' on' : ''}`}
              onClick={() => setCat(option.key)}
            >
              {option.emoji} {option.label}
              {option.key !== 'todos' && <span className="chip-count">{countCat(option.key)}</span>}
            </button>
          ))}
          <button
            type="button"
            className={`chip${avail === 'disponible' ? ' on' : ''}`}
            onClick={() => setAvail((current) => current === 'disponible' ? 'todos' : 'disponible')}
          >
            <span className="chip-status" style={{ background: avail === 'disponible' ? '#fff' : 'var(--dom-lt)' }} />
            Disponibles hoy
          </button>
          {hasFilter && (
            <button type="button" className="chip chip-clear" onClick={resetFilters}>
              ✕ Quitar filtros
            </button>
          )}
          <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="rating">Mejor valorados</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </div>

        <div className="results-head">
          <div className="results-count">
            <em>{filtered.length}</em> cuidador{filtered.length !== 1 ? 'es' : ''}
          </div>
          <div className="results-label">
            {hasFilter ? 'con los filtros aplicados' : 'disponibles en tu zona'}
          </div>
        </div>

        <div className="grid-outer">
          <div className="carer-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-title">Sin resultados</div>
                <div className="empty-sub">
                  Ningún cuidador cumple los filtros actuales. Prueba ajustando los criterios.
                </div>
                <button type="button" className="empty-action" onClick={resetFilters}>
                  Ver todos los cuidadores
                </button>
              </div>
            ) : filtered.map((carer) => (
              <CarerCard
                key={carer.id}
                carer={carer}
                isFav={favs.has(carer.id)}
                onToggleFav={toggleFav}
                onBook={openBookingModal}
              />
            ))}
          </div>
        </div>
      </CarerLayout>

      {bookingCarer && (
        <div className="booking-overlay" onClick={closeBookingModal}>
          <div className="booking-modal" onClick={(event) => event.stopPropagation()}>
            <div className="booking-head">
              <div>
                <div className="booking-kicker">Nueva solicitud</div>
                <div className="booking-title">Reserva con {bookingCarer.name}</div>
                <div className="booking-sub">
                  {bookingStep === 1
                    ? 'Revisa primero la ficha del cuidador para confirmar servicios, descripcion y disponibilidad antes de continuar.'
                    : 'Elige el servicio, define horario y envia la solicitud al cuidador. Quedara pendiente hasta que la acepte.'}
                </div>
              </div>
              <button type="button" className="booking-close" onClick={closeBookingModal} aria-label="Cerrar">
                x
              </button>
            </div>

            <form className="booking-body" onSubmit={submitBooking}>
              <div className="booking-steps">
                <div className={`booking-step-chip${bookingStep === 1 ? ' on' : ''}`}>
                  <span className="booking-step-index">1</span>
                  Revisar perfil
                </div>
                <div className="booking-step-line" />
                <div className={`booking-step-chip${bookingStep === 2 ? ' on' : ''}`}>
                  <span className="booking-step-index">2</span>
                  Enviar solicitud
                </div>
              </div>

              {bookingStep === 1 ? (
                <div className="booking-preview">
                  <div className="booking-preview-hero">
                    <div className="booking-preview-avatar">
                      {bookingCarer.initials ?? initialsOf(bookingCarer.name)}
                    </div>
                    <div>
                      <div className="booking-preview-kicker">Perfil del cuidador</div>
                      <div className="booking-preview-name">{bookingCarer.name}</div>
                      <div className="booking-preview-spec">{bookingCarer.spec}</div>

                      <div className="booking-preview-meta">
                        {bookingCarer.location && (
                          <span className="booking-preview-badge">Ubicacion: {bookingCarer.location}</span>
                        )}
                        <span className="booking-preview-badge">
                          Disponibilidad: {bookingCarer.active_days ?? bookingAvailability.length} dias
                        </span>
                        <span className="booking-preview-badge">
                          Servicios: {bookingServices.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-preview-grid">
                    <div className="booking-preview-card">
                      <h3>Sobre el servicio</h3>
                      <div className="booking-preview-copy">
                        {bookingCarer.bio?.trim() || 'Este cuidador aun no ha agregado una descripcion detallada de su experiencia.'}
                      </div>
                    </div>

                    <div className="booking-preview-card">
                      <h3>Servicios</h3>
                      <div className="booking-service-list">
                        {bookingServices.map((service) => (
                          <div className="booking-service-item" key={service.id}>
                            <div className="booking-service-top">
                              <div className="booking-service-name">{SERVICE_LABELS[service.tipo] ?? service.tipo}</div>
                              <div className="booking-service-rate">EUR {displayRate(service)}/h</div>
                            </div>
                            <div className="booking-service-desc">
                              {service.descripcion?.trim() || 'Servicio publicado sin descripcion adicional.'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="booking-preview-card">
                    <h3>Disponibilidad</h3>
                    {bookingAvailability.length > 0 ? (
                      <div className="booking-availability-list">
                        {bookingAvailability.map((group) => (
                          <div className="booking-availability-item" key={group.day}>
                            <div className="booking-availability-top">
                              <div className="booking-availability-day">{group.day}</div>
                              <div className="booking-availability-hours">
                                {group.slots.map((slot) => `${slot.start} - ${slot.end}`).join(', ')}
                              </div>
                            </div>
                            <div className="booking-availability-note">
                              {group.slots.some((slot) => slot.minimum_duration > 0) && (
                                <span>
                                  Duracion minima: {Math.max(...group.slots.map((slot) => slot.minimum_duration))} min.
                                </span>
                              )}{' '}
                              {group.slots.some((slot) => slot.notice_hours > 0) && (
                                <span>
                                  Aviso previo: {Math.max(...group.slots.map((slot) => slot.notice_hours))} h.
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="booking-preview-empty">
                        Este cuidador aun no tiene horarios visibles en el perfil.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="booking-grid">
                    <div className="booking-field full">
                      <label className="booking-label" htmlFor="servicio_perfil_id">Servicio</label>
                      <select
                        id="servicio_perfil_id"
                        className="booking-select"
                        value={data.servicio_perfil_id}
                        onChange={(event) => setData('servicio_perfil_id', Number(event.target.value))}
                      >
                        {bookingServices.map((service) => (
                          <option key={service.id} value={service.id}>
                            {SERVICE_LABELS[service.tipo] ?? service.tipo} · EUR {displayRate(service)}/h
                          </option>
                        ))}
                      </select>
                      {errors.servicio_perfil_id && <div className="booking-error">{errors.servicio_perfil_id}</div>}
                    </div>

                    <div className="booking-field">
                      <label className="booking-label" htmlFor="fecha_servicio">Fecha</label>
                      <input
                        id="fecha_servicio"
                        type="date"
                        className="booking-input"
                        value={data.fecha_servicio}
                        min={new Date().toISOString().split('T')[0]}
                        onClick={(event) => openNativeDatePicker(event.currentTarget)}
                        onFocus={(event) => openNativeDatePicker(event.currentTarget)}
                        onChange={(event) => setData('fecha_servicio', event.target.value)}
                      />
                      {errors.fecha_servicio && <div className="booking-error">{errors.fecha_servicio}</div>}
                    </div>

                    <div className="booking-field">
                      <label className="booking-label" htmlFor="hora_inicio">Hora de inicio</label>
                      <input
                        id="hora_inicio"
                        type="time"
                        className="booking-input"
                        value={data.hora_inicio}
                        onClick={(event) => openNativeDatePicker(event.currentTarget)}
                        onFocus={(event) => openNativeDatePicker(event.currentTarget)}
                        onChange={(event) => setData('hora_inicio', event.target.value)}
                      />
                      {errors.hora_inicio && <div className="booking-error">{errors.hora_inicio}</div>}
                    </div>

                    <div className="booking-field">
                      <label className="booking-label" htmlFor="duracion_minutos">Duracion</label>
                      <select
                        id="duracion_minutos"
                        className="booking-select"
                        value={data.duracion_minutos}
                        onChange={(event) => setData('duracion_minutos', Number(event.target.value))}
                      >
                        <option value={60}>1 hora</option>
                        <option value={120}>2 horas</option>
                        <option value={180}>3 horas</option>
                        <option value={240}>4 horas</option>
                        <option value={480}>8 horas</option>
                      </select>
                      {errors.duracion_minutos && <div className="booking-error">{errors.duracion_minutos}</div>}
                    </div>

                    <div className="booking-field">
                      <label className="booking-label" htmlFor="direccion_servicio">Direccion del servicio</label>
                      <input
                        id="direccion_servicio"
                        type="text"
                        className="booking-input"
                        value={data.direccion_servicio}
                        onChange={(event) => setData('direccion_servicio', event.target.value)}
                        placeholder="Calle, barrio o referencia"
                      />
                      {errors.direccion_servicio && <div className="booking-error">{errors.direccion_servicio}</div>}
                    </div>

                    <div className="booking-field full">
                      <label className="booking-label" htmlFor="notas">Notas para el cuidador</label>
                      <textarea
                        id="notas"
                        className="booking-textarea"
                        value={data.notas}
                        onChange={(event) => setData('notas', event.target.value)}
                        placeholder="Cuentale brevemente que necesitas, horarios especiales o cualquier detalle util."
                      />
                      {errors.notas && <div className="booking-error">{errors.notas}</div>}
                    </div>
                  </div>

                  <div className="booking-summary">
                    <div>
                      <div className="booking-summary-title">
                        {selectedService ? (SERVICE_LABELS[selectedService.tipo] ?? selectedService.tipo) : 'Servicio seleccionado'}
                      </div>
                      <div className="booking-summary-sub">
                        Estimado total segun la tarifa publicada actualmente por el cuidador.
                      </div>
                    </div>
                    <div className="booking-summary-price">
                      <div className="booking-summary-total">EUR {estimatedTotal}</div>
                      <div className="booking-summary-unit">Total estimado</div>
                    </div>
                  </div>
                </>
              )}

              {bookingError && (
                <div className="booking-error" style={{ marginTop: '14px' }}>
                  {bookingError}
                </div>
              )}

              <div className="booking-actions">
                <button type="button" className="booking-btn-secondary" onClick={closeBookingModal} disabled={processing}>
                  Cancelar
                </button>
                {bookingStep === 2 && (
                  <button type="button" className="booking-btn-secondary" onClick={() => setBookingStep(1)} disabled={processing}>
                    Volver
                  </button>
                )}
                {bookingStep === 1 ? (
                  <button type="button" className="booking-btn-primary" onClick={goToBookingForm}>
                    Continuar con la solicitud
                  </button>
                ) : (
                  <button type="submit" className="booking-btn-primary" disabled={processing}>
                    {processing ? 'Enviando solicitud...' : 'Enviar solicitud'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
