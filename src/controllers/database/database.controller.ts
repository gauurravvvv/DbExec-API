import { Request, Response } from "express";
import validateDB from "./validateDB";
import addDB from "./addDB";
import updateDB from "./updateDB";

class DatabaseController {
  public validate = async (req: Request, res: Response) => {
    validateDB(req, res);
  };

  public add = async (req: Request, res: Response) => {
    addDB(req, res);
  };

  public update = async (req: Request, res: Response) => {
    updateDB(req, res);
  };

 
}

export default DatabaseController;
