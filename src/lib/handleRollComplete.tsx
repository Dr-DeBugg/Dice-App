import { toast } from "@/components/shadcn/use-toast";
import { addToHistory, HistoryData } from "./api/requests";

interface CalculatedResult {
  result: number;
  desc: string | undefined;
  diceInThrow: string;
  naturalCount: NaturalCountType;
}

export interface NaturalCountType {
  twenty: number;
  hundred: number;
}

function calculateRollResult(rollResult: any[]): CalculatedResult {
  const initialAccumulator = {
    sum: 0,
    individualResults: "",
    diceCounts: {} as { [key: number]: number },
    naturalCount: { twenty: 0, hundred: 0 },
  };

  const result = rollResult.reduce(
    (
      accumulator: {
        sum: number;
        individualResults: string;
        diceCounts: { [key: number]: number };
        naturalCount: NaturalCountType;
      },
      currentValue: { value: number; sides: number },
      index: number
    ) => {
      accumulator.sum += currentValue.value;

      if (currentValue.value === 20 && currentValue.sides === 20) {
        accumulator.naturalCount.twenty++;
      } else if (currentValue.value === 100 && currentValue.sides === 100) {
        accumulator.naturalCount.hundred++;
      }

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

  const { sum, individualResults, diceCounts, naturalCount } = result;

  const diceInThrow = Object.entries(diceCounts)
    .map(([sides, count]) => `${count}x D${sides}`)
    .join(", ");

  // If individualResults is a number, only one die has been thrown
  if (!isNaN(Number(individualResults))) {
    return { result: sum, desc: undefined, diceInThrow, naturalCount };
  }

  return { result: sum, desc: individualResults, diceInThrow, naturalCount };
}

export function handleRollComplete(rollResult: any[]) {
  const { result, desc, diceInThrow, naturalCount } = calculateRollResult(rollResult);

  toast({
    title: `Roll result = ${result}`,
    description: desc ? desc : undefined,
  });

  const history: HistoryData = {
    timestamp: new Date().toISOString(),
    dice_thrown: diceInThrow,
    result_sum: result,
    individual_results: desc ? desc : result.toString(),
  };
  addToHistory(history, naturalCount);
}
