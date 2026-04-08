import { useState } from 'react';
import CarerLayout from '@/features/layouts/carer_layout';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ═══ LAYOUT ═══ */
.profile-layout{display:grid;grid-template-columns:290px 1fr;gap:18px;align-items:start}
.right-col{display:flex;flex-direction:column;gap:16px}

/* ═══ CARD BASE ═══ */
.card{background:var(--card);border:1px solid var(--t08);border-radius:var(--r-xl);box-shadow:var(--sh-card);overflow:hidden}
.card-header{padding:18px 22px 14px;border-bottom:1px solid var(--t08);display:flex;align-items:center;justify-content:space-between}
.card-title{font-family:var(--ff-d);font-size:16px;font-weight:300;color:var(--t100)}
.card-body{padding:20px 22px}

/* ═══ TABS ═══ */
.tabs-wrap{background:var(--bg-2);border:1px solid var(--t08);border-radius:16px;padding:5px;display:inline-flex;gap:3px;margin-bottom:16px;flex-wrap:wrap}
.tab-btn{padding:8px 18px;border-radius:12px;font-size:13px;font-weight:400;color:var(--t55);background:none;border:none;font-family:var(--ff-s);cursor:pointer;transition:all 0.15s;white-space:nowrap}
.tab-btn:hover{color:var(--t80);background:var(--t08)}
.tab-btn.active{background:var(--blue-lt);color:var(--bg);font-weight:600}

/* ═══ FORM ═══ */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-full{grid-column:1/-1}
.field{display:flex;flex-direction:column;gap:5px}
.field-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--t35)}
.field-input{background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-md);padding:10px 14px;font-family:var(--ff-s);font-size:13px;color:var(--t80);outline:none;transition:border-color 0.15s,box-shadow 0.15s;resize:none}
.field-input:focus{border-color:rgba(90,150,212,0.45);box-shadow:0 0 0 3px rgba(90,150,212,0.10)}
.field-input::placeholder{color:var(--t35)}
.field-input:read-only{opacity:0.6;cursor:not-allowed}
textarea.field-input{min-height:80px;line-height:1.6}
select.field-input{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.35)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;cursor:pointer}
select.field-input option{background:var(--card-2)}
.field-hint{font-size:10.5px;color:var(--t35);line-height:1.4}

/* ═══ LEFT PANEL ═══ */
.avatar-zone{padding:28px 22px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;border-bottom:1px solid var(--t08);background:linear-gradient(180deg,rgba(90,150,212,0.06),transparent)}
.avatar-name{font-family:var(--ff-d);font-size:19px;font-weight:300;color:var(--t100);margin-bottom:3px}
.avatar-since{font-size:11px;color:var(--t35);margin-bottom:10px}
.avatar-badges{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.av-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:var(--r-full);font-size:10px;font-weight:600}
.av-badge.green{background:var(--green-bg);color:var(--green);border:1px solid rgba(34,197,94,0.22)}
.av-badge.blue{background:rgba(90,150,212,0.12);color:var(--blue-lt);border:1px solid rgba(90,150,212,0.22)}

/* id rows */
.id-fields{padding:18px 22px;display:flex;flex-direction:column;border-bottom:1px solid var(--t08)}
.id-row{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--t05)}
.id-row:last-child{border-bottom:none}
.id-icon{font-size:14px;width:20px;text-align:center;margin-top:1px;flex-shrink:0;color:var(--blue-ltr)}
.id-content{flex:1;min-width:0}
.id-label{font-size:9.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--t35);margin-bottom:2px}
.id-val{font-size:12.5px;color:var(--t80);line-height:1.4}

/* quick stats */
.quick-stats{padding:16px 22px;display:grid;grid-template-columns:1fr 1fr;gap:10px;border-bottom:1px solid var(--t08)}
.qs-item{background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);padding:12px 14px;text-align:center}
.qs-num{font-family:var(--ff-d);font-size:24px;font-weight:300;color:var(--t100);line-height:1;margin-bottom:3px}
.qs-num.blue{color:var(--blue-lt)}
.qs-num.amber{color:var(--amber)}
.qs-label{font-size:9.5px;color:var(--t35);line-height:1.3}

/* ═══ CARE PROFILE CARD ═══ */
.care-card{background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);overflow:hidden;transition:border-color 0.2s,box-shadow 0.2s;cursor:pointer}
.care-card:hover{border-color:rgba(90,150,212,0.28);box-shadow:0 4px 20px rgba(14,45,90,0.3)}
.care-card-header{padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--t05)}
.care-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:2px solid var(--t08);flex-shrink:0}
.care-info{flex:1;min-width:0}
.care-name{font-size:14px;font-weight:600;color:var(--t80);margin-bottom:2px}
.care-type{font-size:11px;color:var(--blue-ltr);font-weight:500;text-transform:uppercase;letter-spacing:0.06em}
.care-tag{padding:2px 9px;border-radius:var(--r-full);font-size:9.5px;font-weight:700;background:rgba(90,150,212,0.12);color:var(--blue-lt);border:1px solid rgba(90,150,212,0.2)}
.care-body{padding:14px 16px;display:flex;flex-direction:column;gap:6px}
.care-row{display:flex;gap:8px;flex-wrap:wrap}
.care-field-item{display:flex;flex-direction:column;gap:2px;flex:1;min-width:120px}
.care-field-label{font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--t35)}
.care-field-val{font-size:11.5px;color:var(--t80)}
.care-tags-row{display:flex;gap:5px;flex-wrap:wrap;margin-top:4px}
.care-mini-tag{padding:2px 8px;border-radius:var(--r-full);font-size:10px;background:var(--t05);border:1px solid var(--t08);color:var(--t55)}
.care-add-btn{display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--t05);border:1.5px dashed var(--t15);border-radius:var(--r-lg);cursor:pointer;transition:all 0.15s;margin-top:2px}
.care-add-btn:hover{border-color:rgba(90,150,212,0.35);background:rgba(90,150,212,0.04)}
.care-add-icon{width:36px;height:36px;border-radius:var(--r-md);background:var(--t08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;color:var(--t35)}
.care-add-text{font-size:12.5px;color:var(--t35)}
.care-add-sub{font-size:10.5px;color:var(--t35);opacity:0.7;margin-top:1px}

/* ═══ ADDRESS CARD ═══ */
.address-item{display:flex;align-items:flex-start;gap:12px;padding:13px 14px;background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);margin-bottom:8px;transition:border-color 0.15s}
.address-item:hover{border-color:var(--t15)}
.address-item.primary{border-color:rgba(90,150,212,0.25);background:rgba(90,150,212,0.05)}
.addr-icon{width:36px;height:36px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;background:var(--t05);border:1px solid var(--t08)}
.addr-info{flex:1;min-width:0}
.addr-name{font-size:13px;font-weight:500;color:var(--t80);margin-bottom:2px}
.addr-full{font-size:11.5px;color:var(--t55);line-height:1.45}
.addr-primary-badge{font-size:9.5px;font-weight:700;color:var(--blue-lt);background:rgba(90,150,212,0.12);border:1px solid rgba(90,150,212,0.22);padding:1px 7px;border-radius:var(--r-full);margin-top:4px;display:inline-block}
.addr-actions{display:flex;gap:5px;flex-shrink:0}

/* ═══ PAYMENT METHODS ═══ */
.pay-item{display:flex;align-items:center;gap:12px;padding:13px 14px;background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);margin-bottom:8px;transition:border-color 0.15s}
.pay-item:hover{border-color:var(--t15)}
.pay-item.primary{border-color:rgba(90,150,212,0.25)}
.pay-logo{width:42px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--t100);flex-shrink:0}
.pay-info{flex:1}
.pay-name{font-size:13px;font-weight:500;color:var(--t80);margin-bottom:1px}
.pay-meta{font-size:11px;color:var(--t35)}
.pay-default-badge{font-size:9.5px;font-weight:700;color:var(--blue-lt);background:rgba(90,150,212,0.12);border:1px solid rgba(90,150,212,0.22);padding:1px 7px;border-radius:var(--r-full)}
.pay-add{display:flex;align-items:center;gap:10px;padding:11px 14px;background:var(--t05);border:1.5px dashed var(--t15);border-radius:var(--r-lg);cursor:pointer;transition:all 0.15s;margin-bottom:8px}
.pay-add:hover{border-color:rgba(90,150,212,0.35)}
.pay-add-text{font-size:12.5px;color:var(--t35)}

/* ═══ FAVORITE CARERS ═══ */
.fav-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);margin-bottom:8px;transition:all 0.18s;cursor:pointer}
.fav-item:hover{border-color:rgba(90,150,212,0.28);transform:translateX(3px)}
.fav-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--t100);border:2px solid var(--t08);flex-shrink:0}
.fav-info{flex:1}
.fav-name{font-size:13px;font-weight:500;color:var(--t80);margin-bottom:1px}
.fav-spec{font-size:11px;color:var(--t35)}
.fav-stars{font-size:11px;color:var(--amber);letter-spacing:1px}
.fav-btn{padding:5px 12px;border-radius:var(--r-full);font-size:11.5px;font-weight:600;cursor:pointer;font-family:var(--ff-s);background:rgba(90,150,212,0.12);color:var(--blue-lt);border:1px solid rgba(90,150,212,0.22);transition:all 0.15s;white-space:nowrap;flex-shrink:0}
.fav-btn:hover{background:rgba(90,150,212,0.22)}

/* ═══ SERVICES HISTORY ═══ */
.service-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-lg);margin-bottom:8px;transition:border-color 0.15s}
.service-item:hover{border-color:var(--t15)}
.service-bar{width:3px;border-radius:2px;align-self:stretch;min-height:36px;flex-shrink:0}
.service-bar.completed{background:var(--green)}
.service-bar.upcoming{background:var(--blue-lt)}
.service-bar.cancelled{background:var(--red)}
.service-info{flex:1;min-width:0}
.service-name{font-size:13px;font-weight:500;color:var(--t80);margin-bottom:2px}
.service-meta{font-size:11px;color:var(--t35);line-height:1.5}
.service-right{text-align:right;flex-shrink:0}
.service-price{font-family:var(--ff-d);font-size:16px;color:var(--t80);line-height:1;margin-bottom:3px}
.service-badge{padding:2px 8px;border-radius:var(--r-full);font-size:9.5px;font-weight:700}
.service-badge.completed{background:var(--green-bg);color:var(--green);border:1px solid rgba(34,197,94,0.22)}
.service-badge.upcoming{background:rgba(90,150,212,0.12);color:var(--blue-lt);border:1px solid rgba(90,150,212,0.22)}
.service-badge.cancelled{background:var(--red-bg);color:var(--red);border:1px solid rgba(239,68,68,0.18)}

/* ═══ NOTIF PREFERENCES ═══ */
.notif-row{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-2);border:1px solid var(--t08);border-radius:var(--r-md);margin-bottom:6px;transition:border-color 0.15s}
.notif-row:hover{border-color:var(--t15)}
.notif-icon{font-size:16px;width:22px;text-align:center;flex-shrink:0}
.notif-content{flex:1}
.notif-label{font-size:12.5px;font-weight:500;color:var(--t80)}
.notif-sub{font-size:10.5px;color:var(--t35);margin-top:1px}
.notif-channels{display:flex;gap:5px;flex-shrink:0}
.notif-ch{padding:3px 8px;border-radius:var(--r-full);font-size:10px;font-weight:600;cursor:pointer;transition:all 0.13s;border:1px solid var(--t15);background:none;font-family:var(--ff-s);color:var(--t35)}
.notif-ch.on{background:rgba(90,150,212,0.14);color:var(--blue-lt);border-color:rgba(90,150,212,0.28)}

/* ═══ BUTTONS ═══ */
.btn-ghost{padding:10px 18px;border-radius:var(--r-md);background:var(--t08);color:var(--t55);font-family:var(--ff-s);font-size:13px;font-weight:500;border:1px solid var(--t15);cursor:pointer;transition:all 0.18s}
.btn-ghost:hover{background:var(--t15);color:var(--t80)}
.btn-icon{width:34px;height:34px;border-radius:var(--r-sm);background:var(--t08);border:1px solid var(--t15);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.15s;font-size:13px;color:var(--t55)}
.btn-icon:hover{background:var(--t15);color:var(--t80)}
.btn-sm{padding:7px 14px;border-radius:var(--r-sm);font-size:12px;font-weight:600;font-family:var(--ff-s);cursor:pointer;border:none;transition:all 0.15s}
.btn-sm.blue{background:rgba(90,150,212,0.14);color:var(--blue-lt);border:1px solid rgba(90,150,212,0.25)}
.btn-sm.blue:hover{background:rgba(90,150,212,0.24)}
.btn-sm.red{background:var(--red-bg);color:var(--red);border:1px solid rgba(239,68,68,0.2)}

/* ═══ ANIMATIONS ═══ */
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.profile-layout>*:nth-child(1){animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.04s}
.profile-layout>*:nth-child(2){animation:fadeUp 0.5s cubic-bezier(0.22,0.68,0,1) both 0.10s}

/* ═══ RESPONSIVE ═══ */
@media(max-width:960px){.profile-layout{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.form-grid{grid-template-columns:1fr}.tabs-wrap{width:100%}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

/* ── DATA ── */
const CLIENT = {
  name: 'Sara González',
  initials: 'SG',
  email: 'sara.gonzalez@email.com',
  phone: '+34 623 891 045',
  address: 'C/ Velázquez 18, 3ºB, 28001 Madrid',
  birthdate: '04/08/1985',
  since: 'Miembro desde enero 2025',
};

const PROFILE_STEPS = [
  { label: 'Foto de perfil',         done: true  },
  { label: 'Número verificado',      done: true  },
  { label: 'Dirección completa',     done: true  },
  { label: 'Método de pago',         done: true  },
  { label: 'Preferencias guardadas', done: false },
];

const CARE_PROFILES = [
  {
    emoji: '👴', name: 'Manuel González', type: 'Adulto mayor',
    color: 'linear-gradient(135deg,#0e2d5a,#2e6fba)',
    fields: [
      { label: 'Edad',        val: '78 años' },
      { label: 'Movilidad',   val: 'Reducida (silla de ruedas)' },
      { label: 'Medicación',  val: 'Sí · 3 tomas diarias' },
      { label: 'Alergias',    val: 'Penicilina, látex' },
      { label: 'Diagnóstico', val: 'Parkinson leve' },
      { label: 'Contacto emergencia', val: '+34 612 345 678' },
    ],
    tags: ['Alzheimer leve', 'Fisioterapia', 'Dieta especial'],
  },
  {
    emoji: '👶', name: 'Lucía González', type: 'Niña',
    color: 'linear-gradient(135deg,#1a4a8a,#5a96d4)',
    fields: [
      { label: 'Edad',       val: '6 años' },
      { label: 'Rutinas',    val: 'Colegio 9:00–14:00 · siesta 15:30' },
      { label: 'Alergias',   val: 'Frutos secos, gluten' },
      { label: 'Autorizaciones', val: 'Recogida colegio ✓' },
      { label: 'Veterinario',    val: 'N/A' },
      { label: 'Contacto emergencia', val: '+34 623 891 045' },
    ],
    tags: ['Actividades Montessori', 'Inglés', 'Sin pantallas'],
  },
  {
    emoji: '🐕', name: 'Rocky', type: 'Mascota · Labrador',
    color: 'linear-gradient(135deg,#2e6fba,#a4c8ee)',
    fields: [
      { label: 'Raza / Tamaño', val: 'Labrador · 28 kg' },
      { label: 'Rutinas',       val: 'Paseo mañana y tarde · 30 min' },
      { label: 'Conducta',      val: 'Sociable, juguetón' },
      { label: 'Veterinario',   val: 'Clínica VetMadrid · 91 234 56 78' },
      { label: 'Vacunas',       val: 'Al día · última jul 2024' },
      { label: 'Medicación',    val: 'Pipeta antipulgas mensual' },
    ],
    tags: ['Vacunas al día', 'Esterilizado', 'Collar GPS'],
  },
];

const ADDRESSES = [
  { icon: '🏠', name: 'Casa',    full: 'C/ Velázquez 18, 3ºB, 28001 Madrid',    primary: true  },
  { icon: '🏢', name: 'Trabajo', full: 'Paseo de la Castellana 89, 28046 Madrid', primary: false },
];

const PAY_METHODS = [
  { logo: 'VISA', name: 'Visa terminada en 4821', meta: 'Vence 09/27', primary: true,  bg: '#1a3a6b' },
  { logo: 'MC',   name: 'Mastercard en 3309',     meta: 'Vence 03/26', primary: false, bg: '#c0392b' },
  { logo: 'APAY', name: 'Apple Pay',              meta: 'Configurado', primary: false, bg: '#1a1a1a' },
];

const FAVORITES = [
  { av: 'MC', bg: 'linear-gradient(135deg,#0e2d5a,#2e6fba)', name: 'María Carrasco',  spec: 'Adultos mayores', stars: '★★★★★', services: 12 },
  { av: 'SR', bg: 'linear-gradient(135deg,#1a4a8a,#5a96d4)', name: 'Sofía Romero',    spec: 'Niños · Bebés',  stars: '★★★★★', services: 4  },
  { av: 'PM', bg: 'linear-gradient(135deg,#2e6fba,#a4c8ee)', name: 'Pablo Martín',    spec: 'Mascotas',       stars: '★★★★☆', services: 6  },
];

const SERVICES_HISTORY = [
  { name: 'María Carrasco · Adulto mayor', meta: 'Mié 25 jun · 09:00–12:00 · C/ Velázquez',  price: '€54',  status: 'upcoming'  },
  { name: 'Sofía Romero · Niños',          meta: 'Lun 23 jun · 16:00–20:00 · Casa',           price: '€60',  status: 'completed' },
  { name: 'Pablo Martín · Mascota',        meta: 'Vie 20 jun · 10:00–11:30 · Parque Retiro',  price: '€19',  status: 'completed' },
  { name: 'María Carrasco · Adulto mayor', meta: 'Lun 16 jun · 09:00–12:00 · Casa',           price: '€54',  status: 'completed' },
  { name: 'Carlos Ruiz · Mascota',         meta: 'Vie 14 jun · 10:00–11:00',                  price: '€14',  status: 'cancelled' },
];

const NOTIFS = [
  { icon: '📅', label: 'Confirmaciones de reserva',      sub: 'Cuando se acepta o modifica un servicio'  },
  { icon: '⏰', label: 'Recordatorios',                  sub: '24h y 2h antes del servicio'              },
  { icon: '💬', label: 'Mensajes del cuidador',          sub: 'Comunicaciones en tiempo real'             },
  { icon: '💳', label: 'Pagos y facturas',               sub: 'Confirmaciones de cobro y recibos'         },
  { icon: '⚠️', label: 'Cancelaciones',                  sub: 'Si el cuidador cancela el servicio'        },
  { icon: '⭐', label: 'Recordatorio de valoración',     sub: 'Tras completar un servicio'                },
];

const TABS = ['personal', 'cuidados', 'direcciones', 'pagos', 'historial', 'notificaciones'] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  personal:        'Mis datos',
  cuidados:        'Perfiles de cuidado',
  direcciones:     'Direcciones',
  pagos:           'Métodos de pago',
  historial:       'Servicios',
  notificaciones:  'Notificaciones',
};

export default function TQidoClientProfile() {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [activeNav, setActiveNav] = useState('Inicio');
  const [editing,   setEditing]   = useState(false);
  const [notifCh,   setNotifCh]   = useState<Record<number, string[]>>({
    0: ['push', 'email'], 1: ['push'], 2: ['push'],
    3: ['email'], 4: ['push', 'email'], 5: ['email'],
  });

  const toggleNotifCh = (i: number, ch: string) =>
    setNotifCh(n => {
      const curr = n[i] || [];
      return { ...n, [i]: curr.includes(ch) ? curr.filter(x => x !== ch) : [...curr, ch] };
    });

  const donePct = Math.round(PROFILE_STEPS.filter(s => s.done).length / PROFILE_STEPS.length * 100);
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = circ * donePct / 100;

  return (
    <>
      <style>{css}</style>

      <CarerLayout
        initials={CLIENT.initials}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      >
        <div className="profile-layout">

          {/* ── LEFT PANEL ── */}
          <div className="card">
            <div className="avatar-zone">

              {/* Ring + avatar */}
              <div style={{ position: 'relative', width: 108, height: 108, marginBottom: 14 }}>
                {/* SVG progress ring */}
                <svg
                  width="108" height="108"
                  style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
                >
                  <circle
                    cx="54" cy="54" r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="54" cy="54" r={r}
                    fill="none"
                    stroke="rgba(90,150,212,0.90)"
                    strokeWidth="5"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.34,1.2,0.64,1)' }}
                  />
                </svg>

                {/* Avatar circle */}
                <div style={{
                  position: 'absolute', top: 9, left: 9,
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'linear-gradient(135deg,var(--blue),var(--blue-lt))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 700, color: 'var(--t100)', fontFamily: 'var(--ff-s)',
                  border: '3px solid rgba(90,150,212,0.3)',
                  boxShadow: '0 4px 20px rgba(14,45,90,0.4)',
                }}>
                  {CLIENT.initials}
                </div>

                {/* Percentage badge */}
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  background: 'rgba(11,34,73,0.95)',
                  border: '2px solid rgba(90,150,212,0.40)',
                  borderRadius: 'var(--r-full)',
                  padding: '2px 7px',
                  fontSize: 10, fontWeight: 700, color: 'var(--blue-lt)',
                  lineHeight: 1.4,
                }}>
                  {donePct}%
                </div>

                {/* Edit camera icon (editing mode) */}
                {editing && (
                  <div style={{
                    position: 'absolute', bottom: 22, right: 2,
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--blue-lt)', color: 'var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, cursor: 'pointer',
                    border: '2px solid var(--card)',
                  }}>
                    📷
                  </div>
                )}
              </div>

              <div className="avatar-name">{CLIENT.name}</div>
              <div style={{ fontSize: 10, color: 'var(--t35)', marginBottom: 2 }}>
                {PROFILE_STEPS.filter(s => s.done).length}/{PROFILE_STEPS.length} pasos completados
              </div>
              <div className="avatar-since">{CLIENT.since}</div>
              <div className="avatar-badges">
                <span className="av-badge green">✓ Email verificado</span>
                <span className="av-badge blue">📱 Teléfono verificado</span>
              </div>
            </div>

            <div className="id-fields">
              {[
                { icon: '✉️', label: 'Email',      val: CLIENT.email },
                { icon: '📱', label: 'Teléfono',   val: CLIENT.phone },
                { icon: '🏠', label: 'Dirección',  val: 'C/ Velázquez 18, Madrid' },
                { icon: '🎂', label: 'Nacimiento', val: CLIENT.birthdate },
              ].map(f => (
                <div className="id-row" key={f.label}>
                  <span className="id-icon">{f.icon}</span>
                  <div className="id-content">
                    <div className="id-label">{f.label}</div>
                    <div className="id-val">{f.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-stats">
              <div className="qs-item">
                <div className="qs-num blue">12</div>
                <div className="qs-label">Servicios<br />completados</div>
              </div>
              <div className="qs-item">
                <div className="qs-num">3</div>
                <div className="qs-label">Cuidadores<br />favoritos</div>
              </div>
              <div className="qs-item">
                <div className="qs-num amber">€684</div>
                <div className="qs-label">Total<br />gastado</div>
              </div>
              <div className="qs-item">
                <div className="qs-num blue">4.9</div>
                <div className="qs-label">Valoración<br />como cliente</div>
              </div>
            </div>

            {/* Edit button */}
            <div style={{ padding: '16px 22px' }}>
              {editing ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setEditing(false)}>
                    Cancelar
                  </button>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => setEditing(false)}>
                    💾 Guardar
                  </button>
                </div>
              ) : (
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => setEditing(true)}>
                  ✏️ Editar perfil
                </button>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="right-col">

            {/* TABS */}
            <div className="tabs-wrap">
              {TABS.map(t => (
                <button
                  key={t}
                  className={`tab-btn${activeTab === t ? ' active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {TAB_LABELS[t]}
                </button>
              ))}
            </div>

            {/* ── TAB: MIS DATOS ── */}
            {activeTab === 'personal' && (
              <div className="card">
                <div className="card-header"><span className="card-title">Datos personales</span></div>
                <div className="card-body">
                  <div className="form-grid">
                    <div className="field">
                      <label className="field-label">Nombre</label>
                      <input className="field-input" defaultValue="Sara" readOnly={!editing} />
                    </div>
                    <div className="field">
                      <label className="field-label">Apellidos</label>
                      <input className="field-input" defaultValue="González Ruiz" readOnly={!editing} />
                    </div>
                    <div className="field">
                      <label className="field-label">Teléfono</label>
                      <input className="field-input" defaultValue={CLIENT.phone} readOnly={!editing} />
                    </div>
                    <div className="field">
                      <label className="field-label">Email</label>
                      <input className="field-input" defaultValue={CLIENT.email} readOnly={!editing} />
                      <span className="field-hint">Verificado · cambiar requiere confirmación</span>
                    </div>
                    <div className="field">
                      <label className="field-label">Fecha de nacimiento</label>
                      <input className="field-input" defaultValue={CLIENT.birthdate} readOnly={!editing} />
                    </div>
                    <div className="field">
                      <label className="field-label">Ciudad</label>
                      <input className="field-input" defaultValue="Madrid" readOnly={!editing} />
                    </div>
                    <div className="field form-full">
                      <label className="field-label">Dirección principal</label>
                      <input className="field-input" defaultValue={CLIENT.address} readOnly={!editing} />
                    </div>
                  </div>

                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--t08)', borderRadius: 'var(--r-lg)' }}>
                    <div className="sec-title">Seguridad de la cuenta</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { icon: '🔑', label: 'Contraseña',        meta: 'Actualizada hace 2 meses', action: 'Cambiar'   },
                        { icon: '📱', label: 'Autenticación 2FA', meta: 'Activada · SMS',           action: 'Gestionar' },
                        { icon: '🔐', label: 'Sesiones activas',  meta: '2 dispositivos',           action: 'Ver'       },
                      ].map(s => (
                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 16, width: 22, textAlign: 'center' }}>{s.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--t80)' }}>{s.label}</div>
                            <div style={{ fontSize: 10.5, color: 'var(--t35)' }}>{s.meta}</div>
                          </div>
                          <button className="btn-sm blue">{s.action}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: PERFILES DE CUIDADO ── */}
            {activeTab === 'cuidados' && (
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Perfiles del cuidado</span>
                  <span style={{ fontSize: 11, color: 'var(--t35)' }}>{CARE_PROFILES.length} perfiles activos</span>
                </div>
                <div className="card-body">
                  <div style={{ fontSize: 12, color: 'var(--t55)', marginBottom: 16, lineHeight: 1.6 }}>
                    Cada perfil contiene la información específica del familiar o mascota que recibirá el cuidado.
                    Esta información se comparte con el cuidador al confirmar la reserva.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {CARE_PROFILES.map(p => (
                      <div className="care-card" key={p.name}>
                        <div className="care-card-header">
                          <div className="care-avatar" style={{ background: p.color }}>{p.emoji}</div>
                          <div className="care-info">
                            <div className="care-name">{p.name}</div>
                            <div className="care-type">{p.type}</div>
                          </div>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            {editing && <button className="btn-icon">✏️</button>}
                            <span className="care-tag">Activo</span>
                          </div>
                        </div>
                        <div className="care-body">
                          <div className="care-row">
                            {p.fields.map(f => (
                              <div className="care-field-item" key={f.label}>
                                <div className="care-field-label">{f.label}</div>
                                <div className="care-field-val">{f.val}</div>
                              </div>
                            ))}
                          </div>
                          <div className="care-tags-row">
                            {p.tags.map(t => <span className="care-mini-tag" key={t}>{t}</span>)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {editing && (
                      <div className="care-add-btn">
                        <div className="care-add-icon">➕</div>
                        <div>
                          <div className="care-add-text">Añadir nuevo perfil</div>
                          <div className="care-add-sub">Adulto mayor, niño o mascota</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: DIRECCIONES ── */}
            {activeTab === 'direcciones' && (
              <div className="card">
                <div className="card-header"><span className="card-title">Mis direcciones</span></div>
                <div className="card-body">
                  <div style={{ fontSize: 12, color: 'var(--t55)', marginBottom: 16, lineHeight: 1.6 }}>
                    Las direcciones guardadas se usan al planificar un servicio. Puedes indicar dónde debe acudir el cuidador con un solo clic.
                  </div>
                  {ADDRESSES.map(a => (
                    <div className={`address-item${a.primary ? ' primary' : ''}`} key={a.name}>
                      <div className="addr-icon">{a.icon}</div>
                      <div className="addr-info">
                        <div className="addr-name">{a.name}</div>
                        <div className="addr-full">{a.full}</div>
                        {a.primary && <span className="addr-primary-badge">✓ Dirección principal</span>}
                      </div>
                      {editing && (
                        <div className="addr-actions">
                          <button className="btn-icon">✏️</button>
                          {!a.primary && <button className="btn-icon">🗑</button>}
                        </div>
                      )}
                    </div>
                  ))}
                  {editing && (
                    <div className="pay-add" style={{ marginTop: 4 }}>
                      <span style={{ fontSize: 18 }}>➕</span>
                      <span className="pay-add-text">Añadir nueva dirección</span>
                    </div>
                  )}
                  <div style={{ marginTop: 20 }}>
                    <div className="sec-title">Instrucciones de acceso</div>
                    <div className="field form-full">
                      <label className="field-label">Notas para el cuidador</label>
                      <textarea
                        className="field-input"
                        defaultValue="Portero automático: 3ºB. El ascensor está a la izquierda. Las llaves de repuesto están con la vecina del 3ºA (Carmen)."
                        readOnly={!editing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: MÉTODOS DE PAGO ── */}
            {activeTab === 'pagos' && (
              <div className="card">
                <div className="card-header"><span className="card-title">Métodos de pago</span></div>
                <div className="card-body">
                  {PAY_METHODS.map(p => (
                    <div className={`pay-item${p.primary ? ' primary' : ''}`} key={p.name}>
                      <div className="pay-logo" style={{ background: p.bg }}>{p.logo}</div>
                      <div className="pay-info">
                        <div className="pay-name">{p.name}</div>
                        <div className="pay-meta">{p.meta}</div>
                      </div>
                      {p.primary
                        ? <span className="pay-default-badge">✓ Predeterminada</span>
                        : editing && <button className="btn-sm blue">Predeterminar</button>
                      }
                      {editing && !p.primary && <button className="btn-icon" style={{ marginLeft: 4 }}>🗑</button>}
                    </div>
                  ))}
                  {editing && (
                    <div className="pay-add">
                      <span style={{ fontSize: 18 }}>➕</span>
                      <span className="pay-add-text">Añadir tarjeta o método de pago</span>
                    </div>
                  )}

                  <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--t08)', borderRadius: 'var(--r-lg)' }}>
                    <div className="sec-title">Historial de pagos</div>
                    {[
                      { desc: 'María Carrasco · 3h',  date: '25 jun', amount: '€54', status: 'Próximo' },
                      { desc: 'Sofía Romero · 4h',     date: '23 jun', amount: '€60', status: 'Pagado'  },
                      { desc: 'Pablo Martín · 1.5h',   date: '20 jun', amount: '€19', status: 'Pagado'  },
                    ].map(p => (
                      <div key={p.desc} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--t05)' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--t80)' }}>{p.desc}</div>
                          <div style={{ fontSize: 10.5, color: 'var(--t35)' }}>{p.date} 2025</div>
                        </div>
                        <div style={{ fontFamily: 'var(--ff-d)', fontSize: 16, color: 'var(--t80)' }}>{p.amount}</div>
                        <span style={{
                          fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--r-full)',
                          background: p.status === 'Pagado' ? 'var(--green-bg)' : 'rgba(90,150,212,0.12)',
                          color: p.status === 'Pagado' ? 'var(--green)' : 'var(--blue-lt)',
                          border: `1px solid ${p.status === 'Pagado' ? 'rgba(34,197,94,0.22)' : 'rgba(90,150,212,0.22)'}`,
                        }}>{p.status}</span>
                      </div>
                    ))}
                    <button className="btn-ghost" style={{ width: '100%', marginTop: 12, fontSize: 12 }}>Ver historial completo →</button>
                  </div>

                  <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--t05)', border: '1px solid var(--t08)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16 }}>🧾</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--t80)' }}>Facturación electrónica</div>
                      <div style={{ fontSize: 11, color: 'var(--t35)' }}>Las facturas se envían automáticamente a {CLIENT.email}</div>
                    </div>
                    <button className="btn-sm blue">Gestionar</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: HISTORIAL DE SERVICIOS ── */}
            {activeTab === 'historial' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <span className="card-title">Mis servicios</span>
                    <span style={{ fontSize: 11, color: 'var(--t35)' }}>12 en total</span>
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      {['Todos', 'Próximos', 'Completados', 'Cancelados'].map(f => (
                        <button key={f} className={`btn-sm${f === 'Todos' ? ' blue' : ''}`}
                          style={f !== 'Todos' ? { background: 'var(--t05)', color: 'var(--t55)', border: '1px solid var(--t08)' } : {}}>
                          {f}
                        </button>
                      ))}
                    </div>
                    {SERVICES_HISTORY.map(s => (
                      <div className="service-item" key={s.name + s.meta}>
                        <div className={`service-bar ${s.status}`} />
                        <div className="service-info">
                          <div className="service-name">{s.name}</div>
                          <div className="service-meta">{s.meta}</div>
                        </div>
                        <div className="service-right">
                          <div className="service-price">{s.price}</div>
                          <span className={`service-badge ${s.status}`}>
                            {s.status === 'completed' ? 'Completado' : s.status === 'upcoming' ? 'Próximo' : 'Cancelado'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header"><span className="card-title">Mis cuidadores favoritos</span></div>
                  <div className="card-body">
                    {FAVORITES.map(f => (
                      <div className="fav-item" key={f.name}>
                        <div className="fav-av" style={{ background: f.bg }}>{f.av}</div>
                        <div className="fav-info">
                          <div className="fav-name">{f.name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="fav-stars">{f.stars}</span>
                            <span className="fav-spec">{f.spec} · {f.services} servicios</span>
                          </div>
                        </div>
                        <button className="fav-btn">Reservar</button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── TAB: NOTIFICACIONES ── */}
            {activeTab === 'notificaciones' && (
              <div className="card">
                <div className="card-header"><span className="card-title">Preferencias de notificación</span></div>
                <div className="card-body">
                  <div style={{ fontSize: 12, color: 'var(--t55)', marginBottom: 18, lineHeight: 1.6 }}>
                    Elige cómo quieres recibir cada tipo de aviso. Puedes activar o desactivar push, email y SMS de forma independiente.
                  </div>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginBottom: 10 }}>
                    {['push', 'email', 'sms'].map(ch => (
                      <span key={ch} style={{ fontSize: 10, fontWeight: 700, color: 'var(--t35)', letterSpacing: '0.08em', textTransform: 'uppercase', minWidth: 42, textAlign: 'center' }}>{ch}</span>
                    ))}
                  </div>
                  {NOTIFS.map((n, i) => (
                    <div className="notif-row" key={n.label}>
                      <span className="notif-icon">{n.icon}</span>
                      <div className="notif-content">
                        <div className="notif-label">{n.label}</div>
                        <div className="notif-sub">{n.sub}</div>
                      </div>
                      <div className="notif-channels">
                        {['push', 'email', 'sms'].map(ch => (
                          <button
                            key={ch}
                            className={`notif-ch${(notifCh[i] || []).includes(ch) ? ' on' : ''}`}
                            onClick={() => toggleNotifCh(i, ch)}
                          >
                            {ch === 'push' ? '🔔' : ch === 'email' ? '✉️' : '📱'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>{/* end right-col */}
        </div>{/* end profile-layout */}

      </CarerLayout>
    </>
  );
}