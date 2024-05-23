import mongoose from "mongoose";
import dotenv from "dotenv";
import { Film } from "../models/film-model";
import filmData from "./film-data.json";
import { User } from "../models/users-model";
import userData from "./users-data.json";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to the database");
  } catch {
    console.log("The database is not connected");
  }
};

const seedDB = async () => {
  await User.deleteMany({});
  await Film.deleteMany({});
  await User.insertMany(userData);
  await Film.insertMany(filmData);
};

const seed = async () => {
  await connect();
  await seedDB();
  await mongoose.connection.close();
};

export default seed;
