import { Router } from "express";
import UserController from "../controllers/user/user.controller";

const router = Router();

const userController = new UserController();

router.post("/add", userController.add);

router.get("/get/:id", userController.get);

router.put("/update", userController.update);

router.delete("/delete/:id", userController.delete);

router.get("/list/:orgId/:page/:limit", userController.list);

export default router;
