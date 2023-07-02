import { HydratedDocument } from "mongoose";
import { IPet, Pet } from "../models";

class PetRepository {
  async getOne(petId: string) {
    return Pet.findOne({ _id: petId });
  }

  async get(args: object) {
    return await Pet.find(args);
  }

  async create(data: IPet) {
    const petToBeSaved = new Pet(data);
    await petToBeSaved.validate();
    await petToBeSaved.save();

    return petToBeSaved;
  }

  async update(petToBeUpdated: HydratedDocument<IPet>, pet: IPet) {
    const updatedPet: IPet = pet;

    petToBeUpdated.$set(updatedPet);

    await petToBeUpdated.validate();

    return petToBeUpdated.save();
  }

  async delete(petId: string) {
    return Pet.findOneAndDelete({ _id: petId });
  }
}

export default new PetRepository();
