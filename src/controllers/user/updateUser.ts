import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";
import { MD5 } from "crypto-js";

const updateUser = async (req: Request, res: Response) => {
  Logger.info(`Update Org Admin request`);

  const { id, email, username, password, firstName, lastName, status } =
    req.body;

  //get user details
  const orgUser: User = await User.findOne(id);

  if (!orgUser) {
    sendResponse(res, true, CODE.NOT_FOUND, `No org user found`);
    return;
  }

  orgUser.firstName = firstName ? firstName : orgUser.firstName;
  orgUser.lastName = lastName ? lastName : orgUser.lastName;
  orgUser.username = username ? username : orgUser.username;
  orgUser.email = email ? email : orgUser.email;
  orgUser.password = password ? MD5(password).toString() : orgUser.password;
  orgUser.status = status;

  //update org admin
  const result = await orgUser.save();

  sendResponse(res, true, CODE.SUCCESS, `Org User updated Successful`, result);
};

export default updateUser;
