import { dbClose, dbOpen } from "./db-connection";
import { Film } from "../models/film-model";
import { User } from "../models/users-model";

export const seed = async (filmData: object[], userData: object[]) => {
	await dbOpen();
	await User.deleteMany({});
	await Film.deleteMany({});
	await User.insertMany(userData);
	await Film.insertMany(filmData);
	await dbClose();
};

export default seed;
