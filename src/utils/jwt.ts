import { ITutor } from "../models";
import jwt from "jsonwebtoken";

class JWTUtils {
    createTokenUser(tutor: ITutor) {
        return { email: tutor.email, id: tutor._id };
    }

    createToken(tokenUser: Object) {
        return jwt.sign(tokenUser, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_LIFETIME,
        });
    }

    verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET!);
    }
}

const jwtUtils = new JWTUtils();

export default jwtUtils;
