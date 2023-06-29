import { Schema, model } from "mongoose";
import { ITutor } from ".";
import { randomUUID } from "crypto";

const tutorSchema = new Schema<ITutor>({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID(),
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    zip_code: { type: String, required: true },
    pets: [Schema.Types.UUID],
});

const Tutor = model<ITutor>("Tutors", tutorSchema);
export default Tutor;
