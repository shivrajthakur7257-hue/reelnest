import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_INSTAGRAM_DOMAINS = ["instagram.com", "www.instagram.com", "instagr.am"];

function isValidInstagramUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return VALID_INSTAGRAM_DOMAINS.some((d) => parsed.hostname === d || parsed.hostname.endsWith("." + d));
  } catch {
    return false;
  }
}

function extractShortcode(url: string): string | null {
  const match = url.match(/\/(p|reel|tv|reels|stories\/[^/]+)\/([A-Za-z0-9_-]+)/);
  return match ? match[2] : null;
}

// cobalt v10+ API — POST / with new schema
async function fetchViaCobalt(url: string): Promise<{ url: string; filename?: string } | null> {
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
          videoQuality: "720",
          audioFormat: "mp3",
          downloadMode: "auto",
          filenameStyle: "basic",
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      if ((data.status === "tunnel" || data.status === "redirect") && data.url) {
        return { url: data.url, filename: data.filename };
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

async function fetchInstagramMeta(url: string): Promise<{ thumbnail: string; title: string; author: string }> {
  const shortcode = extractShortcode(url);

  if (shortcode) {
    try {
      const embedRes = await fetch(`https://www.instagram.com/p/${shortcode}/embed/captioned/`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://www.instagram.com/",
        },
      });
      if (embedRes.ok) {
        const html = await embedRes.text();
        const thumbMatch = html.match(/display_url":"([^"]+)"/) || html.match(/thumbnail_src":"([^"]+)"/);
        const thumbnail = thumbMatch ? thumbMatch[1].replace(/\\u0026/g, "&").replace(/\\/g, "") : "";
        const authorMatch = html.match(/"username":"([^"]+)"/);
        const author = authorMatch ? `@${authorMatch[1]}` : "Instagram User";
        const captionMatch = html.match(/"edge_media_to_caption":\{"edges":\[\{"node":\{"text":"([^"]{0,120})/);
        const title = captionMatch ? captionMatch[1].replace(/\\n/g, " ").trim() || "Instagram Post" : "Instagram Post";
        return { thumbnail, title, author };
      }
    } catch {
      // fallback
    }
  }

  try {
    const noembedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}&format=json`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (noembedRes.ok) {
      const data = await noembedRes.json();
      if (!data.error) {
        return {
          thumbnail: data.thumbnail_url || "",
          title: data.title || "Instagram Post",
          author: data.author_name ? `@${data.author_name}` : "Instagram User",
        };
      }
    }
  } catch {
    // ignore
  }

  return { thumbnail: "", title: "Instagram Post", author: "Instagram User" };
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
    const { url, type = "reel" } = body;

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidInstagramUrl(url)) {
      return new Response(JSON.stringify({ error: "Invalid Instagram URL" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [meta, cobaltResult] = await Promise.all([
      fetchInstagramMeta(url),
      type !== "dp" ? fetchViaCobalt(url) : Promise.resolve(null),
    ]);

    let downloads: { quality: string; format: string; size: string; url: string; direct: boolean }[] = [];

    if (type === "dp") {
      const imgUrl = meta.thumbnail || url;
      downloads = [
        { quality: "HD", format: "jpg", size: "~800 KB", url: imgUrl, direct: true },
      ];
    } else if (cobaltResult?.url) {
      downloads = [
        { quality: "HD 720p", format: "mp4", size: "~15–40 MB", url: cobaltResult.url, direct: true },
        { quality: "Audio Only", format: "mp3", size: "~3–8 MB", url: cobaltResult.url, direct: true },
      ];
    } else {
      return new Response(JSON.stringify({ error: "Could not retrieve download link. Please try again." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = {
      thumbnail: meta.thumbnail,
      title: meta.title,
      author: meta.author,
      isVideo: type !== "dp",
      downloads,
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && serviceKey) {
      await logDownload(supabaseUrl, serviceKey, {
        url,
        platform: "instagram",
        download_type: type,
        quality: "auto",
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
