import { Hash, PenLine, Instagram, Youtube, Type, KeyRound, QrCode, Code2 } from 'lucide-react';

export const tools = [
  {
    id: 'hashtag-generator',
    title: 'Hashtag Generator',
    category: 'Social Media',
    icon: Hash,
    description: 'Generate viral hashtags for reels, shorts and posts.',
  },
  {
    id: 'caption-generator',
    title: 'Caption Generator',
    category: 'Social Media',
    icon: PenLine,
    description: 'Create catchy captions for Instagram and YouTube Shorts.',
  },
  {
    id: 'instagram-bio-generator',
    title: 'Instagram Bio Generator',
    category: 'Instagram',
    icon: Instagram,
    description: 'Make stylish bios for creators, brands and influencers.',
  },
  {
    id: 'youtube-title-generator',
    title: 'YouTube Title Generator',
    category: 'YouTube',
    icon: Youtube,
    description: 'Generate clickable titles for YouTube videos.',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    category: 'Text',
    icon: Type,
    description: 'Count words, characters and text length instantly.',
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    category: 'Utility',
    icon: KeyRound,
    description: 'Generate strong and secure passwords.',
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    category: 'Utility',
    icon: QrCode,
    description: 'Create QR code text or link output.',
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    category: 'Developer',
    icon: Code2,
    description: 'Format and beautify JSON data.',
  },
];
