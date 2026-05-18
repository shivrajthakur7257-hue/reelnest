import { NextRequest, NextResponse } from 'next/server';
import {
  extractYouTubeVideoId,
  fetchViaApify,
  fetchViaCobalt,
  fetchYouTubeMeta,
  isValidYouTubeUrl,
  qualityToCobaltValue,
} from '@/lib/downloader';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const { url, quality = '720p', format = 'mp4' } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'Could not extract video ID' }, { status: 400 });
    }

    const selectedQuality = qualityToCobaltValue(quality);
    const [meta, cobaltResult, apifyResult] = await Promise.all([
      fetchYouTubeMeta(url, videoId),
      fetchViaCobalt(url, {
        videoQuality: selectedQuality,
        downloadMode: format === 'mp3' ? 'audio' : 'auto',
        audioFormat: 'mp3',
        youtubeVideoCodec: 'h264',
      }),
      fetchViaApify(url),
    ]);

    const directVideoUrl = cobaltResult?.url || apifyResult?.videoUrl || null;

    if (!directVideoUrl) {
      return NextResponse.json(
        { error: 'Could not retrieve download link. Public videos work best; try another quality or try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      thumbnail: meta.thumbnail,
      title: meta.title,
      duration: meta.duration,
      author: meta.author,
      videoId,
      downloads: [
        {
          quality: `${quality} MP4`,
          format: 'mp4',
          size: 'varies',
          url: directVideoUrl,
          direct: true,
        },
      ],
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', detail }, { status: 500 });
  }
}
