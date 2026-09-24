"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  title: string;
}

/** Simple thumbnail grid that opens the same lightbox. */
export function GalleryGrid({ images, title }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-mist"
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <Photo
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 260px, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </button>
          </li>
        ))}
      </ul>
      {openIndex !== null && (
        <Lightbox images={images} title={title} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}

/** Mosaic gallery (desktop), swipeable strip (mobile) and a keyboard-friendly lightbox. */
export function Gallery({ images, title }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  // 5+ photos → large + 4 tiles; 3–4 → large + 2 tiles; fewer → simple columns.
  const shown = images.length >= 5 ? 5 : images.length >= 3 ? 3 : images.length;
  const visible = images.slice(0, shown);
  const extra = images.length - visible.length;
  const gridCols =
    shown === 5 ? "grid-cols-4 grid-rows-2" : shown === 3 ? "grid-cols-3 grid-rows-2" : shown === 2 ? "grid-cols-2" : "grid-cols-1";

  const onStripScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    setMobileIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      {/* Mobile: swipeable strip */}
      <div className="relative md:hidden">
        <div ref={stripRef} onScroll={onStripScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative aspect-[4/3] w-full shrink-0 snap-center bg-mist"
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <Photo src={src} alt={i === 0 ? title : ""} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </button>
          ))}
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-ink/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {mobileIndex + 1} / {images.length}
        </span>
      </div>

      {/* Desktop: mosaic */}
      <div className={cn("hidden gap-3 overflow-hidden rounded-2xl md:grid", gridCols)} style={{ height: "min(62vh, 560px)" }}>
        {visible.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={cn("group relative overflow-hidden bg-mist", i === 0 && shown >= 3 && "col-span-2 row-span-2")}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Photo
              src={src}
              alt={i === 0 ? title : ""}
              fill
              priority={i === 0}
              sizes={i === 0 ? "(min-width: 1320px) 640px, 50vw" : "(min-width: 1320px) 320px, 25vw"}
              className="object-cover transition-transform duration-[1000ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
            />
            {i === visible.length - 1 && images.length > 1 && (
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3.5 py-2 font-display text-[13px] font-semibold text-ink shadow">
                <Images className="size-4" aria-hidden="true" />
                {extra > 0 ? `+${extra} photos` : "View gallery"}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox images={images} title={title} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}

function Lightbox({
  images,
  title,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  title: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  const go = useCallback((delta: number) => onIndex((index + delta + images.length) % images.length), [index, images.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-x-0 top-0 z-[90] flex h-dvh animate-fade-in flex-col bg-ink/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
        <p className="font-display text-sm font-semibold">
          {title}{" "}
          <span className="ml-2 text-white/50">
            {index + 1} / {images.length}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Close gallery"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex-1">
        <Photo
          key={images[index]}
          src={images[index]}
          alt={`${title}, photo ${index + 1}`}
          fill
          sizes="100vw"
          className="animate-fade-in object-contain px-4 sm:px-20"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => onIndex(i)}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity",
              i === index ? "ring-2 ring-cyan" : "opacity-50 hover:opacity-100",
            )}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
          >
            <Photo src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
