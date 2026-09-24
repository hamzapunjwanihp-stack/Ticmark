import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CalendarDays, Check, Layers, MapPin, Wallet } from "lucide-react";
import { DeveloperMark } from "@/components/cards/developer-card";
import { ProjectCard } from "@/components/cards/project-card";
import { PropertyCard } from "@/components/cards/property-card";
import { DemoNotice, DetailSection } from "@/components/detail/detail-section";
import { Gallery, GalleryGrid } from "@/components/detail/gallery";
import { InquiryCard } from "@/components/detail/inquiry-card";
import { MapPlaceholder } from "@/components/detail/map-placeholder";
import { OnThisPage } from "@/components/detail/on-this-page";
import { StickyMobileCTA } from "@/components/detail/sticky-mobile-cta";
import { Badge, DemoBadge, StatusBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { YouTubeEmbed } from "@/components/video/youtube-embed";
import {
  areaName,
  categoryName,
  getArea,
  getDeveloper,
  getProject,
  isActiveProject,
  projects,
  projectsByDeveloper,
  propertiesInArea,
  propertiesInProject,
  relatedProjects,
} from "@/lib/data";
import { pageMetadata, projectJsonLd } from "@/lib/seo";
import { formatPriceRange, pluralize } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${areaName(project.areaSlug)}, Karachi`,
    description: `${project.tagline}. ${project.status} project by ${getDeveloper(project.developerSlug)?.name ?? "a Karachi developer"} in ${areaName(project.areaSlug)}. View prices, property types, amenities and payment plan.`,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const area = getArea(project.areaSlug);
  const developer = getDeveloper(project.developerSlug);
  const units = propertiesInProject(project);
  const nearby = area ? propertiesInArea(area).filter((p) => p.projectSlug !== project.slug) : [];
  const listings = (units.length ? units : nearby).slice(0, 4);
  const similar = relatedProjects(project);
  const priceRange = formatPriceRange(project.priceFrom, project.priceTo);

  const facts = [
    { icon: Layers, label: "Status", value: project.status },
    { icon: CalendarDays, label: "Completion", value: project.completion },
    { icon: Wallet, label: "Price range", value: priceRange },
    { icon: MapPin, label: "Location", value: `${areaName(project.areaSlug)}, Karachi` },
    { icon: Building2, label: "Developer", value: developer?.name ?? "—" },
    { icon: Check, label: "Property types", value: project.categories.map(categoryName).join(", ") },
  ];

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "property-types", label: "Property Types" },
    { id: "amenities", label: "Amenities" },
    ...(project.paymentPlan ? [{ id: "payment-plan", label: "Payment Plan" }] : []),
    { id: "location", label: "Location" },
    { id: "gallery", label: "Gallery" },
    ...(project.video ? [{ id: "video", label: "Video" }] : []),
    { id: "developer", label: "Developer" },
  ];

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />

      <section className="bg-white pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.slug}` },
            ]}
          />
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} className="ring-1 ring-line" />
                {project.featured && <Badge tone="cyan">Featured</Badge>}
                <DemoBadge show={project.isDemo} className="text-subtle" />
              </div>
              <h1 className="mt-4 text-[2.3rem] font-bold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">{project.name}</h1>
              <p className="mt-3 text-lg text-body">{project.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                <Link href={`/areas/${project.areaSlug}`} className="flex items-center gap-1.5 text-ink hover:text-teal-ink">
                  <MapPin className="size-4 text-teal" aria-hidden="true" />
                  {areaName(project.areaSlug)}, Karachi
                </Link>
                {developer && (
                  <Link href={`/developers/${developer.slug}`} className="flex items-center gap-1.5 text-ink hover:text-teal-ink">
                    <Building2 className="size-4 text-teal" aria-hidden="true" />
                    {developer.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Price range</p>
              <p className="mt-1 font-display text-3xl font-bold tracking-[-0.02em] text-ink">{priceRange}</p>
            </div>
          </div>
          <div className="mt-8">
            <Gallery images={[project.image, ...project.gallery]} title={project.name} />
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="min-w-0 space-y-12">
            <OnThisPage links={sections} />

            {project.isDemo && (
              <DemoNotice>
                Sample project: names, prices, dates and payment terms on this page are demonstration content and will be replaced with
                client-approved information.
              </DemoNotice>
            )}

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white p-5">
                  <dt className="flex items-center gap-2 text-xs font-medium text-subtle">
                    <Icon className="size-4 text-teal" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-2 font-display text-[15px] font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <DetailSection id="overview" title="Overview">
              <div className="space-y-4 text-[17px] leading-relaxed text-body">
                {project.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-cyan-50 px-3.5 py-1.5 text-[13px] font-medium text-ink">
                    {h}
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection id="property-types" title="Property Types">
              <div className="overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-left text-[15px]">
                  <thead className="bg-mist text-xs uppercase tracking-[0.12em] text-subtle">
                    <tr>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Type
                      </th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Size
                      </th>
                      <th scope="col" className="hidden px-5 py-3.5 font-semibold sm:table-cell">
                        Bedrooms
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {project.unitTypes.map((u) => (
                      <tr key={u.name + u.size}>
                        <td className="px-5 py-4 font-display font-semibold text-ink">{u.name}</td>
                        <td className="px-5 py-4 text-body">{u.size}</td>
                        <td className="hidden px-5 py-4 text-body sm:table-cell">{u.bedrooms ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DetailSection>

            <DetailSection id="amenities" title="Amenities">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3.5 text-[15px] text-ink">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-50 text-teal">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.paymentPlan && (
              <DetailSection id="payment-plan" title="Payment Plan">
                <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {project.paymentPlan.map((step, i) => (
                    <li key={step.label} className="relative rounded-2xl border border-line bg-white p-5">
                      <span className="font-display text-xs font-semibold text-subtle">Step {i + 1}</span>
                      <p className="mt-2 font-display text-2xl font-bold text-ink">{step.value}</p>
                      <p className="mt-1 text-sm text-body">{step.label}</p>
                      <span className="absolute inset-x-5 top-0 h-[3px] rounded-b bg-cyan" aria-hidden="true" />
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[13px] text-subtle">
                  Indicative plan only. Confirm the current payment schedule with our team before booking.
                </p>
              </DetailSection>
            )}

            <DetailSection
              id="location"
              title="Location"
              aside={area && <TextLink href={`/areas/${area.slug}`}>About {area.name}</TextLink>}
            >
              <MapPlaceholder label={`${project.name}, ${areaName(project.areaSlug)}`} />
              {area && (
                <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                  {area.locationInfo.map((info) => (
                    <div key={info.label}>
                      <dt className="text-xs text-subtle">{info.label}</dt>
                      <dd className="mt-1 text-[15px] font-medium text-ink">{info.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </DetailSection>

            <DetailSection id="gallery" title="Gallery">
              <GalleryGrid images={[project.image, ...project.gallery]} title={project.name} />
            </DetailSection>

            {project.video && (
              <DetailSection id="video" title="Project Video">
                <YouTubeEmbed video={project.video} title={`${project.name} video`} />
              </DetailSection>
            )}

            {developer && (
              <DetailSection id="developer" title="About the Developer">
                <div className="flex flex-col gap-6 rounded-2xl border border-line p-6 sm:flex-row sm:items-start sm:p-7">
                  <DeveloperMark developer={developer} className="size-20 shrink-0 text-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">{developer.name}</h3>
                      <DemoBadge show={developer.isDemo} className="text-subtle" />
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{developer.tagline}</p>
                    <p className="mt-3 text-sm text-subtle">
                      {pluralize(projectsByDeveloper(developer).filter(isActiveProject).length, "active project")} ·{" "}
                      {pluralize(projectsByDeveloper(developer).length, "project")} listed with Ticmark
                    </p>
                    <Link
                      href={`/developers/${developer.slug}`}
                      className="group mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink"
                    >
                      View developer profile
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </DetailSection>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <InquiryCard
              subject={project.name}
              priceLabel={priceRange}
              priceCaption="Price range"
              defaultArea={area?.name}
              facts={[
                { label: "Status", value: project.status },
                { label: "Completion", value: project.completion },
              ]}
            />
          </aside>
        </div>
      </Container>

      {listings.length > 0 && (
        <section aria-labelledby="related-listings" className="bg-mist py-16 lg:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-listings" className="text-2xl font-bold sm:text-3xl">
                {units.length ? `Available in ${project.name}` : `More properties in ${areaName(project.areaSlug)}`}
              </h2>
              <TextLink href={units.length ? `/properties?project=${project.slug}` : `/properties?area=${project.areaSlug}`}>
                View all
              </TextLink>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {listings.map((p) => (
                <li key={p.slug}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {similar.length > 0 && (
        <section aria-labelledby="similar-projects" className="bg-white py-16 lg:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="similar-projects" className="text-2xl font-bold sm:text-3xl">
                Similar projects
              </h2>
              <TextLink href="/projects">All projects</TextLink>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <StickyMobileCTA subject={project.name} />
    </>
  );
}
