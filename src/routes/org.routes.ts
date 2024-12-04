import { Router } from "express";
import OrganisationController from "../controllers/organisation/organisation.controller";

const router = Router();

const orgController = new OrganisationController();

router.post("/add", orgController.add);

router.get("/get/:id", orgController.get);

router.put("/update", orgController.update);

router.delete("/delete/:id", orgController.delete);

router.get("/list/:page/:limit", orgController.list);

export default router;
