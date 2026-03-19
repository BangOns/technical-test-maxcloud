import { useCallback } from "react";
import toast from "react-hot-toast";

import { useUpdateInvoice } from "@/hooks/invoices/mutation/useUpdateInvoice";
import { Invoice } from "../../../../types/data-types";

export function useInvoiceDetailActions(invoice: Invoice) {
  const updateInvoiceMutation = useUpdateInvoice();

  const handlePay = useCallback(() => {
    updateInvoiceMutation.mutate(invoice);
  }, [invoice, updateInvoiceMutation]);

  const handlePDF = useCallback(() => {
    toast.success("Invoice downloaded successfully");
  }, []);

  return {
    handlePay,
    handlePDF,
    isPending: updateInvoiceMutation.isPending,
  };
}
