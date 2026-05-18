'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/5 rounded w-24" />
          <div className="h-2 bg-white/5 rounded w-16" />
        </div>
        <div className="h-8 w-20 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonPreview() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse space-y-4">
      <div className="w-full aspect-video rounded-xl bg-white/5" />
      <div className="space-y-2">
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  );
}
