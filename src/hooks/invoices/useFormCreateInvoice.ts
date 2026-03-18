import { InvoiceFormValues, invoiceSchema } from "@/schema/invoice.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFormCreateInvoice() {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer_id: "",
      due_date: "",
      items: [
        {
          name: "",
          qty: 1,
          unit: "days",
          price: 1,
        },
      ],
    },
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    control: form.control,
  };
}
