import { getHistory } from "@/lib/api/requests";
import HistoryTable from "./history-table";

export default async function HistoryPage() {
  const resp = await getHistory();
  return <HistoryTable resp={resp} />;
}
