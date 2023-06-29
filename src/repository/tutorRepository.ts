import { ITutor, Tutor } from "../models";

class TutorRepository {
    async get() {
        return await Tutor.find();
    }

    async create(data: ITutor) {
        return await Tutor.create(data);
    }
}

export default new TutorRepository();
