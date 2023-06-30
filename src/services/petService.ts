import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { IPet, ITutor } from "../models";
import PetRepository from "../repository/petRepository";
import { validatePetSchema } from "../utils/petValidator";
import tutorService from "./tutorService";
import { validateTutorSchema } from "../utils/tutorValidator";

class PetService {
    async create(tutorId: string, data: IPet) {
        const desiredTutor = await tutorService.getOne({ _id: tutorId });

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
        const desiredTutor = await tutorService.getOne({ _id: tutorId });

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

    async delete(tutorId: string, petId: string) {
        const petToBeDeleted = await PetRepository.getOne(petId);
        const desiredTutor = await tutorService.getOne({ _id: tutorId });

        if (!desiredTutor) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }

        if (!petToBeDeleted) {
            throw new CustomError(
                `There is no pet with ID ${petId}`,
                StatusCodes.NOT_FOUND
            );
        }

        const assignedPet = desiredTutor.pets.find((pet) => {
            return pet === petId;
        });

        if (!assignedPet) {
            throw new CustomError(
                `No assigned pet with ID ${petId} to tutor ${tutorId}`,
                404
            );
        }

        const petIndex = desiredTutor.pets.indexOf(assignedPet);

        await PetRepository.delete(petToBeDeleted);

        await tutorService.deletePet(desiredTutor, petIndex);

        return { msg: "No Content" };
    }
}

const petService = new PetService();
export default petService;
