import { Router } from "express";

export const petRouter: Router = Router();

petRouter.route("/pet/:tutorId").post(createPet);
petRouter.route("/pet/:petId/tutor/:tutorId").put(updatePet).delete(deletePet);
