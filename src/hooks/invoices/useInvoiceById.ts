import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "@/services/invoices/get-invoice-id";

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  });
};
