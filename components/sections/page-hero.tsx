import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Eyebrow } from "@/components/ui/section-heading";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Dark navy page header used by directory and content pages. */
export function PageHero({ eyebrow, title, description, crumbs, image, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink", className)}>
      {image && (
        <>
          <Photo src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(28_30_51)_25%,rgb(28_30_51/0.75)_60%,rgb(32_36_76/0.45)_100%)]" />
        </>
      )}
      <svg
        className="pointer-events-none absolute -right-10 bottom-0 -z-10 hidden h-full text-cyan/20 md:block"
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 220 L100 290 L300 40" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <Container className="py-14 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} tone="light" />
        <div className="mt-8 max-w-3xl animate-hero-in">
          {eyebrow && (
            <Eyebrow tone="light" className="mb-4">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-[2.2rem] font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem]">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/70">{description}</p>}
        </div>
        {children && <div className="mt-8 animate-hero-in [animation-delay:120ms]">{children}</div>}
      </Container>
    </section>
  );
}
