import { Query, Request, Response, Send } from "express-serve-static-core";

export interface ApplicationRequest<T extends Query = {}, U = {}>
  extends Request<T> {
  body: U;
  query: T;
}

export interface ApplicationResponse<ResBody = {}> extends Response {
  json: Send<ResBody, this>;
}
