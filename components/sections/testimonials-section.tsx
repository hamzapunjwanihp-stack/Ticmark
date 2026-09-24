import { TestimonialCard } from "@/components/cards/testimonial-card";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  className?: string;
  showLink?: boolean;
  limit?: number;
}

export function TestimonialsSection({ className, showLink = true, limit = 3 }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className={cn("bg-mist py-20 lg:py-28", className)}>
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Client Stories"
            title="Trusted by Property Buyers & Investors"
            description="What our clients say about working with Ticmark Properties."
            action={showLink ? <TextLink href="/testimonials">Read all testimonials</TextLink> : undefined}
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, limit).map((t, i) => (
            <li key={t.id}>
              <Reveal delay={i * 90} className="h-full">
                <TestimonialCard testimonial={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
