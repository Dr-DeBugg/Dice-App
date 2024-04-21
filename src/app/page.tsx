import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/themeToggle";
import { GET } from "./dicesdata/route";

export default async function Home() {
  const response = await GET();
  const data = await response.json();

  return (
    <main>
      <h1> Dice App 🎲 </h1>
      <div className="p-8">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-3 gap-8">
        {data.dices
          ? data.dices.map((d: any) => (
              <Card key={d.id}>
                <CardHeader>
                  <div>
                    <CardTitle>Name of the die is {d.name}</CardTitle>
                    <CardDescription>gkdsgokk</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {d.name} has {d.sided} sides
                </CardContent>
                <CardFooter>this is the footer</CardFooter>
              </Card>
            ))
          : ""}
      </div>
    </main>
  );
}
