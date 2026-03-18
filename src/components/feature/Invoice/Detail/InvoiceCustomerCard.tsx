import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "../../../../../types/api-types";

export default function InvoiceCustomerCard({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {customer ? (
          <>
            <div className="flex justify-between">
              <span className="text-zinc-500">Name:</span>
              <span className="font-medium text-zinc-900">{customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Email:</span>
              <span className="font-medium text-zinc-900">
                {customer.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Plan:</span>
              <span className="font-medium capitalize text-zinc-900">
                {customer.plan}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Customer ID:</span>
              <span className="font-medium text-zinc-900">{customer.id}</span>
            </div>
          </>
        ) : (
          <div className="text-zinc-500">Loading customer details...</div>
        )}
      </CardContent>
    </Card>
  );
}
