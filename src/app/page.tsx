import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <main>
      <h1> 🎲 Hello world! ⚀ ⚁ ⚂ ⚃ ⚄ ⚅</h1>
      <div className="grid grid-cols-3 gap-8">
        {arr.map((i) => (
          <Card key={i}>
            <CardHeader>
              <div>
                <CardTitle>Title for item {i}</CardTitle>
                <CardDescription>gkdsgokk</CardDescription>
              </div>
            </CardHeader>
            <CardContent>{i * i}</CardContent>
            <CardFooter>this is the footer</CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
