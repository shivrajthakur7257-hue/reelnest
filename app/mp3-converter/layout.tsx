import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter - Free Audio Converter',
  description:
    'Convert YouTube videos to MP3 audio files. Choose from 128kbps, 192kbps, 256kbps, and 320kbps. Free and instant.',
  openGraph: {
    title: 'YouTube to MP3 Converter | ReelNest',
    description: 'Convert YouTube videos to high-quality MP3 audio files instantly.',
  },
};

export default function MP3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
