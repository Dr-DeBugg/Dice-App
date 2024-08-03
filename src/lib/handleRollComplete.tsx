import { toast } from "@/components/shadcn/use-toast";
import { addToHistory, HistoryData } from "./api/requests";

interface CalculatedResult {
  result: number;
  desc: string | undefined;
  diceInThrow: string;
}

function calculateRollResult(rollResult: any[]):  CalculatedResult  {
  const initialAccumulator = { sum: 0, individualResults: "", diceCounts: {} as { [key: number]: number } };

  const result = rollResult.reduce(
    (
      accumulator: { sum: number; individualResults: string; diceCounts: { [key: number]: number } },
      currentValue: { value: number, sides: number },
      index: number
    ) => {
      accumulator.sum += currentValue.value;

      index === 0
        ? (accumulator.individualResults = `${currentValue.value}`)
        : (accumulator.individualResults += ` + ${currentValue.value}`);

      if (accumulator.diceCounts[currentValue.sides]) {
        accumulator.diceCounts[currentValue.sides]++;
      } else {
        accumulator.diceCounts[currentValue.sides] = 1;
      }

      return accumulator;
    },
    initialAccumulator
  );

  const { sum, individualResults, diceCounts } = result;

  const diceInThrow = Object.entries(diceCounts)
    .map(([sides, count]) => `${count}x D${sides}`)
    .join(", ");

  // If individualResults is a number, only one die has been thrown
  if (!isNaN(Number(individualResults))) {
    return { result: sum, desc: undefined, diceInThrow };
  }

  return { result: sum, desc: individualResults, diceInThrow };
}

export function handleRollComplete(rollResult: any[]) {
  const { result, desc, diceInThrow } = calculateRollResult(rollResult);

  toast({
    title: `Roll result = ${result}`,
    description: desc ? desc : undefined,
  });

  const history: HistoryData = {
    timestamp: new Date().toISOString(),
    dice_thrown: diceInThrow,
    result_sum: result, 
    individual_results: desc ? desc : result.toString(),
  }
  addToHistory(history);
}
