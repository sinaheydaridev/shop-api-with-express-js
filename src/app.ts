import path from "path";
import fs from "fs";
import express from "express";
import { NextFunction } from "express-serve-static-core";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import { config } from "config";

import { mongoConnect } from "internal/database";

import apiSchema from "./swagger.json";

import { apiError, pageNotFound } from "middlewares/api-error.middleware";

import { Socket } from "socket";
import { RequestWithSocket } from "interfaces/custom-request.interface";

import routes from "core";

class App {
  private app: express.Application;
  private http: http.Server;
  private socket: Socket;

  constructor() {
    this.app = express();
    this.http = this.getHttp();
    this.socket = new Socket(this.http);
    this.init();
  }

  public listen(): void {
    this.http.listen(config.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${config.PORT}`);
    });
  }

  private async init(): Promise<void> {
    this.setupMiddlewares();
    this.setupLogger();
    this.setupSocket();
    this.docsSetup();
    this.setupRoutes();
    this.setupApiError();
    this.setup404Page();
  }

  private docsSetup(): void {
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(apiSchema, {
        swaggerOptions: { persistAuthorization: true },
      })
    );
  }

  private setupMiddlewares(): void {
    this.app.use(express.json({ limit: "10MB", strict: true }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setup404Page(): void {
    this.app.use(pageNotFound);
  }

  private setupRoutes(): void {
    routes.forEach(({ path, routes }) => {
      this.app.use(`/api${path}`, routes);
    });
  }

  private setupApiError(): void {
    this.app.use(apiError);
  }

  private setupSocket() {
    this.app.use(
      (req: RequestWithSocket, _req: unknown, next: NextFunction) => {
        req.io = this.socket.io;
        next();
      }
    );
  }

  private setupLogger(): void {
    const accessLogStream = fs.createWriteStream(
      path.join(process.cwd(), "logs", "access.log"),
      { flags: "a" }
    );
    this.app.use(morgan("combined", { stream: accessLogStream }));
  }

  public async setupDatabase(): Promise<void> {
    await mongoConnect();
  }

  public getHttp(): http.Server {
    return http.createServer(this.app);
  }
}

export default App;
