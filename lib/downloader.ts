export function extractYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function fetchViaApify(url: string) {
  return null;
}

export async function fetchViaCobalt(url: string) {
  return null;
}