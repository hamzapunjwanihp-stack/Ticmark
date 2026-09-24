import type { Developer } from "@/lib/types";

/**
 * DEMO developer profiles. These are fictional sample names used to show the
 * layout — they do not represent real companies or partnerships. Replace them
 * with the client's developer partners and add real logos under /public.
 */
export const developers: Developer[] = [
  {
    slug: "vireo-developments",
    name: "Vireo Developments",
    initials: "VD",
    tagline: "Sample developer profile focused on high-rise residential projects.",
    about: [
      "Placeholder profile. Add the developer's background, delivery track record and approach once the partnership details are confirmed.",
      "This section supports several paragraphs, so the final copy can cover history, certifications and flagship projects.",
    ],
    headquarters: "Karachi",
    featured: true,
    isDemo: true,
  },
  {
    slug: "castellan-builders",
    name: "Castellan Builders",
    initials: "CB",
    tagline: "Sample developer profile focused on villas and gated communities.",
    about: [
      "Placeholder profile. Add the developer's background, delivery track record and approach once the partnership details are confirmed.",
    ],
    headquarters: "Karachi",
    featured: true,
    isDemo: true,
  },
  {
    slug: "linea-group",
    name: "Linea Group",
    initials: "LG",
    tagline: "Sample developer profile focused on commercial and mixed-use projects.",
    about: [
      "Placeholder profile. Add the developer's background, delivery track record and approach once the partnership details are confirmed.",
    ],
    headquarters: "Karachi",
    featured: true,
    isDemo: true,
  },
  {
    slug: "solen-estates",
    name: "Solen Estates",
    initials: "SE",
    tagline: "Sample developer profile focused on plotted communities.",
    about: [
      "Placeholder profile. Add the developer's background, delivery track record and approach once the partnership details are confirmed.",
    ],
    headquarters: "Karachi",
    featured: true,
    isDemo: true,
  },
];
