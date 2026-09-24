import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { DemoBadge } from "@/components/ui/badge";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 sm:p-8">
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-cyan-50 text-teal">
          <Quote className="size-5 fill-current" aria-hidden="true" />
        </span>
        <DemoBadge show={testimonial.isPlaceholder} className="text-subtle" />
      </div>

      {typeof testimonial.rating === "number" && (
        <div className="mt-6 flex gap-1" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={i < testimonial.rating! ? "size-4 fill-cyan text-cyan" : "size-4 text-line-strong"}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      <blockquote className="mt-6 flex-1 text-[17px] leading-relaxed text-ink">
        <p>“{testimonial.quote}”</p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3.5 border-t border-line pt-6">
        {testimonial.image ? (
          <Image src={testimonial.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
        ) : (
          <span
            className="grid size-12 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
        <span>
          <span className="block font-display text-[15px] font-semibold text-ink">{testimonial.name}</span>
          <span className="block text-[13px] text-subtle">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
