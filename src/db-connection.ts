import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const dbOpen = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
  } catch {
    console.log("database connection is not working :(");
  }
};

const dbClose = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
  } catch {
    console.log("connection not close ;(");
  }
};

export { dbOpen, dbClose };
