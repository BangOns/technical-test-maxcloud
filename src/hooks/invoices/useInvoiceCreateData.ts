import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "@/services/invoices/create-invoice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice created successfully");
      router.push("/invoices");
    },
    onError: () => {
      toast.error("Failed to create invoice");
    },
  });
};
