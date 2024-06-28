"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { toast } from "../shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";

type DiceRows = {
  original: {
    sides: number;
    color: string;
  };
};

export type Box = {
  roll: ([], arg1: Object) => null
}

function createDiceArray(rows: DiceRows[]) {
  const transformedArray = rows.map((row) => ({
    sides: row.original.sides.toString(),
    color: row.original.color,
  }));

  return transformedArray;
}

function calculateRollResult(rollResult: []) {
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
  return `${expression} = ${sum}`;
}

export function ThrowManyDice({ rows }: { rows: DiceRows[] }) {
  const [diceBox, setDiceBox] = useState(null);

  useEffect(() => {
    const box = new DiceBox("#dice-box", {
      assetPath: "assets/",
      origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
      theme: "default",
      gravity: 0.85,
      friction: 0.4,
      restitution: 0.5,
      startingHeight: 15,
      throwForce: 12,
      spinForce: 15,
      offscreen: false,
      scale: 9,
    });

    box.init().then(() => {
      setDiceBox(box);
      rollDice(box);
      box.onRollComplete = (rollResult: []) => {
        const resultString = calculateRollResult(rollResult);

        toast({
          title: `${resultString}`,
        });
      };
    });
  }, []);

  const rollDice = (box: Box) => {
    const diceArray = createDiceArray(rows);

    if (box) {
      diceArray.forEach((data) => {
        const { sides, color } = data;

        box.roll([`1d${sides}`], {
          themeColor: color,
        });
      });
    }
  };

  const handleReRoll = () => {
    if (diceBox) {
      rollDice(diceBox);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button variant="ghost" onClick={handleReRoll}>
        <ReloadIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
