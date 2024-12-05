import { Request, Response } from "express";
import validateDB from "./validateDB";

class DatabaseController {
  public validate = async (req: Request, res: Response) => {
    validateDB(req, res);
  };

 
}

export default DatabaseController;
