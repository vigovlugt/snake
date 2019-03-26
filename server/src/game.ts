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
  }

  update() {
    this.snakes.forEach(snake => {
      snake.update();
    });
  }

  initPlayer(id: string) {
    const x = Math.floor(Math.random() * this.size);
    const y = Math.floor(Math.random() * this.size - 4) + 4;

    const newSnake: ISnake = {
      id: id,
      body: [{ x, y }, { x, y: y - 1 }, { x, y: y - 2 }, { x, y: y - 3 }]
    };

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
    let unavailable = this.snakes
      .map(s => <IVector[]>s.body)
      .reduce((a, b) => [...a, ...b]);

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
