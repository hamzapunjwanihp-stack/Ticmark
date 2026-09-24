import { PropertyCard } from "@/components/cards/property-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { newPropertySlugs, recentProperties } from "@/lib/data";

export function RecentlyAdded() {
  const list = recentProperties(8);
  const fresh = newPropertySlugs();
  return (
    <section aria-labelledby="recent-title" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="recent-title"
            eyebrow="Fresh Listings"
            title="Recently Added"
            description="The latest units and plots added across our projects."
            action={
              <ButtonLink href="/properties" variant="outline" className="hidden md:inline-flex">
                View all properties
              </ButtonLink>
            }
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((property, i) => (
            <li key={property.slug}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <PropertyCard property={property} isNew={fresh.has(property.slug)} />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 md:hidden">
          <ButtonLink href="/properties" variant="outline" className="w-full">
            View all properties
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
