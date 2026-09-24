import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";
import { unsplash } from "@/lib/utils";

export function FinalCTA() {
  const { finalCta } = siteConfig;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink py-20 lg:py-28">
      <Photo src={unsplash("1759210720487-c74d9764da79")} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(28_30_51)_20%,rgb(28_30_51/0.82)_55%,rgb(32_36_76/0.6)_100%)]" />
      {/* Angled accent lines echoing the logo's check mark */}
      <svg
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 hidden h-[120%] text-cyan/25 lg:block"
        viewBox="0 0 400 500"
        fill="none"
        aria-hidden="true"
      >
        <path d="M40 380 L150 480 L400 120" stroke="currentColor" strokeWidth="1.5" />
        <path d="M90 380 L200 480 L400 190" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>

      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="light" className="mb-5">
            {finalCta.eyebrow}
          </Eyebrow>
          <h2 id="cta-title" className="text-[2.1rem] font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            {finalCta.heading}
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-lg">{finalCta.copy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={finalCta.primary.href} variant="accent" size="lg">
              {finalCta.primary.label}
              <ArrowRight className="size-[18px] transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={finalCta.secondary.href} variant="outline-light" size="lg">
              {finalCta.secondary.label}
            </ButtonLink>
          </div>
          {finalCta.trustPoints.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7">
              {finalCta.trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 font-display text-sm font-medium text-white/80">
                  <CheckCircle2 className="size-[18px] text-cyan" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
