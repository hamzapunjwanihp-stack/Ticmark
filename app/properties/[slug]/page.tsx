import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bath, BedDouble, Building2, CalendarDays, Check, Home, Layers, MapPin, Ruler } from "lucide-react";
import { PropertyCard } from "@/components/cards/property-card";
import { DemoNotice, DetailSection } from "@/components/detail/detail-section";
import { Gallery } from "@/components/detail/gallery";
import { InquiryCard } from "@/components/detail/inquiry-card";
import { MapPlaceholder } from "@/components/detail/map-placeholder";
import { StickyMobileCTA } from "@/components/detail/sticky-mobile-cta";
import { DemoBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import {
  areaName,
  categoryName,
  getArea,
  getDeveloper,
  getProject,
  getProperty,
  properties,
  propertyDeveloperSlug,
  relatedProperties,
} from "@/lib/data";
import { pageMetadata, propertyJsonLd } from "@/lib/seo";
import { formatDate, formatPKR, formatPriceRange, formatSize } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return pageMetadata({
    title: `${property.title} — ${formatPKR(property.price, { short: true })}`,
    description: `${categoryName(property.categorySlug)} in ${areaName(property.areaSlug)}, Karachi. ${formatSize(property.size, property.sizeUnit)}${property.bedrooms ? `, ${property.bedrooms} bedrooms` : ""}. Contact Ticmark Properties for details.`,
    path: `/properties/${property.slug}`,
    image: property.image,
  });
}

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const project = property.projectSlug ? getProject(property.projectSlug) : undefined;
  const developer = getDeveloper(propertyDeveloperSlug(property) ?? "");
  const area = getArea(property.areaSlug);
  const related = relatedProperties(property);
  const price = formatPKR(property.price);

  const specs = [
    { icon: Home, label: "Property type", value: categoryName(property.categorySlug) },
    { icon: Ruler, label: "Size", value: formatSize(property.size, property.sizeUnit) },
    ...(property.bedrooms !== undefined ? [{ icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) }] : []),
    ...(property.bathrooms !== undefined ? [{ icon: Bath, label: "Bathrooms", value: String(property.bathrooms) }] : []),
    { icon: Layers, label: "Construction status", value: property.status },
    { icon: CalendarDays, label: "Date added", value: formatDate(property.dateAdded) },
  ];

  return (
    <>
      <JsonLd data={propertyJsonLd(property)} />

      <section className="bg-white pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Properties", href: "/properties" },
              { label: property.title, href: `/properties/${property.slug}` },
            ]}
          />
          <div className="mt-7">
            <Gallery images={[property.image, ...property.gallery]} title={property.title} />
          </div>
          <div className="mt-8 flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-mist px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                  {categoryName(property.categorySlug)}
                </span>
                <DemoBadge show={property.isDemo} className="text-subtle" />
              </div>
              <h1 className="mt-4 text-[2rem] font-bold leading-[1.1] sm:text-[2.6rem]">{property.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                <Link href={`/areas/${property.areaSlug}`} className="flex items-center gap-1.5 text-ink hover:text-teal-ink">
                  <MapPin className="size-4 text-teal" aria-hidden="true" />
                  {areaName(property.areaSlug)}, Karachi
                </Link>
                {project && (
                  <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-ink hover:text-teal-ink">
                    <Building2 className="size-4 text-teal" aria-hidden="true" />
                    {project.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Asking price</p>
              <p className="mt-1 font-display text-[2.2rem] font-bold tracking-[-0.02em] text-ink">{price}</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="min-w-0 space-y-12">
            {property.isDemo && (
              <DemoNotice>
                Sample listing: price, size and specification are demonstration content and will be replaced with real inventory.
              </DemoNotice>
            )}

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white p-5">
                  <dt className="flex items-center gap-2 text-xs font-medium text-subtle">
                    <Icon className="size-4 text-teal" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-2 font-display text-[15px] font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <DetailSection id="description" title="Description">
              <div className="space-y-4 text-[17px] leading-relaxed text-body">
                {property.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </DetailSection>

            <DetailSection id="features" title="Features">
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] text-ink">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-50 text-teal">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project && (
              <DetailSection id="project" title="Project & Developer">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line transition-shadow hover:shadow-[var(--shadow-lift)] sm:flex-row"
                >
                  <span className="relative aspect-[16/10] shrink-0 bg-mist sm:aspect-auto sm:w-64">
                    <Photo src={project.image} alt="" fill sizes="(min-width: 640px) 256px, 100vw" className="object-cover" />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="font-display text-[11.5px] font-semibold uppercase tracking-[0.16em] text-teal-ink">
                      {developer?.name}
                    </span>
                    <span className="mt-1.5 font-display text-xl font-bold text-ink">{project.name}</span>
                    <span className="mt-1 text-sm text-body">{project.tagline}</span>
                    <span className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-subtle">
                      <span>{project.status}</span>
                      <span>Completion {project.completion}</span>
                      <span>{formatPriceRange(project.priceFrom, project.priceTo)}</span>
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-sm font-semibold text-ink">
                      View project
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
                {developer && (
                  <p className="mt-4 text-sm text-body">
                    Developed by{" "}
                    <Link href={`/developers/${developer.slug}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                      {developer.name}
                    </Link>
                    .
                  </p>
                )}
              </DetailSection>
            )}

            <DetailSection
              id="location"
              title="Location"
              aside={area && <TextLink href={`/areas/${area.slug}`}>About {area.name}</TextLink>}
            >
              <MapPlaceholder label={`${project?.name ?? property.title}, ${areaName(property.areaSlug)}`} />
            </DetailSection>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <InquiryCard
              subject={property.title}
              priceLabel={price}
              priceCaption="Asking price"
              defaultArea={area?.name}
              facts={[
                { label: "Size", value: formatSize(property.size, property.sizeUnit) },
                { label: "Status", value: property.status },
              ]}
            />
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-mist py-16 lg:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="text-2xl font-bold sm:text-3xl">
                Related listings
              </h2>
              <TextLink href="/properties">All properties</TextLink>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <StickyMobileCTA subject={property.title} />
    </>
  );
}
