import { Router } from "express";
import DatabaseController from "../controllers/database/database.controller";

const router = Router();

const databaseController = new DatabaseController();
router.post("/validate", databaseController.validate);

export default router;
