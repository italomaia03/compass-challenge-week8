import Joi from "joi";
import { IPet } from "../models/interfaces/IPet";

export const petSchema = Joi.object<IPet>({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    species: Joi.string().required(),
    carry: Joi.string().required(),
    weight: Joi.number().min(1).required(),
    date_of_birth: Joi.string()
        .pattern(/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}/)
        .required(),
});

export function validatePetSchema(pet: IPet) {
    return petSchema.validateAsync(pet);
}
