import { InvoiceStatus } from "../../../types/api-types";
import { Badge } from "../ui/badge";

export default function GetStatusBadge({ status }: { status: InvoiceStatus }) {
  switch (status) {
    case "paid":
      return (
        <Badge variant="success" className="text-sm px-3 py-1">
          Paid
        </Badge>
      );
    case "unpaid":
      return (
        <Badge variant="warning" className="text-sm px-3 py-1">
          Unpaid
        </Badge>
      );
    case "overdue":
      return (
        <Badge variant="destructive" className="text-sm px-3 py-1">
          Overdue
        </Badge>
      );
    default:
      return <Badge className="text-sm px-3 py-1">{status}</Badge>;
  }
}
