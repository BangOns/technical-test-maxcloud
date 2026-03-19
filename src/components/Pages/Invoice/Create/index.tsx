"use client";

import PageHeader from "@/components/shared/PageHeader";
import FormCreateInvoice from "@/components/feature/Invoice/create/FormCreateInvoice";

export default function CreateInvoicePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Create Invoice"
        description="Draft a new invoice for a customer."
        isBack
      />

      <FormCreateInvoice />
    </div>
  );
}
