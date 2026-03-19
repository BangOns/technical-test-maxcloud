"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Customer, Invoice } from "../../../../../types/data-types";
import InvoiceCustomerCard from "@/components/features/Invoice/detail/InvoiceCustomerCard";
import InvoiceSummaryCard from "@/components/features/Invoice/detail/InvoiceSummaryCard";
import InvoiceTableDetail from "@/components/features/Invoice/detail/InvoiceTableDetail";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import InvoiceHeaderDetail from "@/components/features/Invoice/detail/InvoiceHeaderDetail";
import { useInvoiceWithCustomer } from "@/hooks/invoices/queries/useInvoiceWithCustomer";
import { useInvoiceDetailActions } from "@/hooks/invoices/ui/useInvoiceDetailAction";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useInvoiceWithCustomer(id);

  const { handlePay, handlePDF, isPending } = useInvoiceDetailActions(
    data?.invoice as Invoice,
  );

  if (isLoading) return <LoadingState message="Loading Data" />;
  if (isError || !data)
    return (
      <EmptyState
        status="error"
        title="Detail Invoice Not Found"
        description="Invoice not found"
      />
    );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <InvoiceHeaderDetail
        invoice={data.invoice}
        handlePayMutation={handlePay}
        statusPayMutation={isPending}
        handlePDF={handlePDF}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <InvoiceCustomerCard customer={data.customer as Customer} />

        <InvoiceSummaryCard invoice={data.invoice} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-200">
            <InvoiceTableDetail invoice={data.invoice} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
