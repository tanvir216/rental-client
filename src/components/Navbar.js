'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import Logo from './Logo';
const THEMES = ['rentlight', 'rentdark'];
export default function Navbar() {
  const { user, role, logout } = useAuth();
  const path = usePathname();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const t = THEMES.includes(saved) ? saved : 'rentlight';
    document.documentElement.setAttribute('data-theme', t); setDark(t === 'rentdark');
    const on = () => setScrolled(window.scrollY > 8); on();
    window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on);
  }, []);
  const toggle = () => { const t = dark ? 'rentlight' : 'rentdark'; localStorage.setItem('theme', t); document.documentElement.setAttribute('data-theme', t); setDark(!dark); };
  const cls = (href) => `rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary/15 ${path === href ? 'bg-primary/20 brand-ink' : ''}`;
  const links = (<>
    <li><Link href="/" className={cls('/')}>Home</Link></li><li><Link href="/equipment" className={cls('/equipment')}>All Equipment</Link></li>
    <li><Link href="/#how" className={cls('')}>How It Works</Link></li><li><Link href="/#contact" className={cls('')}>Contact Us</Link></li>
    {user && <li><Link href={`/dashboard/${role || 'customer'}`} className={cls(`/dashboard/${role || 'customer'}`)}>Dashboard</Link></li>}
    {!user && <><li className="lg:hidden"><Link href="/login" className={cls('/login')}>Login</Link></li><li className="lg:hidden"><Link href="/register" className={cls('/register')}>Register</Link></li></>}
  </>);
  return (
    <header className={`sticky top-0 z-40 border-b transition-all ${scrolled ? 'bg-base-100/85 shadow-lg backdrop-blur-xl' : 'bg-base-100/70 backdrop-blur-md'}`} style={{ borderColor: 'var(--line)' }}>
      <div className="container-x navbar min-h-[4.5rem] px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h10" /></svg></label>
            <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-60 gap-1 rounded-2xl bg-base-100 p-3 shadow-2xl" style={{ border: '1px solid var(--line)' }}>{links}</ul>
          </div>
          <Link href="/" aria-label="RentGear home"><Logo /></Link>
        </div>
        <div className="navbar-center hidden lg:flex"><ul className="menu menu-horizontal gap-1 px-1">{links}</ul></div>
        <div className="navbar-end gap-2">
          <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
            {dark
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}
          </button>
          {user
            ? <><img src={user.image || 'https://i.ibb.co/2kRjVHB/user.png'} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-100" /><button onClick={logout} className="btn btn-primary btn-sm">Logout</button></>
            : <div className="hidden gap-2 lg:flex"><Link href="/login" className="btn btn-ghost btn-sm">Login</Link><Link href="/register" className="btn btn-primary btn-sm">Register</Link></div>}
        </div>
      </div>
    </header>);
}
