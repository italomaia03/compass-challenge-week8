import Joi from "joi";
import { ITutor } from "../models/interfaces/ITutor";
import { petSchema } from "./petValidator";

export const tutorSchema = Joi.object<ITutor>({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .required(),
    email: Joi.string().email(),
    date_of_birth: Joi.string()
        .pattern(/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}/)
        .required(),
    zip_code: Joi.string()
        .pattern(/^\d{8}$/)
        .required(),
    pets: Joi.array().items(petSchema),
});
export function validateTutorSchema(tutor: ITutor) {
    return tutorSchema.validateAsync(tutor);
}
