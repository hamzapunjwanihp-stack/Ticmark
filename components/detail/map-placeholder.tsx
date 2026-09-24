import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  label: string;
  /** Google Maps embed URL. When provided, a live map is shown instead of the placeholder. */
  embedUrl?: string;
  className?: string;
}

/** Ready for Google Maps: pass an embed URL to replace the placeholder with a live map. */
export function MapPlaceholder({ label, embedUrl, className }: MapPlaceholderProps) {
  if (embedUrl) {
    return (
      <div className={cn("relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-mist", className)}>
        <iframe
          src={embedUrl}
          title={`Map: ${label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className={cn("relative grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl border border-line bg-mist", className)}>
      {/* Stylised street grid */}
      <svg className="absolute inset-0 size-full text-line-strong" aria-hidden="true">
        <defs>
          <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <path d="M-20 260 C 160 200, 280 320, 460 220 S 760 120, 1200 200" fill="none" stroke="#d9eff9" strokeWidth="18" />
        <path d="M120 -20 L 360 600" fill="none" stroke="#ffffff" strokeWidth="10" />
        <path d="M-20 120 L 1200 60" fill="none" stroke="#ffffff" strokeWidth="8" />
      </svg>
      <div className="relative flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-full bg-navy text-white shadow-lg ring-8 ring-white/70">
          <MapPin className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-4 rounded-lg bg-white/90 px-3 py-1.5 font-display text-sm font-semibold text-ink shadow-sm">{label}</p>
        <p className="mt-2 text-xs text-subtle">Map placeholder, ready for Google Maps</p>
      </div>
    </div>
  );
}
