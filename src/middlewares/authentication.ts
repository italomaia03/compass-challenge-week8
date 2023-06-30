import { NextFunction, Request, Response } from "express";
import jwtUtils from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";

export const authenticateTutor = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomError("No token provided", StatusCodes.UNAUTHORIZED);
    }

    const token: string = authHeader.split(" ")[1];

    try {
        const decodedToken = jwtUtils.verifyToken(token);
        req.user = { ...(decodedToken as JwtPayload) };
        next();
    } catch (error) {
        throw new CustomError(
            "Not authorized to access this route",
            StatusCodes.UNAUTHORIZED
        );
    }
};
