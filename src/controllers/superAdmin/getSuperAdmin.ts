import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const getSuperAdmin = async (req: Request, res: Response) => {
  //fetch data from body
  const { id } = req.params;
  Logger.info(`Get super admin request`);


  
  //get a superAdmin
  const superAdmin = await User.findOne(id);

  if (!superAdmin) {
    sendResponse(res, true, CODE.NOT_FOUND, `No super admin found`);
    return;
  }

  sendResponse(res, true, CODE.SUCCESS, `User Data`, superAdmin);
};

export default getSuperAdmin;
