"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { toast } from "../shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";

export function ThrowManyDice({ rows }: { rows: any }) {
  const [diceBox, setDiceBox] = useState(null as any);

  function createDiceArray(rows: any[]) {
    const countMap = {} as any;
  
    rows.forEach(row => {
      const sides: string = row.original.sides;
      if (countMap[sides]) {
        countMap[sides]++;
      } else {
        countMap[sides] = 1;
      }
    });
  
    const resultArray = Object.keys(countMap)
      .map(sides => `${countMap[sides]}d${sides}`);
  
    return resultArray;
  }
  

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
    });
  }, []);

  const rollDice = (box: any) => {
    const diceString = createDiceArray(rows);

    console.log("hmmm ", diceString)
    if (box) {
      box
        .roll(diceString)
        .then((results: { value: any }[]) => {
          toast({
            title: `Roll result: ${results[0].value}`,
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
