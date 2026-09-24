import { areas, categories, developers, projects } from "@/lib/data";
import { PRICE_STEPS } from "@/lib/search";
import { formatPKR } from "@/lib/utils";

/** Option lists shared by the search overlay and the directory filters. */
export const areaOptions = areas.map((a) => ({ value: a.slug, label: a.name }));
export const projectOptions = projects.map((p) => ({ value: p.slug, label: p.name }));
export const developerOptions = developers.map((d) => ({ value: d.slug, label: d.name }));
export const typeOptions = categories.map((c) => ({ value: c.slug, label: c.name }));
export const priceOptions = PRICE_STEPS.map((v) => ({ value: String(v), label: formatPKR(v, { short: true }) }));
export const bedroomOptions = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ Beds` }));
