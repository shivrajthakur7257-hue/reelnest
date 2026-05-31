'use client';

import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ToolPanel({ toolId, title }: { toolId: string; title: string }) {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const text = input.trim();

    if (toolId === 'hashtag-generator') {
      return text
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => `#${w.replace(/[^a-z0-9]/g, '')}`)
        .concat(['#viral', '#trending', '#reels', '#creator'])
        .join(' ');
    }

    if (toolId === 'caption-generator') {
      return text ? `🔥 ${text}\n\nSave this for later ✨\nShare with your friends 🚀` : '';
    }

    if (toolId === 'instagram-bio-generator') {
      return text ? `✨ ${text}\n🚀 Digital Creator\n📩 DM for collaboration\n👇 Latest updates below` : '';
    }

    if (toolId === 'youtube-title-generator') {
      return text
        ? `1. ${text} - Complete Guide\n2. I Tried ${text} And This Happened\n3. ${text} Tips Nobody Tells You`
        : '';
    }

    if (toolId === 'youtube-description-generator') {
      return text
        ? `${text}\n\nIn this video, we explain everything step by step.\n\nLike, share and subscribe for more useful content.\n\n#youtube #tutorial #guide`
        : '';
    }

    if (toolId === 'youtube-tag-generator') {
      return text ? `${text}, tutorial, guide, tips, how to, viral video, youtube seo` : '';
    }

    if (toolId === 'word-counter') {
      const words = text ? text.split(/\s+/).length : 0;
      return `Words: ${words}\nCharacters: ${input.length}\nCharacters without spaces: ${input.replace(/\s/g, '').length}`;
    }

    if (toolId === 'case-converter') {
      return `UPPERCASE:\n${input.toUpperCase()}\n\nlowercase:\n${input.toLowerCase()}\n\nTitle Case:\n${input.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())}`;
    }

    if (toolId === 'text-cleaner') {
      return input.replace(/\s+/g, ' ').trim();
    }

    if (toolId === 'url-encoder-decoder') {
      try {
        return `Encoded:\n${encodeURIComponent(input)}\n\nDecoded:\n${decodeURIComponent(input)}`;
      } catch {
        return 'Invalid URL text.';
      }
    }

    if (toolId === 'json-formatter') {
      try {
        return JSON.stringify(JSON.parse(input), null, 2);
      } catch {
        return 'Paste valid JSON to format.';
      }
    }

    if (toolId === 'password-generator') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
      return Array.from({ length: 18 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    if (toolId === 'qr-code-generator') {
      return text ? `QR text ready: ${text}` : '';
    }

    if (toolId === 'css-gradient-generator') {
      return `background: linear-gradient(135deg, #ef4444, #7c3aed);`;
    }

    return '';
  }, [input, toolId]);

  async function copyResult() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-white/50">Enter your text and get instant result.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste your text here..."
        className="mt-5 min-h-[150px] w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none placeholder:text-white/30 focus:border-red-400"
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setInput(input || 'creator content growth')}
          className="rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-5 py-3 font-semibold text-white"
        >
          Generate
        </button>

        <button
          onClick={copyResult}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-white"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="mt-5 min-h-[120px] whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 font-sans text-white/80">
        {output || 'Your result will appear here...'}
      </pre>
    </section>
  );
}