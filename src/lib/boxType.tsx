export type Box = {
  roll(dice: string[], options: { themeColor: string }): Promise<any[]>;
  add: ([], arg1: Object) => Promise<any[]>;
  init: () => Promise<Box>;
  onRollComplete: (rollResult: any[]) => void;
};
