import { Request, Response } from "express";
import tutorService from "../services/tutorService";
import { StatusCodes } from "http-status-codes";
import { ITutor } from "../models";
import { JwtPayload } from "jsonwebtoken";

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
    const loggedTutorId = (req.user as JwtPayload).id;
    const data = req.body as ITutor;

    const response = await tutorService.update(tutorId, loggedTutorId, data);

    res.status(StatusCodes.OK).json(response);
  }
  async delete(req: Request, res: Response) {
    const loggedTutorId = (req.user as JwtPayload).id;
    const tutorId = req.params.id;

    const response = await tutorService.delete(tutorId, loggedTutorId);

    res.status(StatusCodes.NO_CONTENT).json(response);
  }
}
