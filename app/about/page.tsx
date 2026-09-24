import { Compass, Eye, Handshake, Scale, ShieldCheck, Target } from "lucide-react";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { WhyChooseCard } from "@/components/sections/why-choose";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";
import { unsplash } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Ticmark Properties helps buyers and investors discover promising real-estate opportunities across Karachi. Learn about our approach, mission and values.",
  path: "/about",
});

// PLACEHOLDER copy — to be replaced with client-approved text. No history, figures or awards are claimed.
const approach = [
  { icon: Target, title: "Understand the brief", text: "We start with your goals, budget, timeline and preferred locations." },
  {
    icon: Compass,
    title: "Curate the options",
    text: "We shortlist projects and properties that genuinely fit, rather than everything available.",
  },
  {
    icon: Handshake,
    title: "Guide the decision",
    text: "We walk you through the details, site visits and next steps until you are ready to decide.",
  },
];

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Clear, honest information, including what we don't know yet." },
  { icon: Eye, title: "Transparency", text: "Pricing, payment plans and project status explained plainly." },
  { icon: Scale, title: "Accountability", text: "We follow through on what we say, from first call to handover." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Ticmark Properties"
        description={siteConfig.brand.shortDescription}
        crumbs={[{ label: "About Us", href: "/about" }]}
        image={unsplash("1744182896518-fd1233b5c568")}
      />

      <section aria-labelledby="who-title" className="bg-white py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow className="mb-4">Who We Are</Eyebrow>
            <h2 id="who-title" className="text-3xl font-bold leading-tight sm:text-[2.4rem]">
              A Karachi property partner focused on clarity
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-body">
              <p>
                Ticmark Properties connects buyers and investors with residential and commercial opportunities across Karachi, from
                established neighbourhoods to emerging communities.
              </p>
              <p>
                Placeholder copy: this section will introduce the Ticmark team, the markets it specialises in and the kind of clients it
                serves. Final wording to be supplied by Ticmark Properties.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-mist">
              <Photo
                src={unsplash("1758448500688-3ababa93fd67")}
                alt="Modern building lobby with reception desk"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 -z-10 hidden h-2/3 w-1/2 rounded-[22px] bg-navy sm:block" aria-hidden="true" />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="approach-title" className="bg-mist py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading id="approach-title" eyebrow="Our Approach" title="A considered way to buy property" align="center" />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {approach.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full rounded-[var(--radius-card)] border border-line bg-white p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-xl bg-cyan-50 text-teal">
                        <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-semibold text-line-strong">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="mission-title" className="bg-ink py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="light" className="mb-4">
              Our Mission
            </Eyebrow>
            <h2 id="mission-title" className="text-3xl font-bold leading-tight text-white sm:text-[2.4rem]">
              Make every property decision a confident one.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-white/75">
              Placeholder mission statement: Ticmark Properties aims to give buyers and investors in Karachi reliable information, carefully
              selected opportunities and direct access to people who can answer their questions. Final wording to be supplied by the client.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="bg-white py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading id="values-title" eyebrow="Our Values" title="What guides our work" align="center" />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full border-t-2 border-cyan pt-6">
                    <Icon className="size-7 text-teal" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-bold">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="why-about-title" className="bg-mist py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="why-about-title"
              eyebrow="Why Ticmark"
              title={siteConfig.whyChoose.heading}
              description={siteConfig.whyChoose.copy}
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.whyChoose.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 80} className="h-full">
                  <WhyChooseCard index={i} {...item} />
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
