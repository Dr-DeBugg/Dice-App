"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";
import { handleRollComplete } from "@/lib/handleRollComplete";
import { Spinner } from "../shadcn/spinner";
import { Box } from "@/lib/boxType";
import { rollGroup, rollSingle } from "@/lib/rollHelper";

export function ThrowDice<TData>({ rows, addAnotherDie }: { rows: any; addAnotherDie?: boolean }) {
  const [diceBox, setDiceBox] = useState(null as null | Box);
  const [loading, setLoading] = useState(true);
  const [diceInScene, setDiceInScene] = useState(1);

  useEffect(() => {
    if (addAnotherDie && diceBox) {
      diceBox.add([`1d${rows[0].sides}`], { newStartPoint: true, themeColor: rows[0].color });
      setDiceInScene(diceInScene + 1);
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
      setLoading(false);
      rollDice(box);
      box.onRollComplete = handleRollComplete;
    });
  }, []);

  const rollDice = (box: Box) => {
    if (box) {
      if (rows.length === 1) {
        rollSingle(diceInScene, box, rows);
      } else {
        rollGroup(rows, box);
      }
    }
  };

  const handleReroll = () => {
    if (diceBox) {
      rollDice(diceBox);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {/* todo FIX THIS AND ADD SKELETON */}
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, calc(-50%))",
          }}
        >
          <Spinner size="large" />
        </div>
      ) : null}
      <Button variant="ghost" onClick={handleReroll}>
        <ReloadIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
