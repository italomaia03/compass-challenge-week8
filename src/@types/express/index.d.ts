import { JwtPayload } from "jsonwebtoken";
import User from "../../models/User";

// extending express request object
declare global {
    namespace Express {
        interface Request {
            user: string | JwtPayload;
        }
    }
}
