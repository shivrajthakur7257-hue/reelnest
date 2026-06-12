'use client';

import { useMemo, useState } from 'react';

export default function ToolPanel() {
  const [input, setInput] = useState('');
  const [tool, setTool] = useState('hashtag');

  const output = useMemo(() => {
    if (tool === 'hashtag') {
      return input
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => `#${word.replace(/[^a-z0-9]/g, '')}`)
        .concat(['#viral', '#trending', '#reels'])
        .join(' ');
    }

    if (tool === 'caption') {
      return input ? `🔥 ${input}\n\nSave this for later ✨\nShare with your friends 🚀` : '';
    }

    if (tool === 'word') {
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;
      return `Words: ${words}\nCharacters: ${input.length}`;
    }

    if (tool === 'password') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
      return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    return '';
  }, [input, tool]);

  return (
    <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
      <h2 className="text-3xl font-bold">Try Free Tools</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {[
          ['hashtag', 'Hashtag'],
          ['caption', 'Caption'],
          ['word', 'Word Counter'],
          ['password', 'Password'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTool(id)}
            className={`rounded-full px-4 py-2 text-sm ${
              tool === id ? 'bg-red-500 text-white' : 'bg-white/10 text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your text or keyword here..."
        className="mt-5 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none"
      />

      <pre className="mt-5 min-h-[100px] whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-white/80">
        {output || 'Your result will appear here...'}
      </pre>
    </section>
  );
}
