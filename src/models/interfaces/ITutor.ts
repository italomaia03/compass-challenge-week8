import { Schema } from "mongoose";
import { IPet } from "./IPet";
export interface ITutor {
  _id?: Schema.Types.UUID;
  name: string;
  password: string;
  phone: string;
  email: string;
  date_of_birth: Date | String;
  zip_code: string;
}
