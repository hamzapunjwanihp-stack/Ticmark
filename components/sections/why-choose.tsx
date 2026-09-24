import { FeatureIcon } from "@/components/icons/feature-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";

export function WhyChooseCard({ index, title, text, icon }: { index: number; title: string; text: string; icon: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-cyan-50 text-teal transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
          <FeatureIcon name={icon} className="size-7" />
        </span>
        <span className="font-display text-sm font-semibold text-line-strong">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-7 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-body">{text}</p>
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </div>
  );
}

export function WhyChoose() {
  const { whyChoose } = siteConfig;
  return (
    <section aria-labelledby="why-title" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow className="mb-4">{whyChoose.eyebrow}</Eyebrow>
          <h2 id="why-title" className="text-[1.9rem] font-bold leading-[1.12] sm:text-[2.35rem] lg:text-[2.6rem]">
            {whyChoose.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-body sm:text-[17px]">{whyChoose.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about">About Ticmark</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Speak to our team
            </ButtonLink>
          </div>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {whyChoose.items.map((item, i) => (
            <li key={item.title} className={i % 2 === 1 ? "sm:translate-y-10" : undefined}>
              <Reveal delay={i * 90} className="h-full">
                <WhyChooseCard index={i} {...item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
