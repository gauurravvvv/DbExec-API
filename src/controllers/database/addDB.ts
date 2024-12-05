import { Request, Response } from "express";
import { CODE } from "../../../config/config";
import { DatabaseE } from "../../db/entity/database.entity";
import { DatabaseConfig } from "../../db/entity/databaseConfig.entity";
import { Organisation } from "../../db/entity/organisation.entity";
import Logger from "../../utility/logger/logger";
import sendResponse from "../../utility/response";

const addDB = async (req: Request, res: Response) => {
  Logger.info(`Add Database request`);
  try {
    const {
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

    // Get organisation
    const org = await Organisation.findOne(organisation);
    if (!org) {
      return sendResponse(res, false, CODE.NOT_FOUND, `Organisation not found`);
    }

    // Create and save database entry
    const database = new DatabaseE();
    database.name = name;
    database.description = description;
    database.status = status;
    database.organisationId = organisation;
    database.organisation = org;
    await database.save();

    // Create and save database config
    const dbConfig = new DatabaseConfig();
    dbConfig.databaseId = database.id;
    dbConfig.database = database;
    dbConfig.dbType = type;
    dbConfig.hostname = host;
    dbConfig.port = port;
    dbConfig.dbName = dbName;
    dbConfig.username = username;
    dbConfig.password = password;
    await dbConfig.save();

    Logger.info(`Database and config saved successfully`);
    return sendResponse(res, true, CODE.SUCCESS, `Database saved successfully`);
  } catch (error) {
    Logger.error(`Error saving database: ${error.message}`);
    return sendResponse(
      res,
      false,
      CODE.SERVER_ERROR,
      `Failed to save database`
    );
  }
};

export default addDB;
