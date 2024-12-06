import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { DatabaseE } from "../../db/entity/database.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const listDB = async (req: Request, res: Response) => {
  Logger.info(`Get Databases by Organisation request`);
  try {
    const { orgId } = req.params;

    // Find all databases for the organisation with their configs
    const databases = await DatabaseE.find({
      where: { organisationId: orgId },
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

    if (!databases || databases.length === 0) {
      return sendResponse(
        res,
        false,
        CODE.NOT_FOUND,
        `No databases found for this organisation`
      );
    }

    // Structure the response data to avoid circular references
    const responseData = databases.map((database) => ({
      ...database,
      organisation: database.organisation
        ? {
            id: database.organisation.id,
            name: database.organisation.name,
          }
        : null,
      config: database.config
        ? {
            id: database.config.id,
            dbType: database.config.dbType,
            hostname: database.config.hostname,
            port: database.config.port,
            dbName: database.config.dbName,
            username: database.config.username,
            // Excluding password for security
          }
        : null,
    }));

    Logger.info(`Databases fetched successfully for organisation: ${orgId}`);
    return sendResponse(
      res,
      true,
      CODE.SUCCESS,
      `Databases fetched successfully`,
      responseData
    );
  } catch (error) {
    Logger.error(`Error fetching databases: ${error.message}`);
    return sendResponse(
      res,
      false,
      CODE.SERVER_ERROR,
      `Failed to fetch databases`
    );
  }
};

export default listDB;
