import { toast } from "@/components/shadcn/use-toast";

function calculateRollResult(rollResult: any[]) {
  const initialAccumulator = { sum: 0, expression: "" };

  const result = rollResult.reduce(
    (
      accumulator: { sum: number; expression: string },
      currentValue: { value: number },
      index: number
    ) => {
      accumulator.sum += currentValue.value;

      index === 0
        ? (accumulator.expression = `${currentValue.value}`)
        : (accumulator.expression += ` + ${currentValue.value}`);

      return accumulator;
    },
    initialAccumulator
  );

  const { sum, expression } = result;

  //if expression is a number, only one die has been thrown
  if (!isNaN(expression)) {
    return { result: `Roll result = ${sum}`, desc: undefined };
  }
  return { result: `Roll result = ${sum}`, desc: expression };
}

export function handleRollComplete(rollResult: any[]) {
  const { result, desc } = calculateRollResult(rollResult);
  toast({
    title: `${result}`,
    description: desc ? desc : undefined,
  });
}
