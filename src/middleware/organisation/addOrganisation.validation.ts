import { NextFunction, Request, Response } from "express";
import {
  CODE,
  ROLES,
  REGEX_PATTERNS,
  VALIDATION_MESSAGES,
} from "../../../config/config";
import sendResponse from "../../utility/response";

const AddOrganisationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const { loggedInRole } = res.locals;

  // Role validation
  if (loggedInRole !== ROLES.SUPER_ADMIN) {
    return sendResponse(res, false, CODE.UNAUTHORIZED, "Unauthorized");
  }

  // Username validation
  if (!name) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.REQUIRED
    );
  }
  if (!REGEX_PATTERNS.NAME.test(name)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.INVALID
    );
  }

  next();
};

export default AddOrganisationValidation;
