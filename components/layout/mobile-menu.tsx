"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown, Mail, Phone, Search, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/data/site-config";
import { callHref, mailHref, whatsappHref } from "@/lib/contact";
import { areas, developers } from "@/lib/data";
import { STATUS_OPTIONS } from "@/lib/search";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";

const subLinks: Record<string, Array<{ label: string; href: string }>> = {
  projects: [
    { label: "All Projects", href: "/projects" },
    ...STATUS_OPTIONS.map((s) => ({ label: s.label, href: `/projects?status=${s.value}` })),
  ],
  areas: [{ label: "All Areas", href: "/areas" }, ...areas.map((a) => ({ label: a.name, href: `/areas/${a.slug}` }))],
  developers: [
    { label: "All Developers", href: "/developers" },
    ...developers.map((d) => ({ label: d.name, href: `/developers/${d.slug}` })),
  ],
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}

export function MobileMenu({ open, onClose, onSearch }: MobileMenuProps) {
  if (!open) return null;
  return <MobileMenuPanel onClose={onClose} onSearch={onSearch} />;
}

function MobileMenuPanel({ onClose, onSearch }: Omit<MobileMenuProps, "open">) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  useDialog(panelRef, onClose);

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute right-0 top-0 flex h-dvh w-[min(92vw,420px)] animate-drawer-in flex-col bg-white shadow-[var(--shadow-panel)]"
      >
        <div className="flex h-[74px] items-center justify-between border-b border-line px-5">
          <Logo className="h-[46px]" />
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-xl border border-line text-ink"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSearch();
            }}
            className="mb-3 flex h-12 w-full items-center gap-3 rounded-xl border border-line bg-mist px-4 text-left text-[15px] text-subtle"
          >
            <Search className="size-[18px] text-ink" aria-hidden="true" />
            Search projects & properties
          </button>

          <nav aria-label="Mobile">
            <ul className="divide-y divide-line">
              {siteConfig.navigation.primary.map((item) => {
                const menu = "menu" in item ? item.menu : undefined;
                const isOpen = expanded === item.label;
                if (!menu) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex h-14 items-center font-display text-[17px] font-semibold text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const panelId = `mobile-sub-${menu}`;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex h-14 w-full items-center justify-between font-display text-[17px] font-semibold text-ink"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-5 text-subtle transition-transform duration-300", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={panelId}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-premium)]",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <ul className="overflow-hidden" inert={!isOpen}>
                        {subLinks[menu].map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="flex h-11 items-center border-l-2 border-line pl-4 text-[15px] text-body transition-colors hover:border-cyan hover:text-ink"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li className="h-3" aria-hidden="true" />
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {siteConfig.navigation.secondary.map((item, i) => (
              <ButtonLink key={item.href} href={item.href} variant={i === 0 ? "primary" : "outline"} onClick={onClose}>
                {item.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="border-t border-line bg-mist px-5 py-5">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">Talk to our team</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <a
              href={callHref()}
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-xs font-semibold text-ink ring-1 ring-line"
            >
              <Phone className="size-[18px]" aria-hidden="true" />
              Call
            </a>
            <a
              href={whatsappHref()}
              onClick={onClose}
              {...(whatsappHref().startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-xs font-semibold text-ink ring-1 ring-line"
            >
              <WhatsAppIcon className="size-[18px] text-whatsapp" />
              WhatsApp
            </a>
            <a
              href={mailHref()}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-xs font-semibold text-ink ring-1 ring-line"
            >
              <Mail className="size-[18px]" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
