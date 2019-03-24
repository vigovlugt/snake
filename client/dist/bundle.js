/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fruit.ts":
/*!**********************!*\
  !*** ./src/fruit.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __importDefault(__webpack_require__(/*! ./game */ "./src/game.ts"));
var Fruit = /** @class */ (function () {
    function Fruit(x, y) {
        this.x = x;
        this.y = y;
    }
    Fruit.prototype.draw = function () {
        game_1.default.instance.drawRect(this.x, this.y, "rgb(255,0,0)");
    };
    Fruit.prototype.remove = function () {
        game_1.default.instance.spawnFruit();
    };
    return Fruit;
}());
exports.default = Fruit;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = __importDefault(__webpack_require__(/*! ./snake */ "./src/snake.ts"));
var fruit_1 = __importDefault(__webpack_require__(/*! ./fruit */ "./src/fruit.ts"));
var Game = /** @class */ (function () {
    function Game(canvas, size) {
        this.ctx = null;
        this.snakes = [];
        this.fruit = null;
        this.canvas = canvas;
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.ctx = canvas.getContext("2d");
        this.size = size;
        Game.instance = this;
    }
    Game.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
            _this.draw();
        }, 1000 / 5);
        this.spawnSnake();
        this.spawnFruit();
    };
    Game.prototype.spawnSnake = function () {
        this.snakes.push(new snake_1.default("localhost"));
    };
    Game.prototype.spawnFruit = function () {
        var positions = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                positions.push({ x: x, y: y });
            }
        }
        var unavailable = this.snakes
            .map(function (s) { return s.body; })
            .reduce(function (a, b) { return a.concat(b); });
        positions = positions.filter(function (p) { return !unavailable.some(function (u) { return u.x == p.x && u.y == p.y; }); });
        var position = positions[Math.floor(Math.random() * positions.length)];
        this.fruit = new fruit_1.default(position.x, position.y);
    };
    Game.prototype.update = function () {
        this.snakes.forEach(function (s) { return s.update(); });
    };
    Game.prototype.draw = function () {
        if (!this.ctx)
            return;
        this.ctx.fillStyle = "rgb(55,55,55)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.fruit.draw();
        this.snakes.forEach(function (s) { return s.draw(); });
    };
    Game.prototype.drawRect = function (x, y, color) {
        if (!this.ctx)
            return;
        this.ctx.fillStyle = color;
        var rectWidth = this.canvas.width / this.size;
        var rectHeight = this.canvas.height / this.size;
        this.ctx.fillRect(rectWidth * x, rectHeight * y, rectWidth, rectHeight);
    };
    Game.prototype.end = function () { };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __importDefault(__webpack_require__(/*! ./game */ "./src/game.ts"));
window.onload = function () {
    var canvas = document.querySelector("#canvas");
    var game = new game_1.default(canvas, 32);
    game.start();
};


/***/ }),

/***/ "./src/snake.ts":
/*!**********************!*\
  !*** ./src/snake.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __importDefault(__webpack_require__(/*! ./game */ "./src/game.ts"));
var Snake = /** @class */ (function () {
    function Snake(id) {
        var _this = this;
        this.direction = { x: 0, y: 1 };
        this.id = "id";
        this.body = [];
        this.id = id;
        document.addEventListener("keydown", function (e) { return _this.keydown(e); });
        this.body = [
            { x: 8, y: 8 },
            { x: 8, y: 9 },
            { x: 8, y: 10 },
            { x: 8, y: 11 }
        ];
        this.direction = { x: 0, y: -1 };
    }
    Snake.prototype.keydown = function (e) {
        var directionByKey = {
            37: { x: -1, y: 0 },
            38: { x: 0, y: -1 },
            39: { x: 1, y: 0 },
            40: { x: 0, y: 1 }
        };
        if (e.keyCode in directionByKey) {
            var newDir = directionByKey[e.keyCode];
            if (newDir.y + this.direction.y === 0 ||
                newDir.x + this.direction.x === 0)
                return;
            this.direction = newDir;
        }
    };
    Snake.prototype.update = function () {
        var eatenFruit = this.body[0].x == game_1.default.instance.fruit.x &&
            this.body[0].y == game_1.default.instance.fruit.y;
        if (eatenFruit)
            game_1.default.instance.fruit.remove();
        var head = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(head);
        if (!eatenFruit)
            this.body.pop();
        this.checkDead();
    };
    Snake.prototype.draw = function () {
        this.body.forEach(function (bodyPart, i) {
            game_1.default.instance.drawRect(bodyPart.x, bodyPart.y, i === 0 ? "rgb(0,0,255)" : "rgb(0,255,0)");
        });
    };
    Snake.prototype.checkDead = function () {
        var _this = this;
        var selfCollide = this.body.some(function (bodyPart, i) {
            if (i === 0)
                return false;
            if (bodyPart.x == _this.body[0].x && bodyPart.y == _this.body[0].y) {
                return true;
            }
            return false;
        });
        if (selfCollide) {
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
    Snake.prototype.die = function () {
        this.body = [
            { x: 8, y: 8 },
            { x: 8, y: 9 },
            { x: 8, y: 10 },
            { x: 8, y: 11 }
        ];
        this.direction = { x: 0, y: -1 };
    };
    return Snake;
}());
exports.default = Snake;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZydWl0LnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc25ha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLGlGQUEwQjtBQUUxQjtJQUlFLGVBQVksQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxvQkFBSSxHQUFKO1FBQ0UsY0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFF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LENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNwQztZQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCxtQkFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZCxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNmLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgSVZlY3RvciBmcm9tIFwiLi9JVmVjdG9yXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0IGltcGxlbWVudHMgSVZlY3RvciB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgR2FtZS5pbnN0YW5jZS5kcmF3UmVjdCh0aGlzLngsIHRoaXMueSwgXCJyZ2IoMjU1LDAsMClcIik7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICBHYW1lLmluc3RhbmNlLnNwYXduRnJ1aXQoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFNuYWtlIGZyb20gXCIuL3NuYWtlXCI7XHJcbmltcG9ydCBGcnVpdCBmcm9tIFwiLi9mcnVpdFwiO1xyXG5pbXBvcnQgSVZlY3RvciBmcm9tIFwiLi9JVmVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBwdWJsaWMgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgc25ha2VzOiBTbmFrZVtdID0gW107XHJcbiAgcHVibGljIGZydWl0OiBGcnVpdCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBHYW1lO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBzaXplOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSA1MTI7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA1MTI7XHJcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG5cclxuICAgIEdhbWUuaW5zdGFuY2UgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfSwgMTAwMCAvIDUpO1xyXG4gICAgdGhpcy5zcGF3blNuYWtlKCk7XHJcbiAgICB0aGlzLnNwYXduRnJ1aXQoKTtcclxuICB9XHJcblxyXG4gIHNwYXduU25ha2UoKSB7XHJcbiAgICB0aGlzLnNuYWtlcy5wdXNoKG5ldyBTbmFrZShcImxvY2FsaG9zdFwiKSk7XHJcbiAgfVxyXG5cclxuICBzcGF3bkZydWl0KCkge1xyXG4gICAgbGV0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnNpemU7IHgrKykge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2l6ZTsgeSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zLnB1c2goeyB4LCB5IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgdW5hdmFpbGFibGUgPSB0aGlzLnNuYWtlc1xyXG4gICAgICAubWFwKHMgPT4gPElWZWN0b3JbXT5zLmJvZHkpXHJcbiAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IFsuLi5hLCAuLi5iXSk7XHJcblxyXG4gICAgcG9zaXRpb25zID0gcG9zaXRpb25zLmZpbHRlcihcclxuICAgICAgcCA9PiAhdW5hdmFpbGFibGUuc29tZSh1ID0+IHUueCA9PSBwLnggJiYgdS55ID09IHAueSlcclxuICAgICk7XHJcblxyXG4gICAgbGV0IHBvc2l0aW9uID0gcG9zaXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc2l0aW9ucy5sZW5ndGgpXTtcclxuXHJcbiAgICB0aGlzLmZydWl0ID0gbmV3IEZydWl0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5zbmFrZXMuZm9yRWFjaChzID0+IHMudXBkYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIGlmICghdGhpcy5jdHgpIHJldHVybjtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmdiKDU1LDU1LDU1KVwiO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5mcnVpdCEuZHJhdygpO1xyXG4gICAgdGhpcy5zbmFrZXMuZm9yRWFjaChzID0+IHMuZHJhdygpKTtcclxuICB9XHJcblxyXG4gIGRyYXdSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuY3R4KSByZXR1cm47XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGxldCByZWN0V2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuc2l6ZTtcclxuICAgIGxldCByZWN0SGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5zaXplO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QocmVjdFdpZHRoICogeCwgcmVjdEhlaWdodCAqIHksIHJlY3RXaWR0aCwgcmVjdEhlaWdodCk7XHJcbiAgfVxyXG5cclxuICBlbmQoKSB7fVxyXG59XHJcbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWVcIjtcclxuaW1wb3J0IFNuYWtlIGZyb20gXCIuL3NuYWtlXCI7XHJcbmltcG9ydCBJU25ha2UgZnJvbSBcIi4vSVNuYWtlXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTENhbnZhc0VsZW1lbnQ+KFwiI2NhbnZhc1wiKSE7XHJcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhcywgMzIpO1xyXG5cclxuICBnYW1lLnN0YXJ0KCk7XHJcbn07XHJcbiIsImltcG9ydCBJVmVjdG9yIGZyb20gXCIuL0lWZWN0b3JcIjtcclxuaW1wb3J0IElTbmFrZSBmcm9tIFwiLi9JU25ha2VcIjtcclxuaW1wb3J0IElCb2R5UGFydCBmcm9tIFwiLi9JQm9keVBhcnRcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2UgaW1wbGVtZW50cyBJU25ha2Uge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb246IElWZWN0b3IgPSB7IHg6IDAsIHk6IDEgfTtcclxuICBwdWJsaWMgaWQgPSBcImlkXCI7XHJcbiAgcHVibGljIGJvZHk6IElCb2R5UGFydFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHRoaXMua2V5ZG93bihlKSk7XHJcbiAgICB0aGlzLmJvZHkgPSBbXHJcbiAgICAgIHsgeDogOCwgeTogOCB9LFxyXG4gICAgICB7IHg6IDgsIHk6IDkgfSxcclxuICAgICAgeyB4OiA4LCB5OiAxMCB9LFxyXG4gICAgICB7IHg6IDgsIHk6IDExIH1cclxuICAgIF07XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHsgeDogMCwgeTogLTEgfTtcclxuICB9XHJcblxyXG4gIGtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3QgZGlyZWN0aW9uQnlLZXk6IHsgW2tleTogbnVtYmVyXTogSVZlY3RvciB9ID0ge1xyXG4gICAgICAzNzogeyB4OiAtMSwgeTogMCB9LFxyXG4gICAgICAzODogeyB4OiAwLCB5OiAtMSB9LFxyXG4gICAgICAzOTogeyB4OiAxLCB5OiAwIH0sXHJcbiAgICAgIDQwOiB7IHg6IDAsIHk6IDEgfVxyXG4gICAgfTtcclxuICAgIGlmIChlLmtleUNvZGUgaW4gZGlyZWN0aW9uQnlLZXkpIHtcclxuICAgICAgY29uc3QgbmV3RGlyID0gZGlyZWN0aW9uQnlLZXlbZS5rZXlDb2RlXTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBuZXdEaXIueSArIHRoaXMuZGlyZWN0aW9uLnkgPT09IDAgfHxcclxuICAgICAgICBuZXdEaXIueCArIHRoaXMuZGlyZWN0aW9uLnggPT09IDBcclxuICAgICAgKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBuZXdEaXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCBlYXRlbkZydWl0ID1cclxuICAgICAgdGhpcy5ib2R5WzBdLnggPT0gR2FtZS5pbnN0YW5jZS5mcnVpdCEueCAmJlxyXG4gICAgICB0aGlzLmJvZHlbMF0ueSA9PSBHYW1lLmluc3RhbmNlLmZydWl0IS55O1xyXG5cclxuICAgIGlmIChlYXRlbkZydWl0KSBHYW1lLmluc3RhbmNlLmZydWl0IS5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCBoZWFkID0ge1xyXG4gICAgICB4OiB0aGlzLmJvZHlbMF0ueCArIHRoaXMuZGlyZWN0aW9uLngsXHJcbiAgICAgIHk6IHRoaXMuYm9keVswXS55ICsgdGhpcy5kaXJlY3Rpb24ueVxyXG4gICAgfTtcclxuICAgIHRoaXMuYm9keS51bnNoaWZ0KGhlYWQpO1xyXG4gICAgaWYgKCFlYXRlbkZydWl0KSB0aGlzLmJvZHkucG9wKCk7XHJcbiAgICB0aGlzLmNoZWNrRGVhZCgpO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHRoaXMuYm9keS5mb3JFYWNoKChib2R5UGFydCwgaSkgPT4ge1xyXG4gICAgICBHYW1lLmluc3RhbmNlLmRyYXdSZWN0KFxyXG4gICAgICAgIGJvZHlQYXJ0LngsXHJcbiAgICAgICAgYm9keVBhcnQueSxcclxuICAgICAgICBpID09PSAwID8gXCJyZ2IoMCwwLDI1NSlcIiA6IFwicmdiKDAsMjU1LDApXCJcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tEZWFkKCkge1xyXG4gICAgY29uc3Qgc2VsZkNvbGxpZGUgPSB0aGlzLmJvZHkuc29tZSgoYm9keVBhcnQsIGkpID0+IHtcclxuICAgICAgaWYgKGkgPT09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGJvZHlQYXJ0LnggPT0gdGhpcy5ib2R5WzBdLnggJiYgYm9keVBhcnQueSA9PSB0aGlzLmJvZHlbMF0ueSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGlmIChzZWxmQ29sbGlkZSkge1xyXG4gICAgICB0aGlzLmRpZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuYm9keVswXS54IDwgMCB8fFxyXG4gICAgICB0aGlzLmJvZHlbMF0ueSA8IDAgfHxcclxuICAgICAgdGhpcy5ib2R5WzBdLnggPj0gR2FtZS5pbnN0YW5jZS5zaXplIHx8XHJcbiAgICAgIHRoaXMuYm9keVswXS55ID49IEdhbWUuaW5zdGFuY2Uuc2l6ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZGllKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpZSgpIHtcclxuICAgIHRoaXMuYm9keSA9IFtcclxuICAgICAgeyB4OiA4LCB5OiA4IH0sXHJcbiAgICAgIHsgeDogOCwgeTogOSB9LFxyXG4gICAgICB7IHg6IDgsIHk6IDEwIH0sXHJcbiAgICAgIHsgeDogOCwgeTogMTEgfVxyXG4gICAgXTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0geyB4OiAwLCB5OiAtMSB9O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9