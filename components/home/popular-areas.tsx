import { AreaCard } from "@/components/cards/area-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredAreas } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Editorial layout: two wide cards on the first row, four on the second. */
const layout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3"];

export function PopularAreas() {
  const list = featuredAreas().slice(0, 6);
  return (
    <section id="popular-areas" aria-labelledby="areas-title" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="areas-title"
            eyebrow="Prime Locations"
            title="Popular Areas"
            description="Explore Karachi's most sought-after locations."
            action={
              <ButtonLink href="/areas" variant="outline" className="hidden md:inline-flex">
                View All Areas
              </ButtonLink>
            }
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {list.map((area, i) => (
            <li key={area.slug} className={cn(layout[i] ?? "lg:col-span-4")}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <AreaCard area={area} size={i < 2 ? "large" : "default"} className="h-full" />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 md:hidden">
          <ButtonLink href="/areas" variant="outline" className="w-full">
            View All Areas
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
