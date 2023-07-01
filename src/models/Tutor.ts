import {
    Document,
    HydratedDocument,
    HydratedSingleSubdocument,
    Model,
    Schema,
    Types,
    model,
} from "mongoose";
import { IPet, ITutor } from ".";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

interface TutorBaseDocument extends ITutor, Document {
    _id: Schema.Types.UUID;
    pets: Types.DocumentArray<IPet>;
    comparePassword(password: string): Promise<boolean>;
    formatDate(): String;
    findPet(petToBeDeleted: IPet): any;
}

type TutorModel = Model<ITutor, {}, TutorBaseDocument>;

const tutorSchema = new Schema<ITutor, TutorModel, TutorBaseDocument>(
    {
        _id: {
            type: Schema.Types.UUID,
            default: () => randomUUID(),
        },
        name: { type: String, required: true },
        password: {
            type: String,
            required: true,
            get: () => {
                return "*******";
            },
        },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        date_of_birth: {
            type: Date,
            required: true,
            get: formatDate,
        },
        zip_code: { type: String, required: true },
        pets: [{ type: Schema.Types.UUID, ref: "Pets" }],
    },
    {
        versionKey: false,
        timestamps: false,
        toJSON: { getters: true },
        id: false,
    }
);

tutorSchema.pre<TutorBaseDocument>("save", async function (next) {
    if (typeof this.date_of_birth === "string") {
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

tutorSchema.methods.findPet = function (
    this: TutorBaseDocument,
    petToBeDeleted: IPet
) {
    return this.pets.find((pet) => {
        console.log(pet._id);

        // return pet === petToBeDeleted._id;
    });
};

function formatDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

const Tutor = model<ITutor, TutorModel>("Tutors", tutorSchema);
export default Tutor;
