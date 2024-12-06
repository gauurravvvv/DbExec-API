import { Router } from "express";
import DatabaseController from "../controllers/database/database.controller";

const router = Router();

const databaseController = new DatabaseController();
router.post("/validate", databaseController.validate);
router.post("/add", databaseController.add);
router.put("/update", databaseController.update);
router.get("/get/:id", databaseController.get);
router.get("/list/:orgId/:page/:limit", databaseController.list);
router.delete("/delete/:id", databaseController.list);

export default router;
