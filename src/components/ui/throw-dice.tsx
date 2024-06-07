"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { Die } from "./columns";
import { toast } from "../shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";

export function ThrowDice({ row }: { row: Die }) {
  const [diceBox, setDiceBox] = useState(null as any);

  useEffect(() => {
    const box = new DiceBox("#dice-box", {
      assetPath: "assets/",
      origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
      theme: "default",
      gravity: 0.85,
      friction: 0.4,
      restitution: 0.5,
      startingHeight: 10,
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
    if (box) {
      box
        .roll([`1d${row.sides}`], {
          themeColor: row.color,
        })
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
