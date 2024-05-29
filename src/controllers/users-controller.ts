import { Response, Request, NextFunction } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db/db-connection";
import { sortAndOrderObjArr } from "../utils";
import { Film } from "../models/film-model";

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
	} catch (err) {
		next(err);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const { user_id } = req.params;

		if (isNaN(+user_id)) {
			return next({ status: 400, msg: "Bad Request" });
		}

		const user = await User.findById(+user_id);
		if (!user) {
			return next({ status: 404, msg: "Not Found" });
		}
		res.status(200).send({ user });
		await dbClose();
	} catch (err: any) {
		next(err);
	}
};

export const patchUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const { user_id } = req.params;
		const { film_id, date_watched, rating } = req.body;

		if (isNaN(+user_id) || typeof film_id !== "number") {
			return next({ status: 400, msg: "Bad Request" });
		}

		const filmToAdd: any = await Film.findById(film_id);

		if (!filmToAdd) {
			return next({ status: 404, msg: "Not Found" });
		}

		const newFilm = { ...filmToAdd._doc, date_watched: date_watched, rating };

		const updatedUser =
			(await User.findByIdAndUpdate(
				+user_id,
				{ $push: { films: newFilm } },
				{ new: true }
			)) || undefined;

		if (!updatedUser) {
			return next({ status: 404, msg: "Not Found" });
		}

		res.status(200).send({ user: updatedUser });
		await dbClose();
	} catch (err: any) {
		console.log(err);
		next(err);
	}
};

export const getFilmsByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const { user_id } = req.params;
		const { sort_by = "date_watched", order = "desc" } = req.query;

		const validQueries = ["sort_by", "order"];
		const validSortValues = [
			"date_watched",
			"rating",
			"release_year",
			"runtime",
			"title",
		];
		const validOrderValues = ["desc", "asc"];

		const isValidQuery = Object.keys(req.query).every((query) =>
			validQueries.includes(query)
		);

		const isValidSort = validSortValues.includes(sort_by.toString());
		const isValidOrder = validOrderValues.includes(order.toString());

		if (isNaN(+user_id) || !isValidQuery || !isValidSort || !isValidOrder) {
			return next({ status: 400, msg: "Bad Request" });
		}

		const userWithFilms = await User.findById(+user_id).select("films");

		if (!userWithFilms) {
			return next({ status: 404, msg: "Not Found" });
		} else {
			const films: object[] = [...userWithFilms["films"]];
			if (!films.length) {
				return next({ status: 404, msg: "No Films Added Yet!" });
			}

			const orderedFilms = sortAndOrderObjArr(films, sort_by, order);

			res.status(200).send({ films: orderedFilms });
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

	if (isNaN(+film_id) || isNaN(+user_id)) {
		return next({ status: 400, msg: "Bad Request" });
	}

	try {
		await dbOpen();

		const result = await User.updateOne(
			{ _id: +user_id },
			{ $pull: { films: { _id: +film_id } } }
		);

		if (!result.modifiedCount) {
			return next({ status: 404, msg: "Not Found" });
		}

		res.status(204).send();
		await dbClose();
	} catch (err: any) {
		next(err);
	}
};
