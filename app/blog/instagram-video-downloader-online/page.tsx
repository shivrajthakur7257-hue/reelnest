import Link from 'next/link';
import type { Metadata } from 'next';
import { Instagram, ArrowRight, CircleCheck as CheckCircle, Star, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader Online – No App Needed (Free)',
  description: 'Download Instagram videos, Reels, IGTV, and Stories online without installing any app. Free, fast, and works on all devices.',
  keywords: ['instagram video downloader online', 'instagram video download free', 'save instagram video online', 'download instagram without app'],
  openGraph: {
    title: 'Instagram Video Downloader Online – No App Needed',
    description: 'Download Instagram videos, Reels, IGTV, Stories online for free.',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Kya koi app install karni padegi?',
    a: 'Nahi! ReelNest browser-based tool hai. Chrome, Safari, Firefox — kisi bhi browser mein kaam karta hai, koi extension ya app download nahi karna.',
  },
  {
    q: 'Instagram ke kaunse content types download ho sakte hain?',
    a: 'Reels, regular posts (video), IGTV, Stories, aur Profile Pictures (DP). Alag-alag types ke liye alag tabs available hain Instagram page pe.',
  },
  {
    q: 'Private account ki videos download ho sakti hain?',
    a: 'Nahi — sirf public content download ho sakta hai. Agar account private hai aur aap follow nahi karte, toh content accessible nahi hoga.',
  },
  {
    q: 'Video download hone ke baad kahan milegi?',
    a: 'Android pe Downloads folder mein, iPhone pe Files app > Downloads mein, PC pe Downloads folder mein. iOS users Files se Photos mein manually move kar sakte hain.',
  },
  {
    q: 'Kya Instagram Story download ho sakti hai?',
    a: 'Haan! Instagram page pe "Story" tab select karo, public account ka story URL paste karo, aur download karo. 24 ghante ke baad stories expire ho jaati hain toh jaldi save karo.',
  },
];

const features = [
  { title: 'Koi Account Nahi', desc: 'Login ya signup ki zaroorat nahi', icon: '🔓' },
  { title: 'All Formats', desc: 'Reels, Posts, Stories, IGTV, DP', icon: '📁' },
  { title: 'Original Quality', desc: 'No compression, no re-encoding', icon: '🎬' },
  { title: 'No Watermark', desc: 'Clean original video', icon: '✨' },
  { title: 'Mobile Friendly', desc: 'Works on any device', icon: '📱' },
  { title: '100% Free', desc: 'No limits, no subscriptions', icon: '🆓' },
];

export default function InstagramVideoDownloaderOnline() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">

        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Instagram Video Downloader Online</span>
        </nav>

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold mb-4">
            <Instagram className="w-3 h-3" /> Instagram
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Instagram Video Downloader Online<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> – No App Needed</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Koi bhi Instagram video — Reel, Post, Story, IGTV — seedha browser se download karo. Koi app install karne ki zaroorat nahi, koi account banana nahi.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
            <span>5 min read</span>
            <span>·</span>
            <span>Updated May 2026</span>
          </div>
        </div>

        <Link
          href="/instagram"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 hover:border-amber-500/50 transition-all group mb-10"
        >
          <div>
            <p className="text-sm font-bold text-white">Instagram Video Download Karo</p>
            <p className="text-xs text-gray-400 mt-0.5">Free · No App · Original Quality</p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <article className="space-y-8">

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Kyu Browser-Based Downloader Best Hai?</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Play Store aur App Store pe bahut saare "Instagram Downloader" apps hain — lekin kaafi mein ads hain, data collect karte hain, aur kuch toh malware bhi include karte hain. Browser-based tools much safer hain.
            </p>
            <p className="text-gray-400 leading-relaxed">
              ReelNest koi data store nahi karta. Aapka URL sirf processing ke liye server pe jata hai, video proxy hoti hai, aur connection close. No logs, no tracking.
            </p>
          </section>

          {/* Features grid */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">ReelNest Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map(({ title, desc, icon }) => (
                <div key={title} className="bg-white/5 rounded-xl p-3.5 text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Content types */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5">Kya Kya Download Ho Sakta Hai</h2>
            <div className="space-y-3">
              {[
                { type: 'Instagram Reels', desc: 'Vertical short-form videos, up to 90 seconds', color: 'text-[#E4405F]' },
                { type: 'Regular Posts (Video)', desc: 'Feed pe share ki gayi video posts', color: 'text-amber-400' },
                { type: 'Instagram Stories', desc: '24-ghante wali stories (public accounts)', color: 'text-blue-400' },
                { type: 'IGTV Videos', desc: 'Long-form Instagram TV content', color: 'text-emerald-400' },
                { type: 'Profile Picture (DP)', desc: 'Full resolution profile photo', color: 'text-orange-400' },
              ].map(({ type, desc, color }) => (
                <div key={type} className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 ${color} shrink-0`} />
                  <div>
                    <span className="text-sm font-semibold text-white">{type}</span>
                    <span className="text-xs text-gray-500 ml-2">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Step-by-Step Guide</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: 'Instagram pe content dhundo', d: 'Jo video, Reel, ya Story download karni hai woh public account pe honi chahiye.' },
                { n: 2, t: 'Link copy karo', d: 'Post ke 3 dots tap karo → "Copy Link". Story ke liye Share → "Copy Link".' },
                { n: 3, t: 'ReelNest pe aao', d: 'reelnest.com/instagram kholo. Sahi type tab select karo (Reel, Story, DP, Video).' },
                { n: 4, t: 'URL paste karo', d: 'Input box mein paste karo — agar valid Instagram URL hai toh automatically fetch hoga.' },
                { n: 5, t: 'Download karo', d: '"Download Video" button click karo. File device mein save hogi.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold flex items-center justify-center shrink-0">{n}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{t}</p>
                    <p className="text-sm text-gray-400 mt-1">{d}</p>
                  </div>
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
                { href: '/blog/instagram-reel-download-hd', label: 'Instagram Reel Download HD 1080p' },
                { href: '/blog/download-reels-without-watermark', label: 'Download Reels Without Watermark' },
                { href: '/blog/youtube-to-mp3-converter', label: 'YouTube to MP3 Converter' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <div className="mt-10 text-center">
          <Link href="/instagram" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300">
            Instagram Video Download Karo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
