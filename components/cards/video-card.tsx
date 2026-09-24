"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { VideoModal } from "@/components/video/video-modal";
import type { Video } from "@/lib/types";
import { getYouTubeId, youTubeThumbnail } from "@/lib/youtube";

export function VideoCard({ video }: { video: Video }) {
  const id = getYouTubeId(video.youtube);
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState(video.thumbnail ?? youTubeThumbnail(id));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left"
        aria-label={`Play video: ${video.title}`}
      >
        <span className="relative block aspect-video overflow-hidden rounded-[var(--radius-card)] bg-ink">
          <Photo
            src={thumb}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
            onError={() => setThumb(youTubeThumbnail(id, "hqdefault"))}
          />
          <span className="absolute inset-0 bg-ink/25 transition-colors duration-300 group-hover:bg-ink/40" />
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
          </span>
        </span>
        <span className="mt-4 block font-display text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-teal-ink">
          {video.title}
        </span>
        <span className="mt-1 block text-sm text-subtle">Watch video</span>
      </button>
      {open && <VideoModal videoId={id} title={video.title} onClose={() => setOpen(false)} />}
    </>
  );
}
