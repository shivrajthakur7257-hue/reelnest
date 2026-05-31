import {
  Hash, PenLine, Instagram, Youtube, Type, FileText, Sparkles,
  Code2, KeyRound, QrCode, Tags, Link2, Braces, Palette
} from 'lucide-react';

export type ToolCategory =
  | 'All'
  | 'Social Media'
  | 'YouTube'
  | 'Instagram'
  | 'SEO'
  | 'Text'
  | 'Developer'
  | 'Utility';

export const categories: ToolCategory[] = [
  'All',
  'Social Media',
  'YouTube',
  'Instagram',
  'SEO',
  'Text',
  'Developer',
  'Utility',
];

export const tools = [
  {
    id: 'hashtag-generator',
    title: 'Hashtag Generator',
    category: 'Social Media',
    icon: Hash,
    description: 'Generate viral hashtags for Instagram, YouTube Shorts and reels.',
    keywords: 'hashtag generator instagram reels viral tags',
  },
  {
    id: 'caption-generator',
    title: 'Caption Generator',
    category: 'Social Media',
    icon: PenLine,
    description: 'Create engaging captions for posts, reels and short videos.',
    keywords: 'caption generator instagram captions reels',
  },
  {
    id: 'instagram-bio-generator',
    title: 'Instagram Bio Generator',
    category: 'Instagram',
    icon: Instagram,
    description: 'Create stylish Instagram bios for creators and businesses.',
    keywords: 'instagram bio generator stylish bio',
  },
  {
    id: 'youtube-title-generator',
    title: 'YouTube Title Generator',
    category: 'YouTube',
    icon: Youtube,
    description: 'Generate clickable YouTube video titles instantly.',
    keywords: 'youtube title generator video title ideas',
  },
  {
    id: 'youtube-description-generator',
    title: 'YouTube Description Generator',
    category: 'YouTube',
    icon: FileText,
    description: 'Write SEO-friendly YouTube video descriptions.',
    keywords: 'youtube description generator seo',
  },
  {
    id: 'youtube-tag-generator',
    title: 'YouTube Tag Generator',
    category: 'YouTube',
    icon: Tags,
    description: 'Generate YouTube tags to improve video discoverability.',
    keywords: 'youtube tag generator tags seo',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    category: 'Text',
    icon: Type,
    description: 'Count words, characters and reading time.',
    keywords: 'word counter character counter',
  },
  {
    id: 'case-converter',
    title: 'Case Converter',
    category: 'Text',
    icon: Sparkles,
    description: 'Convert text to uppercase, lowercase and title case.',
    keywords: 'case converter uppercase lowercase',
  },
  {
    id: 'text-cleaner',
    title: 'Text Cleaner',
    category: 'Text',
    icon: Code2,
    description: 'Remove extra spaces, symbols and messy formatting.',
    keywords: 'text cleaner remove spaces',
  },
  {
    id: 'url-encoder-decoder',
    title: 'URL Encoder Decoder',
    category: 'Developer',
    icon: Link2,
    description: 'Encode and decode URLs safely.',
    keywords: 'url encoder decoder',
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    category: 'Developer',
    icon: Braces,
    description: 'Format and beautify JSON data.',
    keywords: 'json formatter beautifier',
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    category: 'Utility',
    icon: KeyRound,
    description: 'Generate strong secure passwords.',
    keywords: 'password generator secure password',
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    category: 'Utility',
    icon: QrCode,
    description: 'Generate QR code for links and text.',
    keywords: 'qr code generator',
  },
  {
    id: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    category: 'Developer',
    icon: Palette,
    description: 'Create beautiful CSS gradient backgrounds.',
    keywords: 'css gradient generator',
  },
] as const;