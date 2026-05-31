'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import ToolPanel from '@/components/ToolPanel';
import { categories, tools } from '@/lib/tools';
import { Search, Zap } from 'lucide-react';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTool, setActiveTool] = useState(tools[0]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCategory = category === 'All' || tool.category === category;
      const matchSearch =
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.keywords.toLowerCase().includes(query.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [query, category]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#050509] text-white">
        <section className="relative overflow-hidden px-4 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed55,transparent_35%),radial-gradient(circle_at_bottom_right,#ef444455,transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">
              <Zap size={16} /> 100% Free Browser-Based Tools
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-7xl">
              Free Online Tools for
              <span className="block bg-gradient-to-r from-red-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Creators & Developers
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Use powerful tools for captions, hashtags, SEO, text, QR codes, passwords and more — all free.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
              <Search className="text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
              />
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-4 pb-20">
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm ${
                  category === cat
                    ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white'
                    : 'border border-white/10 bg-white/5 text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                category={tool.category}
                icon={tool.icon}
                onClick={() => setActiveTool(tool)}
              />
            ))}
          </div>

          <ToolPanel toolId={activeTool.id} title={activeTool.title} />
        </section>
      </main>

      <Footer />
    </>
  );
}