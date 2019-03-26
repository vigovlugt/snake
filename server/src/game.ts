import ISnake from "./ISnake";
import IFruit from "./IFruit";
import IVector from "./IVector";
import IGameState from "./IGameState";
import Snake from "./snake";

export default class Game {
  public snakes: Snake[] = [];
  public fruit: IFruit | null = null;

  public size: number;

  public static instance: Game;

  constructor(size: number) {
    this.size = size;
    Game.instance = this;
    this.spawnFruit();
  }

  update() {
    this.snakes.forEach(snake => {
      snake.update();
    });
  }

  initPlayer(id: string) {
    const newSnake = new Snake(id);
    this.snakes.push(newSnake);
  }

  removePlayer(id: string) {
    this.snakes = this.snakes.filter(snake => snake.id != id);
  }

  spawnFruit() {
    let positions = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        positions.push({ x, y });
      }
    }
    let unavailable: IVector[] = [];
    if (this.snakes.length !== 0) {
      unavailable = this.snakes
        .map(s => <IVector[]>s.body)
        .reduce((a, b) => [...a, ...b]);
    }

    positions = positions.filter(
      p => !unavailable.some(u => u.x == p.x && u.y == p.y)
    );

    let position = positions[Math.floor(Math.random() * positions.length)];
    this.fruit = position;
  }

  getGameState(): IGameState {
    return {
      snakes: this.snakes.map(s => <ISnake>s),
      fruit: <IFruit>this.fruit
    };
  }
}
