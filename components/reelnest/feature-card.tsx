'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = 'from-red-500/20 to-purple-600/20',
}: FeatureCardProps) {
  return (
    <motion.div
      className="glass rounded-2xl p-6 group hover:bg-white/10 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 border border-white/10 group-hover:border-red-500/30 transition-colors`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
