import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "@/services/invoices/update-invoice";
import { Invoice } from "../../../types/api-types";

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoice: Partial<Invoice>) =>
      updateInvoice(invoice.id || "", invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
