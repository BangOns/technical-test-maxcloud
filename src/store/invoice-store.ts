import { create } from "zustand";

interface InvoiceStore {
  sortField: "id" | "amount" | "due_date";
  sortFieldSet: (sortField: "id" | "amount" | "due_date") => void;
  sortOrder: "asc" | "desc";
  sortOrderSet: (sortOrder: "asc" | "desc") => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  sortField: "due_date",
  sortFieldSet: (sortField: "id" | "amount" | "due_date") => set({ sortField }),
  sortOrder: "desc",
  sortOrderSet: (sortOrder: "asc" | "desc") => set({ sortOrder }),
}));
