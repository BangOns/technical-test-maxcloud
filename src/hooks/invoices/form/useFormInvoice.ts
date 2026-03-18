import { InvoiceFormValues, invoiceSchema } from "@/schema/invoice.schema";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
  const formArray = useFieldArray({
    control: form.control,
    name: "items",
  });
  const watchItems = useWatch({
    control: form.control,
    name: "items",
  });
  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    control: form.control,
    formArray,
    append: formArray.append,
    remove: formArray.remove,
    fields: formArray.fields,
    watch: watchItems,
  };
}
