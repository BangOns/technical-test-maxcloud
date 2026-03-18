"use client";

import {
  Receipt,
  AlertCircle,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { useInvoices } from "@/hooks/invoices/useInvoices";
import LoadingState from "@/components/shared/LoadingState";
import GetStatusBadge from "@/components/shared/StatusBadge";
import Link from "next/link";
import ProductCard from "@/components/feature/Dashboard/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import { formatCurrency } from "@/utils/formatCurrency";
import DoughnutChart from "@/components/feature/Dashboard/DoughnutChart";
import { calculateDashboardSummary } from "@/utils/calulateDashboardSummary";
import PageHeader from "@/components/shared/PageHeader";

export default function Dashboard() {
  const { data: invoices = [], isLoading, isError } = useInvoices();

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          status="error"
          title="Error loading dashboard data."
          description="Please try again later."
        />
      </div>
    );
  }

  // Calculations
  const {
    totalInvoicesThisMonth,
    totalUnpaidAmount,
    totalOverdueInvoices,
    totalRevenue,
    recentInvoices,
  } = calculateDashboardSummary(invoices);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Summary of your billing and invoice metrics."
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          title="Total Invoices (This Month)"
          icon={<Receipt className="h-4 w-4 text-green-500" />}
          amount={totalInvoicesThisMonth}
        />

        <ProductCard
          title="Total Unpaid Amount"
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          amount={totalUnpaidAmount}
        />

        <ProductCard
          title="Overdue Invoices"
          icon={<AlertCircle className="h-4 w-4 text-zinc-500" />}
          amount={totalOverdueInvoices}
        />

        <ProductCard
          title="Total Revenue"
          icon={<DollarSign className="h-4 w-4 text-zinc-500" />}
          amount={formatCurrency(totalRevenue) as string}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Status Distribution Chart */}
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Invoice Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-8 min-h-[300px]">
            {invoices.length > 0 ? (
              <div className="h-full w-full relative">
                <DoughnutChart invoices={invoices} />
              </div>
            ) : (
              <EmptyState
                status="not-found"
                title="No invoices found"
                description="Create your first invoice to see it here."
              />
            )}
          </CardContent>
        </Card>

        {/* Recent Invoices Table */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link
              href="/invoices"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-zinc-500"
                    >
                      <EmptyState
                        status="not-found"
                        title="No invoices found"
                        description="Create your first invoice to see it here."
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <GetStatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell>{invoice.due_date}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                          })}
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
