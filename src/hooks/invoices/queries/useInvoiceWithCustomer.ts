import { useQuery } from "@tanstack/react-query";
import { getInvoiceWithCustomer } from "@/services/invoices/queries/get-invoice-with-customer";

export const useInvoiceWithCustomer = (id: string) => {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => getInvoiceWithCustomer(id),
    refetchInterval: 1000 * 60,
  });
};
