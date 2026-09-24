import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { DeveloperCard } from "@/components/cards/developer-card";
import { ProjectCard } from "@/components/cards/project-card";
import { PropertyCard } from "@/components/cards/property-card";
import { MapPlaceholder } from "@/components/detail/map-placeholder";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Eyebrow } from "@/components/ui/section-heading";
import { areas, developersInArea, getArea, projectsInArea, propertiesInArea } from "@/lib/data";
import { areaJsonLd, pageMetadata } from "@/lib/seo";
import { pluralize } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Property in ${area.name}, Karachi`,
    description: `${area.tagline}. Explore projects, properties and developers in ${area.name}, Karachi with Ticmark Properties.`,
    path: `/areas/${area.slug}`,
    image: area.image,
  });
}

function SectionTitle({ id, title, action }: { id: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 id={id} className="text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {action}
    </div>
  );
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const areaProjects = projectsInArea(area);
  const areaProperties = propertiesInArea(area);
  const areaDevelopers = developersInArea(area);

  return (
    <>
      <JsonLd data={areaJsonLd(area)} />
      <PageHero
        eyebrow={`${area.city} · Area Guide`}
        title={area.name}
        description={area.tagline}
        crumbs={[
          { label: "Areas", href: "/areas" },
          { label: area.name, href: `/areas/${area.slug}` },
        ]}
        image={area.image}
        className="lg:min-h-[440px]"
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4 text-white">
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-white/50">Projects</dt>
            <dd className="mt-1 font-display text-2xl font-bold">{areaProjects.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-white/50">Properties</dt>
            <dd className="mt-1 font-display text-2xl font-bold">{areaProperties.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-white/50">Developers</dt>
            <dd className="mt-1 font-display text-2xl font-bold">{areaDevelopers.length}</dd>
          </div>
        </dl>
      </PageHero>

      <section aria-labelledby="overview-title" className="bg-white py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-4">Overview</Eyebrow>
            <h2 id="overview-title" className="text-3xl font-bold">
              Living and investing in {area.name}
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-body">
              {area.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {area.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[15px] text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-50 text-teal">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <MapPlaceholder label={`${area.name}, Karachi`} />
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line">
              {area.locationInfo.map((info) => (
                <div key={info.label} className="flex justify-between gap-6 px-5 py-4 text-[15px]">
                  <dt className="text-subtle">{info.label}</dt>
                  <dd className="text-right font-medium text-ink">{info.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section aria-labelledby="area-projects" className="bg-mist py-14 lg:py-20">
        <Container>
          <SectionTitle
            id="area-projects"
            title={`Projects in ${area.name}`}
            action={<TextLink href={`/projects?area=${area.slug}`}>Filter all projects</TextLink>}
          />
          {areaProjects.length ? (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {areaProjects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-body">No projects listed in {area.name} yet. Contact us for off-market options.</p>
          )}
        </Container>
      </section>

      <section aria-labelledby="area-properties" className="bg-white py-14 lg:py-20">
        <Container>
          <SectionTitle
            id="area-properties"
            title={`Available properties in ${area.name}`}
            action={
              <TextLink
                href={`/properties?area=${area.slug}`}
              >{`View all ${pluralize(areaProperties.length, "property", "properties")}`}</TextLink>
            }
          />
          {areaProperties.length ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areaProperties.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-body">No listings in {area.name} right now.</p>
          )}
        </Container>
      </section>

      {areaDevelopers.length > 0 && (
        <section aria-labelledby="area-developers" className="bg-mist py-14 lg:py-20">
          <Container>
            <SectionTitle id="area-developers" title={`Developers active in ${area.name}`} />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areaDevelopers.map((d) => (
                <li key={d.slug}>
                  <DeveloperCard developer={d} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
