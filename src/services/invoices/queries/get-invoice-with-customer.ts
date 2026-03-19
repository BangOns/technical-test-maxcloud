import api from "@/lib/axios";
import { getInvoiceById } from "./get-invoice-by-id";
import { getCustomerById } from "@/services/customers/queries/get-customer-by-id";

export const getInvoiceWithCustomer = async (id: string) => {
  const invoiceRes = await getInvoiceById(id);
  if (!invoiceRes.status) throw new Error("Failed to fetch invoice");
  const invoice = invoiceRes;

  const [customer] = await Promise.all([
    await getCustomerById(invoice.customer_id),
  ]);

  return { invoice, customer };
};
