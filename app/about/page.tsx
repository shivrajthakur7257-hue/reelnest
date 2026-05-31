import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-16 text-white">
        <section className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-black md:text-6xl">About Reelnest Tools</h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Reelnest Tools is a free online tools platform built for creators, marketers,
            students and developers. Our goal is to provide simple, fast and useful browser-based
            tools without unnecessary login or complexity.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ['Free Tools', 'Use useful tools without paying anything.'],
              ['Fast Results', 'All tools work instantly inside your browser.'],
              ['Creator Friendly', 'Made for social media, SEO, text and developer tasks.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}