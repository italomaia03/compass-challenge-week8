import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { ITutor, Tutor } from "../models";
import TutorRepository from "../repository/tutorRepository";
import { validateTutorSchema } from "../utils/tutorValidator";
import { HydratedDocument } from "mongoose";

class TutorService {
    async get() {
        return await TutorRepository.get();
    }

    async getOne(args: object) {
        return await TutorRepository.getOne(args);
    }

    async create(data: ITutor) {
        await validateTutorSchema(data);

        await TutorRepository.create(data);

        return { msg: "Tutor has been successfully created" };
    }

    async update(tutorId: string, data: ITutor) {
        const tutorToBeUpdated = await this.getOne({ _id: tutorId });

        if (!tutorToBeUpdated) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }
        await validateTutorSchema(data);

        await TutorRepository.update(tutorToBeUpdated, data);

        return { msg: "Tutor has been successfully updated" };
    }

    async delete(tutorId: string) {
        const tutor = await Tutor.findOne({ _id: tutorId });

        if (!tutor) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }

        if (tutor.pets!.length > 0) {
            throw new CustomError(
                "Tutors with assigned pets cannot be deleted",
                StatusCodes.BAD_REQUEST
            );
        }

        await TutorRepository.delete(tutorId);

        return { msg: "Tutor has been successfully delete" };
    }

    async deletePet(tutor: HydratedDocument<ITutor>, petIndex: number) {
        return TutorRepository.deletePet(tutor, petIndex);
    }
}

const tutorService = new TutorService();
export default tutorService;
