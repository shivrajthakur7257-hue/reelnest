import Link from 'next/link';
import type { Metadata } from 'next';
import { Film, ArrowRight, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Smartphone, Monitor, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Reel Download HD – Full 1080p Guide (Free)',
  description: 'Download Instagram Reels in full HD 1080p quality for free. No watermark, no app needed. Works on mobile and PC. Step-by-step guide.',
  keywords: ['instagram reel download hd', 'download instagram reels 1080p', 'instagram hd video download', 'reel download without watermark hd'],
  openGraph: {
    title: 'Instagram Reel Download HD – Full 1080p Guide',
    description: 'Step-by-step guide to downloading Instagram Reels in full HD quality, free and without watermark.',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Kya Instagram Reels HD mein free mein download ho sakti hain?',
    a: 'Haan! ReelNest pe aap bilkul free mein Instagram Reels original HD quality mein download kar sakte hain. Koi subscription ya account ki zaroorat nahi.',
  },
  {
    q: 'Instagram Reel ki maximum quality kya hoti hai?',
    a: 'Instagram mostly 720p ya 1080p mein Reels serve karta hai. ReelNest original source quality maintain karta hai — jo bhi Instagram serve kare, usi quality mein download hota hai.',
  },
  {
    q: 'Kya Private Reels download ho sakti hain?',
    a: 'Nahi. Sirf public posts aur Reels download ho sakti hain. Private accounts ka content technically inaccessible hota hai.',
  },
  {
    q: 'Mobile pe HD Reel kaise download karein?',
    a: 'Instagram app mein Reel open karo → 3 dots → "Copy Link" → ReelNest.com pe aao → paste karo → Download button dabao. File gallery mein save hogi.',
  },
  {
    q: 'Download ki hui Reel ka size kitna hota hai?',
    a: 'Ek 30-second HD Reel typically 8–25 MB ki hoti hai depending on bitrate aur resolution. 1-minute Reel 20–50 MB tak ho sakti hai.',
  },
];

export default function InstagramReelDownloadHD() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Instagram Reel Download HD</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4405F]/15 text-[#E4405F] text-xs font-bold mb-4">
            <Film className="w-3 h-3" /> Instagram
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Instagram Reel Download HD –<br className="hidden sm:block" />
            <span className="neon-text"> Full 1080p Guide (Free)</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Apni favorite Instagram Reels full HD quality mein download karo — koi watermark nahi, koi app install karne ki zaroorat nahi, 100% free.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
            <span>4 min read</span>
            <span>·</span>
            <span>Updated May 2026</span>
          </div>
        </div>

        {/* Quick CTA */}
        <Link
          href="/instagram"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E4405F]/20 to-[#833AB4]/20 border border-[#E4405F]/30 hover:border-[#E4405F]/60 transition-all group mb-10"
        >
          <div>
            <p className="text-sm font-bold text-white">Abhi Download Karo</p>
            <p className="text-xs text-gray-400 mt-0.5">ReelNest Instagram Downloader — free, instant, HD</p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#E4405F] group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Article body */}
        <article className="prose-custom space-y-8">

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Instagram Reel HD Download Karne Ka Sabse Aasan Tarika</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Instagram apni app mein directly video save karne ka option nahi deta. Isliye hume third-party tools ka use karna padta hai. ReelNest ek free online tool hai jo original HD quality mein Reels download karne deta hai — kisi bhi device se, kisi bhi browser mein.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Yeh tool server-side video fetch karta hai, isliye aapko koi extension install karne ki zaroorat nahi aur download seedha aapke device mein save hoti hai.
            </p>
          </section>

          {/* Steps */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Step-by-Step: HD Reel Download Karo</h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Reel link copy karo', desc: 'Instagram app ya browser mein Reel open karo. Top-right 3 dots tap karo → "Copy Link" select karo.' },
                { step: '02', title: 'ReelNest open karo', desc: 'Browser mein reelnest.com/instagram open karo. "Reel" tab already selected hoga.' },
                { step: '03', title: 'URL paste karo', desc: 'Input box mein paste karo ya "Paste" button press karo. Tool automatically video fetch karna shuru kar dega.' },
                { step: '04', title: 'Download Video click karo', desc: 'Thumbnail aane ke baad ek bada "Download Video" button dikhega. Use click karo — file directly device mein save hogi.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4405F]/20 to-[#833AB4]/20 border border-white/10 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile vs Desktop */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Mobile vs Desktop — Kahan Behtar Kaam Karta Hai?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold text-white text-sm">Mobile (Android / iOS)</span>
                </div>
                <ul className="space-y-2">
                  {['Chrome ya Safari browser use karo', 'Download folder mein save hoga', 'iOS mein Files app se access karo', 'Android mein Gallery directly dikhega'].map(t => (
                    <li key={t} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-white text-sm">Desktop (Windows / Mac)</span>
                </div>
                <ul className="space-y-2">
                  {['Koi bhi browser kaam karega', 'Downloads folder mein save hoga', 'Right-click → "Save As" bhi kaam karta hai', 'HD quality clearly visible hogi'].map(t => (
                    <li key={t} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">HD Quality Ke Liye Tips</h2>
            <ul className="space-y-3">
              {[
                'Sirf public posts download ho sakti hain — private account ki Reel nahi',
                'Original quality Instagram server ke upar depend karti hai — ReelNest koi compression nahi karta',
                'Agar thumbnail nahi aata, check karo ke URL sahi hai ya nahi',
                'Story download ke liye alag "Story" tab use karo',
                'DP download ke liye account ka username bhi kaam karta hai',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-[#E4405F] shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
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
                { href: '/blog/download-reels-without-watermark', label: 'Download Reels Without Watermark' },
                { href: '/blog/instagram-video-downloader-online', label: 'Instagram Video Downloader Online' },
                { href: '/blog/youtube-shorts-downloader', label: 'YouTube Shorts Downloader' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1">
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/instagram"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E4405F] to-[#c13584] text-white font-bold rounded-2xl hover:shadow-neon-red transition-all duration-300"
          >
            Instagram Reel Download Karo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
