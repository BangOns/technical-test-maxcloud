import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export default function Profile() {
  return (
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
  );
}
