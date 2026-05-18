import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { PWAInstall } from '@/components/reelnest/pwa-install';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://reelnest.com'),
  title: {
    default: 'ReelNest - Download Reels, Videos & MP3 in Seconds',
    template: '%s | ReelNest',
  },
  description:
    'Free online tool to download Instagram Reels, Stories, Videos, YouTube MP4/MP3. Fast, secure, and no signup required.',
  keywords: [
    'Instagram Reel Downloader',
    'YouTube MP4 Downloader',
    'YouTube MP3 Converter',
    'Instagram Story Downloader',
    'Video Downloader',
    'ReelNest',
    'Instagram DP Downloader',
    'YouTube to MP3',
  ],
  openGraph: {
    title: 'ReelNest - Download Reels, Videos & MP3 in Seconds',
    description:
      'Free online tool to download Instagram Reels, Stories, Videos, YouTube MP4/MP3.',
    type: 'website',
    url: 'https://reelnest.com',
    siteName: 'ReelNest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReelNest - Download Reels, Videos & MP3 in Seconds',
    description:
      'Free online tool to download Instagram Reels, Stories, Videos, YouTube MP4/MP3.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#dc2626',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileNav />
        <PWAInstall />
        <Toaster />
      </body>
    </html>
  );
}
