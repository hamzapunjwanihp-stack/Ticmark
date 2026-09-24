"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { menuPanels, type MenuKey } from "@/components/layout/nav-menus";
import { useSearch } from "@/components/search/search-provider";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const search = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/88",
          scrolled ? "border-transparent shadow-[0_10px_30px_-20px_rgb(28_30_51/0.35)]" : "border-line",
        )}
      >
        <Container className="flex h-[74px] items-center gap-4 lg:h-[84px] lg:gap-6">
          <Logo priority className="h-[50px] lg:h-[58px]" />

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="relative flex items-center gap-0.5 xl:gap-1.5">
              {siteConfig.navigation.primary.map((item) => {
                const menu = "menu" in item ? item.menu : undefined;
                const Panel = menu ? menuPanels[menu] : null;
                const expanded = menu !== undefined && openMenu === menu;
                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(menu ?? null);
                    }}
                    onMouseLeave={scheduleClose}
                    onFocus={() => {
                      cancelClose();
                      setOpenMenu(menu ?? null);
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setOpenMenu(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={menu ? expanded : undefined}
                      aria-haspopup={menu ? "true" : undefined}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative inline-flex items-center gap-1 rounded-lg px-3 py-2.5 font-display text-[15px] font-medium text-ink transition-colors xl:px-3.5",
                        "after:absolute after:inset-x-3 after:bottom-1 after:h-[2px] after:origin-left after:rounded-full after:bg-cyan after:transition-transform after:duration-300 xl:after:inset-x-3.5",
                        isActive(item.href) || expanded ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                      {menu && (
                        <ChevronDown
                          className={cn("size-3.5 text-subtle transition-transform duration-300", expanded && "rotate-180")}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                    {Panel && expanded && (
                      <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3">
                        <div className="animate-panel-in overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-panel)]">
                          <Panel />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={search.open}
              aria-label="Open search"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-3 font-display text-[15px] font-medium text-ink transition-colors hover:bg-mist"
            >
              <Search className="size-[19px]" aria-hidden="true" />
              <span className="hidden xl:inline">Search</span>
            </button>
            {siteConfig.navigation.secondary.map((item, i) => (
              <ButtonLink
                key={item.href}
                href={item.href}
                variant={i === 0 ? "primary" : "outline"}
                size="sm"
                className="hidden h-11 lg:inline-flex"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </ButtonLink>
            ))}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-ink lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={mobileOpen} onClose={closeMobile} onSearch={search.open} />
    </>
  );
}
