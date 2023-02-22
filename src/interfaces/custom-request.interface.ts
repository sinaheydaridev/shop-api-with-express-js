import { Query } from "express-serve-static-core";
import { IUser } from "models/user.model";
import { Server } from "socket.io";
import { ApplicationRequest } from "./application.interface";

export interface RequestWithUser<T extends Query = {}, U = {}>
  extends ApplicationRequest<T, U> {
  user?: IUser;
}

export interface RequestWithSocket<T extends Query = {}, U = {}>
  extends ApplicationRequest<T, U> {
  io?: Server;
  user?: IUser;
}
