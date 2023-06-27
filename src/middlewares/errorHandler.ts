import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomValidationError } from "../errors/CustomValidationError";

function errorHandler(
    err: Object,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (Joi.isError(err) || err instanceof CustomValidationError) {
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        msg: "Something unexpected happened",
    });
}

export { errorHandler };
