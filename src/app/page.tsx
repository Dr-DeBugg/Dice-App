import Dashboard from "@/components/ui/dashboard";
import { getAllDices } from "@/lib/api/requests";

export default async function Home() {
  const response = await getAllDices();
  const data = await response.json();

  return (
    <main>
      <h1 className="text-center"> 🎲 Dice App</h1>
      <Dashboard dices={data.dices} />
    </main>
  );
}
