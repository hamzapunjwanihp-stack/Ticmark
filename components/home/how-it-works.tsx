import { FeatureIcon } from "@/components/icons/feature-icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";

export function HowItWorks() {
  const { howItWorks } = siteConfig;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-mist py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="how-title"
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.heading}
            description={howItWorks.copy}
            align="center"
          />
        </Reveal>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {/* Thin connecting line across the step markers (desktop) */}
          <span
            className="absolute left-[12.5%] right-[12.5%] top-[43px] hidden h-px bg-[linear-gradient(90deg,var(--color-line-strong)_50%,transparent_50%)] bg-[length:10px_1px] lg:block"
            aria-hidden="true"
          />
          {howItWorks.steps.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={i * 90} className="h-full">
                <div className="group relative flex h-full flex-col items-center rounded-[var(--radius-card)] px-6 pb-8 pt-0 text-center">
                  <span className="relative z-10 grid size-[86px] place-items-center rounded-full border border-line bg-white text-ink shadow-[var(--shadow-soft)] transition-[border-color,color] duration-300 group-hover:border-cyan group-hover:text-teal">
                    <FeatureIcon name={step.icon} className="size-8" />
                    <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-navy font-display text-[11px] font-bold text-white">
                      {step.number}
                    </span>
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-[240px] text-[15px] leading-relaxed text-body">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
