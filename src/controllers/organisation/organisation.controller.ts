import { Request, Response } from "express";
import addOrg from "./addOrg";
import getOrg from "./getOrg";
import updateOrg from "./updateOrg";
import deleteOrg from "./deleteOrg";
import listOrganisation from "./listOrg";

class OrganisationController {
  public add = async (req: Request, res: Response) => {
    addOrg(req, res);
  };

  public get = async (req: Request, res: Response) => {
    getOrg(req, res);
  };

  public update = async (req: Request, res: Response) => {
    updateOrg(req, res);
  };

  public delete = async (req: Request, res: Response) => {
    deleteOrg(req, res);
  };
  public list = async (req: Request, res: Response) => {
    listOrganisation(req, res);
  };
}

export default OrganisationController;
