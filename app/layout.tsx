import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reelnest Tools - Free Online Tools for Creators',
  description: 'Use free online tools for captions, hashtags, SEO, text, QR codes, passwords and developers.',
  keywords: ['free online tools', 'hashtag generator', 'caption generator', 'word counter', 'password generator'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}