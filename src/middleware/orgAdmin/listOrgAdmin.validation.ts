import { NextFunction, Request, Response } from "express";
import { CODE, ROLES } from "../../../config/config";
import sendResponse from "../../utility/response";

// Define a middleware function for addSuperAdmin.
const ListSuperAdminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loggedInRole } = res.locals;

  if (loggedInRole === ROLES.SUPER_ADMIN) {
    next();
  } else {
    sendResponse(res, false, CODE.UNAUTHORIZED, "Unauthorized");
    return;
  }
};

export default ListSuperAdminValidation;
