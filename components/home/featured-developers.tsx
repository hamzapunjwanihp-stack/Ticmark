import { DeveloperCard } from "@/components/cards/developer-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredDevelopers } from "@/lib/data";

export function FeaturedDevelopers() {
  const list = featuredDevelopers().slice(0, 4);
  return (
    <section aria-labelledby="developers-title" className="bg-mist py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="developers-title"
            eyebrow="Builders & Partners"
            title="Featured Developers"
            description="Get to know the developers behind the projects we present, with their active developments and locations in one place."
            action={
              <ButtonLink href="/developers" variant="outline" className="hidden md:inline-flex">
                View All Developers
              </ButtonLink>
            }
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {list.map((developer, i) => (
            <li key={developer.slug}>
              <Reveal delay={i * 80} className="h-full">
                <DeveloperCard developer={developer} />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 md:hidden">
          <ButtonLink href="/developers" variant="outline" className="w-full">
            View All Developers
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
