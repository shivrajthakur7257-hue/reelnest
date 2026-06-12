import Link from 'next/link';

const tools = [
  'Hashtag Generator',
  'Caption Generator',
  'Instagram Bio Generator',
  'YouTube Title Generator',
  'Word Counter',
  'Text Cleaner',
  'Password Generator',
  'QR Code Generator',
  'JSON Formatter',
  'URL Encoder Decoder',
  'CSS Gradient Generator',
  'Meta Tag Generator',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050509] text-white">
      <section className="px-4 py-20 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-black md:text-7xl">
          Free Online Tools for
          <span className="block bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
            Creators & Developers
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/60">
          Reelnest Tools gives you free browser-based tools for captions, hashtags, SEO, text and more.
        </p>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-200">Free Tool</span>
              <h2 className="mt-4 text-xl font-bold">{tool}</h2>
              <p className="mt-2 text-sm text-white/55">
                Use this tool instantly without login or API.
              </p>
              <button className="mt-5 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-5 py-2 font-semibold">
                Use Tool
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Link href="/about" className="text-white/70 hover:text-white">About</Link>
          <Link href="/contact" className="text-white/70 hover:text-white">Contact</Link>
        </div>
      </section>
    </main>
  );
}