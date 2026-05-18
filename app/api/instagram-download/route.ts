import { NextRequest, NextResponse } from 'next/server';
import { fetchInstagramMeta, fetchViaCobalt, isValidInstagramUrl } from '@/lib/downloader';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type InstagramType = 'reel' | 'story' | 'dp' | 'video';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const { url, type = 'reel' }: { url?: string; type?: InstagramType } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidInstagramUrl(url)) {
      return NextResponse.json({ error: 'Invalid Instagram URL' }, { status: 400 });
    }

    const [meta, cobaltResult] = await Promise.all([
      fetchInstagramMeta(url),
      type !== 'dp'
        ? fetchViaCobalt(url, {
            videoQuality: '720',
            downloadMode: 'auto',
            audioFormat: 'mp3',
          })
        : Promise.resolve(null),
    ]);

    if (type === 'dp') {
      const imageUrl = meta.thumbnail;
      if (!imageUrl) {
        return NextResponse.json({ error: 'Could not retrieve profile image from this public URL.' }, { status: 503 });
      }

      return NextResponse.json({
        thumbnail: imageUrl,
        title: meta.title,
        author: meta.author,
        isVideo: false,
        downloads: [{ quality: 'HD', format: 'jpg', size: 'varies', url: imageUrl, direct: true }],
      });
    }

    if (!cobaltResult?.url) {
      return NextResponse.json(
        { error: 'Could not retrieve download link. Make sure the post is public and try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      thumbnail: meta.thumbnail,
      title: meta.title,
      author: meta.author,
      isVideo: true,
      downloads: [
        {
          quality: 'HD 720p',
          format: 'mp4',
          size: 'varies',
          url: cobaltResult.url,
          direct: true,
        },
      ],
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', detail }, { status: 500 });
  }
}
