"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";
import { handleRollComplete } from "@/lib/handleRollComplete";
import { Spinner } from "../shadcn/spinner";
import { Row } from "@tanstack/react-table";

export type Box = {
  roll(dice: string[], options: { themeColor: string }): Promise<any[]>;
  add: ([], arg1: Object) => Promise<any[]>;
  init: () => Promise<Box>;
  onRollComplete: (rollResult: any[]) => void;
};

function createDiceArray(rows: Row<any>[]) {
  const transformedArray = rows.map((row) => ({
    sides: row.original.sides.toString(),
    color: row.original.color,
  }));

  return transformedArray;
}

export function ThrowManyDice<TData>({ rows }: { rows: Row<TData>[] }) {
  const [diceBox, setDiceBox] = useState(null as null | Box);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const box: Box = new DiceBox("#dice-box", {
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
      box.onRollComplete = handleRollComplete;
      setLoading(false);
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
    <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "relative" }}>
      {/* todo FIX THIS AND ADD SKELETON */}
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, calc(-50% - 230px))",
          }}
        >
          <Spinner size="large" />{" "}
        </div>
      ) : (
        ""
      )}
      <Button variant="ghost" onClick={handleReRoll}>
        <ReloadIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
