import { config } from "config";
import { Server } from "http";
import User from "models/user.model";
import { Server as SocketServer, Socket as SocketIo } from "socket.io";

import { ForbiddenException, UnauthorizedException, verifyToken } from "utils";

class Socket {
  private server: Server;
  public io: SocketServer;

  constructor(server: Server) {
    this.server = server;
    this.io = this.init();
    this.setupMiddlewares();
  }

  private init(): SocketServer {
    const io = new SocketServer(this.server, {
      cors: {
        origin: config.CLIENT_SERVER,
        methods: ["GET", "POST"],
        allowedHeaders: ["authorization"], // for send from client
      },
    });
    return io;
  }

  private setupMiddlewares() {
    this.io.use(async (socket: SocketIo, next: any) => {
      const headers = socket.handshake.headers;
      if (!headers.authorization) {
        return next(new ForbiddenException()); // send error to client
      }
      try {
        const decoded = verifyToken(String(headers.authorization));
        await User.findById(decoded.userId);
      } catch {
        return next(new UnauthorizedException()); // send error to client
      }
      next();
    });
  }
}

export { Socket };
