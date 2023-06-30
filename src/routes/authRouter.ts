import { Router } from "express";
import { AuthController } from "../controllers/authController";

export const authRouter = Router();
const controller = new AuthController();

authRouter.route("/auth").post(controller.login);
