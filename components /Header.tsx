import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-600">
            <Sparkles size={20} />
          </span>
          Reelnest Tools
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-white/70 hover:text-white">Home</Link>
          <Link href="/blog" className="text-white/70 hover:text-white">Blog</Link>
          <Link href="/about" className="text-white/70 hover:text-white">About</Link>
          <Link href="/contact" className="text-white/70 hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
