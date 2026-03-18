import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/invoices/get-invoice";

export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices(),
    refetchInterval: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });
};
