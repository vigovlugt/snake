import socketIo from "socket.io";
import express from "express";
import http from "http";
import path from "path";
import Game from "./game";

const WORLD_SIZE = 32;

export default class Server {
  public server: http.Server;
  public app: express.Application;
  public io: socketIo.Server;

  public game: Game;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.io = socketIo(this.server);
    this.server.listen(3001, () => console.log("listening on 3001"));

    this.game = new Game(WORLD_SIZE);

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
    this.io.on("connection", socket => this.connection(socket));

    setInterval(() => {
      Game.instance.update();
      this.sync();
    }, 1000 / 7);
  }

  connection(socket: socketIo.Socket) {
    socket.on("disconnect", () => this.disconnect(socket));

    this.game.initPlayer(socket.id);
    //setup sync
    socket.on("directionUpdate", (key: number) =>
      this.directionUpdate(socket, key)
    );
  }

  disconnect(socket: socketIo.Socket) {
    this.game.removePlayer(socket.id);
  }

  sync() {
    this.io.emit("sync", this.game.getGameState());
  }

  directionUpdate(socket: socketIo.Socket, key: number) {
    this.game.snakes.find(snake => snake.id == socket.id)!.keyDown(key);
  }
}
