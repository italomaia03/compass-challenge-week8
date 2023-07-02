import { Model, Schema, model } from "mongoose";
import { IPet } from ".";
import { randomUUID } from "crypto";

interface PetBaseDocument extends IPet, Document {
  _id: Schema.Types.UUID;
  formatDate(date: Date): String;
}

type PetModel = Model<IPet, {}, PetBaseDocument>;

const petSchema = new Schema<IPet, PetModel, PetBaseDocument>(
  {
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    name: { type: String, required: [true, "Must provide a name."] },
    species: { type: String, required: [true, "Must provide a species."] },
    carry: {
      type: String,
      enum: { values: ["p", "m", "g"], message: "{VALUE} is not supported" },
      required: true,
    },
    weight: { type: Number, required: [true, "Must provide weight."] },
    date_of_birth: {
      type: Date,
      required: [true, "Must provide date of birth"],
      get: formatDate,
    },
    tutorId: { type: Schema.Types.UUID, ref: "Tutors", required: true },
  },
  {
    versionKey: false,
    timestamps: false,
    toJSON: { getters: true },
  }
);

petSchema.pre<PetBaseDocument>("save", async function (next) {
  if (typeof this.date_of_birth === "string") {
    this.date_of_birth = new Date(this.date_of_birth);
  }
  next();
});

function formatDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

const Pet = model<IPet, PetModel>("Pets", petSchema);

export default Pet;
