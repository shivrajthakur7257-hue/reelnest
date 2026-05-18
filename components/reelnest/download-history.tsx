'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Download, Instagram, Youtube, Music } from 'lucide-react';

interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  type: string;
  quality: string;
  timestamp: number;
}

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  youtube: Youtube,
  mp3: Music,
};

export function DownloadHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('reelnest_history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('reelnest_history');
    setHistory([]);
  };

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    const updated = [newItem, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('reelnest_history', JSON.stringify(updated));
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <Clock className="w-4 h-4" />
        <span>Recent Downloads ({history.length})</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            <div className="flex justify-end">
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>
            {history.map((item) => {
              const Icon = platformIcons[item.platform] || Download;
              return (
                <div
                  key={item.id}
                  className="glass rounded-lg p-3 flex items-center gap-3"
                >
                  <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 truncate">{item.url}</p>
                    <p className="text-[10px] text-gray-500">
                      {item.type} - {item.quality}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
