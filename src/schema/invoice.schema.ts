import * as z from "zod";

export const invoiceItemSchema = z.object({
  name: z.string().min(1, {
    message: "Service name is required",
  }),

  qty: z
    .number()
    .min(1, {
      message: "Quantity must be at least 1",
    })
    .refine(
      (value) => {
        return value > 0;
      },
      {
        message: "Quantity must be greater than 0",
      },
    ),

  unit: z.string().min(1, {
    message: "Unit is required",
  }),
  price: z
    .number()
    .min(0, {
      message: "Price cannot be negative",
    })
    .refine(
      (value) => {
        return value > 0;
      },
      {
        message: "Price must be greater than 0",
      },
    ),
});

export const invoiceSchema = z.object({
  customer_id: z.string().min(1, {
    message: "Customer is required",
  }),

  due_date: z
    .string()
    .min(1, {
      message: "Due date is required",
    })
    .refine(
      (value) => {
        const date = new Date(value);
        return date >= new Date();
      },
      {
        message: "Due date must be in the future",
      },
    ),

  items: z.array(invoiceItemSchema).min(1, {
    message: "At least one invoice item is required",
  }),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
