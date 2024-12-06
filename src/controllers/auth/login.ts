import { Request, Response } from "express";
import sendResponse from "../../utility/response";
import { createToken } from "../../utility/jwt";
import MD5 from "md5";
import Logger from "../../utility/logger/logger";
import { User } from "../../db/entity/user.entity";
import { CODE } from "../../../config/config";

const login = async (req: Request, res: Response) => {
  Logger.info(`Login request`);

  const { organsation, username, password } = req.body;

  const user: User = await User.findOne({
    where: [
      {
        organisationName: organsation,
        username: username,
        password: MD5(password),
      },
    ],
  });

  if (!user) {
    sendResponse(res, false, CODE.UNAUTHORIZED, "Invalid credentials");
    return;
  }

  const tokenObject = {
    id: user.id,
    name: `${user.firstName} ${user.lastName ?? ""}`,
    email: user.email,
    username: user.username,
    isFirstLogin: user.isFirstLogin,
    role: user.role,
    organsationId: user.organisationId,
    organsation: user.organisationName,
    permissions: JSON.parse(user.permissions),
  };

  user.lastLogin = new Date();
  user.isFirstLogin = false;
  await user.save();
  const token = createToken(tokenObject);

  sendResponse(res, true, CODE.SUCCESS, `Login Successful`, {
    data: user,
    token,
  });
};

export default login;
