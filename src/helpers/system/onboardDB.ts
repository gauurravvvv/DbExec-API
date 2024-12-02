import { User } from '../../db/entity/user.entity';
import Logger from '../../utility/logger/logger';
import { In } from 'typeorm';
import { ROLES, SUPER_ADMIN_ORGANISATION } from '../../../config/config';

//Create a Super Admin for app
const onboardDB = async (
	username: string,
	password: string,
	email: string,
	firstName: string,
	lastName: string
) => {

	//Create an User
	const user: User = new User();
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.username = username;
	user.password = password;
	user.role = ROLES.SUPER_ADMIN;
	user.organisation = SUPER_ADMIN_ORGANISATION;
	await user.save();
	Logger.info('Super Admin created successfully');
};

export default onboardDB;
