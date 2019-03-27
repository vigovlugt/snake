"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __importDefault(require("./game"));
var Snake = /** @class */ (function () {
    function Snake(id) {
        this.body = [];
        this.direction = { x: 0, y: 1 };
        this.id = id;
        this.color = "rgb(" + this.random() + "," + this.random() + "," + this.random() + ")";
        this.resetPosition();
    }
    Snake.prototype.random = function () {
        return Math.floor(Math.random() * 255);
    };
    Snake.prototype.update = function () {
        var eatenFruit = this.body[0].x == game_1.default.instance.fruit.x &&
            this.body[0].y == game_1.default.instance.fruit.y;
        if (eatenFruit)
            game_1.default.instance.spawnFruit();
        var head = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(head);
        if (!eatenFruit)
            this.body.pop();
        this.checkDead();
    };
    Snake.prototype.checkDead = function () {
        var _this = this;
        var selfCollide = this.body.some(function (bodyPart, i) {
            if (i === 0)
                return false;
            if (bodyPart.x == _this.body[0].x && bodyPart.y == _this.body[0].y)
                return true;
            return false;
        });
        var bodys = game_1.default.instance.snakes
            .filter(function (s) { return s.id !== _this.id; })
            .map(function (s) { return s.body; });
        var snakeCollide = bodys.length === 0
            ? false
            : bodys
                .reduce(function (a, b) { return a.concat(b); })
                .some(function (bodyPart, i) {
                if (bodyPart.x == _this.body[0].x && bodyPart.y == _this.body[0].y)
                    return true;
                return false;
            });
        if (selfCollide || snakeCollide) {
            this.die();
            return;
        }
        if (this.body[0].x < 0 ||
            this.body[0].y < 0 ||
            this.body[0].x >= game_1.default.instance.size ||
            this.body[0].y >= game_1.default.instance.size) {
            this.die();
            return;
        }
    };
    Snake.prototype.keyDown = function (key) {
        var directionByKey = {
            37: { x: -1, y: 0 },
            38: { x: 0, y: -1 },
            39: { x: 1, y: 0 },
            40: { x: 0, y: 1 }
        };
        if (key in directionByKey) {
            var newDir = directionByKey[key];
            if (this.body[1].x - this.body[0].x === newDir.x &&
                this.body[1].y - this.body[0].y === newDir.y)
                return;
            this.direction = newDir;
        }
    };
    Snake.prototype.resetPosition = function () {
        var x = Math.floor(Math.random() * game_1.default.instance.size);
        var y = Math.floor(Math.random() * game_1.default.instance.size - 4) + 4;
        this.body = [
            { x: x, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y - 2 },
            { x: x, y: y - 3 }
        ].reverse();
    };
    Snake.prototype.die = function () {
        this.resetPosition();
        this.direction = { x: 0, y: -1 };
    };
    return Snake;
}());
exports.default = Snake;
