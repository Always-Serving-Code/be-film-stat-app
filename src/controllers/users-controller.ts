import { Response, Request, NextFunction } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db-connection";
import { Error } from "mongoose";

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
      res.status(404).send({ msg: "Not Found" });
    }
    res.status(200).send({ user });
    await dbClose();
  } catch (err: any) {
    next(err);
  }

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
		await dbClose();
	} catch (err: any) {
		next(err);
	}
};
