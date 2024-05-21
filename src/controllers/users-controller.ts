// import { postUser } from "../models/users-models"
import { Response, Request, NextFunction } from 'express';
import { User } from '../models/users-model';
import { dbClose, dbOpen } from '../db-connection';

// export const addUser = async (req: Request, res: Response) => {
//     const userToAdd: object = req.body
// }

export const getUsers = async (req: Request, res: Response) => {
	try {
		await dbOpen();
		const users = await User.find();
		res.status(200).send({ users });
		await dbClose();
	} catch (err) {
		console.log('errorrrrrr', err);
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
			if (!Object.keys(films[0]).length) {
				return next({ status: 404, msg: 'No Films Added Yet!' });
			}
			res.status(200).send({ films });
		}
	} catch (err: any) {
		console.log('in catch in controllers', err);
		next(err);
		await dbClose();
	}
};
