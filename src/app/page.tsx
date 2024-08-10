import { getAllDices } from "@/lib/api/requests";
import Dashboard from "@/components/ui/dashboard";
import { unstable_cache } from "next/cache";

const getInitialData = unstable_cache(async () => getAllDices(), ["dices"], { revalidate: 180 });

export default async function Home() {
  const resp = await getInitialData();

  return (
    <main>
      <Dashboard diceResp={resp} />
    </main>
  );
}
