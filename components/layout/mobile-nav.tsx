'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Instagram, Youtube, Music, Menu } from 'lucide-react';

const mobileLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/instagram', label: 'Instagram', icon: Instagram },
  { href: '/youtube', label: 'YouTube', icon: Youtube },
  { href: '/mp3-converter', label: 'MP3', icon: Music },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-white/5">
      <div className="flex items-center justify-around py-2 px-2">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
