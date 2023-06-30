import { HydratedDocument } from "mongoose";
import { ITutor, Tutor } from "../models";

class TutorRepository {
    async get() {
        return await Tutor.find().populate("pets");
    }

    async getOne(args: object) {
        return Tutor.findOne(args);
    }

    async create(data: ITutor) {
        return await Tutor.create(data);
    }

    async update(tutorToBeUpdated: HydratedDocument<ITutor>, data: ITutor) {
        const { name, password, email, phone, zip_code, date_of_birth } = data;

        tutorToBeUpdated.$set({
            name,
            password,
            email,
            phone,
            zip_code,
            date_of_birth,
        });

        return await tutorToBeUpdated.save();
    }

    async delete(tutorId: string) {
        return await Tutor.findOneAndDelete({ _id: tutorId });
    }

    async deletePet(tutor: HydratedDocument<ITutor>, petIndex: number) {
        tutor.pets.splice(petIndex, 1);
        return await tutor.save();
    }
}

export default new TutorRepository();
