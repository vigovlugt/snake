import Snake from "./snake";
import Fruit from "./fruit";
import IVector from "./IVector";

export default class Game {
  public ctx: CanvasRenderingContext2D | null = null;
  public canvas: HTMLCanvasElement;
  public size: number;

  public snakes: Snake[] = [];
  public fruit: Fruit | null = null;

  public static instance: Game;

  constructor(canvas: HTMLCanvasElement, size: number) {
    this.canvas = canvas;
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.ctx = canvas.getContext("2d");
    this.size = size;

    Game.instance = this;
  }

  start() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 5);
    this.spawnSnake();
    this.spawnFruit();
  }

  spawnSnake() {
    this.snakes.push(new Snake("localhost"));
  }

  spawnFruit() {
    let positions = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        positions.push({ x, y });
      }
    }
    let unavailable = this.snakes
      .map(s => <IVector[]>s.body)
      .reduce((a, b) => [...a, ...b]);

    positions = positions.filter(
      p => !unavailable.some(u => u.x == p.x && u.y == p.y)
    );

    let position = positions[Math.floor(Math.random() * positions.length)];

    this.fruit = new Fruit(position.x, position.y);
  }

  update() {
    this.snakes.forEach(s => s.update());
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "rgb(55,55,55)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.fruit!.draw();
    this.snakes.forEach(s => s.draw());
  }

  drawRect(x: number, y: number, color: string) {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    let rectWidth = this.canvas.width / this.size;
    let rectHeight = this.canvas.height / this.size;
    this.ctx.fillRect(rectWidth * x, rectHeight * y, rectWidth, rectHeight);
  }

  end() {}
}
