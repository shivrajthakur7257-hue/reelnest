import Header from '@/components/Header';
import Footer from '@/components/Footer';

const guides = [
  'How to use Hashtag Generator',
  'How to write viral captions',
  'How to create YouTube titles',
  'How to generate SEO meta tags',
  'How to use QR Code Generator',
  'How to clean text online',
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-16 text-white">
        <section className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black md:text-6xl">Tool Guides & Tutorials</h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Step-by-step guides to help you use Reelnest Tools properly and grow faster online.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article key={guide} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-200">Guide</span>
                <h2 className="mt-4 text-xl font-bold">{guide}</h2>
                <p className="mt-3 text-sm text-white/55">
                  Learn the correct way to use this tool with simple steps and practical tips.
                </p>
                <p className="mt-5 text-sm text-white/40">3 min read</p>
              </article>
            ))}
          </div>

          <div className="mt-14 space-y-8">
            {guides.map((guide, index) => (
              <section key={guide} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <h2 className="text-2xl font-bold">{guide}</h2>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-white/65">
                  <li>Open the tool from the homepage.</li>
                  <li>Enter your keyword, text or link.</li>
                  <li>Click generate and review the result.</li>
                  <li>Copy the output and use it in your content or project.</li>
                  <li>Improve your input for better results.</li>
                </ol>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}