import { Suspense } from "react";
import { PropertyCard } from "@/components/cards/property-card";
import { PropertiesExplorer } from "@/components/listing/properties-explorer";
import { FinalCTA } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { newPropertySlugs, recentProperties } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { unsplash } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Properties for Sale in Karachi",
  description:
    "Apartments, houses, plots, villas, penthouses, offices and shops across Karachi. Filter by area, project, developer, price, bedrooms and status.",
  path: "/properties",
});

function ExplorerFallback() {
  const fresh = newPropertySlugs();
  return (
    <div aria-busy="true" className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
      <div className="hidden h-[820px] rounded-[22px] border border-line bg-white lg:block" />
      <div>
        <div className="h-[66px] border-b border-line" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {recentProperties().map((property) => (
            <li key={property.slug}>
              <PropertyCard property={property} isNew={fresh.has(property.slug)} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="All Properties"
        title="Properties in Karachi"
        description="Apartments, homes, plots and commercial units from the projects we cover, updated as new inventory is added."
        crumbs={[{ label: "Properties", href: "/properties" }]}
        image={unsplash("1757924461488-ef9ad0670978")}
      />
      <section aria-label="Property listings" className="bg-mist py-10 lg:py-14">
        <Container>
          <Suspense fallback={<ExplorerFallback />}>
            <PropertiesExplorer />
          </Suspense>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
