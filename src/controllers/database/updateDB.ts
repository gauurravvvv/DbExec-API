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

    // Find existing database with its config
    const database = await DatabaseE.findOne({
      where: { id },
      relations: ["config", "organisation"]
    });
    
    if (!database) {
      return sendResponse(res, false, CODE.NOT_FOUND, `Database not found`);
    }

    // Get organisation if it's being updated
    let org;
    if (organisation && organisation !== database.organisationId) {
      org = await Organisation.findOne(organisation);
      if (!org) {
        return sendResponse(res, false, CODE.NOT_FOUND, `Organisation not found`);
      }
    }

    // Update database entry
    if (name) database.name = name;
    if (description) database.description = description;
    if (status !== undefined) database.status = status;
    if (org) {
      database.organisationId = organisation;
      database.organisation = org;
    }
    await database.save();

    // Find and update database config
    if (!database.config) {
      return sendResponse(
        res,
        false,
        CODE.NOT_FOUND,
        `Database configuration not found`
      );
    }

    // Update configuration
    if (type) database.config.dbType = type;
    if (host) database.config.hostname = host;
    if (port) database.config.port = port;
    if (dbName) database.config.dbName = dbName;
    if (username) database.config.username = username;
    if (password) database.config.password = password;
    
    await database.config.save();

    // Fetch clean database object for response
    const updatedDatabase = await DatabaseE.findOne({
      where: { id: database.id },
      relations: ["config"],
      select: ["id", "name", "description", "status", "organisationId", "configId", "createdOn", "updatedOn"]
    });

    const responseData = {
      ...updatedDatabase,
      config: updatedDatabase.config ? {
        id: updatedDatabase.config.id,
        dbType: updatedDatabase.config.dbType,
        hostname: updatedDatabase.config.hostname,
        port: updatedDatabase.config.port,
        dbName: updatedDatabase.config.dbName,
        username: updatedDatabase.config.username
      } : null
    };

    Logger.info(`Database and config updated successfully`);
    return sendResponse(
      res,
      true,
      CODE.SUCCESS,
      `Database updated successfully`,
      responseData
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
