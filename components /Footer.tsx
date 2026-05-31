import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold">Reelnest Tools</h3>
          <p className="mt-3 text-sm text-white/60">
            Free online tools for creators, marketers, students and developers.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Pages</h4>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <Link href="/" className="block">Home</Link>
            <Link href="/blog" className="block">Blog</Link>
            <Link href="/about" className="block">About</Link>
            <Link href="/contact" className="block">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Popular Tools</h4>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <p>Hashtag Generator</p>
            <p>Caption Generator</p>
            <p>Word Counter</p>
            <p>Password Generator</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-3 text-sm text-white/60">support@reelnest.click</p>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-white/40">
        © 2026 Reelnest Tools. All rights reserved.
      </p>
    </footer>
  );
}