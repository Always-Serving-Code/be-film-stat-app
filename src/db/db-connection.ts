import mongoose from "mongoose";
import dotenv from "dotenv";

const dbOpen = async (): Promise<void> => {
	try {
		const ENV = process.env.NODE_ENV || "development";
		const envPath = `${__dirname}/../../.env.${ENV}`;

		dotenv.config({ path: envPath });

		if (!process.env.ATLAS_URI) {
			throw new Error("ATLAS_URI not set");
		}

		mongoose.Promise = global.Promise;
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
