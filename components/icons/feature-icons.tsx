import {
  BadgeCheck,
  BookmarkCheck,
  Compass,
  Headset,
  MessagesSquare,
  ScanSearch,
  Search,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

/** Maps the icon keys used in data/site-config.ts to Lucide icons. */
export const featureIcons: Record<string, LucideIcon> = {
  search: Search,
  match: SlidersHorizontal,
  shortlist: BookmarkCheck,
  contact: MessagesSquare,
  verified: BadgeCheck,
  smart: ScanSearch,
  access: Headset,
  guidance: Compass,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const Icon = featureIcons[name] ?? Search;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
