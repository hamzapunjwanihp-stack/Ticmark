import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { DeveloperMark } from "@/components/cards/developer-card";
import { ProjectCard } from "@/components/cards/project-card";
import { DemoBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { areasForDeveloper, developers, getDeveloper, isActiveProject, projectsByDeveloper } from "@/lib/data";
import { developerJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return developers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/developers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const developer = getDeveloper(slug);
  if (!developer) return {};
  return pageMetadata({
    title: `${developer.name} — Projects in Karachi`,
    description: `${developer.tagline} View ${developer.name}'s active and completed projects and the areas they build in.`,
    path: `/developers/${developer.slug}`,
  });
}

export default async function DeveloperPage({ params }: PageProps<"/developers/[slug]">) {
  const { slug } = await params;
  const developer = getDeveloper(slug);
  if (!developer) notFound();

  const all = projectsByDeveloper(developer);
  const active = all.filter(isActiveProject);
  const completed = all.filter((p) => !isActiveProject(p));
  const coverage = areasForDeveloper(developer);

  return (
    <>
      <JsonLd data={developerJsonLd(developer)} />

      <section className="relative overflow-hidden border-b border-line bg-mist">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: "Developers", href: "/developers" },
              { label: developer.name, href: `/developers/${developer.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <DeveloperMark developer={developer} className="size-28 shrink-0 text-3xl" />
              <div>
                <DemoBadge show={developer.isDemo} className="text-subtle" />
                <h1 className="mt-2 text-[2.3rem] font-bold leading-tight sm:text-5xl">{developer.name}</h1>
                <p className="mt-3 max-w-xl text-lg text-body">{developer.tagline}</p>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                { label: "Active", value: active.length },
                { label: "Completed", value: completed.length },
                { label: "Areas", value: coverage.length },
              ].map((s) => (
                <div key={s.label} className="bg-white p-5 text-center">
                  <dt className="text-xs text-subtle">{s.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-dev" className="bg-white py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <h2 id="about-dev" className="text-2xl font-bold sm:text-3xl">
              About {developer.name}
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-body">
              {developer.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line p-6 sm:p-7">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-subtle">Areas</h3>
            {coverage.length ? (
              <ul className="mt-4 space-y-2">
                {coverage.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-mist"
                    >
                      <span className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-ink">
                        <MapPin className="size-4 text-teal" aria-hidden="true" />
                        {a.name}
                      </span>
                      <ArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-body">No areas listed yet.</p>
            )}
            {developer.headquarters && (
              <p className="mt-5 border-t border-line pt-5 text-sm text-body">Headquarters: {developer.headquarters}</p>
            )}
          </div>
        </Container>
      </section>

      <section aria-labelledby="dev-projects" className="bg-mist py-14 lg:py-20">
        <Container>
          <h2 id="dev-projects" className="text-2xl font-bold sm:text-3xl">
            Active projects
          </h2>
          {active.length ? (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {active.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-body">No active projects listed right now.</p>
          )}

          {completed.length > 0 && (
            <>
              <h2 className="mt-16 text-2xl font-bold sm:text-3xl">Completed projects</h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completed.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-ink p-8 text-white sm:p-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Interested in a {developer.name} project?</h2>
              <p className="mt-2 text-white/70">Ask our team for availability, pricing and payment plans.</p>
            </div>
            <ButtonLink href="/contact" variant="accent" size="lg">
              Send an inquiry
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
