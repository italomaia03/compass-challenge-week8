import { HydratedDocument } from "mongoose";
import { IPet, Pet } from "../models";

class PetRepository {
    async getOne(petId: string) {
        return Pet.findOne({ _id: petId });
    }

    async create(data: IPet) {
        const petToBeSaved = await new Pet(data).save();

        return petToBeSaved;
    }

    async update(pet: HydratedDocument<IPet>) {
        return pet.save();
    }

    async delete(pet: HydratedDocument<IPet>) {
        return pet.deleteOne();
    }
}

export default new PetRepository();
