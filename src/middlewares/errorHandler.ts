import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomValidationError } from "../errors/CustomValidationError";
import { StatusCodes } from "http-status-codes";
import { AuthError } from "../errors/AuthError";

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
    if (err instanceof AuthError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: err.message });
    }
    return res.status(500).json({ msg: err.message });
}

export { errorHandler };
