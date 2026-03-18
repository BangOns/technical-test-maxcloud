"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, FilePlus2 } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Create Invoice", href: "/invoices/create", icon: FilePlus2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <section className="flex h-full w-64 flex-col overflow-y-auto border-r border-zinc-200 bg-white px-3 py-4">
      <header className="mb-8 flex items-center px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
          <Receipt className="h-5 w-5" />
        </div>
        <span className="ml-3 text-lg font-semibold tracking-tight text-zinc-900">
          ThisBillingMe
        </span>
      </header>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.endsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <item.icon
                className={`mr-3 shrink-0 h-5 w-5 ${
                  isActive
                    ? "text-zinc-900"
                    : "text-zinc-400 group-hover:text-zinc-500"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
