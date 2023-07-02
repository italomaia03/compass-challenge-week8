import { Request, Response } from "express";
import petService from "../services/petService";
import { StatusCodes } from "http-status-codes";
import { IPet } from "../models";
import { JwtPayload } from "jsonwebtoken";

export class PetController {
  async create(req: Request, res: Response) {
    const { name, species, carry, weight, date_of_birth } = req.body;
    const tutorId = req.params.tutorId;
    const loggedTutorId = (req.user as JwtPayload).id;

    const data = {
      name,
      species,
      carry,
      weight,
      date_of_birth,
    } as IPet;

    const response = await petService.create(tutorId, loggedTutorId, data);

    res.status(StatusCodes.CREATED).json(response);
  }

  async update(req: Request, res: Response) {
    const { name, species, carry, weight, date_of_birth } = req.body;
    const { tutorId, petId } = req.params;
    const loggedTutorId = (req.user as JwtPayload).id;

    const data = {
      name,
      species,
      carry,
      weight,
      date_of_birth,
    } as IPet;

    const response = await petService.update(
      tutorId,
      loggedTutorId,
      petId,
      data
    );

    res.status(StatusCodes.CREATED).json(response);
  }

  async delete(req: Request, res: Response) {
    const { tutorId, petId } = req.params;
    const loggedTutorId = (req.user as JwtPayload).id;

    const response = await petService.delete(tutorId, loggedTutorId, petId);

    res.status(StatusCodes.NO_CONTENT).json(response);
  }
}
