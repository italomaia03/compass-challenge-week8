import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { IPet, ITutor } from "../models";
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

        const { name, email, password, phone, date_of_birth, zip_code } =
            desiredTutor.toObject();

        validateTutorSchema({
            name,
            email,
            password,
            phone,
            date_of_birth,
            zip_code,
        } as ITutor);

        desiredTutor.save();

        return { msg: "Pet has been successfully created" };
    }

    async update(tutorId: string, petId: string, data: IPet) {
        const petToBeUpdated = await PetRepository.getOne(petId);
        const desiredTutor = await tutorService.getOne(tutorId);

        if (!desiredTutor) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }

        if (!petToBeUpdated) {
            throw new CustomError(
                `There is no pet with ID ${petId}`,
                StatusCodes.NOT_FOUND
            );
        }

        data.date_of_birth = new Date(data.date_of_birth);
        await validatePetSchema(data);

        const { name, species, carry, weight, date_of_birth } = data;

        petToBeUpdated.$set({ name, species, carry, weight, date_of_birth });

        await PetRepository.update(petToBeUpdated);

        return { msg: "Pet has been successfully updated" };
    }
}

const petService = new PetService();
export default petService;
