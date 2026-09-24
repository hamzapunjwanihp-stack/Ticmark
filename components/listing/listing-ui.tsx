"use client";

import { SearchX, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { controlClasses } from "@/components/ui/field";
import { SORT_OPTIONS, type SortKey } from "@/lib/search";
import { cn } from "@/lib/utils";

export function SortSelect({ value, onChange, id = "sort" }: { value?: SortKey; onChange: (v: SortKey) => void; id?: string }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="hidden whitespace-nowrap text-sm text-subtle sm:block">
        Sort by
      </label>
      <select
        id={id}
        value={value ?? "newest"}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className={cn(controlClasses, "select-chevron h-11 w-auto cursor-pointer pr-10 text-sm font-medium")}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export interface ActiveChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function ActiveFilters({ chips, onClear }: { chips: ActiveChip[]; onClear: () => void }) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-cyan-50 pl-3.5 pr-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-cyan-100"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button type="button" onClick={onClear} className="px-2 text-[13px] font-semibold text-teal-ink underline-offset-4 hover:underline">
        Clear all
      </button>
    </div>
  );
}

export function EmptyResults({ onClear, label }: { onClear: () => void; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-white px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-mist text-subtle">
        <SearchX className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-lg font-bold text-ink">No {label} match these filters</p>
      <p className="mt-2 max-w-sm text-sm text-body">
        Try removing a filter or widening your price range — or tell us what you need and our team will help.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
        <ButtonLink href="/contact">Contact our team</ButtonLink>
      </div>
    </div>
  );
}

export function ResultCount({ count, singular, plural }: { count: number; singular: string; plural: string }) {
  return (
    <p className="text-[15px] text-body" aria-live="polite">
      <span className="font-display font-bold text-ink">{count}</span> {count === 1 ? singular : plural}
    </p>
  );
}
