export type ProjectStatus = "New Launch" | "Under Construction" | "Ready to Move" | "Completed";

export const PROJECT_STATUSES: ProjectStatus[] = ["New Launch", "Under Construction", "Ready to Move", "Completed"];

export type CategorySlug = "apartment" | "house" | "residential-plot" | "commercial" | "office" | "shop" | "villa" | "penthouse";

export type SizeUnit = "sq ft" | "sq yd";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Plural label used in headings, e.g. "Apartments". */
  plural: string;
  description: string;
  image: string;
}

export interface KeyValue {
  label: string;
  value: string;
}

export interface Area {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  overview: string[];
  image: string;
  highlights: string[];
  locationInfo: KeyValue[];
  featured?: boolean;
}

export interface Developer {
  slug: string;
  name: string;
  /** Two-letter monogram shown until a real logo is supplied. */
  initials: string;
  /** Path to a real logo in /public once supplied, e.g. "/developers/name.svg". */
  logo?: string;
  tagline: string;
  about: string[];
  headquarters?: string;
  website?: string;
  featured?: boolean;
  isDemo?: boolean;
}

export interface UnitType {
  name: string;
  size: string;
  bedrooms?: number;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  areaSlug: string;
  developerSlug: string;
  status: ProjectStatus;
  categories: CategorySlug[];
  /** Lowest listed price in PKR. Leave undefined to show "Price on request". */
  priceFrom?: number;
  /** Highest listed price in PKR. */
  priceTo?: number;
  /** Expected / actual completion, e.g. "2028" or "Q4 2027". */
  completion: string;
  /** ISO date the project was added to the site; drives "Newest" sorting. */
  listedOn: string;
  image: string;
  gallery: string[];
  overview: string[];
  highlights: string[];
  amenities: string[];
  unitTypes: UnitType[];
  paymentPlan?: KeyValue[];
  /** YouTube video id or URL for the project walkthrough. */
  video?: string;
  featured?: boolean;
  isDemo?: boolean;
}

export interface Property {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  areaSlug: string;
  projectSlug?: string;
  /** Only needed when the listing is not part of a project. */
  developerSlug?: string;
  /** Asking price in PKR. */
  price: number;
  size: number;
  sizeUnit: SizeUnit;
  bedrooms?: number;
  bathrooms?: number;
  status: ProjectStatus;
  /** ISO date (YYYY-MM-DD). */
  dateAdded: string;
  image: string;
  gallery: string[];
  description: string[];
  features: string[];
  isDemo?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** 1–5. Leave undefined unless the rating is real. */
  rating?: number;
  image?: string;
  isPlaceholder?: boolean;
}

export interface Video {
  id: string;
  /** Full YouTube URL or bare video id. */
  youtube: string;
  title: string;
  description?: string;
  /** Optional custom thumbnail; defaults to the YouTube HD thumbnail. */
  thumbnail?: string;
}
