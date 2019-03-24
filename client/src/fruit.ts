import IVector from "./IVector";
import Game from "./game";

export default class Fruit implements IVector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    Game.instance.drawRect(this.x, this.y, "rgb(255,0,0)");
  }

  remove() {
    Game.instance.spawnFruit();
  }
}
