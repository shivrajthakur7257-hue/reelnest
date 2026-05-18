'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Download,
  Loader as Loader2,
  CircleAlert as AlertCircle,
  CircleCheck as CheckCircle2,
  Link2,
  Clipboard,
  Headphones,
  ArrowDown
} from 'lucide-react';
import { DownloadHistory } from '@/components/reelnest/download-history';
import { toast } from 'sonner';
import axios from 'axios';

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
  downloads: DownloadItem[];
}

const BITRATES = ['320', '256', '192', '128'] as const;

async function triggerDownload(mediaUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = mediaUrl;
  a.target = '_blank';
  a.download = filename;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function BigDownloadButton({ item, label }: { item: DownloadItem; label: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;

    setState('loading');
    await triggerDownload(item.url, `reelnest-audio-${Date.now()}.mp3`);
    setState('done');

    toast.success('Download started!');
    setTimeout(() => setState('idle'), 4000);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={state === 'loading'}
      className="relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 disabled:cursor-not-allowed overflow-hidden"
      whileHover={state === 'loading' ? {} : { scale: 1.015, y: -1 }}
      whileTap={state === 'loading' ? {} : { scale: 0.97 }}
    >
      {state === 'idle' && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ x: '-100%' }}
          animate={{ x: '150%' }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
          style={{ skewX: '-20deg' }}
        />
      )}

      <span className="relative flex items-center gap-2">
        {state === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : state === 'done' ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <ArrowDown className="w-5 h-5" />
        )}
        {state === 'loading' ? 'Downloading…' : state === 'done' ? 'Downloaded!' : label}
      </span>
    </motion.button>
  );
}

export default function MP3ConverterPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [bitrate, setBitrate] = useState<typeof BITRATES[number]>('192');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');
  const fetchedRef = useRef('');

  const fetchAudio = useCallback(async (url: string, br: string) => {
    const key = url + br;
    if (fetchedRef.current === key) return;
    fetchedRef.current = key;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post(
        'https://cobalt-api-1sa1.onrender.com/',
        {
          url,
          downloadMode: 'audio',
          audioFormat: 'mp3',
          audioBitrate: br,
          filenameStyle: 'classic'
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      const data = res.data;
      console.log('COBALT RESPONSE:', data);

      let downloadUrl = '';
      let thumbnail = '';
      let title = 'YouTube Audio';

      if (data?.url) {
        downloadUrl = data.url;
      }

      if (!downloadUrl && data?.picker?.length > 0) {
        downloadUrl =
          data.picker[0]?.url ||
          data.picker[0]?.items?.[0]?.url ||
          data.picker[0]?.audio ||
          '';
      }

      thumbnail =
        data?.thumbnail ||
        data?.thumb ||
        data?.picker?.[0]?.thumb ||
        data?.picker?.[0]?.thumbnail ||
        '';

      title =
        data?.filename ||
        data?.picker?.[0]?.filename ||
        'YouTube Audio';

      console.log('DOWNLOAD URL:', downloadUrl);

      if (!downloadUrl) {
        throw new Error('Could not retrieve download link');
      }

      setResult({
        thumbnail,
        title,
        author: 'ReelNest',
        downloads: [
          {
            quality: `${br} kbps`,
            format: 'mp3',
            size: 'Direct Download',
            url: downloadUrl,
            direct: true
          }
        ]
      });

      const history = JSON.parse(localStorage.getItem('reelnest_history') || '[]');

      localStorage.setItem(
        'reelnest_history',
        JSON.stringify(
          [
            {
              id: Date.now().toString(),
              url,
              platform: 'mp3',
              type: 'mp3',
              quality: `${br}kbps`,
              timestamp: Date.now()
            },
            ...history
          ].slice(0, 20)
        )
      );
    } catch (err: any) {
      fetchedRef.current = '';

      console.log('FULL ERROR:', err);
      console.log('ERROR RESPONSE:', err.response?.data);

      const msg =
        err.response?.data?.text ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to convert. Make sure the YouTube link is public.';

      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('url');
    if (p) {
      setInputUrl(p);
      fetchAudio(p, bitrate);
    }
  }, []);

  const handleFetch = () => {
    const v = inputUrl.trim();

    if (!v) {
      toast.error('Please paste YouTube URL');
      return;
    }

    fetchedRef.current = '';
    fetchAudio(v, bitrate);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
      fetchedRef.current = '';
      setResult(null);
      setError('');
    } catch {}
  };

  const mp3Items = result?.downloads.filter((d) => d.format === 'mp3') ?? [];
  const best = mp3Items[0];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <Music className="w-8 h-8 text-emerald-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            YouTube to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              MP3
            </span>
          </h1>

          <p className="text-gray-400 text-sm">
            Paste YouTube link → one click → MP3 downloaded
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {BITRATES.map((br) => (
            <button
              key={br}
              onClick={() => {
                setBitrate(br);
                fetchedRef.current = '';
                setResult(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                bitrate === br
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {br} kbps
            </button>
          ))}
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-5 sm:p-6 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Paste YouTube URL
          </label>

          <div className="flex gap-2 mb-3">
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl opacity-0 group-focus-within:opacity-50 blur transition-opacity duration-300" />

              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <Link2 className="w-4 h-4 text-gray-500 ml-3 shrink-0" />

                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    fetchedRef.current = '';
                    setResult(null);
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder:text-gray-600 focus:outline-none text-sm"
                  autoComplete="off"
                  spellCheck={false}
                />

                {inputUrl && (
                  <button
                    onClick={() => {
                      setInputUrl('');
                      setResult(null);
                      setError('');
                      fetchedRef.current = '';
                    }}
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

          <motion.button
            onClick={handleFetch}
            disabled={loading || !inputUrl.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Converting…
              </>
            ) : (
              <>
                <Music className="w-4 h-4" />
                Convert to MP3
              </>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="glass rounded-2xl overflow-hidden mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="aspect-video bg-white/5 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                <div className="h-12 bg-white/5 rounded-xl animate-pulse mt-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              className="glass rounded-2xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {result.thumbnail && (
                <div className="relative aspect-video bg-black/60">
                  <img
                    src={result.thumbnail}
                    alt={result.title || 'Audio'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.style.display =
                        'none';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-emerald-300" />
                    </div>
                  </div>

                  {(result.title || result.author) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {result.title && (
                        <p className="text-sm font-semibold text-white line-clamp-1">
                          {result.title}
                        </p>
                      )}
                      {result.author && (
                        <p className="text-xs text-gray-300 mt-0.5">
                          {result.author}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 sm:p-5 space-y-3">
                {best && (
                  <BigDownloadButton
                    item={best}
                    label={`Download MP3 · ${best.quality} · ${best.size}`}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && !error && (
          <motion.div
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              How to convert
            </p>

            <ol className="space-y-2.5">
              {[
                'YouTube video open karo aur URL copy karo',
                'Upar input mein paste karo',
                'Apna bitrate choose karo',
                '"Convert to MP3" click karo — MP3 file save hogi',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
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