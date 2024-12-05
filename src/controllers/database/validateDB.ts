import { Request, Response } from "express";
import { CODE, CONNECTION_TIMEOUT } from "../../../config/config";
import Logger from "../../utility/logger/logger";
import { createConnection } from "typeorm";
import sendResponse from "../../utility/response";

const validateDB = async (req: Request, res: Response): Promise<any> => {
  Logger.info(`Database validation request`);
  try {
    const { type, host, port, database, username, password } = req.body;
    let isConnected: boolean = false;
    try {
      const connectionResult = await createConnection({
        connectTimeoutMS: CONNECTION_TIMEOUT,
        type,
        name: "pg_" + Date.now(),
        host,
        port,
        database,
        username,
        password,
      });
      isConnected = connectionResult?.isConnected ?? false;
      if (isConnected) await connectionResult.close();
    } catch (connectionError) {
      Logger.error(`Database connection error: ${connectionError.message}`);
      isConnected = false;
    }
    sendResponse(res, true, CODE.SUCCESS, `Database validation result`, {
      isConnected,
      db: req.body,
    });
  } catch (error) {
    Logger.error(
      `Unexpected error during database validation: ${error.message}`
    );
    sendResponse(res, false, CODE.SERVER_ERROR, `Some error occurred`, {
      isConnected: false,
      db: req.body,
    });
  }
};

export default validateDB;
