import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Trusted domains — CDN origins we're happy to proxy
const ALLOWED_DOMAINS = [
  // Instagram / Facebook CDN
  "cdninstagram.com",
  "fbcdn.net",
  "scontent",
  "instagram.com",
  // Cobalt streaming instances
  "cobalt.tools",
  "co.wuk.sh",
  "timelessnesses.me",
  // YouTube CDN
  "googlevideo.com",
  "youtube.com",
  "ytimg.com",
  "yt3.ggpht.com",
  // Generic video CDN patterns
  "cloudfront.net",
  "akamaized.net",
  "fastly.net",
  "r.ytimg.com",
];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Must be https
    if (parsed.protocol !== "https:") return false;
    return ALLOWED_DOMAINS.some(d => parsed.hostname.endsWith(d) || parsed.hostname.includes(d));
  } catch {
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    let mediaUrl = "";
    let filename = "reelnest-download";

    if (req.method === "GET") {
      const params = new URL(req.url).searchParams;
      mediaUrl = params.get("url") || "";
      filename = params.get("filename") || filename;
    } else if (req.method === "POST") {
      const body = await req.json();
      mediaUrl = body.url || "";
      filename = body.filename || filename;
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!mediaUrl) {
      return new Response(JSON.stringify({ error: "url parameter is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Decode in case it was double-encoded
    try { mediaUrl = decodeURIComponent(mediaUrl); } catch { /* already decoded */ }

    if (!isAllowedUrl(mediaUrl)) {
      return new Response(JSON.stringify({ error: "Domain not allowed", domain: new URL(mediaUrl).hostname }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch server-side — no CORS restriction here
    const upstream = await fetch(mediaUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.instagram.com/",
        "Accept": "video/*, audio/*, image/*, */*;q=0.8",
        "Accept-Encoding": "identity",
      },
    });

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: `Upstream returned ${upstream.status}`, url: mediaUrl }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstream.headers.get("content-length");

    // Auto-append extension when missing
    if (!filename.match(/\.\w{2,4}$/)) {
      if (contentType.includes("video"))       filename += ".mp4";
      else if (contentType.includes("audio"))  filename += ".mp3";
      else if (contentType.includes("jpeg"))   filename += ".jpg";
      else if (contentType.includes("png"))    filename += ".png";
      else                                     filename += ".bin";
    }

    // Sanitize filename — remove characters that break Content-Disposition
    filename = filename.replace(/[^\w.\-]/g, "_");

    const responseHeaders: Record<string, string> = {
      ...corsHeaders,
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-cache, no-store",
      "X-Content-Type-Options": "nosniff",
    };

    if (contentLength) responseHeaders["Content-Length"] = contentLength;

    return new Response(upstream.body, { status: 200, headers: responseHeaders });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Internal server error", detail: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
