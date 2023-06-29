import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { IPet } from "../models";
import PetRepository from "../repository/petRepository";
import { validatePetSchema } from "../utils/petValidator";
import tutorService from "./tutorService";
import { validateTutorSchema } from "../utils/tutorValidator";

class PetService {
    async create(tutorId: string, data: IPet) {
        const desiredTutor = await tutorService.getOne(tutorId);

        if (!desiredTutor) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }
        data.date_of_birth = new Date(data.date_of_birth);
        await validatePetSchema(data);

        const savedPet = await PetRepository.create(data);

        desiredTutor.pets.addToSet(savedPet._id);
        validateTutorSchema(desiredTutor);
        desiredTutor.save();

        return { msg: "Pet has been successfully created" };
    }
}

const petService = new PetService();
export default petService;
