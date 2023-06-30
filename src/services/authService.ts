import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError";
import tutorService from "./tutorService";
import jwtUtils from "../utils/jwt";
import bcrypt from "bcrypt";

class AuthService {
    async login(email: string, password: string) {
        if (!email || !password) {
            throw new CustomError(
                "Email and password must be provided",
                StatusCodes.BAD_REQUEST
            );
        }

        const desiredTutor = await tutorService.getOne({ email });

        if (!desiredTutor) {
            throw new CustomError(
                "Invalid credentials",
                StatusCodes.BAD_REQUEST
            );
        }

        const validatePassword = await bcrypt.compare(
            password,
            desiredTutor.toObject().password
        );

        if (!validatePassword) {
            throw new CustomError(
                "Invalid credentials",
                StatusCodes.BAD_REQUEST
            );
        }

        const tokenUser = jwtUtils.createTokenUser(desiredTutor);

        const token = jwtUtils.createToken(tokenUser);

        return { accessToken: token };
    }
}

const authService = new AuthService();

export default authService;
