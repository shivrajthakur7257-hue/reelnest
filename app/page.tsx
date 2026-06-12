import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import ToolPanel from '@/components/ToolPanel';
import { tools } from '@/lib/tools';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#050509] text-white">
        <section className="relative overflow-hidden px-4 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed55,transparent_35%),radial-gradient(circle_at_bottom_right,#ef444455,transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">
              100% Free Browser-Based Tools
            </p>

            <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Free Online Tools for
              <span className="block bg-gradient-to-r from-red-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Creators & Developers
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Use powerful tools for captions, hashtags, SEO, text, passwords and more — all free.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                category={tool.category}
                icon={tool.icon}
              />
            ))}
          </div>

          <ToolPanel />
        </section>
      </main>

      <Footer />
    </>
  );
}
