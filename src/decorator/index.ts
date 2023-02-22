import { NextFunction, Request, Response } from "express";
import { HttpException } from "utils/exceptions";

type Status = "ok" | "created" | null;

const HttpResponse = (status: Status = null) => {
  return function (
    target: unknown,
    _propertyKey: unknown,
    descriptor: PropertyDescriptor
  ) {
    const getStatusCode = () => {
      switch (status) {
        case "ok":
          return 200;
        case "created":
          return 201;
        default:
          return null;
      }
    };
    const declaredFn = descriptor.value;
    descriptor.value = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const result = await declaredFn.apply(target, [req, res, next]);
        if (getStatusCode()) {
          res.status(getStatusCode()!);
        }
        return result;
      } catch (err) {
        const error = err as HttpException;
        res
          .status(error.status)
          .json({ message: error.message, statusCode: error.status });
      }
    };
  };
};
