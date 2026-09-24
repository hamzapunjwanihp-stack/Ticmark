import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon, YoutubeIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/data/site-config";
import { callHref, mailHref, whatsappHref } from "@/lib/contact";

const socialIcons = {
  facebook: { Icon: FacebookIcon, label: "Facebook" },
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  linkedin: { Icon: LinkedinIcon, label: "LinkedIn" },
  youtube: { Icon: YoutubeIcon, label: "YouTube" },
} as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-white">{children}</h2>;
}

function FooterLinks({ links }: { links: Array<{ label: string; href: string }> }) {
  return (
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-[15px] text-white/65 transition-colors hover:text-cyan">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const { contact, social, footer, brand } = siteConfig;
  const whatsapp = whatsappHref();
  return (
    <footer className="relative overflow-hidden bg-ink text-white/65">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-navy/60 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <Logo plate className="h-[92px]" />
            <p className="mt-6 text-[15px] leading-relaxed">{brand.shortDescription}</p>
            <ul className="mt-7 flex gap-2.5" aria-label="Social media">
              {(Object.keys(socialIcons) as Array<keyof typeof socialIcons>).map((key) => {
                const href = social[key];
                if (!href) return null;
                const { Icon, label } = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand.name} on ${label}`}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-cyan hover:bg-cyan hover:text-ink"
                    >
                      <Icon className="size-[17px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks links={footer.quickLinks} />
          </div>

          <div>
            <FooterHeading>Explore</FooterHeading>
            <FooterLinks links={footer.explore} />
          </div>

          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li>
                <a href={callHref()} className="group flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 size-[18px] shrink-0 text-cyan" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Phone</span>
                    {contact.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsapp}
                  {...(whatsapp.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="mt-0.5 size-[18px] shrink-0 text-cyan" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/40">WhatsApp</span>
                    {contact.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={mailHref()} className="group flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 size-[18px] shrink-0 text-cyan" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Email</span>
                    {contact.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-cyan" aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Office</span>
                  {contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {siteConfig.showDemoBadges && (
          <p className="pb-7 text-xs text-white/35">
            Projects, listings, prices and developer profiles marked “Demo” are sample content shown for demonstration only.
          </p>
        )}
      </Container>
    </footer>
  );
}
