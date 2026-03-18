// lib/sort.ts
export type SortField = "amount" | "id" | "due_date";
export type SortOrder = "asc" | "desc";

export function sortInvoices<
  T extends { amount: number; id: string; due_date: string },
>(data: T[], sortField: SortField, sortOrder: SortOrder = "asc") {
  const modifier = sortOrder === "asc" ? 1 : -1;

  return [...data].sort((a, b) => {
    if (sortField === "amount") {
      return (a.amount - b.amount) * modifier;
    } else if (sortField === "id") {
      return a.id.localeCompare(b.id) * modifier;
    } else {
      return (
        (new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) *
        modifier
      );
    }
  });
}
