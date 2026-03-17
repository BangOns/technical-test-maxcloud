"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers, createInvoice } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { InvoiceItem } from "@/services/api";

export default function CreateInvoicePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: customers = [] } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const [customerId, setCustomerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: "", qty: 1, unit: "days", price: 0 },
  ]);

  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      router.push("/invoices");
    },
  });

  const handleAddItem = () => {
    setItems([...items, { name: "", qty: 1, unit: "days", price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !dueDate || items.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const totalAmount = calculateTotal();

    createMutation.mutate({
      id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
      customer_id: customerId,
      status: "unpaid",
      amount: totalAmount,
      due_date: dueDate,
      items: items,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/invoices"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to invoices</span>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Invoice</h2>
          <p className="text-zinc-500">Draft a new invoice for a customer.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="customer" className="text-sm font-medium">
                    Customer
                  </label>
                  <select
                    id="customer"
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a customer...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="due_date" className="text-sm font-medium">
                    Due Date
                  </label>
                  <Input
                    id="due_date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items Section */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Invoice Items</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 items-end bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                  <div className="flex-1 space-y-2 w-full">
                    <label className="text-sm font-medium">Service Name</label>
                    <Input
                      placeholder="e.g. Compute 4vCPU"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full sm:w-24 space-y-2">
                    <label className="text-sm font-medium">Qty</label>
                    <Input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, "qty", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="w-full sm:w-28 space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <Input
                      placeholder="days, hours..."
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full sm:w-40 space-y-2">
                    <label className="text-sm font-medium">Unit Price</label>
                    <Input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveItem(index)}
                    disabled={items.length === 1}
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
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/invoices")}>
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create Invoice"}
          </Button>
        </div>
      </form>
    </div>
  );
}
