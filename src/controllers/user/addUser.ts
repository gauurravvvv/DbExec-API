import { Request, Response } from "express";
import MD5 from "md5";
import { CODE, ROLES, STATUS } from "../../../config/config";
import { User } from "../../db/entity/user.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";
import { Organisation } from "../../db/entity/organisation.entity";
import { ORG_USER_PERMISSIONS } from "../../constants/permissions/user";

const addUser = async (req: Request, res: Response) => {
  Logger.info(`Add Org User request`);

  const {
    email,
    username,
    password,
    firstName,
    lastName,
    mobile,
    organisation,
  } = req.body;

  //get organisation details
  const org = await Organisation.findOne({
    where: {
      id: organisation,
    },
  });

  if (!org) {
    sendResponse(res, false, CODE.NOT_FOUND, `Organisation not found`);
    return;
  }

  //create an Organisation User
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.mobile = mobile;
  user.username = username;
  user.password = MD5(password).toString();
  user.status = STATUS.ACTIVE;
  user.role = ROLES.ORG_USER;
  user.permissions = JSON.stringify(ORG_USER_PERMISSIONS);
  user.organisationName = org.name;
  user.organisationId = org.id;

  await user.save();

  sendResponse(
    res,
    true,
    CODE.SUCCESS,
    `Organisation User created successfully`
  );
};

export default addUser;
