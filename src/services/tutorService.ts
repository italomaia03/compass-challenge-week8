import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { ITutor, Tutor } from "../models";
import TutorRepository from "../repository/tutorRepository";
import { validateTutorSchema } from "../utils/tutorValidator";

class TutorService {
    async get() {
        return await TutorRepository.get();
    }

    async getOne(tutorId: string) {
        return await TutorRepository.getOne(tutorId);
    }

    async create(data: ITutor) {
        data.date_of_birth = new Date(data.date_of_birth);

        await validateTutorSchema(data);

        await TutorRepository.create(data);

        return { msg: "Tutor has been successfully created" };
    }

    async update(tutorId: string, data: ITutor) {
        data.date_of_birth = new Date(data.date_of_birth);
        const tutor = await Tutor.findOne({ _id: tutorId });

        if (!tutor) {
            throw new CustomError(
                `There is no tutor with ID ${tutorId}`,
                StatusCodes.NOT_FOUND
            );
        }
        await validateTutorSchema(data);

        await TutorRepository.update(tutorId, data);

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

        if (tutor!.pets.length > 0) {
            throw new CustomError(
                "Tutors with assigned pets cannot be deleted",
                StatusCodes.BAD_REQUEST
            );
        }

        await TutorRepository.delete(tutorId);

        return { msg: "Tutor has been successfully delete" };
    }
}

const tutorService = new TutorService();
export default tutorService;
