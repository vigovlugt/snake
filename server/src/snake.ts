import ISnake from "./ISnake";
import IBodyPart from "./IBodyPart";
import IVector from "./IVector";
import Game from "./game";

export default class Snake implements ISnake {
  public id: string;
  public body: IBodyPart[] = [];
  public direction: IVector = { x: 0, y: 1 };

  constructor(id: string) {
    this.id = id;
  }

  update() {
    const eatenFruit =
      this.body[0].x == Game.instance.fruit!.x &&
      this.body[0].y == Game.instance.fruit!.y;

    if (eatenFruit) Game.instance.spawnFruit();

    const head = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y
    };
    this.body.unshift(head);
    if (!eatenFruit) this.body.pop();
    this.checkDead();
  }

  checkDead() {
    const selfCollide = this.body.some((bodyPart, i) => {
      if (i === 0) return false;
      if (bodyPart.x == this.body[0].x && bodyPart.y == this.body[0].y) {
        return true;
      }

      return false;
    });
    if (selfCollide) {
      this.die();
      return;
    }
    if (
      this.body[0].x < 0 ||
      this.body[0].y < 0 ||
      this.body[0].x >= Game.instance.size ||
      this.body[0].y >= Game.instance.size
    ) {
      this.die();
      return;
    }
  }

  die() {
    this.body = [
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 },
      { x: 8, y: 11 }
    ];
    this.direction = { x: 0, y: -1 };
  }
}
