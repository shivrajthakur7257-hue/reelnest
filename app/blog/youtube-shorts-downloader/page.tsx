import Link from 'next/link';
import type { Metadata } from 'next';
import { Youtube, ArrowRight, CircleCheck as CheckCircle, Smartphone, Monitor, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube Shorts Downloader – Save Any Short as MP4 Free',
  description: 'Download YouTube Shorts as MP4 in HD quality. Works on Android, iPhone, and PC. Free, no login, instant download. Step-by-step guide.',
  keywords: ['youtube shorts downloader', 'download youtube shorts', 'save youtube shorts mp4', 'youtube shorts video download free'],
  openGraph: {
    title: 'YouTube Shorts Downloader – Save Any Short as MP4',
    description: 'Download YouTube Shorts for free in HD. No login, no app needed.',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'YouTube Shorts ka URL kahan se milega?',
    a: 'YouTube app mein Short open karo → Share button → "Copy link". Browser mein URL bar se directly bhi copy kar sakte ho. URL usually "youtube.com/shorts/..." hota hai.',
  },
  {
    q: 'YouTube Shorts aur regular YouTube videos mein kya fark hai?',
    a: 'Shorts vertical format (9:16) mein hoti hain aur 60 seconds se zyada nahi hoti. Download process bilkul same hai — URL paste karo aur download karo.',
  },
  {
    q: 'Kya Shorts ka audio alag download ho sakta hai?',
    a: 'Haan! ReelNest ka YouTube to MP3 converter use karo — Shorts URL paste karo aur sirf audio MP3 mein download hoga.',
  },
  {
    q: 'Download ki quality kya hoti hai?',
    a: 'ReelNest best available quality offer karta hai, usually 720p ya 1080p mein. Quality YouTube ke server pe available options pe depend karti hai.',
  },
  {
    q: 'Kya Shorts download karna YouTube ke Terms of Service ke against hai?',
    a: 'Personal use ke liye downloading generally acceptable hai, lekin content share karna ya commercially use karna copyright violation ho sakta hai. Creators ki mehnat respect karo.',
  },
];

export default function YoutubeShortDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">

        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">YouTube Shorts Downloader</span>
        </nav>

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000]/15 text-[#FF0000] text-xs font-bold mb-4">
            <Youtube className="w-3 h-3" /> YouTube
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            YouTube Shorts Downloader –<br className="hidden sm:block" />
            <span className="neon-text"> Save Any Short in Seconds</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            YouTube ka koi official download option nahi hai Shorts ke liye. ReelNest se aap koi bhi YouTube Short HD mein free mein save kar sakte ho — mobile ya desktop, koi bhi browser.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
            <span>3 min read</span>
            <span>·</span>
            <span>Updated May 2026</span>
          </div>
        </div>

        <Link
          href="/youtube"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#FF0000]/15 to-red-900/15 border border-[#FF0000]/25 hover:border-[#FF0000]/50 transition-all group mb-10"
        >
          <div>
            <p className="text-sm font-bold text-white">YouTube Short Abhi Download Karo</p>
            <p className="text-xs text-gray-400 mt-0.5">ReelNest YouTube Downloader — free, HD, instant</p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#FF0000] group-hover:translate-x-1 transition-transform" />
        </Link>

        <article className="space-y-8">

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">YouTube Shorts Kya Hain?</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              YouTube Shorts vertical short-form videos hain jo 60 seconds tak ki hoti hain — bilkul Instagram Reels aur TikTok ki tarah. 2021 mein launch hue, aur aaj billions of views milte hain daily.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Problem yeh hai ke YouTube app mein "Save Video" ka option premium subscription ke liye reserved hai, aur desktop pe koi save option nahi. ReelNest free mein yeh gap fill karta hai.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Step-by-Step: YouTube Short Download Karo</h2>
            <div className="space-y-4">
              {[
                { n: '01', t: 'Short ka URL copy karo', d: 'YouTube app mein Short open karo → Share → "Copy link". Ya browser address bar se copy karo.' },
                { n: '02', t: 'ReelNest pe aao', d: 'reelnest.com/youtube open karo. Quality selector mein apni preferred quality choose karo (720p recommended).' },
                { n: '03', t: 'URL paste karo', d: 'Input box mein URL paste karo aur "Download" button dabao. Thumbnail aur title dikhega.' },
                { n: '04', t: '"Download Video" click karo', d: 'Bada red button press karo — MP4 file directly device mein save hogi.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#FF0000]/15 border border-[#FF0000]/25 text-[#FF0000] text-sm font-bold flex items-center justify-center shrink-0">{n}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{t}</p>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Audio option */}
          <section className="glass rounded-2xl p-6 border border-emerald-500/20">
            <h2 className="text-xl font-bold text-white mb-3">Sirf Audio Chahiye? MP3 Convert Karo</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Agar Short ka sirf music ya audio chahiye toh YouTube to MP3 converter use karo. Same URL paste karo — 320kbps tak MP3 mein convert hoga.
            </p>
            <Link href="/mp3-converter" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm rounded-xl hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] transition-all">
              MP3 Converter <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Platform guide */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Platform-Wise Guide</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-[#FF0000]" />
                  <span className="font-semibold text-white text-sm">Android</span>
                </div>
                <ul className="space-y-2">
                  {['Chrome browser mein reelnest.com/youtube kholo', 'URL paste karo', 'Download → file Downloads folder mein', 'Gallery se access karo'].map(s => (
                    <li key={s} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-gray-300" />
                  <span className="font-semibold text-white text-sm">iPhone (iOS)</span>
                </div>
                <ul className="space-y-2">
                  {['Safari mein reelnest.com/youtube kholo', 'URL paste karo → Download', 'File → Files app → Downloads', 'Photos mein save karo (manual)'].map(s => (
                    <li key={s} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-5">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="glass rounded-xl group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Related Guides</h2>
            <div className="space-y-2">
              {[
                { href: '/blog/youtube-to-mp3-converter', label: 'YouTube to MP3 Converter 320kbps' },
                { href: '/blog/instagram-reel-download-hd', label: 'Instagram Reel Download HD' },
                { href: '/blog/download-reels-without-watermark', label: 'Download Reels Without Watermark' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1">
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <div className="mt-10 text-center">
          <Link href="/youtube" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF0000] to-red-700 text-white font-bold rounded-2xl hover:shadow-neon-red transition-all duration-300">
            YouTube Short Download Karo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
