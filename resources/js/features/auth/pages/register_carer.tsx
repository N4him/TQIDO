import { useState, useRef, KeyboardEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, ChevronLeft, Upload, X, Check } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

interface FormData {
    name: string; email: string; phone: string;
    password: string; password_confirmation: string;
    terms: boolean; data_consent: boolean;
    dni: string; birth_date: string; address: string;
    city: string; postal_code: string;
    zones: string[]; languages: string[];
    photo: File | null; description: string;
    care_types: string[]; experience: string;
    certifications: string[]; availability: string[];
    dni_front: File | null; dni_back: File | null;
    work_permit: boolean; extra_docs: File[];
    conduct_code: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CARE_TYPES = [
    { id: 'elderly', label: 'Personas mayores', sub: 'Asistencia y acompañamiento' },
    { id: 'children', label: 'Niños', sub: 'Cuidado y educación' },
    { id: 'pets', label: 'Mascotas', sub: 'Paseo y cuidado animal' },
];

const EXPERIENCE_OPTS = ['0–1', '1–3', '3–5', '5–10', '+10'];

const CERTIFICATIONS = [
    'Primeros auxilios', 'Grado en enfermería', 'Técnico en cuidados',
    'Certificado Alzheimer', 'Fisioterapia', 'Psicología',
    'Pedagogía', 'Cruz Roja', 'Carnet de conducir',
];

const AVAILABILITY_OPTS = [
    'Trabajo en fin de semana', 'Horario nocturno', 'Jornada completa',
    'Media jornada', 'Por horas', 'Trabajo interno', 'Trabajo externo', 'Urgencias disponible',
];

const STEPS = [
    { num: 1, label: 'Cuenta',     sub: 'Acceso' },
    { num: 2, label: 'Datos',      sub: 'Personales' },
    { num: 3, label: 'Perfil',     sub: 'Profesional' },
    { num: 4, label: 'Documentos', sub: 'Verificación' },
];

// ─── Style helpers ────────────────────────────────────────────────────────────
const dmSans  = "'DM Sans', sans-serif";
const dmSerif = "'DM Serif Display', serif";
const LOGO_WIDTH = 80;

const inputCls = [
    'w-full border border-[#e2e8f0] rounded-xl px-4 py-3',
    'text-sm text-[#0e2d5a] placeholder-[#94a3b8]',
    'focus:outline-none focus:border-[#2e6fba] focus:ring-2 focus:ring-[#2e6fba]/20',
    'transition-all bg-white',
].join(' ');

// ─── Utilities ────────────────────────────────────────────────────────────────
function toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

// ─── Tag Input ────────────────────────────────────────────────────────────────
// Free-text input: press Enter or comma to add a tag, Backspace to remove last.
function TagInput({
    label, hint, placeholder, tags, onChange,
}: {
    label: string;
    hint?: string;
    placeholder: string;
    tags: string[];
    onChange: (tags: string[]) => void;
}) {
    const [input, setInput] = useState('');

    function addTag(raw: string) {
        const value = raw.trim();
        if (value && !tags.includes(value)) onChange([...tags, value]);
        setInput('');
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    }

    return (
        <div>
            <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>
                {label}
            </label>
            {hint && (
                <p className="text-xs mb-2" style={{ fontFamily: dmSans, color: '#5a96d4' }}>{hint}</p>
            )}
            <div
                className="min-h-[48px] w-full border border-[#e2e8f0] rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center bg-white focus-within:border-[#2e6fba] focus-within:ring-2 focus-within:ring-[#2e6fba]/20 transition-all cursor-text"
                onClick={e => (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus()}
            >
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2e6fba] text-white text-xs font-semibold flex-shrink-0"
                        style={{ fontFamily: dmSans }}
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); onChange(tags.filter(t => t !== tag)); }}
                            className="hover:opacity-70 transition-opacity leading-none"
                        >
                            <X size={10} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    onBlur={() => { if (input.trim()) addTag(input); }}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] text-sm text-[#0e2d5a] placeholder-[#94a3b8] outline-none bg-transparent"
                    style={{ fontFamily: dmSans }}
                />
            </div>
            <p className="text-[10px] mt-1.5" style={{ fontFamily: dmSans, color: '#94a3b8' }}>
                Pulsa{' '}
                <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>Enter</kbd>
                {' '}o{' '}
                <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>,</kbd>
                {' '}para añadir ·{' '}
                <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>⌫</kbd>
                {' '}para eliminar el último
            </p>
        </div>
    );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{ fontFamily: dmSans }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                active
                    ? 'bg-[#2e6fba] border-[#2e6fba] text-white'
                    : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#2e6fba] hover:text-[#2e6fba]'
            }`}
        >
            {active && '✓ '}{label}
        </button>
    );
}

function DropZone({ label, file, onFile, onClear }: {
    label: string; file: File | null; onFile: (f: File) => void; onClear: () => void;
}) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div className="flex-1">
            <p className="text-sm font-semibold text-[#0e2d5a] mb-2" style={{ fontFamily: dmSans }}>{label}</p>
            {file ? (
                <div className="border-2 border-[#2e6fba] rounded-xl p-4 flex items-center justify-between bg-[#f0f6ff]">
                    <span className="text-xs text-[#2e6fba] font-semibold truncate" style={{ fontFamily: dmSans }}>{file.name}</span>
                    <button type="button" onClick={onClear} className="text-red-400 hover:text-red-600 ml-2 flex-shrink-0">
                        <X size={15} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => ref.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
                    className="border-2 border-dashed border-[#a4c8ee] rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-[#2e6fba] hover:bg-[#f0f6ff] transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-[#e8f0fb] flex items-center justify-center">
                        <Upload size={17} className="text-[#2e6fba]" />
                    </div>
                    <p className="text-xs text-center text-[#475569]" style={{ fontFamily: dmSans }}>
                        Arrastra aquí o{' '}
                        <span className="text-[#2e6fba] font-semibold">selecciona archivo</span>
                    </p>
                    <p className="text-[10px] text-[#94a3b8]" style={{ fontFamily: dmSans }}>JPG, PNG o PDF · Máx. 10 MB</p>
                </div>
            )}
            <input
                ref={ref}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }}
            />
        </div>
    );
}

// ─── Mobile Top Bar ───────────────────────────────────────────────────────────
function MobileTopBar({ current }: { current: Step }) {
    const idx = current - 1;
    const logoLeft = `${idx * 25 + 12.5}%`;

    return (
        <div className="lg:hidden sticky top-0 z-20 flex-shrink-0" style={{ background: '#0e2d5a' }}>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }} />

            <div className="relative z-10 px-4 pt-3 pb-3">
                <div className="relative">

                    {/* Floating logo */}
                    <div style={{
                        position: 'absolute', top: 0, left: logoLeft,
                        transform: 'translateX(-50%)',
                        transition: 'left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '2px', pointerEvents: 'none', height: '40px',
                        justifyContent: 'flex-end', zIndex: 10,
                    }}>
                        <img src="../assets/Logo_symbol.png" alt="Logo"
                            style={{ width: 24, height: 'auto', objectFit: 'contain' }} />
                        <div style={{
                            width: 0, height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderTop: '5px solid rgba(164,200,238,0.7)',
                        }} />
                    </div>

                    {/* Step row */}
                    <div className="relative flex w-full" style={{ paddingTop: '40px' }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} className="absolute h-0.5 rounded-full transition-all duration-500"
                                style={{
                                    left: `calc(${i * 25 + 12.5}% + 16px)`,
                                    right: `calc(${(3 - i) * 25 - 12.5}% + 16px)`,
                                    top: '16px',
                                    background: current > i + 1 ? '#2e6fba' : 'rgba(46,111,186,0.2)',
                                }} />
                        ))}

                        {STEPS.map(s => {
                            const done   = current > s.num;
                            const active = current === s.num;
                            return (
                                <div key={s.num} className="flex flex-col items-center" style={{ width: '25%' }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                                        style={{
                                            background: done ? '#2e6fba' : active ? 'white' : 'rgba(46,111,186,0.15)',
                                            border: active ? '2px solid #2e6fba' : 'none',
                                            boxShadow: active ? '0 0 0 4px rgba(46,111,186,0.25), 0 2px 12px rgba(46,111,186,0.4)' : 'none',
                                            position: 'relative', zIndex: 1,
                                        }}>
                                        {done
                                            ? <Check size={14} color="white" strokeWidth={2.5} />
                                            : <span className="text-xs font-bold" style={{ fontFamily: dmSans, color: active ? '#2e6fba' : 'rgba(113,174,221,0.4)' }}>{s.num}</span>
                                        }
                                    </div>
                                    <span className="text-[9px] font-semibold leading-none text-center mt-1"
                                        style={{ fontFamily: dmSans, color: active ? '#ffffff' : done ? '#71aedd' : 'rgba(113,174,221,0.35)' }}>
                                        {s.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
function Sidebar({ current }: { current: Step }) {
    return (
        <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col" style={{ background: '#0e2d5a' }}>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div className="relative z-10 flex flex-col h-full px-7 py-8">
                <div className="mb-8 flex justify-center">
                    <img src="../assets/Logo_symbol.png" alt="Logo"
                        style={{ width: LOGO_WIDTH, height: 'auto', objectFit: 'contain' }} />
                </div>

                <nav className="flex flex-1">
                    {/* Circle column */}
                    <div className="flex flex-col items-center" style={{ width: '40px', flexShrink: 0 }}>
                        {STEPS.map((s, i) => {
                            const done   = current > s.num;
                            const active = current === s.num;
                            const isLast = i === STEPS.length - 1;
                            return (
                                <div key={s.num} className="flex flex-col items-center" style={{ flex: isLast ? '0 0 auto' : 1 }}>
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                                            style={{
                                                background: done ? '#2e6fba' : active ? 'white' : 'rgba(46,111,186,0.12)',
                                                border: active ? '2px solid #2e6fba' : done ? 'none' : '1.5px solid rgba(46,111,186,0.25)',
                                                boxShadow: active ? '0 0 0 6px rgba(46,111,186,0.18), 0 4px 16px rgba(46,111,186,0.35)' : 'none',
                                            }}>
                                            {done
                                                ? <Check size={16} color="white" strokeWidth={2.5} />
                                                : active
                                                    ? <span className="text-base font-black" style={{ color: '#2e6fba', fontFamily: dmSans }}>{s.num}</span>
                                                    : <span className="text-sm font-semibold" style={{ color: 'rgba(113,174,221,0.4)', fontFamily: dmSans }}>{s.num}</span>
                                            }
                                        </div>
                                        {active && (
                                            <div className="absolute inset-0 rounded-full animate-ping"
                                                style={{ background: 'rgba(46,111,186,0.2)', animationDuration: '2s' }} />
                                        )}
                                    </div>
                                    {!isLast && (
                                        <div className="flex-1 w-0.5 my-1 rounded-full transition-all duration-500"
                                            style={{ background: done ? '#2e6fba' : 'rgba(46,111,186,0.2)', minHeight: '24px' }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Label column */}
                    <div className="flex flex-col flex-1 pl-3.5">
                        {STEPS.map((s, i) => {
                            const done   = current > s.num;
                            const active = current === s.num;
                            const isLast = i === STEPS.length - 1;
                            return (
                                <div key={s.num} className="flex items-start" style={{ flex: isLast ? '0 0 auto' : 1 }}>
                                    <div className="flex items-center justify-between w-full" style={{ height: '40px' }}>
                                        <div>
                                            <p className="text-sm font-semibold leading-tight transition-all duration-300"
                                                style={{ fontFamily: dmSans, color: active ? '#ffffff' : done ? '#a4c8ee' : 'rgba(113,174,221,0.4)' }}>
                                                {s.label}
                                            </p>
                                            <p className="text-xs leading-tight mt-0.5 transition-all duration-300"
                                                style={{ fontFamily: dmSans, color: active ? '#71aedd' : done ? 'rgba(164,200,238,0.5)' : 'rgba(113,174,221,0.25)' }}>
                                                {s.sub}
                                            </p>
                                        </div>
                                        {done && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                                style={{ fontFamily: dmSans, background: 'rgba(46,111,186,0.2)', color: '#71aedd', border: '1px solid rgba(46,111,186,0.3)' }}>
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </nav>

                {/* Review info box */}
                <div className="mt-8 rounded-2xl p-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(164,200,238,0.12)', backdropFilter: 'blur(8px)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            style={{ background: 'rgba(46,111,186,0.3)' }}>⏱</div>
                        <span className="text-xs font-semibold" style={{ color: '#a4c8ee', fontFamily: dmSans }}>
                            Tiempo de revisión
                        </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(164,200,238,0.7)', fontFamily: dmSans }}>
                        Tu solicitud será revisada en{' '}
                        <strong style={{ color: 'white' }}>24–48 horas</strong>{' '}
                        tras completar el registro.
                    </p>
                </div>
            </div>
        </aside>
    );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ data, setData, errors }: any) {
    const [showPass, setShowPass] = useState(false);
    const [showConf, setShowConf] = useState(false);

    const checkboxes = [
        {
            key: 'terms',
            label: (
                <>
                    Acepto los{' '}
                    <a href="#" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Términos y Condiciones</a>
                    {' '}y la{' '}
                    <a href="#" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Política de Privacidad</a>
                </>
            ),
        },
        {
            key: 'data_consent',
            label: 'Consiento el tratamiento de mis datos personales para la gestión de la plataforma',
        },
    ];

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
                Crea tu cuenta
            </h2>
            <p className="text-sm mb-5 sm:mb-6" style={{ fontFamily: dmSans, color: '#475569' }}>
                Paso 1 de 4 · Información de acceso
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Nombre completo</label>
                    <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="María García López"
                        value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Correo electrónico</label>
                    <input className={inputCls} style={{ fontFamily: dmSans }} type="email" placeholder="correo@ejemplo.com"
                        value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Teléfono</label>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 border border-[#e2e8f0] rounded-xl px-3 py-3 bg-white min-w-[80px] flex-shrink-0">
                            <span>🇪🇸</span>
                            <span className="text-sm font-semibold" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>+34</span>
                        </div>
                        <input className={`${inputCls} flex-1`} style={{ fontFamily: dmSans }} placeholder="612 345 678"
                            value={data.phone} onChange={e => setData('phone', e.target.value)} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Contraseña</label>
                    <div className="relative">
                        <input className={inputCls} style={{ fontFamily: dmSans }}
                            type={showPass ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
                            value={data.password} onChange={e => setData('password', e.target.value)} />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2e6fba] transition-colors">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Confirmar contraseña</label>
                    <div className="relative">
                        <input className={inputCls} style={{ fontFamily: dmSans }}
                            type={showConf ? 'text' : 'password'} placeholder="Repite tu contraseña"
                            value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                        <button type="button" onClick={() => setShowConf(!showConf)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#2e6fba] transition-colors">
                            {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-3 pt-1">
                    {checkboxes.map(({ key, label }) => (
                        <label key={key} className="flex items-start gap-2.5 cursor-pointer">
                            <div
                                onClick={() => setData(key, !data[key])}
                                className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                style={{ background: data[key] ? '#2e6fba' : 'white', borderColor: data[key] ? '#2e6fba' : '#cbd5e0' }}
                            >
                                {data[key] && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm leading-relaxed" style={{ fontFamily: dmSans, color: '#475569' }}>{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="relative my-5 sm:my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e2e8f0]" /></div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs text-[#94a3b8]" style={{ fontFamily: dmSans }}>o</span>
                </div>
            </div>

            <button type="button"
                className="w-full border border-[#e2e8f0] rounded-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#0e2d5a] hover:bg-[#f8fafc] hover:border-[#2e6fba] transition-all duration-200"
                style={{ fontFamily: dmSans }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                    <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                    <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
                    <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
                </svg>
                Registrarse con Google
            </button>

            <p className="text-center text-sm mt-4" style={{ fontFamily: dmSans, color: '#475569' }}>
                ¿Ya tienes cuenta?{' '}
                <a href="/login" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Iniciar sesión</a>
            </p>
        </div>
    );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ data, setData, errors }: any) {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
                Datos personales
            </h2>
            <p className="text-sm mb-5 sm:mb-6" style={{ fontFamily: dmSans, color: '#475569' }}>
                Paso 2 de 4 · Información de identificación
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>DNI / NIE</label>
                    <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="12345678A"
                        value={data.dni} onChange={e => setData('dni', e.target.value)} />
                    <p className="text-xs mt-1" style={{ fontFamily: dmSans, color: '#94a3b8' }}>Documento Nacional de Identidad o NIE para extranjeros</p>
                    {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Fecha de nacimiento</label>
                    <input className={inputCls} style={{ fontFamily: dmSans }} type="date"
                        value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Dirección</label>
                    <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="Calle Mayor, 12, 3º B"
                        value={data.address} onChange={e => setData('address', e.target.value)} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Ciudad</label>
                        <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="Madrid"
                            value={data.city} onChange={e => setData('city', e.target.value)} />
                    </div>
                    <div className="sm:w-32">
                        <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Código postal</label>
                        <input className={inputCls} style={{ fontFamily: dmSans }} placeholder="28001"
                            value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} />
                    </div>
                </div>

                {/* ── Área Ocupacional — free-text tag input ── */}
                <TagInput
                    label="Área Ocupacional"
                    hint="Escribe el barrio o distrito y pulsa Enter para añadirlo"
                    placeholder="Ej: Chamberí, Retiro, Salamanca..."
                    tags={data.zones}
                    onChange={tags => setData('zones', tags)}
                />

                {/* ── Idiomas — free-text tag input ── */}
                <TagInput
                    label="Idiomas"
                    hint="Escribe un idioma y pulsa Enter para añadirlo"
                    placeholder="Ej: Español, Inglés, Francés..."
                    tags={data.languages}
                    onChange={tags => setData('languages', tags)}
                />
            </div>
        </div>
    );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({ data, setData }: any) {
    const photoRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    function handlePhoto(file: File) {
        setData('photo', file);
        setPhotoPreview(URL.createObjectURL(file));
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
                Perfil profesional
            </h2>
            <p className="text-sm mb-5 sm:mb-6" style={{ fontFamily: dmSans, color: '#475569' }}>
                Paso 3 de 4 · Cuéntanos sobre ti
            </p>

            <div className="space-y-5">
                {/* Photo upload */}
                <div className="flex flex-col items-center gap-1.5">
                    <div className="relative w-20 h-20 cursor-pointer" onClick={() => photoRef.current?.click()}>
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#e2e8f0] bg-[#e8f0fb]">
                            {photoPreview
                                ? <img src={photoPreview} className="w-full h-full object-cover" alt="Foto" />
                                : <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                            }
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#2e6fba' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M12 15.2A3.2 3.2 0 1 1 15.2 12 3.2 3.2 0 0 1 12 15.2zM9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3zm3 13a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                            </svg>
                        </div>
                        {photoPreview && (
                            <button type="button"
                                onClick={e => { e.stopPropagation(); setPhotoPreview(null); setData('photo', null); }}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                                <X size={10} />
                            </button>
                        )}
                    </div>
                    <p className="text-xs" style={{ fontFamily: dmSans, color: '#94a3b8' }}>Haz clic para cambiar la foto</p>
                    <input ref={photoRef} type="file" className="hidden" accept="image/*"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handlePhoto(f); }} />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Descripción personal</label>
                    <div className="relative">
                        <textarea
                            className="w-full border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0e2d5a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2e6fba] focus:ring-2 focus:ring-[#2e6fba]/20 transition-all bg-white resize-none h-28"
                            style={{ fontFamily: dmSans }}
                            placeholder="Cuéntanos sobre tu experiencia, motivación y forma de trabajar..."
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            maxLength={400}
                        />
                        <span className="absolute bottom-2 right-3 text-[10px] text-[#94a3b8]" style={{ fontFamily: dmSans }}>
                            {data.description.length}/400
                        </span>
                    </div>
                </div>

                {/* Care types */}
                <div>
                    <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Tipo de cuidado que ofreces</label>
                    <p className="text-xs mb-2.5" style={{ fontFamily: dmSans, color: '#94a3b8' }}>Puedes seleccionar más de uno</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {CARE_TYPES.map(ct => {
                            const active = data.care_types.includes(ct.id);
                            return (
                                <button key={ct.id} type="button"
                                    onClick={() => setData('care_types', toggle(data.care_types, ct.id))}
                                    className="flex-1 rounded-xl p-4 text-center relative transition-all duration-200"
                                    style={{
                                        border: `2px solid ${active ? '#2e6fba' : '#e2e8f0'}`,
                                        background: active ? 'rgba(46,111,186,0.06)' : 'white',
                                    }}>
                                    {active && (
                                        <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#2e6fba' }}>
                                            <Check size={11} className="text-white" />
                                        </div>
                                    )}
                                    <p className="text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>{ct.label}</p>
                                    <p className="text-xs" style={{ fontFamily: dmSans, color: '#475569' }}>{ct.sub}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Años de experiencia</label>
                    <div className="flex gap-2 flex-wrap">
                        {EXPERIENCE_OPTS.map(opt => (
                            <button key={opt} type="button"
                                onClick={() => setData('experience', opt)}
                                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                                style={{
                                    fontFamily: dmSans,
                                    background: data.experience === opt ? '#1a4a8a' : 'white',
                                    borderColor: data.experience === opt ? '#1a4a8a' : '#e2e8f0',
                                    color: data.experience === opt ? 'white' : '#475569',
                                }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Certificaciones y formación</label>
                    <p className="text-xs mb-2.5" style={{ fontFamily: dmSans, color: '#5a96d4' }}>Selecciona tus titulaciones y certificados relevantes</p>
                    <div className="flex flex-wrap gap-2">
                        {CERTIFICATIONS.map(c => (
                            <Chip key={c} label={c} active={data.certifications.includes(c)}
                                onClick={() => setData('certifications', toggle(data.certifications, c))} />
                        ))}
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <label className="block text-sm font-semibold mb-1" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Preferencias y disponibilidad</label>
                    <p className="text-xs mb-2.5" style={{ fontFamily: dmSans, color: '#5a96d4' }}>Indica tu disponibilidad y preferencias de trabajo</p>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABILITY_OPTS.map(a => (
                            <Chip key={a} label={a} active={data.availability.includes(a)}
                                onClick={() => setData('availability', toggle(data.availability, a))} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────
function Step4({ data, setData }: any) {
    const extraRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: dmSerif, color: '#0e2d5a' }}>
                Documentación
            </h2>
            <p className="text-sm mb-4" style={{ fontFamily: dmSans, color: '#475569' }}>
                Paso 4 de 4 · Verificación de identidad
            </p>

            <div className="rounded-xl p-3.5 mb-5" style={{ background: '#fffbeb', border: '1px solid #f6e05e' }}>
                <p className="text-sm" style={{ fontFamily: dmSans, color: '#744210' }}>
                    Tus documentos se almacenan de forma cifrada y solo son accesibles por el equipo de verificación de TQido.
                </p>
            </div>

            <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                    <DropZone label="DNI / NIE — Cara frontal" file={data.dni_front}
                        onFile={f => setData('dni_front', f)} onClear={() => setData('dni_front', null)} />
                    <DropZone label="DNI / NIE — Cara trasera" file={data.dni_back}
                        onFile={f => setData('dni_back', f)} onClear={() => setData('dni_back', null)} />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                    <div
                        className="relative w-10 h-6 rounded-full transition-all duration-200 flex-shrink-0"
                        style={{ background: data.work_permit ? '#2e6fba' : '#e2e8f0' }}
                        onClick={() => setData('work_permit', !data.work_permit)}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${data.work_permit ? 'left-5' : 'left-1'}`} />
                    </div>
                    <span className="text-sm font-medium" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>
                        Tengo permiso de trabajo / residencia
                    </span>
                </label>

                <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>
                        Certificados y titulaciones (opcional)
                    </label>
                    <div onClick={() => extraRef.current?.click()}
                        className="border-2 border-dashed border-[#e2e8f0] rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-[#2e6fba] hover:bg-[#f0f6ff] transition-all">
                        <div className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center">
                            <Upload size={17} className="text-[#94a3b8]" />
                        </div>
                        <p className="text-xs text-center" style={{ fontFamily: dmSans, color: '#475569' }}>
                            <span className="font-semibold" style={{ color: '#2e6fba' }}>Añadir archivos</span>
                            {' '}— Sube titulaciones, certificados o cualquier documento que acredite tu formación
                        </p>
                    </div>
                    {data.extra_docs.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {data.extra_docs.map((f: File, i: number) => (
                                <div key={i} className="flex items-center gap-1 rounded-lg px-3 py-1"
                                    style={{ background: 'rgba(46,111,186,0.08)', border: '1px solid rgba(46,111,186,0.2)' }}>
                                    <span className="text-xs truncate max-w-[140px]" style={{ color: '#2e6fba', fontFamily: dmSans }}>{f.name}</span>
                                    <button type="button"
                                        onClick={() => setData('extra_docs', data.extra_docs.filter((_: File, j: number) => j !== i))}>
                                        <X size={11} className="text-[#94a3b8]" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {['JPG', 'PNG', 'PDF', 'Máx. 10 MB por archivo'].map(t => (
                            <span key={t} className="px-2 py-0.5 rounded text-[10px]"
                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8', fontFamily: dmSans }}>
                                {t}
                            </span>
                        ))}
                    </div>
                    <input ref={extraRef} type="file" className="hidden" multiple accept=".jpg,.jpeg,.png,.pdf"
                        onChange={e => {
                            const files = Array.from(e.target.files || []);
                            setData('extra_docs', [...data.extra_docs, ...files]);
                        }} />
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#f0f6ff]"
                    style={{ border: '1px solid #e2e8f0' }}>
                    <div onClick={() => setData('conduct_code', !data.conduct_code)}
                        className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{ background: data.conduct_code ? '#2e6fba' : 'white', borderColor: data.conduct_code ? '#2e6fba' : '#cbd5e0' }}>
                        {data.conduct_code && <Check size={10} className="text-white" />}
                    </div>
                    <div>
                        <p className="text-sm font-semibold" style={{ fontFamily: dmSans, color: '#0e2d5a' }}>Código de conducta TQido</p>
                        <p className="text-sm mt-0.5" style={{ fontFamily: dmSans, color: '#475569' }}>
                            Acepto el{' '}
                            <a href="#" className="font-semibold hover:underline" style={{ color: '#2e6fba' }}>Código de Conducta de TQido</a>
                            {' '}y me comprometo a ofrecer un servicio de cuidado seguro, respetuoso y profesional en todo momento.
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function RegisterCarer() {
    const [step, setStep] = useState<Step>(1);

    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '', email: '', phone: '', password: '', password_confirmation: '',
        terms: false, data_consent: false,
        dni: '', birth_date: '', address: '', city: '', postal_code: '',
        zones: [], languages: [],
        photo: null, description: '', care_types: [], experience: '',
        certifications: [], availability: [],
        dni_front: null, dni_back: null, work_permit: false,
        extra_docs: [], conduct_code: false,
    });

    const next = () => { if (step < 4) setStep(s => (s + 1) as Step); };
    const back = () => { if (step > 1) setStep(s => (s - 1) as Step); };

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (step < 4) { next(); return; }
        post(route('register.carer'));
    }

    return (
        // ── height 100dvh, overflow hidden on root → only <main> scrolls ──
        <div
            className="flex flex-col lg:flex-row"
            style={{ height: '100dvh', overflow: 'hidden', background: '#f8fafc' }}
        >
            <MobileTopBar current={step} />
            <Sidebar current={step} />

            <main className="flex-1 overflow-y-auto flex justify-center px-4 sm:px-6 py-6 sm:py-10 lg:py-12">
                <form onSubmit={submit} className="w-full max-w-[500px] h-fit">
                    <div className="bg-white rounded-2xl p-5 sm:p-8"
                        style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(30,95,170,0.08)' }}>

                        {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
                        {step === 2 && <Step2 data={data} setData={setData} errors={errors} />}
                        {step === 3 && <Step3 data={data} setData={setData} />}
                        {step === 4 && <Step4 data={data} setData={setData} />}

                        <div className={`flex mt-6 sm:mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                            {step > 1 && (
                                <button type="button" onClick={back}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#f8fafc]"
                                    style={{ fontFamily: dmSans, border: '1px solid #e2e8f0', color: '#475569' }}>
                                    <ChevronLeft size={15} />
                                    Atrás
                                </button>
                            )}
                            <button type="submit" disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 hover:opacity-90"
                                style={{ fontFamily: dmSans, background: '#2e6fba', boxShadow: '0 6px 24px rgba(30,95,170,0.35)' }}>
                                {step === 4 ? 'Enviar solicitud' : 'Continuar'} →
                            </button>
                        </div>
                    </div>

                    {/* Review card — mobile only */}
                    <div className="lg:hidden mt-4 rounded-2xl p-4"
                        style={{ background: '#0e2d5a', border: '1px solid rgba(164,200,238,0.12)' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">⏱</span>
                            <span className="text-xs font-semibold" style={{ color: '#a4c8ee', fontFamily: dmSans }}>Tiempo de revisión</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(164,200,238,0.7)', fontFamily: dmSans }}>
                            Tu solicitud será revisada en{' '}
                            <strong style={{ color: 'white' }}>24–48 horas</strong>{' '}
                            tras completar el registro.
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
}

function route(arg0: string): string {
    throw new Error('Function not implemented.');
}