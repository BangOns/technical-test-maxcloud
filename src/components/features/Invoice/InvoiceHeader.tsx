import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function InvoiceHeader() {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageHeader
        title="Invoices"
        description="Manage customer invoices and billing."
      />
      <Button asChild>
        <Link
          href="/invoices/create"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <FilePlus2 className="mr-2 h-4 w-4" />
          Create Invoice
        </Link>
      </Button>
    </section>
  );
}
