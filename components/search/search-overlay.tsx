"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Building2, Home, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { Photo } from "@/components/ui/photo";
import { areaName, areas, categories } from "@/lib/data";
import { areaOptions, developerOptions, priceOptions, projectOptions, typeOptions } from "@/lib/filter-options";
import { filterProjects, filterProperties, propertyFiltersToParams } from "@/lib/search";
import { useDialog } from "@/lib/use-dialog";
import { formatPKR, formatPriceRange } from "@/lib/utils";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const [project, setProject] = useState("");
  const [developer, setDeveloper] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const keyword = q.trim();
  const quick = useMemo(() => {
    if (keyword.length < 2) return null;
    return {
      projects: filterProjects({ q: keyword }).slice(0, 3),
      properties: filterProperties({ q: keyword }).slice(0, 3),
    };
  }, [keyword]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = propertyFiltersToParams({
      q: keyword || undefined,
      area: area || undefined,
      project: project || undefined,
      developer: developer || undefined,
      type: type || undefined,
      minPrice: min ? Number(min) : undefined,
      maxPrice: max ? Number(max) : undefined,
    });
    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-center overflow-y-auto sm:px-4 sm:py-[6vh]">
      <div className="fixed inset-0 animate-fade-in bg-ink/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        className="relative h-fit min-h-full w-full max-w-4xl animate-panel-in bg-white p-5 shadow-[var(--shadow-panel)] sm:min-h-0 sm:rounded-[22px] sm:p-8 lg:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-ink">Search</p>
            <h2 id="search-title" className="mt-2 text-2xl font-bold sm:text-[1.75rem]">
              Find projects and properties
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-7" role="search">
          <label htmlFor="search-keyword" className="sr-only">
            Keyword
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              id="search-keyword"
              data-autofocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by project, area, developer or keyword"
              autoComplete="off"
              className="h-16 w-full rounded-2xl border border-line-strong bg-mist pl-14 pr-5 text-[17px] text-ink placeholder:text-subtle focus:border-teal focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan/15"
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField
              label="Area"
              name="area"
              id="search-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              options={areaOptions}
              placeholder="All areas"
            />
            <SelectField
              label="Project"
              name="project"
              id="search-project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              options={projectOptions}
              placeholder="All projects"
            />
            <SelectField
              label="Developer"
              name="developer"
              id="search-developer"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              options={developerOptions}
              placeholder="All developers"
            />
            <SelectField
              label="Property Type"
              name="type"
              id="search-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={typeOptions}
              placeholder="All types"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SelectField
              label="Min Price"
              name="min"
              id="search-min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              options={priceOptions}
              placeholder="No min"
            />
            <SelectField
              label="Max Price"
              name="max"
              id="search-max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              options={priceOptions}
              placeholder="No max"
            />
            <div className="col-span-2 flex items-end">
              <Button type="submit" size="lg" className="w-full">
                <Search className="size-[18px]" aria-hidden="true" />
                Search Properties
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-9 border-t border-line pt-7">
          {quick ? (
            <div aria-live="polite">
              <p className="font-display text-[13px] font-semibold text-ink">Quick matches for “{keyword}”</p>
              {quick.projects.length + quick.properties.length === 0 ? (
                <p className="mt-3 text-sm text-body">No direct matches yet — try another keyword or run a full search.</p>
              ) : (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {quick.projects.map((p) => (
                    <QuickResult
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      image={p.image}
                      title={p.name}
                      meta={`Project · ${areaName(p.areaSlug)} · ${formatPriceRange(p.priceFrom, p.priceTo)}`}
                      icon={<Building2 className="size-3.5" aria-hidden="true" />}
                      onNavigate={onClose}
                    />
                  ))}
                  {quick.properties.map((p) => (
                    <QuickResult
                      key={p.slug}
                      href={`/properties/${p.slug}`}
                      image={p.image}
                      title={p.title}
                      meta={`Listing · ${areaName(p.areaSlug)} · ${formatPKR(p.price, { short: true })}`}
                      icon={<Home className="size-3.5" aria-hidden="true" />}
                      onNavigate={onClose}
                    />
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <p className="font-display text-[13px] font-semibold text-ink">Popular areas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/areas/${a.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink"
                    >
                      <MapPin className="size-3.5 text-teal" aria-hidden="true" />
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-display text-[13px] font-semibold text-ink">Browse by type</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/properties?type=${c.slug}`}
                      onClick={onClose}
                      className="rounded-full bg-mist px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-cyan-50"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="mt-8 hidden text-xs text-subtle sm:block">
          Tip: press <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">/</kbd> or{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">Ctrl K</kbd> to open search from any page.
        </p>
      </div>
    </div>
  );
}

function QuickResult({
  href,
  image,
  title,
  meta,
  icon,
  onNavigate,
}: {
  href: string;
  image: string;
  title: string;
  meta: string;
  icon: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link href={href} onClick={onNavigate} className="group flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-mist">
        <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-mist">
          <Photo src={image} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-sm font-semibold text-ink">{title}</span>
          <span className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-subtle">
            {icon}
            {meta}
          </span>
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
