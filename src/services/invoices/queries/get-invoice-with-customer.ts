import api from "@/lib/axios";
import { getInvoiceById } from "./get-invoice-by-id";

export const getInvoiceWithCustomer = async (id: string) => {
  const invoiceRes = await getInvoiceById(id);
  if (!invoiceRes.status) throw new Error("Failed to fetch invoice");
  const invoice = invoiceRes;

  const [customer] = await Promise.all([
    api.get(`/api/customers/${invoice.customer_id}`).then((res) => {
      if (!res.status) throw new Error("Failed to fetch customer");
      return res.data.data;
    }),
  ]);

  return { invoice, customer };
};
