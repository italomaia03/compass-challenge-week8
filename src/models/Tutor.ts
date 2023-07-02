import { Document, Model, Schema, Types, model } from "mongoose";
import { IPet, ITutor } from ".";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { CustomError } from "../errors/CustomError";

interface TutorBaseDocument extends ITutor, Document {
  _id: Schema.Types.UUID;
  comparePassword(password: string): Promise<boolean>;
  addPet(petRef: Schema.Types.UUID): void;
  deletePet(petRef: Schema.Types.UUID | IPet): void;
}

type TutorModel = Model<ITutor, {}, TutorBaseDocument>;

const tutorSchema = new Schema<ITutor, TutorModel, TutorBaseDocument>(
  {
    _id: {
      type: Schema.Types.UUID,
      default: () => randomUUID(),
    },
    name: {
      type: String,
      minlength: [3, "Minimum name length is 3 characters."],
      trim: true,
      required: [true, "Must provide a name."],
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "Minimum password length is 6 characters."],
      required: [true, "Must provide a password."],
    },
    phone: {
      type: String,
      required: [true, "Must provide a phone number."],
      validate: {
        validator: function (phone: string) {
          return /^\d{11}$/.test(phone);
        },
        message: "Please, provide a valid phone number.",
      },
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Must provide an email."],
      unique: true,
    },
    date_of_birth: {
      type: Date,
      required: [true, "Must provide date of birth"],
    },
    zip_code: {
      type: String,
      required: [true, "Must provide a valid zip code."],
      validate: {
        validator: function (zipCode: string) {
          return /^\d{8}$/.test(zipCode);
        },
        message: "Please, provide valid zip code.",
      },
    },
  },
  {
    versionKey: false,
    timestamps: false,
    toJSON: { getters: true },
  }
);

tutorSchema.pre<TutorBaseDocument>("save", async function (next) {
  if (typeof this.date_of_birth === "string") {
    const validDateString = /\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}/.test(
      this.date_of_birth
    );
    if (!validDateString)
      throw new CustomError("Please, provide a valid date", 400);
    this.date_of_birth = new Date(this.date_of_birth);
  }

  if (!this.isModified("password")) return;
  const saltRounds = Number(process.env.SALT_ROUNDS as string);
  const salt = await bcrypt.genSalt(saltRounds);

  this.password = await bcrypt.hash(this.toObject().password, salt);
  next();
});

tutorSchema.methods.comparePassword = async function (
  this: TutorBaseDocument,
  password: string
) {
  const result = await bcrypt.compare(password, this.toObject().password);
  return result;
};

const Tutor = model<ITutor, TutorModel>("Tutors", tutorSchema);
export default Tutor;
