import { CategoryCard } from "@/components/cards/category-card";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/lib/data";

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories-title" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="categories-title"
            eyebrow="Browse by Type"
            title="Explore by Property Type"
            description="From apartments and villas to offices and retail — start with the kind of property you're looking for."
            action={<TextLink href="/properties">View all properties</TextLink>}
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, i) => (
            <li key={category.slug}>
              <Reveal delay={(i % 4) * 70}>
                <CategoryCard category={category} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
