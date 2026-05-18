'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PreviewCardProps {
  thumbnail?: string;
  title?: string;
  duration?: string;
  author?: string;
}

export function PreviewCard({ thumbnail, title, duration, author }: PreviewCardProps) {
  if (!thumbnail && !title) return null;

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {thumbnail && (
        <div className="relative aspect-video bg-black/50">
          <Image
            src={thumbnail}
            alt={title || 'Preview'}
            fill
            className="object-cover"
            unoptimized
          />
          {duration && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs rounded">
              {duration}
            </span>
          )}
        </div>
      )}
      {(title || author) && (
        <div className="p-4 space-y-1">
          {title && (
            <h3 className="text-sm font-medium text-white line-clamp-2">
              {title}
            </h3>
          )}
          {author && (
            <p className="text-xs text-gray-400">{author}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
