import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import { ITutor, Tutor } from "../models";
import TutorRepository from "../repository/tutorRepository";
import petService from "./petService";

class TutorService {
  async get() {
    return await TutorRepository.get();
  }

  async getOne(args: object) {
    return await TutorRepository.getOne(args);
  }

  async create(data: ITutor) {
    await TutorRepository.create(data);

    return { msg: "Tutor has been successfully created" };
  }

  async update(tutorId: string, loggedTutorId: string, data: ITutor) {
    const tutorToBeUpdated = await this.getOne({ _id: tutorId });

    if (!tutorToBeUpdated) {
      throw new CustomError(
        `There is no tutor with ID ${tutorId}`,
        StatusCodes.NOT_FOUND
      );
    }

    if (tutorToBeUpdated.id !== loggedTutorId) {
      throw new CustomError("Operation not authorized", StatusCodes.FORBIDDEN);
    }

    await TutorRepository.update(tutorToBeUpdated, data);

    return { msg: "Tutor has been successfully updated" };
  }

  async delete(tutorId: string, loggedTutorId: string) {
    const tutor = await Tutor.findOne({ _id: tutorId });

    if (!tutor) {
      throw new CustomError(
        `There is no tutor with ID ${tutorId}`,
        StatusCodes.NOT_FOUND
      );
    }

    if (tutor.id !== loggedTutorId) {
      throw new CustomError("Operation not authorized", StatusCodes.FORBIDDEN);
    }

    const pets = await petService.get({ tutorId });

    if (pets.length > 0) {
      throw new CustomError(
        "Tutors with assigned pets cannot be deleted",
        StatusCodes.BAD_REQUEST
      );
    }

    await TutorRepository.delete(tutorId);

    return { msg: "No content." };
  }
}

const tutorService = new TutorService();
export default tutorService;
