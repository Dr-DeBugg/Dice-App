import { getAllDices } from "@/lib/api/diceRequests";
import Dashboard from "@/components/ui/dashboard";
import { unstable_cache } from "next/cache";
import Loading from "./loading";
import { Suspense } from "react";

export default async function HistoryPage() {
  return (
    <div className="mb-4">
      <Suspense fallback={<Loading />}>
        <DashboardWrapper />
      </Suspense>
    </div>
  );
}

const getInitialData = unstable_cache(async () => getAllDices(), ["dices"], { revalidate: 180 });

async function DashboardWrapper() {
  const resp = await getInitialData();

  return (
    <main className="mb-4">
      <Dashboard diceResp={resp} />
    </main>
  );
}
