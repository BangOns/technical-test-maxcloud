import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useInvoiceSearch(debounceMs = 300) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [searchValue, debounceMs]);

  const handleSearchChange = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  return { searchValue, handleSearchChange };
}
