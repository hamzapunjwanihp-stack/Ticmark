import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { projectsInArea, propertiesInArea } from "@/lib/data";
import type { Area } from "@/lib/types";
import { cn, pluralize } from "@/lib/utils";

interface AreaCardProps {
  area: Area;
  size?: "default" | "large";
  className?: string;
  headingLevel?: "h2" | "h3";
}

export function AreaCard({ area, size = "default", className, headingLevel: Heading = "h3" }: AreaCardProps) {
  const projectCount = projectsInArea(area).length;
  const propertyCount = propertiesInArea(area).length;
  const large = size === "large";

  return (
    <Link
      href={`/areas/${area.slug}`}
      className={cn(
        "group relative isolate flex min-h-[260px] overflow-hidden rounded-[var(--radius-card)] bg-ink",
        large ? "sm:min-h-[340px] lg:min-h-[420px]" : "lg:min-h-[300px]",
        className,
      )}
    >
      <Photo
        src={area.image}
        alt=""
        fill
        sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(28_30_51/0)_30%,rgb(28_30_51/0.85)_100%)] transition-opacity duration-500 group-hover:opacity-95" />

      <div className="mt-auto flex w-full items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <Heading className={cn("font-bold text-white", large ? "text-2xl sm:text-[1.9rem]" : "text-xl")}>{area.name}</Heading>
          {large && <p className="mt-1.5 max-w-sm text-sm text-white/75">{area.tagline}</p>}
          <p className="mt-2 font-display text-[13px] font-medium text-white/80">
            {pluralize(projectCount, "Project")} <span className="px-1 text-cyan">/</span>{" "}
            {pluralize(propertyCount, "Property", "Properties")}
          </p>
        </div>
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-cyan group-hover:text-ink"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
