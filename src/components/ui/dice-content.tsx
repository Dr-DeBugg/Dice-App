"use client";

import { useState } from "react";
import { Die } from "./dataTable/columns";
import { ThrowDice } from "./throw-dice";
import { useSwipeable } from "react-swipeable";

const config = {
  delta: 10,
  preventScrollOnSwipe: false,
  trackTouch: true,
  trackMouse: true,
  rotationAngle: 0,
  swipeDuration: Infinity,
  touchEventOptions: { passive: true },
};

type DiceContentProps = {
  rows: Die[];
  addAnotherDie?: boolean;
  setLoading: (value: boolean) => void;
  loading: boolean;
  triggerAddDie?: () => void;
};

export function DiceContent(props: DiceContentProps) {
  const { rows, addAnotherDie, setLoading, loading, triggerAddDie } = props;
  const [reroll, setReroll] = useState(false);

  const triggerReroll = () => {
    setReroll(true);

    setTimeout(() => {
      setReroll(false);
    }, 250);
  };

  const handlers = useSwipeable({
    onSwiped: ({ dir, event }) => {
      event.stopPropagation();

      if (dir === "Left") {
        triggerReroll();
      }
      if (dir === "Right" && triggerAddDie) {
        triggerAddDie();
      }
    },
    ...config,
    onSwiping: ({ event }) => event.stopPropagation(),
  });

  return (
    <>
      <div id="dice-box" className="responsive-dice-box">
        <div {...handlers} id="overlay-div" />
      </div>
      <ThrowDice
        rows={rows}
        setLoading={setLoading}
        loading={loading}
        reroll={reroll}
        addAnotherDie={addAnotherDie}
      />
    </>
  );
}
