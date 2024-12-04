import { Router } from "express";
import OrgAdminController from "../controllers/orgAdmin/orgAdmin.controller";

const router = Router();

const orgAdminController = new OrgAdminController();

router.post("/add", orgAdminController.add);

router.get("/get/:id", orgAdminController.get);

router.put("/update", orgAdminController.update);

router.delete("/delete/:id", orgAdminController.delete);

router.get("/list/:orgId/:page/:limit", orgAdminController.list);

export default router;
