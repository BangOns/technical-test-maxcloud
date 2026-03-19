"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { useInvoices } from "@/hooks/invoices/queries/useInvoices";
import { useInvoiceSearch } from "@/hooks/invoices/ui/useInvoiceSearch";
import { useInvoiceFilterStatus } from "@/hooks/invoices/ui/useInvoiceFilterStatus";
import { useInvoiceStore } from "@/store/invoice-store";

import { sortInvoices } from "@/utils/sort";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";

import InvoiceHeader from "@/components/feature/Invoice/InvoiceHeader";
import InvoiceToolbar from "@/components/feature/Invoice/InvoiceToolbar";
import InvoiceTable from "@/components/feature/Invoice/InvoiceTable";
import { INVOICE_STATUS_OPTIONS } from "@/constants/invoice";

export default function InvoiceListPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("limit") ?? 10);

  const { searchValue, handleSearchChange } = useInvoiceSearch();
  const { filterStatus, handleFilterStatusChange } = useInvoiceFilterStatus();

  const { sortField, sortFieldSet, sortOrder, sortOrderSet } =
    useInvoiceStore();

  const {
    data: invoices,
    isLoading,
    isError,
  } = useInvoices(currentPage, itemsPerPage, searchValue, filterStatus);

  const sortedInvoices = useMemo(() => {
    return sortInvoices(invoices?.data ?? [], sortField, sortOrder);
  }, [invoices?.data, sortField, sortOrder]);

  const handleSort = useCallback(
    (field: "id" | "amount" | "due_date") => {
      if (sortField === field) {
        sortOrderSet(sortOrder === "asc" ? "desc" : "asc");
        return;
      }
      sortFieldSet(field);
      sortOrderSet("asc");
    },
    [sortField, sortOrder, sortFieldSet, sortOrderSet],
  );

  if (isLoading) {
    return <LoadingState message="Loading get data invoice..." />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          status="error"
          title="Error get invoice data."
          description="Please try again later."
        />
      </div>
    );
  }

  const meta = invoices?.meta;

  return (
    <main className="space-y-6">
      <InvoiceHeader />

      <InvoiceToolbar
        filteredInvoice={INVOICE_STATUS_OPTIONS}
        searchQuery={searchValue}
        handleSearch={handleSearchChange}
        statusFilter={filterStatus}
        handleStatusChange={handleFilterStatusChange}
      />

      <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <InvoiceTable paginated={sortedInvoices} handleSort={handleSort} />

        <Pagination
          currentPage={currentPage}
          totalPages={meta?.totalPages ?? 0}
          itemsPerPage={itemsPerPage}
          totalItems={meta?.total ?? 0}
          hasNextPage={meta?.hasNextPage ?? false}
          hasPrevPage={meta?.hasPrevPage ?? false}
        />
      </div>
    </main>
  );
}
