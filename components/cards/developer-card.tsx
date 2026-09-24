import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoBadge } from "@/components/ui/badge";
import { areasForDeveloper, isActiveProject, projectsByDeveloper } from "@/lib/data";
import type { Developer } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Logo if supplied, otherwise a tasteful monogram placeholder. */
export function DeveloperMark({ developer, className }: { developer: Developer; className?: string }) {
  if (developer.logo) {
    return (
      <span className={cn("relative grid place-items-center overflow-hidden rounded-xl border border-line bg-white p-2", className)}>
        <Image src={developer.logo} alt={`${developer.name} logo`} fill sizes="96px" className="object-contain p-2" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-xl bg-ink font-display font-bold tracking-[0.08em] text-white",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute -right-3 -top-3 size-8 rotate-45 bg-cyan/90" />
      <span className="relative">{developer.initials}</span>
    </span>
  );
}

export function DeveloperCard({ developer, headingLevel: Heading = "h3" }: { developer: Developer; headingLevel?: "h2" | "h3" }) {
  const projects = projectsByDeveloper(developer);
  const active = projects.filter(isActiveProject).length;
  const coverage = areasForDeveloper(developer);

  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <DeveloperMark developer={developer} className="size-16 text-lg" />
        <DemoBadge show={developer.isDemo} className="text-subtle" />
      </div>
      <Heading className="mt-6 text-xl font-bold">
        <Link href={`/developers/${developer.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {developer.name}
        </Link>
      </Heading>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{developer.tagline}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
        <div>
          <dt className="text-xs text-subtle">Active projects</dt>
          <dd className="mt-1 font-display text-lg font-bold text-ink">{active}</dd>
        </div>
        <div>
          <dt className="text-xs text-subtle">Total projects</dt>
          <dd className="mt-1 font-display text-lg font-bold text-ink">{projects.length}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-subtle">Location coverage</dt>
          <dd className="mt-1 text-sm font-medium text-ink">{coverage.length ? coverage.map((a) => a.name).join(", ") : "—"}</dd>
        </div>
      </dl>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-sm font-semibold text-ink" aria-hidden="true">
        View Developer
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-teal ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
