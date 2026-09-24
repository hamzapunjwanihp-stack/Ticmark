"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/cards/project-card";
import { PropertyCard } from "@/components/cards/property-card";
import { ActiveFilters, type ActiveChip } from "@/components/listing/listing-ui";
import { useUrlParams } from "@/components/listing/use-url-params";
import { useSearch } from "@/components/search/search-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { newPropertySlugs } from "@/lib/data";
import { areaOptions, developerOptions, projectOptions, typeOptions } from "@/lib/filter-options";
import { filterProjects, filterProperties, parsePropertyFilters, propertyFiltersToParams, type PropertyFilters } from "@/lib/search";
import { formatPKR } from "@/lib/utils";

function labelFor(options: Array<{ value: string; label: string }>, value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}

export function SearchResults() {
  const { searchParams, replace } = useUrlParams();
  const search = useSearch();
  const filters = useMemo(() => parsePropertyFilters(searchParams), [searchParams]);
  const fresh = useMemo(() => newPropertySlugs(), []);

  const propertyResults = useMemo(() => filterProperties(filters), [filters]);
  const projectResults = useMemo(() => {
    // A project filter narrows listings; for projects we show that project itself.
    const list = filterProjects({
      q: filters.q,
      area: filters.area,
      developer: filters.developer,
      type: filters.type,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
    return filters.project ? list.filter((p) => p.slug === filters.project) : list;
  }, [filters]);

  const update = (patch: Partial<PropertyFilters>) => replace(propertyFiltersToParams({ ...filters, ...patch }));
  const clearAll = () => replace(new URLSearchParams());

  const chips: ActiveChip[] = [
    filters.q && { key: "q", label: `“${filters.q}”`, onRemove: () => update({ q: undefined }) },
    filters.area && { key: "area", label: labelFor(areaOptions, filters.area), onRemove: () => update({ area: undefined }) },
    filters.project && { key: "project", label: labelFor(projectOptions, filters.project), onRemove: () => update({ project: undefined }) },
    filters.developer && {
      key: "developer",
      label: labelFor(developerOptions, filters.developer),
      onRemove: () => update({ developer: undefined }),
    },
    filters.type && { key: "type", label: labelFor(typeOptions, filters.type), onRemove: () => update({ type: undefined }) },
    filters.minPrice && {
      key: "min",
      label: `From ${formatPKR(filters.minPrice, { short: true })}`,
      onRemove: () => update({ minPrice: undefined }),
    },
    filters.maxPrice && {
      key: "max",
      label: `Up to ${formatPKR(filters.maxPrice, { short: true })}`,
      onRemove: () => update({ maxPrice: undefined }),
    },
  ].filter(Boolean) as ActiveChip[];

  const total = propertyResults.length + projectResults.length;

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-[22px] border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-ink" aria-live="polite">
            {chips.length === 0 ? "Showing everything" : `${total} ${total === 1 ? "result" : "results"}`}
          </p>
          <div className="mt-3">
            {chips.length > 0 ? (
              <ActiveFilters chips={chips} onClear={clearAll} />
            ) : (
              <p className="text-sm text-body">Use search to narrow by keyword, area, project, developer, type or price.</p>
            )}
          </div>
        </div>
        <Button onClick={search.open} variant="primary" className="shrink-0">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Refine search
        </Button>
      </div>

      {total === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-mist text-subtle">
            <Search className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-5 font-display text-lg font-bold text-ink">Nothing matches that search yet</p>
          <p className="mt-2 max-w-sm text-sm text-body">
            Try a broader keyword or fewer filters — or ask our team, who can share options that aren&apos;t listed online.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={clearAll}>
              Clear search
            </Button>
            <ButtonLink href="/contact">Contact our team</ButtonLink>
          </div>
        </div>
      ) : (
        <>
          {projectResults.length > 0 && (
            <section aria-labelledby="search-projects" className="mt-12">
              <h2 id="search-projects" className="text-2xl font-bold">
                Projects <span className="text-subtle">({projectResults.length})</span>
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projectResults.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {propertyResults.length > 0 && (
            <section aria-labelledby="search-properties" className="mt-14">
              <h2 id="search-properties" className="text-2xl font-bold">
                Properties <span className="text-subtle">({propertyResults.length})</span>
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {propertyResults.map((p) => (
                  <li key={p.slug}>
                    <PropertyCard property={p} isNew={fresh.has(p.slug)} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
