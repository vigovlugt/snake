import IVector from "./IVector";
import ISnake from "./ISnake";
import IBodyPart from "./IBodyPart";
import Game from "./game";

export default class Snake implements ISnake {
  public id = "id";
  public body: IBodyPart[] = [];

  constructor(id: string) {
    this.id = id;
  }

  draw() {
    this.body.forEach((bodyPart, i) => {
      Game.instance.drawRect(
        bodyPart.x,
        bodyPart.y,
        i === 0 ? "rgb(0,0,255)" : "rgb(0,255,0)"
      );
    });
  }
}
