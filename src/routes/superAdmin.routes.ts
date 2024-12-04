import { Router } from "express";
import SuperAdminController from "../controllers/superAdmin/superAdmin.controller";

const router = Router();

const superAdminController = new SuperAdminController();

router.post("/add", superAdminController.add);

router.get("/get/:id", superAdminController.get);

router.put("/update", superAdminController.update);

router.delete("/delete/:id", superAdminController.delete);

router.get("/list/:page/:limit", superAdminController.list);

export default router;
