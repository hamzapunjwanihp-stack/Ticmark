import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

interface LegalPageProps {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, path, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: title, href: path }]} />
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
              <strong className="font-semibold">Placeholder legal copy.</strong> This text is a general template for layout purposes and
              must be reviewed and approved by Ticmark Properties&apos; legal advisor before launch.
            </p>
            <p className="mt-8 text-sm text-subtle">Last updated: {updated}</p>
            <article className="prose-legal mt-2">{children}</article>
          </div>
        </Container>
      </section>
    </>
  );
}
