import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

/**
 * The supplied Ticmark Properties logo, used as-is (only its empty margin was
 * cropped). It has a transparent background with navy lettering, so on dark
 * surfaces it sits on a white plate rather than being recoloured.
 */
export function Logo({ className, plate = false, priority = false }: { className?: string; plate?: boolean; priority?: boolean }) {
  const img = (
    <Image
      src={siteConfig.brand.logo}
      alt={siteConfig.brand.name}
      width={840}
      height={657}
      priority={priority}
      sizes="160px"
      className="h-full w-auto"
    />
  );
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brand.name} — home`}
      className={cn("inline-flex shrink-0 items-center", plate && "rounded-xl bg-white p-2.5", className)}
    >
      {img}
    </Link>
  );
}
