import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const deleteUser = async (req: Request, res: Response) => {
  Logger.info(`Delete org admin request`);

  const { id } = req.params;

  //get a orgAdmin
  const orgUser = await User.findOne(id);

  if (!orgUser) {
    sendResponse(res, true, CODE.NOT_FOUND, `No User found`);
    return;
  }

  const result = await orgUser.softRemove();
  sendResponse(res, true, CODE.SUCCESS, `User deleted`, result);
};

export default deleteUser;
