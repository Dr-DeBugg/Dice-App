import { getAllDices } from "@/lib/api/requests";
import Dashboard from "@/components/ui/dashboard";

export default async function Home() {
  const resp = await getAllDices();

  return (
    <main>
      <Dashboard resp={resp} />
    </main>
  );
}
