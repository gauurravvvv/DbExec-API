import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { CODE } from "../../../config/config";
import { Organisation } from "../../db/entity/organisation.entity";

const deleteOrg = async (req: Request, res: Response) => {
  Logger.info(`Delete Organisation request`);

  const { id } = req.params;

  //get a organisation
  const org = await Organisation.findOne(id);

  if (!org) {
    sendResponse(res, true, CODE.NOT_FOUND, `No organisation found`);
    return;
  }

  const result = await org.softRemove();
  sendResponse(res, true, CODE.SUCCESS, `Organisation deleted`, result);
};

export default deleteOrg;
