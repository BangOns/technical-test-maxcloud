export const invoices = [
  {
    id: "INV-2024-001",
    customer_id: "cust-01",
    status: "paid",
    amount: 2450000,
    due_date: "2024-12-31",
    items: [
      { name: "Compute 4vCPU", qty: 30, unit: "days", price: 50000 },
      { name: "Storage 100GB", qty: 1, unit: "month", price: 200000 },
    ],
  },
  {
    id: "INV-2024-002",
    customer_id: "cust-02",
    status: "unpaid",
    amount: 875000,
    due_date: "2025-01-15",
    items: [{ name: "Compute 2vCPU", qty: 25, unit: "days", price: 35000 }],
  },
  {
    id: "INV-2024-003",
    customer_id: "cust-01",
    status: "overdue",
    amount: 5100000,
    due_date: "2024-11-30",
    items: [
      { name: "Compute 8vCPU", qty: 30, unit: "days", price: 150000 },
      { name: "Bandwidth 1TB", qty: 2, unit: "TB", price: 300000 },
    ],
  },
  {
    id: "INV-2024-004",
    customer_id: "cust-03",
    status: "draft",
    amount: 12000000,
    due_date: "2025-02-01",
    items: [
      { name: "Dedicated Server", qty: 1, unit: "month", price: 10000000 },
      { name: "IP Publik", qty: 4, unit: "unit", price: 500000 },
    ],
  },
];

export const customers = [
  {
    id: "cust-01",
    name: "PT Maju Bersama",
    email: "finance@majubersama.co.id",
    plan: "business",
  },
  {
    id: "cust-02",
    name: "CV Teknologi Nusantara",
    email: "billing@teknusantara.co.id",
    plan: "starter",
  },
  {
    id: "cust-03",
    name: "PT Solusi Digital",
    email: "keuangan@solusidigital.id",
    plan: "enterprise",
  },
];
