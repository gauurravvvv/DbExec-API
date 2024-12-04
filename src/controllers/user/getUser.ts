import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const getUser = async (req: Request, res: Response) => {
  //fetch data from body
  const { id } = req.params;
  Logger.info(`Get org user request`);

  //get a orgUser
  const orgUser = await User.findOne(id);

  if (!orgUser) {
    sendResponse(res, true, CODE.NOT_FOUND, `No org user found`);
    return;
  }

  sendResponse(res, true, CODE.SUCCESS, `User Data`, orgUser);
};

export default getUser;
