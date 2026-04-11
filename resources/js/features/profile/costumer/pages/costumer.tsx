import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import type { NavLink, DropdownItem, ProfileStep, CarerLayoutUser } from '@/features/layouts/customer_layout';
import CustomerLayout from '@/features/layouts/customer_layout';
import type { AddressProfile, CareProfile, ProfileCompletion, SharedData, UserProfile } from '@/types';

const pageCss = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap');
*,*::before,*::after{box-sizing:border-box} .page{max-width:1140px;margin:0 auto;padding:20px 28px 28px;min-height:calc(100vh - 60px)} .layout{display:grid;grid-template-columns:280px 1fr;gap:18px;align-items:start} .stack{display:flex;flex-direction:column;gap:16px} .card{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:24px;box-shadow:0 12px 28px rgba(24,60,110,.24);overflow:hidden;backdrop-filter:blur(8px)} .hero{padding:26px 22px;border-bottom:1px solid rgba(255,255,255,.12);text-align:center;background:linear-gradient(180deg,rgba(255,255,255,.12),transparent)} .avatar{width:88px;height:88px;border-radius:50%;margin:0 auto 12px;background:linear-gradient(135deg,#ffffff,#cfe3fb);display:flex;align-items:center;justify-content:center;color:#2563eb;font:700 28px 'DM Sans',sans-serif} .name{font:300 23px 'DM Serif Display',serif;color:#fff} .sub{font-size:12px;color:rgba(255,255,255,.62);margin-top:4px} .progress{margin-top:14px;padding:12px 14px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(255,255,255,.08);text-align:left} .bar{height:8px;background:rgba(255,255,255,.12);border-radius:999px;overflow:hidden} .bar span{display:block;height:100%;background:linear-gradient(90deg,#ffffff,#bfdbfe)} .summary{padding:18px 22px;display:flex;flex-direction:column;gap:12px} .summary-item{padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.08)} .summary-item:last-child{border-bottom:none;padding-bottom:0} .summary-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.52);margin-bottom:3px} .summary-value,.muted{font-size:12px;color:rgba(255,255,255,.7);line-height:1.6} .summary-value{font-size:13px;color:rgba(255,255,255,.92)} .actions{padding:0 22px 22px;display:flex;gap:8px} .btn-primary,.btn-secondary,.btn-danger{border:none;cursor:pointer;font-family:'DM Sans',sans-serif} .btn-primary{padding:11px 16px;border-radius:14px;background:#fff;color:#2563eb;font-size:13px;font-weight:700} .btn-secondary{padding:11px 16px;border-radius:14px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.16);font-size:13px;font-weight:600} .btn-danger{padding:9px 12px;border-radius:12px;background:rgba(239,68,68,.16);color:#fecaca;border:1px solid rgba(239,68,68,.25);font-size:12px;font-weight:700} .tabs{display:flex;flex-wrap:wrap;gap:8px} .tab{padding:9px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:rgba(255,255,255,.72);cursor:pointer;font:500 13px 'DM Sans',sans-serif} .tab.active{background:#fff;color:#2563eb;border-color:transparent} .head{padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;gap:10px} .title{font:300 18px 'DM Serif Display',serif;color:#fff} .body{padding:20px 22px} .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px} .full{grid-column:1/-1} .field{display:flex;flex-direction:column;gap:6px} .label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55)} .input,.textarea{width:100%;padding:11px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);color:rgba(255,255,255,.92);font:400 13px 'DM Sans',sans-serif;outline:none} .input:focus,.textarea:focus{border-color:rgba(255,255,255,.35);box-shadow:0 0 0 3px rgba(255,255,255,.10)} .input:read-only,.textarea:read-only{opacity:.76} .textarea{min-height:110px;resize:vertical} .list{display:flex;flex-direction:column;gap:12px}.item{padding:16px;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:rgba(255,255,255,.08)}.item-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:14px}.item-title{font-size:15px;font-weight:700;color:rgba(255,255,255,.92)}.badge{display:inline-flex;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);color:#fff;font-size:10px;font-weight:700}.row{display:flex;gap:8px;flex-wrap:wrap}.empty{padding:18px;text-align:center;border:1px dashed rgba(255,255,255,.2);border-radius:18px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.65)} .ok{margin-bottom:10px;color:#86efac;font-size:12px} .placeholder{padding:18px;border:1px dashed rgba(255,255,255,.2);border-radius:18px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.65)} @media(max-width:980px){.layout{grid-template-columns:1fr}.grid{grid-template-columns:1fr}}
`;

const TABS = ['personal', 'cuidados', 'direcciones', 'pagos', 'notificaciones'] as const;
type Tab = typeof TABS[number];
const CARE_ROLE_OPTIONS = ['Adulto mayor', 'Niño', 'Mascota'] as const;

const TAB_LABELS: Record<Tab, string> = {
  personal: 'Mis datos',
  cuidados: 'Perfiles de cuidado',
  direcciones: 'Direcciones',
  pagos: 'Metodos de pago',
  notificaciones: 'Notificaciones',
};

const initialsOf = (value?: string | null) => (value ?? '').split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'TU';
const memberSince = (value?: string | null) => value ? `Miembro desde ${new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(value))}` : 'Miembro reciente';
const birthDate = (value?: string | null) => value ? new Intl.DateTimeFormat('es-CO').format(new Date(value)) : 'Sin fecha';
const primaryAddress = (items?: AddressProfile[] | null) => (items ?? []).find((item) => item.is_default) ?? (items ?? [])[0] ?? null;
const addressText = (item?: AddressProfile | null, fallback?: string | null) => item
  ? [item.address_line_1, item.address_line_2, item.neighborhood].filter(Boolean).join(', ') || fallback || 'Sin direccion'
  : fallback || 'Sin direccion';
type EditableCareProfile = { id?: number; nombre: string; rol: string; especificacion: string; edad: string; movilidad: string; medicacion: string; alergias: string; diagnostico: string; contacto_emergencia: string };
type EditableAddress = { id?: number; label: string; address_line_1: string; address_line_2: string; neighborhood: string; reference: string; type: string; is_default: boolean };
const normalizeCareProfiles = (items?: CareProfile[] | null): EditableCareProfile[] => (items ?? []).map((item) => ({ id: item.id, nombre: item.nombre ?? '', rol: item.rol ?? '', especificacion: item.especificacion ?? '', edad: item.edad ?? '', movilidad: item.movilidad ?? '', medicacion: item.medicacion ?? '', alergias: item.alergias ?? '', diagnostico: item.diagnostico ?? '', contacto_emergencia: item.contacto_emergencia ?? '' }));
const normalizeAddresses = (items?: AddressProfile[] | null): EditableAddress[] => (items ?? []).map((item) => ({ id: item.id, label: item.label ?? '', address_line_1: item.address_line_1 ?? '', address_line_2: item.address_line_2 ?? '', neighborhood: item.neighborhood ?? '', reference: item.reference ?? '', type: item.type ?? 'home', is_default: Boolean(item.is_default) }));
const emptyCareProfile = (): EditableCareProfile => ({ nombre: '', rol: '', especificacion: '', edad: '', movilidad: '', medicacion: '', alergias: '', diagnostico: '', contacto_emergencia: '' });
const emptyAddress = (): EditableAddress => ({ label: '', address_line_1: '', address_line_2: '', neighborhood: '', reference: '', type: 'home', is_default: false });

export default function TQidoClientProfile() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const initialProfile = (user?.profile ?? null) as UserProfile | null;
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(initialProfile);
  const [completion, setCompletion] = useState<ProfileCompletion | null>((user?.profile_completion ?? null) as ProfileCompletion | null);
  const [profileForm, setProfileForm] = useState({
    user_id: Number(user?.id ?? 0),
    fecha_nacimiento: initialProfile?.fecha_nacimiento ?? '',
    ciudad: initialProfile?.ciudad ?? '',
    direccion: initialProfile?.direccion ?? '',
  });
  const [careProfiles, setCareProfiles] = useState<EditableCareProfile[]>(normalizeCareProfiles(initialProfile?.cuidados));
  const [addresses, setAddresses] = useState<EditableAddress[]>(normalizeAddresses(initialProfile?.direcciones));
  const mainAddress = addresses.find((item) => item.is_default) ?? primaryAddress(savedProfile?.direcciones);

  const clientName = user?.name ?? 'Tu perfil';
  const clientEmail = user?.email ?? 'Sin correo';
  const clientPhone = user?.phone ?? 'Sin telefono';
  const clientCity = profileForm.ciudad || savedProfile?.ciudad || 'Sin ciudad';
  const clientBirthdate = profileForm.fecha_nacimiento;
  const clientBirthdateText = birthDate(profileForm.fecha_nacimiento || savedProfile?.fecha_nacimiento);
  const clientAddress = addressText(mainAddress, profileForm.direccion || savedProfile?.direccion);

  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [activeNav, setActiveNav] = useState('Perfil');
  const [editing, setEditing] = useState(false);
  const [saveOk, setSaveOk] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  const profileSteps: ProfileStep[] = [
    { label: 'Numero verificado', done: Boolean(user?.phone) },
    { label: 'Direccion completa', done: Boolean(mainAddress || profileForm.direccion || savedProfile?.direccion) },
    { label: 'Fecha de nacimiento', done: Boolean(profileForm.fecha_nacimiento || savedProfile?.fecha_nacimiento) },
    { label: 'Ciudad', done: Boolean(profileForm.ciudad || savedProfile?.ciudad) },
    { label: 'Perfil basico', done: Boolean(user?.name && user?.email) },
  ];

  const layoutUser: CarerLayoutUser = {
    name: clientName,
    email: clientEmail,
    initials: initialsOf(clientName),
    city: clientCity,
  };

  const navLinks: NavLink[] = ['Explorar', 'Mis reservas', 'Favoritos', 'Perfil'].map((label) => ({
    label,
    active: activeNav === label,
    onClick: () => setActiveNav(label),
  }));

  const dropdownItems: DropdownItem[] = [
    { icon: '👤', label: 'Mi perfil' },
    { icon: '📅', label: 'Mis reservas', badge: 0 },
    { icon: '❤️', label: 'Favoritos', badge: 0 },
    { icon: '⚙️', label: 'Ajustes' },
    { icon: '↩', label: 'Cerrar sesion', danger: true },
  ];

  const resetForm = () => {
    setProfileForm({
      user_id: Number(user?.id ?? 0),
      fecha_nacimiento: savedProfile?.fecha_nacimiento ?? '',
      ciudad: savedProfile?.ciudad ?? '',
      direccion: savedProfile?.direccion ?? '',
    });
    setCareProfiles(normalizeCareProfiles(savedProfile?.cuidados));
    setAddresses(normalizeAddresses(savedProfile?.direcciones));
  };

  const saveProfile = async () => {
    setSaving(true);
    setSaveOk('');
    setSaveError('');

    try {
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...profileForm,
          care_profiles: careProfiles,
          addresses,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstError = data?.errors ? Object.values(data.errors).flat()[0] : data?.message;
        setSaveError(String(firstError ?? 'No se pudo guardar la informacion basica.'));
        return;
      }

      const updatedProfile = (data.profile ?? null) as UserProfile | null;
      setSavedProfile(updatedProfile);
      setCompletion((data.profile_completion ?? null) as ProfileCompletion | null);
      setProfileForm({
        user_id: Number(user?.id ?? 0),
        fecha_nacimiento: updatedProfile?.fecha_nacimiento ?? profileForm.fecha_nacimiento,
        ciudad: updatedProfile?.ciudad ?? profileForm.ciudad,
        direccion: updatedProfile?.direccion ?? profileForm.direccion,
      });
      setCareProfiles(normalizeCareProfiles(updatedProfile?.cuidados));
      setAddresses(normalizeAddresses(updatedProfile?.direcciones));
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
      <style>{pageCss}</style>

      <CustomerLayout
        user={layoutUser}
        navLinks={navLinks}
        notifCount={0}
        profileSteps={profileSteps}
        dropdownItems={dropdownItems}
        favsCount={0}
      >
        <div className="page">
          <div className="layout">
            <aside className="card">
              <div className="hero">
                <div className="avatar">{layoutUser.initials}</div>
                <div className="name">{clientName}</div>
                <div className="sub">{memberSince(user?.created_at)}</div>
                <div className="progress">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="muted">Perfil completado</span>
                    <span className="muted">{completion?.percentage ?? Math.round(profileSteps.filter((step) => step.done).length / profileSteps.length * 100)}%</span>
                  </div>
                  <div className="bar"><span style={{ width: `${completion?.percentage ?? Math.round(profileSteps.filter((step) => step.done).length / profileSteps.length * 100)}%` }} /></div>
                  <div className="sub">{profileSteps.filter((step) => step.done).length}/{profileSteps.length} pasos base completos</div>
                </div>
              </div>

              <div className="summary">
                {[
                  { label: 'Email', value: clientEmail },
                  { label: 'Telefono', value: clientPhone },
                  { label: 'Nacimiento', value: clientBirthdateText },
                  { label: 'Direccion principal', value: clientAddress },
                ].map((item) => (
                  <div className="summary-item" key={item.label}>
                    <div className="summary-label">{item.label}</div>
                    <div className="summary-value">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="actions">
                {editing ? (
                  <>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { resetForm(); setEditing(false); setSaveOk(''); setSaveError(''); }} disabled={saving}>Cancelar</button>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={saveProfile} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
                  </>
                ) : (
                  <button className="btn-primary" style={{ width: '100%' }} onClick={() => setEditing(true)}>Editar perfil</button>
                )}
              </div>
            </aside>

            <section className="stack">
              <div className="tabs">
                {TABS.map((tab) => (
                  <button key={tab} className={`tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {TAB_LABELS[tab]}
                  </button>
                ))}
              </div>

              <div className="card">
                <div className="head">
                  <span className="title">{TAB_LABELS[activeTab]}</span>
                  <span className="muted">{activeTab === 'personal' ? 'Informacion real del usuario' : activeTab === 'cuidados' ? `${careProfiles.length} perfiles` : activeTab === 'direcciones' ? `${addresses.length} direcciones` : 'Pendiente de conectar'}</span>
                </div>
                <div className="body">
                  {saveOk && <div className="ok">{saveOk}</div>}
                  {saveError && <div style={{ marginBottom: 10, color: '#fecaca', fontSize: 12 }}>{saveError}</div>}

                  {activeTab === 'personal' && (
                    <div className="stack">
                      <p className="muted">Aqui puedes crear el perfil si aun no existe, o actualizarlo si ya fue creado anteriormente.</p>
                      <div className="grid">
                        <div className="field">
                          <label className="label">Nombre</label>
                          <input className="input" value={(clientName ?? '').split(' ')[0] ?? ''} readOnly={!editing} />
                        </div>
                        <div className="field">
                          <label className="label">Apellidos</label>
                          <input className="input" value={(clientName ?? '').split(' ').slice(1).join(' ')} readOnly={!editing} />
                        </div>
                        <div className="field">
                          <label className="label">Telefono</label>
                          <input className="input" value={clientPhone === 'Sin telefono' ? '' : clientPhone} readOnly={!editing} />
                        </div>
                        <div className="field">
                          <label className="label">Email</label>
                          <input className="input" value={clientEmail === 'Sin correo' ? '' : clientEmail} readOnly />
                        </div>
                        <div className="field">
                          <label className="label">Fecha de nacimiento</label>
                          <input type="date" className="input" value={clientBirthdate} onChange={(event) => setProfileForm((current) => ({ ...current, fecha_nacimiento: event.target.value }))} readOnly={!editing} />
                        </div>
                        <div className="field">
                          <label className="label">Ciudad</label>
                          <input className="input" value={clientCity === 'Sin ciudad' ? '' : clientCity} onChange={(event) => setProfileForm((current) => ({ ...current, ciudad: event.target.value }))} readOnly={!editing} />
                        </div>
                        <div className="field full">
                          <label className="label">Direccion principal</label>
                          <input className="input" value={clientAddress === 'Sin direccion' ? '' : clientAddress} onChange={(event) => setProfileForm((current) => ({ ...current, direccion: event.target.value }))} readOnly={!editing} />
                        </div>
                        <div className="field full">
                          <label className="label">Resumen</label>
                          <textarea className="textarea" value={`Rol: ${user?.role ?? 'customer'}\nEspecialidad: ${user?.specialty ?? 'Cliente'}\nMiembro desde: ${memberSince(user?.created_at)}`} readOnly />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'cuidados' && (
                    <div className="stack">
                      <p className="muted">Aqui puedes registrar a cada persona o mascota que recibira el cuidado. Se guardan en el modelo de perfiles de cuidado del perfil del customer.</p>
                      <div className="list">
                        {careProfiles.length === 0 && <div className="empty">Todavia no tienes perfiles de cuidado registrados.</div>}
                        {careProfiles.map((careProfile, index) => (
                          <div className="item" key={careProfile.id ?? `care-${index}`}>
                            <div className="item-head">
                              <div>
                                <div className="item-title">{careProfile.nombre || `Perfil ${index + 1}`}</div>
                                <div className="muted">{careProfile.rol || 'Sin rol definido'}</div>
                              </div>
                              <div className="row">
                                {careProfile.rol && <span className="badge">{careProfile.rol}</span>}
                                {editing && <button className="btn-danger" onClick={() => setCareProfiles((current) => current.filter((_, currentIndex) => currentIndex !== index))}>Eliminar</button>}
                              </div>
                            </div>
                            <div className="grid">
                              <div className="field"><label className="label">Nombre</label><input className="input" value={careProfile.nombre} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, nombre: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field">
                                <label className="label">Rol</label>
                                {editing ? (
                                  <select className="input" value={careProfile.rol} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, rol: event.target.value } : item))}>
                                    <option value="">Selecciona una opcion</option>
                                    {CARE_ROLE_OPTIONS.map((role) => <option key={role} value={role}>{role}</option>)}
                                  </select>
                                ) : (
                                  <input className="input" value={careProfile.rol} readOnly />
                                )}
                              </div>
                              <div className="field"><label className="label">Especificacion</label><input className="input" value={careProfile.especificacion} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, especificacion: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Edad</label><input className="input" value={careProfile.edad} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, edad: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Movilidad</label><input className="input" value={careProfile.movilidad} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, movilidad: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Medicacion</label><input className="input" value={careProfile.medicacion} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, medicacion: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Alergias</label><input className="input" value={careProfile.alergias} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, alergias: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Diagnostico</label><input className="input" value={careProfile.diagnostico} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, diagnostico: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field full"><label className="label">Contacto de emergencia</label><input className="input" value={careProfile.contacto_emergencia} onChange={(event) => setCareProfiles((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, contacto_emergencia: event.target.value } : item))} readOnly={!editing} /></div>
                            </div>
                          </div>
                        ))}
                        {editing && <button className="btn-secondary" onClick={() => setCareProfiles((current) => [...current, emptyCareProfile()])}>Anadir perfil de cuidado</button>}
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
                              <div>
                                <div className="item-title">{address.label || `Direccion ${index + 1}`}</div>
                                <div className="muted">{[address.address_line_1, address.address_line_2, address.neighborhood].filter(Boolean).join(', ') || 'Sin direccion principal'}</div>
                              </div>
                              <div className="row">
                                {address.is_default && <span className="badge">Principal</span>}
                                {editing && !address.is_default && <button className="btn-secondary" onClick={() => setAddresses((current) => current.map((item, currentIndex) => ({ ...item, is_default: currentIndex === index })))}>Marcar principal</button>}
                                {editing && <button className="btn-danger" onClick={() => setAddresses((current) => current.filter((_, currentIndex) => currentIndex !== index))}>Eliminar</button>}
                              </div>
                            </div>
                            <div className="grid">
                              <div className="field"><label className="label">Etiqueta</label><input className="input" value={address.label} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, label: event.target.value } : item))} readOnly={!editing} /></div>
                              <div className="field"><label className="label">Tipo</label>{editing ? <select className="input" value={address.type} onChange={(event) => setAddresses((current) => current.map((item, currentIndex) => currentIndex === index ? { ...item, type: event.target.value } : item))}><option value="home">home</option><option value="office">office</option><option value="shipping">shipping</option><option value="billing">billing</option></select> : <input className="input" value={address.type} readOnly />}</div>
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

                  {activeTab !== 'personal' && activeTab !== 'cuidados' && activeTab !== 'direcciones' && (
                    <div className="placeholder">
                      Esta seccion sigue en modo vista previa. Ya dejamos conectado el cargado real de informacion basica del customer y desde aqui podemos seguir con direcciones, perfiles de cuidado o guardado.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </CustomerLayout>
    </>
  );
}
