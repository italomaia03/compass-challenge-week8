import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === "ValidationError" || err.name === "MongoServerError") {
    return res.status(400).json({
      msg: err.message,
    });
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.message });
}

export { errorHandler };
