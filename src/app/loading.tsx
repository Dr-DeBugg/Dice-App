import { Skeleton } from "@/components/shadcn/skeleton";

export default function Loading() {
  return (
    <main className="mb-4">
      <div className="flex">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[150px] ml-2 mb-4" />
      </div>
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-96 w-full" />
      <div className="flex justify-between mt-4">
        <Skeleton className="h-5 w-[150px] justify-self-start" />
        <Skeleton className="h-5 w-[300px] justify-self-end" />
      </div>
    </main>
  );
}
