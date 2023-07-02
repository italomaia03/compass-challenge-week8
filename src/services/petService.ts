import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { IPet } from "../models";
import PetRepository from "../repository/petRepository";
import tutorService from "./tutorService";

class PetService {
  async getOne(petId: string) {
    return await PetRepository.getOne(petId);
  }

  async create(tutorId: string, loggedTutorId: string, data: IPet) {
    const desiredTutor = await tutorService.getOne({ _id: tutorId });

    if (!desiredTutor) {
      throw new CustomError(
        `There is no tutor with ID ${tutorId}`,
        StatusCodes.NOT_FOUND
      );
    }

    if (desiredTutor.id !== loggedTutorId) {
      throw new CustomError("Operation not authorized", StatusCodes.FORBIDDEN);
    }

    data.tutorId = desiredTutor.toObject()._id;

    const savedPet = await PetRepository.create(data);

    return { msg: "Pet has been successfully created" };
  }

  async update(
    tutorId: string,
    loggedTutorId: string,
    petId: string,
    data: IPet
  ) {
    const petToBeUpdated = await this.getOne(petId);
    const desiredTutor = await tutorService.getOne({ _id: tutorId });

    if (!desiredTutor) {
      throw new CustomError(
        `There is no tutor with ID ${tutorId}`,
        StatusCodes.NOT_FOUND
      );
    }

    if (desiredTutor.id !== loggedTutorId) {
      throw new CustomError("Operation not authorized", StatusCodes.FORBIDDEN);
    }

    if (!petToBeUpdated) {
      throw new CustomError(
        `There is no pet with ID ${petId}`,
        StatusCodes.NOT_FOUND
      );
    }

    await PetRepository.update(petToBeUpdated, data);

    return { msg: "Pet has been successfully updated" };
  }

  async delete(tutorId: string, loggedTutorId: string, petId: string) {
    const petToBeDeleted = await PetRepository.getOne(petId);
    const desiredTutor = await tutorService.getOne({ _id: tutorId });

    if (!desiredTutor) {
      throw new CustomError(
        `There is no tutor with ID ${tutorId}`,
        StatusCodes.NOT_FOUND
      );
    }

    if (desiredTutor.id !== loggedTutorId) {
      throw new CustomError("Operation not authorized", StatusCodes.FORBIDDEN);
    }

    if (!petToBeDeleted) {
      throw new CustomError(
        `There is no pet with ID ${petId}`,
        StatusCodes.NOT_FOUND
      );
    }

    await PetRepository.delete(petId);

    return { msg: "No Content" };
  }

  async get(args: object) {
    return PetRepository.get(args);
  }
}

const petService = new PetService();
export default petService;
