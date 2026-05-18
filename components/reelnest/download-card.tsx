'use client';

import { motion } from 'framer-motion';
import { Download, Check, Loader as Loader2 } from 'lucide-react';

interface DownloadCardProps {
  quality: string;
  format: string;
  size?: string;
  url?: string;
  loading?: boolean;
  onDownload?: () => void;
}

export function DownloadCard({
  quality,
  format,
  size,
  url,
  loading = false,
  onDownload,
}: DownloadCardProps) {
  return (
    <motion.div
      className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-600/20 flex items-center justify-center border border-red-500/20">
            {loading ? (
              <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
            ) : url ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Download className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{quality}</p>
            <p className="text-xs text-gray-400">
              {format.toUpperCase()} {size && `~${size}`}
            </p>
          </div>
        </div>

        <motion.button
          onClick={onDownload}
          disabled={loading || !url}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs font-semibold rounded-lg hover:shadow-neon-red disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Loading...' : 'Download'}
        </motion.button>
      </div>
    </motion.div>
  );
}
