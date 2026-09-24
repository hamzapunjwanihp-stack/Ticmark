import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge, DemoBadge, StatusBadge } from "@/components/ui/badge";
import { Photo } from "@/components/ui/photo";
import { areaName, categoryName, developerName } from "@/lib/data";
import type { Project } from "@/lib/types";
import { cn, formatPriceRange } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, className, priority, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Photo
          src={project.image}
          alt={`${project.name}, ${areaName(project.areaSlug)}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <div className="flex flex-wrap gap-2">
            {project.featured && <Badge tone="cyan">Featured</Badge>}
            <StatusBadge status={project.status} />
          </div>
          <DemoBadge show={project.isDemo} className="bg-ink/45 text-white backdrop-blur-md" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-display text-[11.5px] font-semibold uppercase tracking-[0.16em] text-teal-ink">
          {developerName(project.developerSlug)}
        </p>
        <Heading className="mt-2 text-[1.3rem] font-bold leading-snug">
          <Link href={href} className="after:absolute after:inset-0 after:z-[1] focus-visible:outline-none">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-subtle">
          <MapPin className="size-3.5 shrink-0 text-teal" aria-hidden="true" />
          {areaName(project.areaSlug)}, Karachi
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-5">
          <div>
            <dt className="text-xs text-subtle">Price range</dt>
            <dd className="mt-1 font-display text-[15px] font-semibold text-ink">{formatPriceRange(project.priceFrom, project.priceTo)}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle">Completion</dt>
            <dd className="mt-1 font-display text-[15px] font-semibold text-ink">{project.completion}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-subtle">Property types</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{project.categories.map(categoryName).join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-6" aria-hidden="true">
          <span className="font-display text-sm font-semibold text-ink">View Project</span>
          <span className="grid size-10 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan">
            <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-teal ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
