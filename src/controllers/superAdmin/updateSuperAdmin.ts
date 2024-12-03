import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";
import { MD5 } from "crypto-js";

const updateSuperAdmin = async (req: Request, res: Response) => {
  Logger.info(`Update Super Admin request`);

  const { id, email, username, password, firstName, lastName, status } =
    req.body;

  //get user details
  const superAdmin: User = await User.findOne(id);

  if (!superAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No super admin found`);
    return;
  }

  superAdmin.firstName = firstName ? firstName : superAdmin.firstName;
  superAdmin.lastName = lastName ? lastName : superAdmin.lastName;
  superAdmin.username = username ? username : superAdmin.username;
  superAdmin.email = email ? email : superAdmin.email;
  superAdmin.password = password
    ? MD5(password).toString()
    : superAdmin.password;
  superAdmin.status = status;

  //update super admin
  const result = await superAdmin.save();

  sendResponse(
    res,
    true,
    CODE.SUCCESS,
    `Super Admin updated Successful`,
    result
  );
};

export default updateSuperAdmin;
