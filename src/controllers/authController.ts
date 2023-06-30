import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "../services/authService";

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const response = await authService.login(email, password);

        res.status(StatusCodes.OK).json(response);
    }
}
