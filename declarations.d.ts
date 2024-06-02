declare module "@3d-dice/dice-box" {
  interface DiceBoxOptions {
    assetPath: string;
    origin: string;
    theme: string;
    themeColor: string;
    friction: number;
    restitution: number;
    startingHeight: number;
    throwForce: number;
    spinForce: number;
    offscreen: boolean;
    scale: number;
  }

  class DiceBox {
    constructor(selector: string, options: DiceBoxOptions);
    init(): Promise<void>;
    roll(dice: string[], options?: object): Promise<any>;
    destroy(): void;
  }

  export default DiceBox;
}
