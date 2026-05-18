import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_YOUTUBE_DOMAINS = ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"];

function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return VALID_YOUTUBE_DOMAINS.some((d) => parsed.hostname === d || parsed.hostname.endsWith("." + d));
  } catch {
    return false;
  }
}

function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("?")[0];
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

// cobalt v10+ API — POST / with downloadMode: "audio"
async function fetchViaCobaltAudio(url: string): Promise<{ url: string } | null> {
  const COBALT_INSTANCES = [
    "https://cobalt-api.meowing.de",
    "https://cobalt-backend.canine.tools",
    "https://capi.3kh0.net",
  ];

  for (const instance of COBALT_INSTANCES) {
    try {
      const res = await fetch(`${instance}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "ReelNest/1.0",
        },
        body: JSON.stringify({
          url,
          audioFormat: "mp3",
          audioBitrate: "320",
          downloadMode: "audio",
          filenameStyle: "basic",
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      if ((data.status === "tunnel" || data.status === "redirect") && data.url) {
        return { url: data.url };
      }
      if (data.status === "picker" && data.picker?.length) {
        return { url: data.picker[0].url };
      }
    } catch {
      // try next instance
    }
  }
  return null;
}

async function fetchViaApify(url: string): Promise<{ audioUrl?: string } | null> {
  const token = Deno.env.get("APIFY_TOKEN");
  if (!token) return null;

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/streamers~youtube-video-downloader/run-sync-get-dataset-items?token=${token}&timeout=60`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videos: [{ url }] }),
      }
    );

    if (!res.ok) return null;
    const items = await res.json();
    if (!Array.isArray(items) || !items[0]) return null;
    const item = items[0];
    return { audioUrl: item.audioUrl || item.videoUrl || undefined };
  } catch {
    return null;
  }
}

async function fetchYouTubeMeta(url: string, videoId: string): Promise<{ title: string; author: string; thumbnail: string }> {
  try {
    const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}&format=json`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.title && !data.error) {
        return {
          title: data.title,
          author: data.author_name || "YouTube Creator",
          thumbnail: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        };
      }
    }
  } catch {
    // fallback
  }
  return {
    title: "YouTube Audio",
    author: "YouTube Creator",
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

async function logDownload(supabaseUrl: string, serviceKey: string, data: Record<string, string>) {
  try {
    await fetch(`${supabaseUrl}/rest/v1/download_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });
  } catch {
    // non-fatal
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { url, bitrate = "192" } = body;

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidYouTubeUrl(url)) {
      return new Response(JSON.stringify({ error: "Invalid YouTube URL. Only YouTube URLs are supported for MP3 conversion." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return new Response(JSON.stringify({ error: "Could not extract video ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [meta, cobaltResult, apifyResult] = await Promise.all([
      fetchYouTubeMeta(url, videoId),
      fetchViaCobaltAudio(url),
      fetchViaApify(url),
    ]);

    const directAudioUrl = cobaltResult?.url || apifyResult?.audioUrl || null;

    if (!directAudioUrl) {
      return new Response(JSON.stringify({ error: "Could not retrieve audio link. Please try again." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const downloads = [
      { quality: "320 kbps", format: "mp3", size: "~8 MB", url: directAudioUrl, direct: true },
      { quality: "256 kbps", format: "mp3", size: "~6 MB", url: directAudioUrl, direct: true },
      { quality: "192 kbps", format: "mp3", size: "~5 MB", url: directAudioUrl, direct: true },
      { quality: "128 kbps", format: "mp3", size: "~3 MB", url: directAudioUrl, direct: true },
    ];

    const result = {
      thumbnail: meta.thumbnail,
      title: meta.title,
      author: meta.author,
      videoId,
      downloads,
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && serviceKey) {
      await logDownload(supabaseUrl, serviceKey, {
        url,
        platform: "youtube",
        download_type: "mp3",
        quality: `${bitrate}kbps`,
        ip_address: req.headers.get("x-forwarded-for") || "",
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
