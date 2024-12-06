import { NextFunction, Request, Response } from "express";
import { CODE, ROLES, VALIDATION_MESSAGES } from "../../../config/config";
import sendResponse from "../../utility/response";

// Define a middleware function for addSuperAdmin.
const DeleteSuperAdminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loggedInRole } = res.locals;

  const { id } = req.params;

  if (!id) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.ID.REQUIRED
    );
  }

  if (loggedInRole === ROLES.SUPER_ADMIN) {
    next();
  } else {
    sendResponse(res, false, CODE.UNAUTHORIZED, "Unauthorized");
    return;
  }
};

export default DeleteSuperAdminValidation;
