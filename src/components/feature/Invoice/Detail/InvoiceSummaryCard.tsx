import GetStatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Invoice } from "../../../../../types/api-types";

export default function InvoiceSummaryCard({ invoice }: { invoice: Invoice }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-4">
          <span className="text-base font-semibold text-zinc-900">
            Total Amount
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(invoice.amount)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500">Status:</span>
          <GetStatusBadge status={invoice.status} />
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Due Date:</span>
          <span className="font-medium text-zinc-900">{invoice.due_date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
