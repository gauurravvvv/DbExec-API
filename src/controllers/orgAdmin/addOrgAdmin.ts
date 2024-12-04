import { Request, Response } from "express";
import MD5 from "md5";
import { CODE, ROLES, STATUS } from "../../../config/config";
import { User } from "../../db/entity/user.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";
import { ORG_ADMIN_PERMISSIONS } from "../../constants/permissions/organisationAdmin";
import { Organisation } from "../../db/entity/organisation.entity";

const addOrgAdmin = async (req: Request, res: Response) => {
  Logger.info(`Add Super Admin request`);

  const { email, username, password, firstName, lastName, mobile, organisation } = req.body;

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

  //create an Organisation Admin
  const orgAdmin = new User();
  orgAdmin.firstName = firstName;
  orgAdmin.lastName = lastName;
  orgAdmin.email = email;
  orgAdmin.mobile = mobile;
  orgAdmin.username = username;
  orgAdmin.password = MD5(password).toString();
  orgAdmin.status = STATUS.ACTIVE;
  orgAdmin.role = ROLES.ORG_ADMIN;
  orgAdmin.permissions = JSON.stringify(ORG_ADMIN_PERMISSIONS);
  orgAdmin.organisationName = org.name;

  await orgAdmin.save();

  sendResponse(res, true, CODE.SUCCESS, `Organisation Admin created successfully`);
};

export default addOrgAdmin;
