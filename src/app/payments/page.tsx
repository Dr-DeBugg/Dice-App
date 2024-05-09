import { getAllDices } from "@/lib/api/requests";
import { Die, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Die[]> {
  const response = await getAllDices();
  const dices = (await response.json()).dices as Die[];
  return dices;
}

export default async function DemoPage() {
  const dices = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dices} />
    </div>
  );
}
