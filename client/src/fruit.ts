import IVector from "./IVector";
import Game from "./game";

export default class Fruit implements IVector {
  public x: number = -1;
  public y: number = -1;

  draw() {
    if (this.x !== -1 && this.y !== -1)
      Game.instance.drawRect(this.x, this.y, "rgb(255,0,0)");
  }
}
