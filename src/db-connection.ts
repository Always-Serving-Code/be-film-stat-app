import { MongoClient } from "mongodb"
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const mongoDatabase = async (): Promise<void> => {
	try {
	await mongoose.connect(process.env.ATLAS_URI)
	}
	catch {
		console.log('database connection in not working :(')
	}
};

export { mongoDatabase };
