import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const deleteSuperAdmin = async (req: Request, res: Response) => {
  Logger.info(`Delete super admin request`);

  const { id } = req.params;

  //get a superAdmin
  const superAdmin = await User.findOne(id);

  if (!superAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No super admin found`);
    return;
  }

  const result = await superAdmin.softRemove();
  sendResponse(res, true, CODE.SUCCESS, `Super admin deleted`, result);
};

export default deleteSuperAdmin;
