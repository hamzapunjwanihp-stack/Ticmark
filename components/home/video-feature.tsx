"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { VideoModal } from "@/components/video/video-modal";
import type { Video } from "@/lib/types";
import { getYouTubeId, youTubeEmbedUrl, youTubeThumbnail } from "@/lib/youtube";

/**
 * Cinematic, wide-format video frame inspired by the reference site's
 * autoplaying banner: a muted, looping preview plays inside an architectural
 * clipped frame; "Watch with sound" opens the full player. On small screens it
 * becomes a conventional rounded 16:9 frame.
 */
export function VideoFeature({ video }: { video: Video }) {
  const id = getYouTubeId(video.youtube);
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Only load the YouTube player once the frame is close to the viewport.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showPreview = inView && !reducedMotion;

  return (
    <div className="relative">
      {/* Layered brand accents — desktop only */}
      <div aria-hidden="true" className="absolute -bottom-4 -left-4 hidden h-[62%] w-[34%] bg-navy lg:block" />
      <div aria-hidden="true" className="absolute -right-4 -top-4 hidden h-[46%] w-[26%] border-2 border-cyan lg:block" />
      <div aria-hidden="true" className="absolute -bottom-4 left-[34%] hidden h-1 w-24 bg-cyan lg:block" />

      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-ink [container-type:size] lg:aspect-[21/8.6] lg:rounded-none lg:clip-architect"
      >
        <Photo
          src={video.thumbnail ?? youTubeThumbnail(id)}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1320px) 1256px, 100vw"
          className="object-cover"
        />
        {showPreview && (
          <iframe
            src={youTubeEmbedUrl(id, { autoplay: true, muted: true, controls: false, loop: true })}
            title={`${video.title} (muted preview)`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100cqh,calc(100cqw*9/16))] w-[max(100cqw,calc(100cqh*16/9))] -translate-x-1/2 -translate-y-1/2 border-0"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(28_30_51/0.05)_40%,rgb(28_30_51/0.78)_100%)]" />

        <span className="absolute left-4 top-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-6 sm:top-6">
          Featured film
        </span>

        {!showPreview && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 hover:scale-105 sm:size-20"
            aria-label={`Play video: ${video.title}`}
          >
            <Play className="ml-1 size-6 fill-current sm:size-7" aria-hidden="true" />
          </button>
        )}

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-8">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-ink/60 px-4 font-display text-[13px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-ink/85"
          >
            <Volume2 className="size-4" aria-hidden="true" />
            Watch with sound
          </button>
          <p className="hidden max-w-sm text-right font-display text-lg font-semibold leading-snug text-white sm:block">{video.title}</p>
        </div>
      </div>

      {modalOpen && <VideoModal videoId={id} title={video.title} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
