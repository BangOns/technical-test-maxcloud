"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import toast from "react-hot-toast";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <EmptyState
        status="error"
        title="Something went wrong!"
        description={
          error.message ||
          "An unexpected error occurred while processing your request."
        }
      />
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
