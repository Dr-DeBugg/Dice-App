"use client";

import { useEffect, useState } from "react";
import DiceBox from "@3d-dice/dice-box";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../shadcn/button";
import { handleRollComplete } from "@/lib/handleRollComplete";
import { Spinner } from "../shadcn/spinner";
import { Box } from "@/lib/boxType";
import { rollGroup, rollSingle } from "@/lib/rollHelper";
import { Skeleton } from "../shadcn/skeleton";
import { Die } from "./columns";
import { useSwipeable } from "react-swipeable";

type ThrowDiceProps = {
  rows: Die[];
  addAnotherDie?: boolean;
  setLoading: (value: boolean) => void;
  loading: boolean;
};

export function ThrowDice(props: ThrowDiceProps) {
  const { rows, addAnotherDie, setLoading, loading } = props;
  const [diceBox, setDiceBox] = useState(null as null | Box);
  const [diceInScene, setDiceInScene] = useState(1);

  function addDieToScene() {
    if (addAnotherDie && diceBox) {
      diceBox.add([`1d${rows[0].sides}`], { newStartPoint: true, themeColor: rows[0].color });
      setDiceInScene(diceInScene + 1);
    }
  }

  useSwipeable({
    onSwiped: ({ dir, event }) => {
      event.stopPropagation();
      console.log("hmmm ", dir, event);

      if (dir === "Right") {
        addDieToScene();
      }
      if (dir === "Left") {
        handleReroll();
      }
    },
    onSwiping: ({ event }) => event.stopPropagation(),
  });

  useEffect(() => {
    addDieToScene();
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
    <div className="flex justify-center w-full">
      {loading && (
        <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}>
          <Spinner size="large" />
        </div>
      )}
      {loading ? (
        <Skeleton className="h-8 w-[50px]" />
      ) : (
        <Button variant="ghost" onClick={handleReroll}>
          <ReloadIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
