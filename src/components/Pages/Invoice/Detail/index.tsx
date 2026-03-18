"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInvoiceById } from "@/hooks/invoices/useInvoiceById";
import { useCustomerById } from "@/hooks/customers/useCutomerById";
import { useUpdateInvoice } from "@/hooks/invoices/useUpdateInvoice";
import { Customer } from "../../../../../types/api-types";
import InvoiceCustomerCard from "@/components/feature/Invoice/Detail/InvoiceCustomerCard";
import InvoiceSummaryCard from "@/components/feature/Invoice/Detail/InvoiceSummaryCard";
import InvoiceTableDetail from "@/components/feature/Invoice/Detail/InvoiceTableDetail";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import InvoiceHeaderDetail from "@/components/feature/Invoice/Detail/InvoiceHeaderDetail";
import toast from "react-hot-toast";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: invoice,
    isLoading: isInvoiceLoading,
    isError: isInvoiceError,
  } = useInvoiceById(id);
  const { data: customer, isLoading: isCustomerLoading } = useCustomerById(
    invoice?.customer_id || "",
  );

  const payMutation = useUpdateInvoice();

  if (isInvoiceLoading || isCustomerLoading)
    return <LoadingState message="Loading Data" />;
  if (isInvoiceError || !invoice)
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
        invoice={invoice}
        handlePayMutation={() => payMutation.mutate(invoice)}
        statusPayMutation={payMutation.isPending}
        handlePDF={handlePDF}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <InvoiceCustomerCard customer={customer as Customer} />

        <InvoiceSummaryCard invoice={invoice} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-200">
            <InvoiceTableDetail invoice={invoice} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
