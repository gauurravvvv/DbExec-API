// Library imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { createServer, Server as HttpServer } from "http";
// File imports
import authRoutes from "./routes/auth.routes";
import superAdminRoutes from "./routes/superAdmin.routes";
import orgRoutes from "./routes/org.routes";
import orgAdminRoutes from "./routes/orgAdmin.routes";
import userRoutes from "./routes/user.routes";
import Database from "./db";

class Server {
  private app: express.Application;
  private httpServer: HttpServer;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.config();
    this.routerConfig();
    this.databaseConfig();
  }

  // Configuration
  private config() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  // Routes
  private routerConfig() {
    this.app.use("/api/v1/auth", authRoutes);
    this.app.use("/api/v1/super-admin", superAdminRoutes);
    this.app.use("/api/v1/org", orgRoutes);
    this.app.use("/api/v1/org-admin", orgAdminRoutes);
    this.app.use("/api/v1/user", userRoutes);
  }

  // Database
  private databaseConfig() {
    const db = new Database();
    db.connect();
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => reject(err));
    });
  };
}
export default Server;
