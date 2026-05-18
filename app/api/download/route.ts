import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_DOMAINS = [
  // Instagram / Facebook CDN
  'cdninstagram.com',
  'fbcdn.net',
  'scontent',
  'instagram.com',

  // Cobalt streaming/API instances
  'cobalt.tools',
  'co.wuk.sh',
  'timelessnesses.me',
  'meowing.de',
  'canine.tools',
  '3kh0.net',

  // YouTube CDN
  'googlevideo.com',
  'youtube.com',
  'ytimg.com',
  'yt3.ggpht.com',
  'r.ytimg.com',

  // Generic trusted CDN patterns often used by upstream processors
  'cloudfront.net',
  'akamaized.net',
  'fastly.net',
  'apify.com',
  'apifyusercontent.com',
];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;

    return ALLOWED_DOMAINS.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`) || parsed.hostname.includes(domain),
    );
  } catch {
    return false;
  }
}

function makeSafeFilename(filename: string, contentType: string) {
  let safeFilename = filename || 'reelnest-download';

  if (!safeFilename.match(/\.\w{2,5}$/)) {
    if (contentType.includes('video')) safeFilename += '.mp4';
    else if (contentType.includes('audio')) safeFilename += '.mp3';
    else if (contentType.includes('jpeg')) safeFilename += '.jpg';
    else if (contentType.includes('png')) safeFilename += '.png';
    else if (contentType.includes('webp')) safeFilename += '.webp';
    else safeFilename += '.bin';
  }

  return safeFilename.replace(/[^\w.\-]/g, '_');
}

async function proxyDownload(mediaUrl: string, filename: string) {
  try {
    mediaUrl = decodeURIComponent(mediaUrl);
  } catch {
    // Already decoded.
  }

  if (!isAllowedUrl(mediaUrl)) {
    let domain = 'unknown';
    try {
      domain = new URL(mediaUrl).hostname;
    } catch {
      // ignore
    }
    return NextResponse.json({ error: 'Domain not allowed', domain }, { status: 403 });
  }

  const upstream = await fetch(mediaUrl, {
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Referer: 'https://www.instagram.com/',
      Accept: 'video/*, audio/*, image/*, */*;q=0.8',
      'Accept-Encoding': 'identity',
    },
    cache: 'no-store',
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: `Upstream returned ${upstream.status}` }, { status: 502 });
  }

  const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
  const contentLength = upstream.headers.get('content-length');
  const safeFilename = makeSafeFilename(filename, contentType);

  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename="${safeFilename}"`,
    'Cache-Control': 'no-cache, no-store',
    'X-Content-Type-Options': 'nosniff',
  };

  if (contentLength) headers['Content-Length'] = contentLength;

  return new NextResponse(upstream.body, { status: 200, headers });
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mediaUrl = searchParams.get('url') || '';
  const filename = searchParams.get('filename') || 'reelnest-download';

  if (!mediaUrl) {
    return NextResponse.json({ error: 'url parameter is required' }, { status: 400 });
  }

  return proxyDownload(mediaUrl, filename);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const mediaUrl = body.url || '';
  const filename = body.filename || 'reelnest-download';

  if (!mediaUrl) {
    return NextResponse.json({ error: 'url parameter is required' }, { status: 400 });
  }

  return proxyDownload(mediaUrl, filename);
}
