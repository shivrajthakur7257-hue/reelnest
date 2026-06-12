import { Download, Shield, Zap, Users } from 'lucide-react';

export const metadata = {
  title: 'About ReelNest - Free Video & MP3 Downloader',
  description: 'Learn about ReelNest, the free online tool for downloading Instagram Reels, YouTube videos, and converting to MP3.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            About <span className="neon-text">ReelNest</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your go-to platform for downloading and converting online media content, fast and free.
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              ReelNest was built with a simple goal: make downloading online content easy, fast, and accessible to everyone. We believe you should be able to save your favorite reels, videos, and music without complicated software or sketchy websites.
            </p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Fast', desc: 'Downloads processed in seconds with optimized servers.' },
              { icon: Shield, title: 'Secure', desc: 'No data stored. Your privacy is our priority.' },
              { icon: Download, title: 'Free', desc: 'No hidden costs, no premium tiers. Completely free.' },
              { icon: Users, title: 'User-First', desc: 'Designed for simplicity and ease of use.' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6">
                <item.icon className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">How It Works</h2>
            <ol className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-600/20 flex items-center justify-center text-sm font-bold text-white shrink-0">1</span>
                <span>Copy the URL of the Instagram Reel, Story, or YouTube video you want to download.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-600/20 flex items-center justify-center text-sm font-bold text-white shrink-0">2</span>
                <span>Paste the URL into the input field on the relevant page.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-600/20 flex items-center justify-center text-sm font-bold text-white shrink-0">3</span>
                <span>Select your preferred quality and click Download.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-600/20 flex items-center justify-center text-sm font-bold text-white shrink-0">4</span>
                <span>Your file will be ready in seconds. Save it to your device.</span>
              </li>
            </ol>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Disclaimer</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              ReelNest is intended for personal use only. We do not host, store, or distribute any copyrighted content. Users are responsible for ensuring they have the right to download any content. Please respect the intellectual property rights of content creators and comply with the terms of service of the platforms from which you download.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
