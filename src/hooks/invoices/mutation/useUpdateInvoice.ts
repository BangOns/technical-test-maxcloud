import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "@/services/invoices/mutations/update-invoice";
import { Invoice } from "../../../../types/data-types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNotifStore } from "@/store/notif-store";

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setNotif } = useNotifStore();
  return useMutation({
    mutationFn: (invoice: Partial<Invoice>) =>
      updateInvoice(invoice.id || "", { ...invoice, status: "paid" }),
    onSuccess: (_, invoice) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice", invoice.id] });
      toast.success("Invoice updated successfully");
      router.push("/invoices");
      setNotif({
        title: "Invoice",
        description: "Updated successfully",
      });
    },
    onError: () => {
      toast.error("Failed to update invoice");
    },
  });
};
