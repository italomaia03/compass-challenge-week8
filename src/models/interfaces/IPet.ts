import { Schema } from "mongoose";

export interface IPet {
    _id?: Schema.Types.UUID;
    name: string;
    species: string;
    carry: string;
    weight: number;
    date_of_birth: Date;
}
