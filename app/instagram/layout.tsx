import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Downloader - Reels, Stories, Videos & DP',
  description:
    'Download Instagram Reels, Stories, Videos, and Profile Pictures for free. Fast, secure, and no signup required.',
  openGraph: {
    title: 'Instagram Downloader - Reels, Stories, Videos & DP | ReelNest',
    description: 'Download Instagram Reels, Stories, Videos, and Profile Pictures for free.',
  },
};

export default function InstagramLayout({ children }: { children: React.ReactNode }) {
  return children;
}
