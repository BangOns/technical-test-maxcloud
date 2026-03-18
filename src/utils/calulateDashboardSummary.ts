import { isPast, isThisMonth, parseISO } from "date-fns";
import { Invoice } from "../../types/api-types";

export function calculateDashboardSummary(invoices: Invoice[]) {
  const totalInvoicesThisMonth = invoices.filter((inv) =>
    inv.due_date ? isThisMonth(parseISO(inv.due_date)) : false,
  ).length;

  const totalUnpaidAmount = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalOverdueInvoices = invoices.filter((inv) => {
    if (inv.status === "paid") return false;
    if (inv.status === "overdue") return true;
    if (inv.due_date && isPast(parseISO(inv.due_date))) return true;
    return false;
  }).length;

  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Recent Invoices Sorting
  const recentInvoices = [...invoices]
    .sort(
      (a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime(),
    )
    .slice(0, 5);
  return {
    totalInvoicesThisMonth,
    totalUnpaidAmount,
    totalOverdueInvoices,
    totalRevenue,
    recentInvoices,
  };
}
