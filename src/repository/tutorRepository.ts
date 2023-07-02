import { HydratedDocument } from "mongoose";
import { ITutor, Tutor } from "../models";

class TutorRepository {
  async get() {
    const pipeline = [
      {
        $set: {
          password: "*******",
          date_of_birth: {
            $dateToString: { format: "%Y-%m-%d %H:%M", date: "$date_of_birth" },
          },
        },
      },
    ];
    return await Tutor.aggregate(pipeline)
      .lookup({
        from: "pets",
        localField: "_id",
        foreignField: "tutorId",
        as: "pets",
        pipeline: [
          {
            $set: {
              date_of_birth: {
                $dateToString: {
                  format: "%Y-%m-%d %H:%M",
                  date: "$date_of_birth",
                },
              },
            },
          },
        ],
      })
      .project({
        "pets.tutorId": false,
      });
  }

  async getOne(args: object) {
    return Tutor.findOne(args);
  }

  async create(data: ITutor) {
    const tutorToBeCreated = new Tutor(data);

    await tutorToBeCreated.validate();

    return await tutorToBeCreated.save();
  }

  async update(tutorToBeUpdated: HydratedDocument<ITutor>, data: ITutor) {
    const tutor: ITutor = data;

    tutorToBeUpdated.$set(tutor);

    await tutorToBeUpdated.validate();

    return await tutorToBeUpdated.save();
  }

  async delete(tutorId: string) {
    return await Tutor.findOneAndDelete({ _id: tutorId });
  }
}

export default new TutorRepository();
