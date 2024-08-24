import { Suspense } from "react";
import { getHistory } from "@/lib/api/historyRequests";
import HistoryTable from "./history-table";
import Loading from "./loading";

export default async function HistoryPage() {
  return (
    <div className="mb-4">
      <Suspense fallback={<Loading />}>
        <HistoryTableWrapper />
      </Suspense>
    </div>
  );
}

async function HistoryTableWrapper() {
  const resp = await getHistory();
  return (
    <main className="mb-4">
      <HistoryTable resp={resp} />
    </main>
  );
}
