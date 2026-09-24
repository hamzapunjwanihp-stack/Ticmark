import Link from "next/link";
import { Bath, BedDouble, MapPin, MessageSquareText, Phone, Ruler } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Badge, DemoBadge } from "@/components/ui/badge";
import { Photo } from "@/components/ui/photo";
import { callHref, whatsappHref } from "@/lib/contact";
import { areaName, categoryName, getProject } from "@/lib/data";
import type { Property } from "@/lib/types";
import { cn, formatDate, formatPKR, formatSize } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  isNew?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
}

const iconAction =
  "relative z-[2] grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white";

export function PropertyCard({ property, isNew, className, headingLevel: Heading = "h3" }: PropertyCardProps) {
  const href = `/properties/${property.slug}`;
  const project = property.projectSlug ? getProject(property.projectSlug) : undefined;
  const whatsapp = whatsappHref(property.title);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Photo
          src={property.image}
          alt={property.title}
          fill
          sizes="(min-width: 1280px) 310px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
          {isNew ? <Badge tone="cyan">New</Badge> : <span />}
          <DemoBadge show={property.isDemo} className="bg-ink/45 text-white backdrop-blur-md" />
        </div>
        <span className="absolute bottom-3.5 left-3.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink">
          {categoryName(property.categorySlug)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">{formatPKR(property.price)}</p>
        <Heading className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug">
          <Link href={href} className="after:absolute after:inset-0 after:z-[1] focus-visible:outline-none">
            {property.title}
          </Link>
        </Heading>
        <p className="mt-2 flex items-start gap-1.5 text-[13px] text-subtle">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden="true" />
          <span>
            {areaName(property.areaSlug)}
            {project && <> · {project.name}</>}
          </span>
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3 text-[13px] text-body">
          <li className="flex items-center gap-1.5">
            <Ruler className="size-4 text-subtle" aria-hidden="true" />
            {formatSize(property.size, property.sizeUnit)}
          </li>
          {property.bedrooms !== undefined && (
            <li className="flex items-center gap-1.5">
              <BedDouble className="size-4 text-subtle" aria-hidden="true" />
              {property.bedrooms} <span className="sr-only">bedrooms</span>
              <span aria-hidden="true">Beds</span>
            </li>
          )}
          {property.bathrooms !== undefined && (
            <li className="flex items-center gap-1.5">
              <Bath className="size-4 text-subtle" aria-hidden="true" />
              {property.bathrooms} <span className="sr-only">bathrooms</span>
              <span aria-hidden="true">Baths</span>
            </li>
          )}
        </ul>

        <p className="mt-3 text-xs text-subtle">Added {formatDate(property.dateAdded)}</p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="relative z-[2] flex h-10 flex-1 items-center justify-center rounded-lg bg-mist font-display text-[13px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            View Details
          </Link>
          <Link href={`${href}#inquiry`} className={iconAction} aria-label={`Send an inquiry about ${property.title}`} title="Inquiry">
            <MessageSquareText className="size-[17px]" aria-hidden="true" />
          </Link>
          <a href={callHref()} className={iconAction} aria-label={`Call about ${property.title}`} title="Call">
            <Phone className="size-[17px]" aria-hidden="true" />
          </a>
          <a
            href={whatsapp}
            {...(whatsapp.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(iconAction, "hover:border-whatsapp hover:bg-whatsapp")}
            aria-label={`WhatsApp about ${property.title}`}
            title="WhatsApp"
          >
            <WhatsAppIcon className="size-[17px]" />
          </a>
        </div>
      </div>
      <span
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-teal ring-offset-2 group-has-[h2_a:focus-visible,h3_a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
