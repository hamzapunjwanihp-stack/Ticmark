/**
 * Central site content. Replace placeholder values here (and in the other
 * /data files) — no component changes are needed.
 */

/** Digits only, international format without "+" (e.g. "923001234567"). */
const digits = (value?: string) => value?.replace(/\D/g, "") ?? "";

/** "923001234567" → "+92 300 1234567"; other formats are shown as "+<digits>". */
function formatPhone(d: string) {
  if (d.startsWith("92") && d.length === 12) return `+92 ${d.slice(2, 5)} ${d.slice(5)}`;
  return `+${d}`;
}

const phoneDigits = digits(process.env.NEXT_PUBLIC_CONTACT_PHONE);
const whatsappDigits = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  brand: {
    name: "Ticmark Properties",
    legalName: "Ticmark Properties",
    shortDescription: "Ticmark Properties helps buyers and investors discover promising real-estate opportunities across Karachi.",
    logo: "/brand/ticmark-logo.webp",
    logoPng: "/brand/ticmark-logo.png",
    ogImage: "/brand/og-image.jpg",
  },

  url: resolveSiteUrl(),

  seo: {
    title: "Ticmark Properties | Real Estate Projects & Properties in Karachi",
    description:
      "Discover real estate projects, trusted developers, popular areas and property opportunities across Karachi with Ticmark Properties.",
  },

  /**
   * Contact details. Values marked PLACEHOLDER must be replaced before launch.
   * Dial numbers can also be supplied through NEXT_PUBLIC_CONTACT_PHONE and
   * NEXT_PUBLIC_WHATSAPP_NUMBER (see .env.example). While a dial number is empty,
   * Call / WhatsApp buttons route visitors to the contact page instead.
   */
  contact: {
    phoneDisplay: phoneDigits ? formatPhone(phoneDigits) : "+92 XXX XXXXXXX", // PLACEHOLDER
    phoneDial: phoneDigits ? `+${phoneDigits}` : "",
    whatsappDisplay: whatsappDigits ? formatPhone(whatsappDigits) : "+92 XXX XXXXXXX", // PLACEHOLDER
    whatsappDial: whatsappDigits,
    email: "info@ticmarkproperties.com",
    address: "Karachi, Pakistan", // PLACEHOLDER — add the full office address once confirmed
    officeHours: "Office hours to be confirmed", // PLACEHOLDER
    /** Google Maps embed URL (Share → Embed a map → copy the src). */
    mapEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? "",
    whatsappMessage: "Hello Ticmark Properties, I would like more information about",
  },

  /** Leave a URL empty to hide that icon. */
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },

  /** Shows a small "Demo" tag on sample projects, listings and developers. */
  showDemoBadges: true,

  navigation: {
    primary: [
      { label: "Projects", href: "/projects", menu: "projects" as const },
      { label: "Areas", href: "/areas", menu: "areas" as const },
      { label: "Developers", href: "/developers", menu: "developers" as const },
      { label: "Testimonials", href: "/testimonials" },
    ],
    secondary: [
      { label: "Contact", href: "/contact" },
      { label: "About Us", href: "/about" },
    ],
  },

  hero: {
    eyebrow: "Ticmark Properties",
    headline: "Find Property",
    headlineAccent: "Worth Investing In.",
    copy: "Explore carefully selected projects, leading developers and high-potential locations across Karachi.",
    image: "https://images.unsplash.com/photo-1642709441467-6816f4dec4af",
    imageAlt: "High-rise towers beside the water on Karachi's coastline",
    primaryCta: { label: "Explore Projects", href: "/projects" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    pillars: [
      { title: "Premium Projects", text: "Residential and commercial developments, reviewed before they are listed." },
      { title: "Trusted Developers", text: "Profiles of the builders behind every project we present." },
      { title: "Prime Locations", text: "Karachi's established and emerging neighbourhoods in one place." },
    ],
  },

  newsletter: {
    heading: "Stay Ahead of Karachi's Property Market",
    copy: "Get project launches, investment opportunities and market updates delivered to your inbox.",
    buttonLabel: "Get Updates",
  },

  videoFeature: {
    eyebrow: "Discover Ticmark",
    heading: "Experience Property Differently",
    copy: "Walk through the neighbourhoods, towers and communities we cover before you ever book a site visit. Our video library brings Karachi's projects to your screen.",
  },

  howItWorks: {
    eyebrow: "How It Works",
    heading: "Finding the Right Property, Simplified.",
    copy: "A clear, four-step path from first search to a direct conversation with our team.",
    steps: [
      { number: "01", title: "Search Property", text: "Explore projects, locations and property options.", icon: "search" },
      { number: "02", title: "Find Your Match", text: "Compare opportunities based on your requirements.", icon: "match" },
      { number: "03", title: "Shortlist Favorites", text: "Save the projects or properties you're interested in.", icon: "shortlist" },
      { number: "04", title: "Direct Contact", text: "Connect directly with the Ticmark team for details.", icon: "contact" },
    ],
  },

  // PLACEHOLDER — final copy to be supplied by Ticmark Properties.
  whyChoose: {
    eyebrow: "The Ticmark Standard",
    heading: "Why Choose Ticmark Properties",
    copy: "A focused, transparent approach to helping buyers and investors evaluate property opportunities across Karachi.",
    items: [
      { title: "Verified Opportunities", text: "Carefully reviewed projects and property opportunities.", icon: "verified" },
      { title: "Smart Property Search", text: "Find relevant projects, locations and property types faster.", icon: "smart" },
      { title: "Direct Access", text: "Speak directly with our property consultants.", icon: "access" },
      { title: "Market Guidance", text: "Get clearer information before making your next move.", icon: "guidance" },
    ],
  },

  finalCta: {
    eyebrow: "Get Started",
    heading: "Ready to Secure Your Dream Property?",
    copy: "Tell us what you're looking for and let our property team help you find the right opportunity.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Browse Projects", href: "/projects" },
    // PLACEHOLDER trust points — confirm with the client before launch.
    trustPoints: ["Verified Buyers", "24/7 Support"],
  },

  footer: {
    quickLinks: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Contact", href: "/contact" },
      { label: "Testimonials", href: "/testimonials" },
    ],
    explore: [
      { label: "Browse Areas", href: "/areas" },
      { label: "New Projects", href: "/projects?status=new-launch" },
      { label: "Developers", href: "/developers" },
      { label: "All Properties", href: "/properties" },
      { label: "Popular Areas", href: "/#popular-areas" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    copyright: "© 2026 Ticmark Properties. All Rights Reserved.",
  },
};

export type SiteConfig = typeof siteConfig;
