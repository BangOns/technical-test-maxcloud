import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Download, Pencil } from "lucide-react";
import Link from "next/link";
import { Invoice } from "../../../../../types/api-types";

export default function InvoiceHeaderDetail({
  invoice,
  handlePayMutation,
  statusPayMutation,
}: {
  invoice: Invoice;
  handlePayMutation: () => void;
  statusPayMutation: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/invoices"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to invoices</span>
      </Link>
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Invoice {invoice.id}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {invoice.status !== "paid" && (
          <Button
            onClick={handlePayMutation}
            disabled={statusPayMutation}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {statusPayMutation ? "Processing..." : "Mark as Paid"}
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
  );
}
