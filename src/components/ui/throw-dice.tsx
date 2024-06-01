"use client";

import { useState, useEffect } from "react";
import DiceBox from "@3d-dice/dice-box";

// interface NewDieDialogProps {
//   closeModal: () => void;
//   isModalOpen: boolean;
// }

export function ThrowDice() {
  const [diceBox, setDiceBox] = useState(null as any);

  // Colors for dice
  const colors = [
    "#348888",
    "#22BABB",
    "#9EF8EE",
    "#FA7F08",
    "#F24405",
    "#F25EB0",
    "#B9BF04",
    "#F2B705",
    "#F27405",
    "#F23005",
  ];

  // Function to get a random color
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    // Initialize DiceBox when the component mounts
    const box = new DiceBox("#dice-box", {
      assetPath: "assets/",
      origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
      theme: "default",
      themeColor: "#feea03",
      offscreen: true,
      scale: 9,
    });

    console.log("hmm");

    // box.init();

    box.init().then(() => {
      // You could set up additional setup here if needed
      setDiceBox(box);
      // Optionally roll some dice initially
      box.roll(["2d20"]);
    });
  }, []);

  // const handleRollClick = () => {
  //   if (diceBox) {
  //     diceBox.roll(["4d20"], {
  //       themeColor: getRandomColor(),
  //     });
  //   }
  // };
  return <></>;
  // return <button onClick={handleRollClick}>Roll Em!</button>;
}
