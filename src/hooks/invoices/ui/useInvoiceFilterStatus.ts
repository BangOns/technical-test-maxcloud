import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useInvoiceFilterStatus(debounceMs = 300) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filterStatus, setfilterStatus] = useState(
    searchParams.get("status") ?? "all",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (filterStatus) {
        params.set("status", filterStatus);
      } else {
        params.delete("status");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [filterStatus, debounceMs]);

  const handleFilterStatusChange = useCallback((value: string): void => {
    setfilterStatus(value);
  }, []);

  return { filterStatus, handleFilterStatusChange };
}
