import ISnake from "./ISnake";
import IVector from "./IVector";

export default interface IGameState {
  snakes: ISnake[];
  fruit: IVector;
}
