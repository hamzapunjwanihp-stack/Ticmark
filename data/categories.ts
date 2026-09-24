import type { Category } from "@/lib/types";
import { unsplash } from "@/lib/utils";

/** Property types. Add a new entry here (and to CategorySlug in lib/types.ts) to create a new category. */
export const categories: Category[] = [
  {
    slug: "apartment",
    name: "Apartment",
    plural: "Apartments",
    description: "High-rise and mid-rise residences with shared amenities.",
    image: unsplash("1624204386084-dd8c05e32226"),
  },
  {
    slug: "house",
    name: "House",
    plural: "Houses",
    description: "Independent family homes in planned communities.",
    image: unsplash("1600596542815-ffad4c1539a9"),
  },
  {
    slug: "residential-plot",
    name: "Residential Plot",
    plural: "Residential Plots",
    description: "Land to build on in developing and established schemes.",
    image: unsplash("1700503819014-60a36ddd10f8"),
  },
  {
    slug: "commercial",
    name: "Commercial",
    plural: "Commercial Spaces",
    description: "Commercial floors and buildings for business and investment.",
    image: unsplash("1621831337128-35676ca30868"),
  },
  {
    slug: "office",
    name: "Office",
    plural: "Offices",
    description: "Workspaces in business towers and mixed-use projects.",
    image: unsplash("1497366811353-6870744d04b2"),
  },
  {
    slug: "shop",
    name: "Shop",
    plural: "Shops",
    description: "Retail units in malls, plazas and podium levels.",
    image: unsplash("1774876203004-461433250ada"),
  },
  {
    slug: "villa",
    name: "Villa",
    plural: "Villas",
    description: "Spacious villas with private outdoor living.",
    image: unsplash("1613977257363-707ba9348227"),
  },
  {
    slug: "penthouse",
    name: "Penthouse",
    plural: "Penthouses",
    description: "Top-floor residences with terraces and skyline views.",
    image: unsplash("1754567371234-c832f2d299b5"),
  },
];
