import { ITutor } from "../models";
import TutorRepository from "../repository/tutorRepository";
import { validateTutorSchema } from "../utils/tutorValidator";

class TutorService {
    async get() {
        return await TutorRepository.get();
    }

    async create(data: ITutor) {
        data.date_of_birth = new Date(data.date_of_birth);

        await validateTutorSchema(data);

        await TutorRepository.create(data);

        return { msg: "Tutor has been successfully created" };
    }

    async update(tutorId: string, data: ITutor) {
        data.date_of_birth = new Date(data.date_of_birth);

        await validateTutorSchema(data);

        await TutorRepository.update(tutorId, data);

        return { msg: "Tutor has been successfully updated" };
    }
}

const tutorService = new TutorService();
export default tutorService;
