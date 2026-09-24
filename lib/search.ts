import { areaName, developerName, getProject, projects, properties, propertyDeveloperSlug, categoryName } from "@/lib/data";
import { PROJECT_STATUSES, type Project, type ProjectStatus, type Property } from "@/lib/types";
import { slugify } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

export type SortKey = "newest" | "price-asc" | "price-desc";

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const STATUS_OPTIONS = PROJECT_STATUSES.map((status) => ({ value: slugify(status), label: status }));

export function statusFromSlug(slug?: string): ProjectStatus | undefined {
  return PROJECT_STATUSES.find((s) => slugify(s) === slug);
}

/** Price buckets used by the Projects directory (values in PKR). */
export const PROJECT_PRICE_BUCKETS = [
  { value: "under-1-crore", label: "Under 1 Crore", min: 0, max: 10_000_000 },
  { value: "1-3-crore", label: "1 – 3 Crore", min: 10_000_000, max: 30_000_000 },
  { value: "3-6-crore", label: "3 – 6 Crore", min: 30_000_000, max: 60_000_000 },
  { value: "6-crore-plus", label: "6 Crore +", min: 60_000_000, max: Number.POSITIVE_INFINITY },
] as const;

/** Price steps used by min/max selects (values in PKR). */
export const PRICE_STEPS = [5_000_000, 10_000_000, 15_000_000, 20_000_000, 30_000_000, 40_000_000, 50_000_000, 75_000_000, 100_000_000];

function tokens(query: string) {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesAll(haystack: string, query?: string) {
  if (!query) return true;
  const text = haystack.toLowerCase();
  return tokens(query).every((t) => text.includes(t));
}

function toNumber(value?: string | null) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

type ParamSource = { get(name: string): string | null };

/* ------------------------------------------------------------------ */
/* Properties                                                          */
/* ------------------------------------------------------------------ */

export interface PropertyFilters {
  q?: string;
  area?: string;
  project?: string;
  developer?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  status?: string;
  sort?: SortKey;
}

export const PROPERTY_FILTER_KEYS = ["q", "area", "project", "developer", "type", "min", "max", "beds", "status", "sort"] as const;

export function parsePropertyFilters(params: ParamSource): PropertyFilters {
  return {
    q: params.get("q") ?? undefined,
    area: params.get("area") ?? undefined,
    project: params.get("project") ?? undefined,
    developer: params.get("developer") ?? undefined,
    type: params.get("type") ?? undefined,
    minPrice: toNumber(params.get("min")),
    maxPrice: toNumber(params.get("max")),
    beds: toNumber(params.get("beds")),
    status: params.get("status") ?? undefined,
    sort: (params.get("sort") as SortKey | null) ?? undefined,
  };
}

export function propertyFiltersToParams(filters: PropertyFilters) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.area) params.set("area", filters.area);
  if (filters.project) params.set("project", filters.project);
  if (filters.developer) params.set("developer", filters.developer);
  if (filters.type) params.set("type", filters.type);
  if (filters.minPrice) params.set("min", String(filters.minPrice));
  if (filters.maxPrice) params.set("max", String(filters.maxPrice));
  if (filters.beds) params.set("beds", String(filters.beds));
  if (filters.status) params.set("status", filters.status);
  if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);
  return params;
}

function propertySearchText(p: Property) {
  const project = p.projectSlug ? getProject(p.projectSlug) : undefined;
  return [
    p.title,
    areaName(p.areaSlug),
    project?.name,
    developerName(propertyDeveloperSlug(p)),
    categoryName(p.categorySlug),
    p.status,
    ...p.features,
  ]
    .filter(Boolean)
    .join(" ");
}

export function filterProperties(filters: PropertyFilters, source: Property[] = properties) {
  const status = statusFromSlug(filters.status);
  const result = source.filter((p) => {
    if (filters.area && p.areaSlug !== filters.area) return false;
    if (filters.project && p.projectSlug !== filters.project) return false;
    if (filters.developer && propertyDeveloperSlug(p) !== filters.developer) return false;
    if (filters.type && p.categorySlug !== filters.type) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.beds && (p.bedrooms ?? 0) < filters.beds) return false;
    if (status && p.status !== status) return false;
    return matchesAll(propertySearchText(p), filters.q);
  });
  return sortProperties(result, filters.sort);
}

export function sortProperties(list: Property[], sort: SortKey = "newest") {
  const copy = [...list];
  if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectFilters {
  q?: string;
  area?: string;
  developer?: string;
  status?: string;
  type?: string;
  price?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
}

export function parseProjectFilters(params: ParamSource): ProjectFilters {
  return {
    q: params.get("q") ?? undefined,
    area: params.get("area") ?? undefined,
    developer: params.get("developer") ?? undefined,
    status: params.get("status") ?? undefined,
    type: params.get("type") ?? undefined,
    price: params.get("price") ?? undefined,
    minPrice: toNumber(params.get("min")),
    maxPrice: toNumber(params.get("max")),
    sort: (params.get("sort") as SortKey | null) ?? undefined,
  };
}

export function projectFiltersToParams(filters: ProjectFilters) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.area) params.set("area", filters.area);
  if (filters.developer) params.set("developer", filters.developer);
  if (filters.status) params.set("status", filters.status);
  if (filters.type) params.set("type", filters.type);
  if (filters.price) params.set("price", filters.price);
  if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);
  return params;
}

function projectSearchText(p: Project) {
  return [
    p.name,
    p.tagline,
    areaName(p.areaSlug),
    developerName(p.developerSlug),
    p.status,
    ...p.categories.map(categoryName),
    ...p.highlights,
  ].join(" ");
}

/** A project matches a price window when its advertised range overlaps it. */
function projectInPriceWindow(p: Project, min?: number, max?: number) {
  if (!min && !max) return true;
  if (!p.priceFrom && !p.priceTo) return false;
  const low = p.priceFrom ?? p.priceTo ?? 0;
  const high = p.priceTo ?? p.priceFrom ?? 0;
  if (min && high < min) return false;
  if (max && low > max) return false;
  return true;
}

export function filterProjects(filters: ProjectFilters, source: Project[] = projects) {
  const status = statusFromSlug(filters.status);
  const bucket = PROJECT_PRICE_BUCKETS.find((b) => b.value === filters.price);
  const result = source.filter((p) => {
    if (filters.area && p.areaSlug !== filters.area) return false;
    if (filters.developer && p.developerSlug !== filters.developer) return false;
    if (status && p.status !== status) return false;
    if (filters.type && !p.categories.includes(filters.type as Project["categories"][number])) return false;
    if (bucket && !projectInPriceWindow(p, bucket.min || undefined, Number.isFinite(bucket.max) ? bucket.max : undefined)) return false;
    if (!projectInPriceWindow(p, filters.minPrice, filters.maxPrice)) return false;
    return matchesAll(projectSearchText(p), filters.q);
  });
  return sortProjects(result, filters.sort);
}

export function sortProjects(list: Project[], sort: SortKey = "newest") {
  const copy = [...list];
  // Projects without a published price always sort last.
  const low = (p: Project) => p.priceFrom ?? p.priceTo ?? Number.POSITIVE_INFINITY;
  const high = (p: Project) => p.priceTo ?? p.priceFrom ?? Number.NEGATIVE_INFINITY;
  if (sort === "price-asc") return copy.sort((a, b) => low(a) - low(b));
  if (sort === "price-desc") return copy.sort((a, b) => high(b) - high(a));
  return copy.sort((a, b) => b.listedOn.localeCompare(a.listedOn));
}
