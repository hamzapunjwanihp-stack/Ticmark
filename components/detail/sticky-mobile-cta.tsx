import { MessageSquareText, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { callHref, whatsappHref } from "@/lib/contact";

/** Fixed Call | WhatsApp | Inquiry bar for detail pages on phones and tablets. */
export function StickyMobileCTA({ subject }: { subject: string }) {
  const whatsapp = whatsappHref(subject);
  const item = "flex h-14 flex-1 flex-col items-center justify-center gap-0.5 font-display text-[12px] font-semibold";
  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <nav
        aria-label="Contact about this listing"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <a href={callHref()} className={`${item} rounded-xl border border-line text-ink`}>
            <Phone className="size-[18px]" aria-hidden="true" />
            Call
          </a>
          <a
            href={whatsapp}
            {...(whatsapp.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${item} rounded-xl bg-whatsapp text-white`}
          >
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp
          </a>
          <a href="#inquiry" className={`${item} rounded-xl bg-navy text-white`}>
            <MessageSquareText className="size-[18px]" aria-hidden="true" />
            Inquiry
          </a>
        </div>
      </nav>
    </>
  );
}
