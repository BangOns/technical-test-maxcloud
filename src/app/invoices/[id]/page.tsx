"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download, Pencil } from "lucide-react";
import { fetchInvoiceById, fetchCustomerById, updateInvoice } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: invoice, isLoading: isInvoiceLoading, isError: isInvoiceError } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => fetchInvoiceById(id),
  });

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer", invoice?.customer_id],
    queryFn: () => fetchCustomerById(invoice!.customer_id),
    enabled: !!invoice?.customer_id,
  });

  const payMutation = useMutation({
    mutationFn: () => updateInvoice(id, { status: "paid" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice", id] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  if (isInvoiceLoading || isCustomerLoading) return <div className="p-8 text-zinc-500">Loading invoice details...</div>;
  if (isInvoiceError || !invoice) return <div className="p-8 text-red-500">Error loading invoice or invoice not found.</div>;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success" className="text-sm px-3 py-1">Paid</Badge>;
      case "unpaid":
        return <Badge variant="warning" className="text-sm px-3 py-1">Unpaid</Badge>;
      case "overdue":
        return <Badge variant="destructive" className="text-sm px-3 py-1">Overdue</Badge>;
      default:
        return <Badge className="text-sm px-3 py-1">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/invoices"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to invoices</span>
        </Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Invoice {invoice.id}</h2>
        </div>
        <div className="flex items-center gap-2">
          {invoice.status !== "paid" && (
            <Button
              onClick={() => payMutation.mutate()}
              disabled={payMutation.isPending}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {payMutation.isPending ? "Processing..." : "Mark as Paid"}
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {customer ? (
              <>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Name:</span>
                  <span className="font-medium text-zinc-900">{customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Email:</span>
                  <span className="font-medium text-zinc-900">{customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Plan:</span>
                  <span className="font-medium capitalize text-zinc-900">{customer.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Customer ID:</span>
                  <span className="font-medium text-zinc-900">{customer.id}</span>
                </div>
              </>
            ) : (
              <div className="text-zinc-500">Loading customer details...</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-4">
              <span className="text-base font-semibold text-zinc-900">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(invoice.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Status:</span>
              {getStatusBadge(invoice.status)}
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Due Date:</span>
              <span className="font-medium text-zinc-900">{invoice.due_date}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right font-bold">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.qty * item.price)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-zinc-500">
                      No items found for this invoice.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
