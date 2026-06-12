import Header from '@/components/Header';
import Footer from '@/components/Footer';

const guides = [
  'How to use Hashtag Generator',
  'How to write viral captions',
  'How to create YouTube titles',
  'How to use Word Counter',
  'How to generate strong passwords',
  'How to format JSON online',
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-20 text-white">
        <section className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black">Tool Guides</h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Learn how to use Reelnest Tools step by step.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article key={guide} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-200">
                  Guide
                </span>
                <h2 className="mt-4 text-xl font-bold">{guide}</h2>
                <p className="mt-3 text-sm text-white/55">
                  Open the tool, enter your input, generate result and copy output.
                </p>
                <p className="mt-5 text-sm text-white/40">3 min read</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
