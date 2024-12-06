import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { DatabaseE } from "../../db/entity/database.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const getDB = async (req: Request, res: Response) => {
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
        "updatedOn"
      ]
    });

    if (!database) {
      return sendResponse(res, false, CODE.NOT_FOUND, `Database not found`);
    }

    const responseData = {
      ...database,
      organisation: database.organisation ? {
        id: database.organisation.id,
        name: database.organisation.name
      } : null,
      config: database.config ? {
        id: database.config.id,
        dbType: database.config.dbType,
        hostname: database.config.hostname,
        port: database.config.port,
        dbName: database.config.dbName,
        username: database.config.username
        // Excluding password for security
      } : null
    };

    Logger.info(`Database details fetched successfully`);
    return sendResponse(
      res,
      true,
      CODE.SUCCESS,
      `Database details fetched successfully`,
      responseData
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

export default getDB; 