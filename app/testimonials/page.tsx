import { TestimonialCard } from "@/components/cards/testimonial-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonials",
  description: "What property buyers and investors say about working with Ticmark Properties in Karachi.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const hasPlaceholders = testimonials.some((t) => t.isPlaceholder);
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trusted by Property Buyers & Investors"
        description="Feedback from the families and investors we've worked with."
        crumbs={[{ label: "Testimonials", href: "/testimonials" }]}
      />
      <section aria-label="Client testimonials" className="bg-mist py-14 lg:py-20">
        <Container>
          {hasPlaceholders && (
            <p className="mb-8 rounded-xl border border-dashed border-line-strong bg-white px-4 py-3 text-[13px] text-body">
              Client testimonials will be added here once approved. The cards below show the layout with placeholder text.
            </p>
          )}
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={t.id}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <TestimonialCard testimonial={t} />
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
