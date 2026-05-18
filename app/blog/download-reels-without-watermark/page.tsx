import Link from 'next/link';
import type { Metadata } from 'next';
import { Scissors, ArrowRight, CircleCheck as CheckCircle, Circle as XCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download Instagram Reels Without Watermark – 100% Free',
  description: 'Save Instagram Reels to your phone or PC without any watermark, completely free. No app install needed. Works on Android, iPhone, and desktop.',
  keywords: ['download reels without watermark', 'instagram reel no watermark', 'save instagram reel free', 'watermark free reel download'],
  openGraph: {
    title: 'Download Instagram Reels Without Watermark – Free',
    description: 'Easiest method to save Instagram Reels without watermark on any device.',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Kya ReelNest watermark lagate hai downloaded videos mein?',
    a: 'Bilkul nahi. ReelNest sirf original Instagram video stream karta hai — na koi watermark add hota hai, na koi branding. Jo Instagram upload hua woh exactly woh hi download hota hai.',
  },
  {
    q: 'Kya yeh iPhone pe kaam karta hai?',
    a: 'Haan! Safari browser mein reelnest.com kholo, URL paste karo, download karo. File pehle Files app mein jayegi, wahan se aap Photos mein move kar sakte ho.',
  },
  {
    q: 'Kya Reels ke sath music bhi download hoti hai?',
    a: 'Haan — original audio including background music ke saath download hoti hai. Video file mein audio fully embedded hoti hai.',
  },
  {
    q: 'Instagram Reels download karna legal hai?',
    a: 'Personal use ke liye, aur jab aapke paas content owner ki permission ho, toh download karna generally acceptable hai. ReelNest koi copyrighted content host nahi karta — sirf streaming URL proxy karta hai. Copyright respect karna aapki responsibility hai.',
  },
  {
    q: 'Download ki limit kya hai?',
    a: 'ReelNest pe koi daily limit nahi hai. Aap jitni chahein Reels download kar sakte hain.',
  },
];

const methods = [
  {
    name: 'ReelNest (Recommended)',
    watermark: false,
    appNeeded: false,
    quality: 'Original HD',
    speed: 'Instant',
    highlight: true,
  },
  {
    name: 'Screen Recording',
    watermark: true,
    appNeeded: false,
    quality: 'Screen res',
    speed: 'Real-time',
    highlight: false,
  },
  {
    name: '3rd Party Apps',
    watermark: true,
    appNeeded: true,
    quality: 'Compressed',
    speed: 'Slow',
    highlight: false,
  },
];

export default function DownloadReelsWithoutWatermark() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Download Reels Without Watermark</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold mb-4">
            <Scissors className="w-3 h-3" /> No Watermark
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Download Instagram Reels<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Without Watermark</span>
            {' '}– 100% Free
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Instagram ka koi official download option nahi hai, aur screen recording mein watermark aa jata hai. Yeh guide batayega ki seedha original quality mein, bina kisi watermark ke Reel kaise save karein.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
            <span>3 min read</span>
            <span>·</span>
            <span>Updated May 2026</span>
          </div>
        </div>

        {/* Quick CTA */}
        <Link
          href="/instagram"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border border-blue-500/25 hover:border-blue-500/50 transition-all group mb-10"
        >
          <div>
            <p className="text-sm font-bold text-white">Bina Watermark Download Karo</p>
            <p className="text-xs text-gray-400 mt-0.5">ReelNest — original quality, zero watermark</p>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <article className="space-y-8">

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Watermark Kyun Aata Hai?</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Screen recording aur kuch apps downloaded video pe apni branding ya timestamp add karte hain. Yeh isliye hota hai kyunki woh log directly Instagram CDN se video nahi lete — balke screen capture karte hain ya file process karke compress karte hain.
            </p>
            <p className="text-gray-400 leading-relaxed">
              ReelNest directly Instagram ke original video stream URL ko proxy karta hai — matlab original MP4 file exactly as-is download hoti hai. Koi re-encoding nahi, koi branding nahi.
            </p>
          </section>

          {/* Comparison table */}
          <section className="glass rounded-2xl p-6 overflow-x-auto">
            <h2 className="text-xl font-bold text-white mb-5">Methods Comparison</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Method</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-semibold">Watermark</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-semibold">App Needed</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-semibold">Quality</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m) => (
                  <tr key={m.name} className={`border-b border-white/5 ${m.highlight ? 'bg-blue-500/5' : ''}`}>
                    <td className={`py-3 pr-4 font-semibold ${m.highlight ? 'text-blue-400' : 'text-white'}`}>{m.name}</td>
                    <td className="py-3 px-3 text-center">
                      {m.watermark ? <XCircle className="w-4 h-4 text-red-400 mx-auto" /> : <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {m.appNeeded ? <XCircle className="w-4 h-4 text-red-400 mx-auto" /> : <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />}
                    </td>
                    <td className="py-3 px-3 text-center text-gray-400 text-xs">{m.quality}</td>
                    <td className="py-3 px-3 text-center text-gray-400 text-xs">{m.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Steps */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">3 Steps Mein Watermark-Free Download</h2>
            <div className="space-y-4">
              {[
                { n: 1, title: 'Reel ka link copy karo', desc: 'Instagram app mein Reel open karo → Share icon → "Copy Link"' },
                { n: 2, title: 'ReelNest pe paste karo', desc: 'reelnest.com/instagram kholo → URL box mein paste karo → video thumbnail aayegi' },
                { n: 3, title: '"Download Video" press karo', desc: 'Ek hi click mein original HD file bina watermark ke save hogi' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center shrink-0">{n}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-sm text-gray-400 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
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

          {/* Related */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Related Guides</h2>
            <div className="space-y-2">
              {[
                { href: '/blog/instagram-reel-download-hd', label: 'Instagram Reel Download HD 1080p' },
                { href: '/blog/instagram-video-downloader-online', label: 'Instagram Video Downloader Online' },
                { href: '/blog/youtube-shorts-downloader', label: 'YouTube Shorts Downloader' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/instagram"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            Bina Watermark Download Karo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
