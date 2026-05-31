'use client';

import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  onClick: () => void;
};

export default function ToolCard({ title, description, category, icon: Icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:-translate-y-1 hover:border-red-400/50 hover:bg-white/[0.09]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 to-purple-600/30 text-white">
        <Icon size={23} />
      </div>

      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
        {category}
      </span>

      <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>

      <div className="mt-5 text-sm font-semibold text-red-300 group-hover:text-white">
        Use Tool →
      </div>
    </button>
  );
}