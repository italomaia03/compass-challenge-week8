import { Router } from "express";
import { TutorController } from "../controllers/tutorController";
import { authenticateTutor } from "../middlewares/authentication";

export const tutorRouter: Router = Router();

const controller = new TutorController();

tutorRouter.route("/tutors").get(authenticateTutor, controller.get);
tutorRouter.route("/tutor").post(controller.create);
tutorRouter
    .route("/tutor/:id")
    .put(authenticateTutor, controller.update)
    .delete(authenticateTutor, controller.delete);
