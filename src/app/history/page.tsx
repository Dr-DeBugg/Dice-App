import { getHistory } from "@/lib/api/historyRequests";
import HistoryTable from "./history-table";

export default async function HistoryPage() {
  const resp = await getHistory();
  return (
    <div className="mb-4">
      <HistoryTable resp={resp} />
    </div>
  );
}
