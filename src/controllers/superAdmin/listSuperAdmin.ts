import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import Logger from "../../utility/logger/logger";
import {
  CODE,
  MAX_ROW,
  ROLES,
  SUPER_ADMIN_ORGANISATION,
} from "../../../config/config";
import { User } from "../../db/entity/user.entity";

const listSuperAdmin = async (req: Request, res: Response) => {
  //fetch data from body
  Logger.info(`List Super admin request`);

  const { limit = MAX_ROW, page = 1 } = req.params as {
    limit?: number;
    page?: number;
  };

  const [superAdmins, count] = await User.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      organisationName: SUPER_ADMIN_ORGANISATION,
      role: ROLES.SUPER_ADMIN,
    },
  });

  sendResponse(res, true, CODE.SUCCESS, `Super admin list Data`, {
    count,
    superAdmins,
  });
};

export default listSuperAdmin;
