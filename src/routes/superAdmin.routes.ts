import { Router } from "express";
import SuperAdminController from "../controllers/superAdmin/superAdmin.controller";
import AuthMiddleware from "../middleware/auth/auth.middleware";
import AddSuperAdminValidation from "../middleware/superAdmin/addSuperAdmin.validation";
import GetSuperAdminValidation from "../middleware/superAdmin/getSuperAdmin.validation";
import UpdateSuperAdminValidation from "../middleware/superAdmin/updateSuperAdmin.validation";
import DeleteSuperAdminValidation from "../middleware/superAdmin/deleteSuperAdmin.validation";
import ListSuperAdminValidation from "../middleware/superAdmin/listSuperAdmin.validation";

const router = Router();

const superAdminController = new SuperAdminController();

router.post(
  "/add",
  AuthMiddleware,
  AddSuperAdminValidation,
  superAdminController.add
);

router.get(
  "/get/:id",
  AuthMiddleware,
  GetSuperAdminValidation,
  superAdminController.get
);

router.put(
  "/update",
  AuthMiddleware,
  UpdateSuperAdminValidation,
  superAdminController.update
);

router.delete(
  "/delete/:id",
  AuthMiddleware,
  DeleteSuperAdminValidation,
  superAdminController.delete
);

router.get(
  "/list/:page/:limit",
  AuthMiddleware,
  ListSuperAdminValidation,
  superAdminController.list
);

export default router;
