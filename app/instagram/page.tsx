'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Film, Image as ImageIcon, User, Video, Music, Download, Loader as Loader2, CircleCheck as CheckCircle2, Link2, Clipboard, CircleAlert as AlertCircle, ArrowDown } from 'lucide-react';
import { DownloadHistory } from '@/components/reelnest/download-history';
import { toast } from 'sonner';
import axios from 'axios';

type DownloadType = 'reel' | 'story' | 'dp' | 'video';

interface DownloadItem {
  quality: string;
  format: string;
  size: string;
  url: string;
  direct: boolean;
}

interface DownloadResult {
  thumbnail?: string;
  title?: string;
  author?: string;
  isVideo?: boolean;
  downloads: DownloadItem[];
}

const DOWNLOAD_TYPES: { key: DownloadType; label: string; icon: React.ElementType }[] = [
  { key: 'reel',  label: 'Reel',   icon: Film      },
  { key: 'story', label: 'Story',  icon: ImageIcon },
  { key: 'dp',    label: 'DP',     icon: User      },
  { key: 'video', label: 'Video',  icon: Instagram },
];

const INSTAGRAM_URL_REGEX = /https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|reels|stories)\/[A-Za-z0-9_-]+/;

async function triggerDownload(mediaUrl: string, filename: string) {
  const a = document.createElement('a');
 a.href = mediaUrl;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ── Single big download button ──────────────────────────────────────
function BigDownloadButton({
  item,
  label,
  accent,
}: {
  item: DownloadItem;
  label: string;
  accent: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    await triggerDownload(item.url, `reelnest-instagram-${Date.now()}.${item.format}`);
    setState('done');
    toast.success('Download started!');
    setTimeout(() => setState('idle'), 4000);
  };

  const isLoading = state === 'loading';
  const isDone    = state === 'done';

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading}
      className={`relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:cursor-not-allowed overflow-hidden ${accent}`}
      whileHover={isLoading ? {} : { scale: 1.015, y: -1 }}
      whileTap={isLoading ? {} : { scale: 0.97 }}
    >
      {/* animated shimmer on idle */}
      {!isLoading && !isDone && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ x: '-100%' }}
          animate={{ x: '150%' }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
          style={{ skewX: '-20deg' }}
        />
      )}
      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isDone ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <ArrowDown className="w-5 h-5" />
        )}
        {isLoading ? 'Downloading…' : isDone ? 'Downloaded!' : label}
      </span>
    </motion.button>
  );
}

// ── Main page ────────────────────────────────────────────────────────
export default function InstagramPage() {
  const [inputUrl, setInputUrl]       = useState('');
  const [downloadType, setDownloadType] = useState<DownloadType>('reel');
  const [loading, setLoading]         = useState(false);
  const [result, setResult]           = useState<DownloadResult | null>(null);
  const [error, setError]             = useState('');
  const fetchedRef                    = useRef('');

  const fetchMedia = useCallback(async (url: string, type: DownloadType) => {
    const key = url + type;
    if (fetchedRef.current === key) return;
    fetchedRef.current = key;

    setLoading(true);
    setError('');
    setResult(null);

    try {
     const res = await axios.post(
  'https://cobalt-api-1sa1.onrender.com/',
  {
    url: url,
    downloadMode: 'auto',
    filenameStyle: 'classic'
  },
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
);
      console.log('COBALT RESPONSE:', res.data);
    const data = res.data;

const downloadUrl =
  data?.url ||
  data?.picker?.[0]?.url ||
  data?.picker?.[0]?.audio;

if (!downloadUrl) {
  throw new Error('Could not retrieve download link');
}

setResult({
  thumbnail: data?.picker?.[0]?.thumb || data?.thumbnail || '',
  title: data?.filename || data?.picker?.[0]?.filename || 'Instagram Media',
  author: 'ReelNest',
  isVideo: true,
  downloads: [
    {
      quality: 'HD',
      format: 'mp4',
      size: 'Fast Download',
      url: downloadUrl,
      direct: true
    }
  ]
});

      const history = JSON.parse(localStorage.getItem('reelnest_history') || '[]');
      localStorage.setItem('reelnest_history', JSON.stringify(
        [{ id: Date.now().toString(), url, platform: 'instagram', type, quality: 'auto', timestamp: Date.now() },
          ...history].slice(0, 20)
      ));
    } catch (err: any) {
      fetchedRef.current = '';
console.log('FULL ERROR:', err);
console.log('ERROR RESPONSE:', err.response?.data);

const msg =
  err.response?.data?.text ||
  err.response?.data?.error ||
  err.response?.data?.message ||
  err.message ||
  'Failed to fetch. Make sure the post is public.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on valid paste
  useEffect(() => {
    const v = inputUrl.trim();
    if (INSTAGRAM_URL_REGEX.test(v)) fetchMedia(v, downloadType);
  }, [inputUrl, downloadType, fetchMedia]);

  // Pre-fill from ?url= param
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('url');
    if (p) setInputUrl(p);
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
      fetchedRef.current = '';
    } catch { /* denied */ }
  };

  const handleFetch = () => {
    const v = inputUrl.trim();
    if (!v) return;
    fetchedRef.current = '';
    fetchMedia(v, downloadType);
  };

  // Best MP4, then best other
  const mp4Items = result?.downloads.filter(d => d.format === 'mp4')  ?? [];
  const mp3Items = result?.downloads.filter(d => d.format === 'mp3')  ?? [];
  const imgItems = result?.downloads.filter(d => d.format === 'jpg' || d.format === 'png') ?? [];
  const bestMp4  = mp4Items[0];
  const bestMp3  = mp3Items[0];
  const bestImg  = imgItems[0];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E4405F]/20 to-[#833AB4]/20 border border-[#E4405F]/20 mb-5">
            <Instagram className="w-8 h-8 text-[#E4405F]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Instagram <span className="neon-text">Downloader</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Reels, Posts, Stories, DP — paste link, one click download
          </p>
        </motion.div>

        {/* ── Type Tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {DOWNLOAD_TYPES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setDownloadType(key);
                setResult(null);
                setError('');
                fetchedRef.current = '';
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                downloadType === key
                  ? 'bg-gradient-to-r from-[#E4405F] to-[#833AB4] text-white shadow-neon-red'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* ── URL Input Card ── */}
        <motion.div
          className="glass rounded-2xl p-5 sm:p-6 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Paste Instagram URL
          </label>

          {/* Input row */}
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E4405F] to-[#833AB4] rounded-xl opacity-0 group-focus-within:opacity-50 blur transition-opacity duration-300" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <Link2 className="w-4 h-4 text-gray-500 ml-3 shrink-0" />
                <input
                  type="url"
                  value={inputUrl}
                  onChange={e => {
                    setInputUrl(e.target.value);
                    setResult(null);
                    setError('');
                    fetchedRef.current = '';
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleFetch()}
                  placeholder="https://www.instagram.com/reel/..."
                  className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder:text-gray-600 focus:outline-none text-sm"
                  autoComplete="off"
                  spellCheck={false}
                />
                {inputUrl && (
                  <button
                    onClick={() => { setInputUrl(''); setResult(null); setError(''); fetchedRef.current = ''; }}
                    className="pr-3 text-gray-600 hover:text-gray-300 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handlePaste}
              className="px-4 py-3 glass rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Clipboard className="w-4 h-4" />
              <span className="hidden sm:inline">Paste</span>
            </button>
          </div>

          {/* Download button */}
          <motion.button
            onClick={handleFetch}
            disabled={loading || !inputUrl.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#E4405F] to-[#833AB4] text-white font-bold rounded-xl hover:shadow-neon-red disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Fetching…</>
            ) : (
              <><Download className="w-4 h-4" />Download</>
            )}
          </motion.button>

          <p className="text-center text-xs text-gray-600 mt-3">
            URL paste karte hi automatically fetch hoga · Public posts only
          </p>
        </motion.div>

        {/* ── Error ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-5"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Loading skeleton ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="glass rounded-2xl overflow-hidden mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* thumbnail skeleton */}
              <div className="aspect-video bg-white/5 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                <div className="h-12 bg-white/5 rounded-xl animate-pulse mt-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result Card ── */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              className="glass rounded-2xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Thumbnail */}
              {result.thumbnail && (
                <div className="relative aspect-video bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.thumbnail}
                    alt={result.title || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {result.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <Video className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  {/* Title overlay */}
                  {(result.title || result.author) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {result.title && <p className="text-sm font-semibold text-white line-clamp-1">{result.title}</p>}
                      {result.author && <p className="text-xs text-gray-300 mt-0.5">{result.author}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* No thumbnail fallback */}
              {!result.thumbnail && (result.title || result.author) && (
                <div className="px-5 pt-4 pb-2">
                  {result.title && <p className="text-sm font-semibold text-white">{result.title}</p>}
                  {result.author && <p className="text-xs text-gray-400 mt-0.5">{result.author}</p>}
                </div>
              )}

              {/* ── Download buttons — one per format ── */}
              <div className="p-4 sm:p-5 space-y-3">

                {/* MP4 — primary CTA */}
                {bestMp4 && (
                  <BigDownloadButton
                    item={bestMp4}
                    label={`Download Video  ·  ${bestMp4.quality}  ·  ${bestMp4.size}`}
                    accent="bg-gradient-to-r from-[#E4405F] to-[#c13584] hover:shadow-neon-red"
                  />
                )}

                {/* MP3 — secondary */}
                {bestMp3 && (
                  <BigDownloadButton
                    item={bestMp3}
                    label={`Download Audio  ·  MP3  ·  ${bestMp3.size}`}
                    accent="bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-[0_0_18px_rgba(16,185,129,0.5)]"
                  />
                )}

                {/* Image */}
                {bestImg && !bestMp4 && (
                  <BigDownloadButton
                    item={bestImg}
                    label={`Download Image  ·  HD  ·  ${bestImg.size}`}
                    accent="bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-[0_0_18px_rgba(245,158,11,0.5)]"
                  />
                )}

                {/* Extra quality options (collapsed by default, shown only when >1 MP4) */}
                {mp4Items.length > 1 && (
                  <details className="group">
                    <summary className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer select-none text-center py-1 transition-colors">
                      More quality options ▾
                    </summary>
                    <div className="mt-2 space-y-2">
                      {mp4Items.slice(1).map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div>
                            <span className="text-sm font-medium text-white">{item.quality}</span>
                            <span className="text-xs text-gray-500 ml-2">{item.size}</span>
                          </div>
                          <button
                            onClick={async () => {
                              await triggerDownload(item.url, `reelnest-instagram-${Date.now()}.${item.format}`);
                              toast.success('Download started!');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-all"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Tips box ── */}
        {!result && !loading && !error && (
          <motion.div
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">How to download</p>
            <ol className="space-y-2.5">
              {[
                'Instagram app mein Reel/Post/Story open karo',
                '3 dots → Copy Link → wapas yahan aao',
                'URL paste karo — automatic fetch hoga',
                '"Download Video" button press karo',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-[#E4405F]/20 text-[#E4405F] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        <DownloadHistory />
      </div>
    </div>
  );
}
