import { AlertCircle, Receipt } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export default function EmptyState({
  status,
  title = "",
  description = "",
}: {
  status: "not-found" | "error";
  title?: string;
  description?: string;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          {status === "not-found" ? (
            <Receipt className="h-4 w-4 text-zinc-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description || ""}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
