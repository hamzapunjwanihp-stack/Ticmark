import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { SearchResults } from "@/components/search/search-results";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Search Projects & Properties",
    description: "Search Ticmark Properties' projects and listings across Karachi by keyword, area, project, developer, type and price.",
    path: "/search",
  }),
  // Result pages vary by query — keep them out of search engine indexes.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero eyebrow="Search" title="Search results" crumbs={[{ label: "Search", href: "/search" }]} />
      <section aria-label="Results" className="bg-mist py-10 lg:py-14">
        <Container>
          <Suspense fallback={<div className="h-[140px] rounded-[22px] border border-line bg-white" aria-busy="true" />}>
            <SearchResults />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
