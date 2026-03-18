"use client";

import { useInvoices } from "@/hooks/invoices/useInvoices";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useInvoiceStore } from "@/store/invoice-store";

import Pagination from "@/components/shared/Pagination";
import InvoiceTable from "@/components/feature/Invoice/InvoiceTable";
import InvoiceHeader from "@/components/feature/Invoice/InvoiceHeader";
import InvoiceToolbar from "@/components/feature/Invoice/InvoiceToolbar";
import { useSearchParams } from "next/navigation";
import { useInvoiceSearch } from "@/hooks/invoices/useInvoiceSearch";
import { sortInvoices } from "@/utils/sort";
import { useInvoiceFilterStatus } from "@/hooks/invoices/useInvoiceFilterStatus";
import { useMemo } from "react";
const filteredInvoice = ["all", "paid", "unpaid", "overdue", "draft"];
export default function InvoiceListPage() {
  const { sortField, sortFieldSet, sortOrder, sortOrderSet } =
    useInvoiceStore();
  const searchParams = useSearchParams();
  const { searchValue, handleSearchChange } = useInvoiceSearch();
  const { filterStatus, handleFilterStatusChange } = useInvoiceFilterStatus();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("limit") ?? 2);
  const {
    data: invoices,
    isLoading,
    isError,
  } = useInvoices(currentPage, itemsPerPage, searchValue, filterStatus);

  const sortedInvoices = useMemo(() => {
    return sortInvoices(invoices?.data || [], sortField, sortOrder);
  }, [invoices?.data, sortField, sortOrder]);

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

  const handleSort = (field: "id" | "amount" | "due_date") => {
    if (sortField === field) {
      sortOrderSet(sortOrder === "asc" ? "desc" : "asc");
    } else {
      sortFieldSet(field);
      sortOrderSet("asc");
    }
  };
  const handleSearch = (value: string) => {
    handleSearchChange(value);
  };

  const handleStatusChange = (value: string) => {
    handleFilterStatusChange(value);
  };

  return (
    <main className="space-y-6">
      <InvoiceHeader />
      <InvoiceToolbar
        filteredInvoice={filteredInvoice}
        searchQuery={searchValue}
        handleSearch={handleSearch}
        statusFilter={filterStatus}
        handleStatusChange={handleStatusChange}
      />

      <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <InvoiceTable
          paginated={sortedInvoices || []}
          handleSort={handleSort}
        />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={invoices?.meta.totalPages || 0}
          itemsPerPage={itemsPerPage}
          totalItems={invoices?.meta.total || 0}
          hasNextPage={invoices?.meta.hasNextPage || false}
          hasPrevPage={invoices?.meta.hasPrevPage || false}
        />
      </div>
    </main>
  );
}
