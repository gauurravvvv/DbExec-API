import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import MD5 from "md5";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE, STATUS, SUPER_ADMIN_ORGANISATION } from "../../../config/config";

const addSuperAdmin = async (req: Request, res: Response) => {
  Logger.info(`Add Super Admin request`);

  const { email, username, password, firstName, lastName, mobile } = req.body;

  //create an Super Admin
  const superAdmin = new User();
  superAdmin.firstName = firstName;
  superAdmin.lastName = lastName;
  superAdmin.email = email;
  superAdmin.mobile = mobile;
  superAdmin.username = username;
  superAdmin.password = MD5(password).toString();
  superAdmin.status = STATUS.ACTIVE;
  superAdmin.organisationName = SUPER_ADMIN_ORGANISATION;

  await superAdmin.save();

  sendResponse(res, true, CODE.SUCCESS, `Super Admin created successfully`);
};

export default addSuperAdmin;
