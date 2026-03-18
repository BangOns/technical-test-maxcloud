import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "@/services/invoices/queries/get-invoice-by-id";

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  });
};
