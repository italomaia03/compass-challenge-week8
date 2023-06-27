import { IPet } from "./IPet";
export interface ITutor {
    id: number;
    name: string;
    phone: string;
    email: string;
    date_of_birth: string;
    zip_code: string;
    pets: IPet[];
}
