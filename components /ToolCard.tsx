import { LucideIcon } from 'lucide-react';

type ToolCardProps = {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
};

export default function ToolCard({ title, description, category, icon: Icon }: ToolCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-red-400/50">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 to-purple-600/30">
        <Icon size={24} />
      </div>

      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
        {category}
      </span>

      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-white/55">
        {description}
      </p>

      <button className="mt-5 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-5 py-2 text-sm font-semibold">
        Use Tool
      </button>
    </div>
  );
}
