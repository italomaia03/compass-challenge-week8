import { IPet, Pet } from "../models";

class PetRepository {
    async create(data: IPet) {
        const petToBeSaved = await new Pet(data).save();

        return petToBeSaved.toObject();
    }
}

export default new PetRepository();
