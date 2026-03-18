import { create } from "zustand";

interface InvoiceStore {
  statusFilter: string;
  statusFilterSet: (status: string) => void;
  searchQuery: string;
  searchQuerySet: (searchQuery: string) => void;
  sortField: "id" | "amount" | "due_date";
  sortFieldSet: (sortField: "id" | "amount" | "due_date") => void;
  sortOrder: "asc" | "desc";
  sortOrderSet: (sortOrder: "asc" | "desc") => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  statusFilter: "all",
  statusFilterSet: (status: string) => set({ statusFilter: status }),
  searchQuery: "",
  searchQuerySet: (searchQuery: string) => set({ searchQuery }),
  sortField: "due_date",
  sortFieldSet: (sortField: "id" | "amount" | "due_date") => set({ sortField }),
  sortOrder: "desc",
  sortOrderSet: (sortOrder: "asc" | "desc") => set({ sortOrder }),
}));
