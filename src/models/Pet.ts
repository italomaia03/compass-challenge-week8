import { Schema, model } from "mongoose";
import { IPet } from ".";
import { randomUUID } from "crypto";

const petSchema = new Schema<IPet>(
    {
        _id: { type: Schema.Types.UUID, default: () => randomUUID() },
        name: { type: String, required: true },
        species: { type: String, required: true },
        carry: { type: String, enum: ["p", "m", "g"], required: true },
        weight: { type: Number, required: true },
        date_of_birth: { type: Date, required: true },
    },
    { versionKey: false, timestamps: false, toJSON: { getters: true } }
);

const Pet = model<IPet>("Pets", petSchema);

export default Pet;
