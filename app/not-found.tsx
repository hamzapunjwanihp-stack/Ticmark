import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-ink">Error 404</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">This page isn&apos;t available</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-body">The page may have moved, or the listing may no longer be available.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/projects" size="lg">
            Explore Projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
