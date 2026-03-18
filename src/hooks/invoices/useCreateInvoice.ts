import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "@/services/invoices/create-invoice";

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
