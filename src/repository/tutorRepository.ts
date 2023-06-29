import { ITutor, Tutor } from "../models";

class TutorRepository {
    async get() {
        return await Tutor.find();
    }

    async create(data: ITutor) {
        return await Tutor.create(data);
    }

    async update(tutorId: string, data: ITutor) {
        return await Tutor.findOneAndUpdate({ _id: tutorId }, data);
    }
}

export default new TutorRepository();
