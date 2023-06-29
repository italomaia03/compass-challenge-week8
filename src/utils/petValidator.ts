import Joi from "joi";
import { IPet } from "../models/interfaces/IPet";

export const petSchema = Joi.object<IPet>({
    name: Joi.string().required(),
    species: Joi.string().required(),
    carry: Joi.string().required(),
    weight: Joi.number().min(1).required(),
    date_of_birth: Joi.date().required(),
});

export function validatePetSchema(pet: IPet) {
    return petSchema.validateAsync(pet);
}
