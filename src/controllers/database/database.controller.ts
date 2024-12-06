import { Request, Response } from "express";
import validateDB from "./validateDB";
import addDB from "./addDB";
import updateDB from "./updateDB";
import getDB from "./getDB";
import listDB from "./listDB";
import deleteDB from "./deleteDB";

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

  public get = async (req: Request, res: Response) => {
    getDB(req, res);
  };

  public list = async (req: Request, res: Response) => {
    listDB(req, res);
  };

  public delete = async (req: Request, res: Response) => {
    deleteDB(req, res);
  };
}

export default DatabaseController;
