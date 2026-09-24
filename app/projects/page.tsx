import { Suspense } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { ProjectsExplorer } from "@/components/listing/projects-explorer";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { projects } from "@/lib/data";
import { sortProjects } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";
import { unsplash } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Real Estate Projects in Karachi",
  description:
    "Browse residential and commercial real estate projects across Karachi. Filter by area, developer, status, property type and price range.",
  path: "/projects",
});

function ExplorerFallback() {
  return (
    <div aria-busy="true">
      <div className="h-[82px] rounded-[22px] border border-line bg-white lg:h-[154px]" />
      <div className="mt-6 h-10" />
      <div className="mt-6 h-[62px] border-b border-line" />
      <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortProjects(projects).map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Real Estate Projects in Karachi"
        description="Residential and commercial developments across the city, from new launches to ready-to-move communities."
        crumbs={[{ label: "Projects", href: "/projects" }]}
        image={unsplash("1692696602494-3c871f2a79c1")}
      />
      <section aria-label="Project directory" className="bg-mist py-10 lg:py-14">
        <Container>
          <Suspense fallback={<ExplorerFallback />}>
            <ProjectsExplorer />
          </Suspense>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
