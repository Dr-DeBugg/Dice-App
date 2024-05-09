import { getAllDices } from "@/lib/api/requests";
import { DataTable } from "../components/ui/data-table";
import { Die, columns } from "./columns";

export default async function Home() {
  const response = await getAllDices();
  const dices = (await response.json()).dices as Die[];

  return (
    <main>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={dices} />
      </div>
    </main>
  );
}
