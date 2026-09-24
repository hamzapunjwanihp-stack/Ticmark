"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/lib/use-dialog";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  resultCount: number;
  resultLabel: string;
  children: React.ReactNode;
}

/** Slide-in filter panel used on phones and tablets. */
export function MobileFilterDrawer({ open, ...props }: MobileFilterDrawerProps) {
  if (!open) return null;
  return <DrawerPanel {...props} />;
}

function DrawerPanel({ onClose, onClear, resultCount, resultLabel, children }: Omit<MobileFilterDrawerProps, "open">) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        className="absolute left-0 top-0 flex h-dvh w-[min(92vw,420px)] animate-drawer-in-left flex-col bg-white shadow-[var(--shadow-panel)]"
      >
        <div className="flex h-[70px] items-center justify-between border-b border-line px-5">
          <h2 id="filter-drawer-title" className="text-lg font-bold">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-xl border border-line"
            aria-label="Close filters"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">{children}</div>
        <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-line p-4">
          <Button variant="outline" onClick={onClear}>
            Clear all
          </Button>
          <Button onClick={onClose}>
            Show {resultCount} {resultLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
