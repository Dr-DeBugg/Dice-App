type DieResult = {
  value: number;
  notation: string;
};

type RollOptions = {
  themeColor: string;
  newStartPoint?: boolean;
};

export type Box = {
  roll(notation: string | string[], options?: RollOptions): Promise<DieResult[]>;
  add(notation: string | string[], options?: RollOptions): Promise<DieResult[]>;
  init(): Promise<Box>;
  onRollComplete: (rollResult: DieResult[]) => void;
};
