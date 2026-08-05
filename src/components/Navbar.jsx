import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Mountain } from 'lucide-react';
import { VILLAGE, NAV_ITEMS } from '../data/village';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/85 border-b border-pine/10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 rounded-full flex items-center justify-center bg-pine shrink-0">
            <Mountain size={17} className="text-gold" strokeWidth={2} />
          </span>
          <span className="text-left leading-tight">
            <span className="block font-display font-semibold text-[15px] text-pine-deep">{VILLAGE.nama}</span>
            <span className="block text-[10.5px] text-mist -mt-0.5">{VILLAGE.kecamatan}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium">
          {NAV_ITEMS.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => (isActive ? 'text-pine font-semibold' : 'text-ink/75 hover:text-ink transition-colors')}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Buka menu navigasi">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-1 border-t border-pine/10 pt-3">
          {NAV_ITEMS.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => 'py-2 text-[14px] font-medium ' + (isActive ? 'text-pine font-semibold' : 'text-ink/75')}
            >
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
