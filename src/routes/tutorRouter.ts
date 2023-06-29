import { Router } from "express";
import { TutorController } from "../controllers/tutorController";

export const tutorRouter: Router = Router();

const controller = new TutorController();

tutorRouter.route("/tutors").get(controller.get);
tutorRouter.route("/tutor").post(controller.create);

// tutorRouter.route("/tutor/:id").put(updateTutor).delete(deleteTutor);
