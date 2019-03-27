"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = __importDefault(require("./snake"));
var Game = /** @class */ (function () {
    function Game(size) {
        this.snakes = [];
        this.fruit = null;
        this.size = size;
        Game.instance = this;
        this.spawnFruit();
    }
    Game.prototype.update = function () {
        this.snakes.forEach(function (snake) {
            snake.update();
        });
    };
    Game.prototype.initPlayer = function (id) {
        var newSnake = new snake_1.default(id);
        this.snakes.push(newSnake);
    };
    Game.prototype.removePlayer = function (id) {
        this.snakes = this.snakes.filter(function (snake) { return snake.id != id; });
    };
    Game.prototype.spawnFruit = function () {
        var positions = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                positions.push({ x: x, y: y });
            }
        }
        var unavailable = [];
        if (this.snakes.length !== 0) {
            unavailable = this.snakes
                .map(function (s) { return s.body; })
                .reduce(function (a, b) { return a.concat(b); });
        }
        positions = positions.filter(function (p) { return !unavailable.some(function (u) { return u.x == p.x && u.y == p.y; }); });
        var position = positions[Math.floor(Math.random() * positions.length)];
        this.fruit = position;
    };
    Game.prototype.getGameState = function () {
        return {
            snakes: this.snakes.map(function (s) { return s; }),
            fruit: this.fruit
        };
    };
    return Game;
}());
exports.default = Game;
