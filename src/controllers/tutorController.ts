import { Request, Response } from "express";
import tutorService from "../services/tutorService";
import { StatusCodes } from "http-status-codes";
import { ITutor } from "../models";

export class TutorController {
    async get(_req: Request, res: Response) {
        const response = await tutorService.get();

        res.status(StatusCodes.OK).json(response);
    }

    async create(req: Request, res: Response) {
        const data = req.body as ITutor;

        const response = await tutorService.create(data);

        res.status(StatusCodes.CREATED).json(response);
    }

    async update(req: Request, res: Response) {
        const tutorId = req.params.id;
        const data = req.body as ITutor;

        const response = await tutorService.update(tutorId, data);

        res.status(StatusCodes.OK).json(response);
    }
}
