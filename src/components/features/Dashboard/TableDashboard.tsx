import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import GetStatusBadge from "@/components/shared/StatusBadge";
import { Invoice } from "../../../../types/data-types";
export default function TableDashboard({
  recentInvoices,
}: {
  recentInvoices: Invoice[];
}) {
  return (
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
            <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
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
              <TableCell className="font-medium">{invoice.id}</TableCell>
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
  );
}
