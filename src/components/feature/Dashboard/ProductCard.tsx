import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function ProductCard({
  title,
  icon,
  amount,
}: {
  title: string;
  icon: React.ReactNode;
  amount: number | string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{amount}</p>
      </CardContent>
    </Card>
  );
}
