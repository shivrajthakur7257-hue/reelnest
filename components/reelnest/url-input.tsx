'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRight, Loader as Loader2 } from 'lucide-react';

interface URLInputProps {
  onSubmit: (url: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export function URLInput({
  onSubmit,
  placeholder = 'Paste your URL here...',
  loading = false,
}: URLInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // Clipboard access denied
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <motion.div
        className="relative group"
        whileFocus={{ scale: 1.01 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-2xl opacity-30 group-hover:opacity-60 group-focus-within:opacity-60 blur transition-opacity duration-300 animate-gradient" />
        <div className="relative flex items-center glass rounded-2xl overflow-hidden">
          <div className="pl-4 text-gray-400">
            <Link2 className="w-5 h-5" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none text-sm"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handlePaste}
            className="px-3 py-1.5 mr-2 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
          >
            Paste
          </button>
          <motion.button
            type="submit"
            disabled={loading || !url.trim()}
            className="mr-3 px-5 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-neon-red disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
}
