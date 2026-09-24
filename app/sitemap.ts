import type { MetadataRoute } from "next";
import { areas, developers, projects, properties } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/properties", priority: 0.9 },
    { path: "/areas", priority: 0.8 },
    { path: "/developers", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/testimonials", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-and-conditions", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified: p.listedOn, priority: 0.8 })),
    ...properties.map((p) => ({ url: absoluteUrl(`/properties/${p.slug}`), lastModified: p.dateAdded, priority: 0.7 })),
    ...areas.map((a) => ({ url: absoluteUrl(`/areas/${a.slug}`), priority: 0.7 })),
    ...developers.map((d) => ({ url: absoluteUrl(`/developers/${d.slug}`), priority: 0.6 })),
  ];
}
