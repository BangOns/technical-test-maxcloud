import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { Invoice } from "../../../../../types/api-types";

export default function InvoiceTableDetail({ invoice }: { invoice: Invoice }) {
  return (
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
              <TableCell className="text-right">
                {formatCurrency(item.price)}
              </TableCell>
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
  );
}
