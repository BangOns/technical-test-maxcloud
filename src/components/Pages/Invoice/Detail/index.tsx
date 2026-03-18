"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUpdateInvoice } from "@/hooks/invoices/useInvoiceUpdateData";
import { Customer } from "../../../../../types/data-types";
import InvoiceCustomerCard from "@/components/feature/Invoice/Detail/InvoiceCustomerCard";
import InvoiceSummaryCard from "@/components/feature/Invoice/Detail/InvoiceSummaryCard";
import InvoiceTableDetail from "@/components/feature/Invoice/Detail/InvoiceTableDetail";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import InvoiceHeaderDetail from "@/components/feature/Invoice/Detail/InvoiceHeaderDetail";
import toast from "react-hot-toast";
import { useInvoiceWithCustomer } from "@/hooks/invoices/useInvoiceWithCustomer";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useInvoiceWithCustomer(id);

  const payMutation = useUpdateInvoice();

  if (isLoading) return <LoadingState message="Loading Data" />;
  if (isError || !data)
    return (
      <EmptyState
        status="error"
        title="Detail Invoice Not Found"
        description="Invoice not found"
      />
    );
  function handlePDF() {
    toast.success("Invoice downloaded successfully");
  }
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <InvoiceHeaderDetail
        invoice={data.invoice}
        handlePayMutation={() => payMutation.mutate(data.invoice)}
        statusPayMutation={payMutation.isPending}
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
