import Link from 'next/link';
import { Download, Github, Twitter } from 'lucide-react';

const footerLinks = {
  Product: [
    { href: '/instagram', label: 'Instagram Downloader' },
    { href: '/youtube', label: 'YouTube Downloader' },
    { href: '/mp3-converter', label: 'MP3 Converter' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
  Resources: [
    { href: '/#faq', label: 'FAQ' },
    { href: '/about', label: 'How It Works' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold neon-text">ReelNest</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Download reels, videos, and convert to MP3 in seconds. Fast, free, and secure.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ReelNest. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made for personal use only. We do not host any content.
          </p>
        </div>
      </div>
    </footer>
  );
}
