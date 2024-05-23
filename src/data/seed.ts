import dotenv from "dotenv";
import { Film } from "../models/film-model";
import filmData from "./film-data.json";
import { User } from "../models/users-model";
import userData from "./users-data.json";
import { dbOpen, dbClose } from "../db-connection";

dotenv.config();

const seedDB = async () => {
  await User.deleteMany({});
  await Film.deleteMany({});
  await User.insertMany(userData);
  await Film.insertMany(filmData);
};

const seed = async () => {
  await dbOpen()
  await seedDB();
  await dbClose()
};

export default seed;
