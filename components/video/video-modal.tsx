"use client";

import { useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";
import { youTubeEmbedUrl, youTubeWatchUrl } from "@/lib/youtube";

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 animate-fade-in bg-ink/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={title} className="relative w-full max-w-5xl animate-panel-in">
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <p className="truncate font-display text-sm font-semibold sm:text-base">{title}</p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={youTubeWatchUrl(videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/25 px-4 text-[13px] font-semibold transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Watch on YouTube
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform hover:scale-105"
              aria-label="Close video"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-panel)]">
          <iframe
            src={youTubeEmbedUrl(videoId, { autoplay: true })}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
