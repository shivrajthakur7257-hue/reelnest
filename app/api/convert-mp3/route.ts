import { NextRequest, NextResponse } from 'next/server';
import {
  extractYouTubeVideoId,
  fetchViaApify,
  fetchViaCobalt,
  fetchYouTubeMeta,
  isValidYouTubeUrl,
} from '@/lib/downloader';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const { url, bitrate = '192' } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL. Only YouTube URLs are supported for MP3 conversion.' },
        { status: 400 },
      );
    }

    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'Could not extract video ID' }, { status: 400 });
    }

    const [meta, cobaltResult, apifyResult] = await Promise.all([
      fetchYouTubeMeta(url, videoId),
      fetchViaCobalt(url, {
        downloadMode: 'audio',
        audioFormat: 'mp3',
        audioBitrate: String(bitrate),
      }),
      fetchViaApify(url),
    ]);

    const directAudioUrl = cobaltResult?.url || apifyResult?.audioUrl || null;

    if (!directAudioUrl) {
      return NextResponse.json(
        { error: 'Could not retrieve audio link. Public videos work best; try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      thumbnail: meta.thumbnail,
      title: meta.title,
      author: meta.author,
      videoId,
      downloads: [
        {
          quality: `${bitrate} kbps`,
          format: 'mp3',
          size: 'varies',
          url: directAudioUrl,
          direct: true,
        },
      ],
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', detail }, { status: 500 });
  }
}
