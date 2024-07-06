import { Box } from "./boxType";
import { Die } from "@/components/ui/columns";

export function createDiceArray(rows: Die[]) {
  const transformedArray = rows.map((row) => ({
    sides: row.sides.toString(),
    color: row.color,
  }));

  return transformedArray;
}

export function rollGroup(rows: Die[], box: Box) {
  const diceArray = createDiceArray(rows);

  diceArray.forEach((data) => {
    const { sides, color } = data;

    box.roll([`1d${sides}`], {
      themeColor: color,
    });
  });
}

export function rollSingle(diceInScene: number, box: Box, rows: Die[]) {
  Array.from({ length: diceInScene }).forEach(() => {
    box.roll([`1d${rows[0].sides}`], {
      themeColor: rows[0].color,
    });
  });
}
