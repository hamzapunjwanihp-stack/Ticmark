/** Extracts an 11-character YouTube id from any common URL format or a bare id. */
export function getYouTubeId(input: string): string {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1, 12);
    const v = url.searchParams.get("v");
    if (v) return v;
    const match = url.pathname.match(/\/(?:embed|shorts|live|v)\/([\w-]{11})/);
    if (match) return match[1];
  } catch {
    // fall through
  }
  return value;
}

export function youTubeThumbnail(id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

export function youTubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

interface EmbedOptions {
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
}

/** Privacy-enhanced embed URL (youtube-nocookie.com). */
export function youTubeEmbedUrl(id: string, { autoplay = false, muted = false, controls = true, loop = false }: EmbedOptions = {}) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (muted) params.set("mute", "1");
  if (!controls) params.set("controls", "0");
  if (loop) {
    params.set("loop", "1");
    params.set("playlist", id);
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
