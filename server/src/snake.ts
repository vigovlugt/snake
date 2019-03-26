import ISnake from "./ISnake";
import IBodyPart from "./IBodyPart";
import IVector from "./IVector";
import Game from "./game";

export default class Snake implements ISnake {
  public id: string;
  public body: IBodyPart[] = [];
  public direction: IVector = { x: 0, y: 1 };
  public color: string;

  constructor(id: string) {
    this.id = id;
    this.color = `rgb(${this.random()},${this.random()},${this.random()})`;
    this.resetPosition();
  }

  random() {
    return Math.floor(Math.random() * 255);
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
      if (bodyPart.x == this.body[0].x && bodyPart.y == this.body[0].y)
        return true;
      return false;
    });
    const bodys = Game.instance.snakes
      .filter(s => s.id !== this.id)
      .map(s => s.body);

    const snakeCollide =
      bodys.length === 0
        ? false
        : bodys
            .reduce((a, b) => [...a, ...b])
            .some((bodyPart, i) => {
              if (bodyPart.x == this.body[0].x && bodyPart.y == this.body[0].y)
                return true;
              return false;
            });

    if (selfCollide || snakeCollide) {
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

  keyDown(key: number) {
    const directionByKey: { [key: number]: IVector } = {
      37: { x: -1, y: 0 },
      38: { x: 0, y: -1 },
      39: { x: 1, y: 0 },
      40: { x: 0, y: 1 }
    };
    if (key in directionByKey) {
      const newDir = directionByKey[key];
      if (
        this.body[1].x - this.body[0].x === newDir.x &&
        this.body[1].y - this.body[0].y === newDir.y
      )
        return;
      this.direction = newDir;
    }
  }

  resetPosition() {
    const x = Math.floor(Math.random() * Game.instance.size);
    const y = Math.floor(Math.random() * Game.instance.size - 4) + 4;

    this.body = [
      { x, y },
      { x, y: y - 1 },
      { x, y: y - 2 },
      { x, y: y - 3 }
    ].reverse();
  }

  die() {
    this.resetPosition();
    this.direction = { x: 0, y: -1 };
  }
}
