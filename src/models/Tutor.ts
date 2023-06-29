import { Schema, model } from "mongoose";
import { ITutor } from ".";
import { randomUUID } from "crypto";

const tutorSchema = new Schema<ITutor>(
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
        pets: [Schema.Types.UUID],
    },
    {
        versionKey: false,
        timestamps: false,
        toJSON: { getters: true },
        id: false,
    }
);

function formatDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

const Tutor = model<ITutor>("Tutors", tutorSchema);
export default Tutor;
