import { Router } from "express";

export const tutorRouter: Router = Router();

tutorRouter.route("/tutors").get(getAllTutors);
tutorRouter.route("/tutor").post(createTutor);
tutorRouter.route("/tutor/:id").put(updateTutor).delete(deleteTutor);
