/* ─────────────────────────────────────────────
   CarerCard — Componente reutilizable
   Úsalo en: dashboard, favoritos, búsqueda, etc.
───────────────────────────────────────────── */

export const carerCardCss = `
.card {
  background: var(--surf); border-radius: var(--r16);
  border: 1px solid rgba(255,255,255,0.85);
  box-shadow: var(--sh-md); overflow: hidden; cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.28s ease;
  display: flex; flex-direction: column;
}
.card:hover { transform: translateY(-5px); box-shadow: var(--sh-xl); }
.card:hover .card-cta-row      { max-height: 56px; opacity: 1; padding: var(--s3) var(--s4) var(--s4); }
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
.status-dot  { width: 6px; height: 6px; border-radius: 50%; }
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
  border: 2.5px solid #fff; box-shadow: var(--sh-sm); font-family: var(--ff-ui);
}

.card-body { padding: 24px var(--s4) var(--s4); flex: 1; display: flex; flex-direction: column; gap: var(--s3); }
.card-name { font-family: var(--ff-d); font-size: 15.5px; font-weight: 500; color: var(--ink); letter-spacing: -0.01em; }
.card-spec { font-size: 12px; color: var(--muted); line-height: 1.5; }
.card-tags { display: flex; gap: var(--s1); flex-wrap: wrap; }
.card-tag  { padding: 2px 8px; border-radius: var(--r4); font-size: 10px; font-weight: 600; background: #e8f0fb; color: var(--dom-deep); border: 1px solid #c8dcf5; }

.card-foot {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: auto; padding-top: var(--s3); border-top: 1px solid var(--surf-3);
}
.card-rating  { display: flex; align-items: center; gap: var(--s1); }
.stars        { color: var(--warning); font-size: 10px; letter-spacing: 1px; }
.rating-num   { font-size: 12px; font-weight: 600; color: var(--ink); }
.review-cnt   { font-size: 11px; color: var(--faint); }
.card-price   { display: flex; align-items: baseline; gap: 2px; }
.price-val    { font-family: var(--ff-d); font-size: 22px; font-weight: 500; color: var(--ink); letter-spacing: -0.02em; }
.price-unit   { font-size: 10.5px; color: var(--muted); }

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
.btn-primary:hover { background: linear-gradient(135deg, var(--dom-xdk), var(--dom-deep)); }
.btn-secondary {
  padding: 8px 14px; border-radius: var(--r8);
  background: transparent; color: var(--muted);
  font-family: var(--ff-ui); font-size: 12px; font-weight: 600;
  border: 1px solid var(--surf-3); cursor: pointer; transition: all 0.14s ease;
}
.btn-secondary:hover { border-color: #c8dcf5; color: var(--dom-dk); background: var(--surf-2); }
`;

/* ── Tipos ── */
export interface Carer {
  id: number;
  av: string;
  bg: string;
  name: string;
  spec: string;
  price: number;
  tags: string[];
  avail: boolean;
  stars: number;
  reviews: number;
  cat: string;
}

export interface CarerCardProps {
  carer: Carer;
  isFav?: boolean;
  onToggleFav?: (id: number, e: React.MouseEvent) => void;
  onBook?: (carer: Carer) => void;
  onViewProfile?: (carer: Carer) => void;
}

/* ── Helper ── */
const renderStars = (n: number) =>
  '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

/* ── Componente ── */
export default function CarerCard({
  carer: c,
  isFav = false,
  onToggleFav,
  onBook,
  onViewProfile,
}: CarerCardProps) {
  return (
    <div className="card">
      {/* Header con fondo degradado */}
      <div className="card-header">
        <div className="card-header-bg" style={{ background: c.bg }} />
        <div className="card-header-overlay" />

        {/* Badge de disponibilidad */}
        <div className="status-badge">
          <div
            className="status-dot"
            style={{ background: c.avail ? '#12B76A' : '#96b2cc' }}
          />
          <span
            className="status-text"
            style={{ color: c.avail ? '#065f46' : '#4a6b88' }}
          >
            {c.avail ? 'Disponible' : 'Ocupado/a'}
          </span>
        </div>

        {/* Botón favorito */}
        {onToggleFav && (
          <div className="card-fav" onClick={e => onToggleFav(c.id, e)}>
            {isFav ? '❤️' : '🤍'}
          </div>
        )}

        {/* Avatar */}
        <div className="card-identity">
          <div className="card-av" style={{ background: c.bg }}>{c.av}</div>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-name">{c.name}</div>
        <div className="card-spec">{c.spec}</div>
        <div className="card-tags">
          {c.tags.map(t => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>

        {/* Footer: rating y precio */}
        <div className="card-foot">
          <div className="card-rating">
            <span className="stars">{renderStars(c.stars)}</span>
            <span className="rating-num">{c.stars}</span>
            <span className="review-cnt">({c.reviews})</span>
          </div>
          <div className="card-price">
            <span className="price-val">€{c.price}</span>
            <span className="price-unit">/h</span>
          </div>
        </div>
      </div>

      {/* CTA (aparece en hover) */}
      <div className="card-cta-row">
        <button className="btn-primary" onClick={() => onBook?.(c)}>
          Reservar
        </button>
        <button className="btn-secondary" onClick={() => onViewProfile?.(c)}>
          Ver perfil
        </button>
      </div>
    </div>
  );
}