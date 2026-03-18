"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useCustomers } from "@/hooks/customers/queries/useCustomers";
import { useCreateInvoice } from "@/hooks/invoices/mutation/useCreateInvoice";
import { useFormCreateInvoice } from "@/hooks/invoices/form/useFormInvoice";
import { InvoiceFormValues } from "@/schema/invoice.schema";
import { Controller, SubmitHandler } from "react-hook-form";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { generateInvoiceId } from "@/utils/generateInvoiceId";
const unit = ["days", "hours", "months", "years"];
export default function FormCreateInvoice() {
  const router = useRouter();
  const { handleSubmit, control, append, remove, fields, watch } =
    useFormCreateInvoice();
  const { data: customers = [] } = useCustomers();

  const createMutation = useCreateInvoice();

  const handleAddItem = () => {
    append({ name: "", qty: 1, unit: "days", price: 1 });
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const calculateTotal = () => {
    return watch.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const onSubmit: SubmitHandler<InvoiceFormValues> = (values) => {
    createMutation.mutate({
      id: generateInvoiceId(),
      customer_id: values.customer_id,
      status: "unpaid",
      amount: Number(calculateTotal()),
      due_date: values.due_date,
      items: values.items,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <FieldGroup className="w-full md:col-span-2">
          {/* Top Section */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Customer */}
                <Controller
                  control={control}
                  name="customer_id"
                  render={({ field, fieldState }) => {
                    return (
                      <div className="space-y-2">
                        <FieldLabel className="text-sm font-medium">
                          Customer
                        </FieldLabel>

                        <Select
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950">
                            <SelectValue placeholder="Select a customer...">
                              {field.value
                                ? customers.find((c) => c.id === field.value)
                                    ?.name
                                : undefined}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Customer</SelectLabel>
                              {customers.map((item) => {
                                return (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name} ({item.email})
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    );
                  }}
                />
                {/* Due Date */}
                <Controller
                  control={control}
                  name="due_date"
                  render={({ field, fieldState }) => {
                    return (
                      <div className="space-y-2">
                        <FieldLabel className="text-sm font-medium">
                          Due Date
                        </FieldLabel>
                        <Input {...field} type="date" required />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Items Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Invoice Items</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddItem}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 items-end bg-zinc-50 p-4 rounded-lg border border-zinc-100"
                >
                  {/* Service Name */}
                  <Controller
                    control={control}
                    name={`items.${index}.name`}
                    render={({ field, fieldState }) => (
                      <div className="flex-1 space-y-2 w-full">
                        <FieldLabel className="text-sm font-medium">
                          Service Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`items.${index}.name`}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="e.g. Compute 4vCPU"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  {/* QTY */}
                  <Controller
                    control={control}
                    name={`items.${index}.qty`}
                    render={({ field, fieldState }) => (
                      <div className="w-full sm:w-24 space-y-2">
                        <FieldLabel className="text-sm font-medium">
                          Qty
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`items.${index}.qty`}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          type="number"
                          placeholder="0"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  {/* Unit */}
                  <Controller
                    control={control}
                    name={`items.${index}.unit`}
                    render={({ field, fieldState }) => (
                      <div className="w-full sm:w-28 space-y-2">
                        <FieldLabel className="text-sm font-medium">
                          Unit
                        </FieldLabel>
                        <Select
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950">
                            <SelectValue placeholder="Select a unit...">
                              {field.value}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Unit</SelectLabel>
                              {unit.map((item, index) => {
                                return (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  {/* Price */}
                  <Controller
                    control={control}
                    name={`items.${index}.price`}
                    render={({ field, fieldState }) => (
                      <div className="w-full sm:w-40 space-y-2">
                        <FieldLabel className="text-sm font-medium">
                          Unit Price
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`items.${index}.price`}
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder="0"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:cursor-not-allowed hover:cursor-pointer"
                    onClick={() => handleRemoveItem(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zinc-100 bg-zinc-50 pt-6">
              <div className="text-lg font-semibold text-zinc-900">
                Total Amount
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(calculateTotal())}
              </div>
            </CardFooter>
          </Card>
        </FieldGroup>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/invoices")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
}
