export default function DiceDetails({
  params,
}: Readonly<{ params: { dicelistId: string } }>) {
  return <h1>Details about the {params.dicelistId} dice</h1>;
}
