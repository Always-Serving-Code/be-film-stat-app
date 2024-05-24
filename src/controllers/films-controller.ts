import { Response, Request } from 'express';
import { Film } from '../models/film-model';
import { dbClose, dbOpen } from '../db/db-connection';

export const getFilms = async (req: Request, res: Response) => {
	try {
		await dbOpen();
		const films = await Film.find();
		res.status(200).send({ films });
		await dbClose();
	} catch (err) {
		console.log('oh no, films error', err);
	}
};
