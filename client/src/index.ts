import Game from "./game";
import Socket from "./socket";

window.onload = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  const game = new Game(canvas, 32);
  const socket = new Socket();
  game.start();
};
