import { Spinner } from "../ui/spinner";

export default function LoadingState({ message = "" }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Spinner />
      <span className="ml-2 text-zinc-500">{message}</span>
    </div>
  );
}
