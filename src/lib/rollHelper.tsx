import { Row } from "@tanstack/react-table";
import { Box } from "./boxType";

export function createDiceArray(rows: Row<any>[]) {
  const transformedArray = rows.map((row) => ({
    sides: row.original.sides.toString(),
    color: row.original.color,
  }));

  return transformedArray;
}

export function rollGroup(rows: any, box: Box) {
  const diceArray = createDiceArray(rows);

  diceArray.forEach((data) => {
    const { sides, color } = data;

    box.roll([`1d${sides}`], {
      themeColor: color,
    });
  });
}

export function rollSingle(diceInScene: number, box: Box, rows: any) {
  Array.from({ length: diceInScene }).forEach(() => {
    box.roll([`1d${rows[0].sides}`], {
      themeColor: rows[0].color,
    });
  });
}
