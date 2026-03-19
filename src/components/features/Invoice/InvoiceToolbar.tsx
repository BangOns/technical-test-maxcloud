import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InvoiceToolbar({
  searchQuery,
  handleSearch,
  statusFilter,
  handleStatusChange,
  filteredInvoice,
}: {
  searchQuery: string;
  handleSearch: (value: string) => void;
  statusFilter: string;
  handleStatusChange: (value: string) => void;
  filteredInvoice: ReadonlyArray<string>;
}) {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <header className="relative w-full max-w-sm">
        <Input
          type="search"
          placeholder="Search by Invoice or Customer ID..."
          className=" bg-white"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </header>

      <section className="w-full max-w-sm justify-end flex items-center gap-2">
        <p className="text-sm font-medium text-zinc-700">Filter Status:</p>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            handleStatusChange(value as string);
          }}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filteredInvoice.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </section>
  );
}
