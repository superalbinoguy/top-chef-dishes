"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlFilters(key = "filters") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(key);

  const selected = useMemo(
    () => (raw ? raw.split(",").filter(Boolean) : []),
    [raw]
  );

  const setSelected = useCallback(
    (ids: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (ids.length > 0) params.set(key, ids.join(","));
      else params.delete(key);

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [key, pathname, router, searchParams]
  );

  return [selected, setSelected] as const;
}