import { twMerge } from "tailwind-merge";

/** Joins class names; later Tailwind utilities override conflicting earlier ones. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

/** Builds an Unsplash photo URL from its id (the part after "photo-"). */
export function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

const CRORE = 10_000_000;
const LAKH = 100_000;

function trimNumber(value: number, digits: number) {
  return Number(value.toFixed(digits)).toString();
}

/** Formats a PKR amount the way Karachi buyers read it: "PKR 2.45 Crore", "PKR 85 Lac". */
export function formatPKR(amount: number, { short = false }: { short?: boolean } = {}) {
  if (amount >= CRORE) {
    return `PKR ${trimNumber(amount / CRORE, 2)} ${short ? "Cr" : "Crore"}`;
  }
  if (amount >= LAKH) {
    return `PKR ${trimNumber(amount / LAKH, 1)} ${short ? "Lac" : "Lac"}`;
  }
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function formatPriceRange(from?: number, to?: number) {
  if (!from && !to) return "Price on request";
  if (from && to && from !== to) {
    return `${formatPKR(from, { short: true })} – ${formatPKR(to, { short: true }).replace("PKR ", "")}`;
  }
  return formatPKR((from ?? to) as number, { short: true });
}

export function formatSize(size: number, unit: string) {
  return `${size.toLocaleString("en-PK")} ${unit}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats an ISO date without depending on the server's locale or time zone. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
