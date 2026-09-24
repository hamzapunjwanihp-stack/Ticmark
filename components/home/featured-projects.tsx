import { ProjectCard } from "@/components/cards/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/lib/data";

export function FeaturedProjects() {
  const list = featuredProjects().slice(0, 6);
  return (
    <section id="featured-projects" aria-labelledby="projects-title" className="bg-mist py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="New Developments"
            title="Featured Projects"
            description="Explore standout residential and commercial developments selected by Ticmark Properties."
            action={
              <ButtonLink href="/projects" variant="outline" className="hidden md:inline-flex">
                View all projects
              </ButtonLink>
            }
          />
        </Reveal>

        {/* Horizontal slider on phones, grid from tablet up */}
        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {list.map((project, i) => (
            <li key={project.slug} className="w-[86%] shrink-0 snap-start sm:w-[62%] md:w-auto">
              <Reveal delay={(i % 3) * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:hidden">
          <ButtonLink href="/projects" variant="outline" className="w-full">
            View all projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
