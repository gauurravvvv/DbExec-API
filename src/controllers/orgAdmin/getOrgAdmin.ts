import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const getOrgAdmin = async (req: Request, res: Response) => {
  //fetch data from body
  const { id } = req.params;
  Logger.info(`Get org admin request`);

  //get a orgAdmin
  const orgAdmin = await User.findOne(id);

  if (!orgAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No org admin found`);
    return;
  }

  sendResponse(res, true, CODE.SUCCESS, `User Data`, orgAdmin);
};

export default getOrgAdmin;
