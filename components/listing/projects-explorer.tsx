"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/cards/project-card";
import { MobileFilterDrawer } from "@/components/listing/filter-drawer";
import { ActiveFilters, EmptyResults, ResultCount, SortSelect, type ActiveChip } from "@/components/listing/listing-ui";
import { useUrlParams } from "@/components/listing/use-url-params";
import { controlClasses, SelectField } from "@/components/ui/field";
import { areaOptions, developerOptions, typeOptions } from "@/lib/filter-options";
import {
  filterProjects,
  parseProjectFilters,
  PROJECT_PRICE_BUCKETS,
  projectFiltersToParams,
  STATUS_OPTIONS,
  type ProjectFilters,
} from "@/lib/search";
import { cn } from "@/lib/utils";

const priceBucketOptions = PROJECT_PRICE_BUCKETS.map((b) => ({ value: b.value, label: b.label }));

function labelFor(options: Array<{ value: string; label: string }>, value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}

export function ProjectsExplorer() {
  const { searchParams, replace } = useUrlParams();
  const filters = useMemo(() => parseProjectFilters(searchParams), [searchParams]);
  const results = useMemo(() => filterProjects(filters), [filters]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keyword is typed locally and mirrored to the URL.
  const [keyword, setKeyword] = useState(filters.q ?? "");
  const [syncedQ, setSyncedQ] = useState(filters.q ?? "");
  if ((filters.q ?? "") !== syncedQ) {
    setSyncedQ(filters.q ?? "");
    setKeyword(filters.q ?? "");
  }

  const update = (patch: Partial<ProjectFilters>) => {
    const next = { ...filters, ...patch };
    setSyncedQ(next.q ?? "");
    replace(projectFiltersToParams(next));
  };
  const clearAll = () => {
    setKeyword("");
    update({ q: undefined, area: undefined, developer: undefined, status: undefined, type: undefined, price: undefined });
  };

  const chips: ActiveChip[] = [
    filters.q && { key: "q", label: `“${filters.q}”`, onRemove: () => update({ q: undefined }) },
    filters.area && { key: "area", label: labelFor(areaOptions, filters.area), onRemove: () => update({ area: undefined }) },
    filters.developer && {
      key: "developer",
      label: labelFor(developerOptions, filters.developer),
      onRemove: () => update({ developer: undefined }),
    },
    filters.type && { key: "type", label: labelFor(typeOptions, filters.type), onRemove: () => update({ type: undefined }) },
    filters.price && { key: "price", label: labelFor(priceBucketOptions, filters.price), onRemove: () => update({ price: undefined }) },
  ].filter(Boolean) as ActiveChip[];

  const selects = (prefix: string) => (
    <>
      <SelectField
        id={`${prefix}-area`}
        label="Area"
        value={filters.area ?? ""}
        onChange={(e) => update({ area: e.target.value || undefined })}
        options={areaOptions}
        placeholder="All areas"
      />
      <SelectField
        id={`${prefix}-developer`}
        label="Developer"
        value={filters.developer ?? ""}
        onChange={(e) => update({ developer: e.target.value || undefined })}
        options={developerOptions}
        placeholder="All developers"
      />
      <SelectField
        id={`${prefix}-type`}
        label="Property Type"
        value={filters.type ?? ""}
        onChange={(e) => update({ type: e.target.value || undefined })}
        options={typeOptions}
        placeholder="All types"
      />
      <SelectField
        id={`${prefix}-price`}
        label="Price Range"
        value={filters.price ?? ""}
        onChange={(e) => update({ price: e.target.value || undefined })}
        options={priceBucketOptions}
        placeholder="Any price"
      />
    </>
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-[22px] border border-line bg-white p-4 shadow-[var(--shadow-soft)] sm:p-5 lg:p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <label htmlFor="projects-q" className="sr-only">
              Search projects
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              id="projects-q"
              type="search"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                update({ q: e.target.value.trim() || undefined });
              }}
              placeholder="Search by project, area or developer"
              className={cn(controlClasses, "pl-11")}
            />
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-line-strong px-4 font-display text-sm font-semibold text-ink lg:hidden"
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Filters</span>
            {chips.length > (filters.q ? 1 : 0) && (
              <span className="grid size-5 place-items-center rounded-full bg-navy text-[11px] text-white">
                {chips.length - (filters.q ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
        <div className="mt-4 hidden grid-cols-4 gap-4 lg:grid">{selects("desktop")}</div>
      </div>

      {/* Status chips */}
      <div className="no-scrollbar -mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filter by project status">
        <div className="flex gap-2">
          {[{ value: "", label: "All projects" }, ...STATUS_OPTIONS].map((s) => {
            const active = (filters.status ?? "") === s.value;
            return (
              <button
                key={s.value || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => update({ status: s.value || undefined })}
                className={cn(
                  "h-10 whitespace-nowrap rounded-full px-4 font-display text-[13px] font-semibold transition-colors",
                  active ? "bg-ink text-white" : "border border-line bg-white text-ink hover:border-ink",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <ResultCount count={results.length} singular="project" plural="projects" />
        <SortSelect id="projects-sort" value={filters.sort} onChange={(sort) => update({ sort })} />
      </div>
      {chips.length > 0 && (
        <div className="mt-4">
          <ActiveFilters chips={chips} onClear={clearAll} />
        </div>
      )}

      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyResults onClear={clearAll} label="projects" />
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onClear={clearAll}
        resultCount={results.length}
        resultLabel={results.length === 1 ? "project" : "projects"}
      >
        <div className="space-y-5">{selects("drawer")}</div>
      </MobileFilterDrawer>
    </div>
  );
}
