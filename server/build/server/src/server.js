"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var game_1 = __importDefault(require("./game"));
var WORLD_SIZE = 32;
var port = process.env.PORT || 3001;
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.app = express_1.default();
        this.server = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.server);
        this.server.listen(port, function () { return console.log("listening on " + port); });
        this.game = new game_1.default(WORLD_SIZE);
        // setup express
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "..", "client", "dist")));
        this.app.get("/", function (req, res) {
            res.sendfile(path_1.default.resolve(__dirname, "..", "..", "client", "dist", "index.html"));
        });
        // setup socket.io
        this.io.on("connection", function (socket) { return _this.connection(socket); });
        setInterval(function () {
            game_1.default.instance.update();
            _this.sync();
        }, 1000 / 7);
    }
    Server.prototype.connection = function (socket) {
        var _this = this;
        socket.on("disconnect", function () { return _this.disconnect(socket); });
        this.game.initPlayer(socket.id);
        //setup sync
        socket.on("directionUpdate", function (key) {
            return _this.directionUpdate(socket, key);
        });
    };
    Server.prototype.disconnect = function (socket) {
        this.game.removePlayer(socket.id);
    };
    Server.prototype.sync = function () {
        this.io.emit("sync", this.game.getGameState());
    };
    Server.prototype.directionUpdate = function (socket, key) {
        this.game.snakes.find(function (snake) { return snake.id == socket.id; }).keyDown(key);
    };
    return Server;
}());
exports.default = Server;
