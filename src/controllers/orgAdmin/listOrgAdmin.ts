import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import { CODE, MAX_ROW, ROLES } from "../../../config/config";
import { User } from "../../db/entity/user.entity";

const listOrgAdmin = async (req: Request, res: Response) => {
  //fetch data from body
  Logger.info(`List Org Admins request`);

  const { limit = MAX_ROW, page = 1 } = req.params as {
    limit?: number;
    page?: number;
  };

  const { orgId } = req.params;

  const [orgAdmins, count] = await User.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      organisationId: orgId,
      role: ROLES.ORG_ADMIN,
    },
  });

  sendResponse(res, true, CODE.SUCCESS, `Org Admin list data`, {
    count,
    orgAdmins,
  });
};

export default listOrgAdmin;
