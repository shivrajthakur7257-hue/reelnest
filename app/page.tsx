import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">ReelNest Downloader</h1>
        <p className="text-gray-400 mb-8">
          Instagram, YouTube aur MP3 downloader
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/instagram" className="px-6 py-3 rounded-xl bg-pink-600 font-bold">
            Instagram Downloader
          </Link>

          <Link href="/youtube" className="px-6 py-3 rounded-xl bg-red-600 font-bold">
            YouTube Downloader
          </Link>

          <Link href="/mp3" className="px-6 py-3 rounded-xl bg-emerald-600 font-bold">
            MP3 Converter
          </Link>
        </div>
      </div>
    </main>
  );
}