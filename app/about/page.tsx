import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-20 text-white">
        <section className="mx-auto max-w-5xl">
          <h1 className="text-5xl font-black">About Reelnest Tools</h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Reelnest Tools is a free online tools platform for creators, marketers,
            students and developers. Our mission is to make useful tools simple,
            fast and accessible without login.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {['Free Tools', 'Fast Results', 'Creator Friendly'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <h2 className="text-xl font-bold">{item}</h2>
                <p className="mt-3 text-white/55">
                  Simple browser-based tools made to save time and improve productivity.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
