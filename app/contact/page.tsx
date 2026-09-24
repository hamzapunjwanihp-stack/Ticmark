import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { MapPlaceholder } from "@/components/detail/map-placeholder";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";
import { callHref, mailHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Speak to Ticmark Properties about projects, properties and investment opportunities in Karachi. Call, WhatsApp, email or send an inquiry.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const whatsapp = whatsappHref();
  const cards = [
    { icon: Phone, label: "Phone", value: contact.phoneDisplay, href: callHref(), note: "Call our property team" },
    { icon: WhatsAppIcon, label: "WhatsApp", value: contact.whatsappDisplay, href: whatsapp, note: "Chat with us on WhatsApp" },
    { icon: Mail, label: "Email", value: contact.email, href: mailHref(), note: "We reply as soon as possible" },
    { icon: MapPin, label: "Office", value: contact.address, note: contact.officeHours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's find the right property together"
        description="Tell us what you're looking for (location, budget, property type) and our team will get back to you."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section id="contact-options" aria-label="Contact options" className="relative z-10 -mt-px scroll-mt-28 bg-mist pb-4 pt-10 lg:pt-14">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, label, value, href, note }) => {
              const inner = (
                <>
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-xl",
                      label === "WhatsApp" ? "bg-whatsapp/10 text-whatsapp" : "bg-cyan-50 text-teal",
                    )}
                  >
                    <Icon className="size-[22px]" aria-hidden="true" />
                  </span>
                  <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{label}</span>
                  <span className="mt-1.5 block break-words font-display text-[17px] font-bold text-ink">{value}</span>
                  <span className="mt-1 block text-sm text-body">{note}</span>
                </>
              );
              const cls =
                "block h-full rounded-[var(--radius-card)] border border-line bg-white p-6 transition-[box-shadow,border-color] duration-300";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={cn(cls, "hover:border-transparent hover:shadow-[var(--shadow-lift)]")}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          {!contact.phoneDial && (
            <p className="mt-4 flex items-center gap-2 text-[13px] text-subtle">
              <Clock className="size-4" aria-hidden="true" />
              Phone and WhatsApp numbers are placeholders until the client confirms them.
            </p>
          )}
        </Container>
      </section>

      <section aria-labelledby="form-title" className="bg-mist py-12 lg:py-16">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          <div className="rounded-[22px] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9">
            <h2 id="form-title" className="text-2xl font-bold sm:text-3xl">
              Send an inquiry
            </h2>
            <p className="mt-2 text-body">Fields marked optional can be left blank. We&apos;ll never share your details.</p>
            <ContactForm className="mt-8" />
          </div>
          <div className="flex flex-col gap-6">
            <MapPlaceholder
              label="Ticmark Properties, Karachi"
              embedUrl={contact.mapEmbedUrl || undefined}
              className="aspect-[4/3] lg:aspect-auto lg:flex-1"
            />
            <div className="rounded-[22px] bg-ink p-7 text-white sm:p-8">
              <p className="font-display text-xl font-bold text-white">Prefer WhatsApp?</p>
              <p className="mt-2 text-white/70">Message our team directly for a quick response on availability and pricing.</p>
              <ButtonLink href={whatsapp} variant="whatsapp" size="lg" className="mt-6 w-full sm:w-auto">
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
