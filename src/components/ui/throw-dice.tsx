"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { Die } from "./columns";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";
import { Box } from "./throw-many-dice";
import { handleRollComplete } from "@/lib/handleRollComplete";

export function ThrowDice({ row, addAnotherDie }: { row: Die; addAnotherDie: boolean }) {
  const [diceBox, setDiceBox] = useState(null as null | Box);
  const [diceInScene, setDiceInScene] = useState(1);

  useEffect(() => {
    if (addAnotherDie && diceBox) {
      setDiceInScene(diceInScene + 1);
      diceBox.add([`1d${row.sides}`], { newStartPoint: true, themeColor: row.color });
    }
  }, [addAnotherDie]);

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
      rollDice(box, 1);
    });
  }, []);

  const rollDice = (box: Box, amount: number) => {
    if (box) {
      Array.from({ length: amount }).forEach(() => {
        box.roll([`1d${row.sides}`], {
          themeColor: row.color,
        });
      });

      box.onRollComplete = handleRollComplete;
    }
  };

  const handleReRoll = () => {
    if (diceBox) {
      rollDice(diceBox, diceInScene);
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
