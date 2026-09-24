"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Reads the current query string and replaces it without a server round-trip.
 * Next.js keeps useSearchParams in sync with window.history.replaceState.
 */
export function useUrlParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const replace = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname],
  );
  return { searchParams, replace };
}
