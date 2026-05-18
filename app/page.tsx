'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Download, Zap, Shield, Smartphone, Instagram, Youtube, Music, ArrowRight, Star, Globe, Clock, Users, TrendingDown, CircleCheck as CheckCircle } from 'lucide-react';
import { URLInput } from '@/components/reelnest/url-input';
import { FeatureCard } from '@/components/reelnest/feature-card';
import { FAQSection } from '@/components/reelnest/faq-section';
import { useState, useEffect, useRef } from 'react';

// Floating particle component
function Particle({ x, y, size, color, delay }: { x: number; y: number; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

const PARTICLES = [
  { x: 10,  y: 20,  size: 3, color: 'rgba(220,38,38,0.6)',  delay: 0   },
  { x: 85,  y: 15,  size: 2, color: 'rgba(168,85,247,0.6)', delay: 0.8 },
  { x: 25,  y: 70,  size: 4, color: 'rgba(220,38,38,0.4)',  delay: 1.5 },
  { x: 70,  y: 60,  size: 2, color: 'rgba(168,85,247,0.5)', delay: 0.4 },
  { x: 50,  y: 85,  size: 3, color: 'rgba(220,38,38,0.5)',  delay: 2   },
  { x: 90,  y: 75,  size: 2, color: 'rgba(59,130,246,0.5)', delay: 1.2 },
  { x: 5,   y: 55,  size: 2, color: 'rgba(168,85,247,0.4)', delay: 1.8 },
  { x: 60,  y: 10,  size: 3, color: 'rgba(220,38,38,0.4)',  delay: 0.6 },
  { x: 35,  y: 40,  size: 2, color: 'rgba(59,130,246,0.4)', delay: 2.2 },
  { x: 78,  y: 88,  size: 3, color: 'rgba(220,38,38,0.5)',  delay: 1   },
];

// Animated counter
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Users,        label: 'Happy Users',        value: 500000, suffix: '+' },
  { icon: Download,     label: 'Files Downloaded',    value: 2000000, suffix: '+' },
  { icon: TrendingDown, label: 'Avg. Download Speed', value: 30, suffix: 's' },
  { icon: CheckCircle,  label: 'Uptime',              value: 99, suffix: '%' },
];

const features = [
  { icon: Zap,        title: 'Lightning Fast',       description: 'Download in seconds with our optimized pipeline. No waiting, no delays.',          gradient: 'from-yellow-500/20 to-orange-500/20' },
  { icon: Shield,     title: 'Safe & Secure',        description: 'No data stored, no tracking. Your privacy is our top priority.',                   gradient: 'from-green-500/20 to-emerald-500/20' },
  { icon: Smartphone, title: 'Mobile First',         description: 'Optimized for all devices. Download on the go from any screen size.',              gradient: 'from-blue-500/20 to-cyan-500/20'    },
  { icon: Download,   title: 'Multiple Formats',     description: 'MP4, MP3, multiple resolutions. Choose what works best for you.',                   gradient: 'from-red-500/20 to-pink-500/20'     },
  { icon: Globe,      title: 'No Signup Required',   description: 'Just paste the URL and download. No accounts, no friction, no limits.',            gradient: 'from-teal-500/20 to-cyan-500/20'   },
  { icon: Clock,      title: 'Download History',     description: 'Track your recent downloads locally. Pick up right where you left off.',           gradient: 'from-orange-500/20 to-amber-500/20' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Copy the link', desc: 'Copy any Instagram Reel, Post, Story or YouTube video URL.' },
  { step: '02', title: 'Paste & fetch', desc: 'Paste the URL — we automatically fetch the video metadata and thumbnail.' },
  { step: '03', title: 'Choose format', desc: 'Select MP4 quality or MP3 bitrate from the available options.' },
  { step: '04', title: 'Direct download', desc: 'Click Download — the file instantly saves to your device.' },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleURLSubmit = (url: string) => {
    setLoading(true);
    if (url.includes('instagram.com')) {
      window.location.href = `/instagram?url=${encodeURIComponent(url)}`;
    } else {
      window.location.href = `/youtube?url=${encodeURIComponent(url)}`;
    }
  };

  return (
    <div className="relative overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/8 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/4 rounded-full blur-[200px]" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Floating particles */}
        {!prefersReduced && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-gray-300 mb-8">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              Trusted by 500K+ users worldwide
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white">Download Reels, Videos</span>
            <br />
            <span className="neon-text">&amp; MP3 in Seconds</span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Free, fast and private. Download Instagram Reels, Stories, YouTube videos and convert to MP3 — all in one place, no signup needed.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <URLInput onSubmit={handleURLSubmit} placeholder="Paste Instagram or YouTube URL…" loading={loading} />
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { href: '/youtube',       icon: Download,   label: 'Download MP4',      cls: 'from-red-500 to-red-700 hover:shadow-neon-red' },
              { href: '/mp3-converter', icon: Music,      label: 'Convert to MP3',    cls: 'from-emerald-500 to-green-700 hover:shadow-[0_0_18px_rgba(16,185,129,0.5)]' },
              { href: '/instagram',     icon: Instagram,  label: 'Download Reel',     cls: 'glass hover:bg-white/10 border-white/10' },
            ].map(({ href, icon: Icon, label, cls }) => (
              <Link key={label} href={href} className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${cls} text-white text-sm font-semibold rounded-xl transition-all duration-300`}>
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix }, i) => (
            <motion.div
              key={label}
              className="glass rounded-2xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Icon className="w-5 h-5 text-red-400 mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-white">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400">Download in 4 simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                className="glass rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.07] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute -top-2 -right-2 text-7xl font-black text-white/[0.04] select-none group-hover:text-white/[0.06] transition-colors">{step}</div>
                <div className="relative">
                  <span className="text-xs font-bold text-red-400 tracking-widest uppercase mb-3 block">{step}</span>
                  <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="neon-text">ReelNest</span>?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Built for speed, privacy, and simplicity</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Cards ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Supported Platforms</h2>
            <p className="text-gray-400">Download from your favorite platforms</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/instagram',     icon: Instagram, name: 'Instagram',    desc: 'Reels, Stories, Posts, DP', color: '#E4405F',  bg: 'from-[#E4405F]/10 to-[#833AB4]/10', border: 'border-[#E4405F]/20' },
              { href: '/youtube',       icon: Youtube,   name: 'YouTube',      desc: 'Videos, Shorts — MP4',      color: '#FF0000',  bg: 'from-[#FF0000]/10 to-red-900/10',    border: 'border-[#FF0000]/20' },
              { href: '/mp3-converter', icon: Music,     name: 'MP3 Audio',    desc: 'YouTube to MP3 converter',  color: '#1DB954',  bg: 'from-emerald-500/10 to-green-900/10', border: 'border-emerald-500/20' },
            ].map(({ href, icon: Icon, name, desc, color, bg, border }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={href} className={`group block glass rounded-2xl p-6 bg-gradient-to-br ${bg} border ${border} hover:scale-[1.02] transition-all duration-300`}>
                  <Icon className="w-8 h-8 mb-4" style={{ color }} />
                  <h3 className="text-base font-bold text-white mb-1">{name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                    Download Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-700/10 to-red-500/20 blur-2xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Download?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start downloading your favorite content in seconds. No signup, no limits, no tracking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/instagram" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl hover:shadow-neon-red transition-all duration-300">
                <Instagram className="w-5 h-5" />Instagram Downloader<ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/youtube" className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                <Youtube className="w-5 h-5" />YouTube Downloader<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />
    </div>
  );
}
