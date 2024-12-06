import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { DatabaseE } from "../../db/entity/database.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const deleteDB = async (req: Request, res: Response) => {
  Logger.info(`Get Database request`);
  try {
    const { id } = req.params;

    // Find database with its config and organisation
    const database = await DatabaseE.findOne({
      where: { id },
      relations: ["config", "organisation"],
      select: [
        "id",
        "name",
        "description",
        "status",
        "organisationId",
        "configId",
        "createdOn",
        "updatedOn",
      ],
    });

    if (!database) {
      return sendResponse(res, false, CODE.NOT_FOUND, `Database not found`);
    }

    const result = await database.softRemove();

    Logger.info(`Database details fetched successfully`);
    return sendResponse(
      res,
      true,
      CODE.SUCCESS,
      `Database deleted successfully`,
      result
    );
  } catch (error) {
    Logger.error(`Error fetching database details: ${error.message}`);
    return sendResponse(
      res,
      false,
      CODE.SERVER_ERROR,
      `Failed to fetch database details`
    );
  }
};

export default deleteDB;
