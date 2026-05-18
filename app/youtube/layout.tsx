import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Video Downloader - MP4 in Multiple Resolutions',
  description:
    'Download YouTube videos in MP4 format. Choose from 144p, 360p, 720p, and 1080p. Fast, free, and secure.',
  openGraph: {
    title: 'YouTube Video Downloader | ReelNest',
    description: 'Download YouTube videos in MP4 format with multiple quality options.',
  },
};

export default function YouTubeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
