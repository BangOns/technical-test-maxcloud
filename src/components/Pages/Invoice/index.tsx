"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useInvoices } from "@/hooks/invoices/useInvoices";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useInvoiceStore } from "@/store/invoice-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/shared/Pagination";
import InvoiceTable from "@/components/feature/Invoice/InvoiceTable";
import InvoiceHeader from "@/components/feature/Invoice/InvoiceHeader";
import InvoiceToolbar from "@/components/feature/Invoice/InvoiceToolbar";
const filteredInvoice = ["all", "paid", "unpaid", "overdue"];
export default function InvoiceListPage() {
  const { data: invoices = [], isLoading, isError } = useInvoices();
  const {
    statusFilter,
    statusFilterSet,
    searchQuery,
    searchQuerySet,
    sortField,
    sortFieldSet,
    sortOrder,
    sortOrderSet,
  } = useInvoiceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return <LoadingState message="Loading invoice..." />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          status="error"
          title="Error loading invoice  data."
          description="Please try again later."
        />
      </div>
    );
  }
  // Filter
  const filtered = invoices.filter((inv) => {
    if (statusFilter !== "all" && inv.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !inv.id.toLowerCase().includes(q) &&
        !inv.customer_id.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const modifier = sortOrder === "asc" ? 1 : -1;
    if (sortField === "amount") {
      return (a.amount - b.amount) * modifier;
    } else if (sortField === "id") {
      return a.id.localeCompare(b.id) * modifier;
    } else {
      // due_date
      return (
        (new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) *
        modifier
      );
    }
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: "id" | "amount" | "due_date") => {
    if (sortField === field) {
      sortOrderSet(sortOrder === "asc" ? "desc" : "asc");
    } else {
      sortFieldSet(field);
      sortOrderSet("asc");
    }
  };
  const handleSearch = (value: string) => {
    searchQuerySet(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    statusFilterSet(value);
    setCurrentPage(1);
  };
  return (
    <main className="space-y-6">
      <InvoiceHeader />
      <InvoiceToolbar
        filteredInvoice={filteredInvoice}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
      />

      <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <InvoiceTable paginated={paginated} handleSort={handleSort} />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          sorted={sorted}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
