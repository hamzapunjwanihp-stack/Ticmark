import { siteConfig } from "@/data/site-config";
import type { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tone = "navy" | "cyan" | "white" | "outline" | "glass";

const tones: Record<Tone, string> = {
  navy: "bg-navy text-white",
  cyan: "bg-cyan text-ink",
  white: "bg-white text-ink shadow-[0_1px_2px_rgb(28_30_51/0.08)]",
  outline: "border border-line bg-white text-body",
  glass: "bg-ink/55 text-white backdrop-blur-md",
};

export function Badge({ tone = "white", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-display text-[11px] font-semibold uppercase leading-none tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusDot: Record<ProjectStatus, string> = {
  "New Launch": "bg-cyan",
  "Under Construction": "bg-amber-400",
  "Ready to Move": "bg-emerald-500",
  Completed: "bg-slate-400",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <Badge tone="white" className={className}>
      <span className={cn("size-1.5 rounded-full", statusDot[status])} aria-hidden="true" />
      {status}
    </Badge>
  );
}

/** Small marker for sample content. Toggle globally with siteConfig.showDemoBadges. */
export function DemoBadge({ show = true, className }: { show?: boolean; className?: string }) {
  if (!show || !siteConfig.showDemoBadges) return null;
  return (
    <span
      title="Sample content for demonstration"
      className={cn(
        "inline-flex items-center rounded border border-dashed border-current px-1.5 py-0.5 font-display text-[10px] font-semibold uppercase leading-none tracking-[0.1em] opacity-70",
        className,
      )}
    >
      Demo
    </span>
  );
}
