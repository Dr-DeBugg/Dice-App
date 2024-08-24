import { Skeleton } from "@/components/shadcn/skeleton";

export default function Loading() {
  return (
    <main className="mb-4">
      <div className="rounded-md border">
        <div className="flex flex-col space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
