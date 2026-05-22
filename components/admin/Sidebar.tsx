'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Download,
  Mail,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/downloads', label: 'Downloads', icon: Download },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('reelnest_admin');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#080c16] border-r border-white/10 p-5 hidden md:block">
      <h2 className="text-2xl font-bold text-white mb-8">
        Reel<span className="text-red-500">Nest</span>
      </h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition"
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="absolute bottom-6 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}