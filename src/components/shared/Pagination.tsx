import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasNextPage,
  hasPrevPage,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get("page") || currentPage);

  function handleNextPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePreviousPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page - 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  const showFrom = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const showTo = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 sm:px-6">
      {/* Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={!hasPrevPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-700">
          Showing <span className="font-medium">{showFrom}</span> to{" "}
          <span className="font-medium">{showTo}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>

        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none border-r-0"
            onClick={handlePreviousPage}
            disabled={!hasPrevPage} // ← pakai hasPrevPage
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="border hover:bg-zinc-50 border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300">
            {currentPage} / {Math.max(1, totalPages)}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none border-l-0"
            onClick={handleNextPage}
            disabled={!hasNextPage} // ← pakai hasNextPage
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
