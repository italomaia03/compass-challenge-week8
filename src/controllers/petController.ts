import { Request, Response } from "express";
import petService from "../services/petService";
import { StatusCodes } from "http-status-codes";
import { IPet } from "../models";

export class PetController {
    async create(req: Request, res: Response) {
        const { name, species, carry, weight, date_of_birth } = req.body;
        const tutorId = req.params.tutorId;

        const data = {
            name,
            species,
            carry,
            weight,
            date_of_birth,
        } as IPet;

        const response = await petService.create(tutorId, data);

        res.status(StatusCodes.CREATED).json(response);
    }
}
