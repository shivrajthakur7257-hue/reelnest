import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reelnest Tools - Free Online Tools',
  description: 'Free online tools for creators, marketers and developers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}