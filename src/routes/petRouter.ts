import { Router } from "express";
import { PetController } from "../controllers/petController";

export const petRouter: Router = Router();
const controller = new PetController();

petRouter.route("/pet/:tutorId").post(controller.create);
petRouter
    .route("/pet/:petId/tutor/:tutorId")
    .put(controller.update)
    .delete(controller.delete);
