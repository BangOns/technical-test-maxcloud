import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/invoices/queries/get-invoice";

export const useInvoices = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string,
) => {
  return useQuery({
    queryKey: ["invoices", page, limit, search, status],
    queryFn: () => getInvoices(page, limit, search, status),
    refetchInterval: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });
};
