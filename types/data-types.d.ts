export interface InvoiceItem {
  name: string;
  qty: number;
  unit: string;
  price: number;
}

export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft";

export interface Invoice {
  id: string;
  customer_id: string;
  status: InvoiceStatus;
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
