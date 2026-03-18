import InvoiceListPage from "@/components/Pages/Invoice";
import LoadingState from "@/components/shared/LoadingState";
import { Suspense } from "react";

export default function InvoicePage() {
  return (
    <Suspense fallback={<LoadingState message="Loading Invoices..." />}>
      <InvoiceListPage />
    </Suspense>
  );
}
