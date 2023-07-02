import { Router } from "express";
import { PetController } from "../controllers/petController";
import { authenticateTutor } from "../middlewares/authentication";

export const petRouter: Router = Router();
const controller = new PetController();

petRouter.route("/pet/:tutorId").post(authenticateTutor, controller.create);
petRouter
  .route("/pet/:petId/tutor/:tutorId")
  .put(authenticateTutor, controller.update)
  .delete(authenticateTutor, controller.delete);
