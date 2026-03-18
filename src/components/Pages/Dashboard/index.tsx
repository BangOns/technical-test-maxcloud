"use client";

import { Receipt, AlertCircle, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";
import { useInvoices } from "@/hooks/invoices/useInvoices";
import LoadingState from "@/components/shared/LoadingState";
import Link from "next/link";
import ProductCard from "@/components/feature/Dashboard/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import { formatCurrency } from "@/utils/formatCurrency";
import DoughnutChart from "@/components/feature/Dashboard/DoughnutChart";
import { calculateDashboardSummary } from "@/utils/calulateDashboardSummary";
import PageHeader from "@/components/shared/PageHeader";
import TableDashboard from "@/components/feature/Dashboard/TableDashboard";

export default function Dashboard() {
  const { data: invoices, isLoading, isError } = useInvoices();

  const {
    totalInvoicesThisMonth,
    totalUnpaidAmount,
    totalOverdueInvoices,
    totalRevenue,
    recentInvoices,
  } = calculateDashboardSummary(invoices?.data || []);

  if (isLoading) {
    return <LoadingState message="Loading get data dashboard..." />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState
          status="error"
          title="Error get dashboard data."
          description="Please try again later."
        />
      </div>
    );
  }

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
            {invoices && invoices.data && invoices.data.length > 0 ? (
              <div className="h-full w-full relative">
                <DoughnutChart invoices={invoices.data} />
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
            <TableDashboard recentInvoices={recentInvoices} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
