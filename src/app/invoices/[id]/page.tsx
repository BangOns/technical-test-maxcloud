import InvoiceDetailPage from "@/components/Pages/Invoice/Detail";
import LoadingState from "@/components/shared/LoadingState";
import { Suspense } from "react";

export default function InvoiceDetail() {
  return (
    <Suspense fallback={<LoadingState message="Loading Invoice..." />}>
      <InvoiceDetailPage />
    </Suspense>
  );
}
