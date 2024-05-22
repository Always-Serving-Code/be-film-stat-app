import { Response, Request, NextFunction } from 'express';
import { User } from '../models/users-model';
import { dbClose, dbOpen } from '../db-connection';
import { Error } from 'mongoose';
import { log } from 'console';
import { IFilm } from '../models/film-model';

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const users = await User.find();
		res.status(200).send({ users });
		await dbClose();
	} catch (next) {}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const { user_id } = req.params;
		const user = await User.find({ _id: user_id });
		if (!user.length) {
			res.status(404).send({ msg: 'Not Found' });
		}
		res.status(200).send({ user });
		await dbClose();
	} catch (err: any) {
		next(err);
	}
};

export const getFilmsByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { user_id } = req.params;
	try {
		await dbOpen();
		const user = await User.find({ _id: user_id });
		if (!user.length) {
			return next({ status: 404, msg: 'Not Found' });
		} else {
			const films: object[] = user[0]['films'];
			if (!films.length) {
				return next({ status: 404, msg: 'No Films Added Yet!' });
			}
			res.status(200).send({ films });
		}
		await dbClose();
	} catch (err: any) {
		next(err);
	}
};

export const deleteFilmFromUserByIds = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { user_id, film_id } = req.params;

	if (isNaN(+film_id)) {
		return next({ status: 400, msg: 'Bad Request' });
	}

	try {
		await dbOpen();
		const user = await User.find({ _id: user_id });
		if (!user.length) {
			return next({ status: 404, msg: 'Not Found' });
		}
		const minutesWatched = user[0]['stats']['hours_watched'];
		const newFilmsWatched = user[0]['stats']['num_films_watched'];
		const films: object[] = user[0]['films'];
		const filmInitialLength: number = films.length;
		let filmRuntime: number = 0;

		while (films.length === filmInitialLength) {
			films.forEach((film: any, index: number) => {
				if (film['_id'] === +film_id) {
					filmRuntime = film['runtime'];
					films.splice(index, 1);
				}
			});
			if (films.length === filmInitialLength) {
				return next({ status: 404, msg: 'Not Found' });
			}
		}
		const newStats: object = {
			hours_watched: minutesWatched - filmRuntime,
			num_films_watched: newFilmsWatched - 1,
		};
		await User.updateMany(
			{ _id: user_id },
			{ $set: { films: films, stats: newStats } }
		);
		res.status(204).send();

		await dbClose();
	} catch (err) {
		next(err);
	}
};
