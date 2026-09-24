"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { getYouTubeId, youTubeEmbedUrl, youTubeThumbnail } from "@/lib/youtube";

/** Lightweight click-to-play YouTube embed (loads the player only when requested). */
export function YouTubeEmbed({ video, title }: { video: string; title: string }) {
  const id = getYouTubeId(video);
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(youTubeThumbnail(id));

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
      {playing ? (
        <iframe
          src={youTubeEmbedUrl(id, { autoplay: true })}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${title}`}>
          <Photo
            src={thumb}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            onError={() => setThumb(youTubeThumbnail(id, "hqdefault"))}
          />
          <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/45" />
          <span className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
