import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import CarerLayout from '@/features/layouts/carer_layout';
import type { AddressProfile, AvailabilitySlot, ProfileCompletion, ProfileService, SharedData, UserProfile } from '@/types';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap');
*,*::before,*::after{box-sizing:border-box}.shell{display:grid;grid-template-columns:280px 1fr;gap:18px}.stack{display:flex;flex-direction:column;gap:16px}.card{background:var(--card);border:1px solid var(--t08);border-radius:22px;box-shadow:var(--sh-card);overflow:hidden}.head{padding:18px 22px;border-bottom:1px solid var(--t08);display:flex;justify-content:space-between;gap:10px}.title{font:300 18px var(--ff-d);color:var(--t100)}.body{padding:20px 22px}.tabs{display:flex;flex-wrap:wrap;gap:8px}.tab{padding:9px 14px;border-radius:999px;border:1px solid var(--t15);background:var(--bg-2);color:var(--t55);cursor:pointer;font:500 13px var(--ff-s)}.tab.active{background:var(--blue-lt);color:var(--bg);border-color:transparent}.hero{padding:26px 22px;background:linear-gradient(180deg,rgba(90,150,212,.10),transparent);border-bottom:1px solid var(--t08);text-align:center}.avatar{width:84px;height:84px;border-radius:50%;margin:0 auto 12px;background:linear-gradient(135deg,var(--blue),var(--blue-lt));display:flex;align-items:center;justify-content:center;color:#fff;font:700 28px var(--ff-s)}.name{font:300 23px var(--ff-d);color:var(--t100)}.sub{font-size:12px;color:var(--t35);margin-top:4px}.progress{margin-top:14px;padding:12px 14px;border:1px solid var(--t08);border-radius:16px;background:var(--bg-2);text-align:left}.bar{height:8px;background:var(--t08);border-radius:999px;overflow:hidden}.bar span{display:block;height:100%;background:linear-gradient(90deg,var(--blue),var(--blue-lt))}.summary{padding:18px 22px;display:flex;flex-direction:column;gap:12px}.summary-item{padding-bottom:12px;border-bottom:1px solid var(--t05)}.summary-item:last-child{border-bottom:none;padding-bottom:0}.summary-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t35);margin-bottom:3px}.summary-value,.muted{font-size:12px;color:var(--t55);line-height:1.6}.summary-value{font-size:13px;color:var(--t80)}.actions{padding:0 22px 22px;display:flex;gap:8px}.btn-primary,.btn-secondary,.btn-danger{border:none;cursor:pointer;font-family:var(--ff-s)}.btn-primary{padding:11px 16px;border-radius:14px;background:var(--blue-lt);color:var(--bg);font-size:13px;font-weight:700}.btn-secondary{padding:11px 16px;border-radius:14px;background:var(--t08);color:var(--t80);border:1px solid var(--t15);font-size:13px;font-weight:600}.btn-danger{padding:9px 12px;border-radius:12px;background:var(--red-bg);color:var(--red);border:1px solid rgba(239,68,68,.2);font-size:12px;font-weight:700}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.full{grid-column:1/-1}.field{display:flex;flex-direction:column;gap:6px}.label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t35)}.input{width:100%;padding:11px 14px;border-radius:14px;border:1px solid var(--t08);background:var(--bg-2);color:var(--t80);font:400 13px var(--ff-s);outline:none}.input:focus{border-color:rgba(90,150,212,.45);box-shadow:0 0 0 3px rgba(90,150,212,.12)}.input:read-only{opacity:.7}.list{display:flex;flex-direction:column;gap:12px}.item{padding:16px;border:1px solid var(--t08);border-radius:18px;background:var(--bg-2)}.item-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:14px}.item-title{font-size:15px;font-weight:700;color:var(--t80)}.badge{display:inline-flex;padding:3px 9px;border-radius:999px;background:rgba(90,150,212,.12);border:1px solid rgba(90,150,212,.22);color:var(--blue-lt);font-size:10px;font-weight:700}.row{display:flex;gap:8px;flex-wrap:wrap}.empty{padding:18px;text-align:center;border:1px dashed var(--t15);border-radius:18px;background:var(--bg-2);color:var(--t35)}.ok{margin-bottom:10px;color:var(--green);font-size:12px}.err{margin-bottom:10px;color:var(--red);font-size:12px}@media(max-width:980px){.shell{grid-template-columns:1fr}.grid{grid-template-columns:1fr}}
`;

const TABS = ['personal', 'servicios', 'disponibilidad', 'documentos', 'direcciones', 'pagos'] as const;
type Tab = typeof TABS[number];

const TAB_LABELS: Record<Tab, string> = {
  personal: 'Perfil',
  servicios: 'Servicios y precios',
  disponibilidad: 'Disponibilidad',
  documentos: 'Documentos',
  direcciones: 'Direcciones',
  pagos: 'Cuenta bancaria',
};

const SERVICE_TYPE_OPTIONS = [
  { key: 'adultos_mayores', label: 'Adultos mayores' },
  { key: 'ninos', label: 'Ninos' },
  { key: 'mascotas', label: 'Mascotas' },
] as const;
const AVAILABLE_DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
const REQUIRED_DOCUMENTS = [
  { title: 'DNI / NIE', meta: 'Subido · 12 ene 2025', status: 'Verificado' },
  { title: 'Permiso de trabajo', meta: 'No aplica (ciudadana EU)', status: 'Verificado' },
  { title: 'Background check', meta: 'Validado · 15 ene 2025', status: 'Verificado' },
  { title: 'Contrato de servicio', meta: 'Pendiente de firma', status: 'Pendiente' },
  { title: 'Certificado geriatria', meta: 'Pendiente de subir', status: 'Falta subir' },
];

const PROFILE_COMPLETION_FIELDS = [
  'dni',
  'fecha_nacimiento',
  'direccion',
  'ciudad',
  'codigo_postal',
  'area_ocupacional',
  'idiomas',
  'descripcion_personal',
  'tipo_cuidado',
  'experiencia',
  'certificaciones',
  'preferencias',
  'dni_frontal',
  'dni_trasera',
  'certificados',
  'descripcion_general_servicio',
  'direcciones',
  'disponibilidades',
  'servicios',
] as const;

type EditableAddress = { id?: number; label: string; address_line_1: string; address_line_2: string; neighborhood: string; reference: string; type: string; is_default: boolean; };
type EditableAvailabilitySlot = { id?: number; dia_semana: number; hora_inicio: string; hora_fin: string; duracion_minima_minutos: string; aviso_previo_horas: string; observaciones: string; };
type EditableService = { id?: number; tipo: string; descripcion: string; };

const normalizeAddresses = (items?: AddressProfile[] | null): EditableAddress[] => (items ?? []).map((item) => ({ id: item.id, label: item.label ?? '', address_line_1: item.address_line_1 ?? '', address_line_2: item.address_line_2 ?? '', neighborhood: item.neighborhood ?? '', reference: item.reference ?? '', type: item.type ?? 'home', is_default: Boolean(item.is_default) }));
const normalizeTimeValue = (value?: string | null) => value ? value.slice(0, 5) : '';
const normalizeAvailabilitySlots = (items?: AvailabilitySlot[] | null): EditableAvailabilitySlot[] => (items ?? []).map((item) => ({ id: item.id, dia_semana: Number(item.dia_semana ?? 1), hora_inicio: normalizeTimeValue(item.hora_inicio), hora_fin: normalizeTimeValue(item.hora_fin), duracion_minima_minutos: item.duracion_minima_minutos != null ? String(item.duracion_minima_minutos) : '', aviso_previo_horas: item.aviso_previo_horas != null ? String(item.aviso_previo_horas) : '', observaciones: item.observaciones ?? '' }));
const normalizeServices = (items?: ProfileService[] | null): EditableService[] =>
  SERVICE_TYPE_OPTIONS.map((option) => {
    const service = (items ?? []).find((item) => item.tipo === option.key);
    return {
      id: service?.id,
      tipo: option.key,
      descripcion: service?.descripcion ?? '',
    };
  });
const emptyAddress = (): EditableAddress => ({ label: '', address_line_1: '', address_line_2: '', neighborhood: '', reference: '', type: 'home', is_default: false });
const emptyAvailability = (): EditableAvailabilitySlot => ({ dia_semana: 1, hora_inicio: '08:00', hora_fin: '17:00', duracion_minima_minutos: '120', aviso_previo_horas: '24', observaciones: '' });
const initialsOf = (value: string) => value.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'TU';
const memberSince = (value?: string | null) => value ? `Miembro desde ${new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(value))}` : 'Miembro reciente';
const birthDate = (value?: string | null) => value ? new Intl.DateTimeFormat('es-CO').format(new Date(value)) : 'Sin fecha';
const primaryAddress = (items: EditableAddress[]) => items.find((item) => item.is_default) ?? items[0] ?? null;
const addressText = (item?: EditableAddress | null) => item ? [item.address_line_1, item.address_line_2, item.neighborhood].filter(Boolean).join(', ') || 'Sin direccion' : 'Sin direccion';
const dayLabel = (value: number) => AVAILABLE_DAYS[value - 1] ?? 'Lun';

export default function TQidoClientProfile() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const initialProfile = (user?.profile ?? null) as UserProfile | null;
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(initialProfile);
  const [completion, setCompletion] = useState<ProfileCompletion | null>((user?.profile_completion ?? null) as ProfileCompletion | null);
  const [profileForm, setProfileForm] = useState({ user_id: Number(user?.id ?? 0), fecha_nacimiento: initialProfile?.fecha_nacimiento ?? '', ciudad: initialProfile?.ciudad ?? '', direccion: initialProfile?.direccion ?? '' });
  const [addresses, setAddresses] = useState<EditableAddress[]>(normalizeAddresses(initialProfile?.direcciones));
  const [availabilitySlots, setAvailabilitySlots] = useState<EditableAvailabilitySlot[]>(normalizeAvailabilitySlots(initialProfile?.disponibilidades));
  const [serviceDescription, setServiceDescription] = useState(initialProfile?.descripcion_general_servicio ?? '');
  const [services, setServices] = useState<EditableService[]>(normalizeServices(initialProfile?.servicios));
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [activeNav, setActiveNav] = useState('Inicio');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveOk, setSaveOk] = useState('');
  const completedProfileItems = Math.max(0, PROFILE_COMPLETION_FIELDS.length - (completion?.missing?.length ?? PROFILE_COMPLETION_FIELDS.length));

  const resetForms = () => {
    setProfileForm({ user_id: Number(user?.id ?? 0), fecha_nacimiento: savedProfile?.fecha_nacimiento ?? '', ciudad: savedProfile?.ciudad ?? '', direccion: savedProfile?.direccion ?? '' });
    setAddresses(normalizeAddresses(savedProfile?.direcciones));
    setAvailabilitySlots(normalizeAvailabilitySlots(savedProfile?.disponibilidades));
    setServiceDescription(savedProfile?.descripcion_general_servicio ?? '');
    setServices(normalizeServices(savedProfile?.servicios));
  };

  const saveProfile = async () => {
    setSaving(true); setSaveError(''); setSaveOk('');
    try {
      const response = await fetch('/api/update-profile', { method: 'PUT', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...profileForm, descripcion_general_servicio: serviceDescription, services: services, addresses, availability_slots: availabilitySlots.map((slot) => ({ ...slot, hora_inicio: normalizeTimeValue(slot.hora_inicio), hora_fin: normalizeTimeValue(slot.hora_fin), duracion_minima_minutos: slot.duracion_minima_minutos ? Number(slot.duracion_minima_minutos) : null, aviso_previo_horas: slot.aviso_previo_horas ? Number(slot.aviso_previo_horas) : null })) }) });
      const data = await response.json();
      if (!response.ok) {
        const firstError = data?.errors ? Object.values(data.errors).flat()[0] : data.message;
        setSaveError(String(firstError ?? 'No se pudo actualizar el perfil.'));
        return;
      }
      const updated = (data.profile ?? null) as UserProfile | null;
      setSavedProfile(updated);
      setCompletion((data.profile_completion ?? null) as ProfileCompletion | null);
      setProfileForm({ user_id: Number(user?.id ?? 0), fecha_nacimiento: updated?.fecha_nacimiento ?? '', ciudad: updated?.ciudad ?? '', direccion: updated?.direccion ?? '' });
      setAddresses(normalizeAddresses(updated?.direcciones));
      setAvailabilitySlots(normalizeAvailabilitySlots(updated?.disponibilidades));
      setServiceDescription(updated?.descripcion_general_servicio ?? '');
      setServices(normalizeServices(updated?.servicios));
      setEditing(false);
      setSaveOk(data.message ?? 'Perfil actualizado correctamente.');
    } catch (error) {
      console.error(error);
      setSaveError('Hubo un problema de conexion. Intentalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <CarerLayout initials={initialsOf(user?.name ?? 'Tu perfil')} activeNav={activeNav} onNavChange={setActiveNav}>
        <div className="shell">
          <aside className="card">
            <div className="hero">
              <div className="avatar">{initialsOf(user?.name ?? 'Tu perfil')}</div>
              <div className="name">{user?.name ?? 'Tu perfil'}</div>
              <div className="sub">{memberSince(user?.created_at)}</div>
              <div className="progress">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}><span className="muted">Perfil completado</span><span className="muted">{completion?.percentage ?? 0}%</span></div>
                <div className="bar"><span style={{ width: `${completion?.percentage ?? 0}%` }} /></div>
                <div className="sub">{completedProfileItems}/{PROFILE_COMPLETION_FIELDS.length} elementos completos</div>
              </div>
            </div>
            <div className="summary">
              {[{ label: 'Email', value: user?.email ?? 'Sin correo' }, { label: 'Telefono', value: user?.phone ?? 'Sin telefono' }, { label: 'Nacimiento', value: birthDate(savedProfile?.fecha_nacimiento) }, { label: 'Direccion principal', value: addressText(primaryAddress(addresses)) || savedProfile?.direccion || 'Sin direccion' }].map((item) => (
                <div className="summary-item" key={item.label}><div className="summary-label">{item.label}</div><div className="summary-value">{item.value}</div></div>
              ))}
            </div>
            <div className="actions">
              {editing ? (
                <>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { resetForms(); setSaveError(''); setSaveOk(''); setEditing(false); }} disabled={saving}>Cancelar</button>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={saveProfile} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
                </>
              ) : (
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => setEditing(true)}>Editar perfil</button>
              )}
            </div>
          </aside>

          <section className="stack">
            <div className="tabs">{TABS.map((tab) => <button key={tab} className={`tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{TAB_LABELS[tab]}</button>)}</div>
            <div className="card">
              <div className="head"><span className="title">{TAB_LABELS[activeTab]}</span><span className="muted">{activeTab === 'direcciones' ? `${addresses.length} direcciones` : activeTab === 'documentos' ? '3/5 verificados' : ''}</span></div>
              <div className="body">
                {saveError && <div className="err">{saveError}</div>}
                {saveOk && <div className="ok">{saveOk}</div>}
                {activeTab === 'personal' && (
                  <div className="stack">
                    <p className="muted">Los cambios de datos personales y direcciones se guardan con el boton del panel izquierdo.</p>
                    <div className="grid">
                      <div className="field"><label className="label">Nombre</label><input className="input" value={(user?.name ?? '').split(' ')[0] ?? ''} readOnly /></div>
                      <div className="field"><label className="label">Apellidos</label><input className="input" value={(user?.name ?? '').split(' ').slice(1).join(' ')} readOnly /></div>
                      <div className="field"><label className="label">Telefono</label><input className="input" value={user?.phone ?? ''} readOnly /></div>
                      <div className="field"><label className="label">Email</label><input className="input" value={user?.email ?? ''} readOnly /></div>
                      <div className="field"><label className="label">Fecha de nacimiento</label><input type="date" className="input" value={profileForm.fecha_nacimiento} onChange={(event) => setProfileForm((current) => ({ ...current, fecha_nacimiento: event.target.value }))} readOnly={!editing} /></div>
                      <div className="field"><label className="label">Ciudad</label><input className="input" value={profileForm.ciudad} onChange={(event) => setProfileForm((current) => ({ ...current, ciudad: event.target.value }))} readOnly={!editing} /></div>
                      <div className="field full"><label className="label">Direccion principal del perfil</label><input className="input" value={profileForm.direccion} onChange={(event) => setProfileForm((current) => ({ ...current, direccion: event.target.value }))} readOnly={!editing} /></div>
                    </div>
                  </div>
                )}

                {activeTab === 'servicios' && (
                  <div className="stack">
                    <p className="muted">Define una descripcion general de tu servicio y una descripcion especifica para cada tipo. El perfil admite hasta tres tipos fijos.</p>
                    <div className="item">
                      <div className="item-title" style={{ marginBottom: 14 }}>Descripcion general del servicio</div>
                      <div className="field">
                        <label className="label">Descripcion general</label>
                        <textarea
                          className="input"
                          rows={4}
                          value={serviceDescription}
                          onChange={(event) => setServiceDescription(event.target.value)}
                          readOnly={!editing}
                        />
                      </div>
                    </div>
                    <div className="list">
                      {services.map((service, index) => (
                        <div className="item" key={service.tipo}>
                          <div className="item-head">
                            <div>
                              <div className="item-title">{SERVICE_TYPE_OPTIONS[index]?.label ?? service.tipo}</div>
                              <div className="muted">Tipo de servicio fijo del perfil</div>
                            </div>
                            <span className="badge">{SERVICE_TYPE_OPTIONS[index]?.label ?? service.tipo}</span>
                          </div>
                          <div className="field">
                            <label className="label">Descripcion del servicio</label>
                            <textarea
                              className="input"
                              rows={4}
                              value={service.descripcion}
                              onChange={(event) => setServices((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, descripcion: event.target.value } : item))}
                              readOnly={!editing}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'disponibilidad' && (
                  <div className="stack">
                    <p className="muted">Aqui puedes definir varios bloques por dia para soportar disponibilidad parcial, por ejemplo manana y tarde el mismo dia.</p>
                    <div className="row" style={{ marginBottom: 6 }}>
                      {AVAILABLE_DAYS.map((day, index) => (
                        <span key={day} className="badge" style={availabilitySlots.some((slot) => slot.dia_semana === index + 1) ? undefined : { opacity: 0.45 }}>
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="list">
                      {availabilitySlots.length === 0 && <div className="empty">Todavia no has configurado bloques de disponibilidad.</div>}
                      {availabilitySlots.map((slot, index) => (
                        <div className="item" key={slot.id ?? `slot-${index}`}>
                          <div className="item-head">
                            <div>
                              <div className="item-title">{dayLabel(slot.dia_semana)} · {slot.hora_inicio} - {slot.hora_fin}</div>
                              <div className="muted">Bloque horario #{index + 1}</div>
                            </div>
                            <div className="row">
                              <span className="badge">{dayLabel(slot.dia_semana)}</span>
                              {editing && <button className="btn-danger" onClick={() => setAvailabilitySlots((current) => current.filter((_, currentIndex) => currentIndex !== index))}>Eliminar</button>}
                            </div>
                          </div>
                          <div className="grid">
                            <div className="field">
                              <label className="label">Dia</label>
                              {editing ? (
                                <select className="input" value={slot.dia_semana} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, dia_semana: Number(event.target.value) } : item))}>
                                  {AVAILABLE_DAYS.map((day, dayIndex) => <option key={day} value={dayIndex + 1}>{day}</option>)}
                                </select>
                              ) : (
                                <input className="input" value={dayLabel(slot.dia_semana)} readOnly />
                              )}
                            </div>
                            <div className="field">
                              <label className="label">Duracion minima (min)</label>
                              <input className="input" value={slot.duracion_minima_minutos} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, duracion_minima_minutos: event.target.value } : item))} readOnly={!editing} />
                            </div>
                            <div className="field">
                              <label className="label">Desde</label>
                              <input type="time" className="input" value={slot.hora_inicio} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, hora_inicio: event.target.value } : item))} readOnly={!editing} />
                            </div>
                            <div className="field">
                              <label className="label">Hasta</label>
                              <input type="time" className="input" value={slot.hora_fin} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, hora_fin: event.target.value } : item))} readOnly={!editing} />
                            </div>
                            <div className="field">
                              <label className="label">Aviso previo (horas)</label>
                              <input className="input" value={slot.aviso_previo_horas} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, aviso_previo_horas: event.target.value } : item))} readOnly={!editing} />
                            </div>
                            <div className="field full">
                              <label className="label">Observaciones</label>
                              <input className="input" value={slot.observaciones} onChange={(event) => setAvailabilitySlots((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, observaciones: event.target.value } : item))} readOnly={!editing} />
                            </div>
                          </div>
                        </div>
                      ))}
                      {editing && <button className="btn-secondary" onClick={() => setAvailabilitySlots((current) => [...current, emptyAvailability()])}>Anadir bloque horario</button>}
                    </div>
                  </div>
                )}

                {activeTab === 'documentos' && (
                  <div className="stack">
                    <p className="muted">Documentacion requerida restaurada con sus estados visibles para mantener completa la pagina del cuidador.</p>
                    <div className="list">
                      {REQUIRED_DOCUMENTS.map((document) => (
                        <div className="item" key={document.title}>
                          <div className="item-head" style={{ marginBottom: 0 }}>
                            <div>
                              <div className="item-title">{document.title}</div>
                              <div className="muted">{document.meta}</div>
                            </div>
                            <span
                              className="badge"
                              style={
                                document.status === 'Pendiente'
                                  ? { background: 'rgba(245,158,11,.12)', borderColor: 'rgba(245,158,11,.25)', color: 'var(--amber)' }
                                  : document.status === 'Falta subir'
                                    ? { background: 'var(--red-bg)', borderColor: 'rgba(239,68,68,.18)', color: 'var(--red)' }
                                    : undefined
                              }
                            >
                              {document.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'direcciones' && (
                  <div className="stack">
                    <p className="muted">Las direcciones guardadas se usan para planificar servicios. Puedes marcar una como principal y dejar referencias de acceso.</p>
                    <div className="list">
                      {addresses.length === 0 && <div className="empty">Todavia no tienes direcciones registradas.</div>}
                      {addresses.map((address, index) => (
                        <div className="item" key={address.id ?? `address-${index}`}>
                          <div className="item-head">
                            <div><div className="item-title">{address.label || `Direccion ${index + 1}`}</div><div className="muted">{addressText(address)}</div></div>
                            <div className="row">
                              {address.is_default && <span className="badge">Principal</span>}
                              {editing && !address.is_default && <button className="btn-secondary" onClick={() => setAddresses((current) => current.map((item, currentIndex) => ({ ...item, is_default: currentIndex === index })))}>Marcar principal</button>}
                              {editing && <button className="btn-danger" onClick={() => setAddresses((current) => current.filter((_, currentIndex) => currentIndex !== index))}>Eliminar</button>}
                            </div>
                          </div>
                          <div className="grid">
                            <div className="field"><label className="label">Etiqueta</label><input className="input" value={address.label} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, label: event.target.value } : item))} readOnly={!editing} /></div>
                            <div className="field">{editing ? (<><label className="label">Tipo</label><select className="input" value={address.type} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, type: event.target.value } : item))}><option value="home">home</option><option value="office">office</option><option value="shipping">shipping</option><option value="billing">billing</option></select></>) : (<><label className="label">Tipo</label><input className="input" value={address.type} readOnly /></>)}</div>
                            <div className="field full"><label className="label">Direccion principal</label><input className="input" value={address.address_line_1} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, address_line_1: event.target.value } : item))} readOnly={!editing} /></div>
                            <div className="field full"><label className="label">Complemento</label><input className="input" value={address.address_line_2} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, address_line_2: event.target.value } : item))} readOnly={!editing} /></div>
                            <div className="field"><label className="label">Barrio</label><input className="input" value={address.neighborhood} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, neighborhood: event.target.value } : item))} readOnly={!editing} /></div>
                            <div className="field"><label className="label">Referencia</label><input className="input" value={address.reference} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, reference: event.target.value } : item))} readOnly={!editing} /></div>
                          </div>
                        </div>
                      ))}
                      {editing && <button className="btn-secondary" onClick={() => setAddresses((current) => [...current, { ...emptyAddress(), is_default: current.length === 0 }])}>Anadir direccion</button>}
                    </div>
                  </div>
                )}
                {activeTab === 'pagos' && (
                  <div className="stack">
                    <p className="muted">Pagos sigue en modo vista previa. El cambio funcional de este turno quedo conectado en datos personales y direcciones.</p>
                    <div className="item"><div className="item-title">Visa terminada en 4821</div><div className="muted">Predeterminada</div></div>
                    <div className="item"><div className="item-title">Mastercard terminada en 3309</div><div className="muted">Guardada</div></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </CarerLayout>
    </>
  );
}
