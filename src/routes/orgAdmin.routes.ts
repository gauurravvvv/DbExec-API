import { Router } from "express";
import OrgAdminController from "../controllers/orgAdmin/orgAdmin.controller";

const router = Router();

const orgAdminController = new OrgAdminController();

router.post("/add", orgAdminController.add);

router.get("/get", orgAdminController.get);

router.put("/update", orgAdminController.update);

router.delete("/delete", orgAdminController.delete);

export default router;
