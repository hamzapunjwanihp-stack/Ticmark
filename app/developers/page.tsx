import { DeveloperCard } from "@/components/cards/developer-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { developers } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { unsplash } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Real Estate Developers in Karachi",
  description: "Profiles of the developers behind the projects presented by Ticmark Properties, with their active projects and locations.",
  path: "/developers",
});

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Developers & Builders"
        description="Get to know the developers behind each project: their active developments, completed work and the areas they build in."
        crumbs={[{ label: "Developers", href: "/developers" }]}
        image={unsplash("1462396240927-52058a6a84ec")}
      />
      <section aria-label="All developers" className="bg-mist py-14 lg:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {developers.map((developer, i) => (
              <li key={developer.slug}>
                <Reveal delay={(i % 4) * 80} className="h-full">
                  <DeveloperCard developer={developer} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
