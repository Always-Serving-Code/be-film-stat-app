import { MongoClient } from "mongodb"
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
	const options: ConnectOptions = {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	};
	await mongoose.connect(process.env.ATLAS_URI, options);
};

export { connectToDatabase };
