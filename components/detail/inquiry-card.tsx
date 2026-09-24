import { Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/data/site-config";
import { callHref, whatsappHref } from "@/lib/contact";

interface InquiryCardProps {
  subject: string;
  priceLabel: string;
  priceCaption: string;
  facts?: Array<{ label: string; value: string }>;
  defaultArea?: string;
}

/** Sticky sidebar with price summary, inquiry form and direct contact buttons. */
export function InquiryCard({ subject, priceLabel, priceCaption, facts = [], defaultArea }: InquiryCardProps) {
  const whatsapp = whatsappHref(subject);
  return (
    <div id="inquiry" className="scroll-mt-28 overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="bg-ink px-6 py-6 text-white sm:px-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">{priceCaption}</p>
        <p className="mt-1.5 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">{priceLabel}</p>
        {facts.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-white/50">{f.label}</dt>
                <dd className="mt-0.5 font-display text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="p-6 sm:p-7">
        <h2 className="text-lg font-bold">Request details</h2>
        <p className="mt-1 text-sm text-body">Get pricing, availability and floor plans from our team.</p>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <a
            href={whatsapp}
            {...(whatsapp.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp font-display text-sm font-semibold text-white transition-colors hover:bg-[#188a49]"
          >
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp
          </a>
          <a
            href={callHref()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong font-display text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            <Phone className="size-[18px]" aria-hidden="true" />
            Call
          </a>
        </div>
        <div className="my-6 flex items-center gap-3 text-xs text-subtle">
          <span className="h-px flex-1 bg-line" />
          or send an inquiry
          <span className="h-px flex-1 bg-line" />
        </div>
        <ContactForm
          variant="compact"
          subject={subject}
          defaultArea={defaultArea}
          defaultMessage={`I'm interested in ${subject}. Please share more details.`}
        />
        <p className="mt-5 text-center text-xs text-subtle">
          Or email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-ink underline-offset-2 hover:underline">
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
