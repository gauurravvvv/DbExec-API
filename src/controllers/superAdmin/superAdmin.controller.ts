import { Request, Response } from "express";
import addSuperAdmin from "./addSuperAdmin";
import getSuperAdmin from "./getSuperAdmin";
import updateSuperAdmin from "./updateSuperAdmin";
import deleteSuperAdmin from "./deleteSuperAdmin";

class SuperAdminController {
  public add = async (req: Request, res: Response) => {
    addSuperAdmin(req, res);
  };

  public get = async (req: Request, res: Response) => {
    getSuperAdmin(req, res);
  };

  public update = async (req: Request, res: Response) => {
    updateSuperAdmin(req, res);
  };

  public delete = async (req: Request, res: Response) => {
    deleteSuperAdmin(req, res);
  };
}

export default SuperAdminController;