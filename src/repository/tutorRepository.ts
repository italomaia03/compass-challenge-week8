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

    async delete(tutorId: string) {
        return await Tutor.findOneAndDelete({ _id: tutorId });
    }
}

export default new TutorRepository();
