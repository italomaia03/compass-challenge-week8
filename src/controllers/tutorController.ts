import { Request, Response } from "express";
import tutorService from "../services/tutorService";
import { StatusCodes } from "http-status-codes";

export class TutorController {
    async get(_req: Request, res: Response) {
        const response = await tutorService.get();

        res.status(StatusCodes.OK).json(response);
    }
}
