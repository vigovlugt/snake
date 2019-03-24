import Game from "./game";
import Snake from "./snake";
import ISnake from "./ISnake";

window.onload = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  const game = new Game(canvas, 32);

  game.start();
};
