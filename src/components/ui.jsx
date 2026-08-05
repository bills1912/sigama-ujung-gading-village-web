export function SectionTag({ children }) {
  return (
    <div className="font-mono inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-gold-ink">
      <span className="inline-block w-[18px] h-[1.5px] bg-gold-ink" />
      {children}
    </div>
  );
}

export function Badge({ label, style }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
      style={{ background: style.bg, color: style.fg }}
    >
      {label}
    </span>
  );
}

export function StatChip({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/10 border border-white/15">
      <Icon size={18} className="text-gold shrink-0" strokeWidth={1.8} />
      <div className="leading-tight">
        <div className="font-mono text-white text-base font-semibold">{value}</div>
        <div className="text-[11px] text-white/65">{label}</div>
      </div>
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="card rounded-2xl p-5 flex items-start gap-4">
      <div className="rounded-xl p-2.5 shrink-0 bg-pine/10">
        <Icon size={20} className="text-pine" strokeWidth={1.8} />
      </div>
      <div>
        <div className="font-mono text-2xl font-semibold text-pine-deep">{value}</div>
        <div className="text-sm text-mist mt-0.5">{label}</div>
        {sub && <div className="text-xs text-mist mt-1">{sub}</div>}
      </div>
    </div>
  );
}

export function OrgNode({ primary, title, sub }) {
  return (
    <div className={'org-node' + (primary ? ' primary' : '')}>
      <div className="font-semibold">{title}</div>
      {sub && <div className={primary ? 'text-white/70 text-[11px] mt-0.5' : 'text-mist text-[11px] mt-0.5'}>{sub}</div>}
    </div>
  );
}

/** Merender satu node beserta seluruh keturunannya secara rekursif
 *  sebagai <li><ul>...</ul></li> mengikuti struktur CSS .org-tree. */
export function OrgTreeNode({ node }) {
  return (
    <li>
      <OrgNode primary={node.primary} title={node.title} sub={node.sub} />
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, i) => (
            <OrgTreeNode key={child.title + i} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Bagan struktur organisasi lengkap. `data` mengikuti bentuk satu
 *  entri di ORG_STRUCTURES (lihat src/data/village.js). */
export function OrgTree({ data }) {
  return (
    <div className="org-tree">
      <ul>
        <OrgTreeNode node={data} />
      </ul>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="bg-pine relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-28 pb-14 md:pt-32 md:pb-16 relative z-10">
        <SectionTagLight>{eyebrow}</SectionTagLight>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mt-3">{title}</h1>
        {description && <p className="text-white/70 max-w-2xl mt-4 text-[14.5px] leading-relaxed">{description}</p>}
      </div>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '56px' }} aria-hidden="true">
        <path d="M0,70 C300,30 600,90 900,55 C1100,32 1300,80 1440,50 L1440,120 L0,120 Z" fill="#0F2A1E" opacity="0.9" />
      </svg>
    </section>
  );
}

function SectionTagLight({ children }) {
  return (
    <div className="font-mono inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-gold">
      <span className="inline-block w-[18px] h-[1.5px] bg-gold" />
      {children}
    </div>
  );
}