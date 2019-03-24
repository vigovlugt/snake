import IVector from "./IVector";
import ISnake from "./ISnake";
import IBodyPart from "./IBodyPart";
import Game from "./game";

export default class Snake implements ISnake {
  public direction: IVector = { x: 0, y: 1 };
  public id = "id";
  public body: IBodyPart[] = [];

  constructor(id: string) {
    this.id = id;

    document.addEventListener("keydown", e => this.keydown(e));
    this.body = [
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 },
      { x: 8, y: 11 }
    ];
    this.direction = { x: 0, y: -1 };
  }

  keydown(e: KeyboardEvent) {
    const directionByKey: { [key: number]: IVector } = {
      37: { x: -1, y: 0 },
      38: { x: 0, y: -1 },
      39: { x: 1, y: 0 },
      40: { x: 0, y: 1 }
    };
    if (e.keyCode in directionByKey) {
      const newDir = directionByKey[e.keyCode];

      if (
        newDir.y + this.direction.y === 0 ||
        newDir.x + this.direction.x === 0
      )
        return;
      this.direction = newDir;
    }
  }

  update() {
    const eatenFruit =
      this.body[0].x == Game.instance.fruit!.x &&
      this.body[0].y == Game.instance.fruit!.y;

    if (eatenFruit) Game.instance.fruit!.remove();

    const head = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y
    };
    this.body.unshift(head);
    if (!eatenFruit) this.body.pop();
    this.checkDead();
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
