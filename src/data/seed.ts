import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Film } from '../schemas /films-schemas';
import filmData from './film-data.json'
import { MongoClient } from 'mongodb';
import { User } from '../schemas /users-schema';
import userData from './users-data.json'

dotenv.config();


const connect = async () => {
	try {
		await mongoose.connect(process.env.ATLAS_URI)
        console.log('Connected <3')
	} catch {
		console.log('nooo seed gone wrong :(');
	}
};

const seedDB = async () => {
    await User.deleteMany({})
    await Film.deleteMany({})
    await User.insertMany(userData)
    await Film.insertMany(filmData)
    console.log('seeded????')
}

const seed = async () => {
    await connect()
    await seedDB()
    await mongoose.connection.close()
}

seed()