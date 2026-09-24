import { siteConfig } from "@/data/site-config";

const { contact } = siteConfig;

/** True once a real dial number has been configured. */
export const hasPhone = Boolean(contact.phoneDial);
export const hasWhatsApp = Boolean(contact.whatsappDial);

/** `tel:` link, or the contact page while the number is still a placeholder. */
export function callHref() {
  return hasPhone ? `tel:${contact.phoneDial}` : "/contact#contact-options";
}

/** WhatsApp click-to-chat link with an optional pre-filled subject. */
export function whatsappHref(subject?: string) {
  if (!hasWhatsApp) return "/contact#contact-options";
  const text = subject ? `${contact.whatsappMessage} ${subject}.` : contact.whatsappMessage.replace(/ about$/, ".");
  return `https://wa.me/${contact.whatsappDial}?text=${encodeURIComponent(text)}`;
}

export function mailHref(subject?: string) {
  return `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}
