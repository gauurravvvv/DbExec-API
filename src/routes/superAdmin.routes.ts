import { Router } from "express";
import SuperAdminController from "../controllers/superAdmin/superAdmin.controller";

const router = Router();

const superAdminController = new SuperAdminController();

router.post("/add", superAdminController.add);

router.get("/get", superAdminController.add);

router.put("/update", superAdminController.add);

router.delete("/delete", superAdminController.add);

export default router;
