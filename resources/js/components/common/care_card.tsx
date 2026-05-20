/* ─────────────────────────────────────────────
   CarerCard — Componente reutilizable v3
   Estética: foto full-card + panel glassmorphism
   - Iconos de tipo de servicio (👴 👶 🐾)
   - Precio (con o sin oferta) en footer izquierdo
   - Sin contador de personas
───────────────────────────────────────────── */

export const carerCardCss = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap');

.card {
  width: 255px;
  height: 370px;
  border-radius: 26px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  border: 0.5px solid rgba(255,255,255,0.2);
  display: block;
}

.card-photo {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
}
.card:hover .card-photo { transform: scale(1.05); }

.card-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0%,
    transparent 25%,
    transparent 40%,
    rgba(4,10,20,0.68) 65%,
    rgba(4,10,20,0.97) 100%
  );
}

/* ── Top ── */
.card-top {
  position: absolute;
  top: 14px; left: 14px; right: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 0.5px solid rgba(255,255,255,0.25);
  border-radius: 20px;
  padding: 4px 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; }

.card-fav {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 0.5px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.18s, transform 0.2s cubic-bezier(0.34,1.4,0.64,1);
}
.card-fav:hover { background: rgba(255,255,255,0.28); transform: scale(1.12); }

/* ── Panel glassmorphism ── */
.card-glass {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 3;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-top: 0.5px solid rgba(255,255,255,0.18);
  padding: 14px 16px 16px;
}

/* ── Fila: badge oferta + rating ── */
.card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  min-height: 22px;
}

.offer-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(251,191,36,0.2);
  border: 0.5px solid rgba(251,191,36,0.4);
  color: #fbbf24;
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 3px 9px;
  border-radius: 20px;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  color: rgba(255,255,255,0.65);
  margin-left: auto;
}
.star-icon { color: #fbbf24; }
.review-cnt { color: rgba(255,255,255,0.32); margin-left: 2px; }

/* ── Nombre ── */
.card-name {
  font-family: 'DM Serif Display', serif;
  font-size: 19px;
  color: #fff;
  margin: 0 0 3px;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.verified-badge {
  width: 17px; height: 17px;
  background: #3b82f6;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.verified-badge svg { width: 10px; height: 10px; }

.card-spec {
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  color: rgba(255,255,255,0.52);
  font-weight: 300;
  margin: 0 0 13px;
  line-height: 1.4;
}

.card-divider {
  height: 0.5px;
  background: rgba(255,255,255,0.14);
  margin-bottom: 11px;
}

/* ── Footer ── */
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* Iconos de tipo de servicio (izquierda) */
.service-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}
.svc-icon { font-size: 22px; line-height: 1; }

/* Precio + botón (derecha) */
.card-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Precio normal */
.price-plain {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  color: rgba(255,255,255,0.88);
  letter-spacing: -0.01em;
}
.price-unit {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: rgba(255,255,255,0.42);
}

/* Precio en oferta */
.price-offer-block { display: flex; flex-direction: column; align-items: flex-end; }
.price-original-val {
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  color: rgba(255,255,255,0.35);
  text-decoration: line-through;
  line-height: 1;
}
.price-offer-val {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  color: #fbbf24;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.price-offer-unit {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: rgba(251,191,36,0.6);
}

/* Botón reservar */
.btn-book {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.92);
  color: #0f172a;
  border: none;
  border-radius: 22px;
  padding: 8px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.btn-book:hover { background: #fff; transform: scale(1.04); }
`;

/* ── Tipos de servicio → emoji ── */
const SERVICE_ICONS: Record<string, string> = {
  adultos_mayores: '👴',
  ninos:           '👶',
  mascotas:        '🐾',
};

/* ── Tipos ── */
export interface CarerService {
  tipo: string;
  descripcion: string;
  precio_hora: number | null;
  precio_oferta: number | null;
  oferta_activa: boolean;
}

export interface Carer {
  id: number;
  photoUrl: string;
  name: string;
  spec: string;
  verified?: boolean;
  avail: boolean;
  stars: number;
  reviews: number;
  cat: string;
  services: CarerService[];
}

export interface CarerCardProps {
  carer: Carer;
  isFav?: boolean;
  onToggleFav?: (id: number, e: React.MouseEvent) => void;
  onBook?: (carer: Carer) => void;
}

/* ── Helpers ── */
const resolveService = (services: CarerService[], cat: string): CarerService | null => {
  const catMap: Record<string, string> = {
    adultos:  'adultos_mayores',
    ninos:    'ninos',
    mascotas: 'mascotas',
  };
  const key = catMap[cat] ?? cat;
  return (
    services.find((s) => s.tipo === key && s.precio_hora != null) ??
    services.find((s) => s.precio_hora != null) ??
    null
  );
};

const calcDiscount = (original: number, offer: number) =>
  Math.round(((original - offer) / original) * 100);

/* ── Componente ── */
export default function CarerCard({
  carer: c,
  isFav = false,
  onToggleFav,
  onBook,
}: CarerCardProps) {
  const service  = resolveService(c.services, c.cat);
  const hasOffer = Boolean(
    service?.oferta_activa &&
    service?.precio_oferta != null &&
    service?.precio_hora != null
  );
  const discount = hasOffer
    ? calcDiscount(service!.precio_hora!, service!.precio_oferta!)
    : 0;

  /* Iconos únicos de todos los servicios con precio */
  const serviceIcons = [
    ...new Set(c.services.filter((s) => s.precio_hora != null).map((s) => s.tipo)),
  ];

  return (
    <div className="card">
      {/* Foto */}
      <div
        className="card-photo"
        style={{ backgroundImage: `url('${c.photoUrl}')` }}
      />

      {/* Gradiente */}
      <div className="card-grad" />

      {/* Top */}
      <div className="card-top">
        <div className="status-badge">
          <div
            className="status-dot"
            style={{ background: c.avail ? '#4ade80' : '#94a3b8' }}
          />
          {c.avail ? 'Disponible' : 'Ocupado/a'}
        </div>

        {onToggleFav && (
          <div
            className="card-fav"
            onClick={(e) => onToggleFav(c.id, e)}
            aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            {isFav ? '❤️' : '🤍'}
          </div>
        )}
      </div>

      {/* Panel glass */}
      <div className="card-glass">

        {/* Oferta + rating */}
        <div className="card-meta-row">
          {hasOffer && (
            <div className="offer-badge">🏷️ Oferta {discount}% dto.</div>
          )}
          <div className="card-rating">
            <span className="star-icon">★</span>
            {c.stars}
            <span className="review-cnt">({c.reviews})</span>
          </div>
        </div>

        {/* Nombre */}
        <div className="card-name">
          {c.name}
          {c.verified && (
            <span className="verified-badge" aria-label="Verificado/a">
              <svg viewBox="0 0 10 10" fill="none">
                <polyline
                  points="2,5 4.2,7.2 8,3"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>

        {/* Especialidad */}
        <div className="card-spec">{c.spec}</div>

        <div className="card-divider" />

        {/* Footer */}
        <div className="card-foot">

          {/* Izquierda: iconos de servicio */}
          <div className="service-icons">
            {serviceIcons.map((tipo) => (
              <span key={tipo} className="svc-icon" title={tipo}>
                {SERVICE_ICONS[tipo] ?? '🧑'}
              </span>
            ))}
          </div>

          {/* Derecha: precio + botón */}
          <div className="card-right">
            {hasOffer ? (
              <div className="price-offer-block">
                <span className="price-original-val">€{service!.precio_hora}/h</span>
                <span className="price-offer-val">
                  €{service!.precio_oferta}
                  <span className="price-offer-unit">/h</span>
                </span>
              </div>
            ) : service?.precio_hora != null ? (
              <span className="price-plain">
                €{service.precio_hora}
                <span className="price-unit">/h</span>
              </span>
            ) : null}

            <button className="btn-book" onClick={() => onBook?.(c)}>
              Reservar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}