import IGameState from "./IGameState";
import IFruit from "./IFruit";
import ISnake from "./ISnake";
import Socket from "./socket";

export default class Game {
  public ctx: CanvasRenderingContext2D | null = null;
  public canvas: HTMLCanvasElement;
  public size: number;

  public snakes: ISnake[] = [];
  public fruit: IFruit = { x: -1, y: -1 };

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
    Socket.instance.socket.on("sync", (gameState: IGameState) =>
      this.sync(gameState)
    );
    document.addEventListener("keydown", e => {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        Socket.instance.socket.emit("directionUpdate", e.keyCode);
      }
    });
  }

  sync(gameState: IGameState) {
    this.snakes = gameState.snakes;
    this.fruit = gameState.fruit;
    this.draw();
  }

  draw() {
    this.drawBackground();
    this.drawFruit();
    this.drawSnakes();
  }

  drawBackground() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "rgb(55,55,55)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnakes() {
    this.snakes.forEach(s => {
      s.body.forEach((bodyPart, i) => {
        this.drawRect(
          bodyPart.x,
          bodyPart.y,
          i === 0 ? s.color : "rgb(0,255,0)"
        );
      });
    });
  }

  drawFruit() {
    if (this.fruit.x !== -1 && this.fruit.y !== -1)
      Game.instance.drawRect(this.fruit.x, this.fruit.y, "#F14C4C");
  }

  drawRect(x: number, y: number, color: string) {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    let rectWidth = this.canvas.width / this.size;
    let rectHeight = this.canvas.height / this.size;
    this.ctx.fillRect(rectWidth * x, rectHeight * y, rectWidth, rectHeight);
  }
}
