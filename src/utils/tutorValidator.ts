import Joi from "joi";
import { ITutor } from "../models/interfaces/ITutor";
import { petSchema } from "./petValidator";

export const tutorSchema = Joi.object<ITutor>({
    name: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .required(),
    email: Joi.string().email(),
    date_of_birth: Joi.date().required(),
    zip_code: Joi.string()
        .pattern(/^\d{8}$/)
        .required(),
});
export function validateTutorSchema(tutor: ITutor) {
    return tutorSchema.validateAsync(tutor);
}
