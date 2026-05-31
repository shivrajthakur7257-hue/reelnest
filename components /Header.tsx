'use client';

import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-600">
            <Sparkles size={20} />
          </span>
          Reelnest Tools
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="/#tools" className="rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white">
            Explore Tools
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black p-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block py-3 text-white/80">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}