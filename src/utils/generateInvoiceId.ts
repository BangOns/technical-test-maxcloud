export function generateInvoiceId() {
  return `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;
}
