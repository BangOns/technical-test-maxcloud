import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PageHeader({
  title,
  description,
  isBack = false,
}: {
  title: string;
  description: React.ReactNode;
  isBack?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="flex gap-4 items-center">
      {isBack && (
        <Button
          onClick={() => router.back()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5 text-slate-500" />
        </Button>
      )}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-zinc-500">{description}</p>
      </section>
    </header>
  );
}
