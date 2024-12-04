import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { Organisation } from "../../db/entity/organisation.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const addOrg = async (req: Request, res: Response) => {
  Logger.info(`Add Organisation request`);

  const { name, status } = req.body;

  //create an Super Admin
  const org = new Organisation();
  org.name = name;
  org.status = status;

  await org.save();

  sendResponse(res, true, CODE.SUCCESS, `Super Admin created successfully`);
};

export default addOrg;
