import { ITutor, Tutor } from "../models";

class TutorRepository {
    async get() {
        return await Tutor.aggregate().lookup({
            from: "pets",
            localField: "pets",
            foreignField: "_id",
            as: "pets",
        });
    }

    async getOne(tutorId: string) {
        return Tutor.findOne({ _id: tutorId });
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
