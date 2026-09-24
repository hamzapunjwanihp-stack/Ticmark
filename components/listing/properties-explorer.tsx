"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/cards/property-card";
import { MobileFilterDrawer } from "@/components/listing/filter-drawer";
import { ActiveFilters, EmptyResults, ResultCount, SortSelect, type ActiveChip } from "@/components/listing/listing-ui";
import { useUrlParams } from "@/components/listing/use-url-params";
import { controlClasses, FieldLabel, SelectField } from "@/components/ui/field";
import { newPropertySlugs } from "@/lib/data";
import { areaOptions, bedroomOptions, developerOptions, priceOptions, projectOptions, typeOptions } from "@/lib/filter-options";
import { filterProperties, parsePropertyFilters, propertyFiltersToParams, STATUS_OPTIONS, type PropertyFilters } from "@/lib/search";
import { cn, formatPKR } from "@/lib/utils";

function labelFor(options: Array<{ value: string; label: string }>, value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}

interface FilterSidebarProps {
  filters: PropertyFilters;
  keyword: string;
  onKeyword: (value: string) => void;
  update: (patch: Partial<PropertyFilters>) => void;
  prefix: string;
}

/** All listing filters. Rendered in the desktop sidebar and inside the mobile drawer. */
export function FilterSidebar({ filters, keyword, onKeyword, update, prefix }: FilterSidebarProps) {
  const num = (v: string) => (v ? Number(v) : undefined);
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel htmlFor={`${prefix}-q`}>Keyword</FieldLabel>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            id={`${prefix}-q`}
            type="search"
            value={keyword}
            onChange={(e) => onKeyword(e.target.value)}
            placeholder="e.g. sea view, 3 bed"
            className={cn(controlClasses, "pl-10")}
          />
        </div>
      </div>
      <SelectField
        id={`${prefix}-area`}
        label="Area"
        value={filters.area ?? ""}
        onChange={(e) => update({ area: e.target.value || undefined })}
        options={areaOptions}
        placeholder="All areas"
      />
      <SelectField
        id={`${prefix}-project`}
        label="Project"
        value={filters.project ?? ""}
        onChange={(e) => update({ project: e.target.value || undefined })}
        options={projectOptions}
        placeholder="All projects"
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
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id={`${prefix}-min`}
          label="Min Price"
          value={filters.minPrice ? String(filters.minPrice) : ""}
          onChange={(e) => update({ minPrice: num(e.target.value) })}
          options={priceOptions}
          placeholder="No min"
        />
        <SelectField
          id={`${prefix}-max`}
          label="Max Price"
          value={filters.maxPrice ? String(filters.maxPrice) : ""}
          onChange={(e) => update({ maxPrice: num(e.target.value) })}
          options={priceOptions}
          placeholder="No max"
        />
      </div>
      <SelectField
        id={`${prefix}-beds`}
        label="Bedrooms"
        value={filters.beds ? String(filters.beds) : ""}
        onChange={(e) => update({ beds: num(e.target.value) })}
        options={bedroomOptions}
        placeholder="Any"
      />
      <SelectField
        id={`${prefix}-status`}
        label="Construction Status"
        value={filters.status ?? ""}
        onChange={(e) => update({ status: e.target.value || undefined })}
        options={STATUS_OPTIONS}
        placeholder="Any status"
      />
    </div>
  );
}

export function PropertiesExplorer() {
  const { searchParams, replace } = useUrlParams();
  const filters = useMemo(() => parsePropertyFilters(searchParams), [searchParams]);
  const results = useMemo(() => filterProperties(filters), [filters]);
  const fresh = useMemo(() => newPropertySlugs(), []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [keyword, setKeyword] = useState(filters.q ?? "");
  const [syncedQ, setSyncedQ] = useState(filters.q ?? "");
  if ((filters.q ?? "") !== syncedQ) {
    setSyncedQ(filters.q ?? "");
    setKeyword(filters.q ?? "");
  }

  const update = (patch: Partial<PropertyFilters>) => {
    const next = { ...filters, ...patch };
    setSyncedQ(next.q ?? "");
    replace(propertyFiltersToParams(next));
  };
  const onKeyword = (value: string) => {
    setKeyword(value);
    update({ q: value.trim() || undefined });
  };
  const clearAll = () => {
    setKeyword("");
    replace(propertyFiltersToParams({ sort: filters.sort }));
    setSyncedQ("");
  };

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
    filters.beds && { key: "beds", label: `${filters.beds}+ beds`, onRemove: () => update({ beds: undefined }) },
    filters.status && { key: "status", label: labelFor(STATUS_OPTIONS, filters.status), onRemove: () => update({ status: undefined }) },
  ].filter(Boolean) as ActiveChip[];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-28 rounded-[22px] border border-line bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Filters</h2>
            {chips.length > 0 && (
              <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-teal-ink hover:underline">
                Clear all
              </button>
            )}
          </div>
          <FilterSidebar filters={filters} keyword={keyword} onKeyword={onKeyword} update={update} prefix="sidebar" />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-5">
          <ResultCount count={results.length} singular="property" plural="properties" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-strong px-4 font-display text-sm font-semibold text-ink lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {chips.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-navy text-[11px] text-white">{chips.length}</span>
              )}
            </button>
            <SortSelect id="properties-sort" value={filters.sort} onChange={(sort) => update({ sort })} />
          </div>
        </div>
        {chips.length > 0 && (
          <div className="mt-4">
            <ActiveFilters chips={chips} onClear={clearAll} />
          </div>
        )}
        <div className="mt-8">
          {results.length === 0 ? (
            <EmptyResults onClear={clearAll} label="properties" />
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <li key={property.slug}>
                  <PropertyCard property={property} isNew={fresh.has(property.slug)} headingLevel="h2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onClear={clearAll}
        resultCount={results.length}
        resultLabel={results.length === 1 ? "property" : "properties"}
      >
        <FilterSidebar filters={filters} keyword={keyword} onKeyword={onKeyword} update={update} prefix="drawer" />
      </MobileFilterDrawer>
    </div>
  );
}
