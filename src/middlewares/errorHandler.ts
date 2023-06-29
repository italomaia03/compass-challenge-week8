import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomValidationError } from "../errors/CustomValidationError";
import { CustomError } from "../errors/CustomError";

function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (Joi.isError(err) || err instanceof CustomValidationError) {
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
