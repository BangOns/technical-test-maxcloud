import EmptyState from "@/components/shared/EmptyState";
import GetStatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Invoice } from "../../../../types/api-types";

export default function InvoiceTable({
  paginated,
  handleSort,
}: {
  paginated: Invoice[];
  handleSort: (field: "id" | "amount" | "due_date") => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">
            <Button
              variant="ghost"
              onClick={() => handleSort("id")}
              className="-ml-4 h-8 data-[state=open]:bg-zinc-100 font-semibold"
            >
              Invoice ID <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort("due_date")}
              className="-ml-4 h-8 data-[state=open]:bg-zinc-100 font-semibold"
            >
              Due Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant="ghost"
              onClick={() => handleSort("amount")}
              className="-mr-4 h-8 justify-end w-full data-[state=open]:bg-zinc-100 font-semibold"
            >
              Amount <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginated.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
              <EmptyState status="error" title="No invoices found." />
            </TableCell>
          </TableRow>
        ) : (
          paginated.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {invoice.id}
                </Link>
              </TableCell>
              <TableCell>{invoice.customer_id}</TableCell>
              <TableCell>
                <GetStatusBadge status={invoice.status} />
              </TableCell>
              <TableCell>{invoice.due_date}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(invoice.amount)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
