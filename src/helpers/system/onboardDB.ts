import { User } from "../../db/entity/user.entity";
import Logger from "../../utility/logger/logger";
import { In } from "typeorm";
import { ROLES, SUPER_ADMIN_ORGANISATION } from "../../../config/config";
import { SUPER_ADMIN_PERMISSIONS } from "../../constants/permissions/superAdmin";

//Create a Super Admin for app
const onboardDB = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  //Create a Super Admin by deafult if no user present
  const user: User = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.username = username;
  user.password = password;
  user.role = ROLES.SUPER_ADMIN;
  user.isDefault = 1;
  user.permissions = JSON.stringify(SUPER_ADMIN_PERMISSIONS);
  user.organisationName = SUPER_ADMIN_ORGANISATION;

  await user.save();

  Logger.info("Super Admin created successfully");
};

export default onboardDB;
