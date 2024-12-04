import { Connection, createConnection } from "typeorm";
import { DB_CONFIG, DEFAULT_SUPER_ADMIN_CREDS } from "../../config/config";
import Logger from "../utility/logger/logger";
import CustomLogger from "../utility/logger/typeORMLogger";
import { User } from "./entity/user.entity";
import onboardDB from "../helpers/system/onboardDB";
import { Organisation } from "./entity/organisation.entity";
import { DatabaseE } from "./entity/database.entity";
import { DatabaseConfig } from "./entity/databaseConfig.entity";

class Database {
  public connect = () => {
    // Initialize a connection pool against the database.
    createConnection({
      type: "postgres",
      host: DB_CONFIG.host,
      port: parseInt(DB_CONFIG.port, 10),
      database: DB_CONFIG.database,
      username: DB_CONFIG.dbuser,
      password: DB_CONFIG.password,
      entities: [User, Organisation, DatabaseE, DatabaseConfig],
      subscribers: [],
      logging: DB_CONFIG.logging === "true",
      synchronize: DB_CONFIG.sync === "true",
      logger: new CustomLogger(), // Set your custom logger here
    })
      .then(async (connection: Connection) => {
        //Check if data is empty create super admin
        if (connection.isConnected)
          Logger.http(`${DB_CONFIG.database} Database Connected!`);
        Logger.info(`DB URL: ${DB_CONFIG.host}`);
        const user: any[] = await connection.manager.query(
          `Select * from "user"`
        );
        if (!user.length) {
          onboardDB(
            DEFAULT_SUPER_ADMIN_CREDS.USER_NAME,
            DEFAULT_SUPER_ADMIN_CREDS.PASSWORD,
            DEFAULT_SUPER_ADMIN_CREDS.EMAIL,
            DEFAULT_SUPER_ADMIN_CREDS.FIRST_NAME,
            DEFAULT_SUPER_ADMIN_CREDS.LAST_NAME
          );
        }
      })
      .catch((error) => console.error(error));
  };
}

export default Database;
