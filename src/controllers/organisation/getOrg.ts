import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { CODE } from "../../../config/config";
import { Organisation } from "../../db/entity/organisation.entity";

const getOrg = async (req: Request, res: Response) => {
  //fetch data from body
  const { id } = req.params;
  Logger.info(`Get Organisation request`);

  //get a Organisation
  const org = await Organisation.findOne(id);

  if (!org) {
    sendResponse(res, true, CODE.NOT_FOUND, `No Organisation found`);
    return;
  }

  sendResponse(res, true, CODE.SUCCESS, `Organisation data`, org);
};

export default getOrg;
