'use client';

import { motion } from 'framer-motion';

interface PlatformBadgeProps {
  icon: React.ComponentType<any>;
  name: string;
  color: string;
}

export function PlatformBadge({ icon: Icon, name, color }: PlatformBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-3 glass rounded-xl px-5 py-3"
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <span className="text-sm font-medium text-white">{name}</span>
    </motion.div>
  );
}
