import { Request, Response } from "express";
import addUser from "./addUser";
import deleteUser from "./deleteUser";
import getUser from "./getUser";
import updateUser from "./updateUser";
import listUser from "./listUser";

class UserController {
  public add = async (req: Request, res: Response) => {
    addUser(req, res);
  };

  public get = async (req: Request, res: Response) => {
    getUser(req, res);
  };

  public update = async (req: Request, res: Response) => {
    updateUser(req, res);
  };

  public delete = async (req: Request, res: Response) => {
    deleteUser(req, res);
  };

  public list = async (req: Request, res: Response) => {
    listUser(req, res);
  };
}

export default UserController;
