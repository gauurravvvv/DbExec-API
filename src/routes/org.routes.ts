import { Router } from "express";
import OrganisationController from "../controllers/organisation/organisation.controller";

const router = Router();

const orgController = new OrganisationController();

router.post("/add", orgController.add);

router.get("/get", orgController.get);

router.put("/update", orgController.update);

router.delete("/delete", orgController.delete);

export default router;
