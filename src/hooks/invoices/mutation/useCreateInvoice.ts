import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "@/services/invoices/mutations/create-invoice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNotifStore } from "@/store/notif-store";

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setNotif } = useNotifStore();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice created successfully");
      router.push("/invoices");
      setNotif({
        title: "Invoice",
        description: "Created successfully",
      });
    },
    onError: () => {
      toast.error("Failed to create invoice");
    },
  });
};
