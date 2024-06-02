"use client";

import { useEffect, useRef, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { Die } from "./columns";
import { toast } from "../shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export function ThrowDice({ row }: { row: Die }) {
  const [diceBox, setDiceBox] = useState(null as any);

  useEffect(() => {
    const box = new DiceBox("#dice-box", {
      assetPath: "assets/",
      origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
      theme: "default",
      themeColor: "#feea03",
      friction: 1,
      restitution: 0.5,
      startingHeight: 10,
      throwForce: 10,
      spinForce: 15,
      offscreen: false,
      scale: 9,
    });

    box.init().then(() => {
      setDiceBox(box);
      rollDice(box);
    });
  }, []);

  const rollDice = (box: never) => {
    if (box) {
      box
        .roll([`1d${row.sides}`], {
          themeColor: row.color,
        })
        .then((results: { value: any }[]) => {
          toast({
            variant: "success",
            description: `You rolled ${results[0].value}`,
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
    <div>
      <button onClick={handleReRoll} style={{ marginTop: "20px" }}>
        Reroll Dice
      </button>
    </div>
  );
}
