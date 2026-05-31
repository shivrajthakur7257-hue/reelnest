import Link from 'next/link';
import type { Metadata } from 'next';
import { Music, ArrowRight, CircleCheck as CheckCircle, Headphones, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter – High Quality 320kbps Free',
  description: 'Convert any YouTube video to MP3 in up to 320kbps quality. Free, instant, no login. Works on mobile and desktop. Full guide.',
  keywords: ['youtube to mp3 converter', 'youtube mp3 download', 'convert youtube to mp3 free', 'youtube audio download 320kbps'],
  openGraph: {
    title: 'YouTube to MP3 Converter – 320kbps Free',
    description: 'Convert YouTube videos to MP3 audio in high quality. Free and instant.',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Kya quality mein fark padta hai 128kbps aur 320kbps mein?',
    a: '128kbps mein audio thoda compressed hota hai — streaming ke liye theek hai. 320kbps near-lossless hota hai, music lovers ke liye best. Agar headphones use karte ho toh 320kbps choose karo.',
  },
  {
    q: 'Kya YouTube Shorts ka bhi audio download ho sakta hai?',
    a: 'Haan! YouTube Shorts ka URL paste karo aur MP3 convert ho jayega. Process bilkul same hai.',
  },
  {
    q: 'Kitni teri convert hota hai?',
    a: '5–10 second ki video 2–3 seconds mein convert hoti hai. Lambi videos (1+ hour) mein 10–20 seconds lag sakte hain. Speed server load pe depend karta hai.',
  },
  {
    q: 'Kya converted MP3 mein metadata (title, artist) hota hai?',
    a: 'ReelNest basic file provide karta hai. Metadata automatically include nahi hota, lekin aap VLC ya any tag editor se baad mein add kar sakte hain.',
  },
  {
    q: 'Kya age-restricted ya private videos convert ho sakte hain?',
    a: 'Nahi. Sirf publicly accessible YouTube videos convert ho sakti hain. Age-restricted content ke liye special authentication chahiye jo ReelNest support nahi karta.',
  },
  {
    q: 'Converted MP3 kitne der valid hoti hai?',
    a: 'ReelNest koi file store nahi karta — aapko direct streaming URL milti hai. Isliye file immediately download karein, URL expire ho sakta hai.',
  },
];

const bitrates = [
  { kbps: '128', size: '~1 MB/min', use: 'Casual listening, low storage' },
  { kbps: '192', size: '~1.4 MB/min', use: 'Balanced quality (default)' },
  { kbps: '256', size: '~1.9 MB/min', use: 'Good quality, moderate size' },
  { kbps: '320', size: '~2.4 MB/min', use: 'Best quality for audiophiles' },
];

export default function YouTubeToMp3Converter() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">

        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">YouTube to MP3 Converter</span>
        </nav>

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold mb-4">
            <Music className="w-3 h-3" /> YouTube MP3
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            YouTube to MP3 Converter –<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400"> High Quality 320kbps Free</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Kisi bhi YouTube video ka audio seedha MP3 mein convert karo — 128 se 320kbps tak. Free, instant, koi login nahi, koi limit nahi.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
            <span>4 min read</span>
            <span>·</span>
            <span>Updated May 2026</span>
          </div>
        </div>

        <Link
          href="/mp3-converter"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-green-500/15 border border-emerald-500/25 hover:border-emerald-500/50 transition-all group mb-10"
        >
          <div>
            <p className="text-sm font-bold text-white">YouTube MP3 Convert Karo</p>
            <p className="text-xs text-gray-400 mt-0.5">Up to 320kbps · Free · Instant</p>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <article className="space-y-8">

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">YouTube to MP3 Kyun Convert Karein?</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Music, podcasts, lectures, meditation audio — YouTube pe sab kuch hai. Lekin internet band ho toh? Ya data save karna ho? MP3 download karo aur offline sunte raho.
            </p>
            <ul className="space-y-2 mt-4">
              {[
                'Offline music library banao without Spotify Premium',
                'Podcasts aur interviews MP3 mein save karo',
                'Study material aur lectures audio mein convert karo',
                'Lo-fi music aur background sounds save karo',
              ].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Bitrate table */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Bitrate Guide — Kaunsa Choose Karein?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Bitrate</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-semibold">File Size</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {bitrates.map((b, i) => (
                    <tr key={b.kbps} className={`border-b border-white/5 ${i === 1 ? 'bg-emerald-500/5' : ''}`}>
                      <td className="py-3 pr-4">
                        <span className="font-bold text-white">{b.kbps}</span>
                        <span className="text-gray-500"> kbps</span>
                        {i === 1 && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">DEFAULT</span>}
                      </td>
                      <td className="py-3 px-3 text-gray-400">{b.size}</td>
                      <td className="py-3 px-3 text-gray-400 text-xs">{b.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Steps */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Step-by-Step: YouTube MP3 Convert Karo</h2>
            <div className="space-y-4">
              {[
                { n: '01', t: 'YouTube video ka URL copy karo', d: 'Address bar se ya Share → "Copy link" se URL copy karo.' },
                { n: '02', t: 'MP3 Converter pe aao', d: 'reelnest.com/mp3-converter kholo. Apna preferred bitrate select karo.' },
                { n: '03', t: 'URL paste karo', d: 'Input box mein paste karo aur "Convert to MP3" press karo.' },
                { n: '04', t: '"Download MP3" click karo', d: 'Processing ke baad ek bada green button aayega — click karo aur MP3 save hogi.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-bold flex items-center justify-center shrink-0">{n}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{t}</p>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section className="glass rounded-2xl p-6 border border-emerald-500/15">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Best Use Cases</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: 'Music Downloads', desc: 'Live concerts, covers, mashups jo Spotify pe nahi hain' },
                { title: 'Podcasts & Talks', desc: 'TED talks, interviews, lectures offline save karo' },
                { title: 'Study Audio', desc: 'Language lessons, tutorials background mein chalaao' },
                { title: 'Workout Music', desc: 'Gym mein bina internet ke music sunne ke liye' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-emerald-500/5 rounded-xl p-3.5">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-gray-400 mt-1">{desc}</p>
                </div>
              ))}
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
                { href: '/blog/youtube-shorts-downloader', label: 'YouTube Shorts Downloader' },
                { href: '/blog/instagram-reel-download-hd', label: 'Instagram Reel Download HD' },
                { href: '/blog/download-reels-without-watermark', label: 'Download Reels Without Watermark' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <div className="mt-10 text-center">
          <Link href="/mp3-converter" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300">
            YouTube MP3 Convert Karo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
