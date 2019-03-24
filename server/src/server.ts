import socketIo from "socket.io";
import express from "express";
import http from "http";
import path from "path";
import ISnake from "./ISnake";
import IFruit from "./IFruit";
import IVector from "./IVector";

const WORLD_SIZE = 32;

export default class Server {
  public server: http.Server;
  public app: express.Application;
  public io: socketIo.Server;

  public snakes: ISnake[] = [];
  public fruit: IFruit | null = null;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.io = socketIo(this.server);
    this.server.listen(80, () => console.log("listening on 80"));

    // setup express
    this.app.use(
      express.static(path.resolve(__dirname, "..", "..", "client", "dist"))
    );

    this.app.get("/", (req, res) => {
      res.sendfile(
        path.resolve(__dirname, "..", "..", "client", "dist", "index.html")
      );
    });

    // setup socket.io
    this.io.on("connection", this.connection);
  }

  localUpdate() {
    this.snakes.forEach(snake => {
      if (this.fruit) {
        if (
          snake.body[0].x === this.fruit.x &&
          snake.body[0].y === this.fruit.y
        ) {
          this.io.sockets.sockets[snake.id].emit("grow");
          this.spawnFruit();
        }
      }
    });
  }

  connection(socket: socketIo.Socket) {
    socket.on("disconnect", () => this.disconnect(socket));

    //setup sync
    socket.on("positionUpdate", this.positionUpdate);
  }

  disconnect(socket: socketIo.Socket) {
    this.snakes = this.snakes.filter(snake => snake.id != socket.id);
  }

  initPlayer(socket: socketIo.Socket) {
    const x = Math.floor(Math.random() * WORLD_SIZE);
    const y = Math.floor(Math.random() * WORLD_SIZE - 4) + 4;

    const newSnake: ISnake = {
      id: socket.id,
      body: [{ x, y }, { x, y: y - 1 }, { x, y: y - 2 }, { x, y: y - 3 }]
    };

    this.snakes.push(newSnake);
  }

  spawnFruit() {
    let positions = [];
    for (let x = 0; x < WORLD_SIZE; x++) {
      for (let y = 0; y < WORLD_SIZE; y++) {
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

  sync() {
    this.io.emit("sync", { snakes: this.snakes, fruit: this.fruit });
  }

  positionUpdate(socket: socketIo.Socket) {}
}
