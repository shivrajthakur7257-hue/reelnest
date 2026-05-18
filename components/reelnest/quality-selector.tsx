'use client';

import { motion } from 'framer-motion';

interface QualitySelectorProps {
  selected: string;
  onSelect: (quality: string) => void;
  options?: string[];
}

const defaultOptions = ['144p', '360p', '720p', '1080p'];

export function QualitySelector({
  selected,
  onSelect,
  options = defaultOptions,
}: QualitySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((quality) => (
        <motion.button
          key={quality}
          onClick={() => onSelect(quality)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selected === quality
              ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-neon-red'
              : 'glass text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {quality}
        </motion.button>
      ))}
    </div>
  );
}
