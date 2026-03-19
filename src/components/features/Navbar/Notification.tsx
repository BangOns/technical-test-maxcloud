"use client";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNotifStore } from "@/store/notif-store";

export default function Notification() {
  const { notif, clearNotif } = useNotifStore();
  return (
    <Popover>
      <PopoverTrigger className="text-zinc-400 hover:text-zinc-500 relative">
        <Bell className="h-5 w-5" aria-hidden="true" />
        {notif.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle className="flex justify-between items-center">
            <section className="text-lg font-semibold">Notification</section>
            {notif.length > 0 && (
              <Button variant="ghost" onClick={clearNotif}>
                Clear All
              </Button>
            )}
          </PopoverTitle>
          {notif.length > 0 ? (
            notif.map((item, index) => (
              <div key={index}>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
