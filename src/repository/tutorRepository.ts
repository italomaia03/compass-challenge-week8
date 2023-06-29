import { Tutor } from "../models";

class TutorRepository {
    async get() {
        return await Tutor.find();
    }
}

export default new TutorRepository();
