import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { DatabaseE } from "../../db/entity/database.entity";
import { DatabaseConfig } from "../../db/entity/databaseConfig.entity";
import { Organisation } from "../../db/entity/organisation.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const updateDB = async (req: Request, res: Response) => {
  Logger.info(`Update Database request`);
  try {
    const {
      id,
      name,
      description,
      status,
      type,
      host,
      port,
      dbName,
      username,
      password,
      organisation,
      isValidated,
    } = req.body;

    if (!isValidated) {
      return sendResponse(
        res,
        false,
        CODE.BAD_REQUEST,
        `Validate the database first`
      );
    }

    // Find existing database
    const database = await DatabaseE.findOne(id);
    if (!database) {
      return sendResponse(res, false, CODE.NOT_FOUND, `Database not found`);
    }

    // Get organisation if it's being updated
    let org;
    if (organisation && organisation !== database.organisationId) {
      org = await Organisation.findOne(organisation);
      if (!org) {
        return sendResponse(
          res,
          false,
          CODE.NOT_FOUND,
          `Organisation not found`
        );
      }
    }

    // Update database entry
    database.name = name || database.name;
    database.description = description || database.description;
    database.status = status || database.status;
    if (org) {
      database.organisationId = organisation;
      database.organisation = org;
    }
    await database.save();

    // Find and update database config
    const dbConfig = await DatabaseConfig.findOne({
      where: { databaseId: id },
    });
    if (!dbConfig) {
      return sendResponse(
        res,
        false,
        CODE.NOT_FOUND,
        `Database configuration not found`
      );
    }

    // Update configuration
    dbConfig.dbType = type || dbConfig.dbType;
    dbConfig.hostname = host || dbConfig.hostname;
    dbConfig.port = port || dbConfig.port;
    dbConfig.dbName = dbName || dbConfig.dbName;
    dbConfig.username = username || dbConfig.username;
    if (password) {
      dbConfig.password = password;
    }
    await dbConfig.save();

    Logger.info(`Database and config updated successfully`);
    return sendResponse(
      res,
      true,
      CODE.SUCCESS,
      `Database updated successfully`,
      database
    );
  } catch (error) {
    Logger.error(`Error updating database: ${error.message}`);
    return sendResponse(
      res,
      false,
      CODE.SERVER_ERROR,
      `Failed to update database`
    );
  }
};

export default updateDB;
