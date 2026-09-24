"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { areaName, areas, categories, developers, featuredProjects, projectsByDeveloper, projectsInArea } from "@/lib/data";
import { STATUS_OPTIONS } from "@/lib/search";
import { pluralize } from "@/lib/utils";

export type MenuKey = "projects" | "areas" | "developers";

function PanelFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 font-display text-[13px] font-semibold text-ink">
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">{children}</p>;
}

export function ProjectsMenu() {
  const spotlight = featuredProjects()[0];
  return (
    <div className="grid w-[720px] grid-cols-[1fr_1fr_1.15fr] gap-8 p-7">
      <div>
        <ColumnTitle>By status</ColumnTitle>
        <ul className="space-y-1">
          {STATUS_OPTIONS.map((s) => (
            <li key={s.value}>
              <Link
                href={`/projects?status=${s.value}`}
                className="block rounded-lg px-2.5 py-2 text-[14px] text-ink transition-colors hover:bg-mist"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ColumnTitle>By type</ColumnTitle>
        <ul className="space-y-1">
          {categories.slice(0, 6).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/projects?type=${c.slug}`}
                className="block rounded-lg px-2.5 py-2 text-[14px] text-ink transition-colors hover:bg-mist"
              >
                {c.plural}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <ColumnTitle>Featured</ColumnTitle>
        {spotlight && (
          <Link href={`/projects/${spotlight.slug}`} className="group block overflow-hidden rounded-xl border border-line">
            <span className="relative block aspect-[16/10] overflow-hidden bg-mist">
              <Photo
                src={spotlight.image}
                alt=""
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="block p-3.5">
              <span className="block font-display text-sm font-semibold text-ink">{spotlight.name}</span>
              <span className="mt-1 flex items-center gap-1 text-xs text-subtle">
                <MapPin className="size-3" aria-hidden="true" />
                {areaName(spotlight.areaSlug)}
              </span>
            </span>
          </Link>
        )}
        <div className="mt-auto pt-5">
          <PanelFooterLink href="/projects">View all projects</PanelFooterLink>
        </div>
      </div>
    </div>
  );
}

export function AreasMenu() {
  return (
    <div className="w-[620px] p-7">
      <ColumnTitle>Popular areas in Karachi</ColumnTitle>
      <ul className="grid grid-cols-2 gap-1.5">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}`} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-mist">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                <Photo src={a.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[14px] font-semibold text-ink">{a.name}</span>
                <span className="block text-xs text-subtle">{pluralize(projectsInArea(a).length, "project")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-5">
        <PanelFooterLink href="/areas">Browse all areas</PanelFooterLink>
      </div>
    </div>
  );
}

export function DevelopersMenu() {
  return (
    <div className="w-[460px] p-7">
      <ColumnTitle>Developers</ColumnTitle>
      <ul className="space-y-1">
        {developers.map((d) => (
          <li key={d.slug}>
            <Link href={`/developers/${d.slug}`} className="group flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-mist">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink font-display text-[13px] font-bold tracking-wider text-white">
                {d.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[14px] font-semibold text-ink">{d.name}</span>
                <span className="block text-xs text-subtle">{pluralize(projectsByDeveloper(d).length, "project")}</span>
              </span>
              <ArrowUpRight className="size-4 text-subtle opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-5">
        <PanelFooterLink href="/developers">View all developers</PanelFooterLink>
      </div>
    </div>
  );
}

export const menuPanels: Record<MenuKey, () => React.ReactElement> = {
  projects: ProjectsMenu,
  areas: AreasMenu,
  developers: DevelopersMenu,
};
