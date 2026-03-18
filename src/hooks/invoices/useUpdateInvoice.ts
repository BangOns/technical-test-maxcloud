import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "@/services/invoices/update-invoice";
import { Invoice } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (invoice: Partial<Invoice>) =>
      updateInvoice(invoice.id || "", { ...invoice, status: "paid" }),
    onSuccess: (_, invoice) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice", invoice.id] });
      toast.success("Invoice updated successfully");
      router.push("/invoices");
    },
    onError: () => {
      toast.error("Failed to update invoice");
    },
  });
};
