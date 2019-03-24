import socketIo from "socket.io-client";

export default class Socket {
  public static instance: Socket;

  public socket: SocketIOClient.Socket;

  constructor() {
    Socket.instance = this;
    this.socket = socketIo();
  }
}
