'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Youtube,
  Download,
  Loader as Loader2,
  CircleAlert as AlertCircle,
  CircleCheck as CheckCircle2,
  Link2,
  Clipboard,
  Video,
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
  duration?: string;
  author?: string;
  downloads: DownloadItem[];
}

const QUALITY_OPTIONS = ['1080p', '720p', '480p', '360p'] as const;

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

function getYouTubeThumbnail(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  if (!match) return '';

  return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
}

function BigDownloadButton({
  item,
  label,
  isMain
}: {
  item: DownloadItem;
  label: string;
  isMain?: boolean;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;

    setState('loading');

    await triggerDownload(
      item.url,
      `reelnest-youtube-${Date.now()}.${item.format}`
    );

    setState('done');

    toast.success('Download started!');

    setTimeout(() => {
      setState('idle');
    }, 4000);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={state === 'loading'}
      className={`relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:cursor-not-allowed overflow-hidden ${
        isMain
          ? 'bg-gradient-to-r from-[#FF0000] to-red-700 hover:shadow-neon-red'
          : 'bg-white/8 hover:bg-white/12 border border-white/10'
      }`}
      whileHover={state === 'loading' ? {} : { scale: 1.015, y: -1 }}
      whileTap={state === 'loading' ? {} : { scale: 0.97 }}
    >
      {isMain && state === 'idle' && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ x: '-100%' }}
          animate={{ x: '150%' }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 1
          }}
          style={{ skewX: '-20deg' }}
        />
      )}

      <span className="relative flex items-center gap-2">
        {state === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : state === 'done' ? (
          <CircleCheck2 className="w-5 h-5" />
        ) : (
          <ArrowDown className="w-5 h-5" />
        )}

        {state === 'loading'
          ? 'Downloading…'
          : state === 'done'
          ? 'Downloaded!'
          : label}
      </span>
    </motion.button>
  );
}

export default function YouTubePage() {
  const [inputUrl, setInputUrl] = useState('');
  const [quality, setQuality] =
    useState<typeof QUALITY_OPTIONS[number]>('720p');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');

  const fetchedRef = useRef('');

  const fetchVideo = useCallback(async (url: string, q: string) => {
    const key = url + q;

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
          downloadMode: 'auto',
          videoQuality: q.replace('p', ''),
          youtubeVideoCodec: 'h264',
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
      let thumbnail = getYouTubeThumbnail(url);
      let title = 'YouTube Video';

      if (data?.url) {
        downloadUrl = data.url;
      }

      if (!downloadUrl && data?.tunnel) {
        downloadUrl = data.tunnel;
      }

      if (!downloadUrl && data?.picker?.length > 0) {
        downloadUrl =
          data.picker[0]?.url ||
          data.picker[0]?.items?.[0]?.url ||
          data.picker[0]?.video ||
          '';
      }

      if (data?.thumbnail) {
        thumbnail = data.thumbnail;
      }

      if (data?.thumb) {
        thumbnail = data.thumb;
      }

      if (data?.picker?.[0]?.thumb) {
        thumbnail = data.picker[0].thumb;
      }

      if (data?.filename) {
        title = data.filename;
      }

      if (data?.picker?.[0]?.filename) {
        title = data.picker[0].filename;
      }

      console.log('DOWNLOAD URL:', downloadUrl);

      if (!downloadUrl) {
        throw new Error('Could not retrieve download link');
      }

      setResult({
        thumbnail,
        title,
        duration: '',
        author: 'ReelNest',
        downloads: [
          {
            quality: q,
            format: 'mp4',
            size: 'Direct Download',
            url: downloadUrl,
            direct: true
          }
        ]
      });

      const history = JSON.parse(
        localStorage.getItem('reelnest_history') || '[]'
      );

      localStorage.setItem(
        'reelnest_history',
        JSON.stringify(
          [
            {
              id: Date.now().toString(),
              url,
              platform: 'youtube',
              type: 'mp4',
              quality: q,
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

      const rawMsg =
        err.response?.data?.text ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch. Make sure the video is public.';

      const msg =
        typeof rawMsg === 'string'
          ? rawMsg
          : rawMsg?.code
          ? String(rawMsg.code)
          : JSON.stringify(rawMsg);

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
      fetchVideo(p, quality);
    }
  }, []);

  const handleFetch = () => {
    const v = inputUrl.trim();

    if (!v) {
      toast.error('Please paste YouTube URL');
      return;
    }

    fetchedRef.current = '';
    fetchVideo(v, quality);
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

  const mp4Items =
    result?.downloads.filter((d) => d.format === 'mp4') ?? [];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/20 mb-5">
            <Youtube className="w-8 h-8 text-[#FF0000]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            YouTube <span className="neon-text">Downloader</span>
          </h1>

          <p className="text-gray-400 text-sm">
            Paste YouTube link → select quality → direct download
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center flex-wrap gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {QUALITY_OPTIONS.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuality(q);
                fetchedRef.current = '';
                setResult(null);
                setError('');
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                quality === q
                  ? 'bg-gradient-to-r from-[#FF0000] to-red-700 text-white'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {q}
            </button>
          ))}
        </motion.div>

        <div className="glass rounded-2xl p-5 sm:p-6 mb-5">
          <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Paste YouTube URL
          </label>

          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
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
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleFetch()
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder:text-gray-600 focus:outline-none text-sm"
                />
              </div>
            </div>

            <button
              onClick={handlePaste}
              className="px-4 py-3 glass rounded-xl text-sm font-semibold text-gray-300"
            >
              <Clipboard className="w-4 h-4" />
            </button>
          </div>

          <motion.button
            onClick={handleFetch}
            disabled={loading || !inputUrl.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#FF0000] to-red-700 text-white font-bold rounded-xl"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Fetch Download Link
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />

              <p className="text-sm text-red-300">
                {String(error)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              className="glass rounded-2xl overflow-hidden mb-8"
            >
              {result.thumbnail && (
                <div className="relative aspect-video bg-black/60">
                  <img
                    src={result.thumbnail}
                    alt={result.title || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        getYouTubeThumbnail(inputUrl);
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Video className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs rounded-full font-bold">
                    {quality}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-semibold text-white line-clamp-1">
                      {result.title}
                    </p>

                    <p className="text-xs text-gray-300 mt-0.5">
                      {result.author}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-5 space-y-3">
                {mp4Items[0] && (
                  <BigDownloadButton
                    item={mp4Items[0]}
                    label={`Download Video · ${mp4Items[0].quality}`}
                    isMain
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DownloadHistory />
      </div>
    </div>
  );
}