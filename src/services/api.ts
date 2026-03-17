import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export interface InvoiceItem {
  name: string;
  qty: number;
  unit: string;
  price: number;
}

export interface Invoice {
  id: string;
  customer_id: string;
  status: "paid" | "unpaid" | "overdue";
  amount: number;
  due_date: string;
  items: InvoiceItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
}

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const { data } = await api.get("/invoice");
  // Ensure array
  return Array.isArray(data) ? data : [];
};

export const fetchCustomers = async (): Promise<Customer[]> => {
  const { data } = await api.get("/customers");
  return Array.isArray(data) ? data : [];
};

export const fetchCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await api.get(`/customers/${id}`);
  return data;
};

export const fetchInvoiceById = async (id: string): Promise<Invoice> => {
  const { data } = await api.get(`/invoice/${id}`);
  return data;
};

export const createInvoice = async (invoice: Partial<Invoice>): Promise<Invoice> => {
  const { data } = await api.post("/invoice", invoice);
  return data;
};

export const updateInvoice = async (id: string, invoice: Partial<Invoice>): Promise<Invoice> => {
  const { data } = await api.patch(`/invoice/${id}`, invoice);
  return data;
};
