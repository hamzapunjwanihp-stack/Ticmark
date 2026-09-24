import { ArrowRight, Building2, Handshake, MapPinned } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { siteConfig } from "@/data/site-config";

const pillarIcons = [Building2, Handshake, MapPinned];

export function HeroSection() {
  const { hero } = siteConfig;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink sm:min-h-[700px] lg:min-h-[max(680px,calc(84svh-84px))]"
    >
      <Photo src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover object-[60%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(28_30_51/0.94)_0%,rgb(28_30_51/0.78)_42%,rgb(32_36_76/0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[linear-gradient(0deg,rgb(28_30_51/0.9),transparent)]" />

      {/* Editorial detail: Karachi coordinates on a vertical rule */}
      <div className="pointer-events-none absolute right-8 top-10 hidden flex-col items-center gap-4 xl:flex" aria-hidden="true">
        <span className="h-24 w-px bg-white/25" />
        <span className="font-display text-[11px] font-medium uppercase tracking-[0.3em] text-white/55 [writing-mode:vertical-rl]">
          Karachi · 24.86° N 67.00° E
        </span>
      </div>

      <Container className="pb-10 pt-28 sm:pb-12 lg:pb-14">
        <div className="max-w-3xl">
          <p className="flex animate-hero-in items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.28em] text-cyan">
            <span className="h-px w-8 bg-cyan" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-6 animate-hero-in text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-white [animation-delay:90ms] sm:text-6xl lg:text-[4.75rem]"
          >
            {hero.headline}
            <br />
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-cyan">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-hero-in text-[17px] leading-relaxed text-white/75 [animation-delay:180ms] sm:text-lg">
            {hero.copy}
          </p>
          <div className="mt-9 flex animate-hero-in flex-col gap-3 [animation-delay:270ms] sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="accent" size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-[18px] transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline-light" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid animate-hero-in grid-cols-3 gap-3 border-t border-white/15 pt-6 [animation-delay:380ms] sm:gap-8 lg:mt-20 lg:pt-8">
          {hero.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <li key={pillar.title} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Icon className="size-6 shrink-0 text-cyan" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-display text-[13px] font-semibold leading-snug text-white sm:text-base">{pillar.title}</p>
                  <p className="mt-1 hidden max-w-xs text-sm leading-relaxed text-white/60 sm:block">{pillar.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
