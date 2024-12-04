import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";
import { MD5 } from "crypto-js";

const updateOrgAdmin = async (req: Request, res: Response) => {
  Logger.info(`Update Org Admin request`);

  const { id, email, username, password, firstName, lastName, status } =
    req.body;

  //get user details
  const orgAdmin: User = await User.findOne(id);

  if (!orgAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No org admin found`);
    return;
  }

  orgAdmin.firstName = firstName ? firstName : orgAdmin.firstName;
  orgAdmin.lastName = lastName ? lastName : orgAdmin.lastName;
  orgAdmin.username = username ? username : orgAdmin.username;
  orgAdmin.email = email ? email : orgAdmin.email;
  orgAdmin.password = password
    ? MD5(password).toString()
    : orgAdmin.password;
  orgAdmin.status = status;

  //update org admin
  const result = await orgAdmin.save();

  sendResponse(
    res,
    true,
    CODE.SUCCESS,
    `Org Admin updated Successful`,
    result
  );
};

export default updateOrgAdmin;
