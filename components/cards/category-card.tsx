import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      href={`/properties?type=${category.slug}`}
      className={cn(
        "group relative isolate flex aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink sm:aspect-[3/4]",
        className,
      )}
    >
      <Photo
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(28_30_51/0)_35%,rgb(28_30_51/0.82)_100%)]" />
      <div className="mt-auto w-full p-4 sm:p-5">
        <h3 className="text-[17px] font-bold text-white sm:text-lg">{category.name}</h3>
        <span className="mt-1.5 flex items-center gap-1.5 font-display text-[13px] font-medium text-white/75 transition-colors group-hover:text-cyan">
          Explore
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}
