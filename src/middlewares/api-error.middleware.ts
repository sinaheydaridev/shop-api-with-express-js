import { NextFunction } from "express";
import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";
import { MulterError } from "multer";
import { HttpException } from "utils/exceptions";

export const apiError = async (
  error: HttpException,
  _req: ApplicationRequest<{}, {}>,
  res: ApplicationResponse<HttpException>,
  _next: NextFunction
) => {
  if (error instanceof MulterError) {
    return res.status(413).json({ status: 413, message: error.message });
  }
  res
    .status(error.status || 500)
    .json({ status: error.status || 500, message: error.message });
};

export const pageNotFound = async (
  req: ApplicationRequest<{}, {}>,
  res: ApplicationResponse<HttpException>,
  _next: NextFunction
) => {
  res
    .status(404)
    .send({ status: 404, message: `Cannot ${req.method} ${req.path}` });
};
