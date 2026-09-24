import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { areaName, developerName, getProject } from "@/lib/data";
import type { Area, Developer, Project, Property } from "@/lib/types";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/** Consistent metadata (canonical, Open Graph, Twitter) for every page. */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const ogImage = !image
    ? siteConfig.brand.ogImage
    : image.includes("images.unsplash.com")
      ? `${image}?w=1200&h=630&fit=crop&q=80&fm=jpg`
      : image;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.brand.name}`,
      description,
      url: path,
      siteName: siteConfig.brand.name,
      type: "website",
      locale: "en_PK",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.brand.name}`,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders. No reviews or ratings are emitted on purpose.     */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  const { contact, social, brand } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#organization"),
    name: brand.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(brand.logoPng),
    image: absoluteUrl(brand.ogImage),
    description: siteConfig.seo.description,
    email: contact.email,
    ...(contact.phoneDial ? { telephone: contact.phoneDial } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
    areaServed: { "@type": "City", name: "Karachi" },
    sameAs: Object.values(social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.overview.join(" "),
    url: absoluteUrl(`/projects/${project.slug}`),
    image: [project.image, ...project.gallery.slice(0, 3)],
    address: {
      "@type": "PostalAddress",
      addressLocality: areaName(project.areaSlug),
      addressRegion: "Karachi",
      addressCountry: "PK",
    },
    amenityFeature: project.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    ...(developerName(project.developerSlug) ? { brand: { "@type": "Organization", name: developerName(project.developerSlug) } } : {}),
  };
}

export function propertyJsonLd(property: Property) {
  const project = property.projectSlug ? getProject(property.projectSlug) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description.join(" "),
    image: [property.image, ...property.gallery.slice(0, 3)],
    url: absoluteUrl(`/properties/${property.slug}`),
    category: property.categorySlug,
    ...(project ? { isRelatedTo: { "@type": "Residence", name: project.name, url: absoluteUrl(`/projects/${project.slug}`) } } : {}),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/properties/${property.slug}`),
      seller: { "@id": absoluteUrl("/#organization") },
    },
  };
}

export function areaJsonLd(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: area.name,
    description: area.overview[0],
    url: absoluteUrl(`/areas/${area.slug}`),
    address: { "@type": "PostalAddress", addressLocality: area.name, addressRegion: "Karachi", addressCountry: "PK" },
  };
}

export function developerJsonLd(developer: Developer) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: developer.name,
    description: developer.tagline,
    url: absoluteUrl(`/developers/${developer.slug}`),
    ...(developer.website ? { sameAs: [developer.website] } : {}),
  };
}
