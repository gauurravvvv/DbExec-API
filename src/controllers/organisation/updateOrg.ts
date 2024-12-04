import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";
import { MD5 } from "crypto-js";
import { Organisation } from "../../db/entity/organisation.entity";

const updateOrg = async (req: Request, res: Response) => {
  Logger.info(`Update Organisation request`);

  const { id, name, status } =
    req.body;

  //get Organisation details
  const org: Organisation = await Organisation.findOne(id);

  if (!org) {
    sendResponse(res, true, CODE.NOT_FOUND, `No organisation found`);
    return;
  }

  org.name = name ? name : org.name;
  org.status = status;

  //update Organisation
  const result = await org.save();

  sendResponse(
    res,
    true,
    CODE.SUCCESS,
    `Organisation updated Successful`,
    result
  );
};

export default updateOrg;
