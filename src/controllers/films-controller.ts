import { Response, Request, NextFunction } from "express";
import { Film } from "../models/film-model";
import { dbClose, dbOpen } from "../db/db-connection";

export const getFilms = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const films = await Film.find();
		res.status(200).send({ films });
		await dbClose();
	} catch (err) {
		return next(err);
	}
};

export const getFilmById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await dbOpen();
		const { film_id } = req.params;
		
		if (isNaN(+film_id)) {
			return next({ status: 400, msg: "Bad Request" });
		}
		const film = await Film.findById(+film_id);
		if (!film) {
			return next({ status: 404, msg: "Not Found" });
		}
		res.status(200).send({ film });
		await dbClose();
	} catch (err: any) {
		return next(err);
	}
};
