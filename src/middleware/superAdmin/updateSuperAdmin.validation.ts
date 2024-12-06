import { NextFunction, Request, Response } from "express";
import {
  CODE,
  ROLES,
  REGEX_PATTERNS,
  VALIDATION_MESSAGES,
} from "../../../config/config";
import sendResponse from "../../utility/response";

const UpdateSuperAdminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email, username, password, firstName, lastName } = req.body;
  const { loggedInRole } = res.locals;

  // Role validation
  if (loggedInRole !== ROLES.SUPER_ADMIN) {
    return sendResponse(res, false, CODE.UNAUTHORIZED, "Unauthorized");
  }

  if (!id) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.ID.REQUIRED
    );
  }

  // Email validation
  if (!email) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.EMAIL.REQUIRED
    );
  }
  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.EMAIL.INVALID
    );
  }

  // Username validation
  if (!username) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.USERNAME.REQUIRED
    );
  }
  if (!REGEX_PATTERNS.USERNAME.test(username)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.USERNAME.INVALID
    );
  }

  // Password validation
  if (!password) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.PASSWORD.REQUIRED
    );
  }
  if (!REGEX_PATTERNS.PASSWORD.test(password)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.PASSWORD.INVALID
    );
  }

  // First Name validation
  if (!firstName) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.FIRST_REQUIRED
    );
  }
  if (firstName.length < 2 || firstName.length > 50) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.LENGTH
    );
  }
  if (!REGEX_PATTERNS.NAME.test(firstName)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.INVALID
    );
  }

  // Last Name validation
  if (!lastName) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.LAST_REQUIRED
    );
  }
  if (lastName.length < 2 || lastName.length > 50) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.LENGTH
    );
  }
  if (!REGEX_PATTERNS.NAME.test(lastName)) {
    return sendResponse(
      res,
      false,
      CODE.BAD_REQUEST,
      VALIDATION_MESSAGES.NAME.INVALID
    );
  }

  next();
};

export default UpdateSuperAdminValidation;
