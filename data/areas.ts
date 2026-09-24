import type { Area } from "@/lib/types";
import { unsplash } from "@/lib/utils";

/**
 * PLACEHOLDER area content. Overviews are general introductions only and
 * should be replaced with client-approved copy. Photography is illustrative.
 */
export const areas: Area[] = [
  {
    slug: "dha-karachi",
    name: "DHA Karachi",
    city: "Karachi",
    tagline: "Planned coastal living with wide boulevards",
    overview: [
      "Defence Housing Authority (DHA) is one of Karachi's most established planned communities, organised into phases that combine residential streets, commercial zones and coastal frontage.",
      "Placeholder overview: replace with Ticmark's own guidance on the phases, price bands and opportunities the team recommends.",
    ],
    image: unsplash("1602740337312-e28c0b7d27f9"),
    highlights: ["Planned phases", "Coastal frontage", "Commercial zones", "Schools & clubs nearby"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "Residential & commercial" },
      { label: "Main roads", value: "Khayaban-e-Ittehad, Khayaban-e-Shahbaz" },
    ],
    featured: true,
  },
  {
    slug: "clifton",
    name: "Clifton",
    city: "Karachi",
    tagline: "Seafront towers and established addresses",
    overview: [
      "Clifton sits on Karachi's coastline and is known for high-rise living, retail destinations and proximity to the Sea View promenade.",
      "Placeholder overview: replace with Ticmark's own guidance on blocks, building types and current opportunities.",
    ],
    image: unsplash("1644027954946-518af274149f"),
    highlights: ["Sea-facing high-rises", "Retail & dining", "Central location", "Established blocks"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "High-rise residential & retail" },
      { label: "Landmarks", value: "Sea View, Do Talwar" },
    ],
    featured: true,
  },
  {
    slug: "gulshan-e-iqbal",
    name: "Gulshan-e-Iqbal",
    city: "Karachi",
    tagline: "Central, connected and family-oriented",
    overview: [
      "Gulshan-e-Iqbal is a large, centrally located residential district with apartments, family homes and busy commercial corridors.",
      "Placeholder overview: replace with Ticmark's own guidance on blocks and project opportunities.",
    ],
    image: unsplash("1617373743747-3bb331fd4e8d"),
    highlights: ["Central access", "Universities nearby", "Apartment living", "Commercial corridors"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "Residential & mixed-use" },
      { label: "Main roads", value: "University Road, Rashid Minhas Road" },
    ],
    featured: true,
  },
  {
    slug: "scheme-33",
    name: "Scheme 33",
    city: "Karachi",
    tagline: "Emerging societies with room to grow",
    overview: [
      "Scheme 33 is home to a wide range of housing societies and developing projects in Karachi's north-east.",
      "Placeholder overview: replace with Ticmark's own guidance on societies, plot sizes and development status.",
    ],
    image: unsplash("1599707254554-027aeb4deacd"),
    highlights: ["Developing societies", "Plot opportunities", "Growth corridor", "Varied price points"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "Housing societies & plots" },
      { label: "Access", value: "Near the Super Highway (M-9)" },
    ],
    featured: true,
  },
  {
    slug: "bahria-town-karachi",
    name: "Bahria Town Karachi",
    city: "Karachi",
    tagline: "A self-contained gated community",
    overview: [
      "Bahria Town Karachi is a large gated community along the M-9 motorway, with precincts for villas, apartments and commercial areas.",
      "Placeholder overview: replace with Ticmark's own guidance on precincts and available inventory.",
    ],
    image: unsplash("1706808849802-8f876ade0d1f"),
    highlights: ["Gated precincts", "Villas & apartments", "Community amenities", "Motorway access"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "Gated community" },
      { label: "Access", value: "Karachi–Hyderabad Motorway (M-9)" },
    ],
    featured: true,
  },
  {
    slug: "north-nazimabad",
    name: "North Nazimabad",
    city: "Karachi",
    tagline: "Established neighbourhoods, everyday convenience",
    overview: [
      "North Nazimabad is a well-established residential area in central-west Karachi with schools, markets and a mix of homes and apartments.",
      "Placeholder overview: replace with Ticmark's own guidance on blocks and opportunities.",
    ],
    image: unsplash("1605266764154-0ff8f354088c"),
    highlights: ["Established blocks", "Schools & markets", "Family homes", "Apartment projects"],
    locationInfo: [
      { label: "City", value: "Karachi, Sindh" },
      { label: "Character", value: "Residential" },
      { label: "Main road", value: "Shahrah-e-Sher Shah Suri" },
    ],
    featured: true,
  },
];
