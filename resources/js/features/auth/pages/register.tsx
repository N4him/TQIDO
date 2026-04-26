import { Link } from '@inertiajs/react';
import "../../../css/auth/register.css";

const CARER_FEATURES = [
  'Perfil profesional verificado',
  'Acceso a familias en tu zona',
  'Gestión de agenda digital',
];

const CUSTOMER_FEATURES = [
  'Cuidadores verificados y seguros',
  'Búsqueda por zona y disponibilidad',
  'Comunicación directa y segura',
];

function CheckIcon() {
  return (
    <svg fill="none" stroke="#2e6fba" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="rg-cta-arrow"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

interface FeatureListProps {
  features: string[];
}

function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="rg-features">
      {features.map((f) => (
        <div key={f} className="rg-feature">
          <div className="rg-feat-check">
            <CheckIcon />
          </div>
          {f}
        </div>
      ))}
    </div>
  );
}

export default function Register() {
  const searchParams = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null;
  const isSocialSignup = searchParams?.get('social_signup') === '1';
  const resolveTarget = (role: 'carer' | 'customer') =>
    isSocialSignup ? `/register/social/${role}` : `/register/${role}`;

  return (
    <>
      {/* NAV */}
      <nav className="rg-nav">
        <Link href="/login" className="rg-login">
          Ya tengo cuenta
        </Link>
      </nav>

      <div className="rg-wrap">

        {/* ── LOGO ── */}
        <div className="rg-logo-badge">
          <img src="/assets/LOGO SPLIT.png" alt="TQido" className="rg-logo-img" />
        </div>

        {isSocialSignup && (
          <div
            style={{
              position: 'fixed',
              top: 88,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              width: 'min(720px, calc(100% - 32px))',
              padding: '12px 16px',
              borderRadius: 16,
              border: '1px solid rgba(46,111,186,0.18)',
              background: 'rgba(255,255,255,0.96)',
              boxShadow: '0 16px 40px rgba(13,35,66,0.12)',
              color: '#0b2242',
              fontSize: 13,
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            No encontramos una cuenta con ese Google. Elige si quieres continuar como cuidador/a o como familia y la creamos de una vez.
          </div>
        )}

        {/* ── LEFT PANEL — CUIDADOR ── */}
        <div
          className="rg-side rg-side-l"
          onClick={() => { window.location.href = resolveTarget('carer'); }}
        >
          <div className="rg-bg-img" />
          <div className="rg-bg-overlay" />
          <div className="rg-content">
            <div className="rg-eyebrow">
              <span className="rg-eyebrow-line" />
              Soy cuidador/a
            </div>
            <h2 className="rg-giant">
              Ofrece tu<br /><em>cuidado</em>
            </h2>
            <p className="rg-desc">
              Únete a nuestra red de cuidadores verificados
              y conecta con familias que necesitan tu ayuda.
            </p>
            <FeatureList features={CARER_FEATURES} />
            <div className="rg-cta-wrap">
              <Link
                href={resolveTarget('carer')}
                className="rg-cta rg-cta-l"
                onClick={(e) => e.stopPropagation()}
              >
                Registrarme como cuidador/a
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — CLIENTE ── */}
        <div
          className="rg-side rg-side-r"
          onClick={() => { window.location.href = resolveTarget('customer'); }}
        >
          <div className="rg-bg-img" />
          <div className="rg-bg-overlay" />
          <div className="rg-content">
            <div className="rg-eyebrow">
              Busco un cuidador/a
              <span className="rg-eyebrow-line" />
            </div>
            <h2 className="rg-giant">
              Encuentra el <em>cuidado</em>
            </h2>
            <p className="rg-desc">
              Conecta con cuidadores verificados para tus
              seres queridos, cuando más lo necesitas.
            </p>
            <FeatureList features={CUSTOMER_FEATURES} />
            <div className="rg-cta-wrap">
              <Link
                href={resolveTarget('customer')}
                className="rg-cta rg-cta-r"
                onClick={(e) => e.stopPropagation()}
              >
                Registrarme como familia
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
