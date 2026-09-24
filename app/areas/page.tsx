import { AreaCard } from "@/components/cards/area-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { areas } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { unsplash } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Popular Areas in Karachi",
  description:
    "Explore Karachi's most sought-after locations — DHA, Clifton, Gulshan-e-Iqbal, Scheme 33, Bahria Town Karachi, North Nazimabad and more.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas"
        title="Browse Areas in Karachi"
        description="From seafront high-rises to emerging communities, explore the neighbourhoods where our projects and listings are located."
        crumbs={[{ label: "Areas", href: "/areas" }]}
        image={unsplash("1602740337312-e28c0b7d27f9")}
      />
      <section aria-label="All areas" className="bg-white py-14 lg:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <li key={area.slug}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <AreaCard area={area} size="large" className="h-full" headingLevel="h2" />
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
