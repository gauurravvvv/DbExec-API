import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const deleteOrgAdmin = async (req: Request, res: Response) => {
  Logger.info(`Delete org admin request`);

  const { id } = req.params;

  //get a orgAdmin
  const orgAdmin = await User.findOne(id);

  if (!orgAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No super admin found`);
    return;
  }

  const result = await orgAdmin.softRemove();
  sendResponse(res, true, CODE.SUCCESS, `Org admin deleted`, result);
};

export default deleteOrgAdmin;
