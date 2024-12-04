import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { CODE, MAX_ROW } from "../../../config/config";
import { Organisation } from "../../db/entity/organisation.entity";

const listOrganisation = async (req: Request, res: Response) => {
  //fetch data from body
  Logger.info(`List Organisations request`);

  const { limit = MAX_ROW, page = 1 } = req.params as {
    limit?: number;
    page?: number;
  };

  const [orgs, count] = await Organisation.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
  });

  sendResponse(res, true, CODE.SUCCESS, `Organisation list data`, {
    count,
    orgs,
  });
};

export default listOrganisation;
