import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY, CODE } from "../../../config/config";
import sendResponse from "../../utility/response";

// Define a middleware function for authentication.
const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.token?.toString();
  if (typeof token !== "undefined") {
    try {
      // Verify the token's authenticity and decode its content.
      const data: any = verify(token, JWT_SECRET_KEY);

      const { role, id, organisation, organisationId, permissions } = data; // Extract user role and ID from the decoded token.
      res.locals.loggedInId = id; // Store the user's ID in the response object.
      res.locals.loggedInRole = role; // Store the user's role in the response object.
      res.locals.userOrgId = organisationId; // Store the user's role in the response object.
      res.locals.userOrgName = organisation; // Store the user's role in the response object.
      res.locals.permissions = permissions; // Store the user's role in the response object.

      console.log(
        res.locals.loggedInId,
        res.locals.loggedInRole,
        res.locals.userOrgId,
        res.locals.userOrgName,
        res.locals.permissions
      );
      next();
    } catch (_e) {
      const e: Error = _e;
      // Handle JWT verification errors.

      if (e.message === "invalid signature") {
        sendResponse(res, false, CODE.UNAUTHORIZED, "Invalid token!");
        return false;
      }

      if (e.message === "jwt expired") {
        sendResponse(res, false, CODE.UNAUTHORIZED, "Session expired!");
        return false;
      }

      sendResponse(res, false, CODE.UNAUTHORIZED, e.message);
    }
  } else {
    // If there's no token provided, respond with an "Not Authorized" error.
    sendResponse(res, false, CODE.UNAUTHORIZED, "Not Authorized");
  }
};

export default AuthMiddleware;
