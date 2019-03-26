import ISnakeType from "./SnakeType";
import IBodyPart from "./IBodyPart";

export default interface ISnake {
  // snakeType: ISnakeType;
  id: string;
  body: IBodyPart[];
  color: string;
}
