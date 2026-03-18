import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <section className="w-full  grid grid-cols-2  gap-x-4 lg:gap-x-6">
        <div className="col-end-3 flex justify-end items-center gap-x-4 lg:gap-x-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-500"
          >
            <Bell className="h-6 w-6" aria-hidden="true" />
          </Button>

          <div className="relative">
            <Button variant="ghost" className="-m-1.5 flex items-center p-1.5">
              <UserCircle className="h-8 w-8 text-zinc-400" />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-zinc-900"
                  aria-hidden="true"
                >
                  Admin User
                </span>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </header>
  );
}
