import { Request, Response } from "express";

import addOrgAdmin from "./addOrgAdmin";
import getOrgAdmin from "./getOrgAdmin";
import updateOrgAdmin from "./updateOrgAdmin";
import deleteOrgAdmin from "./deleteOrgAdmin";

class OrgAdminController {
  public add = async (req: Request, res: Response) => {
    addOrgAdmin(req, res);
  };

  public get = async (req: Request, res: Response) => {
    getOrgAdmin(req, res);
  };

  public update = async (req: Request, res: Response) => {
    updateOrgAdmin(req, res);
  };

  public delete = async (req: Request, res: Response) => {
    deleteOrgAdmin(req, res);
  };
}

export default OrgAdminController;
